---
name: Expo orientation previews
description: Explains how to verify landscape-only screens when Expo web preview cannot lock orientation.
---

Landscape-only Expo screens need separate handling for native devices and the web preview. Native can use the orientation API, while web should render a rotated fallback without calling the unsupported lock API.

**Why:** The preview may remain inside an upright phone frame even when the app reports or requests landscape. Conditional spacing based only on reported orientation can leave controls inside the frame's clipping zone.

**How to apply:** Verify the true landscape viewport and the upright rotated fallback separately. Keep critical controls visibly inset in both captures, and guard native orientation-lock calls away from web.