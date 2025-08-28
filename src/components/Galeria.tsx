import React, { useState } from 'react'

interface ContentData {
  references: Array<{
    type: string;
    description?: string;
    url_action?: string;
  }>;
}

interface GaleriaProps {
  data: ContentData;
}

const Galeria: React.FC<GaleriaProps> = ({ data }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('Todos')
  const [selectedMedia, setSelectedMedia] = useState<any>(null)

  const galeriaItems = [
    {
      id: 1,
      title: "Mural Interactivo IA",
      category: "Proyectos",
      type: "image",
      description: "Instalación de arte público que responde a la presencia de espectadores usando IA generativa.",
      location: "Centro de Medellín",
      date: "2024",
      thumbnail: "mural-ia",
      collaboration: "Con artistas locales y estudiantes de sistemas"
    },
    {
      id: 2,
      title: "Taller de Arte Generativo",
      category: "Talleres",
      type: "video",
      description: "Registro de nuestro primer taller donde artistas experimentaron con herramientas de IA para crear obras únicas.",
      location: "Núcleo Colectivo",
      date: "2024",
      thumbnail: "taller-generativo",
      videoId: "presentacion-nucleo"
    },
    {
      id: 3,
      title: "Exposición: Humano + IA",
      category: "Exposiciones",
      type: "image",
      description: "Muestra colectiva que explora las colaboraciones entre creatividad humana e inteligencia artificial.",
      location: "Galería Municipal",
      date: "2024",
      thumbnail: "expo-humano-ia",
      artists: "12 artistas participantes"
    },
    {
      id: 4,
      title: "Proceso Creativo Colaborativo",
      category: "Proceso",
      type: "video",
      description: "Documentación del proceso de creación colectiva donde varios artistas trabajan con IA simultáneamente.",
      location: "Estudio Núcleo",
      date: "2024",
      thumbnail: "proceso-colaborativo",
      videoId: "proceso-creativo"
    },
    {
      id: 5,
      title: "Instalación Bioarte + IA",
      category: "Proyectos",
      type: "image",
      description: "Experimento que simula ecosistemas digitales usando algoritmos evolutivos y visualización en tiempo real.",
      location: "Parque Explora",
      date: "2024",
      thumbnail: "bioarte-ia",
      collaboration: "Con biólogos e ingenieros"
    },
    {
      id: 6,
      title: "Charla: El Futuro del Arte",
      category: "Eventos",
      type: "video",
      description: "Conferencia sobre las perspectivas futuras del arte en la era de la inteligencia artificial.",
      location: "Universidad Nacional",
      date: "2024",
      thumbnail: "charla-futuro",
      videoId: "futuro-arte"
    },
    {
      id: 7,
      title: "Red de Artistas Conectados",
      category: "Comunidad",
      type: "image",
      description: "Visualización de nuestra red global de artistas que experimentan con IA creativa.",
      location: "Digital",
      date: "2024",
      thumbnail: "red-artistas",
      stats: "200+ artistas en 15 países"
    },
    {
      id: 8,
      title: "Behind the Scenes",
      category: "Proceso",
      type: "video",
      description: "Un vistazo íntimo a cómo trabajamos en Núcleo Colectivo, desde la ideación hasta la ejecución.",
      location: "Núcleo Colectivo",
      date: "2024",
      thumbnail: "behind-scenes",
      videoId: "behind-scenes"
    }
  ]

  const categories = ['Todos', ...new Set(galeriaItems.map(item => item.category))]

  const filteredItems = selectedCategory === 'Todos' 
    ? galeriaItems 
    : galeriaItems.filter(item => item.category === selectedCategory)

  const getCategoryIcon = (category: string) => {
    const icons: {[key: string]: any} = {
      'Proyectos': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      ),
      'Talleres': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
      ),
      'Exposiciones': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
        </svg>
      ),
      'Eventos': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      'default': (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" clipRule="evenodd" />
        </svg>
      )
    }
    return icons[category] || icons['default']
  }

  return (
    <section id="galeria" className="py-20 bg-gradient-to-br from-nuclear-black via-nuclear-violet/20 to-nuclear-purple/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-yellow/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Galería <span className="text-nuclear-yellow">Visual</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Descubre el proceso creativo, los proyectos realizados y la comunidad que está redefiniendo 
            la relación entre arte, tecnología e inteligencia artificial.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-nuclear-yellow text-nuclear-black'
                  : 'bg-white/10 text-white border border-white/20 hover:border-nuclear-yellow/50 hover:bg-white/20'
              }`}
            >
              {category !== 'Todos' && getCategoryIcon(category)}
              <span>{category}</span>
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="group bg-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-nuclear-yellow/50 transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => setSelectedMedia(item)}
            >
              {/* Media Thumbnail */}
              <div className="relative h-48 bg-gradient-to-br from-nuclear-purple/30 to-nuclear-violet/30 flex items-center justify-center">
                {item.type === 'video' ? (
                  <div className="w-16 h-16 bg-nuclear-yellow/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-nuclear-yellow ml-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                    </svg>
                  </div>
                ) : (
                  <div className="w-16 h-16 bg-nuclear-yellow/20 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                    </svg>
                  </div>
                )}
                
                {/* Category Badge */}
                <div className="absolute top-4 left-4">
                  <span className="bg-nuclear-black/50 text-white px-3 py-1 rounded-full text-xs font-semibold">
                    {item.category}
                  </span>
                </div>

                {/* Type Badge */}
                <div className="absolute top-4 right-4">
                  <span className="bg-nuclear-yellow/20 text-nuclear-yellow px-2 py-1 rounded text-xs font-semibold uppercase">
                    {item.type}
                  </span>
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-nuclear-yellow transition-colors">
                  {item.title}
                </h3>
                <p className="text-white/70 text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>

                <div className="flex items-center justify-between text-xs text-white/60">
                  <span>{item.location}</span>
                  <span>{item.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Featured Video Section */}
        <div className="bg-gradient-to-r from-nuclear-purple/20 to-nuclear-violet/20 rounded-3xl p-12 text-center">
          <h3 className="text-3xl font-black text-white mb-4">
            Video de <span className="text-nuclear-yellow">Presentación</span>
          </h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Conoce nuestra misión, visión y los proyectos que están transformando 
            la escena artística y tecnológica de Medellín.
          </p>
          <button 
            onClick={() => setSelectedMedia({
              id: 'presentation',
              title: 'Video de Presentación - Núcleo Colectivo',
              type: 'video',
              description: 'Presentación oficial de Núcleo Colectivo, mostrando nuestra misión, proyectos y visión para el futuro del arte y la tecnología.',
              videoId: 'presentacion-nucleo-oficial'
            })}
            className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 inline-flex items-center space-x-3"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
            </svg>
            <span>Ver Video de Presentación</span>
          </button>
        </div>

        {/* Stats */}
        <div className="mt-16 grid md:grid-cols-4 gap-8">
          {[
            { number: "50+", label: "Obras Creadas", icon: "🎨" },
            { number: "200+", label: "Artistas Conectados", icon: "👥" },
            { number: "15", label: "Exposiciones", icon: "🖼️" },
            { number: "1000+", label: "Visitantes", icon: "👁️" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-4xl mb-2">{stat.icon}</div>
              <div className="text-3xl font-black text-nuclear-yellow mb-2">{stat.number}</div>
              <div className="text-white/80">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Media Modal */}
      {selectedMedia && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nuclear-black/90 backdrop-blur-sm">
          <div className="bg-nuclear-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-nuclear-black">{selectedMedia.title}</h3>
              <button
                onClick={() => setSelectedMedia(null)}
                className="w-10 h-10 bg-nuclear-purple/10 rounded-full flex items-center justify-center text-nuclear-purple hover:bg-nuclear-purple hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              {/* Media Display */}
              <div className="aspect-video bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 rounded-2xl flex items-center justify-center">
                {selectedMedia.type === 'video' ? (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-nuclear-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-nuclear-purple ml-1" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z" />
                      </svg>
                    </div>
                    <p className="text-nuclear-purple font-semibold">Video: {selectedMedia.videoId}</p>
                  </div>
                ) : (
                  <div className="text-center">
                    <div className="w-20 h-20 bg-nuclear-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-10 h-10 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <p className="text-nuclear-purple font-semibold">Imagen: {selectedMedia.thumbnail}</p>
                  </div>
                )}
              </div>

              {/* Description */}
              <div>
                <h4 className="font-bold text-nuclear-black mb-3">Descripción</h4>
                <p className="text-nuclear-violet leading-relaxed">{selectedMedia.description}</p>
              </div>

              {/* Additional Info */}
              {(selectedMedia.location || selectedMedia.collaboration || selectedMedia.artists) && (
                <div className="grid md:grid-cols-2 gap-6">
                  {selectedMedia.location && (
                    <div>
                      <h4 className="font-bold text-nuclear-black mb-2">Ubicación</h4>
                      <p className="text-nuclear-violet">{selectedMedia.location}</p>
                    </div>
                  )}
                  {selectedMedia.collaboration && (
                    <div>
                      <h4 className="font-bold text-nuclear-black mb-2">Colaboración</h4>
                      <p className="text-nuclear-violet">{selectedMedia.collaboration}</p>
                    </div>
                  )}
                  {selectedMedia.artists && (
                    <div>
                      <h4 className="font-bold text-nuclear-black mb-2">Participantes</h4>
                      <p className="text-nuclear-violet">{selectedMedia.artists}</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Galeria
