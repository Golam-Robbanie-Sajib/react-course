import { describe, expect, it, vi } from 'vitest';
import { SimLoop } from './SimLoop';

describe('SimLoop', () => {
  it('fires one tick per 250ms of accumulated time', () => {
    const sim = new SimLoop();
    const tick = vi.fn();
    sim.onTick(tick);
    sim.advance(0.25);
    expect(tick).toHaveBeenCalledTimes(1);
  });

  it('does not fire before a full tick has accumulated', () => {
    const sim = new SimLoop();
    const tick = vi.fn();
    sim.onTick(tick);
    sim.advance(0.1);
    sim.advance(0.1);
    expect(tick).toHaveBeenCalledTimes(0);
    sim.advance(0.1); // now 0.3 total -> one tick
    expect(tick).toHaveBeenCalledTimes(1);
  });

  it('caps catch-up ticks so a long stall cannot freeze the frame', () => {
    const sim = new SimLoop();
    const tick = vi.fn();
    sim.onTick(tick);
    sim.advance(100); // huge delta
    expect(tick.mock.calls.length).toBeLessThanOrEqual(4);
  });
});
