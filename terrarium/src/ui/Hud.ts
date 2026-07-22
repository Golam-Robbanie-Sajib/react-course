/**
 * Near-invisible HUD (design §3/§11: no badges, no popups; thin, ink-on-paper,
 * fades away). M1 shows one soft first-run hint that fades after the first
 * placement, plus quiet sound/haptics toggles. Nothing here nags or counts.
 */
export interface HudCallbacks {
  onToggleSound: (muted: boolean) => void;
  onToggleHaptics: (enabled: boolean) => void;
}

export class Hud {
  private readonly hint: HTMLDivElement;
  private readonly soundBtn: HTMLButtonElement;
  private readonly hapticBtn: HTMLButtonElement;
  private muted = false;
  private haptics = true;
  private hintDismissed = false;

  constructor(container: HTMLElement, cb: HudCallbacks) {
    const style = document.createElement('style');
    style.textContent = `
      .tr-hint {
        position: fixed; left: 0; right: 0; bottom: 12%;
        text-align: center; color: #5b5348; font-size: 15px;
        letter-spacing: 0.02em; opacity: 0; transition: opacity 1.2s ease;
        pointer-events: none; font-weight: 500;
      }
      .tr-hint.show { opacity: 0.7; }
      .tr-controls {
        position: fixed; top: env(safe-area-inset-top, 10px); right: 12px;
        display: flex; gap: 8px; opacity: 0.35; transition: opacity .3s ease;
      }
      .tr-controls:hover { opacity: 0.7; }
      .tr-controls button {
        width: 34px; height: 34px; border: none; border-radius: 10px;
        background: rgba(242,239,233,0.55); color: #5b5348; font-size: 15px;
        cursor: pointer; backdrop-filter: blur(6px);
      }
    `;
    document.head.appendChild(style);

    this.hint = document.createElement('div');
    this.hint.className = 'tr-hint';
    this.hint.textContent = 'tap inside the jar to place a block';
    container.appendChild(this.hint);

    const controls = document.createElement('div');
    controls.className = 'tr-controls';

    this.soundBtn = document.createElement('button');
    this.soundBtn.textContent = '♪';
    this.soundBtn.title = 'Sound';
    this.soundBtn.addEventListener('click', () => {
      this.muted = !this.muted;
      this.soundBtn.style.opacity = this.muted ? '0.35' : '1';
      cb.onToggleSound(this.muted);
    });

    this.hapticBtn = document.createElement('button');
    this.hapticBtn.textContent = '≈';
    this.hapticBtn.title = 'Haptics';
    this.hapticBtn.addEventListener('click', () => {
      this.haptics = !this.haptics;
      this.hapticBtn.style.opacity = this.haptics ? '1' : '0.35';
      cb.onToggleHaptics(this.haptics);
    });

    controls.appendChild(this.soundBtn);
    controls.appendChild(this.hapticBtn);
    container.appendChild(controls);

    // Fade the hint in shortly after load.
    window.setTimeout(() => this.hint.classList.add('show'), 900);
  }

  /** Called once the player places their first block — the hint has done its job. */
  dismissHint(): void {
    if (this.hintDismissed) return;
    this.hintDismissed = true;
    this.hint.classList.remove('show');
  }
}
