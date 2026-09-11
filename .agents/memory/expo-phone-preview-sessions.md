---
name: Expo phone preview sessions
description: How to distinguish a stale phone preview from an Expo app or Metro failure.
---

When the Replit phone preview shows a broken-file screen but the direct Expo preview loads, verify the current Expo Go session before changing application code. A fresh workflow restart generates a new QR/session; scan that current QR in Expo Go rather than reusing an older QR, phone tab, or deep link.

**Why:** The web bundle and artifact route can remain healthy while an old phone-preview session has expired or points at a previous workflow instance.

**How to apply:** Confirm Metro reports a running packager and the direct preview renders. Restart the managed Expo workflow once, reopen “Preview on your phone,” and scan the newly displayed QR. Treat the missing optional React Native DevTools library as unrelated unless Metro itself fails.