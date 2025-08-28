// Sistema de síntesis MIDI avanzado y profesional
export class AdvancedMIDISynthesizer {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private masterReverb: ConvolverNode | null = null;
  private masterDelay: DelayNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  
  private voices: Voice[] = [];
  private isPlaying = false;
  private currentPattern: any = null;
  private patternTimeout: NodeJS.Timeout | null = null;
  private startTime: number = 0;
  private pausedTime: number = 0;
  private trackDuration: number = 0;
  private onProgressUpdate?: (progress: number, currentTime: number, duration: number) => void;
  
  // Parámetros de control avanzados
  private parameters = {
    volume: 0.7,
    reverb: 0.3,
    delay: 0.2,
    chorus: 0.1,
    distortion: 0.0,
    cutoff: 8000,
    resonance: 1,
    attack: 0.01,
    decay: 0.1,
    sustain: 0.6,
    release: 0.3
  };

  constructor() {
    this.initAudio();
  }

  private async initAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Cadena de audio master: Compressor -> Reverb -> Delay -> Filter -> Destination
      this.masterGain = this.audioContext.createGain();
      this.compressor = this.audioContext.createDynamicsCompressor();
      this.masterReverb = this.audioContext.createConvolver();
      this.masterDelay = this.audioContext.createDelay(1.0);
      this.masterFilter = this.audioContext.createBiquadFilter();
      this.analyser = this.audioContext.createAnalyser();
      
      // Configurar compressor
      this.compressor.threshold.setValueAtTime(-18, this.audioContext.currentTime);
      this.compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
      this.compressor.ratio.setValueAtTime(4, this.audioContext.currentTime);
      this.compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
      this.compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
      
      // Configurar filtro master
      this.masterFilter.type = 'lowpass';
      this.masterFilter.frequency.setValueAtTime(this.parameters.cutoff, this.audioContext.currentTime);
      this.masterFilter.Q.setValueAtTime(this.parameters.resonance, this.audioContext.currentTime);
      
      // Configurar delay
      this.masterDelay.delayTime.setValueAtTime(0.125, this.audioContext.currentTime);
      const delayFeedback = this.audioContext.createGain();
      delayFeedback.gain.setValueAtTime(0.3, this.audioContext.currentTime);
      
      // Configurar reverb
      await this.createReverb();
      
      // Configurar analyser
      this.analyser.fftSize = 256;
      this.analyser.smoothingTimeConstant = 0.8;
      
      // Conectar cadena de audio
      this.masterGain.connect(this.compressor);
      this.compressor.connect(this.masterFilter);
      this.masterFilter.connect(this.masterReverb);
      this.masterReverb.connect(this.masterDelay);
      this.masterDelay.connect(delayFeedback);
      delayFeedback.connect(this.masterDelay);
      this.masterDelay.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      
      // Configurar ganancia inicial
      this.masterGain.gain.setValueAtTime(this.parameters.volume, this.audioContext.currentTime);
      
    } catch (error) {
      console.warn('Web Audio API no disponible:', error);
    }
  }

  private async createReverb() {
    if (!this.audioContext || !this.masterReverb) return;
    
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 3; // 3 segundos de reverb
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2);
        const noise = (Math.random() * 2 - 1) * decay;
        // Agregar early reflections
        const earlyReflection = Math.sin(i / 1000) * decay * 0.5;
        channelData[i] = (noise + earlyReflection) * 0.3;
      }
    }
    
    this.masterReverb.buffer = impulse;
  }

  // Clase Voice para polifonía avanzada
  private createVoice(frequency: number, waveType: OscillatorType, trackId: number): Voice {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const voice = new Voice(this.audioContext, this.masterGain!, frequency, waveType, trackId, this.parameters);
    this.voices.push(voice);
    return voice;
  }

  setParameter(param: string, value: number) {
    this.parameters[param as keyof typeof this.parameters] = value;
    
    if (!this.audioContext) return;
    
    switch (param) {
      case 'volume':
        if (this.masterGain) {
          this.masterGain.gain.exponentialRampToValueAtTime(
            Math.max(0.001, value), 
            this.audioContext.currentTime + 0.1
          );
        }
        break;
      case 'cutoff':
        if (this.masterFilter) {
          this.masterFilter.frequency.exponentialRampToValueAtTime(
            Math.max(100, value), 
            this.audioContext.currentTime + 0.1
          );
        }
        break;
      case 'resonance':
        if (this.masterFilter) {
          this.masterFilter.Q.setValueAtTime(value, this.audioContext.currentTime);
        }
        break;
      case 'delay':
        if (this.masterDelay) {
          this.masterDelay.delayTime.setValueAtTime(value * 0.5, this.audioContext.currentTime);
        }
        break;
    }
  }

  setVolume(volume: number) {
    this.setParameter('volume', volume / 100 * 0.8);
  }

  setProgressCallback(callback: (progress: number, currentTime: number, duration: number) => void) {
    this.onProgressUpdate = callback;
  }

  getTrackPattern(trackId: number) {
    const patterns = [
      // 1. Retro Arte - Síntesis FM con modulación
      { 
        name: "Retro Arte",
        baseFreq: 220, 
        scale: [1, 1.125, 1.25, 1.5, 1.875, 2, 2.25, 2.5], 
        rhythm: [600, 300, 450, 150, 750, 375, 525, 225], 
        wave: 'triangle' as OscillatorType,
        synthesis: 'fm',
        modulation: { rate: 5, depth: 0.3 },
        effects: { reverb: 0.4, delay: 0.2, chorus: 0.3 },
        envelope: { attack: 0.02, decay: 0.1, sustain: 0.7, release: 0.4 }
      },
      
      // 2. Neon Nights - Síntesis de diente de sierra con filtro sweep
      { 
        name: "Neon Nights",
        baseFreq: 196, 
        scale: [1, 1.2, 1.5, 2, 2.4, 3, 3.6, 4.8], 
        rhythm: [400, 200, 600, 300, 500, 250, 350, 175], 
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'subtractive',
        modulation: { rate: 0.5, depth: 0.8 },
        effects: { reverb: 0.3, delay: 0.4, chorus: 0.2 },
        envelope: { attack: 0.01, decay: 0.05, sustain: 0.8, release: 0.2 }
      },
      
      // 3. Digital Renaissance - Síntesis cuadrada con arpegios
      { 
        name: "Digital Renaissance",
        baseFreq: 174, 
        scale: [1, 1.26, 1.41, 1.68, 2.12, 2.67, 3.36, 4.23], 
        rhythm: [300, 150, 450, 225, 600, 300, 400, 200], 
        wave: 'square' as OscillatorType,
        synthesis: 'additive',
        modulation: { rate: 8, depth: 0.1 },
        effects: { reverb: 0.2, delay: 0.3, chorus: 0.4 },
        envelope: { attack: 0.005, decay: 0.2, sustain: 0.4, release: 0.6 }
      },
      
      // 4. Quantum Dreams - Síntesis ambient con pads
      { 
        name: "Quantum Dreams",
        baseFreq: 130, 
        scale: [1, 1.4, 1.8, 2.2, 2.8, 3.5, 4.4, 5.6], 
        rhythm: [1200, 600, 900, 450, 1500, 750, 1000, 500], 
        wave: 'sine' as OscillatorType,
        synthesis: 'granular',
        modulation: { rate: 0.2, depth: 0.9 },
        effects: { reverb: 0.8, delay: 0.5, chorus: 0.6 },
        envelope: { attack: 0.8, decay: 0.3, sustain: 0.9, release: 2.0 }
      },
      
      // 5. Underground Pulse - Síntesis bass con sub-oscilador
      { 
        name: "Underground Pulse",
        baseFreq: 98, 
        scale: [1, 1.1, 1.2, 1.4, 1.6, 2, 2.4, 3.2], 
        rhythm: [200, 100, 300, 150, 250, 125, 400, 200], 
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'bass',
        modulation: { rate: 2, depth: 0.4 },
        effects: { reverb: 0.1, delay: 0.2, chorus: 0.1 },
        envelope: { attack: 0.01, decay: 0.3, sustain: 0.3, release: 0.1 }
      },
      
      // 6. Deep House - Síntesis house clásica
      { 
        name: "Deep House",
        baseFreq: 147, 
        scale: [1, 1.25, 1.5, 2, 2.5, 3, 4, 5], 
        rhythm: [600, 300, 900, 450, 750, 375, 525, 262], 
        wave: 'triangle' as OscillatorType,
        synthesis: 'analog',
        modulation: { rate: 4, depth: 0.2 },
        effects: { reverb: 0.4, delay: 0.3, chorus: 0.3 },
        envelope: { attack: 0.1, decay: 0.2, sustain: 0.6, release: 0.8 }
      },
      
      // 7. Café Midnight - Síntesis jazz suave
      { 
        name: "Café Midnight",
        baseFreq: 110, 
        scale: [1, 1.3, 1.6, 2.1, 2.6, 3.2, 4.2, 5.5], 
        rhythm: [1000, 750, 1500, 1000, 2000, 1500, 1200, 600], 
        wave: 'sine' as OscillatorType,
        synthesis: 'warm',
        modulation: { rate: 1, depth: 0.15 },
        effects: { reverb: 0.6, delay: 0.4, chorus: 0.2 },
        envelope: { attack: 0.3, decay: 0.4, sustain: 0.8, release: 1.5 }
      },
      
      // 8. Cartagena Sunset - Síntesis tropical
      { 
        name: "Cartagena Sunset",
        baseFreq: 196, 
        scale: [1, 1.2, 1.4, 1.7, 2.1, 2.5, 3, 3.6], 
        rhythm: [450, 225, 675, 300, 550, 275, 400, 200], 
        wave: 'triangle' as OscillatorType,
        synthesis: 'marimba',
        modulation: { rate: 3, depth: 0.25 },
        effects: { reverb: 0.5, delay: 0.2, chorus: 0.4 },
        envelope: { attack: 0.01, decay: 0.6, sustain: 0.2, release: 1.2 }
      },
      
      // 9. Salsa Futurista - Síntesis percusiva
      { 
        name: "Salsa Futurista",
        baseFreq: 220, 
        scale: [1, 1.15, 1.35, 1.65, 2, 2.4, 2.9, 3.5], 
        rhythm: [350, 175, 525, 250, 400, 200, 300, 150], 
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'percussion',
        modulation: { rate: 6, depth: 0.3 },
        effects: { reverb: 0.3, delay: 0.1, chorus: 0.2 },
        envelope: { attack: 0.005, decay: 0.4, sustain: 0.1, release: 0.3 }
      },
      
      // 10. Cumbia Espacial - Síntesis etérea
      { 
        name: "Cumbia Espacial",
        baseFreq: 164, 
        scale: [1, 1.25, 1.5, 1.9, 2.3, 2.8, 3.5, 4.4], 
        rhythm: [550, 275, 825, 400, 700, 350, 600, 300], 
        wave: 'triangle' as OscillatorType,
        synthesis: 'ethereal',
        modulation: { rate: 0.7, depth: 0.6 },
        effects: { reverb: 0.7, delay: 0.5, chorus: 0.5 },
        envelope: { attack: 0.5, decay: 0.2, sustain: 0.9, release: 1.8 }
      },
      
      // Continuar con el resto de los tracks...
      { 
        name: "Vallenato Cyber",
        baseFreq: 138, 
        scale: [1, 1.3, 1.6, 2, 2.4, 3, 3.8, 4.8], 
        rhythm: [700, 350, 1050, 525, 800, 400, 600, 300], 
        wave: 'sine' as OscillatorType,
        synthesis: 'folk',
        modulation: { rate: 2.5, depth: 0.2 },
        effects: { reverb: 0.4, delay: 0.3, chorus: 0.3 },
        envelope: { attack: 0.2, decay: 0.3, sustain: 0.7, release: 1.0 }
      },
      
      { 
        name: "Bambuco Digital",
        baseFreq: 185, 
        scale: [1, 1.2, 1.5, 1.8, 2.2, 2.7, 3.2, 4], 
        rhythm: [900, 450, 1350, 675, 1200, 600, 800, 400], 
        wave: 'triangle' as OscillatorType,
        synthesis: 'classical',
        modulation: { rate: 1.5, depth: 0.15 },
        effects: { reverb: 0.5, delay: 0.2, chorus: 0.2 },
        envelope: { attack: 0.1, decay: 0.5, sustain: 0.6, release: 1.5 }
      },
      
      { 
        name: "Reggaeton 2050",
        baseFreq: 110, 
        scale: [1, 1.1, 1.3, 1.6, 1.9, 2.3, 2.8, 3.4], 
        rhythm: [400, 200, 300, 150, 500, 250, 350, 175], 
        wave: 'square' as OscillatorType,
        synthesis: 'urban',
        modulation: { rate: 4, depth: 0.3 },
        effects: { reverb: 0.2, delay: 0.3, chorus: 0.1 },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.2 }
      },
      
      { 
        name: "Champeta Galáctica",
        baseFreq: 156, 
        scale: [1, 1.15, 1.4, 1.7, 2.1, 2.5, 3.1, 3.8], 
        rhythm: [380, 190, 570, 285, 450, 225, 320, 160], 
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'afro',
        modulation: { rate: 5.5, depth: 0.4 },
        effects: { reverb: 0.4, delay: 0.2, chorus: 0.3 },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.5, release: 0.4 }
      },
      
      { 
        name: "Tropical Matrix",
        baseFreq: 174, 
        scale: [1, 1.25, 1.5, 1.85, 2.2, 2.75, 3.3, 4.1], 
        rhythm: [480, 240, 720, 360, 600, 300, 420, 210], 
        wave: 'triangle' as OscillatorType,
        synthesis: 'matrix',
        modulation: { rate: 3.5, depth: 0.35 },
        effects: { reverb: 0.6, delay: 0.4, chorus: 0.4 },
        envelope: { attack: 0.15, decay: 0.25, sustain: 0.7, release: 0.9 }
      },
      
      { 
        name: "Arte Infinito",
        baseFreq: 87, 
        scale: [1, 1.5, 2, 2.5, 3, 4, 5, 6], 
        rhythm: [2000, 1500, 3000, 2000, 2500, 1250, 1800, 900], 
        wave: 'sine' as OscillatorType,
        synthesis: 'infinite',
        modulation: { rate: 0.1, depth: 0.8 },
        effects: { reverb: 0.9, delay: 0.7, chorus: 0.8 },
        envelope: { attack: 2.0, decay: 1.0, sustain: 0.95, release: 3.0 }
      }
    ];
    
    return patterns[trackId % patterns.length];
  }

  private calculateTrackDuration(pattern: any): number {
    const cycleLength = pattern.rhythm.reduce((sum: number, duration: number) => sum + duration, 0);
    const numberOfCycles = 12; // Ajustado para mejor duración
    return cycleLength * numberOfCycles / 1000;
  }

  getCurrentTime(): number {
    if (!this.isPlaying && this.pausedTime > 0) {
      return this.pausedTime;
    }
    if (this.startTime === 0) return 0;
    return (Date.now() - this.startTime + this.pausedTime) / 1000;
  }

  getDuration(): number {
    return this.trackDuration;
  }

  playTrack(trackId: number) {
    if (!this.audioContext || !this.masterGain) return;

    this.stopTrack();
    this.isPlaying = true;
    this.currentPattern = this.getTrackPattern(trackId);
    this.trackDuration = this.calculateTrackDuration(this.currentPattern);
    this.startTime = Date.now();
    this.pausedTime = 0;

    // Aplicar parámetros específicos del track
    this.applyTrackParameters(this.currentPattern);
    
    this.playPattern();
    this.startProgressTracking();
  }

  private applyTrackParameters(pattern: any) {
    if (!this.audioContext) return;
    
    const time = this.audioContext.currentTime;
    
    // Aplicar efectos específicos del track
    if (pattern.effects) {
      this.setParameter('reverb', pattern.effects.reverb);
      this.setParameter('delay', pattern.effects.delay);
    }
    
    // Aplicar envelope específico
    if (pattern.envelope) {
      this.parameters.attack = pattern.envelope.attack;
      this.parameters.decay = pattern.envelope.decay;
      this.parameters.sustain = pattern.envelope.sustain;
      this.parameters.release = pattern.envelope.release;
    }
  }

  private playPattern() {
    if (!this.isPlaying || !this.currentPattern || !this.audioContext) return;

    const { baseFreq, scale, rhythm, wave, synthesis } = this.currentPattern;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const freq = baseFreq * scale[noteIndex % scale.length];
      const duration = rhythm[noteIndex % rhythm.length];

      // Crear voice con síntesis específica
      this.playAdvancedNote(freq, duration, wave, synthesis, noteIndex);

      noteIndex++;
      this.patternTimeout = setTimeout(playNextNote, duration);
    };

    playNextNote();
  }

  private playAdvancedNote(frequency: number, duration: number, waveType: OscillatorType, synthesis: string, noteIndex: number) {
    if (!this.audioContext || !this.masterGain) return;

    try {
      const voice = this.createVoice(frequency, waveType, noteIndex);
      voice.play(duration, synthesis);
      
      // Limpiar voice después de que termine
      setTimeout(() => {
        const index = this.voices.indexOf(voice);
        if (index > -1) {
          voice.stop();
          this.voices.splice(index, 1);
        }
      }, duration + 1000);
      
    } catch (error) {
      console.warn('Error playing note:', error);
    }
  }

  private startProgressTracking() {
    const updateProgress = () => {
      if (!this.isPlaying) return;
      
      const currentTime = this.getCurrentTime();
      const progress = Math.min((currentTime / this.trackDuration) * 100, 100);
      
      if (this.onProgressUpdate) {
        this.onProgressUpdate(progress, currentTime, this.trackDuration);
      }
      
      if (progress >= 100) {
        this.stopTrack();
        return;
      }
      
      requestAnimationFrame(updateProgress);
    };
    
    requestAnimationFrame(updateProgress);
  }

  stopTrack() {
    this.isPlaying = false;
    this.startTime = 0;
    this.pausedTime = 0;
    
    if (this.patternTimeout) {
      clearTimeout(this.patternTimeout);
      this.patternTimeout = null;
    }
    
    // Detener todas las voices
    this.voices.forEach(voice => voice.stop());
    this.voices = [];
  }

  pause() {
    if (this.isPlaying) {
      this.pausedTime = this.getCurrentTime();
      this.isPlaying = false;
      if (this.patternTimeout) {
        clearTimeout(this.patternTimeout);
        this.patternTimeout = null;
      }
      this.voices.forEach(voice => voice.stop());
      this.voices = [];
    }
  }

  resume() {
    if (this.currentPattern && !this.isPlaying) {
      this.isPlaying = true;
      this.startTime = Date.now();
      this.playPattern();
      this.startProgressTracking();
    }
  }

  seekTo(percentage: number) {
    if (percentage < 0 || percentage > 100) return;
    
    const targetTime = (this.trackDuration * percentage) / 100;
    
    if (this.isPlaying) {
      this.pausedTime = targetTime;
      this.startTime = Date.now();
      
      this.voices.forEach(voice => voice.stop());
      this.voices = [];
      
      if (this.patternTimeout) {
        clearTimeout(this.patternTimeout);
        this.patternTimeout = null;
      }
      
      this.playPattern();
    } else {
      this.pausedTime = targetTime;
    }
  }

  // Método para obtener datos del analizador para visualización
  getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(0);
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    
    return dataArray;
  }
}

// Clase Voice para síntesis avanzada individual
class Voice {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private filters: BiquadFilterNode[] = [];
  private frequency: number;
  private waveType: OscillatorType;
  private trackId: number;
  private parameters: any;

  constructor(
    audioContext: AudioContext, 
    masterGain: GainNode, 
    frequency: number, 
    waveType: OscillatorType, 
    trackId: number,
    parameters: any
  ) {
    this.audioContext = audioContext;
    this.masterGain = masterGain;
    this.frequency = frequency;
    this.waveType = waveType;
    this.trackId = trackId;
    this.parameters = parameters;
  }

  play(duration: number, synthesis: string) {
    const time = this.audioContext.currentTime;
    
    switch (synthesis) {
      case 'fm':
        this.playFMSynthesis(duration, time);
        break;
      case 'subtractive':
        this.playSubtractiveSynthesis(duration, time);
        break;
      case 'additive':
        this.playAdditiveSynthesis(duration, time);
        break;
      case 'bass':
        this.playBassSynthesis(duration, time);
        break;
      case 'analog':
        this.playAnalogSynthesis(duration, time);
        break;
      case 'granular':
        this.playGranularSynthesis(duration, time);
        break;
      default:
        this.playBasicSynthesis(duration, time);
    }
  }

  private playFMSynthesis(duration: number, time: number) {
    // Carrier oscillator
    const carrier = this.audioContext.createOscillator();
    const carrierGain = this.audioContext.createGain();
    
    // Modulator oscillator
    const modulator = this.audioContext.createOscillator();
    const modulatorGain = this.audioContext.createGain();
    
    carrier.type = this.waveType;
    carrier.frequency.setValueAtTime(this.frequency, time);
    
    modulator.type = 'sine';
    modulator.frequency.setValueAtTime(this.frequency * 2, time);
    modulatorGain.gain.setValueAtTime(this.frequency * 0.5, time);
    
    // Conectar FM
    modulator.connect(modulatorGain);
    modulatorGain.connect(carrier.frequency);
    
    carrier.connect(carrierGain);
    carrierGain.connect(this.masterGain);
    
    // Envelope ADSR
    this.applyEnvelope(carrierGain, duration, time);
    
    carrier.start(time);
    modulator.start(time);
    carrier.stop(time + duration / 1000);
    modulator.stop(time + duration / 1000);
    
    this.oscillators.push(carrier, modulator);
    this.gainNodes.push(carrierGain, modulatorGain);
  }

  private playSubtractiveSynthesis(duration: number, time: number) {
    // Múltiples osciladores ligeramente desafinados
    const numOscillators = 3;
    
    for (let i = 0; i < numOscillators; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      // Desafinar ligeramente cada oscilador
      const detune = (i - 1) * 5; // -5, 0, +5 cents
      osc.type = this.waveType;
      osc.frequency.setValueAtTime(this.frequency, time);
      osc.detune.setValueAtTime(detune, time);
      
      // Filtro pasa-bajos con sweep
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.frequency * 2, time);
      filter.frequency.exponentialRampToValueAtTime(this.frequency * 8, time + duration / 2000);
      filter.Q.setValueAtTime(5, time);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      // Gain relativo
      gain.gain.setValueAtTime(1 / numOscillators, time);
      this.applyEnvelope(gain, duration, time);
      
      osc.start(time);
      osc.stop(time + duration / 1000);
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
      this.filters.push(filter);
    }
  }

  private playAdditiveSynthesis(duration: number, time: number) {
    // Síntesis aditiva con harmonicos
    const harmonics = [1, 2, 3, 4, 5, 7, 9];
    
    harmonics.forEach((harmonic, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(this.frequency * harmonic, time);
      
      // Amplitude decrece con el harmónico
      const amplitude = 1 / harmonic;
      gain.gain.setValueAtTime(amplitude * 0.1, time);
      
      osc.connect(gain);
      gain.connect(this.masterGain);
      
      this.applyEnvelope(gain, duration, time);
      
      osc.start(time);
      osc.stop(time + duration / 1000);
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
    });
  }

  private playBassSynthesis(duration: number, time: number) {
    // Oscilador principal
    const mainOsc = this.audioContext.createOscillator();
    const mainGain = this.audioContext.createGain();
    
    // Sub-oscilador
    const subOsc = this.audioContext.createOscillator();
    const subGain = this.audioContext.createGain();
    
    // Filtro agresivo
    const filter = this.audioContext.createBiquadFilter();
    
    mainOsc.type = 'sawtooth';
    mainOsc.frequency.setValueAtTime(this.frequency, time);
    
    subOsc.type = 'square';
    subOsc.frequency.setValueAtTime(this.frequency / 2, time);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.frequency * 4, time);
    filter.Q.setValueAtTime(8, time);
    
    mainOsc.connect(filter);
    subOsc.connect(subGain);
    filter.connect(mainGain);
    
    mainGain.connect(this.masterGain);
    subGain.connect(this.masterGain);
    
    mainGain.gain.setValueAtTime(0.7, time);
    subGain.gain.setValueAtTime(0.3, time);
    
    this.applyEnvelope(mainGain, duration, time);
    this.applyEnvelope(subGain, duration, time);
    
    mainOsc.start(time);
    subOsc.start(time);
    mainOsc.stop(time + duration / 1000);
    subOsc.stop(time + duration / 1000);
    
    this.oscillators.push(mainOsc, subOsc);
    this.gainNodes.push(mainGain, subGain);
    this.filters.push(filter);
  }

  private playAnalogSynthesis(duration: number, time: number) {
    // Emulación de síntesis análoga clásica
    const osc1 = this.audioContext.createOscillator();
    const osc2 = this.audioContext.createOscillator();
    const gain1 = this.audioContext.createGain();
    const gain2 = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const finalGain = this.audioContext.createGain();
    
    osc1.type = 'sawtooth';
    osc2.type = 'square';
    
    osc1.frequency.setValueAtTime(this.frequency, time);
    osc2.frequency.setValueAtTime(this.frequency, time);
    osc2.detune.setValueAtTime(-7, time); // Ligeramente desafinado
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.frequency * 6, time);
    filter.Q.setValueAtTime(3, time);
    
    // Mixer
    osc1.connect(gain1);
    osc2.connect(gain2);
    gain1.connect(filter);
    gain2.connect(filter);
    filter.connect(finalGain);
    finalGain.connect(this.masterGain);
    
    gain1.gain.setValueAtTime(0.6, time);
    gain2.gain.setValueAtTime(0.4, time);
    
    this.applyEnvelope(finalGain, duration, time);
    
    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + duration / 1000);
    osc2.stop(time + duration / 1000);
    
    this.oscillators.push(osc1, osc2);
    this.gainNodes.push(gain1, gain2, finalGain);
    this.filters.push(filter);
  }

  private playGranularSynthesis(duration: number, time: number) {
    // Síntesis granular simplificada
    const grainCount = 8;
    const grainDuration = duration / 1000 / grainCount;
    
    for (let i = 0; i < grainCount; i++) {
      setTimeout(() => {
        if (this.audioContext) {
          const grain = this.audioContext.createOscillator();
          const grainGain = this.audioContext.createGain();
          
          // Variación en frecuencia y tiempo
          const freqVariation = 1 + (Math.random() - 0.5) * 0.1;
          grain.type = 'sine';
          grain.frequency.setValueAtTime(this.frequency * freqVariation, this.audioContext.currentTime);
          
          grain.connect(grainGain);
          grainGain.connect(this.masterGain);
          
          // Envelope de grano
          grainGain.gain.setValueAtTime(0, this.audioContext.currentTime);
          grainGain.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + grainDuration * 0.1);
          grainGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + grainDuration);
          
          grain.start(this.audioContext.currentTime);
          grain.stop(this.audioContext.currentTime + grainDuration);
          
          this.oscillators.push(grain);
          this.gainNodes.push(grainGain);
        }
      }, i * grainDuration * 1000);
    }
  }

  private playBasicSynthesis(duration: number, time: number) {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    osc.type = this.waveType;
    osc.frequency.setValueAtTime(this.frequency, time);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.frequency * 4, time);
    filter.Q.setValueAtTime(1, time);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    this.applyEnvelope(gain, duration, time);
    
    osc.start(time);
    osc.stop(time + duration / 1000);
    
    this.oscillators.push(osc);
    this.gainNodes.push(gain);
    this.filters.push(filter);
  }

  private applyEnvelope(gain: GainNode, duration: number, time: number) {
    const durationSec = duration / 1000;
    const attack = this.parameters.attack;
    const decay = this.parameters.decay;
    const sustain = this.parameters.sustain;
    const release = this.parameters.release;
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(1, time + attack);
    gain.gain.exponentialRampToValueAtTime(sustain, time + attack + decay);
    gain.gain.setValueAtTime(sustain, time + durationSec - release);
    gain.gain.linearRampToValueAtTime(0, time + durationSec);
  }

  stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscilador ya detenido
      }
    });
    
    this.oscillators = [];
    this.gainNodes = [];
    this.filters = [];
  }
}
