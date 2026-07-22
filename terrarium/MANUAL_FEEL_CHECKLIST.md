# TERRARIUM — Manual Feel Checklist (M1 · Golden 30 Seconds)

Walk this on **desktop** and again on your **phone** (same LAN — see README for the
network URL). The gate for M1 is not "it works" — it's *"placing a block feels
delicious enough to show a stranger."* Judge feel, not features.

## How to run
1. `cd terrarium && npm install`
2. `npm run dev`
3. Desktop: open the **Local** URL. Phone: open the **Network** URL printed in the
   terminal (same Wi-Fi). Add to home screen for a fullscreen feel.

## The Golden 30 Seconds (the one that matters)
- [ ] The jar sits in soft light on a muted gradient. Nothing is pure white or black.
- [ ] A soft hint fades in: *"tap inside the jar to place a block."*
- [ ] As my finger/cursor hovers a surface, a **translucent ghost block** tracks it and
      gently pulses — it reads as "not yet real."
- [ ] **Tap** → a block appears with a **spring scale-settle (~150 ms)**, not a hard pop.
- [ ] The same tap makes a soft, woody **thock** — rounded, never harsh.
- [ ] A small puff of **dust motes** rises from the block base and fades out.
- [ ] On a phone, I feel a **light haptic tap** at the same instant (if the device/browser
      supports vibration; iOS Safari stays silent by design).
- [ ] Visual + sound + (haptic) all land **together**, within ~100 ms of the tap.

## Musicality
- [ ] Placing several blocks **in a row** steps the pitch **upward** through a pentatonic
      scale — building sounds like a little melody.
- [ ] Pausing (~1.5 s) and placing again **restarts** the melody low.

## Remove
- [ ] **Long-press (~350 ms)** on a block removes it: motes puff out (dissolve feel) with a
      softer, lower **pock** and two ultra-light haptic ticks.
- [ ] A quick tap never removes by accident; a long-press never places by accident.

## Camera (soothing motion)
- [ ] **One-finger drag on empty space** orbits the jar; releasing lets it **glide and ease
      to a full stop** within ~1.2 s. No snapping, no jerk.
- [ ] Orbit never flips upside-down and never dips below the floor.
- [ ] **Pinch** zooms with the fingers (1:1 feel), softly clamped at both ends — it can't
      zoom into the void or infinitely far out.
- [ ] **Zero** camera shake, anywhere.

## Tap-the-glass easter interaction
- [ ] Tapping the **glass** (not a placeable surface) makes the whole jar **wobble gently**
      and rings a soft, filtered **ting**. Pure delight, no function.

## Quiet UI
- [ ] Top-right controls (♪ sound, ≈ haptics) are **near-invisible** until noticed; toggling
      sound silences everything, toggling haptics stops vibration.
- [ ] No badges, no red dots, no popups, no timers, no counters anywhere.

## Performance
- [ ] Desktop holds a smooth **60 fps** while placing/removing and orbiting.
- [ ] Phone feels smooth (target 60 fps mid-range). Place ~30–50 blocks and orbit — no
      stutter, no growing lag (instance pool is reused, not reallocated).

## Deviations / open questions to raise at the Golden-30s review
- Haptics on web use the Vibration API where present; true `impactLight` fidelity arrives
  with the Capacitor build in M5. The interface seam is already in place.
- Glass is the cheap **fresnel-rim** fallback (MED/LOW tier). Transmission glass is an
  M2+ quality-tier decision (arch doc open question).
