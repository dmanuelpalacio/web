import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, RotateCcw, Shuffle, SkipBack, SkipForward, Music, Zap, X, Settings, Sliders } from 'lucide-react';
import { AdvancedMIDISynthesizer } from './AdvancedMIDISynthesizer';

// Síntesis MIDI simplificada y robusta
class SimpleMIDISynthesizer {
  private audioContext: AudioContext | null = null;
  private gainNode: GainNode | null = null;
  private oscillators: OscillatorNode[] = [];
  private isPlaying = false;
  private currentPattern: any = null;
  private patternTimeout: NodeJS.Timeout | null = null;
  private startTime: number = 0;
  private pausedTime: number = 0;
  private trackDuration: number = 0;
  private onProgressUpdate?: (progress: number, currentTime: number, duration: number) => void;

  constructor() {
    this.initAudio();
  }

  private async initAudio() {
    try {
      this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
      this.gainNode = this.audioContext.createGain();
      this.gainNode.connect(this.audioContext.destination);
      this.gainNode.gain.setValueAtTime(0.15, this.audioContext.currentTime);
    } catch (error) {
      console.warn('Web Audio API no disponible:', error);
    }
  }

  setVolume(volume: number) {
    if (this.gainNode && this.audioContext) {
      this.gainNode.gain.setValueAtTime(volume / 100 * 0.3, this.audioContext.currentTime);
    }
  }

  setProgressCallback(callback: (progress: number, currentTime: number, duration: number) => void) {
    this.onProgressUpdate = callback;
  }

  private calculateTrackDuration(pattern: any): number {
    const { rhythm } = pattern;
    const cycleLength = rhythm.reduce((sum: number, duration: number) => sum + duration, 0);
    const numberOfCycles = 16; // Cada track dura aproximadamente 16 ciclos
    return cycleLength * numberOfCycles / 1000; // Convertir a segundos
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

  seekTo(percentage: number) {
    if (percentage < 0 || percentage > 100) return;
    
    const targetTime = (this.trackDuration * percentage) / 100;
    
    if (this.isPlaying) {
      // Si está reproduciendo, reiniciar desde la nueva posición
      this.pausedTime = targetTime;
      this.startTime = Date.now();
      
      // Detener audio actual y reiniciar
      this.oscillators.forEach(osc => {
        try {
          osc.stop();
        } catch (e) {
          // Oscilador ya detenido
        }
      });
      this.oscillators = [];
      
      if (this.patternTimeout) {
        clearTimeout(this.patternTimeout);
        this.patternTimeout = null;
      }
      
      // Reiniciar reproducción
      this.playPattern();
    } else {
      // Si está pausado, solo actualizar la posición
      this.pausedTime = targetTime;
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

  playTrack(trackId: number) {
    if (!this.audioContext || !this.gainNode) return;

    this.stopTrack();
    this.isPlaying = true;
    this.currentPattern = this.getTrackPattern(trackId);
    this.trackDuration = this.calculateTrackDuration(this.currentPattern);
    this.startTime = Date.now();
    this.pausedTime = 0;

    this.playPattern();
    this.startProgressTracking();
  }

  getTrackPattern(trackId: number) {
    const patterns = [
      { name: "Retro Arte", baseFreq: 220, scale: [1, 1.125, 1.25, 1.5, 1.875, 2, 2.25], rhythm: [500, 250, 500, 750], wave: 'triangle' },
      { name: "Neon Nights", baseFreq: 196, scale: [1, 1.2, 1.5, 2, 2.4, 3], rhythm: [400, 200, 600, 300], wave: 'sawtooth' },
      { name: "Digital Renaissance", baseFreq: 174, scale: [1, 1.1, 1.3, 1.6, 2.1, 2.6], rhythm: [300, 150, 450, 225], wave: 'square' },
      { name: "Quantum Dreams", baseFreq: 130, scale: [1, 1.4, 1.8, 2.2, 2.8, 3.5], rhythm: [800, 400, 1200, 600], wave: 'sine' },
      { name: "Underground Pulse", baseFreq: 98, scale: [1, 1.1, 1.2, 1.4, 1.6, 2], rhythm: [200, 100, 300, 150], wave: 'sawtooth' },
      { name: "Deep House", baseFreq: 147, scale: [1, 1.25, 1.5, 2, 2.5, 3], rhythm: [600, 300, 900, 450], wave: 'triangle' },
      { name: "Café Midnight", baseFreq: 110, scale: [1, 1.3, 1.6, 2.1, 2.6, 3.2], rhythm: [1000, 750, 1500, 1000], wave: 'sine' },
      { name: "Cartagena Sunset", baseFreq: 196, scale: [1, 1.2, 1.4, 1.7, 2.1, 2.5], rhythm: [450, 225, 675, 300], wave: 'triangle' },
      { name: "Salsa Futurista", baseFreq: 220, scale: [1, 1.15, 1.35, 1.65, 2, 2.4], rhythm: [350, 175, 525, 250], wave: 'sawtooth' },
      { name: "Cumbia Espacial", baseFreq: 164, scale: [1, 1.25, 1.5, 1.9, 2.3, 2.8], rhythm: [550, 275, 825, 400], wave: 'triangle' },
      { name: "Vallenato Cyber", baseFreq: 138, scale: [1, 1.3, 1.6, 2, 2.4, 3], rhythm: [700, 350, 1050, 525], wave: 'sine' },
      { name: "Bambuco Digital", baseFreq: 185, scale: [1, 1.2, 1.5, 1.8, 2.2, 2.7], rhythm: [900, 450, 1350, 675], wave: 'triangle' },
      { name: "Reggaeton 2050", baseFreq: 110, scale: [1, 1.1, 1.3, 1.6, 1.9, 2.3], rhythm: [400, 200, 300, 150], wave: 'square' },
      { name: "Champeta Galáctica", baseFreq: 156, scale: [1, 1.15, 1.4, 1.7, 2.1, 2.5], rhythm: [380, 190, 570, 285], wave: 'sawtooth' },
      { name: "Tropical Matrix", baseFreq: 174, scale: [1, 1.25, 1.5, 1.85, 2.2, 2.75], rhythm: [480, 240, 720, 360], wave: 'triangle' },
      { name: "Arte Infinito", baseFreq: 87, scale: [1, 1.5, 2, 2.5, 3, 4], rhythm: [1500, 1000, 2000, 1500], wave: 'sine' }
    ];
    
    return patterns[trackId % patterns.length];
  }

  private playPattern() {
    if (!this.isPlaying || !this.currentPattern || !this.audioContext) return;

    const { baseFreq, scale, rhythm, wave } = this.currentPattern;
    let noteIndex = 0;

    const playNextNote = () => {
      if (!this.isPlaying) return;

      const freq = baseFreq * scale[noteIndex % scale.length];
      const duration = rhythm[noteIndex % rhythm.length];

      this.playNote(freq, duration, wave as OscillatorType);

      noteIndex++;
      this.patternTimeout = setTimeout(playNextNote, duration);
    };

    playNextNote();
  }

  private playNote(frequency: number, duration: number, waveType: OscillatorType) {
    if (!this.audioContext || !this.gainNode) return;

    const oscillator = this.audioContext.createOscillator();
    const envelope = this.audioContext.createGain();
    const filter = this.audioContext.createBiquadFilter();
    
    oscillator.type = waveType;
    oscillator.frequency.setValueAtTime(frequency, this.audioContext.currentTime);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(frequency * 3, this.audioContext.currentTime);
    
    oscillator.connect(filter);
    filter.connect(envelope);
    envelope.connect(this.gainNode);
    
    // Envelope simple pero efectivo
    envelope.gain.setValueAtTime(0, this.audioContext.currentTime);
    envelope.gain.linearRampToValueAtTime(0.1, this.audioContext.currentTime + 0.01);
    envelope.gain.exponentialRampToValueAtTime(0.05, this.audioContext.currentTime + duration / 1000 * 0.5);
    envelope.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + duration / 1000);

    oscillator.start(this.audioContext.currentTime);
    oscillator.stop(this.audioContext.currentTime + duration / 1000);
    
    this.oscillators.push(oscillator);

    // Limpiar automáticamente
    oscillator.onended = () => {
      const index = this.oscillators.indexOf(oscillator);
      if (index > -1) {
        this.oscillators.splice(index, 1);
      }
    };
  }

  stopTrack() {
    this.isPlaying = false;
    this.startTime = 0;
    this.pausedTime = 0;
    
    if (this.patternTimeout) {
      clearTimeout(this.patternTimeout);
      this.patternTimeout = null;
    }
    
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
    if (this.isPlaying) {
      this.pausedTime = this.getCurrentTime();
      this.isPlaying = false;
      if (this.patternTimeout) {
        clearTimeout(this.patternTimeout);
        this.patternTimeout = null;
      }
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
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [shuffle, setShuffle] = useState(false);
  const [repeat, setRepeat] = useState(0);
  const [audioInitialized, setAudioInitialized] = useState(false);
  const progressRef = useRef<HTMLDivElement>(null);
  const synthRef = useRef<SimpleMIDISynthesizer | null>(null);

  // Tracks simplificados pero efectivos
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

  // Función para formatear tiempo en mm:ss
  const formatTime = (timeInSeconds: number): string => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = Math.floor(timeInSeconds % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Inicializar sintetizador
  useEffect(() => {
    synthRef.current = new SimpleMIDISynthesizer();
    
    // Configurar callback de progreso
    if (synthRef.current) {
      synthRef.current.setProgressCallback((progressPercent, currentTimeSeconds, durationSeconds) => {
        setProgress(progressPercent);
        setCurrentTime(currentTimeSeconds);
        setDuration(durationSeconds);
        
        // Auto-next cuando termina el track
        if (progressPercent >= 100) {
          if (repeat === 1) {
            // Repetir el track actual
            setTimeout(() => {
              if (synthRef.current) {
                synthRef.current.playTrack(currentTrack);
              }
            }, 100);
          } else if (repeat === 2 || currentTrack < tracks.length - 1) {
            // Ir al siguiente track
            setTimeout(() => {
              handleNextTrack();
            }, 100);
          } else {
            // Detener al final de la playlist
            setTimeout(() => {
              handleStop();
            }, 100);
          }
        }
      });
    }
    
    return () => {
      if (synthRef.current) {
        synthRef.current.stopTrack();
      }
    };
  }, []);

  // Función para inicializar audio
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

  // Actualizar volumen
  useEffect(() => {
    if (synthRef.current) {
      synthRef.current.setVolume(volume);
    }
  }, [volume]);

  // Calcular duración real de tracks
  const getTrackRealDuration = (trackIndex: number): string => {
    if (!synthRef.current) return "0:00";
    const pattern = synthRef.current['getTrackPattern'](trackIndex);
    if (!pattern) return "0:00";
    
    const cycleLength = pattern.rhythm.reduce((sum: number, duration: number) => sum + duration, 0);
    const numberOfCycles = 16;
    const durationSeconds = (cycleLength * numberOfCycles) / 1000;
    return formatTime(durationSeconds);
  };

  const handlePlay = async () => {
    if (!synthRef.current) return;

    if (!audioInitialized) {
      await initializeAudio();
    }

    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (synthRef.current['audioContext']?.state === 'suspended') {
        await synthRef.current['audioContext'].resume();
      }
      
      // Si el progreso es 0 o muy bajo, empezar desde el principio
      if (progress < 5) {
        synthRef.current.playTrack(currentTrack);
      } else {
        // Resumir desde donde se pausó
        synthRef.current.resume();
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.stopTrack();
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  const handleNextTrack = () => {
    if (synthRef.current) {
      synthRef.current.stopTrack();
    }
    
    let nextTrack = shuffle 
      ? Math.floor(Math.random() * tracks.length)
      : (currentTrack + 1) % tracks.length;
    
    setCurrentTrack(nextTrack);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    
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
    
    let prevTrack = shuffle 
      ? Math.floor(Math.random() * tracks.length)
      : currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    
    setCurrentTrack(prevTrack);
    setProgress(0);
    setCurrentTime(0);
    setDuration(0);
    
    if (isPlaying && synthRef.current) {
      setTimeout(() => {
        synthRef.current?.playTrack(prevTrack);
      }, 100);
    }
  };

  const currentTrackData = tracks[currentTrack];

  return (
    <div className="fixed bottom-6 left-6 z-40 max-w-sm">
      {/* Botón flotante */}
      {!isExpanded && (
        <button
          onClick={async () => {
            if (!audioInitialized) {
              await initializeAudio();
            }
            setIsExpanded(true);
          }}
          className={`group flex items-center space-x-3 bg-black/90 backdrop-blur-xl rounded-2xl p-4 border border-purple-500/30 hover:border-purple-400/50 transition-all duration-300 shadow-xl ${
            isPlaying ? 'shadow-purple-500/30' : ''
          }`}
        >
          <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${currentTrackData.color} flex items-center justify-center transition-transform group-hover:scale-110`}>
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
          
          <div className="text-xs text-gray-500">{currentTrack + 1}/{tracks.length}</div>
        </button>
      )}

      {/* Reproductor expandido */}
      {isExpanded && (
        <div className="bg-black/95 backdrop-blur-xl rounded-2xl border border-purple-500/30 shadow-2xl overflow-hidden w-96">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-purple-500/20 bg-gradient-to-r from-purple-900/50 to-indigo-900/50">
            <div className="flex items-center space-x-3">
              <div className="flex space-x-1">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              </div>
              <div className="text-left">
                <span className="text-cyan-400 font-bold text-sm">NÚCLEO SOUND</span>
                <div className="text-yellow-400 font-bold text-xs">Epic Collection 🎵</div>
              </div>
              <div className={`w-2 h-2 rounded-full ${audioInitialized ? 'bg-green-400' : 'bg-yellow-400'} animate-pulse`}></div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-gray-400 hover:text-white transition-colors p-2"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="p-4 space-y-4">
            {/* Track info */}
            <div className="text-center">
              <div className={`mx-auto w-24 h-24 rounded-xl bg-gradient-to-br ${currentTrackData.color} p-1 mb-4`}>
                <div className="w-full h-full bg-black/30 rounded-lg flex items-center justify-center backdrop-blur-sm">
                  <Music className="w-8 h-8 text-white" />
                </div>
              </div>
              
              <h3 className="text-white font-bold text-lg mb-2">{currentTrackData.name}</h3>
              <p className="text-cyan-400 text-sm mb-1">{currentTrackData.genre} • {currentTrackData.bpm} BPM</p>
              <p className="text-yellow-400 text-xs font-medium mb-2">Núcleo Colectivo</p>
              <p className="text-gray-400 text-xs max-w-xs mx-auto">{currentTrackData.description}</p>
              
              {!audioInitialized && (
                <button
                  onClick={initializeAudio}
                  className="mt-3 bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-6 py-3 rounded-full text-sm font-bold hover:from-yellow-400 hover:to-orange-400 transition-all animate-pulse shadow-lg"
                >
                  🔊 Activar Audio MIDI
                </button>
              )}
            </div>

            {/* Visualizador simple */}
            <div className="h-16 bg-black/50 rounded-lg flex items-end justify-center space-x-1 p-2">
              {Array.from({ length: 20 }, (_, i) => (
                <div
                  key={i}
                  className={`w-2 bg-gradient-to-t ${currentTrackData.color} rounded-t transition-all duration-300`}
                  style={{
                    height: `${isPlaying ? 20 + Math.random() * 60 : 10}%`,
                    animationDelay: `${i * 0.05}s`
                  }}
                />
              ))}
            </div>

            {/* Barra de progreso */}
            <div className="space-y-2">
              <div 
                ref={progressRef}
                className="h-2 bg-gray-700 rounded-full overflow-hidden cursor-pointer"
                onClick={(e) => {
                  if (progressRef.current && synthRef.current) {
                    const rect = progressRef.current.getBoundingClientRect();
                    const clickX = e.clientX - rect.left;
                    const percentage = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
                    synthRef.current.seekTo(percentage);
                  }
                }}
              >
                <div 
                  className={`h-full bg-gradient-to-r ${currentTrackData.color} transition-all duration-300`}
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-between text-xs text-gray-400">
                <span>{formatTime(currentTime)}</span>
                <span>{formatTime(duration)}</span>
              </div>
            </div>

            {/* Controles principales */}
            <div className="flex items-center justify-center space-x-4">
              <button
                onClick={() => setShuffle(!shuffle)}
                className={`p-2 rounded-full transition-all ${shuffle ? 'text-yellow-400 bg-yellow-400/20' : 'text-gray-400 hover:text-white'}`}
              >
                <Shuffle className="w-4 h-4" />
              </button>

              <button
                onClick={handlePrevTrack}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <SkipBack className="w-5 h-5" />
              </button>

              <button
                onClick={handlePlay}
                className={`w-12 h-12 rounded-full bg-gradient-to-r ${currentTrackData.color} flex items-center justify-center hover:scale-110 transition-transform shadow-lg`}
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>

              <button
                onClick={handleNextTrack}
                className="text-gray-400 hover:text-white transition-colors p-2"
              >
                <SkipForward className="w-5 h-5" />
              </button>

              <button
                onClick={() => setRepeat((prev) => (prev + 1) % 3)}
                className={`p-2 rounded-full transition-all relative ${
                  repeat === 1 ? 'text-green-400 bg-green-400/20' : 
                  repeat === 2 ? 'text-blue-400 bg-blue-400/20' : 
                  'text-gray-400 hover:text-white'
                }`}
              >
                <RotateCcw className="w-4 h-4" />
                {repeat === 1 && <span className="absolute -top-1 -right-1 text-xs">1</span>}
                {repeat === 2 && <span className="absolute -top-1 -right-1 text-xs">∞</span>}
              </button>
            </div>

            {/* Control de volumen */}
            <div className="flex items-center space-x-3">
              <Volume2 className="w-4 h-4 text-gray-400" />
              <div className="flex-1">
                <input
                  type="range"
                  min="0"
                  max="100"
                  value={volume}
                  onChange={(e) => setVolume(Number(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
                />
              </div>
              <span className="text-xs text-gray-400 w-8">{volume}%</span>
            </div>

            {/* Playlist compacta */}
            <div className="max-h-32 overflow-y-auto space-y-1 scrollbar-thin scrollbar-thumb-purple-500 scrollbar-track-gray-700">
              {tracks.slice(0, 6).map((track, index) => (
                <button
                  key={track.id}
                  onClick={() => {
                    const wasPlaying = isPlaying;
                    if (synthRef.current) {
                      synthRef.current.stopTrack();
                    }
                    setCurrentTrack(index);
                    setProgress(0);
                    setCurrentTime(0);
                    setDuration(0);
                    if (wasPlaying && synthRef.current) {
                      setTimeout(() => {
                        synthRef.current?.playTrack(index);
                      }, 100);
                    }
                  }}
                  className={`w-full text-left p-2 rounded text-xs transition-colors ${
                    index === currentTrack 
                      ? 'bg-purple-500/20 text-white border border-purple-500/30' 
                      : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className="truncate flex items-center">
                      <span className="text-xs text-purple-400 mr-1 font-mono">{String(index + 1).padStart(2, '0')}</span>
                      {track.name}
                    </span>
                    <span className="text-xs opacity-60">{track.duration}</span>
                  </div>
                </button>
              ))}
              
              {tracks.length > 6 && (
                <div className="text-center text-xs text-gray-500 py-2">
                  +{tracks.length - 6} más tracks 🎵
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between text-xs text-gray-500 pt-2 border-t border-gray-700">
              <div className="flex items-center space-x-2">
                <Zap className="w-3 h-3 text-cyan-400" />
                <span className="text-cyan-400 font-medium">NÚCLEO SOUND</span>
              </div>
              <div className="text-right">
                <div>Track {currentTrack + 1} de {tracks.length}</div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReproductorMIDI;
