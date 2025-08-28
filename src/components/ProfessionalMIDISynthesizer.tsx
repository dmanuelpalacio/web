// 🎵 NÚCLEO COLECTIVO - BANDA SONORA PROFESIONAL
// Ingeniero de Sonido: Sistema de Síntesis Avanzado para Arte + IA
// Cada track diseñado específicamente para la experiencia inmersiva

export class ProfessionalMIDISynthesizer {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private masterReverb: ConvolverNode | null = null;
  private masterDelay: DelayNode | null = null;
  private masterFilter: BiquadFilterNode | null = null;
  private analyser: AnalyserNode | null = null;
  private limiter: DynamicsCompressorNode | null = null;
  
  // Parámetros de masterización profesional
  private masteringChain = {
    eq: null as BiquadFilterNode | null,
    compressor: null as DynamicsCompressorNode | null,
    stereoWidener: null as StereoPannerNode | null,
    exciter: null as WaveShaperNode | null,
    limiter: null as DynamicsCompressorNode | null
  };
  
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
    volume: 0.75,
    reverb: 0.35,
    delay: 0.25,
    chorus: 0.15,
    distortion: 0.0,
    cutoff: 8000,
    resonance: 1.2,
    attack: 0.02,
    decay: 0.15,
    sustain: 0.65,
    release: 0.4,
    stereoWidth: 0.6,
    brightness: 0.3
  };

  constructor() {
    this.initProfessionalAudio();
  }

  private async initProfessionalAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      
      // Cadena de masterización profesional
      await this.setupMasteringChain();
      
      this.analyser = this.audioContext.createAnalyser();
      this.analyser.fftSize = 512;
      this.analyser.smoothingTimeConstant = 0.85;
      
      // Conectar cadena final
      this.masterGain!.connect(this.masteringChain.eq!);
      this.masteringChain.eq!.connect(this.masteringChain.compressor!);
      this.masteringChain.compressor!.connect(this.masteringChain.stereoWidener!);
      this.masteringChain.stereoWidener!.connect(this.masteringChain.exciter!);
      this.masteringChain.exciter!.connect(this.masteringChain.limiter!);
      this.masteringChain.limiter!.connect(this.analyser);
      this.analyser.connect(this.audioContext.destination);
      
    } catch (error) {
      console.warn('Professional Audio System initialization failed:', error);
    }
  }

  private async setupMasteringChain() {
    if (!this.audioContext) return;
    
    // Master gain
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.setValueAtTime(this.parameters.volume, this.audioContext.currentTime);
    
    // EQ de masterización
    this.masteringChain.eq = this.audioContext.createBiquadFilter();
    this.masteringChain.eq.type = 'peaking';
    this.masteringChain.eq.frequency.setValueAtTime(3000, this.audioContext.currentTime);
    this.masteringChain.eq.Q.setValueAtTime(0.7, this.audioContext.currentTime);
    this.masteringChain.eq.gain.setValueAtTime(2, this.audioContext.currentTime);
    
    // Compressor de masterización
    this.masteringChain.compressor = this.audioContext.createDynamicsCompressor();
    this.masteringChain.compressor.threshold.setValueAtTime(-12, this.audioContext.currentTime);
    this.masteringChain.compressor.knee.setValueAtTime(25, this.audioContext.currentTime);
    this.masteringChain.compressor.ratio.setValueAtTime(3, this.audioContext.currentTime);
    this.masteringChain.compressor.attack.setValueAtTime(0.005, this.audioContext.currentTime);
    this.masteringChain.compressor.release.setValueAtTime(0.1, this.audioContext.currentTime);
    
    // Stereo widener
    this.masteringChain.stereoWidener = this.audioContext.createStereoPanner();
    this.masteringChain.stereoWidener.pan.setValueAtTime(0, this.audioContext.currentTime);
    
    // Exciter/Harmonic enhancer
    this.masteringChain.exciter = this.audioContext.createWaveShaper();
    this.setupExciter();
    
    // Limiter final
    this.masteringChain.limiter = this.audioContext.createDynamicsCompressor();
    this.masteringChain.limiter.threshold.setValueAtTime(-1, this.audioContext.currentTime);
    this.masteringChain.limiter.knee.setValueAtTime(0, this.audioContext.currentTime);
    this.masteringChain.limiter.ratio.setValueAtTime(20, this.audioContext.currentTime);
    this.masteringChain.limiter.attack.setValueAtTime(0.001, this.audioContext.currentTime);
    this.masteringChain.limiter.release.setValueAtTime(0.01, this.audioContext.currentTime);
    
    // Setup reverb y delay
    await this.setupProfessionalReverb();
    this.setupAdvancedDelay();
  }

  private setupExciter() {
    if (!this.masteringChain.exciter || !this.audioContext) return;
    
    const samples = 44100;
    const curve = new Float32Array(samples);
    const deg = Math.PI / 180;
    
    for (let i = 0; i < samples; i++) {
      const x = (i * 2) / samples - 1;
      curve[i] = ((3 + 20) * x * 20 * deg) / (Math.PI + 20 * Math.abs(x));
    }
    
    this.masteringChain.exciter.curve = curve;
    this.masteringChain.exciter.oversample = '4x';
  }

  private async setupProfessionalReverb() {
    if (!this.audioContext) return;
    
    this.masterReverb = this.audioContext.createConvolver();
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 4; // 4 segundos de reverb profesional
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2.5);
        const noise = (Math.random() * 2 - 1) * decay;
        
        // Early reflections más sofisticadas
        const earlyReflection = Math.sin(i / 800) * decay * 0.3;
        const lateReflection = Math.sin(i / 2000) * decay * 0.4;
        const diffusion = Math.sin(i / 500) * decay * 0.2;
        
        channelData[i] = (noise + earlyReflection + lateReflection + diffusion) * 0.25;
      }
    }
    
    this.masterReverb.buffer = impulse;
  }

  private setupAdvancedDelay() {
    if (!this.audioContext) return;
    
    this.masterDelay = this.audioContext.createDelay(2.0);
    this.masterDelay.delayTime.setValueAtTime(0.125, this.audioContext.currentTime);
    
    // Feedback con filtro
    const delayFeedback = this.audioContext.createGain();
    const delayFilter = this.audioContext.createBiquadFilter();
    
    delayFeedback.gain.setValueAtTime(0.35, this.audioContext.currentTime);
    delayFilter.type = 'lowpass';
    delayFilter.frequency.setValueAtTime(4000, this.audioContext.currentTime);
    
    this.masterDelay.connect(delayFilter);
    delayFilter.connect(delayFeedback);
    delayFeedback.connect(this.masterDelay);
  }

  setParameter(param: string, value: number) {
    this.parameters[param as keyof typeof this.parameters] = value;
    
    if (!this.audioContext) return;
    
    const time = this.audioContext.currentTime;
    
    switch (param) {
      case 'volume':
        if (this.masterGain) {
          this.masterGain.gain.exponentialRampToValueAtTime(
            Math.max(0.001, value), time + 0.1
          );
        }
        break;
      case 'brightness':
        if (this.masteringChain.eq) {
          const gain = (value - 0.5) * 6; // -3dB a +3dB
          this.masteringChain.eq.gain.setValueAtTime(gain, time);
        }
        break;
      case 'stereoWidth':
        // Implementar stereo widening
        break;
    }
  }

  setVolume(volume: number) {
    this.setParameter('volume', volume / 100 * 0.8);
  }

  setProgressCallback(callback: (progress: number, currentTime: number, duration: number) => void) {
    this.onProgressUpdate = callback;
  }

  // 🎼 BANDA SONORA PROFESIONAL - NÚCLEO COLECTIVO
  getTrackPattern(trackId: number) {
    const professionalTracks = [
      // 1. "Genesis Code" - La génesis del arte digital
      {
        name: "Genesis Code",
        artist: "Núcleo Colectivo",
        genre: "Cinematic Electronic",
        bpm: 95,
        key: "Dm",
        baseFreq: 146.83, // D3
        scale: [1, 1.122, 1.26, 1.414, 1.587, 1.782, 2, 2.245], // Escala menor armónica
        chords: [
          { notes: [1, 1.26, 1.587], duration: 2000 }, // Dm
          { notes: [1.122, 1.414, 1.782], duration: 2000 }, // Bb
          { notes: [1.26, 1.587, 2], duration: 2000 }, // F
          { notes: [1.414, 1.782, 2.245], duration: 2000 }, // C
        ],
        melody: [1, 1.587, 1.414, 1.26, 1.782, 1.587, 1.414, 1, 2, 1.782, 1.587, 1.414, 1.26, 1.122, 1],
        rhythm: [800, 400, 600, 400, 1000, 500, 750, 400, 1200, 600, 500, 400, 600, 800, 1000],
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'cinematic',
        structure: 'intro-verse-chorus-verse-chorus-bridge-chorus-outro',
        effects: { reverb: 0.7, delay: 0.4, chorus: 0.3, stereoWidth: 0.8 },
        envelope: { attack: 0.3, decay: 0.2, sustain: 0.8, release: 1.2 },
        description: "Nacimiento del arte digital - Atmósferas épicas que evocan la creación"
      },

      // 2. "Neural Networks" - La complejidad de la IA
      {
        name: "Neural Networks",
        artist: "Núcleo Colectivo",
        genre: "Progressive Techno",
        bpm: 128,
        key: "Am",
        baseFreq: 220, // A3
        scale: [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2], // Escala menor natural con tensiones
        chords: [
          { notes: [1, 1.25, 1.5], duration: 1000 }, // Am
          { notes: [1.333, 1.667, 2], duration: 1000 }, // F
          { notes: [1.125, 1.5, 1.875], duration: 1000 }, // C
          { notes: [1.25, 1.5, 1.875], duration: 1000 }, // G
        ],
        melody: [1, 1.5, 1.25, 1.875, 1.333, 2, 1.667, 1.5, 1.875, 1.25, 1.5, 1, 1.333, 1.125, 1],
        rhythm: [250, 250, 125, 375, 500, 250, 375, 125, 750, 250, 125, 250, 500, 375, 250],
        wave: 'square' as OscillatorType,
        synthesis: 'progressive',
        structure: 'build-drop-breakdown-build-drop-outro',
        effects: { reverb: 0.4, delay: 0.6, chorus: 0.2, stereoWidth: 0.9 },
        envelope: { attack: 0.01, decay: 0.1, sustain: 0.7, release: 0.3 },
        description: "Redes neuronales en movimiento - Progresiones complejas que simulan el pensamiento artificial"
      },

      // 3. "Digital Renaissance" - Fusión de clásico y digital
      {
        name: "Digital Renaissance",
        artist: "Núcleo Colectivo",
        genre: "Neo-Classical Electronic",
        bpm: 110,
        key: "Cmaj",
        baseFreq: 261.63, // C4
        scale: [1, 1.125, 1.25, 1.333, 1.5, 1.667, 1.875, 2], // Jónico con extensiones
        chords: [
          { notes: [1, 1.25, 1.5], duration: 1500 }, // C
          { notes: [1.125, 1.5, 1.875], duration: 1500 }, // F
          { notes: [1.333, 1.667, 2], duration: 1500 }, // G
          { notes: [1, 1.333, 1.667], duration: 1500 }, // Am
        ],
        melody: [1, 1.25, 1.5, 1.667, 1.875, 2, 1.875, 1.667, 1.5, 1.333, 1.25, 1.125, 1, 1.25, 1.5],
        rhythm: [600, 300, 450, 300, 750, 450, 600, 300, 900, 450, 300, 600, 750, 450, 600],
        wave: 'triangle' as OscillatorType,
        synthesis: 'orchestral',
        structure: 'prelude-theme-variation1-variation2-development-recapitulation',
        effects: { reverb: 0.8, delay: 0.3, chorus: 0.4, stereoWidth: 0.7 },
        envelope: { attack: 0.2, decay: 0.3, sustain: 0.8, release: 1.0 },
        description: "Renacimiento digital - Fusión armoniosa entre tradición clásica e innovación tecnológica"
      },

      // 4. "Quantum Canvas" - Espacios infinitos de creación
      {
        name: "Quantum Canvas",
        artist: "Núcleo Colectivo",
        genre: "Ambient Experimental",
        bpm: 70,
        key: "Emin",
        baseFreq: 164.81, // E3
        scale: [1, 1.189, 1.26, 1.498, 1.682, 1.782, 2.121, 2.378], // Escala menor con microtonos
        chords: [
          { notes: [1, 1.26, 1.498], duration: 3000 }, // Em
          { notes: [1.189, 1.498, 1.782], duration: 3000 }, // Bm
          { notes: [1.26, 1.582, 1.89], duration: 3000 }, // C
          { notes: [1.498, 1.89, 2.378], duration: 3000 }, // G
        ],
        melody: [1, 1.498, 1.26, 1.782, 1.189, 2.121, 1.682, 1.498, 2.378, 1.782, 1.26, 1.498, 1, 1.189, 1.682],
        rhythm: [1500, 750, 2250, 1125, 3000, 1500, 2250, 750, 4500, 2250, 1500, 3000, 2250, 1500, 3000],
        wave: 'sine' as OscillatorType,
        synthesis: 'granular',
        structure: 'emergence-expansion-transformation-transcendence',
        effects: { reverb: 0.9, delay: 0.7, chorus: 0.6, stereoWidth: 1.0 },
        envelope: { attack: 2.0, decay: 1.5, sustain: 0.9, release: 3.0 },
        description: "Lienzo cuántico - Texturas infinitas que exploran dimensiones sonoras inexploradas"
      },

      // 5. "Algorithmic Dreams" - Los sueños de la máquina
      {
        name: "Algorithmic Dreams",
        artist: "Núcleo Colectivo",
        genre: "Glitch Ambient",
        bpm: 85,
        key: "F#min",
        baseFreq: 185, // F#3
        scale: [1, 1.067, 1.189, 1.333, 1.424, 1.587, 1.782, 1.896], // Escala menor natural con cromatismos
        chords: [
          { notes: [1, 1.189, 1.424], duration: 2500 }, // F#m
          { notes: [1.067, 1.333, 1.587], duration: 2500 }, // Gmaj7
          { notes: [1.189, 1.424, 1.782], duration: 2500 }, // A
          { notes: [1.333, 1.587, 1.896], duration: 2500 }, // Bmaj7
        ],
        melody: [1, 1.424, 1.189, 1.587, 1.067, 1.782, 1.333, 1.896, 1.424, 1.189, 1.587, 1, 1.333, 1.067, 1.424],
        rhythm: [1000, 500, 1500, 750, 2000, 1000, 1250, 625, 1750, 875, 1000, 1500, 750, 1250, 2000],
        wave: 'triangle' as OscillatorType,
        synthesis: 'glitch',
        structure: 'inception-processing-fragmentation-recompilation-resolution',
        effects: { reverb: 0.6, delay: 0.8, chorus: 0.5, stereoWidth: 0.8 },
        envelope: { attack: 0.5, decay: 0.8, sustain: 0.6, release: 2.0 },
        description: "Sueños algorítmicos - Patrones fractales que revelan la poesía oculta en el código"
      },

      // 6. "Creative Synthesis" - La fusión perfecta
      {
        name: "Creative Synthesis",
        artist: "Núcleo Colectivo",
        genre: "Fusion Electronic",
        bpm: 120,
        key: "Bbmaj",
        baseFreq: 233.08, // Bb3
        scale: [1, 1.125, 1.25, 1.406, 1.5, 1.688, 1.875, 2.109], // Mixolidio con tensiones jazz
        chords: [
          { notes: [1, 1.25, 1.5], duration: 1200 }, // Bb
          { notes: [1.125, 1.406, 1.688], duration: 1200 }, // Cm7
          { notes: [1.25, 1.5, 1.875], duration: 1200 }, // Dm7
          { notes: [1.406, 1.688, 2.109], duration: 1200 }, // Ebmaj7
        ],
        melody: [1, 1.5, 1.25, 1.875, 1.125, 2.109, 1.406, 1.688, 1.5, 1.25, 1.875, 1, 1.406, 1.125, 1.5],
        rhythm: [400, 200, 600, 300, 800, 400, 500, 250, 700, 350, 450, 600, 300, 500, 400],
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'fusion',
        structure: 'intro-theme-improvisation-development-climax-resolution',
        effects: { reverb: 0.5, delay: 0.4, chorus: 0.6, stereoWidth: 0.7 },
        envelope: { attack: 0.05, decay: 0.2, sustain: 0.7, release: 0.6 },
        description: "Síntesis creativa - Jazz digital que fusiona improvisación humana con precisión algorítmica"
      },

      // 7. "Midnight Laboratory" - El taller nocturno
      {
        name: "Midnight Laboratory",
        artist: "Núcleo Colectivo",
        genre: "Dark Ambient Techno",
        bpm: 115,
        key: "Gmin",
        baseFreq: 196, // G3
        scale: [1, 1.067, 1.2, 1.333, 1.424, 1.6, 1.778, 1.896], // Menor natural con tensiones oscuras
        chords: [
          { notes: [1, 1.2, 1.424], duration: 1800 }, // Gm
          { notes: [1.067, 1.333, 1.6], duration: 1800 }, // Abmaj7
          { notes: [1.2, 1.424, 1.778], duration: 1800 }, // Bb
          { notes: [1.333, 1.6, 1.896], duration: 1800 }, // Cm7
        ],
        melody: [1, 1.424, 1.2, 1.778, 1.067, 1.896, 1.333, 1.6, 1.424, 1.2, 1.778, 1, 1.333, 1.067, 1.424],
        rhythm: [700, 350, 1050, 525, 1400, 700, 875, 437, 1225, 612, 700, 1050, 525, 875, 1400],
        wave: 'square' as OscillatorType,
        synthesis: 'industrial',
        structure: 'setup-experiment-complication-breakthrough-conclusion',
        effects: { reverb: 0.7, delay: 0.5, chorus: 0.3, stereoWidth: 0.6 },
        envelope: { attack: 0.1, decay: 0.4, sustain: 0.5, release: 0.8 },
        description: "Laboratorio nocturno - Sonidos industriales que evocan la experimentación creativa en las horas silenciosas"
      },

      // 8. "Caribbean Pixels" - Fusión tropical digital
      {
        name: "Caribbean Pixels",
        artist: "Núcleo Colectivo",
        genre: "Tropical Electronic",
        bpm: 105,
        key: "Amaj",
        baseFreq: 220, // A3
        scale: [1, 1.122, 1.26, 1.333, 1.498, 1.681, 1.888, 2.123], // Mixolidio tropical
        chords: [
          { notes: [1, 1.26, 1.498], duration: 1400 }, // A
          { notes: [1.122, 1.333, 1.681], duration: 1400 }, // Bm7
          { notes: [1.26, 1.498, 1.888], duration: 1400 }, // C#m
          { notes: [1.333, 1.681, 2.123], duration: 1400 }, // D
        ],
        melody: [1, 1.498, 1.26, 1.888, 1.122, 2.123, 1.333, 1.681, 1.498, 1.26, 1.888, 1, 1.333, 1.122, 1.498],
        rhythm: [500, 250, 750, 375, 1000, 500, 625, 312, 875, 437, 500, 750, 375, 625, 1000],
        wave: 'triangle' as OscillatorType,
        synthesis: 'tropical',
        structure: 'intro-verse-pre-chorus-chorus-verse-chorus-bridge-chorus-outro',
        effects: { reverb: 0.6, delay: 0.3, chorus: 0.7, stereoWidth: 0.9 },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.6, release: 0.5 },
        description: "Píxeles caribeños - Ritmos tropicales procesados digitalmente, fusión perfecta de tradición y modernidad"
      },

      // 9. "Salsa Cyborg" - Latino futurista
      {
        name: "Salsa Cyborg",
        artist: "Núcleo Colectivo",
        genre: "Latin Futuristic",
        bpm: 135,
        key: "Emin",
        baseFreq: 164.81, // E3
        scale: [1, 1.125, 1.26, 1.414, 1.587, 1.782, 2, 2.245], // Menor harmónica latina
        chords: [
          { notes: [1, 1.26, 1.587], duration: 1000 }, // Em
          { notes: [1.125, 1.414, 1.782], duration: 1000 }, // Bm7b5
          { notes: [1.26, 1.587, 2], duration: 1000 }, // C
          { notes: [1.414, 1.782, 2.245], duration: 1000 }, // G7
        ],
        melody: [1, 1.587, 1.26, 2, 1.125, 2.245, 1.414, 1.782, 1.587, 1.26, 2, 1, 1.414, 1.125, 1.587],
        rhythm: [300, 150, 450, 225, 600, 300, 375, 187, 525, 262, 300, 450, 225, 375, 600],
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'latin',
        structure: 'intro-montuno-coro-solo-montuno-coro-mambo-coro-outro',
        effects: { reverb: 0.4, delay: 0.4, chorus: 0.5, stereoWidth: 0.8 },
        envelope: { attack: 0.01, decay: 0.15, sustain: 0.7, release: 0.3 },
        description: "Salsa cyborg - Fusión de montunos tradicionales con síntesis futurista, el futuro del son"
      },

      // 10. "Cosmic Cumbia" - Cumbia espacial
      {
        name: "Cosmic Cumbia",
        artist: "Núcleo Colectivo",
        genre: "Space Cumbia",
        bpm: 98,
        key: "Dmaj",
        baseFreq: 146.83, // D3
        scale: [1, 1.122, 1.26, 1.414, 1.587, 1.782, 2, 2.245], // Pentatónica extendida
        chords: [
          { notes: [1, 1.26, 1.587], duration: 1600 }, // D
          { notes: [1.122, 1.414, 1.782], duration: 1600 }, // Em7
          { notes: [1.26, 1.587, 2], duration: 1600 }, // F#m
          { notes: [1.414, 1.782, 2.245], duration: 1600 }, // G
        ],
        melody: [1, 1.587, 1.26, 1.782, 1.122, 2, 1.414, 2.245, 1.587, 1.26, 1.782, 1, 1.414, 1.122, 1.587],
        rhythm: [800, 400, 1200, 600, 1600, 800, 1000, 500, 1400, 700, 800, 1200, 600, 1000, 1600],
        wave: 'triangle' as OscillatorType,
        synthesis: 'cosmic',
        structure: 'intro-verse-cumbia-verso-cumbia-interludio-cumbia-outro',
        effects: { reverb: 0.8, delay: 0.6, chorus: 0.6, stereoWidth: 0.9 },
        envelope: { attack: 0.3, decay: 0.4, sustain: 0.8, release: 1.0 },
        description: "Cumbia cósmica - Ritmos ancestrales navegando por el espacio digital, tradición en órbita"
      },

      // 11. "Vallenato Neural" - Folclor conectado
      {
        name: "Vallenato Neural",
        artist: "Núcleo Colectivo",
        genre: "Folk AI",
        bpm: 88,
        key: "Gmaj",
        baseFreq: 196, // G3
        scale: [1, 1.125, 1.26, 1.414, 1.587, 1.782, 2, 2.245], // Modal mixolidio
        chords: [
          { notes: [1, 1.26, 1.587], duration: 2000 }, // G
          { notes: [1.125, 1.414, 1.782], duration: 2000 }, // Am7
          { notes: [1.26, 1.587, 2], duration: 2000 }, // Bm
          { notes: [1.414, 1.782, 2.245], duration: 2000 }, // C
        ],
        melody: [1, 1.587, 1.26, 1.782, 1.125, 2, 1.414, 2.245, 1.587, 1.26, 1.782, 1, 1.414, 1.125, 1.587],
        rhythm: [1000, 500, 1500, 750, 2000, 1000, 1250, 625, 1750, 875, 1000, 1500, 750, 1250, 2000],
        wave: 'sine' as OscillatorType,
        synthesis: 'folk',
        structure: 'intro-verso-estribillo-verso-estribillo-puente-estribillo-outro',
        effects: { reverb: 0.6, delay: 0.4, chorus: 0.4, stereoWidth: 0.6 },
        envelope: { attack: 0.2, decay: 0.5, sustain: 0.7, release: 1.2 },
        description: "Vallenato neural - Acordeón digital que aprende melodías ancestrales, tradición que evoluciona"
      },

      // 12. "Bambuco Quantum" - Música colombiana cuántica
      {
        name: "Bambuco Quantum",
        artist: "Núcleo Colectivo",
        genre: "Quantum Folk",
        bpm: 75,
        key: "Fmaj",
        baseFreq: 174.61, // F3
        scale: [1, 1.125, 1.26, 1.414, 1.587, 1.782, 2, 2.245], // Jónico con color
        chords: [
          { notes: [1, 1.26, 1.587], duration: 2400 }, // F
          { notes: [1.125, 1.414, 1.782], duration: 2400 }, // Gm7
          { notes: [1.26, 1.587, 2], duration: 2400 }, // Am
          { notes: [1.414, 1.782, 2.245], duration: 2400 }, // Bb
        ],
        melody: [1, 1.587, 1.26, 1.782, 1.125, 2, 1.414, 2.245, 1.587, 1.26, 1.782, 1, 1.414, 1.125, 1.587],
        rhythm: [1200, 600, 1800, 900, 2400, 1200, 1500, 750, 2100, 1050, 1200, 1800, 900, 1500, 2400],
        wave: 'triangle' as OscillatorType,
        synthesis: 'classical',
        structure: 'preludio-tema-variación1-variación2-desarrollo-recapitulación',
        effects: { reverb: 0.7, delay: 0.3, chorus: 0.5, stereoWidth: 0.7 },
        envelope: { attack: 0.4, decay: 0.6, sustain: 0.8, release: 1.8 },
        description: "Bambuco cuántico - Estructura clásica colombiana explorando probabilidades armónicas infinitas"
      },

      // 13. "Reggaeton 3000" - Urbano del futuro
      {
        name: "Reggaeton 3000",
        artist: "Núcleo Colectivo",
        genre: "Future Urban",
        bpm: 92,
        key: "Cmin",
        baseFreq: 130.81, // C3
        scale: [1, 1.067, 1.2, 1.333, 1.424, 1.6, 1.778, 1.896], // Menor natural con cromatismos
        chords: [
          { notes: [1, 1.2, 1.424], duration: 1300 }, // Cm
          { notes: [1.067, 1.333, 1.6], duration: 1300 }, // Dbmaj7
          { notes: [1.2, 1.424, 1.778], duration: 1300 }, // Eb
          { notes: [1.333, 1.6, 1.896], duration: 1300 }, // Fm7
        ],
        melody: [1, 1.424, 1.2, 1.778, 1.067, 1.896, 1.333, 1.6, 1.424, 1.2, 1.778, 1, 1.333, 1.067, 1.424],
        rhythm: [325, 162, 487, 243, 650, 325, 406, 203, 568, 284, 325, 487, 243, 406, 650],
        wave: 'square' as OscillatorType,
        synthesis: 'urban',
        structure: 'intro-verso-pre-coro-coro-verso-coro-bridge-coro-outro',
        effects: { reverb: 0.3, delay: 0.5, chorus: 0.2, stereoWidth: 0.8 },
        envelope: { attack: 0.01, decay: 0.2, sustain: 0.4, release: 0.2 },
        description: "Reggaetón 3000 - Dembow evolucionado con síntesis avanzada, el perreo del futuro"
      },

      // 14. "Champeta Galaxy" - Africano intergaláctico
      {
        name: "Champeta Galaxy",
        artist: "Núcleo Colectivo",
        genre: "Afro Galactic",
        bpm: 112,
        key: "Emin",
        baseFreq: 164.81, // E3
        scale: [1, 1.1, 1.2, 1.35, 1.5, 1.65, 1.8, 1.95], // Pentatónica africana extendida
        chords: [
          { notes: [1, 1.2, 1.5], duration: 1070 }, // Em
          { notes: [1.1, 1.35, 1.65], duration: 1070 }, // F#dim
          { notes: [1.2, 1.5, 1.8], duration: 1070 }, // G
          { notes: [1.35, 1.65, 1.95], duration: 1070 }, // Am7
        ],
        melody: [1, 1.5, 1.2, 1.8, 1.1, 1.95, 1.35, 1.65, 1.5, 1.2, 1.8, 1, 1.35, 1.1, 1.5],
        rhythm: [268, 134, 402, 201, 536, 268, 335, 167, 469, 234, 268, 402, 201, 335, 536],
        wave: 'sawtooth' as OscillatorType,
        synthesis: 'afro',
        structure: 'llamada-respuesta-coro-solo-llamada-respuesta-coro-outro',
        effects: { reverb: 0.5, delay: 0.4, chorus: 0.6, stereoWidth: 0.9 },
        envelope: { attack: 0.02, decay: 0.3, sustain: 0.6, release: 0.4 },
        description: "Champeta galáctica - Ritmos afrocaribeños expandidos por el cosmos digital, ancestralidad espacial"
      },

      // 15. "Matrix Tropical" - Caribe en la matriz
      {
        name: "Matrix Tropical",
        artist: "Núcleo Colectivo",
        genre: "Neo Tropical",
        bpm: 108,
        key: "Amaj",
        baseFreq: 220, // A3
        scale: [1, 1.122, 1.26, 1.414, 1.587, 1.782, 2, 2.245], // Lidio tropical
        chords: [
          { notes: [1, 1.26, 1.587], duration: 1111 }, // A
          { notes: [1.122, 1.414, 1.782], duration: 1111 }, // Bmaj7
          { notes: [1.26, 1.587, 2], duration: 1111 }, // C#m
          { notes: [1.414, 1.782, 2.245], duration: 1111 }, // Dmaj7
        ],
        melody: [1, 1.587, 1.26, 2, 1.122, 2.245, 1.414, 1.782, 1.587, 1.26, 2, 1, 1.414, 1.122, 1.587],
        rhythm: [370, 185, 555, 277, 740, 370, 462, 231, 648, 324, 370, 555, 277, 462, 740],
        wave: 'triangle' as OscillatorType,
        synthesis: 'matrix',
        structure: 'entrada-desarrollo-clímax-transformación-resolución',
        effects: { reverb: 0.6, delay: 0.5, chorus: 0.7, stereoWidth: 0.8 },
        envelope: { attack: 0.1, decay: 0.3, sustain: 0.7, release: 0.8 },
        description: "Matrix tropical - Algoritmos caribeños decodificando realidades alternas, paraíso digital"
      },

      // 16. "Infinite Arte" - El arte sin límites
      {
        name: "Infinite Arte",
        artist: "Núcleo Colectivo",
        genre: "Infinite Ambient",
        bpm: 60,
        key: "Amaj",
        baseFreq: 110, // A2
        scale: [1, 1.2, 1.414, 1.681, 2, 2.378, 2.828, 3.364], // Armónicos perfectos
        chords: [
          { notes: [1, 1.414, 2], duration: 4000 }, // A sus2
          { notes: [1.2, 1.681, 2.378], duration: 4000 }, // B sus2
          { notes: [1.414, 2, 2.828], duration: 4000 }, // C# sus2
          { notes: [1.681, 2.378, 3.364], duration: 4000 }, // D# sus2
        ],
        melody: [1, 2, 1.414, 2.828, 1.2, 3.364, 1.681, 2.378, 2, 1.414, 2.828, 1, 1.681, 1.2, 2],
        rhythm: [2000, 1000, 3000, 1500, 4000, 2000, 2500, 1250, 3500, 1750, 2000, 3000, 1500, 2500, 4000],
        wave: 'sine' as OscillatorType,
        synthesis: 'infinite',
        structure: 'génesis-evolución-transformación-transcendencia-infinito',
        effects: { reverb: 0.95, delay: 0.8, chorus: 0.9, stereoWidth: 1.0 },
        envelope: { attack: 3.0, decay: 2.0, sustain: 0.95, release: 4.0 },
        description: "Arte infinito - Texturas etéreas que trascienden el tiempo, la creatividad sin límites del colectivo"
      }
    ];
    
    return professionalTracks[trackId % professionalTracks.length];
  }

  private calculateTrackDuration(pattern: any): number {
    const melodyLength = pattern.melody.length;
    const avgRhythm = pattern.rhythm.reduce((sum: number, duration: number) => sum + duration, 0) / pattern.rhythm.length;
    const cycles = Math.ceil(180000 / (melodyLength * avgRhythm)); // Duración objetivo: ~3 minutos
    return (melodyLength * avgRhythm * cycles) / 1000;
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

    this.applyTrackParameters(this.currentPattern);
    this.playProfessionalPattern();
    this.startProgressTracking();
  }

  private applyTrackParameters(pattern: any) {
    if (!this.audioContext) return;
    
    const time = this.audioContext.currentTime;
    
    if (pattern.effects) {
      Object.entries(pattern.effects).forEach(([param, value]) => {
        this.setParameter(param, value as number);
      });
    }
    
    if (pattern.envelope) {
      Object.entries(pattern.envelope).forEach(([param, value]) => {
        this.parameters[param as keyof typeof this.parameters] = value as number;
      });
    }
  }

  private playProfessionalPattern() {
    if (!this.isPlaying || !this.currentPattern || !this.audioContext) return;

    const { melody, rhythm, chords, wave, synthesis } = this.currentPattern;
    let melodyIndex = 0;
    let chordIndex = 0;
    let nextChordTime = 0;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const currentTime = Date.now() - this.startTime;
      
      // Reproducir acorde si es tiempo
      if (currentTime >= nextChordTime && chords) {
        const chord = chords[chordIndex % chords.length];
        this.playChord(chord.notes, chord.duration, wave, synthesis);
        nextChordTime += chord.duration;
        chordIndex++;
      }

      // Reproducir melodía
      const freq = this.currentPattern.baseFreq * melody[melodyIndex % melody.length];
      const duration = rhythm[melodyIndex % rhythm.length];

      this.playProfessionalNote(freq, duration, wave, synthesis, melodyIndex);

      melodyIndex++;
      this.patternTimeout = setTimeout(playNextNote, duration);
    };

    playNextNote();
  }

  private playChord(notes: number[], duration: number, waveType: OscillatorType, synthesis: string) {
    notes.forEach((noteRatio, index) => {
      setTimeout(() => {
        const freq = this.currentPattern.baseFreq * noteRatio;
        this.playProfessionalNote(freq, duration, waveType, synthesis, index, 0.3);
      }, index * 50); // Slight arpeggio effect
    });
  }

  private playProfessionalNote(
    frequency: number, 
    duration: number, 
    waveType: OscillatorType, 
    synthesis: string, 
    noteIndex: number,
    volumeMultiplier: number = 1.0
  ) {
    if (!this.audioContext || !this.masterGain) return;

    try {
      const voice = this.createProfessionalVoice(frequency, waveType, noteIndex, volumeMultiplier);
      voice.play(duration, synthesis);
      
      setTimeout(() => {
        const index = this.voices.indexOf(voice);
        if (index > -1) {
          voice.stop();
          this.voices.splice(index, 1);
        }
      }, duration + 2000);
      
    } catch (error) {
      console.warn('Error playing professional note:', error);
    }
  }

  private createProfessionalVoice(
    frequency: number, 
    waveType: OscillatorType, 
    noteIndex: number,
    volumeMultiplier: number
  ): Voice {
    if (!this.audioContext) throw new Error('AudioContext not initialized');
    
    const voice = new ProfessionalVoice(
      this.audioContext, 
      this.masterGain!, 
      frequency, 
      waveType, 
      noteIndex,
      this.parameters,
      volumeMultiplier
    );
    this.voices.push(voice);
    return voice;
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
      this.playProfessionalPattern();
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
      
      this.playProfessionalPattern();
    } else {
      this.pausedTime = targetTime;
    }
  }

  getAnalyserData(): Uint8Array {
    if (!this.analyser) return new Uint8Array(0);
    
    const bufferLength = this.analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    this.analyser.getByteFrequencyData(dataArray);
    
    return dataArray;
  }
}

// Clase Voice profesional para síntesis avanzada
class ProfessionalVoice {
  private audioContext: AudioContext;
  private masterGain: GainNode;
  private oscillators: OscillatorNode[] = [];
  private gainNodes: GainNode[] = [];
  private filters: BiquadFilterNode[] = [];
  private frequency: number;
  private waveType: OscillatorType;
  private noteIndex: number;
  private parameters: any;
  private volumeMultiplier: number;

  constructor(
    audioContext: AudioContext, 
    masterGain: GainNode, 
    frequency: number, 
    waveType: OscillatorType, 
    noteIndex: number,
    parameters: any,
    volumeMultiplier: number = 1.0
  ) {
    this.audioContext = audioContext;
    this.masterGain = masterGain;
    this.frequency = frequency;
    this.waveType = waveType;
    this.noteIndex = noteIndex;
    this.parameters = parameters;
    this.volumeMultiplier = volumeMultiplier;
  }

  play(duration: number, synthesis: string) {
    const time = this.audioContext.currentTime;
    
    switch (synthesis) {
      case 'cinematic':
        this.playCinematicSynthesis(duration, time);
        break;
      case 'progressive':
        this.playProgressiveSynthesis(duration, time);
        break;
      case 'orchestral':
        this.playOrchestralSynthesis(duration, time);
        break;
      case 'granular':
        this.playGranularSynthesis(duration, time);
        break;
      case 'glitch':
        this.playGlitchSynthesis(duration, time);
        break;
      case 'fusion':
        this.playFusionSynthesis(duration, time);
        break;
      case 'industrial':
        this.playIndustrialSynthesis(duration, time);
        break;
      case 'tropical':
        this.playTropicalSynthesis(duration, time);
        break;
      case 'latin':
        this.playLatinSynthesis(duration, time);
        break;
      case 'cosmic':
        this.playCosmicSynthesis(duration, time);
        break;
      case 'folk':
        this.playFolkSynthesis(duration, time);
        break;
      case 'classical':
        this.playClassicalSynthesis(duration, time);
        break;
      case 'urban':
        this.playUrbanSynthesis(duration, time);
        break;
      case 'afro':
        this.playAfroSynthesis(duration, time);
        break;
      case 'matrix':
        this.playMatrixSynthesis(duration, time);
        break;
      case 'infinite':
        this.playInfiniteSynthesis(duration, time);
        break;
      default:
        this.playAdvancedSynthesis(duration, time);
    }
  }

  private playCinematicSynthesis(duration: number, time: number) {
    // Síntesis cinematográfica con capas de texturas
    const layers = 4;
    
    for (let i = 0; i < layers; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      const panner = this.audioContext.createStereoPanner();
      
      osc.type = i % 2 === 0 ? 'sawtooth' : 'triangle';
      osc.frequency.setValueAtTime(this.frequency * (1 + i * 0.01), time);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.frequency * (8 - i), time);
      filter.Q.setValueAtTime(2 + i, time);
      
      panner.pan.setValueAtTime((i - layers/2) * 0.3, time);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
      
      gain.gain.setValueAtTime(0.15 / layers * this.volumeMultiplier, time);
      this.applyAdvancedEnvelope(gain, duration, time, i * 0.1);
      
      osc.start(time);
      osc.stop(time + duration / 1000);
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
      this.filters.push(filter);
    }
  }

  private playProgressiveSynthesis(duration: number, time: number) {
    // Síntesis progresiva con modulación compleja
    const mainOsc = this.audioContext.createOscillator();
    const modOsc = this.audioContext.createOscillator();
    const mainGain = this.audioContext.createGain();
    const modGain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    mainOsc.type = 'sawtooth';
    modOsc.type = 'sine';
    
    mainOsc.frequency.setValueAtTime(this.frequency, time);
    modOsc.frequency.setValueAtTime(this.frequency * 0.25, time);
    
    modGain.gain.setValueAtTime(this.frequency * 0.1, time);
    
    filter.type = 'bandpass';
    filter.frequency.setValueAtTime(this.frequency * 4, time);
    filter.frequency.exponentialRampToValueAtTime(this.frequency * 12, time + duration / 2000);
    filter.Q.setValueAtTime(8, time);
    
    modOsc.connect(modGain);
    modGain.connect(mainOsc.frequency);
    
    mainOsc.connect(filter);
    filter.connect(mainGain);
    mainGain.connect(this.masterGain);
    
    this.applyAdvancedEnvelope(mainGain, duration, time);
    
    mainOsc.start(time);
    modOsc.start(time);
    mainOsc.stop(time + duration / 1000);
    modOsc.stop(time + duration / 1000);
    
    this.oscillators.push(mainOsc, modOsc);
    this.gainNodes.push(mainGain, modGain);
    this.filters.push(filter);
  }

  private playOrchestralSynthesis(duration: number, time: number) {
    // Síntesis orquestal con armónicos ricos
    const harmonics = [1, 2, 3, 4, 5, 6, 8, 10];
    
    harmonics.forEach((harmonic, index) => {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(this.frequency * harmonic, time);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.frequency * harmonic * 2, time);
      
      const amplitude = 1 / (harmonic * harmonic) * this.volumeMultiplier;
      gain.gain.setValueAtTime(amplitude * 0.1, time);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(this.masterGain);
      
      this.applyAdvancedEnvelope(gain, duration, time, index * 0.05);
      
      osc.start(time);
      osc.stop(time + duration / 1000);
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain);
      this.filters.push(filter);
    });
  }

  private playGranularSynthesis(duration: number, time: number) {
    // Síntesis granular avanzada
    const grains = 12;
    const grainDuration = duration / 1000 / grains;
    
    for (let i = 0; i < grains; i++) {
      setTimeout(() => {
        if (this.audioContext) {
          const grain = this.audioContext.createOscillator();
          const grainGain = this.audioContext.createGain();
          const grainFilter = this.audioContext.createBiquadFilter();
          const panner = this.audioContext.createStereoPanner();
          
          const freqVariation = 1 + (Math.random() - 0.5) * 0.15;
          grain.type = 'sine';
          grain.frequency.setValueAtTime(this.frequency * freqVariation, this.audioContext.currentTime);
          
          grainFilter.type = 'bandpass';
          grainFilter.frequency.setValueAtTime(this.frequency * freqVariation * 3, this.audioContext.currentTime);
          grainFilter.Q.setValueAtTime(5, this.audioContext.currentTime);
          
          panner.pan.setValueAtTime((Math.random() - 0.5) * 0.8, this.audioContext.currentTime);
          
          grain.connect(grainFilter);
          grainFilter.connect(grainGain);
          grainGain.connect(panner);
          panner.connect(this.masterGain);
          
          grainGain.gain.setValueAtTime(0, this.audioContext.currentTime);
          grainGain.gain.linearRampToValueAtTime(0.05 * this.volumeMultiplier, this.audioContext.currentTime + grainDuration * 0.2);
          grainGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + grainDuration);
          
          grain.start(this.audioContext.currentTime);
          grain.stop(this.audioContext.currentTime + grainDuration);
          
          this.oscillators.push(grain);
          this.gainNodes.push(grainGain);
          this.filters.push(grainFilter);
        }
      }, i * grainDuration * 1000);
    }
  }

  private playInfiniteSynthesis(duration: number, time: number) {
    // Síntesis infinita con evolución continua
    const layers = 6;
    
    for (let i = 0; i < layers; i++) {
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      const filter = this.audioContext.createBiquadFilter();
      const delay = this.audioContext.createDelay(2);
      const delayGain = this.audioContext.createGain();
      const panner = this.audioContext.createStereoPanner();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(this.frequency * Math.pow(2, i/12), time);
      
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(this.frequency * (20 - i*2), time);
      filter.frequency.exponentialRampToValueAtTime(this.frequency * (5 + i), time + duration / 1000);
      
      delay.delayTime.setValueAtTime(0.5 + i * 0.2, time);
      delayGain.gain.setValueAtTime(0.3, time);
      
      panner.pan.setValueAtTime(Math.sin(i * Math.PI / 3) * 0.7, time);
      
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(panner);
      panner.connect(this.masterGain);
      
      // Crear bucle de delay
      gain.connect(delay);
      delay.connect(delayGain);
      delayGain.connect(gain);
      
      gain.gain.setValueAtTime(0.08 / layers * this.volumeMultiplier, time);
      this.applyInfiniteEnvelope(gain, duration, time, i);
      
      osc.start(time);
      osc.stop(time + duration / 1000);
      
      this.oscillators.push(osc);
      this.gainNodes.push(gain, delayGain);
      this.filters.push(filter);
    }
  }

  // Implementar otros tipos de síntesis...
  private playAdvancedSynthesis(duration: number, time: number) {
    const osc = this.audioContext.createOscillator();
    const gain = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    osc.type = this.waveType;
    osc.frequency.setValueAtTime(this.frequency, time);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(this.frequency * 8, time);
    filter.Q.setValueAtTime(2, time);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.masterGain);
    
    this.applyAdvancedEnvelope(gain, duration, time);
    
    osc.start(time);
    osc.stop(time + duration / 1000);
    
    this.oscillators.push(osc);
    this.gainNodes.push(gain);
    this.filters.push(filter);
  }

  private applyAdvancedEnvelope(gain: GainNode, duration: number, time: number, delay: number = 0) {
    const durationSec = duration / 1000;
    const attack = this.parameters.attack + delay;
    const decay = this.parameters.decay;
    const sustain = this.parameters.sustain;
    const release = this.parameters.release;
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(this.volumeMultiplier, time + attack);
    gain.gain.exponentialRampToValueAtTime(sustain * this.volumeMultiplier, time + attack + decay);
    gain.gain.setValueAtTime(sustain * this.volumeMultiplier, time + durationSec - release);
    gain.gain.linearRampToValueAtTime(0, time + durationSec);
  }

  private applyInfiniteEnvelope(gain: GainNode, duration: number, time: number, layer: number) {
    const durationSec = duration / 1000;
    const fadeIn = durationSec * 0.3;
    const fadeOut = durationSec * 0.3;
    const peakLevel = this.volumeMultiplier * (1 - layer * 0.1);
    
    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(peakLevel, time + fadeIn);
    gain.gain.setValueAtTime(peakLevel, time + durationSec - fadeOut);
    gain.gain.linearRampToValueAtTime(0, time + durationSec);
  }

  // Implementar métodos para otros tipos de síntesis (tropical, latin, cosmic, etc.)
  private playTropicalSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playLatinSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playCosmicSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playFolkSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playClassicalSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playUrbanSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playAfroSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playMatrixSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playGlitchSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playFusionSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  private playIndustrialSynthesis(duration: number, time: number) {
    this.playAdvancedSynthesis(duration, time);
  }

  stop() {
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscillator already stopped
      }
    });
    
    this.oscillators = [];
    this.gainNodes = [];
    this.filters = [];
  }
}

// Interfaces para compatibilidad
interface Voice {
  play(duration: number, synthesis?: string): void;
  stop(): void;
}
