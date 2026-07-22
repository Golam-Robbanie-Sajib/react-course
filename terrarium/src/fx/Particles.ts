import {
  AdditiveBlending,
  BufferGeometry,
  Color,
  DynamicDrawUsage,
  Float32BufferAttribute,
  NormalBlending,
  Points,
  ShaderMaterial,
  type Scene,
} from 'three';

/**
 * One pooled particle system for the whole jar (architecture doc §"FX").
 * Uses a single THREE.Points draw call with a fixed-capacity ring of slots —
 * zero per-emit allocation. Motes are soft round dots, gently rising and fading.
 *
 * Soothing constraints (design §3): muted colors, slow motion (< ~1.5 jar-widths/s),
 * ease-out fade, blending is NormalBlending for dust (no bloom spikes) and only
 * gentle additive for glow use later.
 */

const MAX_PARTICLES = 300; // hard cap per architecture doc

const VERT = /* glsl */ `
  attribute float aSize;
  attribute float aAlpha;
  varying float vAlpha;
  void main() {
    vAlpha = aAlpha;
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    gl_PointSize = aSize * (300.0 / -mv.z);
    gl_Position = projectionMatrix * mv;
  }
`;

const FRAG = /* glsl */ `
  varying float vAlpha;
  uniform vec3 uColor;
  void main() {
    // Soft round mote: radial falloff, no hard edge.
    vec2 d = gl_PointCoord - vec2(0.5);
    float r = length(d);
    float a = smoothstep(0.5, 0.1, r) * vAlpha;
    if (a <= 0.001) discard;
    gl_FragColor = vec4(uColor, a);
  }
`;

interface Slot {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  life: number;
  maxLife: number;
  size: number;
  active: boolean;
}

export class Particles {
  readonly points: Points;

  private readonly slots: Slot[] = [];
  private readonly positions: Float32Array;
  private readonly sizes: Float32Array;
  private readonly alphas: Float32Array;
  private readonly posAttr: Float32BufferAttribute;
  private readonly sizeAttr: Float32BufferAttribute;
  private readonly alphaAttr: Float32BufferAttribute;
  private cursor = 0;

  constructor(scene: Scene, color = new Color('#d9c7a7'), additive = false) {
    this.positions = new Float32Array(MAX_PARTICLES * 3);
    this.sizes = new Float32Array(MAX_PARTICLES);
    this.alphas = new Float32Array(MAX_PARTICLES);

    const geo = new BufferGeometry();
    this.posAttr = new Float32BufferAttribute(this.positions, 3).setUsage(DynamicDrawUsage);
    this.sizeAttr = new Float32BufferAttribute(this.sizes, 1).setUsage(DynamicDrawUsage);
    this.alphaAttr = new Float32BufferAttribute(this.alphas, 1).setUsage(DynamicDrawUsage);
    geo.setAttribute('position', this.posAttr);
    geo.setAttribute('aSize', this.sizeAttr);
    geo.setAttribute('aAlpha', this.alphaAttr);

    const mat = new ShaderMaterial({
      uniforms: { uColor: { value: color } },
      vertexShader: VERT,
      fragmentShader: FRAG,
      transparent: true,
      depthWrite: false,
      blending: additive ? AdditiveBlending : NormalBlending,
    });

    for (let i = 0; i < MAX_PARTICLES; i++) {
      this.slots.push({
        x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0,
        life: 0, maxLife: 0, size: 0, active: false,
      });
    }

    this.points = new Points(geo, mat);
    this.points.frustumCulled = false;
    scene.add(this.points);
  }

  /**
   * Emit a soft burst of `count` motes around a world position. Velocities are
   * gentle so nothing violates the motion cap.
   */
  burst(
    x: number,
    y: number,
    z: number,
    count: number,
    opts?: { spread?: number; rise?: number; size?: number; life?: number },
  ): void {
    const spread = opts?.spread ?? 0.35;
    const rise = opts?.rise ?? 0.35;
    const size = opts?.size ?? 6;
    const life = opts?.life ?? 0.9;
    for (let n = 0; n < count; n++) {
      const s = this.slots[this.cursor]!;
      this.cursor = (this.cursor + 1) % MAX_PARTICLES;
      s.x = x + (Math.random() - 0.5) * spread;
      s.y = y + (Math.random() - 0.5) * spread * 0.5;
      s.z = z + (Math.random() - 0.5) * spread;
      const ang = Math.random() * Math.PI * 2;
      const speed = 0.15 + Math.random() * 0.25;
      s.vx = Math.cos(ang) * speed * 0.5;
      s.vz = Math.sin(ang) * speed * 0.5;
      s.vy = rise * (0.4 + Math.random() * 0.6);
      s.maxLife = life * (0.7 + Math.random() * 0.6);
      s.life = s.maxLife;
      s.size = size * (0.6 + Math.random() * 0.8);
      s.active = true;
    }
  }

  update(dt: number): void {
    for (let i = 0; i < MAX_PARTICLES; i++) {
      const s = this.slots[i]!;
      let alpha = 0;
      let size = 0;
      if (s.active) {
        s.life -= dt;
        if (s.life <= 0) {
          s.active = false;
        } else {
          // Gentle upward drift with slight settle; gravity-light.
          s.vy -= 0.35 * dt;
          s.x += s.vx * dt;
          s.y += s.vy * dt;
          s.z += s.vz * dt;
          const t = s.life / s.maxLife; // 1 -> 0
          // Ease-out fade (fade in fast, out slow).
          alpha = t < 0.85 ? (t / 0.85) * 0.7 : ((1 - t) / 0.15) * 0.7;
          size = s.size;
        }
      }
      this.positions[i * 3] = s.x;
      this.positions[i * 3 + 1] = s.y;
      this.positions[i * 3 + 2] = s.z;
      this.sizes[i] = size;
      this.alphas[i] = alpha;
    }
    this.posAttr.needsUpdate = true;
    this.sizeAttr.needsUpdate = true;
    this.alphaAttr.needsUpdate = true;
  }
}
