import {
  Color,
  DynamicDrawUsage,
  InstancedMesh,
  Matrix4,
  MeshStandardMaterial,
  type Scene,
} from 'three';
import { JAR_VOLUME, type CellDiff, BlockType } from '../world/types';
import { getBlockDef } from '../world/blocks';
import { makeBevelCubeGeometry } from './geometry';
import { cellToWorld } from './coords';

/**
 * Renders all placed blocks with a single InstancedMesh (architecture doc
 * §"Mesher & Instancer"). M1 has one material; when M2 adds block types this
 * becomes one instancer per material. Updates are incremental: each store diff
 * touches exactly one instance's matrix/color.
 *
 * Free instance slots are recycled via a free-list so placing/removing many
 * blocks never grows the buffer or reallocates.
 */
export class BlockInstancer {
  readonly mesh: InstancedMesh;

  private readonly cellToSlot = new Map<number, number>();
  /** Reverse map so a raycast instanceId can be resolved back to its voxel. */
  private readonly slotToCell = new Map<number, { x: number; y: number; z: number }>();
  private readonly freeSlots: number[] = [];
  private readonly matrix = new Matrix4();
  private readonly hiddenMatrix = new Matrix4().makeScale(0, 0, 0);
  private count = 0;

  constructor(scene: Scene) {
    const geo = makeBevelCubeGeometry();
    const mat = new MeshStandardMaterial({
      vertexColors: false,
      roughness: 0.9,
      metalness: 0.0,
    });
    // Worst case is a full jar; real jars are 1–3k. Capacity == volume is safe.
    this.mesh = new InstancedMesh(geo, mat, JAR_VOLUME);
    this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
    this.mesh.count = JAR_VOLUME;
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    // Start with every slot hidden (scale 0) and on the free list.
    for (let i = JAR_VOLUME - 1; i >= 0; i--) {
      this.mesh.setMatrixAt(i, this.hiddenMatrix);
      this.freeSlots.push(i);
    }
    this.mesh.instanceMatrix.needsUpdate = true;

    scene.add(this.mesh);
  }

  /** Apply a batch of store diffs. Called synchronously in the place/remove frame. */
  applyDiffs(diffs: readonly CellDiff[]): void {
    for (const d of diffs) {
      if (d.type === BlockType.Empty) this.removeCell(d);
      else this.placeCell(d);
    }
    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
  }

  /** Current live instance count — used by the manual perf checklist / debug. */
  get liveCount(): number {
    return this.count;
  }

  private placeCell(d: CellDiff): void {
    if (this.cellToSlot.has(d.index)) return;
    const slot = this.freeSlots.pop();
    if (slot === undefined) return; // full — cannot happen at volume capacity
    this.cellToSlot.set(d.index, slot);
    this.slotToCell.set(slot, { x: d.x, y: d.y, z: d.z });
    this.count++;

    const [wx, wy, wz] = cellToWorld(d.x, d.y, d.z);
    // Newly placed blocks pop in at scale 0; InteractionController springs them up.
    this.matrix.makeScale(0.001, 0.001, 0.001);
    this.matrix.setPosition(wx, wy, wz);
    this.mesh.setMatrixAt(slot, this.matrix);

    const def = getBlockDef(d.type);
    this.mesh.setColorAt(slot, def ? def.color : new Color('#8a6f5b'));
  }

  private removeCell(d: CellDiff): void {
    const slot = this.cellToSlot.get(d.index);
    if (slot === undefined) return;
    this.cellToSlot.delete(d.index);
    this.slotToCell.delete(slot);
    this.freeSlots.push(slot);
    this.count--;
    this.mesh.setMatrixAt(slot, this.hiddenMatrix);
  }

  /** Set the render transform of an existing cell (used for the place spring). */
  setCellScale(cellIndex: number, x: number, y: number, z: number, scale: number): void {
    const slot = this.cellToSlot.get(cellIndex);
    if (slot === undefined) return;
    const [wx, wy, wz] = cellToWorld(x, y, z);
    this.matrix.makeScale(scale, scale, scale);
    this.matrix.setPosition(wx, wy, wz);
    this.mesh.setMatrixAt(slot, this.matrix);
    this.mesh.instanceMatrix.needsUpdate = true;
  }

  hasCell(cellIndex: number): boolean {
    return this.cellToSlot.has(cellIndex);
  }

  /** Resolve a raycast instanceId (slot) back to its voxel cell, if live. */
  cellOfInstance(instanceId: number): { x: number; y: number; z: number } | undefined {
    return this.slotToCell.get(instanceId);
  }
}
