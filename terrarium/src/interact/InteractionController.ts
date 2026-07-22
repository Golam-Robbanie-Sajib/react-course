import {
  Mesh,
  MeshBasicMaterial,
  PlaneGeometry,
  Raycaster,
  Vector2,
  Vector3,
  type Object3D,
  type Scene,
} from 'three';
import { WorldStore } from '../world/WorldStore';
import { BlockType, JAR_SIZE, type Cell } from '../world/types';
import { getBlockDef } from '../world/blocks';
import { BlockInstancer } from '../render/BlockInstancer';
import { CameraRig } from '../render/CameraRig';
import { Ghost } from '../render/Ghost';
import { Jar } from '../render/Jar';
import { Particles } from '../fx/Particles';
import { Spring } from '../fx/spring';
import { cellToWorld, JAR_HALF } from '../render/coords';
import { AudioEngine } from '../audio/AudioEngine';
import type { Haptics } from '../audio/haptics';

const MOVE_THRESHOLD_PX = 9; // beyond this a press becomes an orbit drag
const LONG_PRESS_MS = 350; // design §5 long-press remove
const ORBIT_SPEED = 0.006; // rad per px — capped feel
const PLACE_SPRING = { stiffness: 220, damping: 0.8 }; // 150ms scale-settle, damping 0.8

interface Pointer {
  id: number;
  startX: number;
  startY: number;
  x: number;
  y: number;
  lastX: number;
  lastY: number;
  downAt: number;
  moved: boolean;
}

interface PickResult {
  /** Empty cell a new block would occupy. */
  placeCell: Cell | null;
  /** Existing block cell under the pointer (for removal). */
  blockCell: Cell | null;
  /** True if the ray hit the jar glass (and no placeable surface in front). */
  hitJar: boolean;
}

/** A running place-pop animation (scale 0 -> 1 spring). */
interface PlaceAnim {
  cellIndex: number;
  x: number;
  y: number;
  z: number;
  spring: Spring;
}

export class InteractionController {
  private readonly raycaster = new Raycaster();
  private readonly ndc = new Vector2();
  private readonly floor: Mesh;

  private readonly pointers = new Map<number, Pointer>();
  private longPressTimer = 0;
  private longPressCell: Cell | null = null;
  private pinchPrevDist = 0;

  private readonly placeAnims: PlaceAnim[] = [];
  private lastOrbitVel = { theta: 0, phi: 0 };

  private currentBlock = BlockType.Earth;

  onFirstPlace: (() => void) | null = null;

  constructor(
    private readonly canvas: HTMLCanvasElement,
    private readonly scene: Scene,
    private readonly rig: CameraRig,
    private readonly store: WorldStore,
    private readonly instancer: BlockInstancer,
    private readonly ghost: Ghost,
    private readonly jar: Jar,
    private readonly particles: Particles,
    private readonly audio: AudioEngine,
    private readonly haptics: Haptics,
  ) {
    // Invisible floor at the bottom of the jar volume — the surface the first
    // block lands on. Sized to the volume so picks stay in-bounds.
    const floorGeo = new PlaneGeometry(JAR_SIZE, JAR_SIZE);
    const floorMat = new MeshBasicMaterial({ visible: false });
    this.floor = new Mesh(floorGeo, floorMat);
    this.floor.rotation.x = -Math.PI / 2;
    this.floor.position.y = -JAR_HALF; // bottom face of cell layer y=0
    this.scene.add(this.floor);

    this.bind();
  }

  private bind(): void {
    const c = this.canvas;
    c.addEventListener('pointerdown', this.onDown, { passive: false });
    c.addEventListener('pointermove', this.onMove, { passive: false });
    c.addEventListener('pointerup', this.onUp, { passive: false });
    c.addEventListener('pointercancel', this.onUp, { passive: false });
    c.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  // ---- pointer handlers -------------------------------------------------

  private onDown = (e: PointerEvent): void => {
    e.preventDefault();
    this.audio.resume(); // WebAudio needs a user gesture to start
    this.canvas.setPointerCapture(e.pointerId);

    const p: Pointer = {
      id: e.pointerId,
      startX: e.clientX,
      startY: e.clientY,
      x: e.clientX,
      y: e.clientY,
      lastX: e.clientX,
      lastY: e.clientY,
      downAt: performance.now(),
      moved: false,
    };
    this.pointers.set(e.pointerId, p);

    if (this.pointers.size === 1) {
      this.rig.stopInertia();
      // Raycast on pointerDOWN (not up) so first response is within budget.
      const pick = this.pick(e.clientX, e.clientY);
      if (pick.placeCell) {
        this.ghost.showAt(pick.placeCell.x, pick.placeCell.y, pick.placeCell.z);
      }
      // Arm long-press remove only if we're over an actual block.
      this.longPressCell = pick.blockCell;
      if (pick.blockCell) {
        this.longPressTimer = window.setTimeout(this.fireLongPress, LONG_PRESS_MS);
      }
    } else if (this.pointers.size === 2) {
      // Second finger down -> pinch; cancel any pending tap/long-press/ghost.
      this.cancelLongPress();
      this.ghost.hide();
      this.pinchPrevDist = this.pinchDistance();
    }
  };

  private onMove = (e: PointerEvent): void => {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    e.preventDefault();
    p.lastX = p.x;
    p.lastY = p.y;
    p.x = e.clientX;
    p.y = e.clientY;

    if (this.pointers.size >= 2) {
      this.handlePinch();
      return;
    }

    const dx = p.x - p.startX;
    const dy = p.y - p.startY;
    if (!p.moved && Math.hypot(dx, dy) > MOVE_THRESHOLD_PX) {
      p.moved = true;
      // Became a drag: it's an orbit, not a placement. Cancel tap intent.
      this.cancelLongPress();
      this.ghost.hide();
    }

    if (p.moved) {
      const mdx = p.x - p.lastX;
      const mdy = p.y - p.lastY;
      this.lastOrbitVel.theta = -mdx * ORBIT_SPEED * 60;
      this.lastOrbitVel.phi = -mdy * ORBIT_SPEED * 60;
      this.rig.orbit(-mdx * ORBIT_SPEED, -mdy * ORBIT_SPEED);
    } else {
      // Still a hovering tap candidate: keep the ghost tracking the surface.
      const pick = this.pick(e.clientX, e.clientY);
      if (pick.placeCell) {
        this.ghost.showAt(pick.placeCell.x, pick.placeCell.y, pick.placeCell.z);
      } else {
        this.ghost.hide();
      }
    }
  };

  private onUp = (e: PointerEvent): void => {
    const p = this.pointers.get(e.pointerId);
    if (!p) return;
    this.pointers.delete(e.pointerId);
    if (this.canvas.hasPointerCapture(e.pointerId)) {
      this.canvas.releasePointerCapture(e.pointerId);
    }
    this.cancelLongPress();

    const wasPinch = this.pointers.size >= 1; // a finger is still down => was multi-touch
    if (wasPinch) return;

    if (p.moved) {
      // End of an orbit drag -> hand velocity to the rig for inertial glide.
      this.rig.fling(this.lastOrbitVel.theta, this.lastOrbitVel.phi);
      this.ghost.hide();
      return;
    }

    // A clean tap. Decide: place / glass-ting.
    const heldMs = performance.now() - p.downAt;
    if (heldMs >= LONG_PRESS_MS) {
      // Long-press already handled removal via the timer; nothing to do.
      this.ghost.hide();
      return;
    }

    const pick = this.pick(p.x, p.y);
    if (pick.placeCell) {
      this.placeBlock(pick.placeCell);
    } else if (pick.hitJar) {
      this.tapGlass();
    }
    this.ghost.hide();
  };

  private fireLongPress = (): void => {
    if (this.longPressCell) {
      this.removeBlock(this.longPressCell);
      this.longPressCell = null;
    }
  };

  private cancelLongPress(): void {
    if (this.longPressTimer) {
      clearTimeout(this.longPressTimer);
      this.longPressTimer = 0;
    }
    this.longPressCell = null;
  }

  // ---- actions ----------------------------------------------------------

  private placeBlock(cell: Cell): void {
    const diffs = this.store.dispatch({ kind: 'place', cell, type: this.currentBlock });
    if (diffs.length === 0) return; // occupied / out of bounds

    const def = getBlockDef(this.currentBlock);
    const [wx, wy, wz] = cellToWorld(cell.x, cell.y, cell.z);

    // Feel trinity — all within this frame:
    // 1) visual: spring the new instance from 0 -> 1 (150ms settle, damping 0.8)
    const cellIndex = WorldStore.index(cell.x, cell.y, cell.z);
    const spring = new Spring(0.001, PLACE_SPRING);
    spring.set(1);
    this.placeAnims.push({ cellIndex, x: cell.x, y: cell.y, z: cell.z, spring });
    // dust motes puff from the block base
    this.particles.burst(wx, wy - 0.4, wz, 10, { spread: 0.7, rise: 0.5 });
    // 2) audio: pitch-stepped thock
    this.audio.playThock(def ? def.semitoneBase : 0);
    // 3) haptic: light tap
    this.haptics.light();

    if (this.onFirstPlace) {
      this.onFirstPlace();
      this.onFirstPlace = null;
    }
  }

  private removeBlock(cell: Cell): void {
    const [wx, wy, wz] = cellToWorld(cell.x, cell.y, cell.z);
    const diffs = this.store.dispatch({ kind: 'remove', cell });
    if (diffs.length === 0) return;
    // Dissolve to motes + softer pock + double ultra-light tick.
    this.particles.burst(wx, wy, wz, 16, { spread: 0.9, rise: 0.45, life: 1.0 });
    this.audio.playPock();
    this.haptics.doubleTick();
  }

  private tapGlass(): void {
    this.jar.kick();
    this.audio.playGlassTing();
    this.haptics.light();
  }

  // ---- picking ----------------------------------------------------------

  private pick(clientX: number, clientY: number): PickResult {
    const rect = this.canvas.getBoundingClientRect();
    this.ndc.x = ((clientX - rect.left) / rect.width) * 2 - 1;
    this.ndc.y = -((clientY - rect.top) / rect.height) * 2 + 1;
    this.raycaster.setFromCamera(this.ndc, this.rig.camera);

    const targets: Object3D[] = [this.instancer.mesh, this.floor];
    const hits = this.raycaster.intersectObjects(targets, false);

    let placeCell: Cell | null = null;
    let blockCell: Cell | null = null;

    if (hits.length > 0) {
      const hit = hits[0]!;
      if (hit.object === this.instancer.mesh && hit.instanceId !== undefined) {
        const cell = this.instancer.cellOfInstance(hit.instanceId);
        if (cell) {
          blockCell = { ...cell };
          // Placement goes on the neighbor in the direction of the hit face.
          const n = hit.face ? hit.normal ?? hit.face.normal : null;
          if (n) {
            const nx = Math.round(n.x);
            const ny = Math.round(n.y);
            const nz = Math.round(n.z);
            const px = cell.x + nx;
            const py = cell.y + ny;
            const pz = cell.z + nz;
            if (WorldStore.inBounds(px, py, pz) && this.store.isEmpty(px, py, pz)) {
              placeCell = { x: px, y: py, z: pz };
            }
          }
        }
      } else if (hit.object === this.floor) {
        const cell = this.floorCell(hit.point);
        if (cell && this.store.isEmpty(cell.x, cell.y, cell.z)) placeCell = cell;
      }
    }

    // Glass tap: no placeable surface but the ray passes through the jar volume.
    const hitJar = placeCell === null && blockCell === null && this.rayHitsJar();
    return { placeCell, blockCell, hitJar };
  }

  private floorCell(point: Vector3): Cell | null {
    const c = new Vector3(point.x + JAR_HALF, 0, point.z + JAR_HALF);
    const x = Math.floor(c.x);
    const z = Math.floor(c.z);
    if (x < 0 || z < 0 || x >= JAR_SIZE || z >= JAR_SIZE) return null;
    return { x, y: 0, z };
  }

  /** Cheap test: does the pick ray pass near the jar volume (for the glass ting)? */
  private rayHitsJar(): boolean {
    // Sphere approximation around the jar volume.
    const origin = this.raycaster.ray.origin;
    const dir = this.raycaster.ray.direction;
    const toCenter = new Vector3().sub(origin); // center is origin(0,0,0) - origin
    const t = toCenter.dot(dir);
    const closest = new Vector3().copy(dir).multiplyScalar(t).add(origin);
    return closest.length() <= JAR_HALF * 1.4;
  }

  // ---- pinch ------------------------------------------------------------

  private pinchDistance(): number {
    const pts = [...this.pointers.values()];
    if (pts.length < 2) return 0;
    const a = pts[0]!;
    const b = pts[1]!;
    return Math.hypot(a.x - b.x, a.y - b.y);
  }

  private handlePinch(): void {
    const dist = this.pinchDistance();
    if (this.pinchPrevDist > 0 && dist > 0) {
      // Spread fingers (dist grows) -> zoom in (factor < 1).
      const factor = this.pinchPrevDist / dist;
      this.rig.zoom(factor);
    }
    this.pinchPrevDist = dist;
  }

  // ---- per-frame --------------------------------------------------------

  update(dt: number): void {
    // Advance place-pop springs; drop finished ones.
    for (let i = this.placeAnims.length - 1; i >= 0; i--) {
      const a = this.placeAnims[i]!;
      const s = a.spring.update(dt);
      this.instancer.setCellScale(a.cellIndex, a.x, a.y, a.z, s);
      if (a.spring.atRest) {
        this.instancer.setCellScale(a.cellIndex, a.x, a.y, a.z, 1);
        this.placeAnims.splice(i, 1);
      }
    }
  }
}
