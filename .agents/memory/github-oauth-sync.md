---
name: GitHub OAuth sync
description: Environment constraint for backing up Git history through the managed GitHub connection.
---

Replit-managed GitHub OAuth cannot be consumed by ordinary `git push` authentication in this environment; repository backup must use the connector's authenticated API proxy instead of storing a personal access token.

**Why:** Direct Git transport rejected the managed credential, while the connector proxy can authenticate GitHub REST calls without exposing a token to the repository.

**How to apply:** When syncing Git history, recreate GitHub Git database objects from local commits and advance the remote ref only with a non-force update after checking that the remote is an ancestor.