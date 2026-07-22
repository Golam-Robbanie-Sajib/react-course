/**
 * Tiny in-house spring / ease utilities (architecture doc §"Tweens" — no heavy
 * tween lib). Springs are updated per-frame with a fixed critically-damped model
 * so all motion eases out with high damping per the Feel Spec §10.
 */

/** A scalar spring that settles toward `target` with no overshoot when damping ≥ 1. */
export class Spring {
  value: number;
  target: number;
  velocity = 0;

  /** Angular frequency — higher = snappier. */
  private readonly stiffness: number;
  /** Damping ratio. 1 = critical (no overshoot); design default ~0.8 allows a tiny settle. */
  private readonly damping: number;

  constructor(initial: number, opts?: { stiffness?: number; damping?: number }) {
    this.value = initial;
    this.target = initial;
    this.stiffness = opts?.stiffness ?? 120;
    this.damping = opts?.damping ?? 0.9;
  }

  set(target: number): void {
    this.target = target;
  }

  /** Jump instantly to a value, killing velocity. */
  snap(value: number): void {
    this.value = value;
    this.target = value;
    this.velocity = 0;
  }

  /** Advance by `dt` seconds. Semi-implicit Euler — stable at 60 fps. */
  update(dt: number): number {
    // Clamp dt so a stalled tab (huge dt) can never fling the spring.
    const h = Math.min(dt, 1 / 30);
    const k = this.stiffness;
    const c = 2 * this.damping * Math.sqrt(k);
    const a = -k * (this.value - this.target) - c * this.velocity;
    this.velocity += a * h;
    this.value += this.velocity * h;
    return this.value;
  }

  get atRest(): boolean {
    return Math.abs(this.velocity) < 1e-3 && Math.abs(this.value - this.target) < 1e-3;
  }
}

/** Exponential damping toward a target — used for camera inertia. */
export function damp(current: number, target: number, lambda: number, dt: number): number {
  return target + (current - target) * Math.exp(-lambda * dt);
}

/** Standard ease-out cubic in [0,1]. */
export function easeOutCubic(t: number): number {
  const u = 1 - t;
  return 1 - u * u * u;
}

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}
