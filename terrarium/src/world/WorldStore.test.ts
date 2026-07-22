import { describe, expect, it, vi } from 'vitest';
import { WorldStore } from './WorldStore';
import { BlockType, JAR_SIZE } from './types';

describe('WorldStore.index / inBounds', () => {
  it('round-trips a coordinate through index uniquely', () => {
    const seen = new Set<number>();
    for (let z = 0; z < JAR_SIZE; z++) {
      for (let y = 0; y < JAR_SIZE; y++) {
        for (let x = 0; x < JAR_SIZE; x++) {
          const i = WorldStore.index(x, y, z);
          expect(seen.has(i)).toBe(false);
          seen.add(i);
        }
      }
    }
    expect(seen.size).toBe(JAR_SIZE ** 3);
  });

  it('rejects out-of-bounds cells', () => {
    expect(WorldStore.inBounds(-1, 0, 0)).toBe(false);
    expect(WorldStore.inBounds(0, JAR_SIZE, 0)).toBe(false);
    expect(WorldStore.inBounds(0, 0, 0)).toBe(true);
    expect(WorldStore.inBounds(JAR_SIZE - 1, JAR_SIZE - 1, JAR_SIZE - 1)).toBe(true);
  });
});

describe('WorldStore place / remove', () => {
  it('places a block and reflects it in state', () => {
    const store = new WorldStore();
    expect(store.isEmpty(3, 4, 5)).toBe(true);
    store.dispatch({ kind: 'place', cell: { x: 3, y: 4, z: 5 }, type: BlockType.Earth });
    expect(store.getType(3, 4, 5)).toBe(BlockType.Earth);
    expect(store.blockCount).toBe(1);
  });

  it('emits exactly one diff describing the placed cell', () => {
    const store = new WorldStore();
    const listener = vi.fn();
    store.onDiff(listener);
    store.dispatch({ kind: 'place', cell: { x: 1, y: 2, z: 3 }, type: BlockType.Earth });
    expect(listener).toHaveBeenCalledTimes(1);
    const diffs = listener.mock.calls[0]![0];
    expect(diffs).toHaveLength(1);
    expect(diffs[0]).toMatchObject({ x: 1, y: 2, z: 3, type: BlockType.Earth });
  });

  it('placing on an occupied cell is a no-op (no diff, no double count)', () => {
    const store = new WorldStore();
    store.dispatch({ kind: 'place', cell: { x: 0, y: 0, z: 0 }, type: BlockType.Earth });
    const diffs = store.dispatch({
      kind: 'place',
      cell: { x: 0, y: 0, z: 0 },
      type: BlockType.Earth,
    });
    expect(diffs).toHaveLength(0);
    expect(store.blockCount).toBe(1);
  });

  it('removes a block and empties the cell', () => {
    const store = new WorldStore();
    store.dispatch({ kind: 'place', cell: { x: 2, y: 2, z: 2 }, type: BlockType.Earth });
    const diffs = store.dispatch({ kind: 'remove', cell: { x: 2, y: 2, z: 2 } });
    expect(diffs).toHaveLength(1);
    expect(diffs[0]!.type).toBe(BlockType.Empty);
    expect(store.isEmpty(2, 2, 2)).toBe(true);
    expect(store.blockCount).toBe(0);
  });

  it('removing an empty cell is a no-op', () => {
    const store = new WorldStore();
    const diffs = store.dispatch({ kind: 'remove', cell: { x: 5, y: 5, z: 5 } });
    expect(diffs).toHaveLength(0);
  });

  it('ignores out-of-bounds placement', () => {
    const store = new WorldStore();
    const diffs = store.dispatch({
      kind: 'place',
      cell: { x: -1, y: 0, z: 0 },
      type: BlockType.Earth,
    });
    expect(diffs).toHaveLength(0);
    expect(store.blockCount).toBe(0);
  });

  it('unsubscribing stops delivery', () => {
    const store = new WorldStore();
    const listener = vi.fn();
    const off = store.onDiff(listener);
    off();
    store.dispatch({ kind: 'place', cell: { x: 0, y: 0, z: 0 }, type: BlockType.Earth });
    expect(listener).not.toHaveBeenCalled();
  });
});
