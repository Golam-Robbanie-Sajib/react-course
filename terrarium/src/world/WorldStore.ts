import {
  BlockType,
  JAR_SIZE,
  JAR_VOLUME,
  type Cell,
  type CellDiff,
  type DiffListener,
  type WorldAction,
} from './types';

/**
 * WorldStore — the single source of truth for voxel state.
 *
 * Design (architecture doc §"World Store"):
 *  - Block type stored in a flat `Uint8Array` indexed by `index(x,y,z)`.
 *    Parallel paint / water arrays are reserved for M2 and intentionally omitted
 *    here to keep M1 focused on the block-place feel.
 *  - Every mutation flows through a typed action → enables undo, autosave diffing,
 *    and deterministic replay later.
 *  - Zero allocations in the hot path: the diff buffer is reused across dispatches
 *    and handed to listeners as a read-only view.
 */
export class WorldStore {
  private readonly blocks: Uint8Array;

  private readonly listeners = new Set<DiffListener>();

  /** Reused scratch buffer so a normal single-cell dispatch allocates nothing. */
  private readonly diffScratch: CellDiff[] = [];

  constructor() {
    this.blocks = new Uint8Array(JAR_VOLUME); // zero-filled == empty jar
  }

  /** Flat array index for a voxel. Public so the renderer can key instances by it. */
  static index(x: number, y: number, z: number): number {
    return x + JAR_SIZE * (y + JAR_SIZE * z);
  }

  static inBounds(x: number, y: number, z: number): boolean {
    return (
      x >= 0 &&
      y >= 0 &&
      z >= 0 &&
      x < JAR_SIZE &&
      y < JAR_SIZE &&
      z < JAR_SIZE
    );
  }

  getType(x: number, y: number, z: number): BlockType {
    if (!WorldStore.inBounds(x, y, z)) return BlockType.Empty;
    return this.blocks[WorldStore.index(x, y, z)] as BlockType;
  }

  isEmpty(x: number, y: number, z: number): boolean {
    return this.getType(x, y, z) === BlockType.Empty;
  }

  /** Number of non-empty cells — handy for tests and future rule contexts. */
  get blockCount(): number {
    let n = 0;
    for (let i = 0; i < this.blocks.length; i++) {
      if (this.blocks[i] !== BlockType.Empty) n++;
    }
    return n;
  }

  onDiff(listener: DiffListener): () => void {
    this.listeners.add(listener);
    return () => this.listeners.delete(listener);
  }

  /**
   * Apply a typed action. Returns the diffs produced (empty if the action was a
   * no-op, e.g. placing on an occupied cell or removing an empty one).
   */
  dispatch(action: WorldAction): readonly CellDiff[] {
    this.diffScratch.length = 0;

    switch (action.kind) {
      case 'place':
        this.applyPlace(action.cell, action.type);
        break;
      case 'remove':
        this.applyRemove(action.cell);
        break;
    }

    if (this.diffScratch.length > 0) {
      for (const listener of this.listeners) listener(this.diffScratch);
    }
    return this.diffScratch;
  }

  private applyPlace(cell: Cell, type: BlockType): void {
    if (type === BlockType.Empty) return;
    if (!WorldStore.inBounds(cell.x, cell.y, cell.z)) return;
    const i = WorldStore.index(cell.x, cell.y, cell.z);
    if (this.blocks[i] !== BlockType.Empty) return; // occupied: no-op
    this.blocks[i] = type;
    this.pushDiff(i, cell, type);
  }

  private applyRemove(cell: Cell): void {
    if (!WorldStore.inBounds(cell.x, cell.y, cell.z)) return;
    const i = WorldStore.index(cell.x, cell.y, cell.z);
    if (this.blocks[i] === BlockType.Empty) return; // nothing to remove
    this.blocks[i] = BlockType.Empty;
    this.pushDiff(i, cell, BlockType.Empty);
  }

  private pushDiff(index: number, cell: Cell, type: BlockType): void {
    this.diffScratch.push({ index, x: cell.x, y: cell.y, z: cell.z, type });
  }

  /** Raw block buffer — read-only view for persistence / seed encoding (M2). */
  snapshot(): Readonly<Uint8Array> {
    return this.blocks;
  }
}
