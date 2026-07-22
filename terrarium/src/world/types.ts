/**
 * Core world types shared across modules.
 *
 * The World Store is the single source of truth (architecture doc §"World Store").
 * All coordinates are integer voxel cells in [0, JAR_SIZE).
 */

/** Edge length of the cubic jar volume in voxels. MVP = 24 (architecture doc). */
export const JAR_SIZE = 24;

/** Total number of cells in the jar volume. */
export const JAR_VOLUME = JAR_SIZE * JAR_SIZE * JAR_SIZE;

/**
 * Block type ids. 0 is reserved for "empty" so a zero-filled Uint8Array is an
 * empty jar. M1 ships only Earth; the palette grows in M2.
 */
export enum BlockType {
  Empty = 0,
  Earth = 1,
}

/** An integer voxel coordinate inside the jar. */
export interface Cell {
  x: number;
  y: number;
  z: number;
}

/** A single changed cell, emitted by the store so the renderer can update one instance. */
export interface CellDiff {
  index: number;
  x: number;
  y: number;
  z: number;
  /** Block type after the mutation (Empty means the cell was cleared). */
  type: BlockType;
}

/** Typed actions — the only way to mutate the world (architecture doc). */
export type WorldAction =
  | { kind: 'place'; cell: Cell; type: BlockType }
  | { kind: 'remove'; cell: Cell };

/** Listener invoked with the batch of diffs produced by one dispatched action. */
export type DiffListener = (diffs: readonly CellDiff[]) => void;
