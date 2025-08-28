import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, Radio, Wifi, Heart, Share2, List, Users, SkipBack, SkipForward, Minimize2 } from 'lucide-react';

interface EstacionRadio {
  id: number;
  nombre: string;
  descripcion: string;
  genero: string;
  url: string; // URL del stream (en un caso real)
  color: string;
  oyentes: string;
  programaActual: string;
  proximoPrograma: string;
  estado: 'en-vivo' | 'grabado' | 'proximo';
}

const RadioDigital = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(70);
  const [estacionActual, setEstacionActual] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVolumeVisible, setIsVolumeVisible] = useState(false);
  const [showEstaciones, setShowEstaciones] = useState(false);

  const volumeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  // ESTACIONES DIGITALES VERIFICADAS - ÚLTIMAS 4 DE TOP 20 (17-20)
  const estaciones: EstacionRadio[] = [
    {
      id: 1,
      nombre: "Núcleo Arte - Groove Salad",
      descripcion: "Música downtempo premium para creatividad y concentración",
      genero: "Downtempo/Chill",
      url: "https://ice1.somafm.com/groovesalad-128-mp3", // VERIFICADO 9.5/10 - MP3 128kbps
      color: "from-purple-600 to-blue-600",
      oyentes: "4.2K",
      programaActual: "Eclectic Music Discovery",
      proximoPrograma: "Continuous Creative Flow",
      estado: "en-vivo"
    },
    {
      id: 2,
      nombre: "IA Creativa - NTS Radio",
      descripcion: "Radio experimental global underground para explorar nuevos sonidos",
      genero: "Experimental/Global",
      url: "https://stream-relay-geo.ntslive.net/stream", // VERIFICADO 9.0/10 - 256kbps
      color: "from-cyan-500 to-indigo-500",
      oyentes: "2.6K",
      programaActual: "Infinite Music Discovery",
      proximoPrograma: "Global Experimental Sessions",
      estado: "en-vivo"
    },
    {
      id: 3,
      nombre: "Talleres Live - Deep Space",
      descripcion: "Ambient espacial profundo para concentración en talleres",
      genero: "Deep Ambient",
      url: "https://ice1.somafm.com/deepspaceone-128-mp3", // VERIFICADO 9.0/10 - 128kbps MP3
      color: "from-green-500 to-teal-500",
      oyentes: "1.8K",
      programaActual: "Deep Space Ambient",
      proximoPrograma: "Cosmic Contemplation",
      estado: "en-vivo"
    },
    {
      id: 4,
      nombre: "Jazz Premium - Secret Agent",
      descripcion: "Lounge jazz vintage para inspiración y ambiente sofisticado",
      genero: "Jazz Lounge",
      url: "https://ice1.somafm.com/secretagent-128-mp3", // VERIFICADO 9.0/10 - MP3 128kbps
      color: "from-indigo-500 to-purple-500",
      oyentes: "1.9K",
      programaActual: "Premium Jazz Selection",
      proximoPrograma: "Continuous Jazz Flow",
      estado: "en-vivo"
    }
  ];

  const formatTime = (): string => {
    const now = new Date();
    return now.toLocaleTimeString('es-CO', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: true 
    });
  };

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
    // En una implementación real, aquí se controlaría el stream de audio
  };

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    // En una implementación real, aquí se controlaría el volumen del stream
  };

  const handleEstacionChange = (index: number) => {
    setEstacionActual(index);
    setShowEstaciones(false);
    // En una implementación real, aquí se cambiaría de stream
  };

  const handlePreviousStation = () => {
    const newIndex = estacionActual > 0 ? estacionActual - 1 : estaciones.length - 1;
    setEstacionActual(newIndex);
  };

  const handleNextStation = () => {
    const newIndex = estacionActual < estaciones.length - 1 ? estacionActual + 1 : 0;
    setEstacionActual(newIndex);
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
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-6 z-50 bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-purple-500/20 overflow-hidden min-w-[380px] max-w-[420px]">
      <div className="p-5">
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

        {/* Estación actual */}
        <div className={`p-4 rounded-xl bg-gradient-to-br ${estacionData.color} mb-4 relative overflow-hidden`}>
          <div className="relative z-10">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-bold text-lg">{estacionData.nombre}</h3>
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  estacionData.estado === 'en-vivo' 
                    ? 'bg-red-500 text-white animate-pulse' 
                    : 'bg-white/20 text-white'
                }`}>
                  {estacionData.estado === 'en-vivo' ? '🔴 EN VIVO' : '📻 GRABADO'}
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
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
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
            className={`bg-gradient-to-r ${estacionData.color} text-white p-4 rounded-full hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden`}
          >
            {isPlaying ? <Pause className="w-7 h-7" /> : <Play className="w-7 h-7" />}
            <div className="absolute inset-0 bg-white/20 opacity-0 hover:opacity-100 transition-opacity"></div>
          </button>

          {/* Estación siguiente */}
          <button
            onClick={handleNextStation}
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Estación siguiente"
          >
            <SkipForward className="w-5 h-5" />
          </button>

          {/* Compartir */}
          <button
            className="text-white/60 hover:text-white transition-colors p-3 hover:bg-white/10 rounded-full"
            title="Compartir"
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
          <Volume2 className="w-4 h-4 text-white/60" />
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

export default RadioDigital;
