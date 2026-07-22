# TERRARIUM — Devlog

Running log of what changed, decisions made, and open questions. Newest first.

---

## 2026-07-22 — M1: Boot + Golden 30 Seconds

**What was built**
- Vite + TypeScript (strict) + Three.js scaffold with ESLint (flat config) and Vitest.
- Folder structure per architecture doc: `world`, `render`, `sim`, `interact`, `fx`,
  `audio`, `persist`, `ui`.
- **World Store** — single source of truth. `Uint8Array` block grid, typed actions
  (`place`/`remove`), diff emission with a reused scratch buffer (zero-alloc hot path),
  instance-recycling free list. 9 unit tests.
- **Renderer** — WebGL2, SRGB, PCF soft shadows, one directional key light + hemisphere
  ambient, muted gradient backdrop. No post-processing (soothing spec).
- **Glass jar** — cheap fresnel-rim shader fallback + gentle tap wobble.
- **Camera rig** — spherical orbit with velocity + exponential damping, soft-clamped
  polar/zoom, capped angular velocity, inertial fling-to-rest ≤ ~1.2 s.
- **BlockInstancer** — single `InstancedMesh`, incremental per-diff updates, free-list
  slot recycling, reverse slot→cell map for raycast picking.
- **Feel trinity for Earth**: ghost preview, tap-to-place with 150 ms spring scale-settle
  (damping 0.8), pooled dust motes, synthesized pitch-stepped *thock*, light haptic;
  long-press remove with dissolve motes + softer *pock* + double tick.
- **Pentatonic pitch-stepping** across consecutive placements, resets after a pause.
- **Tap-the-glass** wobble + filtered *ting* easter interaction.
- **FX** — in-house `Spring`/`damp`/ease utils (6 tests) + pooled `Points` particle system
  (hard cap 300, soft round motes, no bloom).
- **Audio** — WebAudio graph (lowpass → gentle master), synthesized thock/pock/ting,
  resumes on first gesture, mute toggle.
- **Haptics** — behind an interface; web Vibration-API fallback, Capacitor path stubbed
  for M5, no-op where unsupported.
- **SimLoop** — 4 Hz fixed-tick accumulator with catch-up cap (3 tests). Nothing to sim
  in M1; scaffold ready for M2/M3.
- **Persist** — `SaveStore` seam + `NullSaveStore`; real IndexedDB/seed format is M2.
- **HUD** — near-invisible fading hint + quiet sound/haptics toggles.
- Docs: `MANUAL_FEEL_CHECKLIST.md`, this devlog.

**Verification**
- `npm run typecheck` clean (strict, `noUncheckedIndexedAccess`, no `any`).
- `npm run lint` clean.
- `npm run test` — 18/18 passing (world store, spring, sim loop).
- `npm run build` — production build succeeds.
- Headless Chromium smoke test: canvas mounts, tap places a block, **zero** console/page
  errors.

**Decisions**
- Ghost + placement raycast run on `pointerdown` (not up) so first response beats the
  100 ms budget. Gesture disambiguation: <9 px + short = tap; drag = orbit; 2 fingers =
  pinch; 350 ms hold on a block = remove.
- First block lands on an invisible floor plane at the bottom of the jar volume; later
  blocks snap to the neighbor of the hit face.
- Instance capacity = full volume (13.8k) so the free list never reallocates; real jars
  use 1–3k. Matches arch doc guidance.
- `idb` intentionally NOT added yet — persistence is an M2 deliverable; kept M1 focused
  on feel per the kickoff prompt.

**Deviations from the docs (with reasons)**
- Haptics on web use the Vibration API rather than Capacitor `impactLight` (no native
  shell until M5). Interface boundary is in place, so the swap is local.
- Glass uses the fresnel-rim fallback only; transmission-vs-fresnel on MED tier is an open
  question the arch doc defers to a real-device perf test.

**Open questions for the Golden-30s review**
- Are the thock timbre, pitch range, and decay right, or should the woody character be
  rounder / lower?
- Is the 150 ms settle springy enough, or too bouncy? (damping currently 0.8.)
- Dust mote count/size/rise — enough "puff," or too much?
- Jar wobble amplitude on glass tap — is it delightful or distracting?
