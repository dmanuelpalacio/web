import React, { useState } from 'react'

interface ContentData {
  features: string[];
}

interface ProyectosProps {
  data: ContentData;
}

const Proyectos: React.FC<ProyectosProps> = ({ data }) => {
  const [selectedProject, setSelectedProject] = useState<any>(null)

  const proyectos = [
    {
      id: 1,
      title: "Murales Digitales Interactivos",
      category: "Arte Público",
      status: "En desarrollo",
      description: "Transformamos espacios urbanos con murales que responden a la interacción ciudadana mediante IA y sensores.",
      fullDescription: "Este proyecto innovador combina arte urbano tradicional con tecnología de vanguardia. Los murales utilizan sensores de movimiento y cámaras para detectar la presencia de personas y generar respuestas visuales únicas a través de IA generativa. Cada interacción crea patrones únicos que reflejan la diversidad y energía de nuestra comunidad.",
      impact: "Revitalización de 5 espacios públicos en Medellín",
      technologies: ["IA Generativa", "Sensores IoT", "Proyección Digital", "Computer Vision"],
      partners: ["Alcaldía de Medellín", "Universidades Locales"],
      image: "mural-digital",
      color: "from-nuclear-purple to-nuclear-violet"
    },
    {
      id: 2,
      title: "Archivo Cultural Digital",
      category: "Patrimonio",
      status: "Activo",
      description: "Documentación y preservación digital del patrimonio cultural de Medellín usando IA para catalogación inteligente.",
      fullDescription: "Iniciativa para preservar y democratizar el acceso al patrimonio cultural de Medellín. Utilizamos IA para automatizar la catalogación de fotografías históricas, documentos y testimonios orales, creando un archivo digital accesible para investigadores, estudiantes y la comunidad en general.",
      impact: "Más de 10,000 archivos digitalizados y catalogados",
      technologies: ["Machine Learning", "Reconocimiento de Imágenes", "Procesamiento de Lenguaje Natural"],
      partners: ["Biblioteca Pública Piloto", "Archivo Histórico de Medellín"],
      image: "archivo-cultural",
      color: "from-nuclear-yellow to-nuclear-purple"
    },
    {
      id: 3,
      title: "Red de Artistas IA",
      category: "Comunidad",
      status: "Creciendo",
      description: "Plataforma colaborativa que conecta artistas locales e internacionales interesados en explorar la IA creativa.",
      fullDescription: "Una red digital que facilita la colaboración entre artistas que trabajan con IA. La plataforma incluye herramientas de co-creación, galerías virtuales, y espacios de intercambio de conocimiento. Promovemos la creación colectiva y el aprendizaje peer-to-peer.",
      impact: "200+ artistas conectados en 15 países",
      technologies: ["Plataforma Web", "APIs de IA", "Herramientas Colaborativas"],
      partners: ["Artistas Independientes", "Colectivos Internacionales"],
      image: "red-artistas",
      color: "from-nuclear-violet to-nuclear-yellow"
    },
    {
      id: 4,
      title: "Laboratorio de Bioarte + IA",
      category: "Investigación",
      status: "Experimental",
      description: "Exploración de las intersecciones entre biología, arte y tecnología para crear experiencias inmersivas únicas.",
      fullDescription: "Proyecto experimental que combina principios de biología, arte y tecnología. Investigamos cómo la IA puede simular procesos biológicos para crear instalaciones artísticas que evolucionen y se adapten como organismos vivos.",
      impact: "3 instalaciones piloto, 2 publicaciones académicas",
      technologies: ["Algoritmos Evolutivos", "Simulación Biológica", "Arte Generativo"],
      partners: ["Universidad Nacional", "Instituto Humboldt"],
      image: "bioarte",
      color: "from-nuclear-purple to-nuclear-yellow"
    }
  ]

  return (
    <section id="proyectos" className="py-20 bg-nuclear-black text-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-yellow/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            Nuestros <span className="text-nuclear-yellow">Proyectos</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Iniciativas que están transformando la relación entre arte, tecnología y comunidad. 
            Cada proyecto es una oportunidad de generar impacto positivo y explorar nuevas fronteras creativas.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {proyectos.map((proyecto) => (
            <div 
              key={proyecto.id}
              className="group bg-nuclear-white/5 backdrop-blur-sm rounded-3xl overflow-hidden border border-white/10 hover:border-nuclear-yellow/50 transition-all duration-300 transform hover:scale-105"
            >
              {/* Project Header */}
              <div className={`bg-gradient-to-r ${proyecto.color} p-8`}>
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <span className="text-xs font-semibold bg-white/20 px-3 py-1 rounded-full">
                        {proyecto.category}
                      </span>
                      <span className={`text-xs font-semibold px-3 py-1 rounded-full ${
                        proyecto.status === 'Activo' ? 'bg-green-500/20 text-green-300' :
                        proyecto.status === 'En desarrollo' ? 'bg-yellow-500/20 text-yellow-300' :
                        proyecto.status === 'Creciendo' ? 'bg-blue-500/20 text-blue-300' :
                        'bg-purple-500/20 text-purple-300'
                      }`}>
                        {proyecto.status}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-white mb-3">{proyecto.title}</h3>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">{proyecto.description}</p>
              </div>

              {/* Project Content */}
              <div className="p-8">
                <div className="space-y-4 mb-6">
                  <div>
                    <h4 className="text-sm font-semibold text-nuclear-yellow mb-2">Impacto</h4>
                    <p className="text-white/80 text-sm">{proyecto.impact}</p>
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold text-nuclear-yellow mb-2">Tecnologías</h4>
                    <div className="flex flex-wrap gap-2">
                      {proyecto.technologies.map((tech, index) => (
                        <span key={index} className="text-xs bg-nuclear-purple/20 text-nuclear-yellow px-2 py-1 rounded">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedProject(proyecto)}
                  className="w-full bg-nuclear-yellow/10 text-nuclear-yellow border border-nuclear-yellow/30 px-6 py-3 rounded-full font-semibold hover:bg-nuclear-yellow hover:text-nuclear-black transition-all duration-300"
                >
                  Ver Detalles
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-nuclear-purple/20 to-nuclear-violet/20 rounded-3xl p-12 mb-16">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black mb-4">Impacto <span className="text-nuclear-yellow">Colectivo</span></h3>
            <p className="text-white/80 max-w-2xl mx-auto">
              Nuestros proyectos generan valor real para la comunidad y abren nuevas posibilidades para el arte y la tecnología.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { number: "15+", label: "Espacios Transformados" },
              { number: "10K+", label: "Archivos Digitalizados" },
              { number: "200+", label: "Artistas Conectados" },
              { number: "50+", label: "Colaboraciones Activas" }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-black text-nuclear-yellow mb-2">{stat.number}</div>
                <div className="text-white/80">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <h3 className="text-3xl font-black mb-6">
            ¿Tienes una idea para un <span className="text-nuclear-yellow">proyecto</span>?
          </h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Estamos siempre abiertos a nuevas colaboraciones y propuestas que combinen arte, tecnología e impacto social.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573006101221?text=Hola%20tengo%20una%20idea%20para%20un%20proyecto%20colaborativo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Proponer Proyecto
            </a>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-nuclear-black transition-all duration-300 transform hover:scale-105"
            >
              Colaborar
            </a>
          </div>
        </div>
      </div>

      {/* Project Detail Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nuclear-black/90 backdrop-blur-sm">
          <div className="bg-nuclear-white rounded-3xl p-8 max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-3xl font-black text-nuclear-black">{selectedProject.title}</h3>
              <button
                onClick={() => setSelectedProject(null)}
                className="w-10 h-10 bg-nuclear-purple/10 rounded-full flex items-center justify-center text-nuclear-purple hover:bg-nuclear-purple hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center space-x-3 mb-4">
                  <span className="bg-nuclear-purple/10 text-nuclear-purple px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedProject.category}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                    selectedProject.status === 'Activo' ? 'bg-green-100 text-green-800' :
                    selectedProject.status === 'En desarrollo' ? 'bg-yellow-100 text-yellow-800' :
                    selectedProject.status === 'Creciendo' ? 'bg-blue-100 text-blue-800' :
                    'bg-purple-100 text-purple-800'
                  }`}>
                    {selectedProject.status}
                  </span>
                </div>
                <p className="text-nuclear-violet leading-relaxed">{selectedProject.fullDescription}</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-nuclear-black mb-3">Impacto Generado</h4>
                  <p className="text-nuclear-violet">{selectedProject.impact}</p>
                </div>
                <div>
                  <h4 className="font-bold text-nuclear-black mb-3">Socios Estratégicos</h4>
                  <ul className="space-y-1">
                    {selectedProject.partners.map((partner: string, index: number) => (
                      <li key={index} className="text-nuclear-violet text-sm">• {partner}</li>
                    ))}
                  </ul>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-nuclear-black mb-3">Tecnologías Utilizadas</h4>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.technologies.map((tech: string, index: number) => (
                    <span key={index} className="bg-nuclear-purple/10 text-nuclear-purple px-3 py-1 rounded-full text-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 border-t border-nuclear-purple/20">
                <a
                  href={`https://wa.me/573006101221?text=Hola%20quiero%20saber%20más%20sobre%20el%20proyecto%20${encodeURIComponent(selectedProject.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-center hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
                >
                  Saber Más del Proyecto
                </a>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Proyectos
