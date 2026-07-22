# TERRARIUM — Technical Architecture
**Version 1.0 · July 2026**

## Problem Statement
A mobile-first, offline-first 3D voxel sandbox ("living jar") that must hit 60 fps on mid-range Android phones, feel instantly responsive, run entirely client-side for MVP, and later gain lightweight sharing via a free-tier backend. Built by one developer + Claude Code using only free/open-source tools.

## Scope
**In (MVP / v0.1):** rendering, input/gesture system, voxel world model, cellular water, ecosystem rule engine, real-time clock simulation, save/load, audio/haptics, photo export, Android (Capacitor) + PWA builds.
**Out (until v0.3):** any server, accounts, sharing/forking, Daily Seed Jar, monetization, iOS build (deferred only for lack of a Mac; codebase stays iOS-ready via Capacitor).

## Stack Decision ⚠️ (hard to reverse)
**Chosen: Three.js + TypeScript + Vite + Capacitor (+ PWA).**
**Why:** matches Sajib's production TS/Node skills → faster reviews and debugging with Claude Code; a web build is a *distribution feature* (shared jars open in any browser — critical for the v0.3 viral loop); Three.js gives full control over the small-scene rendering we need; entire chain is MIT/free.
**Alternatives:**
- *Godot 4:* excellent and free; rejected because GDScript/C# is outside daily stack, web export is heavier (WASM payload), and deep-linking a live jar into a browser page is clunkier.
- *Unity:* license/runtime politics, heavyweight, not fully open.
**What this makes harder:** we hand-roll things engines give free (scene tooling, particles). Acceptable at our small scene size.

## Component Overview
```
[Touch/Gesture Layer] ──intents──► [Interaction Controller]
        │                                   │ place/remove/paint/plant
        ▼                                   ▼
 [Camera Rig (inertial)]            [World Store (voxel state)]
        │                                   │ diffs
        ▼                                   ▼
 [Renderer (Three.js)] ◄──mesh/instances── [Mesher & Instancer]
        ▲                                   │
        │ visual events                     ▼
 [FX System (particles,            [Simulation Loop]
  glow sprites, tweens)]            ├─ Water automaton
        ▲                           ├─ Growth system (real-time)
        │                           ├─ Ecosystem Rule Engine ──► [Jar Journal]
 [Audio Engine (WebAudio)]◄─events──┤─ Creature agents (steering)
 [Haptics (Capacitor)]   ◄─events───┘
        
 [Persistence] ◄─ autosave/debounce ─ [World Store]
   └─ IndexedDB (jars, journal, settings)  · export/import seed-string
 [Photo Export] ─ offscreen render pass ─► PNG/WebM share sheet
```

## Components

### World Store (single source of truth)
- Jar volume: bounded voxel grid, MVP **24×24×24** (tunable per jar shape). `Uint8Array` for block type + parallel `Uint8Array` for paint-color index + `Uint8Array` water level (0–7).
- All mutations flow through typed actions (`place`, `remove`, `paint`, `plant`, `simTick`) → enables undo (single-step, calm), autosave diffing, and deterministic replay for the future Daily Seed Jar.
- Zero allocations in hot paths; arrays reused.

### Mesher & Instancer
- Blocks: greedy-meshed chunk geometry is **overkill at 24³** — instead one `InstancedMesh` per material (max ~13.8k instances worst case; real jars ~1–3k). Rebuild is incremental: only changed instances update their matrix/color attribute.
- Rounded-bevel look via a shared beveled-cube geometry + vertex-color tint (paint system = writing instance color — no textures needed for MVP).
- Life (grass tufts, reeds, moss decals, flowers): instanced crossed-quad sprites with a cheap vertex-shader sway (`sin(time + worldPos)`).

### Renderer
- Three.js WebGL2; `SRGBColorSpace`; no post-processing chain in MVP (no bloom — per soothing spec, glow = additive soft sprites).
- Lighting: 1 directional (sun/moon, animated over day cycle) + hemisphere ambient; PCF soft shadow map 1024² only from the directional; baked-ish AO: cheap per-voxel neighbor-darkening written into instance color (recomputed only for touched neighborhoods).
- Glass jar: single mesh, `MeshPhysicalMaterial` with transmission OR (low-end fallback) simple fresnel-rim shader. Auto quality tiers: HIGH (transmission+shadows), MED (rim+shadows), LOW (rim, no shadows, 30 fps cap) selected by a 3-second startup benchmark + manual override.

### Simulation Loop (decoupled from render)
- Fixed tick **4 Hz** via accumulator inside rAF (no worker needed at this scale; Web Worker port is a clean later optimization since World Store is transferable arrays).
- **Water automaton:** classic level-based cellular flow (level 0–7, flows down then sideways to lower levels), settles to flat pools; max ~2 rules per cell per tick, dirty-cell set only.
- **Growth:** timestamped plant records; growth stages computed from *real elapsed wall-clock time* (`Date.now`), so absence = growth. On app open, fast-forward is computed instantly (pure function of Δt) then gently animated over ~3 s ("the jar lived without you").
- **Ecosystem Rule Engine:** declarative rules in a data file:
  ```ts
  { id:"R3_dragonfly", when: ctx => ctx.count("reed")>=1 && ctx.waterSurface>=4,
    spawn:{ agent:"dragonfly", max:1 }, journal:"A dragonfly found your reeds." }
  ```
  Evaluated on dirty-region changes + on day/night flips; hysteresis (enter/exit thresholds differ) so life never flickers in/out.
- **Creature agents:** ≤ 12 concurrent; simple steering (wander within jar bounds, attract points e.g. lantern/finger, avoid glass) on the render loop with per-agent 10 Hz decision throttling.

### Interaction Controller & Camera
- Raycast against instanced blocks (`InstancedMesh.raycast`) + jar glass; ghost-preview mesh follows hover/touch.
- Gesture disambiguation: drag-on-empty = orbit; tap-on-surface = tool action; long-press = remove; pinch = zoom. 100 ms response budget enforced by doing raycast on `pointerdown`, not `pointerup`.
- Camera: spherical orbit rig with velocity + exponential damping; zoom/rotation soft-clamped (no gimbal flips, no under-floor views) per soothing spec.

### FX / Audio / Haptics
- Particles: one pooled instanced-sprite system (dust motes, water sparkle, dissolve motes, falling leaves); hard cap ~300 sprites.
- Tweens: tiny in-house spring/ease util (`animate(value, target, {spring})`) — no heavy tween lib.
- Audio: WebAudio graph — ambient bed (2 crossfading loops day/night + weather layer) → lowpass → master; SFX sample pool with ±3-semitone `playbackRate` variance; pentatonic pitch-step sequencer for consecutive placements. All assets CC0.
- Haptics: Capacitor Haptics plugin, `impactLight` only; no-op on web.

### Persistence
- IndexedDB via `idb` (tiny MIT lib): `jars` (id, name, world buffers, plant records, discovered rules, updatedAt), `settings`.
- Autosave: debounced 2 s after last mutation + on `visibilitychange`. Save size ≈ 24³×3 bytes ≈ 41 KB raw, ~5–10 KB gzipped.
- **Seed/export format ⚠️ (hard to reverse — this becomes the sharing contract):** versioned binary layout `[header ver | jarShape | palette | RLE blocks | RLE paint | plants | journal bits]` → gzip → base64url. Design it v1-clean now; v0.3 sharing just moves these strings through Supabase.

### Photo Export
- Offscreen render at 2× resolution with DoF-approximation (two-pass blur composite) + vignette + golden-hour light preset → PNG via `canvas.toBlob` → Capacitor Share / Web Share API. 5-s turntable WebM via `MediaRecorder` (phase M4 stretch).

## Data Flow (place-block happy path)
1. `pointerdown` → raycast → ghost snaps to target cell (≤ 50 ms).
2. `pointerup` (same cell) → `WorldStore.dispatch(place)`.
3. Store mutates arrays, marks dirty region, emits diff.
4. Mesher updates 1 instance matrix/color; FX spawns dust; Audio plays *thock* (pitch-stepped); Haptics `impactLight`. All same frame.
5. Sim engine (next tick ≤ 250 ms) re-evaluates rules on dirty region → may spawn life → Journal event → soft chime + journal glow.
6. Autosave debounce.

## External Dependencies
| Dependency | If unavailable | Mitigation |
|---|---|---|
| three, vite, typescript, idb, capacitor (all npm, MIT) | build-time only | lockfile pinned |
| CC0 audio (freesound/Kenney) | — | assets vendored into repo |
| Supabase (v0.3 only) | sharing down | game fully offline-capable; seed-strings shareable as plain text regardless |

## Scalability / Risk Analysis
**R1 — Frame drops on low-end Android.** Biggest real risk. Mitigation: instancing-only scene, no post-processing, quality tiers, particle caps, agent caps, 30 fps floor mode. Residual: 2018-era devices may stutter; acceptable.
**R2 — Water automaton pathologies** (oscillation, infinite spread). Mitigation: level-based rules are provably convergent in bounded volume; dirty-set evaluation; unit tests with fixture worlds (waterfall, U-tube, basin).
**R3 — Sim/render coupling jank.** Mitigation: fixed-tick accumulator, all sim outputs are *targets* that visuals spring toward; worker migration path reserved.
**R4 — Save corruption / data loss** (a player's beloved jar is sacred). Mitigation: versioned schema, double-buffer writes (write new record, then swap pointer), export-string backup surfaced in settings, migration tests.
**R5 — Scope creep** (the classic sandbox killer). Mitigation: phase gates in the design doc; M1 sign-off ritual; rule engine is data-driven so content growth ≠ code growth.

## Key Decisions (summary)
1. ⚠️ **Three.js/TS/Capacitor over Godot** — skills + web-shareability (above).
2. ⚠️ **Seed/export binary format versioned from day 1** — sharing contract.
3. **InstancedMesh over chunk meshing** — right-sized for 24³; reverse: easy.
4. **Real-wall-clock growth (pure function of Δt)** — no background tasks, no server, deterministic; reverse: easy.
5. **Declarative rule engine** — content as data; enables Daily Seed determinism; reverse: moderate.
6. **No post-processing pipeline** — perf + soothing aesthetic alignment; reverse: easy.
7. **IndexedDB local-first; Supabase only additive later** — offline-first forever; reverse: n/a (additive).

## Build Order (for Claude Code)
M1 scaffold: Vite+TS+Three boot → jar+camera → block place/remove with full feel → **STOP for Golden-30s review** → M2 world systems (blocks, water, save, day/night) → M3 sim engine + rules + journal + audio bed → M4 brush + photo → M5 packaging (Capacitor Android, PWA, quality tiers, settings). Parallelizable: audio asset prep, palette design, rule-content authoring (data files) anytime after M1.

## Open Questions (resolve during build, none block M1)
- Jar dimensions 24³ vs 28³ after perf test on real device.
- Transmission glass vs fresnel-only default on MED tier.
- Undo depth: single-step vs 10-step ring buffer.
- Final name + app id (`com.sajib.terrarium` placeholder).
