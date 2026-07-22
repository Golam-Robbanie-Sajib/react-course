import {
  ACESFilmicToneMapping,
  Color,
  DirectionalLight,
  HemisphereLight,
  PCFSoftShadowMap,
  Scene,
  SRGBColorSpace,
  WebGLRenderer,
} from 'three';
import { CameraRig } from './CameraRig';
import { JAR_HALF } from './coords';

/**
 * Three.js WebGL2 renderer bootstrap (architecture doc §"Renderer").
 * - SRGB color space, no post-processing chain (soothing spec: glow = soft
 *   sprites, not bloom).
 * - 1 directional key light (sun) with a soft PCF shadow map + hemisphere ambient.
 * - Muted gradient backdrop from the Riverside palette (design §11).
 */
export class Renderer {
  readonly renderer: WebGLRenderer;
  readonly scene: Scene;
  readonly rig: CameraRig;

  private readonly sun: DirectionalLight;

  constructor(container: HTMLElement) {
    this.renderer = new WebGLRenderer({
      antialias: true,
      alpha: false,
      powerPreference: 'high-performance',
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(container.clientWidth, container.clientHeight);
    this.renderer.outputColorSpace = SRGBColorSpace;
    this.renderer.toneMapping = ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.0;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = PCFSoftShadowMap;
    container.appendChild(this.renderer.domElement);

    this.scene = new Scene();
    // Soft day-sky background (design §11 sky day #CFE0DC). A CSS gradient behind
    // the canvas provides the vertical falloff; the clear color matches the top.
    this.scene.background = new Color('#cfe0dc');

    this.rig = new CameraRig(container.clientWidth / container.clientHeight);

    // Warm key light (sun) — soft shadows only from this one light.
    this.sun = new DirectionalLight(0xfff2e0, 1.6);
    this.sun.position.set(JAR_HALF * 1.6, JAR_HALF * 2.6, JAR_HALF * 1.2);
    this.sun.castShadow = true;
    this.sun.shadow.mapSize.set(1024, 1024);
    this.sun.shadow.camera.near = 1;
    this.sun.shadow.camera.far = JAR_HALF * 8;
    const s = JAR_HALF * 1.8;
    this.sun.shadow.camera.left = -s;
    this.sun.shadow.camera.right = s;
    this.sun.shadow.camera.top = s;
    this.sun.shadow.camera.bottom = -s;
    this.sun.shadow.bias = -0.0006;
    this.scene.add(this.sun);

    // Cool sky / warm ground hemisphere ambient.
    const hemi = new HemisphereLight(0xdfeae6, 0x8a7f70, 0.75);
    this.scene.add(hemi);

    this.applyBackdropGradient(container);
  }

  /** A muted vertical gradient behind the canvas — large soft gradient (design §3). */
  private applyBackdropGradient(container: HTMLElement): void {
    container.style.background =
      'linear-gradient(180deg, #d5e3df 0%, #cfe0dc 45%, #c3d3cf 100%)';
    this.renderer.setClearColor(0x000000, 0); // let CSS gradient show through
    this.scene.background = null;
  }

  get canvas(): HTMLCanvasElement {
    return this.renderer.domElement;
  }

  resize(width: number, height: number): void {
    this.renderer.setSize(width, height);
    this.rig.setAspect(width / height);
  }

  render(): void {
    this.renderer.render(this.scene, this.rig.camera);
  }
}
