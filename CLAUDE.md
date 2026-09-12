# Little Playroom

## Product

Little Playroom is a calm mobile play space for children aged five and six. The child should be able to play independently. Keep the app account-free for children, offline-capable where possible, and free of ads, lives, streaks, leaderboards, and pressure-based rewards.

The five existing activities are Color Studio, Little Piano, Find the Pairs, Math Mix, and Reading Mix. Deepen the existing games before proposing new ones.

## Design standard

- Start with the child action: tap, draw, match, listen, count, or play a note.
- Use large touch targets, direct manipulation, short spoken prompts, and legible text.
- Keep one task visible at a time.
- Use warm, restrained color and original illustration. Avoid generic emoji, busy backgrounds, and rewards that interrupt play.
- Memory is the current visual benchmark. Raise the other games to the same level of specificity and polish.
- Test changes on real five- and six-year-olds. Record observations as evidence, then adjust the design.

## Technical context

- The app is in `artifacts/little-playroom/` and uses Expo, React Native, Expo Router, TypeScript, Expo Audio, and AsyncStorage.
- Screens live in `artifacts/little-playroom/app/`.
- Bundled audio and images live in `artifacts/little-playroom/assets/`.
- The app currently relies on Replit-specific development variables in its `dev` script. Add a standard Expo workflow before removing Replit-specific files.
- Preserve local drawing storage and the shared spoken-guidance preference unless a replacement has been designed and tested.
- Do not add a server, account system, analytics, or external service without proposing the product, privacy, cost, and maintenance tradeoff first.

## Working rules

- Read `PLAN.md` and the latest `SESSION-LOG.md` before substantial work.
- Assess a proposed design or feature before editing the live implementation. Put substantial copy or product changes in a draft for review first.
- Verify TypeScript after code changes. Add automated coverage for core game flows as the project matures.
- Keep changes scoped and commit them atomically. Do not use `git add .`; stage explicit files only.
- Update `PLAN.md` when product direction changes and add a dated entry to `SESSION-LOG.md` at the end of a substantive session.
