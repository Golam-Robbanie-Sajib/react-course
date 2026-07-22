import { Color } from 'three';
import { BlockType } from './types';

/**
 * Per-block-type presentation + feel data. Colors use the muted "Riverside"
 * palette from the design doc §11 — low-saturation only, no pure white/black.
 */
export interface BlockDef {
  readonly type: BlockType;
  readonly name: string;
  /** Base tint written into the InstancedMesh color attribute. */
  readonly color: Color;
  /**
   * Pitch offset (in semitones) applied to the placement *thock* so different
   * materials read as different. Earth sits at the root of the scale.
   */
  readonly semitoneBase: number;
}

export const BLOCK_DEFS: Record<Exclude<BlockType, BlockType.Empty>, BlockDef> = {
  [BlockType.Earth]: {
    type: BlockType.Earth,
    name: 'Earth',
    color: new Color('#8a6f5b'),
    semitoneBase: 0,
  },
};

export function getBlockDef(type: BlockType): BlockDef | undefined {
  if (type === BlockType.Empty) return undefined;
  return BLOCK_DEFS[type];
}
