import { BoxGeometry, BufferGeometry } from 'three';

/**
 * Shared rounded-bevel cube geometry (architecture doc §"Mesher"): a slightly
 * inset box gives the soft voxel silhouette the art direction calls for
 * (design §11 "slightly rounded/beveled edges — softness matters") without the
 * cost of real rounded geometry. At 24³ a plain beveled box is plenty.
 *
 * Cells are unit-sized; we scale slightly under 1.0 so neighboring blocks show a
 * subtle seam, reading as individual voxels rather than a solid mass.
 */
export function makeBevelCubeGeometry(): BufferGeometry {
  const size = 0.92;
  const geo = new BoxGeometry(size, size, size, 1, 1, 1);
  // Soften normals a touch is unnecessary for a box; the sub-unit scale plus the
  // lighting model already gives the gentle look. Kept as a single shared geo.
  return geo;
}
