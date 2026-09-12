# Little Playroom plan

## Product direction

Little Playroom is a calm, child-led mobile play space for one clear audience: children aged five and six. It should feel inviting before it feels instructional. A child should be able to begin without reading, make choices without adult help, and return because the activities change with them.

The current app already has five activities: Color Studio, Little Piano, Find the Pairs, Math Mix, and Reading Mix. The next version should deepen the existing games before adding more.

## Decisions already made

- GitHub is the source of truth. Development will continue locally; Replit is no longer required.
- The first audience is five- and six-year-olds, including Ariba's son. This should guide every content, interaction, and device-testing decision.
- The app should stay calm, account-free for children, and free of punitive scoring, lives, streaks, and advertising.
- The current visual quality is not sufficient. Before a broad UI rebuild, collect visual references and choose an art direction that makes the app more beautiful and distinctive.

## Current assessment

### Strong foundations

- Native Expo and React Native app, with a clean screen-per-game structure.
- Original illustration system, local audio, haptics, large controls, and offline play.
- Color Studio preserves drawings locally. Math and Reading preserve the narration preference.
- Memory has the clearest visual identity and is the best reference for the rest of the app.

### Work to do

- Math and Reading use small, fixed content sets. Random order alone will become repetitive.
- The home screen presents five equal choices but does not guide a child into a session.
- The visual language varies in quality across games. Math and Reading need the most design attention.
- There is no parent area for settings or a simple view of recent play.
- The repository has Replit-specific launch setup, unused workspace material, no automated game-flow tests, and no store-release configuration.

## Build sequence

### Phase 1: establish the visual direction

Collect a small set of child-app references and document the specific traits worth borrowing: illustration style, card shapes, type scale, motion, feedback, and density. Use the result to write a short visual system for Little Playroom.

Apply the chosen system to the home screen and one complete game, starting with Math Mix or Reading Mix. Memory remains the quality reference for illustrated play.

**Decision needed from Ariba:** choose the preferred visual direction after reviewing reference options.

### Phase 2: make Math Mix grow with the child

Create a simple local progression for Math Mix. Begin with comparing quantities and counting; introduce number composition and arithmetic when the child repeatedly succeeds. Keep retry feedback warm and direct. Save progress only on the device.

Add enough prompt variations that a child can play several sessions without simply memorizing answers.

### Phase 3: deepen Reading Mix

Expand word, sound, and word-building content for early readers. Group activities by the skill they practice and use local progress to choose an appropriate next round.

Test every prompt with a five- or six-year-old for comprehension, pacing, touch target size, and whether the spoken direction is enough without an adult reading the screen.

### Phase 4: create the playroom experience

Revise the home screen around a short session: one creative invitation, one music invitation, and one learning invitation. Keep the complete activity library reachable from the same screen.

Add a parent area behind a simple parent gate. It should hold sound settings, reset controls, and a plain summary of recent activity. Avoid scores and streaks.

### Phase 5: make the app independently shippable

Replace the Replit-specific local workflow with documented standard Expo commands. Remove or isolate unused API and mockup packages after confirming they are not needed by the app.

Add automated checks for core game flows, test on real iPhone and Android devices, add iPad support if desired, and configure Expo Application Services for internal builds and app-store release.

## First next action

Create a visual-reference board for Little Playroom, then choose one direction before redesigning Math Mix.

## Agent workflow

One lead agent owns the product direction, design decisions, implementation plan, and integration work. Subagents take bounded research, review, and verification tasks, then return evidence for the lead agent to synthesize. Ariba reviews the decisions that change the product.

| Work | Recommended model | Ownership | Expected result |
| --- | --- | --- | --- |
| Product direction for five- and six-year-olds | GPT-6 Astra, high reasoning | Lead agent | Decisions about the child experience, learning progression, parent area, and build order |
| Visual-reference research | GPT-6 Astra or GPT-5.6 Sol | Subagent | A small reference board, specific design traits to borrow, and one recommended direction |
| Child-experience review | GPT-5.6 Sol, high reasoning | Subagent | Screen-by-screen findings on reading load, touch targets, pacing, repeat play, and likely confusion |
| Technical handoff review | GPT-5.6 Terra or GPT-5.6 Sol | Subagent | Replit-specific code, local-development needs, unused packages, test gaps, and a safe cleanup proposal |
| Math Mix visual redesign and implementation | GPT-6 Astra, high reasoning | Lead agent | Production React Native code integrated with the existing app |
| Illustration explorations | Image-generation model, directed by the lead | Subagent or design task | A few focused visual directions for Ariba to choose from |
| Typecheck, flow testing, and code review | GPT-5.6 Sol or GPT-5.6 Terra | Subagent | Test results and actionable defects or regressions |
| Mechanical work | GPT-5.6 Luna | Subagent | File inventories, formatting, asset manifests, and documentation updates |

### First parallel research pass

Run these three tasks at the same time:

1. **Visual-reference researcher:** study Pok Pok, Sago Mini, Toca Boca, Khan Academy Kids, and independent child-app studios. Return 10–15 references with images, notes on illustration, type, interaction, motion, and density, plus one proposed visual direction for Little Playroom.
2. **Child-experience reviewer:** examine the current five games for a five- or six-year-old. Identify what a child can do independently, where an adult would need to help, where content will become repetitive, and what interaction may frustrate them.
3. **Technical handoff reviewer:** map the Expo application, Replit-specific setup, unused workspace code, missing local workflow, tests, and release configuration. Return a scoped cleanup and verification plan; do not make edits.

The lead agent turns those results into one proposal for Ariba: a visual direction, an updated Math Mix concept, and the smallest local-development setup change required to begin building.

### Ariba's decisions

- Choose the visual direction.
- Confirm whether Little Playroom is primarily play, early learning, or both.
- Decide what a parent can see and control.
- Decide whether the app will ever use accounts, cloud sync, or analytics.
- Approve TestFlight or App Store preparation when the app is ready.
