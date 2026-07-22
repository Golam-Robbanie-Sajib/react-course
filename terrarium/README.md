# 🫙 TERRARIUM

*A living voxel world in a glass jar — soothing sandbox for mobile (Capacitor) and web (PWA).*

> Minecraft's creativity, bonsai's calm, in a jar that lives while you're away.

This is the **Milestone 1** build: *Boot + Golden 30 Seconds*. Per the design doc, M1
does one thing only — make **placing a single block in an empty jar feel delicious** —
with the full feel trinity (visual + audio + haptic within 100 ms). Broader world systems
(10 blocks, water, day/night, save/load, ecosystem rules, journal, brush, photo, packaging)
arrive in M2–M5.

## Quick start

```bash
cd terrarium
npm install
npm run dev
```

Open the **Local** URL on desktop. For on-device touch testing, open the **Network** URL
printed in the terminal on a phone on the same Wi-Fi (the dev server binds to the LAN).

## Scripts

| Command | What it does |
|---|---|
| `npm run dev` | Vite dev server (LAN-exposed for phone testing) |
| `npm run build` | Type-check + production build to `dist/` |
| `npm run preview` | Serve the production build |
| `npm run test` | Vitest unit tests (world store, spring, sim loop) |
| `npm run lint` | ESLint (strict, no `any`) |
| `npm run typecheck` | `tsc --noEmit` |

## What you can do in M1

- **Tap** inside the jar to place an Earth block — spring settle, dust motes, woody
  *thock*, light haptic. Placing in sequence steps a **pentatonic melody**.
- **Long-press** a block to remove it — dissolve motes, softer *pock*.
- **Drag** empty space to orbit (inertial glide); **pinch** to zoom (soft clamps).
- **Tap the glass** for a gentle wobble + *ting*.
- Quiet **sound / haptics** toggles top-right.

Walk `MANUAL_FEEL_CHECKLIST.md` on desktop and phone to judge the Golden 30 Seconds.

## Architecture (M1 slice)

Single-source-of-truth **World Store** (typed actions → diffs) drives a single
**InstancedMesh** renderer. Input is decoupled through an **Interaction Controller**;
simulation runs on its own **4 Hz fixed-tick** accumulator so sim and render never couple.
FX/Audio/Haptics react to interaction events. See `DEVLOG.md` for the full M1 breakdown and
`TERRARIUM_ARCHITECTURE.md` / `TERRARIUM_GAME_DESIGN.md` (repo root) for ground truth.

```
src/
  world/     WorldStore (Uint8Array grid, typed actions, diffs) + block defs
  render/    Renderer, CameraRig, Jar, Ghost, BlockInstancer, geometry, coords
  interact/  InteractionController (gestures, raycast, feel trinity)
  fx/        Spring/ease utils, pooled Particles
  audio/     AudioEngine (WebAudio), haptics interface
  sim/       SimLoop (4 Hz accumulator; systems land in M2/M3)
  persist/   SaveStore seam (IndexedDB impl is M2)
  ui/        Hud (near-invisible)
```

## Stack

Three.js · TypeScript (strict) · Vite · Vitest — all MIT/free. Capacitor (Android) + PWA
packaging come in M5. No paid services, no telemetry, no ads.

## Soothing constraints (non-negotiable)

Muted low-saturation palette · no flashing/bloom · no camera shake · capped motion · gentle
low-passed audio · soft light haptics only · no badges/popups/timers. A feature that works
but *feels* wrong is not done.
