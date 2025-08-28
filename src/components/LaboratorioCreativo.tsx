import React, { useState, useEffect } from 'react'
import { Camera, Music, Users, Play, Upload, Heart, Sparkles, Brain, Mic, Image, Palette, Wand2 } from 'lucide-react'

const LaboratorioCreativo: React.FC = () => {
  const [estadisticas, setEstadisticas] = useState({
    usuariosActivos: 247,
    retratosCreados: 186,
    sonidosGrabados: 134,
    hoyUnidos: 23
  })

  const [seccionActiva, setSeccionActiva] = useState<'retratos' | 'audio' | 'galeria'>('retratos')

  const retratosDestacados = [
    {
      id: 1,
      artista: "ArtistaTech",
      fecha: "6/7/2025",
      hashtags: ["#FuturoDigital", "#CyberpunkVibes", "#IA"],
      imagen: "cyberpunk1542"
    },
    {
      id: 2,
      artista: "CreativoMX",
      fecha: "6/7/2025", 
      hashtags: ["#ArteDigital", "#Creatividad", "#Comunidad"],
      imagen: "artistico2867"
    },
    {
      id: 3,
      artista: "SoñadoraCreativa",
      fecha: "6/6/2025",
      hashtags: ["#Sueños", "#Imaginación", "#Arte"],
      imagen: "soñador3589"
    }
  ]

  // Simulación de incremento de estadísticas
  useEffect(() => {
    const interval = setInterval(() => {
      setEstadisticas(prev => ({
        ...prev,
        usuariosActivos: prev.usuariosActivos + Math.floor(Math.random() * 3),
        retratosCreados: prev.retratosCreados + Math.floor(Math.random() * 2),
        sonidosGrabados: prev.sonidosGrabados + Math.floor(Math.random() * 2)
      }))
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  return (
    <section id="laboratorio" className="py-20 bg-gradient-to-br from-nuclear-black via-gray-900 to-nuclear-purple/10">
      <div className="container mx-auto px-6">
        {/* Header del Laboratorio */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <Brain className="w-8 h-8 text-nuclear-yellow animate-pulse" />
            <h2 className="text-4xl md:text-5xl font-bold text-white">
              Laboratorio Creativo
            </h2>
            <Sparkles className="w-8 h-8 text-nuclear-yellow animate-pulse" />
          </div>
          
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            <span className="text-nuclear-yellow font-semibold">IA • Arte • Comunidad</span>
            <br />
            Transforma tu realidad con IA! Crea retratos futuristas, experimenta con sonidos y únete a la revolución creativa
          </p>

          {/* Estadísticas en Tiempo Real */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 rounded-2xl p-4 border border-nuclear-purple/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Users className="w-5 h-5 text-nuclear-yellow" />
                <span className="text-sm text-gray-300">Activos</span>
              </div>
              <div className="text-2xl font-bold text-white">{estadisticas.usuariosActivos}</div>
            </div>
            
            <div className="bg-gradient-to-br from-nuclear-yellow/20 to-nuclear-yellow/10 rounded-2xl p-4 border border-nuclear-yellow/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Camera className="w-5 h-5 text-nuclear-yellow" />
                <span className="text-sm text-gray-300">Retratos</span>
              </div>
              <div className="text-2xl font-bold text-white">{estadisticas.retratosCreados}</div>
            </div>
            
            <div className="bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 rounded-2xl p-4 border border-nuclear-purple/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Music className="w-5 h-5 text-nuclear-yellow" />
                <span className="text-sm text-gray-300">Sonidos</span>
              </div>
              <div className="text-2xl font-bold text-white">{estadisticas.sonidosGrabados}</div>
            </div>
            
            <div className="bg-gradient-to-br from-nuclear-yellow/20 to-nuclear-yellow/10 rounded-2xl p-4 border border-nuclear-yellow/30">
              <div className="flex items-center justify-center space-x-2 mb-2">
                <Heart className="w-5 h-5 text-nuclear-yellow" />
                <span className="text-sm text-gray-300">Hoy</span>
              </div>
              <div className="text-2xl font-bold text-white">+{estadisticas.hoyUnidos}</div>
            </div>
          </div>
        </div>

        {/* Navegación del Laboratorio */}
        <div className="flex flex-wrap justify-center space-x-2 md:space-x-4 mb-12">
          <button
            onClick={() => setSeccionActiva('retratos')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              seccionActiva === 'retratos'
                ? 'bg-gradient-to-r from-nuclear-yellow to-nuclear-yellow/80 text-nuclear-black font-semibold shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Camera className="w-5 h-5" />
            <span>Retratos IA</span>
          </button>
          
          <button
            onClick={() => setSeccionActiva('audio')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              seccionActiva === 'audio'
                ? 'bg-gradient-to-r from-nuclear-purple to-nuclear-violet text-white font-semibold shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Mic className="w-5 h-5" />
            <span>Audio Lab</span>
          </button>
          
          <button
            onClick={() => setSeccionActiva('galeria')}
            className={`flex items-center space-x-2 px-6 py-3 rounded-2xl transition-all duration-300 ${
              seccionActiva === 'galeria'
                ? 'bg-gradient-to-r from-nuclear-violet to-nuclear-purple text-white font-semibold shadow-lg'
                : 'bg-white/10 text-white hover:bg-white/20'
            }`}
          >
            <Palette className="w-5 h-5" />
            <span>Galería Remix</span>
          </button>
        </div>

        {/* Contenido según sección activa */}
        {seccionActiva === 'retratos' && (
          <div className="space-y-12">
            {/* Generador de Retratos */}
            <div className="bg-gradient-to-br from-nuclear-yellow/10 to-nuclear-yellow/5 rounded-3xl p-8 border border-nuclear-yellow/20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
                  <Wand2 className="w-8 h-8 text-nuclear-yellow" />
                  <span>Crear mi Retrato Futuro</span>
                </h3>
                <p className="text-gray-300 text-lg">
                  Usa IA para crear retratos únicos que reflejen tu visión artística del futuro
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <label className="block text-white font-semibold mb-2">Describe tu visión:</label>
                  <textarea
                    placeholder="Ej: Un artista cyberpunk en un mundo futurista con neones morados..."
                    className="w-full h-32 bg-white/10 border border-nuclear-yellow/30 rounded-2xl px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-nuclear-yellow focus:ring-2 focus:ring-nuclear-yellow/20"
                  />
                  
                  <div className="grid grid-cols-2 gap-4">
                    <select className="bg-white/10 border border-nuclear-yellow/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nuclear-yellow">
                      <option value="">Estilo</option>
                      <option value="cyberpunk">Cyberpunk</option>
                      <option value="futurista">Futurista</option>
                      <option value="artistico">Artístico</option>
                      <option value="dreamy">Onírico</option>
                    </select>
                    
                    <select className="bg-white/10 border border-nuclear-yellow/30 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-nuclear-yellow">
                      <option value="">Color Dominante</option>
                      <option value="neon">Neón</option>
                      <option value="warm">Cálidos</option>
                      <option value="cool">Fríos</option>
                      <option value="monochrome">Monocromático</option>
                    </select>
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-nuclear-yellow to-nuclear-yellow/80 text-nuclear-black font-bold py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                    <Brain className="w-5 h-5" />
                    <span>Generar Retrato IA</span>
                  </button>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-nuclear-yellow/20">
                  <div className="aspect-square bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 rounded-2xl flex items-center justify-center">
                    <div className="text-center">
                      <Image className="w-16 h-16 text-nuclear-yellow mx-auto mb-4" />
                      <p className="text-gray-300">Tu retrato aparecerá aquí</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Retratos Destacados */}
            <div>
              <h3 className="text-3xl font-bold text-white mb-8 text-center">Retratos Destacados</h3>
              <div className="grid md:grid-cols-3 gap-6">
                {retratosDestacados.map((retrato) => (
                  <div key={retrato.id} className="bg-white/10 rounded-2xl p-6 border border-nuclear-purple/20 hover:border-nuclear-yellow/50 transition-all duration-300 transform hover:scale-105">
                    <div className="aspect-square bg-gradient-to-br from-nuclear-purple/30 to-nuclear-violet/30 rounded-2xl mb-4 flex items-center justify-center">
                      <span className="text-nuclear-yellow font-mono text-lg">{retrato.imagen}</span>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-white font-semibold">{retrato.artista}</span>
                        <span className="text-gray-400 text-sm">{retrato.fecha}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {retrato.hashtags.map((tag, index) => (
                          <span key={index} className="text-xs bg-nuclear-purple/30 text-nuclear-yellow px-2 py-1 rounded-lg">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'audio' && (
          <div className="space-y-12">
            {/* Audio Lab */}
            <div className="bg-gradient-to-br from-nuclear-purple/10 to-nuclear-violet/10 rounded-3xl p-8 border border-nuclear-purple/20">
              <div className="text-center mb-8">
                <h3 className="text-3xl font-bold text-white mb-4 flex items-center justify-center space-x-3">
                  <Music className="w-8 h-8 text-nuclear-purple" />
                  <span>Audio Lab Colectivo</span>
                </h3>
                <p className="text-gray-300 text-lg">
                  Experimenta con sonidos, crea música con IA y contribuye al laboratorio sonoro de la comunidad
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-6">
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4 flex items-center space-x-2">
                      <Mic className="w-6 h-6 text-nuclear-purple" />
                      <span>Grabador AI</span>
                    </h4>
                    <div className="space-y-4">
                      <button className="w-full bg-gradient-to-r from-red-500 to-red-600 text-white font-bold py-4 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
                        <div className="w-4 h-4 bg-white rounded-full animate-pulse"></div>
                        <span>Iniciar Grabación</span>
                      </button>
                      
                      <div className="flex space-x-2">
                        <button className="flex-1 bg-nuclear-purple hover:bg-nuclear-violet text-white py-3 rounded-xl transition-colors">
                          <Play className="w-5 h-5 mx-auto" />
                        </button>
                        <button className="flex-1 bg-nuclear-purple hover:bg-nuclear-violet text-white py-3 rounded-xl transition-colors">
                          <Upload className="w-5 h-5 mx-auto" />
                        </button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-white/10 rounded-2xl p-6">
                    <h4 className="text-xl font-bold text-white mb-4">Efectos IA</h4>
                    <div className="grid grid-cols-2 gap-3">
                      <button className="bg-nuclear-yellow/20 hover:bg-nuclear-yellow/30 text-nuclear-yellow py-2 px-4 rounded-xl transition-colors">
                        Reverb
                      </button>
                      <button className="bg-nuclear-yellow/20 hover:bg-nuclear-yellow/30 text-nuclear-yellow py-2 px-4 rounded-xl transition-colors">
                        Chorus
                      </button>
                      <button className="bg-nuclear-yellow/20 hover:bg-nuclear-yellow/30 text-nuclear-yellow py-2 px-4 rounded-xl transition-colors">
                        Delay
                      </button>
                      <button className="bg-nuclear-yellow/20 hover:bg-nuclear-yellow/30 text-nuclear-yellow py-2 px-4 rounded-xl transition-colors">
                        Distortion
                      </button>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/5 rounded-2xl p-6 border border-nuclear-purple/20">
                  <h4 className="text-xl font-bold text-white mb-4">Grabaciones de la Comunidad</h4>
                  <div className="space-y-3">
                    {[
                      { nombre: "Sonido Ambient 1", duracion: "2:34", artista: "SoundMaker" },
                      { nombre: "Beat Cyberpunk", duracion: "1:45", artista: "BeatCreator" },
                      { nombre: "Melodía Futura", duracion: "3:12", artista: "FutureSound" },
                      { nombre: "Ritmo Espacial", duracion: "2:58", artista: "SpaceBeats" }
                    ].map((audio, index) => (
                      <div key={index} className="flex items-center justify-between bg-white/10 rounded-xl p-3">
                        <div>
                          <div className="text-white font-medium">{audio.nombre}</div>
                          <div className="text-gray-400 text-sm">{audio.artista}</div>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className="text-nuclear-yellow text-sm">{audio.duracion}</span>
                          <button className="text-nuclear-purple hover:text-nuclear-yellow transition-colors">
                            <Play className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {seccionActiva === 'galeria' && (
          <div className="space-y-12">
            {/* Galería Remix */}
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold text-white mb-4">Galería Remix de la Comunidad</h3>
              <p className="text-gray-300 text-lg">
                Explora las creaciones más innovadoras de nuestra comunidad de artistas digitales
              </p>
            </div>
            
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className="group cursor-pointer">
                  <div className="aspect-square bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 rounded-2xl p-4 border border-nuclear-purple/20 hover:border-nuclear-yellow/50 transition-all duration-300 transform group-hover:scale-105 group-hover:shadow-xl">
                    <div className="w-full h-full bg-gradient-to-br from-nuclear-yellow/10 to-nuclear-purple/10 rounded-xl flex items-center justify-center">
                      <div className="text-center">
                        <Image className="w-8 h-8 text-nuclear-yellow mx-auto mb-2" />
                        <span className="text-nuclear-yellow text-sm font-mono">mix_{i + 1}</span>
                      </div>
                    </div>
                  </div>
                  <div className="mt-3 px-2">
                    <div className="text-white text-sm font-medium">Arte #{i + 1}</div>
                    <div className="text-gray-400 text-xs">Creador{i + 1}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* CTA Final */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-bold text-white mb-6">
            ¿Listo para ser parte de la revolución creativa?
          </h3>
          <p className="text-gray-300 text-lg mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de artistas digitales y transforma tu creatividad con el poder de la IA
          </p>
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <button className="bg-gradient-to-r from-nuclear-yellow to-nuclear-yellow/80 text-nuclear-black font-bold py-4 px-8 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Sparkles className="w-5 h-5" />
              <span>¡Empezar Ahora!</span>
            </button>
            <button className="bg-gradient-to-r from-nuclear-purple to-nuclear-violet text-white font-bold py-4 px-8 rounded-2xl hover:shadow-lg transform hover:scale-105 transition-all duration-300 flex items-center justify-center space-x-2">
              <Music className="w-5 h-5" />
              <span>Escuchar Audio Lab</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default LaboratorioCreativo