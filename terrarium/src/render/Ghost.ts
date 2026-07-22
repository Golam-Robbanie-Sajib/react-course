import { Color, Mesh, MeshBasicMaterial, type Scene } from 'three';
import { makeBevelCubeGeometry } from './geometry';
import { cellToWorld } from './coords';

/**
 * The translucent ghost-preview block that follows the finger/cursor before a
 * placement (design §5, feel trinity). Snaps to the target cell on pointer move;
 * gently pulses so it reads as "not yet real".
 */
export class Ghost {
  private readonly mesh: Mesh;
  private pulse = 0;

  constructor(scene: Scene, color = new Color('#8a6f5b')) {
    const geo = makeBevelCubeGeometry();
    const mat = new MeshBasicMaterial({
      color,
      transparent: true,
      opacity: 0.32,
      depthWrite: false,
    });
    this.mesh = new Mesh(geo, mat);
    this.mesh.visible = false;
    this.mesh.renderOrder = 5;
    scene.add(this.mesh);
  }

  showAt(x: number, y: number, z: number): void {
    const [wx, wy, wz] = cellToWorld(x, y, z);
    this.mesh.position.set(wx, wy, wz);
    this.mesh.visible = true;
  }

  hide(): void {
    this.mesh.visible = false;
  }

  get visible(): boolean {
    return this.mesh.visible;
  }

  update(dt: number): void {
    if (!this.mesh.visible) return;
    this.pulse += dt * 2.4;
    const s = 1 + Math.sin(this.pulse) * 0.03;
    this.mesh.scale.set(s, s, s);
    const mat = this.mesh.material as MeshBasicMaterial;
    mat.opacity = 0.26 + (Math.sin(this.pulse) * 0.5 + 0.5) * 0.14;
  }
}
