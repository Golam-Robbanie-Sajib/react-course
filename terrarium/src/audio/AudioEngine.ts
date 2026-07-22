/**
 * WebAudio engine for M1 (architecture doc §"Audio").
 *
 * All SFX are synthesized placeholders — no assets yet. Everything is routed
 * through a master low-pass + gentle gain so nothing is ever harsh or loud
 * (design §3 audio constraints: rounded attack, low-pass, conversational-quiet).
 *
 * Pentatonic pitch-stepping: consecutive block placements walk up a minor
 * pentatonic scale so building literally sounds musical (design §10). The step
 * resets after a short pause so a new "phrase" starts low again.
 */

// A (minor) pentatonic scale in semitone offsets, spanning ~1.5 octaves.
const PENTATONIC = [0, 3, 5, 7, 10, 12, 15, 17, 19, 22];
const ROOT_HZ = 196.0; // G3 — warm, low root for the woody thock

const STEP_RESET_MS = 1400; // pause after which the melodic sequence restarts

function semitoneToRatio(semi: number): number {
  return Math.pow(2, semi / 12);
}

export class AudioEngine {
  private ctx: AudioContext | null = null;
  private master!: GainNode;
  private lowpass!: BiquadFilterNode;

  private stepIndex = 0;
  private lastPlaceAt = 0;
  private muted = false;

  /**
   * WebAudio can only start after a user gesture. Call this from the first
   * pointer interaction. Safe to call repeatedly.
   */
  resume(): void {
    if (!this.ctx) this.init();
    if (this.ctx && this.ctx.state === 'suspended') void this.ctx.resume();
  }

  setMuted(muted: boolean): void {
    this.muted = muted;
    if (this.master) this.master.gain.value = muted ? 0 : 0.5;
  }

  private init(): void {
    // Lazily construct so SSR / tests never touch WebAudio.
    const Ctx =
      window.AudioContext ??
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return;
    this.ctx = new Ctx();

    this.lowpass = this.ctx.createBiquadFilter();
    this.lowpass.type = 'lowpass';
    this.lowpass.frequency.value = 2600; // shave harsh top end — rounded, calm
    this.lowpass.Q.value = 0.3;

    this.master = this.ctx.createGain();
    this.master.gain.value = this.muted ? 0 : 0.5;

    this.lowpass.connect(this.master);
    this.master.connect(this.ctx.destination);
  }

  /**
   * The block-placement *thock*: a soft woody pluck. `semitoneBase` shifts the
   * timbre per material; the pentatonic step adds the melodic climb.
   */
  playThock(semitoneBase = 0): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;

    // Advance / reset the melodic sequence.
    const wall = performance.now();
    if (wall - this.lastPlaceAt > STEP_RESET_MS) this.stepIndex = 0;
    this.lastPlaceAt = wall;
    const step = PENTATONIC[this.stepIndex % PENTATONIC.length]!;
    this.stepIndex++;

    const freq = ROOT_HZ * semitoneToRatio(step + semitoneBase);

    // Two detuned triangle oscillators + a fast pitch drop = woody "thock".
    const osc = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    osc.type = 'triangle';
    osc2.type = 'sine';
    osc.frequency.setValueAtTime(freq * 1.6, now);
    osc.frequency.exponentialRampToValueAtTime(freq, now + 0.05);
    osc2.frequency.setValueAtTime(freq * 0.5, now);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.5, now + 0.006); // soft rounded attack
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.32); // gentle decay

    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(this.lowpass);
    osc.start(now);
    osc2.start(now);
    osc.stop(now + 0.34);
    osc2.stop(now + 0.34);
  }

  /** Softer, slightly lower reversed-ish *pock* for block removal. */
  playPock(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.18);
    const gain = this.ctx.createGain();
    // Swell-in (reversed feel) then quick close.
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(0.32, now + 0.12);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.24);
    osc.connect(gain);
    gain.connect(this.lowpass);
    osc.start(now);
    osc.stop(now + 0.26);
    // Placement melody shouldn't continue climbing after a remove.
    this.stepIndex = 0;
  }

  /** Filtered wine-glass *ting* for the tap-the-glass easter interaction. */
  playGlassTing(): void {
    if (!this.ctx) return;
    const now = this.ctx.currentTime;
    const partials = [1, 2.76, 5.4]; // inharmonic — glassy
    partials.forEach((mult, i) => {
      const osc = this.ctx!.createOscillator();
      osc.type = 'sine';
      osc.frequency.value = 880 * mult;
      const gain = this.ctx!.createGain();
      const peak = 0.18 / (i + 1);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(peak, now + 0.004);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.6);
      osc.connect(gain);
      gain.connect(this.lowpass);
      osc.start(now);
      osc.stop(now + 1.65);
    });
  }
}
