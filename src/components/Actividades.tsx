import React from 'react'

interface ContentData {
  features: string[];
}

interface ActividadesProps {
  data: ContentData;
}

const Actividades: React.FC<ActividadesProps> = ({ data }) => {
  const actividades = [
    {
      category: "Talleres",
      title: "Talleres de IA Creativa",
      description: "Programas intensivos donde artistas aprenden a integrar herramientas de inteligencia artificial en sus procesos creativos.",
      items: [
        "IA para Procesos Creativos",
        "IA para la Creación Colectiva", 
        "Programación Creativa con IA",
        "Talleres especializados por demanda"
      ],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z" />
        </svg>
      ),
      color: "from-nuclear-purple to-nuclear-violet"
    },
    {
      category: "Laboratorios",
      title: "Laboratorios de Experimentación",
      description: "Espacios abiertos para la investigación y desarrollo de proyectos que combinan arte, tecnología e IA.",
      items: [
        "Lab de Arte Generativo",
        "Experimentación con Realidad Aumentada",
        "Prototipado de Instalaciones Interactivas",
        "Investigación en Nuevos Medios"
      ],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-nuclear-yellow to-nuclear-purple"
    },
    {
      category: "Proyectos",
      title: "Proyectos Comunitarios",
      description: "Iniciativas que conectan el arte y la tecnología con las necesidades y oportunidades de la comunidad local.",
      items: [
        "Arte Público Digital",
        "Murales Interactivos con IA",
        "Documentación Cultural Digital",
        "Talleres en Colegios y Universidades"
      ],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      ),
      color: "from-nuclear-violet to-nuclear-yellow"
    },
    {
      category: "Eventos",
      title: "Eventos y Exposiciones",
      description: "Encuentros que celebran la intersección entre arte, tecnología y comunidad, creando espacios de diálogo y aprendizaje.",
      items: [
        "Exposiciones de Arte + IA",
        "Charlas con Artistas Internacionales",
        "Noches de Arte y Tecnología",
        "Ferias de Innovación Creativa"
      ],
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      color: "from-nuclear-purple to-nuclear-yellow"
    }
  ]

  return (
    <section id="actividades" className="py-20 bg-gradient-to-br from-nuclear-white via-nuclear-yellow/5 to-nuclear-purple/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-violet/10 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-violet" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-nuclear-black mb-6">
            Nuestras <span className="text-gradient">Actividades</span>
          </h2>
          <p className="text-xl text-nuclear-violet max-w-3xl mx-auto">
            Descubre todas las formas en que puedes participar en Núcleo Colectivo. 
            Desde talleres especializados hasta proyectos comunitarios que transforman nuestra ciudad.
          </p>
        </div>

        {/* Activities Grid */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {actividades.map((actividad, index) => (
            <div 
              key={index}
              className="group bg-nuclear-white rounded-3xl overflow-hidden shadow-lg border border-nuclear-purple/10 hover:border-nuclear-purple/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Header with gradient */}
              <div className={`bg-gradient-to-r ${actividad.color} p-8 text-white`}>
                <div className="flex items-center space-x-4 mb-4">
                  <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                    {actividad.icon}
                  </div>
                  <div>
                    <div className="text-sm font-medium opacity-90">{actividad.category}</div>
                    <h3 className="text-xl font-bold">{actividad.title}</h3>
                  </div>
                </div>
                <p className="text-white/90 leading-relaxed">
                  {actividad.description}
                </p>
              </div>

              {/* Content */}
              <div className="p-8">
                <h4 className="font-bold text-nuclear-black mb-4">Incluye:</h4>
                <ul className="space-y-3">
                  {actividad.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-nuclear-purple rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-nuclear-violet">{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 pt-6 border-t border-nuclear-purple/20">
                  <a
                    href={`https://wa.me/573006101221?text=Hola%20quiero%20más%20información%20sobre%20${encodeURIComponent(actividad.title)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center text-nuclear-purple hover:text-nuclear-violet font-semibold transition-colors"
                  >
                    Más información
                    <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Process Section */}
        <div className="bg-nuclear-black rounded-3xl p-12 text-white">
          <div className="text-center mb-12">
            <h3 className="text-3xl font-black mb-4">
              Nuestro <span className="text-nuclear-yellow">Proceso</span> Creativo
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Cada actividad en Núcleo Colectivo sigue una metodología probada que maximiza el aprendizaje y la innovación.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              {
                step: "01",
                title: "Explorar",
                description: "Investigamos las posibilidades y limitaciones de cada herramienta de IA"
              },
              {
                step: "02", 
                title: "Experimentar",
                description: "Creamos prototipos y proyectos piloto para probar conceptos"
              },
              {
                step: "03",
                title: "Colaborar",
                description: "Trabajamos en equipo para enriquecer ideas y perspectivas"
              },
              {
                step: "04",
                title: "Impactar",
                description: "Aplicamos lo aprendido en proyectos que benefician a la comunidad"
              }
            ].map((paso, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-nuclear-yellow/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <span className="text-2xl font-black text-nuclear-yellow">{paso.step}</span>
                </div>
                <h4 className="text-lg font-bold mb-2">{paso.title}</h4>
                <p className="text-white/80 text-sm leading-relaxed">{paso.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-black text-nuclear-black mb-6">
            ¿Listo para formar parte del <span className="text-nuclear-purple">Núcleo</span>?
          </h3>
          <p className="text-xl text-nuclear-violet mb-8 max-w-2xl mx-auto">
            Únete a nuestra comunidad de artistas, tecnólogos y visionarios que están redefiniendo los límites de la creatividad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#talleres-ia"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#talleres-ia')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Ver Talleres
            </a>
            <a
              href="https://wa.me/573006101221?text=Hola%20quiero%20participar%20en%20las%20actividades%20de%20Núcleo%20Colectivo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nuclear-white text-nuclear-purple border-2 border-nuclear-purple px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Participar
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Actividades
