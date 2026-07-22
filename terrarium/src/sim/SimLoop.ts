/**
 * Fixed-tick simulation loop, decoupled from render (architecture doc
 * §"Simulation Loop"). Runs at 4 Hz via an accumulator driven from rAF — no
 * Web Worker needed at 24³ (the World Store is transferable arrays, so a worker
 * port stays a clean later optimization).
 *
 * M1 has nothing to simulate yet (water, growth, rules arrive in M2/M3), but the
 * accumulator scaffold exists from day one so those systems drop straight in.
 */

const TICK_HZ = 4;
const TICK_DT = 1 / TICK_HZ;
const MAX_CATCHUP = 4; // never process more than this many ticks in one frame

export type TickFn = (tickDt: number) => void;

export class SimLoop {
  private accumulator = 0;
  private readonly listeners: TickFn[] = [];

  onTick(fn: TickFn): void {
    this.listeners.push(fn);
  }

  /** Advance the accumulator by a real frame delta and fire due ticks. */
  advance(frameDt: number): void {
    this.accumulator += frameDt;
    let processed = 0;
    while (this.accumulator >= TICK_DT && processed < MAX_CATCHUP) {
      this.accumulator -= TICK_DT;
      processed++;
      for (const fn of this.listeners) fn(TICK_DT);
    }
    // Drop excess backlog (tab was backgrounded) rather than fast-forwarding here;
    // real-wall-clock growth (M3) handles long absences separately.
    if (this.accumulator > TICK_DT) this.accumulator = 0;
  }
}
