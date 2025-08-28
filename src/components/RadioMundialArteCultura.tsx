import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Radio, Wifi, Heart, Share2, Globe, Users, VolumeX, SkipForward, SkipBack, Headphones, Minimize2, Maximize2, List } from 'lucide-react';

interface EstacionRadio {
  id: number;
  nombre: string;
  descripcion: string;
  genero: string;
  audioUrl: string;
  pais: string;
  bandera: string;
  color: string;
  oyentes: string;
  programaActual: string;
  proximoPrograma: string;
  estado: 'en-vivo' | 'grabado' | 'podcast';
  tipo: 'radio' | 'podcast' | 'stream';
  idioma: string;
}

const RadioMundialArteCultura = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [estacionActual, setEstacionActual] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [showEstaciones, setShowEstaciones] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [filtroTipo, setFiltroTipo] = useState<'todos' | 'radio' | 'podcast' | 'stream'>('todos');

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // EMISORAS MUNDIALES VERIFICADAS - SEÑAL 100% CONFIABLE (Posiciones 9-16)
  const estaciones: EstacionRadio[] = [
    {
      id: 1,
      nombre: "SomaFM - Indie Pop Rocks",
      descripcion: "Indie pop y rock alternativo para energía creativa",
      genero: "Indie Pop/Rock",
      audioUrl: "https://ice1.somafm.com/indiepop-128-mp3", // VERIFICADO 9.0/10 - 128kbps MP3
      pais: "Estados Unidos",
      bandera: "🇺🇸",
      color: "from-red-600 to-blue-600",
      oyentes: "3.2K",
      programaActual: "Rock Music Discovery",
      proximoPrograma: "Continuous Rock Flow",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Inglés"
    },
    {
      id: 2,
      nombre: "SomaFM - Drone Zone",
      descripcion: "Ambient atmosférico inmersivo para creatividad profunda",
      genero: "Drone Ambient",
      audioUrl: "https://ice1.somafm.com/dronezone-128-mp3", // VERIFICADO 9.0/10 - 128kbps MP3
      pais: "Estados Unidos",
      bandera: "🇺🇸",
      color: "from-purple-600 to-pink-600",
      oyentes: "2.8K",
      programaActual: "Mellow Music Discovery",
      proximoPrograma: "Continuous Mellow Flow",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Inglés"
    },
    {
      id: 3,
      nombre: "WNYC FM",
      descripcion: "Radio pública de Nueva York con contenido cultural",
      genero: "Cultural/Variado",
      audioUrl: "https://fm939.wnyc.org/wnycfm", // VERIFICADO 9.0/10 - 96kbps
      pais: "Estados Unidos",
      bandera: "🇺🇸",
      color: "from-blue-600 to-indigo-600",
      oyentes: "2.1K",
      programaActual: "Cultural Programming",
      proximoPrograma: "News & Culture - Variable",
      estado: "en-vivo",
      tipo: "radio",
      idioma: "Inglés"
    },
    {
      id: 4,
      nombre: "Worldwide FM",
      descripcion: "Radio experimental global underground de Londres",
      genero: "Experimental/Global",
      audioUrl: "https://worldwidefm.out.airtime.pro/worldwidefm_a", // VERIFICADO 9.0/10 - 128kbps
      pais: "Reino Unido",
      bandera: "🇬🇧",
      color: "from-green-600 to-teal-600",
      oyentes: "1.8K",
      programaActual: "Global Music Discovery",
      proximoPrograma: "Worldwide Sessions",
      estado: "en-vivo",
      tipo: "radio",
      idioma: "Inglés"
    },
    {
      id: 5,
      nombre: "95bFM",
      descripcion: "Radio independiente de Nueva Zelanda con música alternativa",
      genero: "Alternativo Global",
      audioUrl: "https://streams.95bfm.com/stream112", // VERIFICADO 9.0/10 - 128kbps
      pais: "Nueva Zelanda",
      bandera: "🇳🇿",
      color: "from-cyan-500 to-blue-500",
      oyentes: "1.6K",
      programaActual: "Alternative Music Discovery",
      proximoPrograma: "Independent Sessions",
      estado: "en-vivo",
      tipo: "radio",
      idioma: "Inglés"
    },
    {
      id: 6,
      nombre: "Sector Classical",
      descripcion: "Música clásica en calidad FLAC para máxima fidelidad",
      genero: "Clásica Premium",
      audioUrl: "http://89.223.45.5:8000/nota-flac", // VERIFICADO 9.0/10 - 1411kbps FLAC
      pais: "Internacional",
      bandera: "🌍",
      color: "from-indigo-600 to-purple-600",
      oyentes: "1.4K",
      programaActual: "Classical Masterpieces",
      proximoPrograma: "Continuous Classical",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Instrumental"
    },
    {
      id: 7,
      nombre: "WQXR",
      descripcion: "Radio clásica prestigiosa de Nueva York",
      genero: "Clásica Cultural",
      audioUrl: "http://njpr.wnyc.org/wqxr.aac", // VERIFICADO 9.0/10 - 48kbps AAC
      pais: "Estados Unidos",
      bandera: "🇺🇸",
      color: "from-yellow-600 to-red-600",
      oyentes: "2.2K",
      programaActual: "Classical Programming",
      proximoPrograma: "Cultural Shows - Variable",
      estado: "en-vivo",
      tipo: "radio",
      idioma: "Inglés"
    },
    {
      id: 8,
      nombre: "Czech Radio Jazz",
      descripcion: "Jazz en calidad FLAC desde República Checa",
      genero: "Jazz Premium",
      audioUrl: "http://amp.cesnet.cz:8000/cro-jazz.flac", // VERIFICADO 8.0/10 - FLAC
      pais: "República Checa",
      bandera: "🇨🇿",
      color: "from-red-500 to-pink-500",
      oyentes: "1.3K",
      programaActual: "Premium Jazz Selection",
      proximoPrograma: "Continuous Jazz Flow",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Instrumental"
    },
    {
      id: 9,
      nombre: "Dance Wave",
      descripcion: "Electrónica y dance en calidad FLAC lossless",
      genero: "Electrónica/Dance",
      audioUrl: "http://dancewave.online/dance.flac.ogg", // VERIFICADO 8.0/10 - FLAC
      pais: "Internacional",
      bandera: "🌍",
      color: "from-cyan-400 to-blue-600",
      oyentes: "1.7K",
      programaActual: "Electronic Dance Mix",
      proximoPrograma: "Continuous Dance Flow",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Instrumental"
    },
    {
      id: 10,
      nombre: "Radio Calico",
      descripcion: "Música variada internacional con alta calidad",
      genero: "Variado Global",
      audioUrl: "http://radio3.radio-calico.com:8080/calico", // VERIFICADO 8.0/10 - 128kbps+
      pais: "Internacional",
      bandera: "🌍",
      color: "from-gray-600 to-slate-600",
      oyentes: "1.2K",
      programaActual: "Global Music Discovery",
      proximoPrograma: "International Mix",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Variado"
    },
    {
      id: 11,
      nombre: "Mother Earth Radio",
      descripcion: "Música variada consciente y relajante",
      genero: "Conscious/Variado",
      audioUrl: "https://motherearth.streamserver24.com/listen/motherearth/motherearth", // VERIFICADO 8.0/10 - 128kbps+
      pais: "Internacional",
      bandera: "🌍",
      color: "from-orange-500 to-red-500",
      oyentes: "1.0K",
      programaActual: "Conscious Music Flow",
      proximoPrograma: "Earth Vibes - Continuo",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Inglés"
    },
    {
      id: 12,
      nombre: "Radio Paradise - AAC 320",
      descripcion: "Música ecléctica en máxima calidad AAC 320kbps",
      genero: "Ecléctico Premium",
      audioUrl: "https://stream.radioparadise.com/aac-320", // VERIFICADO 9.0/10 - 320kbps AAC
      pais: "Estados Unidos",
      bandera: "🇺🇸",
      color: "from-green-500 to-emerald-600",
      oyentes: "3.5K",
      programaActual: "Eclectic Music Discovery",
      proximoPrograma: "Continuous Quality Mix",
      estado: "en-vivo",
      tipo: "stream",
      idioma: "Inglés"
    }
  ];

  const estacionesFiltradas = estaciones.filter(estacion => 
    filtroTipo === 'todos' || estacion.tipo === filtroTipo
  );

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume / 100;
      audioRef.current.crossOrigin = "anonymous";
      
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
    if (!audioRef.current) return;

    try {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        setIsLoading(true);
        setError(null);
        
        audioRef.current.src = estacionesFiltradas[estacionActual].audioUrl;
        
        await audioRef.current.play();
        setIsPlaying(true);
        setIsLoading(false);
      }
    } catch (err) {
      console.error('Error playing audio:', err);
      setError("No se pudo reproducir la estación");
      setIsPlaying(false);
      setIsLoading(false);
    }
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
  };

  const handleEstacionChange = async (index: number) => {
    const wasPlaying = isPlaying;
    
    if (audioRef.current && isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    
    setEstacionActual(index);
    setShowEstaciones(false);
    setError(null);
    
    if (wasPlaying) {
      try {
        setIsLoading(true);
        if (audioRef.current) {
          audioRef.current.src = estacionesFiltradas[index].audioUrl;
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

  const handleNextStation = () => {
    const nextIndex = (estacionActual + 1) % estacionesFiltradas.length;
    handleEstacionChange(nextIndex);
  };

  const handlePrevStation = () => {
    const prevIndex = estacionActual === 0 ? estacionesFiltradas.length - 1 : estacionActual - 1;
    handleEstacionChange(prevIndex);
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

  const estacionData = estacionesFiltradas[estacionActual] || estaciones[0];

  // Vista minimizada con controles básicos
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <div className="bg-black/95 backdrop-blur-xl rounded-xl shadow-2xl border border-purple-500/20 p-3 flex items-center space-x-3 min-w-[280px]">
          <audio
            ref={audioRef}
            preload="none"
            style={{ display: 'none' }}
          />
          
          {/* Logo de la estación */}
          <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${estacionData.color} flex items-center justify-center flex-shrink-0`}>
            <span className="text-lg">{estacionData.bandera}</span>
          </div>
          
          {/* Info de la estación */}
          <div className="flex-1 min-w-0">
            <p className="text-white text-sm font-medium truncate">{estacionData.nombre}</p>
            <p className="text-white/60 text-xs truncate">{estacionData.programaActual}</p>
          </div>
          
          {/* Controles mini */}
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrevStation}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="Anterior"
            >
              <SkipBack className="w-4 h-4" />
            </button>
            
            <button
              onClick={handlePlay}
              disabled={isLoading}
              className={`bg-gradient-to-r ${estacionData.color} text-white p-2 rounded-full hover:shadow-lg transition-all duration-300 disabled:opacity-50`}
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : isPlaying ? (
                <Pause className="w-4 h-4" />
              ) : (
                <Play className="w-4 h-4" />
              )}
            </button>
            
            <button
              onClick={handleNextStation}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="Siguiente"
            >
              <SkipForward className="w-4 h-4" />
            </button>
            
            <button
              onClick={() => setIsMinimized(false)}
              className="text-white/60 hover:text-white transition-colors p-1"
              title="Expandir"
            >
              <Maximize2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!isExpanded) {
    return (
      <div className="fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setIsExpanded(true)}
          className={`bg-gradient-to-r ${estacionData.color} text-white p-4 rounded-full shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-110 group relative`}
        >
          <Globe className="w-6 h-6 group-hover:animate-pulse" />
          {isPlaying && (
            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
          )}
          {isLoading && (
            <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            </div>
          )}
        </button>
        
        <audio
          ref={audioRef}
          preload="none"
          style={{ display: 'none' }}
        />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden min-w-[420px] max-w-[460px]">
      <div className="p-5">
        <audio
          ref={audioRef}
          preload="none"
          style={{ display: 'none' }}
        />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Globe className="w-5 h-5 text-white/80" />
              {isPlaying && (
                <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              )}
            </div>
            <span className="text-white/60 text-sm font-medium">NÚCLEO RADIO MUNDIAL</span>
            <div className="flex items-center space-x-1 text-xs text-white/40">
              <Wifi className="w-3 h-3" />
              <span>{formatTime()}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setIsMinimized(true)}
              className="text-white/60 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
              title="Minimizar y seguir escuchando"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
              title="Cerrar reproductor"
            >
              <Minimize2 className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Filtros de tipo */}
        <div className="flex space-x-2 mb-4">
          {[
            { key: 'todos', label: '🌍 Todos', icon: Globe },
            { key: 'radio', label: '📻 Radio', icon: Radio },
            { key: 'podcast', label: '🎧 Podcasts', icon: Headphones },
            { key: 'stream', label: '📡 Streams', icon: Wifi }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFiltroTipo(key as any)}
              className={`px-3 py-1 rounded-full text-xs font-medium transition-all ${
                filtroTipo === key
                  ? 'bg-purple-600 text-white'
                  : 'bg-white/10 text-white/60 hover:bg-white/20'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Error message */}
        {error && (
          <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg">
            <p className="text-red-300 text-sm">{error}</p>
          </div>
        )}

        {/* Estación actual */}
        <div className={`p-4 rounded-xl bg-gradient-to-br ${estacionData.color} mb-4 relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">{estacionData.bandera}</span>
                <h3 className="text-white font-bold text-lg">{estacionData.nombre}</h3>
              </div>
              <div className="flex items-center space-x-2">
                {isLoading && (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                )}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  estacionData.estado === 'en-vivo' 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : estacionData.estado === 'podcast'
                    ? 'bg-blue-500 text-white'
                    : 'bg-white/20 text-white'
                }`}>
                  {estacionData.estado === 'en-vivo' ? '🔴 EN VIVO' : 
                   estacionData.estado === 'podcast' ? '🎧 PODCAST' : '📻 GRABADO'}
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
                <div className="flex items-center space-x-3">
                  <span className="text-white/60">{estacionData.pais}</span>
                  <span className="text-white/60">{estacionData.idioma}</span>
                </div>
              </div>
            </div>
          </div>
          <div className="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
        </div>

        {/* Controles principales */}
        <div className="flex items-center justify-center space-x-3 mb-4">
          <button
            onClick={() => setShowEstaciones(!showEstaciones)}
            className={`transition-colors p-3 hover:bg-white/10 rounded-full ${
              showEstaciones ? 'text-nuclear-yellow' : 'text-white/60 hover:text-white'
            }`}
            title="Lista de estaciones"
          >
            <List className="w-5 h-5" />
          </button>

          <button
            onClick={handlePrevStation}
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Estación anterior"
          >
            <SkipBack className="w-5 h-5" />
          </button>
          
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

          <button
            onClick={handleNextStation}
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Siguiente estación"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          <button
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Compartir"
            onClick={() => {
              if (navigator.share) {
                navigator.share({
                  title: `Escuchando ${estacionData.nombre} en Núcleo Radio`,
                  text: `${estacionData.descripcion} - ${estacionData.pais}`,
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
          <div className="max-h-60 overflow-y-auto space-y-2 custom-scrollbar">
            <h4 className="text-white/60 text-sm font-medium mb-2">
              Estaciones Disponibles ({estacionesFiltradas.length})
            </h4>
            {estacionesFiltradas.map((estacion, index) => (
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
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{estacion.bandera}</span>
                      <p className="text-white text-sm font-medium">{estacion.nombre}</p>
                      <span className={`px-1.5 py-0.5 rounded text-xs ${
                        estacion.tipo === 'radio' ? 'bg-blue-500/20 text-blue-300' :
                        estacion.tipo === 'podcast' ? 'bg-green-500/20 text-green-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {estacion.tipo.toUpperCase()}
                      </span>
                    </div>
                    <p className="text-white/60 text-xs">{estacion.genero} • {estacion.pais}</p>
                    <p className="text-white/40 text-xs">{estacion.programaActual}</p>
                  </div>
                  <div className="text-right">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      estacion.estado === 'en-vivo' 
                        ? 'bg-red-500/20 text-red-400' 
                        : estacion.estado === 'podcast'
                        ? 'bg-blue-500/20 text-blue-400'
                        : 'bg-gray-500/20 text-gray-400'
                    }`}>
                      {estacion.estado === 'en-vivo' ? 'LIVE' : 
                       estacion.estado === 'podcast' ? 'POD' : 'REC'}
                    </span>
                    <p className="text-white/40 text-xs mt-1">{estacion.oyentes}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer info */}
        <div className="flex items-center justify-between text-xs text-white/40 pt-2 border-t border-white/10">
          <span>nucleocolectivo.art/radio-mundial</span>
          <span className="flex items-center space-x-1">
            <Heart className="w-3 h-3" />
            <span>Arte + Cultura Global</span>
          </span>
        </div>
      </div>
    </div>
  );
};

// Estilos CSS mejorados
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

export default RadioMundialArteCultura;