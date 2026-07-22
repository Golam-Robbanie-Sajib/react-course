/**
 * Haptics behind an interface so the game code never touches Capacitor directly
 * (architecture doc §"Haptics"). On web this is a no-op; when packaged with
 * Capacitor, `CapacitorHaptics` will call `@capacitor/haptics` `impactLight`.
 *
 * Design §3/§10: soft light taps ONLY — never buzzing patterns. Toggleable.
 */

export interface Haptics {
  /** Single soft tap — block place, glass tap. */
  light(): void;
  /** Two ultra-light ticks — block remove. */
  doubleTick(): void;
  setEnabled(enabled: boolean): void;
}

/** No-op implementation used on the web build. */
export class NoopHaptics implements Haptics {
  light(): void {}
  doubleTick(): void {}
  setEnabled(): void {}
}

/**
 * Web fallback that uses the Vibration API when present (many Android browsers),
 * kept to a single short pulse so it stays within the "soft light tap" rule.
 * Falls back to nothing where unsupported (iOS Safari).
 */
export class WebVibrateHaptics implements Haptics {
  private enabled = true;

  private canVibrate(): boolean {
    return this.enabled && typeof navigator !== 'undefined' && 'vibrate' in navigator;
  }

  light(): void {
    if (this.canVibrate()) navigator.vibrate(8);
  }

  doubleTick(): void {
    if (this.canVibrate()) navigator.vibrate([6, 40, 6]);
  }

  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      navigator.vibrate(0);
    }
  }
}

/**
 * Placeholder for the native path. Wired up in M5 packaging; kept here so the
 * interface boundary exists from day one. Intentionally imports nothing yet.
 */
export function createHaptics(): Haptics {
  // On web, prefer the Vibration API where available, else no-op.
  if (typeof navigator !== 'undefined' && 'vibrate' in navigator) {
    return new WebVibrateHaptics();
  }
  return new NoopHaptics();
}
