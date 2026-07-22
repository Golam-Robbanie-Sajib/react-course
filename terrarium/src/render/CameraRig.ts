import { PerspectiveCamera, Vector3 } from 'three';
import { clamp, damp } from '../fx/spring';
import { JAR_HALF } from './coords';

/**
 * Spherical orbit camera with velocity + exponential damping (architecture doc
 * §"Interaction Controller & Camera"). Soft-clamped so there are no gimbal flips
 * and no under-floor views, and orbit speed is capped (design §3/§10 — no motion
 * sickness, camera inertia decays to a full stop within ~1.2 s of a flick).
 */

// Polar angle limits (from +Y). Keep above the floor and below straight-down.
const PHI_MIN = 0.35;
const PHI_MAX = Math.PI * 0.52;

const RADIUS_MIN = JAR_HALF * 1.6;
const RADIUS_MAX = JAR_HALF * 4.2;

// Cap orbit angular velocity so the world never spins faster than soothing.
const MAX_ANGULAR_VEL = 2.4; // rad/s

export class CameraRig {
  readonly camera: PerspectiveCamera;

  private theta = Math.PI * 0.25; // azimuth
  private phi = Math.PI * 0.36; // polar from +Y
  private radius = JAR_HALF * 2.8;

  private thetaVel = 0;
  private phiVel = 0;

  private readonly target = new Vector3(0, 0, 0);
  private readonly tmp = new Vector3();

  constructor(aspect: number) {
    this.camera = new PerspectiveCamera(42, aspect, 0.1, 200);
    this.applyToCamera();
  }

  setAspect(aspect: number): void {
    this.camera.aspect = aspect;
    this.camera.updateProjectionMatrix();
  }

  /** Apply a drag delta (in radians). Feeds velocity for inertial glide. */
  orbit(dTheta: number, dPhi: number): void {
    this.theta += dTheta;
    this.phi = clamp(this.phi + dPhi, PHI_MIN, PHI_MAX);
    // Track velocity for release inertia (scaled — set directly on drag).
    this.thetaVel = clamp(dTheta * 60, -MAX_ANGULAR_VEL, MAX_ANGULAR_VEL);
    this.phiVel = clamp(dPhi * 60, -MAX_ANGULAR_VEL, MAX_ANGULAR_VEL);
    this.applyToCamera();
  }

  /** Multiplicative zoom (pinch). factor < 1 zooms in. Soft-clamped. */
  zoom(factor: number): void {
    this.radius = clamp(this.radius * factor, RADIUS_MIN, RADIUS_MAX);
    this.applyToCamera();
  }

  /** Fling velocity applied on pointer release for inertial glide. */
  fling(vTheta: number, vPhi: number): void {
    this.thetaVel = clamp(vTheta, -MAX_ANGULAR_VEL, MAX_ANGULAR_VEL);
    this.phiVel = clamp(vPhi, -MAX_ANGULAR_VEL, MAX_ANGULAR_VEL);
  }

  stopInertia(): void {
    this.thetaVel = 0;
    this.phiVel = 0;
  }

  update(dt: number): void {
    if (Math.abs(this.thetaVel) > 1e-4 || Math.abs(this.phiVel) > 1e-4) {
      this.theta += this.thetaVel * dt;
      this.phi = clamp(this.phi + this.phiVel * dt, PHI_MIN, PHI_MAX);
      // Exponential decay -> full stop within ~1.2 s (Feel Spec).
      this.thetaVel = damp(this.thetaVel, 0, 4.2, dt);
      this.phiVel = damp(this.phiVel, 0, 4.2, dt);
      if (Math.abs(this.thetaVel) < 1e-3) this.thetaVel = 0;
      if (Math.abs(this.phiVel) < 1e-3) this.phiVel = 0;
      this.applyToCamera();
    }
  }

  private applyToCamera(): void {
    const sinPhi = Math.sin(this.phi);
    this.tmp.set(
      this.radius * sinPhi * Math.sin(this.theta),
      this.radius * Math.cos(this.phi),
      this.radius * sinPhi * Math.cos(this.theta),
    );
    this.camera.position.copy(this.tmp).add(this.target);
    this.camera.lookAt(this.target);
  }
}
