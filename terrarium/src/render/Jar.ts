import {
  BackSide,
  CylinderGeometry,
  DoubleSide,
  FrontSide,
  Mesh,
  MeshBasicMaterial,
  ShaderMaterial,
  type Scene,
} from 'three';
import { JAR_HALF } from './coords';

/**
 * The glass jar (architecture doc §"Renderer" — glass jar). M1 uses the cheap
 * fresnel-rim fallback (MED/LOW tier) rather than transmission: a soft bright
 * rim where the surface faces away from the camera, additively drawn so it reads
 * as glass without a post-processing pass. Per soothing spec: no bloom, gentle.
 *
 * The jar can wobble (tap-the-glass easter interaction, design §5) — a subtle
 * squash driven by an externally-updated `wobble` amplitude.
 */

const RIM_VERT = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  void main() {
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vNormalV = normalize(normalMatrix * normal);
    vViewDir = normalize(-mv.xyz);
    gl_Position = projectionMatrix * mv;
  }
`;

const RIM_FRAG = /* glsl */ `
  varying vec3 vNormalV;
  varying vec3 vViewDir;
  uniform vec3 uRim;
  uniform float uPower;
  void main() {
    float f = 1.0 - max(dot(normalize(vNormalV), normalize(vViewDir)), 0.0);
    float rim = pow(f, uPower);
    // Keep it gentle — capped alpha, muted rim tint (design §3 no bright spikes).
    float a = clamp(rim, 0.0, 1.0) * 0.5;
    gl_FragColor = vec4(uRim, a);
  }
`;

export class Jar {
  readonly group: Mesh;
  private readonly material: ShaderMaterial;
  private readonly baseHeight: number;

  /** 0 = at rest; set > 0 to kick a wobble. Decays each frame. */
  wobble = 0;

  constructor(scene: Scene) {
    // A soft rounded jar: a slightly tapered cylinder a bit larger than the volume.
    const radius = JAR_HALF * 1.28;
    const height = JAR_HALF * 2 * 1.12;
    this.baseHeight = height;

    const geo = new CylinderGeometry(radius, radius * 0.96, height, 48, 1, true);

    this.material = new ShaderMaterial({
      uniforms: {
        uRim: { value: [0.86, 0.9, 0.92] },
        uPower: { value: 2.2 },
      },
      vertexShader: RIM_VERT,
      fragmentShader: RIM_FRAG,
      transparent: true,
      depthWrite: false,
      side: DoubleSide,
    });

    this.group = new Mesh(geo, this.material);
    this.group.renderOrder = 10; // draw glass after opaque blocks

    // A faint inner shell (BackSide) adds a little depth to the glass read.
    const innerMat = new MeshBasicMaterial({
      color: 0xdfe8ea,
      transparent: true,
      opacity: 0.04,
      side: BackSide,
      depthWrite: false,
    });
    const inner = new Mesh(geo.clone(), innerMat);
    inner.renderOrder = 9;
    this.group.add(inner);

    // Quiet base disc so the jar reads as sitting on a surface.
    const baseGeo = new CylinderGeometry(radius * 1.02, radius * 1.06, 0.5, 48);
    const baseMat = new MeshBasicMaterial({ color: 0xbfc8c2, side: FrontSide });
    const base = new Mesh(baseGeo, baseMat);
    base.position.y = -height / 2 - 0.25;
    this.group.add(base);

    scene.add(this.group);
  }

  /** Kick a gentle wobble (tap-the-glass). Amplitude is clamped to stay soothing. */
  kick(amount = 0.06): void {
    this.wobble = Math.min(this.wobble + amount, 0.09);
  }

  update(dt: number, elapsed: number): void {
    if (this.wobble > 0.0001) {
      // Damped sinusoidal squash-and-stretch, high damping (design §3).
      const decay = Math.exp(-3.5 * dt);
      this.wobble *= decay;
      const s = Math.sin(elapsed * 22) * this.wobble;
      this.group.scale.set(1 + s * 0.5, 1 - s, 1 + s * 0.5);
      // keep visual volume roughly constant
      this.group.scale.y *= this.baseHeight === 0 ? 1 : 1;
    } else {
      this.wobble = 0;
      this.group.scale.set(1, 1, 1);
    }
  }
}
