import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, RotateCcw, Shuffle, SkipBack, SkipForward, Music, Zap, Settings, X } from 'lucide-react';

// Clase para síntesis de audio MIDI
class MIDISynthesizer {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;
  private currentFrequency = 440;

  constructor() {
    this.initAudio();
  }

  private async initAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
    } catch (error) {
      console.warn('Web Audio API no disponible:', error);
    }
  }

  setVolume(volume: number) {
    if (this.gainNode && this.audioContext) {
      this.gainNode.gain.setValueAtTime(volume / 100 * 0.3, this.audioContext.currentTime);
    }
  }

  playTrack(trackId: number) {
    if (!this.audioContext || !this.gainNode) return;

    this.stopTrack();
    this.isPlaying = true;

    // Diferentes patrones musicales según el track
    const patterns = this.getTrackPattern(trackId);
    this.playPattern(patterns);
  }

  private getTrackPattern(trackId: number) {
    const patterns = [
      // 1. Retro Arte - Arte Retro nostálgico 80s (Escala Mayor C)
      { 
        frequencies: [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50, 1318.51], 
        rhythm: [800, 400, 600, 300, 500, 250, 700, 350], 
        waveType: 'triangle' as OscillatorType, 
        chords: true 
      },
      
      // 2. Neon Nights '85 - 80s Synthwave puro (Escala Pentatónica Am)
      { 
        frequencies: [220.00, 261.63, 329.63, 440.00, 523.25, 659.25, 880.00, 1046.50], 
        rhythm: [500, 250, 750, 250, 500, 375, 625, 125], 
        waveType: 'sawtooth' as OscillatorType, 
        chords: true 
      },
      
      // 3. Digital Renaissance - 90s Electronica (Escala Dórica D)
      { 
        frequencies: [293.66, 329.63, 369.99, 440.00, 493.88, 554.37, 622.25, 739.99], 
        rhythm: [400, 200, 600, 300, 350, 150, 550, 250], 
        waveType: 'square' as OscillatorType, 
        chords: false 
      },
      
      // 4. Quantum Dreams - Futurista (Escala Menor Harmónica F#)
      { 
        frequencies: [185.00, 207.65, 246.94, 277.18, 311.13, 369.99, 415.30, 554.37], 
        rhythm: [1000, 500, 800, 400, 600, 300, 900, 450], 
        waveType: 'sine' as OscillatorType, 
        chords: true 
      },
      
      // 5. Underground Pulse - Techno (Escala Frigia E)
      { 
        frequencies: [164.81, 174.61, 196.00, 220.00, 246.94, 261.63, 293.66, 329.63], 
        rhythm: [250, 125, 500, 125, 250, 125, 375, 250], 
        waveType: 'sawtooth' as OscillatorType, 
        chords: false 
      },
      
      // 6. Deep House Vibes - House profundo (Escala Blues G)
      { 
        frequencies: [196.00, 220.00, 233.08, 261.63, 293.66, 311.13, 369.99, 392.00], 
        rhythm: [750, 375, 500, 250, 625, 125, 875, 500], 
        waveType: 'triangle' as OscillatorType, 
        chords: true 
      },
      
      // 7. Café Midnight - Lounge nocturno (Escala Jazz Bb)
      { 
        frequencies: [233.08, 261.63, 293.66, 349.23, 392.00, 440.00, 493.88, 554.37], 
        rhythm: [1500, 750, 1200, 600, 1000, 500, 1800, 900], 
        waveType: 'sine' as OscillatorType, 
        chords: true 
      },
      
      // 8. Cartagena Sunset - Colombiana caribeña (Escala Mixolidia G)
      { 
        frequencies: [196.00, 220.00, 246.94, 261.63, 293.66, 329.63, 349.23, 392.00], 
        rhythm: [500, 250, 375, 125, 625, 250, 500, 375], 
        waveType: 'triangle' as OscillatorType, 
        chords: true 
      },
      
      // 9. Salsa Futurista - Tropical Future (Escala Salsa A)
      { 
        frequencies: [220.00, 246.94, 277.18, 329.63, 369.99, 415.30, 493.88, 554.37], 
        rhythm: [375, 125, 250, 125, 500, 250, 375, 125], 
        waveType: 'sawtooth' as OscillatorType, 
        chords: true 
      },
      
      // 10. Cumbia Espacial - Space Cumbia (Escala Andina C)
      { 
        frequencies: [261.63, 293.66, 329.63, 392.00, 440.00, 523.25, 587.33, 659.25], 
        rhythm: [800, 400, 600, 200, 1000, 300, 700, 350], 
        waveType: 'triangle' as OscillatorType, 
        chords: true 
      },
      
      // 11. Vallenato Cyber - Cyber Folk (Escala Vallenato E)
      { 
        frequencies: [164.81, 185.00, 207.65, 246.94, 277.18, 329.63, 369.99, 415.30], 
        rhythm: [1200, 600, 800, 400, 1000, 500, 900, 450], 
        waveType: 'sine' as OscillatorType, 
        chords: true 
      },
      
      // 12. Bambuco Digital - Folk Electronic (Escala Bambuco D)
      { 
        frequencies: [293.66, 329.63, 369.99, 415.30, 440.00, 493.88, 554.37, 587.33], 
        rhythm: [1500, 750, 1000, 500, 1250, 625, 1750, 875], 
        waveType: 'triangle' as OscillatorType, 
        chords: true 
      },
      
      // 13. Reggaeton 2050 - Future Reggaeton (Escala Reggaeton Fm)
      { 
        frequencies: [174.61, 196.00, 207.65, 233.08, 261.63, 293.66, 311.13, 349.23], 
        rhythm: [500, 250, 250, 125, 750, 250, 500, 125], 
        waveType: 'square' as OscillatorType, 
        chords: false 
      },
      
      // 14. Champeta Galáctica - Space Champeta (Escala Afro Bb)
      { 
        frequencies: [233.08, 261.63, 277.18, 311.13, 349.23, 392.00, 415.30, 466.16], 
        rhythm: [375, 125, 250, 125, 500, 250, 375, 125], 
        waveType: 'sawtooth' as OscillatorType, 
        chords: true 
      },
      
      // 15. Tropical Matrix - Tropical Cyber (Escala Tropical F)
      { 
        frequencies: [174.61, 196.00, 220.00, 261.63, 293.66, 329.63, 392.00, 440.00], 
        rhythm: [600, 300, 450, 150, 750, 375, 525, 225], 
        waveType: 'triangle' as OscillatorType, 
        chords: true 
      },
      
      // 16. Arte Infinito - Ambient Art infinito (Escala Etérea C)
      { 
        frequencies: [130.81, 146.83, 164.81, 185.00, 207.65, 233.08, 261.63, 293.66], 
        rhythm: [3000, 2000, 2500, 1500, 4000, 2500, 3500, 2000], 
        waveType: 'sine' as OscillatorType, 
        chords: true 
      }
    ];
    
    return patterns[trackId % patterns.length];
  }

  private playPattern(pattern: { frequencies: number[], rhythm: number[], waveType: OscillatorType, chords?: boolean }) {
    if (!this.audioContext || !this.gainNode || !this.isPlaying) return;

    let index = 0;
    const playNext = () => {
      if (!this.isPlaying || !this.audioContext || !this.gainNode) return;

      const baseFrequency = pattern.frequencies[index % pattern.frequencies.length];
      const duration = pattern.rhythm[index % pattern.rhythm.length];

      if (pattern.chords && index % 2 === 0) {
        // Tocar acorde (fundamental + tercera + quinta)
        this.playChord([baseFrequency, baseFrequency * 1.25, baseFrequency * 1.5], duration, pattern.waveType);
      } else {
        // Tocar nota individual con harmonics
        this.playNote(baseFrequency, duration, pattern.waveType, true);
      }

      index++;
      
      // Continuar el patrón
      if (this.isPlaying) {
        setTimeout(playNext, duration);
      }
    };

    playNext();
  }

  private playNote(frequency: number, duration: number, waveType: OscillatorType, addHarmonics = false) {
    if (!this.audioContext || !this.gainNode) return;

    // Nota principal
    const oscillator = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    const compressor = this.audioContext.createDynamicsCompressor();
    const delay = this.audioContext.createDelay(0.3);
    const delayGain = this.audioContext.createGain();
    const reverbConvolver = this.audioContext.createConvolver();
    const reverbGain = this.audioContext.createGain();
    
    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    // Filtro dinámico basado en frecuencia
    filter.type = waveType === 'sawtooth' || waveType === 'square' ? 'lowpass' : 'bandpass';
    filter.frequency.setValueAtTime(frequency * (waveType === 'sine' ? 6 : 4), this.audioContext.currentTime);
    filter.Q.setValueAtTime(waveType === 'sine' ? 0.5 : 1.5, this.audioContext.currentTime);
    
    // Configuración de delay (eco)
    delay.delayTime.setValueAtTime(0.125, this.audioContext.currentTime); // 1/8 beat delay
    delayGain.gain.setValueAtTime(0.2, this.audioContext.currentTime);
    
    // Configuración de reverb simple
    reverbGain.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    this.createSimpleReverb(reverbConvolver);
    
    // Compresor para mejor dinámica
    compressor.threshold.setValueAtTime(-24, this.audioContext.currentTime);
    compressor.knee.setValueAtTime(30, this.audioContext.currentTime);
    compressor.ratio.setValueAtTime(12, this.audioContext.currentTime);
    compressor.attack.setValueAtTime(0.003, this.audioContext.currentTime);
    compressor.release.setValueAtTime(0.25, this.audioContext.currentTime);
    
    // Cadena de efectos: oscillator -> filter -> envelope -> compressor -> [delay, reverb] -> gainNode
    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(compressor);
    
    // Señal directa
    compressor.connect(this.gainNode);
    
    // Señal con delay
    compressor.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(delay); // Feedback
    delayGain.connect(this.gainNode);
    
    // Señal con reverb
    compressor.connect(reverbConvolver);
    reverbConvolver.connect(reverbGain);
    reverbGain.connect(this.gainNode);
    
    // Envelope ADSR dinámico basado en el tipo de onda
    const attackTime = waveType === 'sine' ? 0.05 : 0.02;
    const releaseTime = waveType === 'sine' ? 0.4 : 0.1;
    const sustainLevel = waveType === 'triangle' ? 0.12 : 0.08;
    
    envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(0.18, this.audioContext.currentTime + attackTime);
    envelope.gain.exponentialRampToValueAtTime(sustainLevel, this.audioContext.currentTime + duration / 1000 * 0.3);
    envelope.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000 * (1 - releaseTime));

    // Modulación de frecuencia sutil para más expresividad
    if (waveType === 'sawtooth' || waveType === 'square') {
      const lfo = this.audioContext.createOscillator();
      const lfoGain = this.audioContext.createGain();
      
      lfo.type = 'sine';
      lfo.frequency.setValueAtTime(5.5, this.audioContext.currentTime); // 5.5 Hz LFO
      lfoGain.gain.setValueAtTime(frequency * 0.01, this.audioContext.currentTime); // 1% de modulación
      
      lfo.connect(lfoGain);
      lfoGain.connect(oscillator.frequency);
      
      lfo.start(this.audioContext.currentTime);
      lfo.stop(this.audioContext.currentTime + duration / 1000);
      this.oscillators.push(lfo);
    }

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
    this.oscillators.push(oscillator);

    // Agregar harmónicos más ricos
    if (addHarmonics && Math.random() > 0.6) {
      const harmonics = [2, 3, 5]; // 2da, 3ra y 5ta armónica
      
      harmonics.forEach((harmRatio, index) => {
        const harmonic = this.audioContext.createOscillator();
        const harmonicGain = this.audioContext.createGain();
        const harmonicFilter = this.audioContext.createBiquadFilter();
        
        harmonic.type = 'sine';
        harmonic.frequency.setValueAtTime(frequency * harmRatio, this.audioContext.currentTime);
        
        harmonicFilter.type = 'lowpass';
        harmonicFilter.frequency.setValueAtTime(frequency * harmRatio * 2, this.audioContext.currentTime);
        
        const harmonicLevel = 0.05 / (index + 1); // Nivel decreciente
        harmonicGain.gain.setValueAtTime(0, this.audioContext.currentTime);
        harmonicGain.gain.linearRampToValueAtTime(harmonicLevel, this.audioContext.currentTime + 0.01);
        harmonicGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000 * 0.7);
        
        harmonic.connect(harmonicFilter);
        harmonicFilter.connect(harmonicGain);
        harmonicGain.connect(this.gainNode);
        
        harmonic.start(this.audioContext.currentTime);
        harmonic.stop(this.audioContext.currentTime + duration / 1000 * 0.7);
        this.oscillators.push(harmonic);
      });
    }

    // Limpiar osciladores terminados
    oscillator.onended = () => {
      const oscIndex = this.oscillators.indexOf(oscillator);
      if (oscIndex > -1) {
        this.oscillators.splice(oscIndex, 1);
      }
    };
  }

  // Crear un reverb simple usando convolución
  private createSimpleReverb(convolver: ConvolverNode) {
    if (!this.audioContext) return;
    
    const sampleRate = this.audioContext.sampleRate;
    const length = sampleRate * 2; // 2 segundos de reverb
    const impulse = this.audioContext.createBuffer(2, length, sampleRate);
    
    for (let channel = 0; channel < 2; channel++) {
      const channelData = impulse.getChannelData(channel);
      for (let i = 0; i < length; i++) {
        const decay = Math.pow(1 - i / length, 2);
        channelData[i] = (Math.random() * 2 - 1) * decay * 0.5;
      }
    }
    
    convolver.buffer = impulse;
  }

  private playChord(frequencies: number[], duration: number, waveType: OscillatorType) {
    frequencies.forEach((freq, i) => {
      setTimeout(() => {
        this.playNote(freq, duration * 0.8, waveType, false);
      }, i * 10); // Pequeño delay entre notas del acorde
    });
  }

  stopTrack() {
    this.isPlaying = false;
    this.oscillators.forEach(osc => {
      try {
        osc.stop();
      } catch (e) {
        // Oscilador ya detenido
      }
    });
    this.oscillators = [];
  }

  pause() {
    this.isPlaying = false;
  }

  resume() {
    // Para resumir necesitaríamos guardar el estado, por simplicidad reiniciamos
    this.isPlaying = true;
  }
}

interface Track {
  id: number;
  name: string;
  genre: string;
  bpm: number;
  duration: string;
  color: string;
  description: string;
}

const ReproductorMIDI = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(70);
  const [progress, setProgress] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [visualMode, setVisualMode] = useState(0);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(0); // 0: no repeat, 1: repeat one, 2: repeat all
  const [audioInitialized, setAudioInitialized] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [bass, setBass] = useState(50);
  const [treble, setTreble] = useState(50);
  const [tempo, setTempo] = useState(100); // % of original tempo
  const [showPlaylist, setShowPlaylist] = useState(true);
  const [waveform, setWaveform] = useState<{height: number, delay: number}[]>([]);
  const progressRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<MIDISynthesizer | null>(null);

  // NÚCLEO COLECTIVO - Immersive Sound Collection (16 Tracks) 🎵
  const tracks: Track[] = [
    { id: 1, name: "Retro Arte", genre: "Arte Retro", bpm: 115, duration: "4:45", color: "from-orange-500 to-pink-600", description: "🎨 Nostalgia creativa de los 80s" },
    { id: 2, name: "Neon Nights '85", genre: "80s Synthwave", bpm: 120, duration: "5:12", color: "from-purple-500 to-cyan-600", description: "🌃 Noches de neón puro 80s" },
    { id: 3, name: "Digital Renaissance", genre: "90s Electronica", bpm: 128, duration: "4:28", color: "from-blue-500 to-green-600", description: "💿 Renacimiento digital de los 90s" },
    { id: 4, name: "Quantum Dreams", genre: "Futurista", bpm: 140, duration: "5:33", color: "from-indigo-500 to-purple-600", description: "🚀 Sueños cuánticos del futuro" },
    { id: 5, name: "Underground Pulse", genre: "Techno", bpm: 135, duration: "6:15", color: "from-gray-500 to-red-600", description: "🔊 Pulso techno underground" },
    { id: 6, name: "Deep House Vibes", genre: "House", bpm: 125, duration: "5:44", color: "from-teal-500 to-blue-600", description: "🏠 Vibraciones house profundas" },
    { id: 7, name: "Café Midnight", genre: "Lounge", bpm: 95, duration: "4:52", color: "from-amber-500 to-brown-600", description: "☕ Ambiente lounge nocturno" },
    { id: 8, name: "Cartagena Sunset", genre: "Colombiana", bpm: 110, duration: "4:18", color: "from-yellow-500 to-red-600", description: "🇨🇴 Atardecer caribeño" },
    { id: 9, name: "Salsa Futurista", genre: "Tropical Future", bpm: 105, duration: "4:35", color: "from-green-500 to-yellow-600", description: "🌴 Salsa del futuro" },
    { id: 10, name: "Cumbia Espacial", genre: "Space Cumbia", bpm: 100, duration: "5:02", color: "from-lime-500 to-cyan-600", description: "🛸 Cumbia intergaláctica" },
    { id: 11, name: "Vallenato Cyber", genre: "Cyber Folk", bpm: 90, duration: "4:41", color: "from-emerald-500 to-blue-600", description: "🎵 Vallenato cibernético" },
    { id: 12, name: "Bambuco Digital", genre: "Folk Electronic", bpm: 85, duration: "5:18", color: "from-rose-500 to-pink-600", description: "🎼 Bambuco electrónico" },
    { id: 13, name: "Reggaeton 2050", genre: "Future Reggaeton", bpm: 95, duration: "3:55", color: "from-purple-500 to-red-600", description: "🔥 Reggaeton del futuro" },
    { id: 14, name: "Champeta Galáctica", genre: "Space Champeta", bpm: 115, duration: "4:22", color: "from-orange-500 to-purple-600", description: "🌌 Champeta espacial" },
    { id: 15, name: "Tropical Matrix", genre: "Tropical Cyber", bpm: 108, duration: "4:47", color: "from-cyan-500 to-green-600", description: "🏝️ Matrix tropical" },
    { id: 16, name: "Arte Infinito", genre: "Ambient Art", bpm: 75, duration: "∞", color: "from-violet-500 via-purple-500 to-indigo-500", description: "♾️ Loop artístico infinito" }
  ];

  // Inicializar sintetizador
  useEffect(() => {
    synthRef.current = new MIDISynthesizer();
    return () => {
      if (synthRef.current) {
        synthRef.current.stopTrack();
      }
    };
  }, []);

  // Función para inicializar audio (requerido por políticas del navegador)
  const initializeAudio = async () => {
    if (synthRef.current && synthRef.current['audioContext']) {
      try {
        await synthRef.current['audioContext'].resume();
        setAudioInitialized(true);
      } catch (error) {
        console.warn('Error al inicializar audio:', error);
      }
    }
  };

  // Actualizar volumen del sintetizador
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.setVolume(volume);
    }
  }, [volume]);

  // Generador de ondas visuales animadas
  useEffect(() => {
    const generateWaveform = () => {
      const bars = 24; // Número de barras del visualizador
      const newWaveform = Array.from({ length: bars }, (_, index) => {
        const baseHeight = isPlaying ? 10 + Math.random() * 70 : 5;
        const trackModifier = (currentTrack + 1) * 0.1;
        const positionModifier = Math.sin((index / bars) * Math.PI * 2) * 0.3;
        const tempoModifier = (tempo / 100) * 0.5;
        
        // Diferentes patrones según el género
        let genreModifier = 1;
        const genre = tracks[currentTrack]?.genre.toLowerCase() || '';
        
        if (genre.includes('techno') || genre.includes('house')) {
          genreModifier = 1.5 + Math.sin(Date.now() * 0.01) * 0.5;
        } else if (genre.includes('lounge') || genre.includes('ambient')) {
          genreModifier = 0.6 + Math.sin(Date.now() * 0.005) * 0.2;
        } else if (genre.includes('salsa') || genre.includes('cumbia') || genre.includes('champeta')) {
          genreModifier = 1.2 + Math.sin(Date.now() * 0.008 + index) * 0.4;
        } else if (genre.includes('reggaeton')) {
          genreModifier = 1.3 + (index % 4 === 0 ? 0.5 : 0.2);
        }
        
        return {
          height: Math.max(5, Math.min(95, 
            baseHeight * genreModifier * (1 + trackModifier + positionModifier + tempoModifier)
          )),
          delay: index * 0.02
        };
      });
      
      setWaveform(newWaveform);
    };

    // Actualizar visualizador más frecuentemente cuando esté reproduciendo
    const interval = setInterval(generateWaveform, isPlaying ? 150 : 500);
    generateWaveform(); // Inicializar inmediatamente
    
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, tempo, tracks]);

  // Simulación de progreso y auto-next con repeat
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      const speedMultiplier = tempo / 100;
      const intervalTime = Math.max(50, 150 / speedMultiplier);
      
      interval = setInterval(() => {
        setProgress(prev => {
          if (prev >= 100) {
            // Lógica de repetición
            if (repeat === 1) {
              // Repetir el track actual
              return 0;
            } else if (repeat === 2 || (!shuffle && currentTrack < tracks.length - 1) || shuffle) {
              // Continuar con el siguiente track
              handleNextTrack();
              return 0;
            } else {
              // Detener al final de la playlist
              handleStop();
              return 0;
            }
          }
          return prev + (0.3 * speedMultiplier);
        });
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentTrack, repeat, shuffle, tempo]);

  const handlePlay = async () => {
    if (!synthRef.current) return;

    // Inicializar audio si no está inicializado
    if (!audioInitialized) {
      await initializeAudio();
    }

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      // Resumir audio context si está suspendido
      if (synthRef.current['audioContext']?.state === 'suspended') {
        await synthRef.current['audioContext'].resume();
      }
      synthRef.current.playTrack(currentTrack);
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.stopTrack();
    }
    setIsPlaying(false);
    setProgress(0);
  };

  const handleNextTrack = () => {
    if (synthRef.current) {
      synthRef.current.stopTrack();
    }
    
    let nextTrack;
    if (shuffle) {
      nextTrack = Math.floor(Math.random() * tracks.length);
    } else {
      nextTrack = (currentTrack + 1) % tracks.length;
    }
    
    setCurrentTrack(nextTrack);
    setProgress(0);
    
    if (isPlaying && synthRef.current) {
      setTimeout(() => {
        synthRef.current?.playTrack(nextTrack);
      }, 100);
    }
  };

  const handlePrevTrack = () => {
    if (synthRef.current) {
      synthRef.current.stopTrack();
    }
    
    let prevTrack;
    if (shuffle) {
      prevTrack = Math.floor(Math.random() * tracks.length);
    } else {
      prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    }
    
    setCurrentTrack(prevTrack);
    setProgress(0);
    
    if (isPlaying && synthRef.current) {
      setTimeout(() => {
        synthRef.current?.playTrack(prevTrack);
      }, 100);
    }
  };

  const currentTrackData = tracks[currentTrack];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      {/* Botón flotante compacto */}
      {!isExpanded && (
        <button
          onClick={async () => {
            if (!audioInitialized) {
              await initializeAudio();
            }
            setIsExpanded(true);
          }}
          className={`relative group flex items-center space-x-3 bg-black/90 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 shadow-xl hover:shadow-purple-500/20 ${
            isPlaying ? 'animate-pulse' : ''
          }`}
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentTrackData.color} flex items-center justify-center ${isPlaying ? 'animate-spin' : ''} transition-transform group-hover:scale-110`}>
            {isPlaying ? (
              <Pause className="w-6 h-6 text-white" />
            ) : (
              <Play className="w-6 h-6 text-white" />
            )}
          </div>
          
          <div className="text-left flex-1 min-w-0">
            <div className="text-white font-bold text-sm truncate">{currentTrackData.name}</div>
            <div className="text-cyan-400 text-xs truncate">{currentTrackData.genre}</div>
            <div className="text-gray-400 text-xs">
              {audioInitialized ? 'MIDI Ready' : 'Click to Activate'}
            </div>
          </div>
          
          <div className="flex flex-col items-center">
            <Settings className="w-4 h-4 text-gray-400 group-hover:text-white transition-colors" />
            <div className="text-xs text-gray-500 mt-1">{currentTrack + 1}/{tracks.length}</div>
          </div>
        </button>
      )}

      {/* Reproductor expandido */}
      {isExpanded && (
        <div className={`bg-black/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden transition-all duration-300 ${
          isFullscreen ? 'fixed inset-4 w-auto max-w-6xl mx-auto fullscreen-glow wave-bg' : 'w-96 midi-glow'
        } ${isPlaying ? 'midi-pulse' : ''}`}>
          {/* Header con controles avanzados */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
            <div className="flex items-center space-x-4">
              <div className="flex space-x-1">
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="w-3 h-3 bg-red-500 rounded-full hover:bg-red-400 transition-colors"
                ></button>
                <button 
                  onClick={() => setIsExpanded(false)}
                  className="w-3 h-3 bg-yellow-500 rounded-full hover:bg-yellow-400 transition-colors"
                ></button>
                <button 
                  onClick={() => setIsFullscreen(!isFullscreen)}
                  className="w-3 h-3 bg-green-500 rounded-full hover:bg-green-400 transition-colors"
                ></button>
              </div>
              
              <div className="text-left">
                <span className="text-cyan-400 font-bold text-sm">NÚCLEO SOUND</span>
                <div className="text-yellow-400 font-bold text-xs">Immersive Collection 🎵</div>
              </div>
              
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${audioInitialized ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
                <span className="text-xs text-gray-400">
                  {audioInitialized ? 'CONECTADO' : 'INICIANDO...'}
                </span>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {/* Modo visualización */}
              <button
                onClick={() => setShowPlaylist(!showPlaylist)}
                className={`p-2 rounded-lg transition-colors ${
                  showPlaylist ? 'bg-purple-500/30 text-white' : 'text-gray-400 hover:text-white'
                }`}
                title="Toggle Playlist"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1zM3 16a1 1 0 011-1h6a1 1 0 110 2H4a1 1 0 01-1-1z"/>
                </svg>
              </button>
              
              <button
                onClick={() => setIsExpanded(false)}
                className="text-gray-400 hover:text-white transition-colors p-2"
                title="Cerrar"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Visualizador principal */}
          <div className={`${isFullscreen ? 'p-6 grid grid-cols-2 gap-6' : 'p-4 space-y-4'}`}>
            {/* Track info */}
            <div className="text-center">
              <div className="mb-4">
                {/* Artwork simulado */}
                <div className={`mx-auto rounded-xl bg-gradient-to-br ${currentTrackData.color} p-1 ${isFullscreen ? 'w-32 h-32' : 'w-24 h-24'}`}>
                  <div className="w-full h-full bg-black/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                    <Music className={`text-white ${isFullscreen ? 'w-12 h-12' : 'w-8 h-8'}`} />
                  </div>
                </div>
              </div>
              
              <h3 className={`text-white font-bold ${isFullscreen ? 'text-2xl' : 'text-lg'} mb-2`}>
                {currentTrackData.name}
              </h3>
              <p className={`text-cyan-400 ${isFullscreen ? 'text-base' : 'text-sm'} mb-1`}>
                {currentTrackData.genre} • {Math.round(currentTrackData.bpm * (tempo / 100))} BPM
              </p>
              <p className={`text-yellow-400 ${isFullscreen ? 'text-sm' : 'text-xs'} font-medium mb-2`}>
                Núcleo Colectivo
              </p>
              <p className={`text-gray-400 ${isFullscreen ? 'text-sm' : 'text-xs'} max-w-xs mx-auto`}>
                {currentTrackData.description}
              </p>
              
              {/* Inicializar audio si es necesario */}
              {!audioInitialized && (
                <button
                  onClick={initializeAudio}
                  className="mt-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold hover:from-yellow-400 hover:to-orange-400 transition-all animate-pulse shadow-lg"
                >
                  🔊 Activar Audio MIDI
                </button>
              )}
            </div>

            {/* Visualizador de ondas inmersivo */}
            {isFullscreen ? (
              <div className="space-y-4">
                {/* Visualizador circular en fullscreen */}
                <div className="h-48 bg-black/50 rounded-xl flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent animate-pulse"></div>
                  
                  {/* Círculo central */}
                  <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentTrackData.color} ${isPlaying ? 'animate-pulse' : ''} flex items-center justify-center`}>
                    <Music className="w-8 h-8 text-white" />
                  </div>
                  
                  {/* Ondas circulares */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    {waveform.slice(0, 12).map((wave, index) => {
                      const angle = (index / 12) * 360;
                      const distance = 60 + wave.height * 0.8;
                      const x = Math.cos((angle * Math.PI) / 180) * distance;
                      const y = Math.sin((angle * Math.PI) / 180) * distance;
                      
                      return (
                        <div
                          key={index}
                          className={`absolute w-2 rounded-full bg-gradient-to-t ${currentTrackData.color} transition-all duration-300`}
                          style={{
                            height: `${Math.max(8, wave.height * 0.4)}px`,
                            transform: `translate(${x}px, ${y}px) rotate(${angle}deg)`,
                            animationDelay: `${wave.delay}s`
                          }}
                        />
                      );
                    })}
                  </div>
                  
                  {/* Partículas flotantes */}
                  {isPlaying && (
                    <div className="absolute inset-0">
                      {Array.from({length: 8}).map((_, index) => (
                        <div
                          key={index}
                          className={`absolute w-1 h-1 rounded-full bg-gradient-to-r ${currentTrackData.color} animate-ping`}
                          style={{
                            left: `${20 + Math.random() * 60}%`,
                            top: `${20 + Math.random() * 60}%`,
                            animationDelay: `${Math.random() * 2}s`,
                            animationDuration: `${2 + Math.random() * 2}s`
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Espectrograma horizontal */}
                <div className="h-16 bg-black/50 rounded-lg flex items-end justify-center space-x-1 p-2 overflow-hidden">
                  {waveform.map((wave, index) => (
                    <div
                      key={index}
                      className={`w-3 bg-gradient-to-t ${currentTrackData.color} rounded-t transition-all duration-150 ease-out relative`}
                      style={{
                        height: `${wave.height}%`,
                        animationDelay: `${wave.delay}s`
                      }}
                    >
                      {isPlaying && wave.height > 60 && (
                        <div className={`absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white animate-ping`}></div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              /* Visualizador compacto */
              <div className="h-20 bg-black/50 rounded-lg flex items-end justify-center space-x-1 p-2 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/3 to-transparent animate-pulse"></div>
                {waveform.map((wave, index) => (
                  <div
                    key={index}
                    className={`w-2 bg-gradient-to-t ${currentTrackData.color} rounded-t transition-all duration-150 ease-out relative`}
                    style={{
                      height: `${wave.height}%`,
                      animationDelay: `${wave.delay}s`
                    }}
                  >
                    {isPlaying && wave.height > 70 && (
                      <div className="absolute -top-1 left-1/2 transform -translate-x-1/2 w-1 h-1 rounded-full bg-white/80 animate-ping"></div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Barra de progreso */}
            <div className="space-y-2">
              <div 
                ref={progressRef}
                className="h-2 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  if (progressRef.current) {
                    const rect = progressRef.current.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = (clickX / rect.width) * 100;
                    setProgress(Math.max(0, Math.min(100, percentage)));
                  }
                }}
              >
                <div 
                  className={`h-full bg-gradient-to-r ${currentTrackData.color} transition-all duration-300 relative`}
                  style={{ width: `${progress}%` }}
                >
                  <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full transform translate-x-1/2 -translate-y-1/2 shadow-lg"></div>
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{Math.floor(progress * 2.4 / 100)}:{String(Math.floor((progress * 2.4 % 100) * 0.6)).padStart(2, '0')}</span>
                <span>{currentTrackData.duration}</span>
              </div>
            </div>

            {/* Controles principales */}
            <div className={`flex items-center justify-center ${isFullscreen ? 'space-x-6' : 'space-x-4'}`}>
              <button
                onClick={() => setShuffle(!shuffle)}
                className={`p-3 rounded-full transition-all ${shuffle ? 'text-yellow-400 bg-yellow-400/20 shadow-lg shadow-yellow-400/30' : 'text-gray-400 hover:text-white hover:bg-white/10'}`}
                title="Aleatorio"
              >
                <Shuffle className={`${isFullscreen ? 'w-5 h-5' : 'w-4 h-4'}`} />
              </button>

              <button
                onClick={handlePrevTrack}
                className="text-gray-400 hover:text-white transition-all p-3 rounded-full hover:bg-white/10"
                title="Anterior"
              >
                <SkipBack className={`${isFullscreen ? 'w-6 h-6' : 'w-5 h-5'}`} />
              </button>

              <button
                onClick={handlePlay}
                className={`${isFullscreen ? 'w-16 h-16' : 'w-12 h-12'} rounded-full bg-gradient-to-r ${currentTrackData.color} flex items-center justify-center hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl border-2 border-white/30`}
                title={isPlaying ? "Pausar" : "Reproducir"}
              >
                {isPlaying ? (
                  <Pause className={`text-white ${isFullscreen ? 'w-8 h-8' : 'w-6 h-6'}`} />
                ) : (
                  <Play className={`text-white ${isFullscreen ? 'w-8 h-8 ml-1' : 'w-6 h-6 ml-1'}`} />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="text-gray-400 hover:text-white transition-all p-3 rounded-full hover:bg-white/10"
                title="Siguiente"
              >
                <SkipForward className={`${isFullscreen ? 'w-6 h-6' : 'w-5 h-5'}`} />
              </button>

              <button
                onClick={() => setRepeat((prev) => (prev + 1) % 3)}
                className={`p-3 rounded-full transition-all relative ${
                  repeat === 1 ? 'text-green-400 bg-green-400/20 shadow-lg shadow-green-400/30' : 
                  repeat === 2 ? 'text-blue-400 bg-blue-400/20 shadow-lg shadow-blue-400/30' : 
                  'text-gray-400 hover:text-white hover:bg-white/10'
                }`}
                title={repeat === 0 ? "Sin repetir" : repeat === 1 ? "Repetir uno" : "Repetir todo"}
              >
                <RotateCcw className={`${isFullscreen ? 'w-5 h-5' : 'w-4 h-4'}`} />
                {repeat === 1 && <span className="absolute -top-1 -right-1 text-xs">1</span>}
                {repeat === 2 && <span className="absolute -top-1 -right-1 text-xs">∞</span>}
              </button>
            </div>

            {/* Controles de audio avanzados */}
            <div className={`space-y-4 ${isFullscreen ? 'grid grid-cols-2 gap-6 space-y-0' : ''}`}>
              {/* Control de volumen principal */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-gray-400 font-medium">VOLUMEN</label>
                  <span className="text-xs text-gray-400 w-8">{volume}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Volume2 className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={volume}
                      onChange={(e) => setVolume(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider volume-slider"
                    />
                  </div>
                </div>
              </div>

              {/* Control de tempo */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="text-xs text-gray-400 font-medium">TEMPO</label>
                  <span className="text-xs text-gray-400 w-12">{tempo}%</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Zap className="w-4 h-4 text-gray-400" />
                  <div className="flex-1">
                    <input
                      type="range"
                      min="50"
                      max="150"
                      value={tempo}
                      onChange={(e) => setTempo(Number(e.target.value))}
                      className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider tempo-slider"
                    />
                  </div>
                </div>
              </div>

              {isFullscreen && (
                <>
                  {/* Ecualizador básico */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-400 font-medium">GRAVES</label>
                      <span className="text-xs text-gray-400 w-8">{bass}%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-400">🔊</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={bass}
                          onChange={(e) => setBass(Number(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider bass-slider"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <label className="text-xs text-gray-400 font-medium">AGUDOS</label>
                      <span className="text-xs text-gray-400 w-8">{treble}%</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-xs text-gray-400">🎵</span>
                      <div className="flex-1">
                        <input
                          type="range"
                          min="0"
                          max="100"
                          value={treble}
                          onChange={(e) => setTreble(Number(e.target.value))}
                          className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider treble-slider"
                        />
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Lista de tracks */}
            {showPlaylist && (
              <div className={`${isFullscreen ? 'col-span-2' : ''}`}>
                <div className="flex items-center justify-between mb-3">
                  <h4 className="text-white font-bold text-sm">PLAYLIST</h4>
                  <span className="text-xs text-gray-400">{tracks.length} tracks</span>
                </div>
                
                <div className={`${isFullscreen ? 'max-h-64' : 'max-h-32'} overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700`}>
                  {tracks.map((track, index) => (
                    <button
                      key={track.id}
                      onClick={() => {
                        const wasPlaying = isPlaying;
                        if (synthRef.current) {
                          synthRef.current.stopTrack();
                        }
                        setCurrentTrack(index);
                        setProgress(0);
                        if (wasPlaying && synthRef.current) {
                          setTimeout(() => {
                            synthRef.current?.playTrack(index);
                          }, 100);
                        }
                      }}
                      className={`w-full text-left p-3 rounded-lg text-xs transition-all duration-200 ${
                        index === currentTrack 
                          ? `bg-gradient-to-r ${track.color} bg-opacity-20 text-white border border-white/20 shadow-lg` 
                          : 'text-gray-400 hover:text-white hover:bg-gray-800/50 hover:border hover:border-gray-600/30'
                      }`}
                    >
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-3 flex-1 min-w-0">
                          <span className={`text-xs font-mono w-6 ${index === currentTrack ? 'text-yellow-400' : 'text-gray-500'}`}>
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          
                          <div className="flex-1 min-w-0">
                            <div className="truncate font-medium">{track.name}</div>
                            <div className="text-xs opacity-70 truncate">{track.genre}</div>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 text-xs opacity-60">
                          <span>{track.bpm} BPM</span>
                          <span>•</span>
                          <span>{track.duration}</span>
                          {index === currentTrack && isPlaying && (
                            <div className="flex space-x-1">
                              <div className="w-1 h-3 bg-current animate-pulse"></div>
                              <div className="w-1 h-3 bg-current animate-pulse" style={{animationDelay: '0.1s'}}></div>
                              <div className="w-1 h-3 bg-current animate-pulse" style={{animationDelay: '0.2s'}}></div>
                            </div>
                          )}
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Footer con información avanzada */}
            <div className={`${isFullscreen ? 'col-span-2' : ''} pt-4 border-t border-gray-700`}>
              <div className="flex items-center justify-between text-xs text-gray-500">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Zap className="w-3 h-3 text-cyan-400" />
                    <span className="text-cyan-400 font-medium">NÚCLEO SOUND</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                    <span>MIDI Synth</span>
                  </div>
                  
                  {isFullscreen && (
                    <div className="flex items-center space-x-2">
                      <span>Calidad:</span>
                      <span className="text-yellow-400">Sintético HD</span>
                    </div>
                  )}
                </div>
                
                <div className="flex items-center space-x-4">
                  {/* Modo de visualización */}
                  <div className="flex space-x-1">
                    {['Básico', 'Avanzado', 'Artístico'].map((mode, index) => (
                      <button
                        key={index}
                        onClick={() => setVisualMode(index)}
                        className={`px-2 py-1 rounded text-xs transition-colors ${
                          visualMode === index 
                            ? 'bg-purple-500/30 text-white' 
                            : 'text-gray-500 hover:text-gray-300'
                        }`}
                        title={`Modo ${mode}`}
                      >
                        {mode.charAt(0)}
                      </button>
                    ))}
                  </div>
                  
                  <div className="text-right">
                    <div>Track {currentTrack + 1} de {tracks.length}</div>
                    {isFullscreen && (
                      <div className="text-xs text-gray-600">
                        Género: {currentTrackData.genre}
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              {isFullscreen && (
                <div className="mt-2 pt-2 border-t border-gray-800 text-xs text-gray-600">
                  <div className="flex justify-between items-center">
                    <span>© 2025 Núcleo Colectivo - Immersive Sound Collection</span>
                    <span>Powered by Web Audio API</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReproductorMIDI;
