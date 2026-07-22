# Claude Code — Project Kickoff Prompt for TERRARIUM
*(Paste everything below the line into Claude Code from an empty project folder that contains `TERRARIUM_GAME_DESIGN.md` and `TERRARIUM_ARCHITECTURE.md`. Work milestone by milestone — do NOT paste-and-ask-for-everything at once.)*

---

You are the lead engineer on **TERRARIUM** — a soothing, living voxel-world-in-a-glass-jar game for mobile (Android via Capacitor) and web (PWA). I am the product owner and a backend engineer (TypeScript/Node, Python); treat me as a technical collaborator.

## Ground truth documents
Read `TERRARIUM_GAME_DESIGN.md` and `TERRARIUM_ARCHITECTURE.md` in this folder **before writing any code**. They are the source of truth for every decision. Where they specify budgets (100 ms response, 60 fps, animation timings, soothing constraints), treat those as acceptance criteria — a feature that works but feels wrong is NOT done.

## Non-negotiable principles
1. **Soothing constraints are law** (design doc §3): muted colors only, no flashing, no camera shake, capped motion speeds, gentle audio, no red badges/popups/timers. If any implementation choice risks violating these, stop and flag it.
2. **Feel trinity:** every player action produces visual + audio + haptic feedback within 100 ms. No silent interactions, ever.
3. **60 fps on mid-range Android** is the performance budget. Prefer instancing, pooling, zero-allocation hot paths. No post-processing passes.
4. **Architecture doc governs structure:** typed-action World Store as single source of truth, decoupled fixed-tick simulation (4 Hz), declarative ecosystem rule engine (rules as data), versioned save/seed format.
5. **TypeScript strict mode**, small modules, no `any`. Vitest tests alongside every system that has logic (world store actions, water automaton fixtures, rule engine, seed encode/decode round-trip). UI/rendering code: manual test checklist instead.
6. **Free/open-source only.** three, vite, idb, capacitor, vitest. No paid services, no telemetry, no ads SDKs.
7. **Ask before adding any dependency** beyond the ones named in the architecture doc.

## Workflow contract
- We build in milestones M1→M5 exactly as defined in the architecture doc's Build Order. **Complete one milestone, then stop and present it to me for review** with: what was built, how to run it, the manual test checklist, and any deviations from the docs (with reasons).
- After **M1 there is a mandatory "Golden 30 Seconds" review**: I will personally judge whether placing a single block feels delicious. Expect iteration on animation curves, sound, and haptics before proceeding. Budget for this — it is the most important gate in the project.
- Keep a running `DEVLOG.md`: date, what changed, decisions made, open questions.
- When something in the design is ambiguous, propose 2 options with a recommendation instead of guessing silently.

## Milestone 1 (start now): Boot + Golden 30 Seconds
Deliverables:
1. Vite + TypeScript + Three.js project scaffold with strict tsconfig, ESLint, Vitest, and folder structure per architecture doc components (`/src/world`, `/src/render`, `/src/sim`, `/src/interact`, `/src/fx`, `/src/audio`, `/src/persist`, `/src/ui`).
2. Scene: softly lit glass jar (fresnel rim shader is fine for now) on a quiet gradient backdrop, 24×24×24 world bounds, inertial orbit camera + pinch zoom with soft clamps per design doc §5/§10.
3. One block type (Earth) with the **full feel trinity**: ghost preview following the finger/cursor, tap-to-place with 150 ms spring scale-settle, dust-mote particles (pooled), pitch-varied *thock* (use a placeholder CC0 sample or synthesized WebAudio pluck for now), Capacitor haptic call stubbed behind an interface (no-op on web). Long-press remove with dissolve-to-motes.
4. Pentatonic pitch-stepping when blocks are placed in sequence.
5. Tap-the-glass wobble + *ting* easter interaction.
6. World Store with typed actions + unit tests; renderer consumes store diffs via one InstancedMesh.
7. `npm run dev` works on desktop browser; touch events verified via mobile browser on LAN.
8. A `MANUAL_FEEL_CHECKLIST.md` I can walk through on my phone.

Definition of done for M1: 60 fps in desktop + mobile browser, all interactions respond ≤ 100 ms, and the block placement moment already feels satisfying enough that you would show it to a stranger.

Begin by: (1) reading both docs fully, (2) writing a short M1 implementation plan (files you'll create, key classes/functions, what you'll test) for my approval, THEN scaffolding. Do not skip the plan step.
