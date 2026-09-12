# Little Playroom

Little Playroom is a calm collection of creative and early-learning activities for children ages 4–8. It is built with Expo and React Native, with large direct controls, gentle feedback, original illustrations, and no account required to play.

## Activities

### Color Studio

- Finger painting with a child-friendly canvas
- Pen, marker, and watercolor tools
- Multiple colors, undo, clear, and undo-after-clear
- Local drawing persistence
- Scroll mode for navigating larger artwork

### Little Piano

- Landscape piano with bundled note audio
- Guided songs and next-key cues
- Touch-friendly keys designed for small screens

### Find the Pairs

- Memory-matching rounds with original illustrations
- Randomized cards for replayability
- Clear, non-punitive feedback

### Math Mix

- Visual comparisons: more, less, and the same
- Simple addition, subtraction, and multiplication
- Drag-and-drop counting rounds with a bank of balls and a basket
- Spoken instructions using the same narrator as Reading Mix

### Reading Mix

- Spoken word-to-picture matching
- First-sound choices
- Simple word building
- Correct letters remain in place after a mistake
- Original illustrations instead of emoji

## Spoken guidance

Reading Mix and Math Mix share one persistent narration setting:

- Spoken guidance is on by default.
- Instructions play automatically after a short arrival pause.
- Tapping the speaker icon turns narration off across both games and stops current speech.
- Tapping the muted speaker turns narration back on, reads the current instruction, and restores future autoplay.
- The preference persists across navigation and app reloads.
- Piano notes are not affected by the narration setting.

All learning prompts are bundled with the app for consistent pronunciation, pacing, and offline playback.

## Design principles

- One obvious task at a time
- Large controls that act directly on visible objects
- Warm, low-stimulation colors
- Short written instructions aligned with spoken guidance
- Gentle retries without lives or punitive resets
- Guest play without sign-in

## Technology

- [Expo](https://expo.dev/)
- [React Native](https://reactnative.dev/)
- [Expo Router](https://docs.expo.dev/router/introduction/)
- TypeScript
- Expo Audio
- React Native Gesture Responder System
- AsyncStorage for local preferences and drawings

## Project structure

```text
artifacts/
  little-playroom/   Expo mobile app
  api-server/        Shared API artifact
  mockup-sandbox/    Design exploration previews
```

The main application screens are in `artifacts/little-playroom/app/`. Bundled images and audio are in `artifacts/little-playroom/assets/`.

## Run on Replit

Open the **Little Playroom** preview or start the configured workflow:

```text
artifacts/little-playroom: expo
```

Scan the displayed QR code with Expo Go to open the app on a phone.

## Run locally

This repository uses pnpm workspaces.

```bash
pnpm install
pnpm --filter @workspace/little-playroom exec expo start
```

Then open the web preview or scan the QR code with Expo Go.

## Checks

Run the Little Playroom TypeScript check:

```bash
pnpm --filter @workspace/little-playroom run typecheck
```

Run all workspace checks:

```bash
pnpm run typecheck
```

## License

MIT