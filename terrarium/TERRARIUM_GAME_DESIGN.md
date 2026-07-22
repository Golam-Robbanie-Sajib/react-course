# TERRARIUM (working title) — Game Design Document
### A living world in a glass jar
**Version 1.0 · July 2026 · Design: Sajib + Claude**

> Working-title alternatives (Bangla-rooted, globally pronounceable): **Bindu** (a drop / a point), **Shishi** (glass bottle), **Jhil** (small lake), **Dwip Jar**. Final name can be decided before store submission; codebase uses `terrarium`.

---

## 1. Vision

You are handed a small empty glass jar floating in soft light. You place a block of earth. Then another. You pour water; it settles into a pool. You paint the grass a dusty gold. And then — without being told to — a reed sprouts at the water's edge, a dragonfly arrives, and when evening falls inside the jar, fireflies rise from the grass you planted.

Nothing asks anything of you. There is no score, no timer, no failure, no notification. The jar simply lives, and it is yours.

**One-line pitch:** *Minecraft's creativity, bonsai's calm, in a jar that lives while you're away.*

**Fantasy delivered:** "I made a tiny living world with my own hands."

## 2. Design Pillars (every decision is tested against these)

1. **Soothing above all.** The game must never cause stress, urgency, or sensory strain. If a feature could produce a headache, frustration, or FOMO, it does not ship. No flashing, no shaking, no red badges, no countdowns, no fail states.
2. **The world responds.** Every player action gets an acknowledgment (visual + audio + haptic within 100 ms), and every *arrangement* of blocks can awaken life. Discovery of ecosystem rules IS the progression.
3. **One-gesture creativity.** Every creative tool is a single tap, swipe, or drag. Depth comes from combining simple tools, never from menu complexity.
4. **Finished is beautiful.** The jar's bounded volume means every build can reach "done." A finished jar is a collectible artwork, not an abandoned save file.
5. **Refined restraint.** Muted palettes, soft light, gentle motion, quiet UI. What we leave out is part of the design.

## 3. The Soothing Constraints (hard requirements)

These are acceptance criteria, not suggestions:

| Area | Constraint |
|---|---|
| Color | Muted, low-saturation palettes only. No pure white (#FFF max ~#F2EFE9), no pure black, no neon. Contrast kept comfortable; large soft gradients preferred. |
| Motion | Nothing moves faster than ~1.5 jar-widths/second. All animation ease-out or spring with high damping. **Zero** camera shake. No parallax that could induce motion sickness; camera orbit speed capped. |
| Light | No bloom spikes, no flashing, no strobing, no sudden brightness changes. Day↔night transitions take ≥45 real seconds. Night is navy-blue dark, never pitch black. |
| Audio | Ambient bed at conversational-quiet mixing level; no sound above gentle. All SFX low-pass filtered, rounded attack. No jingles, no alarms. Full mute never punished. |
| Haptics | Soft taps only (light impact). Never buzzing patterns. Toggleable. |
| UI | No red dots, no badges, no popups, no interstitials, no "rate us" nags in v1. Tools fade in around the finger and fade away. |
| Pace | Simulation is slow by design: plants grow over minutes-to-hours, not seconds. The player is never rushed and never punished for absence — returning after a week only means more growth, never decay-as-punishment. |
| Accessibility | "Extra calm" toggle: reduces motion further, thickens outlines, increases text size. Colorblind-safe palette variants. |

## 4. Core Loop

```
  Place / sculpt / paint  ──►  Jar responds with life (rule fires)
        ▲                              │
        │                              ▼
  Curiosity: "what else         Delight + tiny discovery
   can I awaken?"                (journal entry unlocks)
        ▲                              │
        └────────  Return later: jar has lived, ─┘
                   grown, changed with real time
```

Session shape: **2–10 minutes**, fully player-paced. Re-entry hook: real-time day/night + slow growth means the jar is always slightly different than you left it ("visiting a place," not "resuming a task").

## 5. Player Verbs (MVP)

| Verb | Gesture | Response (≤100 ms) |
|---|---|---|
| Orbit jar | one-finger drag outside jar | inertial glide, eases to rest |
| Zoom | pinch | 1:1 finger tracking, soft clamps |
| Place block | tap on surface (ghost preview follows finger) | scale-settle animation (~150 ms), soft *thock*, dust motes, light haptic |
| Remove block | long-press ~350 ms | block lifts + dissolves to motes, softer *pock* |
| Pour water | select water, tap | water spreads/settles with ripple + sparkle |
| Paint (brush) | select brush color, swipe across surfaces | watercolor bloom spreads from stroke (~250 ms), soft wet sound |
| Plant seed | tap soil with seed tool | sprout pops with squash-stretch; grows over real time |
| Touch life | tap creature/plant | butterfly flutters off, leaves rustle, fireflies drift toward held finger |
| Tap glass | tap outside surface of jar | gentle whole-jar wobble + glass *ting* (pure delight, no function) |
| Photo | camera button | one tap → framed shot with depth-of-field + golden light, saved/shareable |

Tool selection: a quiet radial ring appears around a touch-and-hold on empty space; fades when released. Maximum 6 tools visible in MVP.

## 6. Block & Material Set (MVP: 10)

Earth, Grass-earth, Stone, Sand, Water (fluid), Wood trunk, Leaf mass, Moss stone, Clay (warm terracotta), Lantern (soft warm glow, the only light-emitting block).

Phase 2+: snow, ice, mangrove root, bamboo, coral, mushroom, paper lamp, wind chime.

## 7. Ecosystem Rules (the heart)

Rules are simple **condition → life** pairs evaluated by the simulation (see architecture). Each first-time trigger writes a one-line entry into the **Jar Journal** ("A dragonfly found your reeds.") — the journal is the entire progression system: a book of discoveries, never a checklist with percentages.

### MVP rule set (8 rules)
| # | Condition (evaluated over sim ticks) | Life that awakens | Notes |
|---|---|---|---|
| R1 | Grass block with sky access | grass tufts sway; spreads to adjacent bare earth slowly | base "alive" feel |
| R2 | Water adjacent to earth/grass | reeds sprout at the waterline | classic first discovery |
| R3 | Reeds + water surface ≥ 4 blocks | a dragonfly patrols the pool | flying life = big delight |
| R4 | Stone block shaded (no direct sky) + near water | moss creeps over stone | rewards composition |
| R5 | ≥ 6 connected grass at "daytime" | 1–2 butterflies wander | population scales gently with area |
| R6 | Grass area + night time | fireflies rise (2–8, area-scaled) | signature nighttime image |
| R7 | Tree (trunk+leaves, placed or grown) matured | a small bird visits at dawn, sings 2 notes | audio reward |
| R8 | Lantern placed + night | moths circle the lantern | pairs with R6 for night scenes |

### Phase-2 rules (examples, 12+)
Flowers attract bees · sand + water = tiny crab · tall stone + bird = nest · rain (weather) fills basins · pruned bonsai style unlocks "ancient tree" visual · cross-bred flower colors attract new butterfly variants · still water at night reflects fireflies (pure rendering rule).

Rules must be **discoverable by intuition** (things behave as nature suggests) and **never punishing** — life leaves quietly if conditions break, and returns when restored. Nothing dies on screen.

## 8. Creativity Systems

**MVP:** the Brush — 8 muted dyes per biome palette applied to grass, water tint, and clay; watercolor-bloom application; painted colors subtly influence which butterfly/firefly hues visit (creativity feeds ecosystem).

**Phase 2:** Seeds & pruning — plant, snip with a tap (satisfying scissor haptic + falling leaf), shape trees bonsai-style; simple 3-gene flower cross-breeding (height, hue, bloom shape).
**Phase 2:** Mood dial — one radial control for sky hue, fog amount, ambience mix (rain-on-glass / crickets / wind), firefly density at night.
**Phase 3:** Jar shapes (round, tall, hanging bulb, hex), etched name on glass, shelf backdrops.
**Phase 3:** Share & fork — export a jar as a compact seed-code/link; anyone can open it on the web, view it living, and *fork* it into their own shelf. Daily Seed Jar: everyone starts the same jar; the shelf of global variations is the social layer. No comments, no likes-counting, no leaderboards — only gentle "forked from / forked by" lineage.

## 9. Progression Without Pressure

- **Jar Journal** — poetic one-liners for each first discovery; doubles as a soft hint system (silhouetted undiscovered entries: "Something likes still water at night…").
- **The Shelf** — completed/kept jars displayed as living dioramas you can revisit; the collection is the trophy room.
- **Biome seeds** — new starting palettes+block sets (Monsoon, Desert Dusk, Mangrove, Winter) unlock after N journal discoveries. Unlocks are quiet gifts, never gated grinds.
- No currency, no energy, no daily streak counters in v1. (Monetization, if ever: one-time "supporter jar" cosmetic pack + tip jar. Decide post-launch; nothing in the architecture depends on it.)

## 10. Game Feel Spec ("the Feel Spec")

**The Golden 30 Seconds rule:** Milestone 1 of development is exclusively perfecting *placing one block in an empty jar* — preview ghost, placement animation, sound, haptic, dust, settle — until it feels delicious. Nothing else is built until this is signed off.

### Response budgets
- Input → first visible response: **≤ 100 ms** (target 50).
- Frame rate: **60 fps** on a mid-range Android (e.g., 2022 Snapdragon 6-series); hard floor 30 fps on low-end with auto-reduced effects.
- Block place animation: 150 ms scale-settle (spring, damping 0.8).
- Brush bloom: 250 ms radial ease-out.
- Camera inertia: exponential decay, full stop ≤ 1.2 s after flick.
- Day↔night crossfade: ≥ 45 s, all colors LERP through the palette, never switch.

### Audio map (all CC0; sources: freesound.org, Kenney.nl)
| Event | Sound character |
|---|---|
| place block | soft woody *thock*, pitch varies ±3 semitones by material |
| remove | reversed soft *pock* |
| water | low bubbling settle |
| brush | wet paper wash |
| glass tap | filtered wine-glass *ting* |
| ambient day | air, distant birds, leaves |
| ambient night | crickets, rare owl, wind |
| rain mood | rain on glass |
Sequential block placements pitch-step within a pentatonic scale → building literally sounds musical.

### Haptic map
place = light impact · remove = two ultra-light ticks · glass tap = single light · prune = crisp light · all optional.

## 11. Art Direction

- **Form:** clean voxels with slightly rounded/beveled edges (softness matters), tiny idle animations on all life.
- **Light:** one warm key light + cool sky ambient; soft shadows; gentle SSAO inside the jar; subtle glass rim refraction/specular on the jar itself; fireflies/lantern glow via soft additive sprites (no HDR bloom pass — cheaper *and* calmer).
- **Palettes (MVP "Riverside" biome):** moss green `#7A8B6F`, earth `#8A6F5B`, water `#6E9AA6`, sand `#D9C7A7`, sky day `#CFE0DC`, sky dusk `#D8A98F`, sky night `#2E3A52`, lantern `#E8C98B`.
- **UI:** near-invisible; thin rounded iconography, ink-on-paper tone; typography = a single humanist sans (e.g., Inter), never more than 2 sizes on screen.

## 12. Content Roadmap

| Phase | Scope | Definition of done |
|---|---|---|
| **M1 — Golden 30s** | jar render, camera, one block type place/remove with full feel trinity | "placing a block feels delicious" sign-off |
| **M2 — World** | 10 blocks, water sim, save/load, day/night | build & keep a scene overnight |
| **M3 — Life** | 8 ecosystem rules, Jar Journal, ambient audio system | first organic "whoa, a dragonfly" moment |
| **M4 — Creativity** | brush + palettes, photo mode with export | a shared screenshot looks store-ready |
| **M5 — Ship v0.1** | shelf (multi-jar), settings incl. Extra-Calm, onboarding-free first-run (empty jar + one hint mote), Android build via Capacitor, PWA build | installable, 60fps mid-range, no crashes 30-min session |
| v0.2+ | seeds/pruning, mood dial, 12 new rules, Monsoon biome | — |
| v0.3+ | share/fork links, Daily Seed Jar, jar shapes | needs backend (Supabase) |

## 13. What This Game Deliberately Refuses
Combat, hunger, death, timers, energy systems, ads-between-actions, forced tutorials, push-notification pressure, infinite worlds, realistic graphics arms race, social comparison metrics. Each refusal is a feature.
