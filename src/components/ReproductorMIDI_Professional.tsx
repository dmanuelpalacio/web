import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2, RotateCcw, Shuffle, SkipBack, SkipForward, Music, Zap, X, Settings, Sliders, BarChart3, Headphones, Disc, Radio } from 'lucide-react';
import { ProfessionalMIDISynthesizer } from './ProfessionalMIDISynthesizer';

// Wrapper para mantener compatibilidad
class SimpleMIDISynthesizer {
  private professionalSynth: ProfessionalMIDISynthesizer;

  constructor() {
    this.professionalSynth = new ProfessionalMIDISynthesizer();
  }

  setVolume(volume: number) {
    this.professionalSynth.setVolume(volume);
  }

  setProgressCallback(callback: (progress: number, currentTime: number, duration: number) => void) {
    this.professionalSynth.setProgressCallback(callback);
  }

  getCurrentTime(): number {
    return this.professionalSynth.getCurrentTime();
  }

  getDuration(): number {
    return this.professionalSynth.getDuration();
  }

  playTrack(trackId: number) {
    this.professionalSynth.playTrack(trackId);
  }

  stopTrack() {
    this.professionalSynth.stopTrack();
  }

  pause() {
    this.professionalSynth.pause();
  }

  resume() {
    this.professionalSynth.resume();
  }

  seekTo(percentage: number) {
    this.professionalSynth.seekTo(percentage);
  }

  setParameter(param: string, value: number) {
    this.professionalSynth.setParameter(param, value);
  }

  getAnalyserData(): Uint8Array {
    return this.professionalSynth.getAnalyserData();
  }
}

interface Track {
  id: number;
  name: string;
  artist: string;
  genre: string;
  bpm: number;
  key: string;
  duration: string;
  color: string;
  description: string;
  structure: string;
  synthesis: string;
}

const ReproductorMIDI = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(0);
  const [volume, setVolume] = useState(75);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooped, setIsLooped] = useState(false);
  const [showControls, setShowControls] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  
  // Estados para controles avanzados
  const [showAdvancedControls, setShowAdvancedControls] = useState(false);
  const [showTrackInfo, setShowTrackInfo] = useState(false);
  const [audioParams, setAudioParams] = useState({
    reverb: 35,
    delay: 25,
    cutoff: 80,
    resonance: 12,
    attack: 2,
    decay: 15,
    sustain: 65,
    release: 40,
    stereoWidth: 60,
    brightness: 30
  });
  const [isVisualizing, setIsVisualizing] = useState(false);
  const [analyserData, setAnalyserData] = useState<Uint8Array>(new Uint8Array(0));

  const synthRef = useRef<SimpleMIDISynthesizer | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // 🎼 BANDA SONORA PROFESIONAL - NÚCLEO COLECTIVO
  const tracks: Track[] = [
    { 
      id: 1, 
      name: "Genesis Code", 
      artist: "Núcleo Colectivo",
      genre: "Cinematic Electronic", 
      bpm: 95, 
      key: "Dm",
      duration: "4:32", 
      color: "from-purple-600 via-violet-600 to-indigo-600", 
      description: "Nacimiento del arte digital - Atmósferas épicas que evocan la creación",
      structure: "intro-verse-chorus-verse-chorus-bridge-chorus-outro",
      synthesis: "cinematic"
    },
    { 
      id: 2, 
      name: "Neural Networks", 
      artist: "Núcleo Colectivo",
      genre: "Progressive Techno", 
      bpm: 128, 
      key: "Am",
      duration: "5:18", 
      color: "from-cyan-500 via-blue-500 to-indigo-500", 
      description: "Redes neuronales en movimiento - Progresiones complejas que simulan el pensamiento artificial",
      structure: "build-drop-breakdown-build-drop-outro",
      synthesis: "progressive"
    },
    { 
      id: 3, 
      name: "Digital Renaissance", 
      artist: "Núcleo Colectivo",
      genre: "Neo-Classical Electronic", 
      bpm: 110, 
      key: "Cmaj",
      duration: "6:45", 
      color: "from-emerald-500 via-teal-500 to-cyan-500", 
      description: "Renacimiento digital - Fusión armoniosa entre tradición clásica e innovación tecnológica",
      structure: "prelude-theme-variation1-variation2-development-recapitulation",
      synthesis: "orchestral"
    },
    { 
      id: 4, 
      name: "Quantum Canvas", 
      artist: "Núcleo Colectivo",
      genre: "Ambient Experimental", 
      bpm: 70, 
      key: "Em",
      duration: "8:20", 
      color: "from-indigo-600 via-purple-600 to-pink-600", 
      description: "Lienzo cuántico - Texturas infinitas que exploran dimensiones sonoras inexploradas",
      structure: "emergence-expansion-transformation-transcendence",
      synthesis: "granular"
    },
    { 
      id: 5, 
      name: "Algorithmic Dreams", 
      artist: "Núcleo Colectivo",
      genre: "Glitch Ambient", 
      bpm: 85, 
      key: "F#m",
      duration: "7:12", 
      color: "from-red-500 via-orange-500 to-yellow-500", 
      description: "Sueños algorítmicos - Patrones fractales que revelan la poesía oculta en el código",
      structure: "inception-processing-fragmentation-recompilation-resolution",
      synthesis: "glitch"
    },
    { 
      id: 6, 
      name: "Creative Synthesis", 
      artist: "Núcleo Colectivo",
      genre: "Fusion Electronic", 
      bpm: 120, 
      key: "Bbmaj",
      duration: "5:55", 
      color: "from-yellow-500 via-amber-500 to-orange-500", 
      description: "Síntesis creativa - Jazz digital que fusiona improvisación humana con precisión algorítmica",
      structure: "intro-theme-improvisation-development-climax-resolution",
      synthesis: "fusion"
    },
    { 
      id: 7, 
      name: "Midnight Laboratory", 
      artist: "Núcleo Colectivo",
      genre: "Dark Ambient Techno", 
      bpm: 115, 
      key: "Gm",
      duration: "6:28", 
      color: "from-gray-700 via-slate-600 to-zinc-600", 
      description: "Laboratorio nocturno - Sonidos industriales que evocan la experimentación creativa en las horas silenciosas",
      structure: "setup-experiment-complication-breakthrough-conclusion",
      synthesis: "industrial"
    },
    { 
      id: 8, 
      name: "Caribbean Pixels", 
      artist: "Núcleo Colectivo",
      genre: "Tropical Electronic", 
      bpm: 105, 
      key: "Amaj",
      duration: "4:15", 
      color: "from-orange-500 via-red-500 to-pink-500", 
      description: "Píxeles caribeños - Ritmos tropicales procesados digitalmente, fusión perfecta de tradición y modernidad",
      structure: "intro-verse-pre-chorus-chorus-verse-chorus-bridge-chorus-outro",
      synthesis: "tropical"
    },
    { 
      id: 9, 
      name: "Salsa Cyborg", 
      artist: "Núcleo Colectivo",
      genre: "Latin Futuristic", 
      bpm: 135, 
      key: "Em",
      duration: "4:42", 
      color: "from-pink-500 via-rose-500 to-red-500", 
      description: "Salsa cyborg - Fusión de montunos tradicionales con síntesis futurista, el futuro del son",
      structure: "intro-montuno-coro-solo-montuno-coro-mambo-coro-outro",
      synthesis: "latin"
    },
    { 
      id: 10, 
      name: "Cosmic Cumbia", 
      artist: "Núcleo Colectivo",
      genre: "Space Cumbia", 
      bpm: 98, 
      key: "Dmaj",
      duration: "5:35", 
      color: "from-green-500 via-emerald-500 to-teal-500", 
      description: "Cumbia cósmica - Ritmos ancestrales navegando por el espacio digital, tradición en órbita",
      structure: "intro-verse-cumbia-verso-cumbia-interludio-cumbia-outro",
      synthesis: "cosmic"
    },
    { 
      id: 11, 
      name: "Vallenato Neural", 
      artist: "Núcleo Colectivo",
      genre: "Folk AI", 
      bpm: 88, 
      key: "Gmaj",
      duration: "6:18", 
      color: "from-blue-500 via-sky-500 to-cyan-500", 
      description: "Vallenato neural - Acordeón digital que aprende melodías ancestrales, tradición que evoluciona",
      structure: "intro-verso-estribillo-verso-estribillo-puente-estribillo-outro",
      synthesis: "folk"
    },
    { 
      id: 12, 
      name: "Bambuco Quantum", 
      artist: "Núcleo Colectivo",
      genre: "Quantum Folk", 
      bpm: 75, 
      key: "Fmaj",
      duration: "7:40", 
      color: "from-purple-500 via-violet-500 to-blue-500", 
      description: "Bambuco cuántico - Estructura clásica colombiana explorando probabilidades armónicas infinitas",
      structure: "preludio-tema-variación1-variación2-desarrollo-recapitulación",
      synthesis: "classical"
    },
    { 
      id: 13, 
      name: "Reggaeton 3000", 
      artist: "Núcleo Colectivo",
      genre: "Future Urban", 
      bpm: 92, 
      key: "Cm",
      duration: "3:58", 
      color: "from-gray-600 via-slate-600 to-zinc-600", 
      description: "Reggaetón 3000 - Dembow evolucionado con síntesis avanzada, el perreo del futuro",
      structure: "intro-verso-pre-coro-coro-verso-coro-bridge-coro-outro",
      synthesis: "urban"
    },
    { 
      id: 14, 
      name: "Champeta Galaxy", 
      artist: "Núcleo Colectivo",
      genre: "Afro Galactic", 
      bpm: 112, 
      key: "Em",
      duration: "4:25", 
      color: "from-orange-500 via-amber-500 to-yellow-500", 
      description: "Champeta galáctica - Ritmos afrocaribeños expandidos por el cosmos digital, ancestralidad espacial",
      structure: "llamada-respuesta-coro-solo-llamada-respuesta-coro-outro",
      synthesis: "afro"
    },
    { 
      id: 15, 
      name: "Matrix Tropical", 
      artist: "Núcleo Colectivo",
      genre: "Neo Tropical", 
      bpm: 108, 
      key: "Amaj",
      duration: "5:02", 
      color: "from-teal-500 via-cyan-500 to-blue-500", 
      description: "Matrix tropical - Algoritmos caribeños decodificando realidades alternas, paraíso digital",
      structure: "entrada-desarrollo-clímax-transformación-resolución",
      synthesis: "matrix"
    },
    { 
      id: 16, 
      name: "Infinite Arte", 
      artist: "Núcleo Colectivo",
      genre: "Infinite Ambient", 
      bpm: 60, 
      key: "Amaj",
      duration: "∞", 
      color: "from-violet-600 via-purple-600 to-fuchsia-600", 
      description: "Arte infinito - Texturas etéreas que trascienden el tiempo, la creatividad sin límites del colectivo",
      structure: "génesis-evolución-transformación-transcendencia-infinito",
      synthesis: "infinite"
    }
  ];

  useEffect(() => {
    synthRef.current = new SimpleMIDISynthesizer();
    synthRef.current.setProgressCallback((prog, curr, dur) => {
      setProgress(prog);
      setCurrentTime(curr);
      setDuration(dur);
      
      if (prog >= 100) {
        handleNext();
      }
    });

    return () => {
      if (synthRef.current) {
        synthRef.current.stopTrack();
      }
    };
  }, []);

  // Visualización de audio profesional
  useEffect(() => {
    if (isVisualizing && synthRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (!ctx) return;

      const draw = () => {
        if (!synthRef.current || !isVisualizing) return;
        
        const data = synthRef.current.getAnalyserData();
        
        canvas.width = canvas.offsetWidth * window.devicePixelRatio;
        canvas.height = canvas.offsetHeight * window.devicePixelRatio;
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
        
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        
        // Fondo con gradiente
        const gradient = ctx.createLinearGradient(0, 0, 0, height);
        gradient.addColorStop(0, 'rgba(15, 15, 15, 0.1)');
        gradient.addColorStop(1, 'rgba(0, 0, 0, 0.3)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, width, height);
        
        // Visualización de barras con efectos
        const barWidth = width / data.length;
        let x = 0;
        
        for (let i = 0; i < data.length; i++) {
          const barHeight = (data[i] / 255) * height * 0.9;
          
          // Color basado en frecuencia y amplitud
          const hue = (i / data.length) * 360;
          const saturation = 70 + (data[i] / 255) * 30;
          const lightness = 40 + (data[i] / 255) * 40;
          
          ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${lightness}%, 0.8)`;
          ctx.fillRect(x, height - barHeight, barWidth - 1, barHeight);
          
          // Efecto de reflejo
          const reflectionGradient = ctx.createLinearGradient(0, height, 0, height - barHeight * 0.3);
          reflectionGradient.addColorStop(0, `hsla(${hue}, ${saturation}%, ${lightness}%, 0.3)`);
          reflectionGradient.addColorStop(1, `hsla(${hue}, ${saturation}%, ${lightness}%, 0)`);
          ctx.fillStyle = reflectionGradient;
          ctx.fillRect(x, height, barWidth - 1, -barHeight * 0.3);
          
          x += barWidth;
        }
        
        requestAnimationFrame(draw);
      };
      
      draw();
    }
  }, [isVisualizing]);

  // Aplicar cambios de parámetros de audio
  useEffect(() => {
    if (synthRef.current) {
      Object.entries(audioParams).forEach(([param, value]) => {
        synthRef.current!.setParameter(param, value / 100);
      });
    }
  }, [audioParams]);

  const formatTime = (seconds: number): string => {
    if (!isFinite(seconds)) return "∞";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handlePlay = () => {
    if (!synthRef.current) return;
    
    if (isPlaying) {
      synthRef.current.pause();
      setIsPlaying(false);
    } else {
      if (progress > 0) {
        synthRef.current.resume();
      } else {
        synthRef.current.playTrack(currentTrack);
      }
      setIsPlaying(true);
    }
  };

  const handleStop = () => {
    if (synthRef.current) {
      synthRef.current.stopTrack();
      setIsPlaying(false);
      setProgress(0);
      setCurrentTime(0);
    }
  };

  const handleNext = () => {
    let nextTrack;
    if (isShuffled) {
      nextTrack = Math.floor(Math.random() * tracks.length);
    } else {
      nextTrack = (currentTrack + 1) % tracks.length;
    }
    
    setCurrentTrack(nextTrack);
    setProgress(0);
    setCurrentTime(0);
    
    if (isPlaying && synthRef.current) {
      synthRef.current.playTrack(nextTrack);
    }
  };

  const handlePrevious = () => {
    let prevTrack;
    if (isShuffled) {
      prevTrack = Math.floor(Math.random() * tracks.length);
    } else {
      prevTrack = currentTrack === 0 ? tracks.length - 1 : currentTrack - 1;
    }
    
    setCurrentTrack(prevTrack);
    setProgress(0);
    setCurrentTime(0);
    
    if (isPlaying && synthRef.current) {
      synthRef.current.playTrack(prevTrack);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (synthRef.current) {
      synthRef.current.setVolume(newVolume);
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const percentage = (clickX / rect.width) * 100;
    
    if (synthRef.current) {
      synthRef.current.seekTo(percentage);
    }
  };

  const handleTrackSelect = (trackIndex: number) => {
    setCurrentTrack(trackIndex);
    setProgress(0);
    setCurrentTime(0);
    
    if (synthRef.current) {
      if (isPlaying) {
        synthRef.current.playTrack(trackIndex);
      }
    }
  };

  const handleVolumeMouseEnter = () => {
    setIsVolumeVisible(true);
    if (volumeTimeoutRef.current) {
      clearTimeout(volumeTimeoutRef.current);
    }
  };

  const handleVolumeMouseLeave = () => {
    volumeTimeoutRef.current = setTimeout(() => {
      setIsVolumeVisible(false);
    }, 1000);
  };

  const handleParameterChange = (param: string, value: number) => {
    setAudioParams(prev => ({
      ...prev,
      [param]: value
    }));
  };

  const currentTrackData = tracks[currentTrack];

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-full shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 hover:scale-110 group"
        >
          <Headphones className="w-6 h-6 group-hover:animate-pulse" />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden min-w-[450px] max-w-[550px]">
      <div className="p-6">
        {/* Header profesional */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
            <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
            <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
            <span className="text-white/60 text-sm ml-2 font-mono">NÚCLEO SOUND STUDIO</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setShowTrackInfo(!showTrackInfo)}
              className={`p-2 rounded-lg transition-colors ${showTrackInfo ? 'bg-green-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              title="Track Info"
            >
              <Radio className="w-4 h-4" />
            </button>
            <button
              onClick={() => setShowAdvancedControls(!showAdvancedControls)}
              className={`p-2 rounded-lg transition-colors ${showAdvancedControls ? 'bg-purple-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              title="Advanced Controls"
            >
              <Settings className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsVisualizing(!isVisualizing)}
              className={`p-2 rounded-lg transition-colors ${isVisualizing ? 'bg-blue-600 text-white' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
              title="Audio Visualizer"
            >
              <BarChart3 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-lg"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Visualizador de audio profesional */}
        {isVisualizing && (
          <div className="mb-4 h-32 rounded-lg overflow-hidden bg-gradient-to-br from-black/80 to-purple-900/20 border border-purple-500/20">
            <canvas 
              ref={canvasRef}
              className="w-full h-full"
              style={{ width: '100%', height: '100%' }}
            />
          </div>
        )}

        {/* Información del track actual */}
        <div className="flex items-center space-x-4 mb-4">
          <div className={`w-20 h-20 rounded-xl bg-gradient-to-br ${currentTrackData.color} flex items-center justify-center shadow-lg relative overflow-hidden`}>
            <Disc className={`w-10 h-10 text-white ${isPlaying ? 'animate-spin' : ''}`} />
            <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
          </div>
          <div className="flex-1">
            <h3 className="text-white font-bold text-lg leading-tight">{currentTrackData.name}</h3>
            <p className="text-white/80 text-sm">{currentTrackData.artist}</p>
            <p className="text-white/60 text-xs">{currentTrackData.genre} • {currentTrackData.key} • {currentTrackData.bpm} BPM</p>
            <p className="text-white/40 text-xs mt-1">{currentTrackData.synthesis} synthesis</p>
          </div>
        </div>

        {/* Información detallada del track */}
        {showTrackInfo && (
          <div className="mb-4 p-4 bg-gradient-to-br from-white/5 to-purple-500/10 rounded-lg border border-purple-500/20">
            <h4 className="text-white/80 text-sm font-medium mb-2 flex items-center">
              <Radio className="w-4 h-4 mr-2" />
              Track Information
            </h4>
            <div className="space-y-2 text-xs">
              <p className="text-white/70"><span className="text-white/40">Description:</span> {currentTrackData.description}</p>
              <p className="text-white/70"><span className="text-white/40">Structure:</span> {currentTrackData.structure}</p>
              <p className="text-white/70"><span className="text-white/40">Key/Tempo:</span> {currentTrackData.key} at {currentTrackData.bpm} BPM</p>
              <p className="text-white/70"><span className="text-white/40">Duration:</span> {currentTrackData.duration}</p>
            </div>
          </div>
        )}

        {/* Controles avanzados */}
        {showAdvancedControls && (
          <div className="mb-4 p-4 bg-gradient-to-br from-white/5 to-purple-500/10 rounded-lg border border-purple-500/20">
            <h4 className="text-white/80 text-sm font-medium mb-3 flex items-center">
              <Sliders className="w-4 h-4 mr-2" />
              Professional Audio Controls
            </h4>
            <div className="grid grid-cols-2 gap-3">
              {Object.entries(audioParams).map(([param, value]) => (
                <div key={param} className="space-y-1">
                  <label className="text-white/60 text-xs uppercase tracking-wider font-mono">
                    {param}
                  </label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="range"
                      min="0"
                      max="100"
                      value={value}
                      onChange={(e) => handleParameterChange(param, parseInt(e.target.value))}
                      className="flex-1 h-2 bg-white/10 rounded-full appearance-none slider-thumb"
                    />
                    <span className="text-white/60 text-xs w-8 text-right font-mono">
                      {value}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Barra de progreso */}
        <div className="mb-4">
          <div 
            className="w-full h-3 bg-white/10 rounded-full cursor-pointer overflow-hidden group"
            onClick={handleProgressClick}
          >
            <div 
              className={`h-full bg-gradient-to-r ${currentTrackData.color} transition-all duration-150 ease-linear relative`}
              style={{ width: `${progress}%` }}
            >
              <div className="absolute right-0 top-0 w-3 h-3 bg-white rounded-full shadow-lg transform translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            </div>
          </div>
          <div className="flex justify-between text-white/60 text-xs mt-2 font-mono">
            <span>{formatTime(currentTime)}</span>
            <span className="text-white/40">{currentTrack + 1} / {tracks.length}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-center space-x-4 mb-4">
          <button
            onClick={() => setIsShuffled(!isShuffled)}
            className={`p-3 rounded-full transition-all ${isShuffled ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' : 'text-white/60 hover:text-white hover:bg-white/10'}`}
            title="Shuffle"
          >
            <Shuffle className="w-5 h-5" />
          </button>
          <button
            onClick={handlePrevious}
            className="text-white/70 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Previous"
          >
            <SkipBack className="w-6 h-6" />
          </button>
          <button
            onClick={handlePlay}
            className={`bg-gradient-to-r ${currentTrackData.color} text-white p-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
            title={isPlaying ? "Pause" : "Play"}
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </button>
          <button
            onClick={handleNext}
            className="text-white/70 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Next"
          >
            <SkipForward className="w-6 h-6" />
          </button>
          <button
            onClick={handleStop}
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Stop"
          >
            <Square className="w-5 h-5" />
          </button>
        </div>

        {/* Control de volumen */}
        <div 
          className="flex items-center space-x-3 mb-4"
          onMouseEnter={handleVolumeMouseEnter}
          onMouseLeave={handleVolumeMouseLeave}
        >
          <Volume2 className="w-5 h-5 text-white/60" />
          <div className={`flex-1 transition-all duration-300 ${isVolumeVisible ? 'opacity-100' : 'opacity-30'}`}>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none slider-thumb"
            />
          </div>
          <span className="text-white/60 text-sm w-8 text-right font-mono">{volume}</span>
        </div>

        {/* Lista de tracks */}
        <div className="max-h-48 overflow-y-auto custom-scrollbar">
          <h4 className="text-white/60 text-sm font-medium mb-2 flex items-center">
            <Music className="w-4 h-4 mr-2" />
            Professional Soundtrack
          </h4>
          <div className="space-y-1">
            {tracks.map((track, index) => (
              <div
                key={track.id}
                onClick={() => handleTrackSelect(index)}
                className={`flex items-center space-x-3 p-3 rounded-lg cursor-pointer transition-all ${
                  index === currentTrack 
                    ? `bg-gradient-to-r ${track.color} bg-opacity-20 border border-purple-500/30 shadow-lg` 
                    : 'hover:bg-white/5'
                }`}
              >
                <div className={`flex items-center justify-center w-10 h-10 rounded-lg bg-gradient-to-br ${track.color} text-white text-xs font-bold shadow-lg`}>
                  {index + 1}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-sm font-medium truncate">{track.name}</p>
                  <p className="text-white/60 text-xs truncate">{track.artist}</p>
                  <p className="text-white/40 text-xs">{track.genre} • {track.key} • {track.bpm} BPM</p>
                </div>
                <div className="text-right">
                  <span className="text-white/40 text-xs font-mono">{track.duration}</span>
                  <p className="text-white/30 text-xs">{track.synthesis}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

// Estilos CSS adicionales para los sliders profesionales
const style = document.createElement('style');
style.textContent = `
  .slider-thumb::-webkit-slider-thumb {
    appearance: none;
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
    transition: all 0.2s ease;
  }
  
  .slider-thumb::-webkit-slider-thumb:hover {
    width: 20px;
    height: 20px;
    box-shadow: 0 6px 16px rgba(139, 92, 246, 0.6);
  }
  
  .slider-thumb::-moz-range-thumb {
    width: 18px;
    height: 18px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.4);
  }
  
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.6) transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 8px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: rgba(255, 255, 255, 0.05);
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.6), rgba(59, 130, 246, 0.6));
    border-radius: 4px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: linear-gradient(135deg, rgba(139, 92, 246, 0.8), rgba(59, 130, 246, 0.8));
  }
`;
document.head.appendChild(style);

export default ReproductorMIDI;
