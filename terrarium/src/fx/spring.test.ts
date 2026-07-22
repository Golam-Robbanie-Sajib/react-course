import { describe, expect, it } from 'vitest';
import { Spring, clamp, damp, easeOutCubic } from './spring';

describe('Spring', () => {
  it('settles toward its target without exploding', () => {
    const s = new Spring(0);
    s.set(1);
    for (let i = 0; i < 600; i++) s.update(1 / 60);
    expect(s.value).toBeCloseTo(1, 2);
    expect(s.atRest).toBe(true);
  });

  it('snap kills velocity immediately', () => {
    const s = new Spring(0);
    s.set(1);
    s.update(1 / 60);
    s.snap(0.5);
    expect(s.value).toBe(0.5);
    expect(s.velocity).toBe(0);
    expect(s.atRest).toBe(true);
  });

  it('does not overshoot far past target with high damping', () => {
    const s = new Spring(0, { damping: 1 });
    s.set(1);
    let maxV = 0;
    for (let i = 0; i < 600; i++) {
      s.update(1 / 60);
      maxV = Math.max(maxV, s.value);
    }
    // Critically damped: allow only a hair of numerical overshoot.
    expect(maxV).toBeLessThan(1.02);
  });
});

describe('helpers', () => {
  it('damp moves toward target and converges', () => {
    let v = 0;
    for (let i = 0; i < 300; i++) v = damp(v, 10, 8, 1 / 60);
    expect(v).toBeCloseTo(10, 1);
  });

  it('easeOutCubic pins endpoints', () => {
    expect(easeOutCubic(0)).toBeCloseTo(0);
    expect(easeOutCubic(1)).toBeCloseTo(1);
    expect(easeOutCubic(0.5)).toBeGreaterThan(0.5); // eased out => ahead of linear
  });

  it('clamp bounds values', () => {
    expect(clamp(-1, 0, 1)).toBe(0);
    expect(clamp(2, 0, 1)).toBe(1);
    expect(clamp(0.5, 0, 1)).toBe(0.5);
  });
});
