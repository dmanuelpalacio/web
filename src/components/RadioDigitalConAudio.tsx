import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Radio, Wifi, Heart, Share2, List, Users, VolumeX, SkipBack, SkipForward, Minimize2 } from 'lucide-react';

interface EstacionRadio {
  id: number;
  nombre: string;
  descripcion: string;
  genero: string;
  audioUrl: string; // URL real de audio
  color: string;
  oyentes: string;
  programaActual: string;
  proximoPrograma: string;
  estado: 'en-vivo' | 'grabado' | 'proximo';
}

const RadioDigitalConAudio = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [estacionActual, setEstacionActual] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [showEstaciones, setShowEstaciones] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // EMISORAS SELECCIONADAS - NTS RADIO Y RADIO FRANCE CULTURE
  const estaciones: EstacionRadio[] = [
    {
      id: 1,
      nombre: "🇬🇧 NTS Radio",
      descripcion: "Radio underground global con arte y música experimental",
      genero: "Experimental",
      audioUrl: "https://stream-relay-geo.ntslive.net/stream", // VERIFICADO 9.0/10 - MP3 Stream
      color: "from-purple-600 to-blue-600",
      oyentes: "1.8K",
      programaActual: "Underground Sounds",
      proximoPrograma: "Global Music Discovery",
      estado: "en-vivo"
    },
    {
      id: 2,
      nombre: "🇫🇷 Radio France Culture",
      descripcion: "Cultura, filosofía y arte contemporáneo francés",
      genero: "Cultura/Arte",
      audioUrl: "https://icecast.radiofrance.fr/franceculture-midfi.mp3", // Radio France Culture MP3 Stream
      color: "from-red-500 to-blue-500",
      oyentes: "2.1K",
      programaActual: "Les Regardeurs",
      proximoPrograma: "Création on Air - 20:30",
      estado: "en-vivo"
    }
  ];

  // Inicializar el audio cuando se monta el componente
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.crossOrigin = "anonymous";
      
      // Event listeners para el audio
      const audio = audioRef.current;
      
      const handleLoadStart = () => setIsLoading(true);
      const handleCanPlay = () => {
        setIsLoading(false);
        setError(null);
      };
      const handleError = () => {
        setIsLoading(false);
        setError("Error al cargar la estación");
        setIsPlaying(false);
      };
      const handleLoadedData = () => {
        setIsLoading(false);
        setError(null);
      };

      audio.addEventListener('loadstart', handleLoadStart);
      audio.addEventListener('canplay', handleCanPlay);
      audio.addEventListener('error', handleError);
      audio.addEventListener('loadeddata', handleLoadedData);

      return () => {
        audio.removeEventListener('loadstart', handleLoadStart);
        audio.removeEventListener('canplay', handleCanPlay);
        audio.removeEventListener('error', handleError);
        audio.removeEventListener('loadeddata', handleLoadedData);
      };
    }
  }, [volume]);

  // Cambiar el volumen cuando se actualiza
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
    }
  }, [volume]);

  const formatTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handlePlay = async () => {
    if (!audioRef.current) {
      console.error('Audio element not available');
      setError("Error: Elemento de audio no disponible");
      return;
    }

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        const currentStation = estaciones[estacionActual];
        console.log('Attempting to play:', currentStation.nombre, currentStation.audioUrl);
        
        // Cargar la URL de la estación actual
        audioRef.current.src = currentStation.audioUrl;
        audioRef.current.load(); // Forzar recarga del stream
        
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
        console.log('Successfully started playing:', currentStation.nombre);
      }
    } catch (err: any) {
      console.error('Error playing audio:', err);
      let errorMessage = "No se pudo reproducir la estación";
      
      if (err.name === 'NotAllowedError') {
        errorMessage = "🔊 Haz clic de nuevo para activar audio";
      } else if (err.name === 'NotSupportedError') {
        errorMessage = "❌ Formato de audio no soportado - Cambiando estación...";
        // Cambiar automáticamente a la siguiente estación
        setTimeout(() => handleNextStation(), 2000);
      } else if (err.name === 'AbortError') {
        errorMessage = "⏸️ Carga de audio interrumpida";
      } else if (err.name === 'NetworkError') {
        errorMessage = "Error de conexión de red";
      }
      
      setError(errorMessage);
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleEstacionChange = async (index: number) => {
    const wasPlaying = isPlaying;
    
    // Pausar audio actual
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    setEstacionActual(index);
    setShowEstaciones(false);
    setError(null);
    
    // Si estaba reproduciendo, cambiar a la nueva estación
    if (wasPlaying) {
      try {
        setIsLoading(true);
        if (audioRef.current) {
          audioRef.current.src = estaciones[index].audioUrl;
          await audioRef.current.play();
          setIsPlaying(true);
        }
      } catch (err) {
        console.error('Error changing station:', err);
        setError("Error al cambiar de estación");
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handlePreviousStation = () => {
    const newIndex = estacionActual > 0 ? estacionActual - 1 : estaciones.length - 1;
    handleEstacionChange(newIndex);
  };

  const handleNextStation = () => {
    const newIndex = estacionActual < estaciones.length - 1 ? estacionActual + 1 : 0;
    handleEstacionChange(newIndex);
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

  const estacionData = estaciones[estacionActual];

  // Elemento audio único fuera de los estados condicionales
  const audioElement = (
    <audio
      ref={audioRef}
      preload="none"
      crossOrigin="anonymous"
      controls={false}
      autoPlay={false}
      style={{ display: 'none' }}
      onError={(e) => {
        console.error('🚨 Audio error:', e);
        setError("❌ Error al cargar stream - Probando otra estación...");
        setIsLoading(false);
        setIsPlaying(false);
        // Cambiar automáticamente a la siguiente estación si hay error
        setTimeout(() => handleNextStation(), 3000);
      }}
      onLoadStart={() => {
        console.log('🔄 Audio load started for:', estaciones[estacionActual]?.nombre);
        setIsLoading(true);
      }}
      onCanPlay={() => {
        console.log('✅ Audio ready to play:', estaciones[estacionActual]?.nombre);
        setIsLoading(false);
        setError(null);
      }}
      onPlay={() => {
        console.log('🎵 Audio started playing:', estaciones[estacionActual]?.nombre);
        setIsPlaying(true);
        setIsLoading(false);
        setError(null);
      }}
      onPause={() => {
        console.log('⏸️ Audio paused');
        setIsPlaying(false);
      }}
      onLoadedData={() => {
        console.log('📡 Stream data loaded successfully');
      }}
      onPlaying={() => {
        console.log('🔊 Audio is now playing and can be heard');
        setIsPlaying(true);
        setError(null);
      }}
      onWaiting={() => {
        console.log('⏳ Audio buffering...');
        setIsLoading(true);
      }}
      onCanPlayThrough={() => {
        console.log('🚀 Audio fully loaded and ready');
        setIsLoading(false);
      }}
    />
  );

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className={`bg-gradient-to-r ${estacionData.color} text-white p-4 rounded-full shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-110 group relative`}
        >
          <Radio className="w-6 h-6 group-hover:animate-pulse" />
          {isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
        
        {/* Renderizar audio element único */}
        {audioElement}
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden min-w-[380px] max-w-[420px]">
      <div className="p-5">
        {/* Renderizar audio element único */}
        {audioElement}
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Radio className="w-5 h-5 text-white/80" />
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-white/60 text-sm font-medium">NÚCLEO RADIO</span>
            <div className="flex items-center space-x-1 text-xs text-white/40">
              <Wifi className="w-3 h-3" />
              <span>{formatTime()}</span>
            </div>
          </div>
          <button
            onClick={() => setIsExpanded(false)}
            className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            title="Minimizar reproductor"
          >
            <Minimize2 className="w-4 h-4" />
          </button>
        </div>

        {/* Status messages */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg animate-pulse">
            <p className="text-red-300 text-sm font-medium">{error}</p>
          </div>
        )}
        
        {isPlaying && !error && (
          <div className="mb-4 p-3 bg-green-500/20 border border-green-500/30 rounded-lg">
            <p className="text-green-300 text-sm font-medium flex items-center">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse mr-2"></span>
              🎵 Audio reproduciéndose correctamente
            </p>
          </div>
        )}
        
        {!isPlaying && !error && !isLoading && (
          <div className="mb-4 p-3 bg-blue-500/20 border border-blue-500/30 rounded-lg">
            <p className="text-blue-300 text-sm">
              🎧 Haz clic en ▶️ para empezar a escuchar
            </p>
          </div>
        )}

        {/* Estación actual */}
        <div className={`p-4 rounded-xl bg-gradient-to-br ${estacionData.color} mb-4 relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-bold text-lg">{estacionData.nombre}</h3>
              <div className="flex items-center space-x-2">
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span className={`px-3 py-1 rounded-full text-xs font-bold border-2 transition-all duration-300 ${
                  estacionData.estado === 'en-vivo' 
                    ? isPlaying 
                      ? 'bg-red-500 text-white animate-pulse border-red-300 shadow-lg shadow-red-500/50' 
                      : 'bg-red-500/80 text-white border-red-400'
                    : 'bg-white/20 text-white border-white/30'
                }`}>
                  {estacionData.estado === 'en-vivo' 
                    ? isPlaying 
                      ? '🔴 SONANDO AHORA' 
                      : '🔴 EN VIVO'
                    : '📻 GRABADO'
                  }
                </span>
              </div>
            </div>
            <p className="text-white/90 text-sm mb-2">{estacionData.descripcion}</p>
            <div className="text-white/80 text-xs space-y-1">
              <p><strong>Ahora:</strong> {estacionData.programaActual}</p>
              <p><strong>Próximo:</strong> {estacionData.proximoPrograma}</p>
              <div className="flex items-center justify-between mt-2">
                <span className="flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>{estacionData.oyentes} oyentes</span>
                </span>
                <span className="text-white/60">{estacionData.genero}</span>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          {/* Estación anterior */}
          <button
            onClick={handlePreviousStation}
            disabled={isLoading}
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            title="Estación anterior"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
          {/* Lista de estaciones */}
          <button
            onClick={() => setShowEstaciones(!showEstaciones)}
            className={`transition-colors p-3 hover:bg-white/10 rounded-full ${
              showEstaciones ? 'text-nuclear-yellow' : 'text-white/60 hover:text-white'
            }`}
            title="Lista de estaciones"
          >
            <List className="w-5 h-5" />
          </button>
          
          {/* Play/Pause */}
          <button
            onClick={handlePlay}
            disabled={isLoading}
            className={`bg-gradient-to-r ${estacionData.color} text-white p-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isLoading ? (
              <div className="w-7 h-7 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
            ) : isPlaying ? (
              <Pause className="w-7 h-7" />
            ) : (
              <Play className="w-7 h-7" />
            )}
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </button>

          {/* Estación siguiente */}
          <button
            onClick={handleNextStation}
            disabled={isLoading}
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full disabled:opacity-50 disabled:cursor-not-allowed"
            title="Estación siguiente"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Compartir */}
          <button
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Compartir"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Escuchando ${estacionData.nombre} en Núcleo Radio`,
                  text: estacionData.descripcion,
                  url: window.location.href
                });
              }
            }}
          >
            <Share2 className="w-5 h-5" />
          </button>
        </div>

        {/* Control de volumen */}
        <div 
          className="flex items-center space-x-3 mb-4"
          onMouseEnter={handleVolumeMouseEnter}
          onMouseLeave={handleVolumeMouseLeave}
        >
          {volume === 0 ? (
            <VolumeX className="w-4 h-4 text-white/60" />
          ) : (
            <Volume2 className="w-4 h-4 text-white/60" />
          )}
          <div className={`flex-1 transition-all duration-300 ${isVolumeVisible ? 'opacity-100' : 'opacity-30'}`}>
            <input
              type="range"
              min="0"
              max="100"
              value={volume}
              onChange={(e) => handleVolumeChange(parseInt(e.target.value))}
              className="w-full h-2 bg-white/10 rounded-full appearance-none radio-slider"
            />
          </div>
          <span className="text-white/60 text-sm w-8 text-right font-mono">{volume}</span>
        </div>

        {/* Lista de estaciones */}
        {showEstaciones && (
          <div className="max-h-48 overflow-y-auto space-y-2 custom-scrollbar">
            <h4 className="text-white/60 text-sm font-medium mb-2">Estaciones Disponibles</h4>
            {estaciones.map((estacion, index) => (
              <div
                key={estacion.id}
                onClick={() => handleEstacionChange(index)}
                className={`p-3 rounded-lg cursor-pointer transition-all ${
                  index === estacionActual 
                    ? `bg-gradient-to-r ${estacion.color} bg-opacity-20 border border-purple-500/30` 
                    : 'hover:bg-white/5 border border-transparent'
                } border`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <p className="text-white text-sm font-medium">{estacion.nombre}</p>
                    <p className="text-white/60 text-xs">{estacion.genero}</p>
                    <p className="text-white/40 text-xs">{estacion.programaActual}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      estacion.estado === 'en-vivo' 
                        ? 'bg-red-500/20 text-red-400' 
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {estacion.estado === 'en-vivo' ? 'LIVE' : 'REC'}
                    </span>
                    <p className="text-white/40 text-xs mt-1">{estacion.oyentes} oyentes</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/10">
          <span>nucleocolectivo.art/radio</span>
          <span className="flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>Arte + IA</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Estilos CSS para el radio slider
const style = document.createElement('style');
style.textContent = `
  .radio-slider::-webkit-slider-thumb {
    appearance: none;
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    cursor: pointer;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
    transition: all 0.2s ease;
  }
  
  .radio-slider::-webkit-slider-thumb:hover {
    width: 18px;
    height: 18px;
    box-shadow: 0 4px 12px rgba(139, 92, 246, 0.6);
  }
  
  .radio-slider::-moz-range-thumb {
    width: 16px;
    height: 16px;
    background: linear-gradient(135deg, #8b5cf6, #3b82f6);
    border-radius: 50%;
    cursor: pointer;
    border: none;
    box-shadow: 0 2px 8px rgba(139, 92, 246, 0.4);
  }
  
  .custom-scrollbar {
    scrollbar-width: thin;
    scrollbar-color: rgba(139, 92, 246, 0.5) transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar {
    width: 6px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-track {
    background: transparent;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb {
    background: rgba(139, 92, 246, 0.5);
    border-radius: 3px;
  }
  
  .custom-scrollbar::-webkit-scrollbar-thumb:hover {
    background: rgba(139, 92, 246, 0.7);
  }
`;
document.head.appendChild(style);

export default RadioDigitalConAudio;
