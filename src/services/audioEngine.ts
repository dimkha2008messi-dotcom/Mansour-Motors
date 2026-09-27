/**
 * Real-time procedural hypercar sound synthesizer using Web Audio API
 * Generates V8/V12 low-frequency rumble, harmonics, and throttle rev response.
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isRunning: boolean = false;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private osc1: OscillatorNode | null = null;
  private osc2: OscillatorNode | null = null;
  private filter: BiquadFilterNode | null = null;
  private revGain: GainNode | null = null;
  private idleRpm: number = 65; // Hz base
  private currentRpm: number = 65;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    } catch {
      // AudioContext not supported
    }
  }

  public async start() {
    this.init();
    if (!this.ctx) return;

    if (this.ctx.state === 'suspended') {
      await this.ctx.resume();
    }

    if (this.isRunning) return;

    try {
      const now = this.ctx.currentTime;

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.22, now);
      this.masterGain.connect(this.ctx.destination);

      // Low rumble filter
      this.filter = this.ctx.createBiquadFilter();
      this.filter.type = 'lowpass';
      this.filter.frequency.setValueAtTime(280, now);
      this.filter.Q.setValueAtTime(3.5, now);
      this.filter.connect(this.masterGain);

      // Dual Sub-Oscillators for V8 firing order
      this.osc1 = this.ctx.createOscillator();
      this.osc1.type = 'sawtooth';
      this.osc1.frequency.setValueAtTime(this.idleRpm, now);

      this.osc2 = this.ctx.createOscillator();
      this.osc2.type = 'triangle';
      this.osc2.frequency.setValueAtTime(this.idleRpm * 1.5, now);

      this.revGain = this.ctx.createGain();
      this.revGain.gain.setValueAtTime(0.7, now);

      this.osc1.connect(this.filter);
      this.osc2.connect(this.filter);

      this.osc1.start();
      this.osc2.start();
      this.isRunning = true;
    } catch (e) {
      console.warn('Audio engine start notice:', e);
    }
  }

  public rev(targetMultiplier: number = 2.4, duration: number = 1.6) {
    if (!this.ctx || !this.isRunning || !this.osc1 || !this.osc2 || !this.filter) {
      this.start();
      return;
    }
    const now = this.ctx.currentTime;
    const peakFreq = this.idleRpm * targetMultiplier;

    // Throttle spike
    this.osc1.frequency.cancelScheduledValues(now);
    this.osc1.frequency.setValueAtTime(this.currentRpm, now);
    this.osc1.frequency.exponentialRampToValueAtTime(peakFreq, now + duration * 0.35);
    this.osc1.frequency.exponentialRampToValueAtTime(this.idleRpm, now + duration);

    this.osc2.frequency.cancelScheduledValues(now);
    this.osc2.frequency.setValueAtTime(this.currentRpm * 1.5, now);
    this.osc2.frequency.exponentialRampToValueAtTime(peakFreq * 1.5, now + duration * 0.35);
    this.osc2.frequency.exponentialRampToValueAtTime(this.idleRpm * 1.5, now + duration);

    // Open low-pass filter on rev for acoustic bite
    this.filter.frequency.cancelScheduledValues(now);
    this.filter.frequency.setValueAtTime(280, now);
    this.filter.frequency.exponentialRampToValueAtTime(950, now + duration * 0.35);
    this.filter.frequency.exponentialRampToValueAtTime(280, now + duration);

    // Subtle volume surge
    if (this.masterGain && !this.isMuted) {
      this.masterGain.gain.cancelScheduledValues(now);
      this.masterGain.gain.setValueAtTime(0.22, now);
      this.masterGain.gain.linearRampToValueAtTime(0.42, now + duration * 0.35);
      this.masterGain.gain.linearRampToValueAtTime(0.22, now + duration);
    }
  }

  public toggleMute(): boolean {
    this.isMuted = !this.isMuted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : 0.22, this.ctx.currentTime);
    }
    if (!this.isRunning && !this.isMuted) {
      this.start();
    }
    return this.isMuted;
  }

  public getMuted(): boolean {
    return this.isMuted;
  }

  public getIsRunning(): boolean {
    return this.isRunning;
  }

  public stop() {
    if (!this.isRunning) return;
    try {
      this.osc1?.stop();
      this.osc2?.stop();
      this.osc1?.disconnect();
      this.osc2?.disconnect();
      this.isRunning = false;
    } catch {
      // Ignored
    }
  }
}

export const audioEngine = new AudioEngine();
