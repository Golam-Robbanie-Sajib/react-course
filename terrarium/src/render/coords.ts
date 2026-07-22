import { JAR_SIZE } from '../world/types';

/**
 * Voxel-space <-> world-space conversion.
 *
 * The jar volume is centered on the origin so the camera orbits a nicely framed
 * scene. Cell (0,0,0) is the bottom-back-left corner; a cell's world position is
 * its center. One voxel == one world unit.
 */
const HALF = JAR_SIZE / 2;

export function cellToWorld(x: number, y: number, z: number): [number, number, number] {
  return [x - HALF + 0.5, y - HALF + 0.5, z - HALF + 0.5];
}

export function worldToCell(x: number, y: number, z: number): [number, number, number] {
  return [
    Math.floor(x + HALF),
    Math.floor(y + HALF),
    Math.floor(z + HALF),
  ];
}

/** Half-extent of the jar volume in world units (used for camera clamps & jar mesh). */
export const JAR_HALF = HALF;
