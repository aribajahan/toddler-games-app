import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { ReplitConnectors } from "@replit/connectors-sdk";

const REPOSITORY_OWNER = "aribajahan";
const REPOSITORY_NAME = "toddler-games-app";
const BRANCH = "main";
const API_PREFIX = `/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`;
const PROJECT_ROOT = resolve(dirname(fileURLToPath(import.meta.url)), "../..");
const GIT_OUTPUT_BUFFER_BYTES = 64 * 1024 * 1024;

type TreeEntry = {
  path: string;
  mode: string;
  type: "blob" | "tree" | "commit";
  sha: string;
};

type GitHubRef = {
  object: {
    sha: string;
  };
};

type GitHubObject = {
  sha: string;
};

type CommitDetails = {
  message: string;
  tree: string;
  parents: string[];
  author: {
    name: string;
    email: string;
    date: string;
  };
  committer: {
    name: string;
    email: string;
    date: string;
  };
};

function git(args: string[], options: { allowFailure?: boolean } = {}): string {
  try {
    return execFileSync("git", args, {
      cwd: PROJECT_ROOT,
      encoding: "utf8",
      maxBuffer: GIT_OUTPUT_BUFFER_BYTES,
      stdio: ["ignore", "pipe", "pipe"],
    }).trim();
  } catch (error) {
    if (options.allowFailure) {
      return "";
    }

    const detail = error instanceof Error ? error.message : String(error);
    throw new Error(`git ${args.join(" ")} failed: ${detail}`);
  }
}

function gitBytes(args: string[]): Buffer {
  return execFileSync("git", args, {
    cwd: PROJECT_ROOT,
    maxBuffer: GIT_OUTPUT_BUFFER_BYTES,
    stdio: ["ignore", "pipe", "pipe"],
  });
}

function assertGitRepositoryIsReady(): void {
  const branch = git(["branch", "--show-current"]);
  if (branch !== BRANCH) {
    throw new Error(
      `Refusing to sync: checkout '${BRANCH}' before running this command (currently on '${branch || "detached HEAD"}').`,
    );
  }

  if (git(["status", "--porcelain"])) {
    throw new Error(
      "Refusing to sync: commit or stash the local worktree changes first.",
    );
  }
}

function localCommitDetails(commit: string): CommitDetails {
  const parents = git(["rev-list", "--parents", "-n", "1", commit])
    .split(/\s+/)
    .slice(1);
  const fields = git([
    "show",
    "-s",
    "--format=%B%x00%T%x00%an%x00%ae%x00%aI%x00%cn%x00%ce%x00%cI",
    commit,
  ]).split("\0");

  const [
    message,
    tree,
    authorName,
    authorEmail,
    authorDate,
    committerName,
    committerEmail,
    committerDate,
  ] = fields;
  if (
    !message ||
    !tree ||
    !authorName ||
    !authorEmail ||
    !authorDate ||
    !committerName ||
    !committerEmail ||
    !committerDate
  ) {
    throw new Error(
      `Could not read complete metadata for local commit ${commit}.`,
    );
  }

  return {
    message,
    tree,
    parents,
    author: { name: authorName, email: authorEmail, date: authorDate },
    committer: {
      name: committerName,
      email: committerEmail,
      date: committerDate,
    },
  };
}

function localTreeEntries(commit: string): TreeEntry[] {
  const output = gitBytes([
    "ls-tree",
    "-r",
    "-z",
    "--full-tree",
    commit,
  ]).toString("utf8");
  return output
    .split("\0")
    .filter(Boolean)
    .map((entry) => {
      const tab = entry.indexOf("\t");
      const [mode, type, sha] = entry.slice(0, tab).split(" ");
      const path = entry.slice(tab + 1);
      if (
        !mode ||
        !type ||
        !sha ||
        !path ||
        (type !== "blob" && type !== "commit")
      ) {
        throw new Error(`Unsupported local tree entry: ${entry}`);
      }
      return { mode, type, sha, path } as TreeEntry;
    });
}

class GitHubSync {
  private readonly connectors = new ReplitConnectors();
  private readonly uploadedBlobs = new Set<string>();
  private readonly uploadedTrees = new Map<string, string>();

  private async request<T>(
    path: string,
    options: {
      method?: "GET" | "POST" | "PATCH";
      body?: Record<string, unknown>;
    } = {},
  ): Promise<T> {
    const response = await this.connectors.proxy("github", path, {
      method: options.method ?? "GET",
      headers: {
        Accept: "application/vnd.github+json",
        "Content-Type": "application/json",
        "X-GitHub-Api-Version": "2022-11-28",
      },
      body: options.body ? JSON.stringify(options.body) : undefined,
    });
    const body = await response.text();
    let parsed: unknown = body;
    try {
      parsed = body ? JSON.parse(body) : undefined;
    } catch {
      // Preserve the response text in the error below when GitHub did not return JSON.
    }
    if (!response.ok) {
      const message =
        typeof parsed === "object" && parsed !== null && "message" in parsed
          ? String((parsed as { message: unknown }).message)
          : body || response.statusText;
      throw new Error(
        `GitHub API ${options.method ?? "GET"} ${path} failed (${response.status}): ${message}`,
      );
    }
    return parsed as T;
  }

  async getRemoteSha(): Promise<string | null> {
    try {
      const ref = await this.request<GitHubRef>(
        `${API_PREFIX}/git/ref/heads/${BRANCH}`,
      );
      return ref.object.sha;
    } catch (error) {
      if (error instanceof Error && error.message.includes("(404)")) {
        return null;
      }
      throw error;
    }
  }

  private async uploadBlob(sha: string): Promise<void> {
    if (this.uploadedBlobs.has(sha)) {
      return;
    }
    const content = gitBytes(["cat-file", "blob", sha]).toString("base64");
    const result = await this.request<GitHubObject>(`${API_PREFIX}/git/blobs`, {
      method: "POST",
      body: { content, encoding: "base64" },
    });
    if (result.sha !== sha) {
      throw new Error(
        `GitHub returned blob ${result.sha}, expected local blob ${sha}.`,
      );
    }
    this.uploadedBlobs.add(sha);
  }

  private async uploadTree(
    commit: string,
    localTreeSha: string,
  ): Promise<string> {
    const cachedTree = this.uploadedTrees.get(localTreeSha);
    if (cachedTree) {
      return cachedTree;
    }

    const entries = localTreeEntries(commit);
    for (const entry of entries) {
      if (entry.type === "blob") {
        await this.uploadBlob(entry.sha);
      }
    }

    const result = await this.request<GitHubObject>(`${API_PREFIX}/git/trees`, {
      method: "POST",
      body: { tree: entries },
    });
    if (result.sha !== localTreeSha) {
      throw new Error(
        `GitHub returned tree ${result.sha}, expected local tree ${localTreeSha}.`,
      );
    }
    this.uploadedTrees.set(localTreeSha, result.sha);
    return result.sha;
  }

  async uploadCommit(commit: string): Promise<void> {
    const details = localCommitDetails(commit);
    const tree = await this.uploadTree(commit, details.tree);
    const result = await this.request<GitHubObject>(
      `${API_PREFIX}/git/commits`,
      {
        method: "POST",
        body: {
          message: details.message,
          tree,
          parents: details.parents,
          author: details.author,
          committer: details.committer,
        },
      },
    );
    if (result.sha !== commit) {
      throw new Error(
        `GitHub returned commit ${result.sha}, expected local commit ${commit}.`,
      );
    }
  }

  async updateBranch(
    expectedRemoteSha: string | null,
    localSha: string,
  ): Promise<void> {
    if (expectedRemoteSha) {
      await this.request(`${API_PREFIX}/git/refs/heads/${BRANCH}`, {
        method: "PATCH",
        body: { sha: localSha, force: false },
      });
    } else {
      await this.request(`${API_PREFIX}/git/refs`, {
        method: "POST",
        body: { ref: `refs/heads/${BRANCH}`, sha: localSha },
      });
    }
  }
}

async function main(): Promise<void> {
  assertGitRepositoryIsReady();
  const localSha = git(["rev-parse", BRANCH]);
  const remote = new GitHubSync();
  const remoteSha = await remote.getRemoteSha();

  if (remoteSha === localSha) {
    console.log(
      `GitHub is up to date: ${REPOSITORY_OWNER}/${REPOSITORY_NAME} ${BRANCH} @ ${localSha}.`,
    );
    return;
  }

  if (
    remoteSha &&
    git(["merge-base", remoteSha, localSha], { allowFailure: true }) !==
      remoteSha
  ) {
    throw new Error(
      `Refusing to overwrite unexpected remote branch: GitHub ${BRANCH} is ${remoteSha}, which is not an ancestor of local ${BRANCH} ${localSha}.`,
    );
  }

  const commits = remoteSha
    ? git(["rev-list", "--reverse", `${localSha}`, `^${remoteSha}`])
        .split("\n")
        .filter(Boolean)
    : git(["rev-list", "--reverse", localSha]).split("\n").filter(Boolean);

  console.log(
    remoteSha
      ? `Syncing ${commits.length} new commit${commits.length === 1 ? "" : "s"} to ${REPOSITORY_OWNER}/${REPOSITORY_NAME}...`
      : `Syncing ${commits.length} commit${commits.length === 1 ? "" : "s"} to new GitHub branch ${REPOSITORY_OWNER}/${REPOSITORY_NAME}...`,
  );
  for (const commit of commits) {
    await remote.uploadCommit(commit);
  }
  await remote.updateBranch(remoteSha, localSha);

  const verifiedSha = await remote.getRemoteSha();
  if (verifiedSha !== localSha) {
    throw new Error(
      `GitHub branch verification failed: expected ${localSha}, found ${verifiedSha ?? "missing"}.`,
    );
  }
  git(["update-ref", `refs/remotes/github/${BRANCH}`, localSha]);
  console.log(
    `Pushed ${commits.length} commit${commits.length === 1 ? "" : "s"}; GitHub ${BRANCH} is now @ ${localSha}.`,
  );
}

main().catch((error: unknown) => {
  console.error(error instanceof Error ? error.message : String(error));
  process.exitCode = 1;
});
