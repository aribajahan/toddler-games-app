---
name: Bundled learning prompts
description: Why child-facing spoken prompts use bundled audio instead of runtime text-to-speech.
---

Use bundled voice clips through the app's existing audio player for child-facing learning prompts rather than runtime text-to-speech.

**Why:** Bundled clips work offline, keep pronunciation and pacing consistent, and avoid native speech-package compatibility or device-voice differences. The user explicitly confirmed that a short arrival pause followed by a complete spoken instruction was a strong improvement.

**How to apply:** Add clearly named prompt files alongside the existing game audio and map each fixed learning round to its clip. When audio carries the instruction, let the screen settle for about one second before autoplay and speak the complete action, target, and choices—not only the target word. Keep a replay control available.