import React from 'react'

interface ContentData {
  extracted_information: string;
  features: string[];
  geographical_data: {
    ciudad: string;
    pais: string;
  };
}

interface SobreNosotrosProps {
  data: ContentData;
}

const SobreNosotros: React.FC<SobreNosotrosProps> = ({ data }) => {
  const features = [
    {
      title: "Co-creación en Medellín",
      description: "Fomenta la colaboración creativa en el corazón de la innovación colombiana",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      )
    },
    {
      title: "Espacio Interdisciplinario",
      description: "Conecta talentos emergentes y establecidos en un ambiente de aprendizaje mutuo",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "IA y Programación",
      description: "Integra herramientas creativas de vanguardia en procesos artísticos",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Espacio Accesible",
      description: "Establecer un lugar donde todos puedan acceder al conocimiento creativo",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
        </svg>
      )
    },
    {
      title: "Aprendizaje Práctico",
      description: "Fomenta la experiencia directa y la experimentación en cada proyecto",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    },
    {
      title: "Economía Creativa",
      description: "Impulsa el desarrollo económico a través de la creatividad y la innovación",
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
      )
    }
  ]

  return (
    <section id="nosotros" className="py-20 bg-nuclear-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-purple/10 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-nuclear-black mb-6">
            Sobre <span className="text-gradient">Nosotros</span>
          </h2>
          <p className="text-xl text-nuclear-violet max-w-4xl mx-auto leading-relaxed">
            Somos una red para la creación, colaboración y transformación social desde el arte, 
            la tecnología y la inteligencia colectiva, ubicados en el vibrante ecosistema creativo de Medellín, Colombia.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          {/* Text Content */}
          <div className="space-y-6">
            <h3 className="text-3xl font-black text-nuclear-black">
              Un <span className="text-nuclear-purple">Núcleo</span> de Creatividad e Innovación
            </h3>
            <p className="text-lg text-nuclear-violet leading-relaxed">
              Núcleo Colectivo es más que un espacio físico; somos una comunidad vibrante que conecta artistas, 
              emprendedores, tecnólogos y visionarios en un ambiente de colaboración y experimentación.
            </p>
            <p className="text-lg text-nuclear-violet leading-relaxed">
              Creemos en el poder transformador del arte cuando se combina con la tecnología. Nuestro enfoque 
              en la inteligencia artificial como herramienta creativa nos posiciona a la vanguardia de la 
              revolución artística contemporánea.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 gap-6 pt-6">
              <div className="text-center p-4 bg-nuclear-yellow/10 rounded-2xl">
                <div className="text-3xl font-black text-nuclear-purple mb-2">100+</div>
                <div className="text-sm text-nuclear-violet">Artistas Conectados</div>
              </div>
              <div className="text-center p-4 bg-nuclear-purple/10 rounded-2xl">
                <div className="text-3xl font-black text-nuclear-purple mb-2">3</div>
                <div className="text-sm text-nuclear-violet">Talleres de IA</div>
              </div>
            </div>
          </div>

          {/* Visual Element */}
          <div className="relative">
            <div className="ai-texture bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 rounded-3xl p-12 text-center">
              {/* Nuclear Circles */}
              <div className="relative">
                <div className="w-32 h-32 bg-nuclear-yellow/30 rounded-full mx-auto mb-6 animate-pulse-nuclear flex items-center justify-center">
                  <div className="w-20 h-20 bg-nuclear-purple/40 rounded-full flex items-center justify-center">
                    <div className="w-12 h-12 bg-nuclear-violet/60 rounded-full"></div>
                  </div>
                </div>
                <h4 className="text-2xl font-bold text-nuclear-black mb-4">
                  Conexiones que <span className="text-nuclear-purple">Transforman</span>
                </h4>
                <p className="text-nuclear-violet">
                  Cada proyecto, cada colaboración, cada experimento con IA es una oportunidad 
                  de crear algo revolucionario.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div 
              key={index} 
              className="group bg-nuclear-white border border-nuclear-purple/10 rounded-2xl p-6 hover:border-nuclear-purple/30 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <div className="w-12 h-12 bg-nuclear-purple/10 rounded-xl flex items-center justify-center mb-4 text-nuclear-purple group-hover:bg-nuclear-purple group-hover:text-white transition-all duration-300">
                {feature.icon}
              </div>
              <h4 className="text-lg font-bold text-nuclear-black mb-3 group-hover:text-nuclear-purple transition-colors">
                {feature.title}
              </h4>
              <p className="text-nuclear-violet text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Mission & Vision */}
        <div className="mt-16 grid md:grid-cols-2 gap-8">
          {/* Mission */}
          <div className="bg-gradient-to-br from-nuclear-purple to-nuclear-violet rounded-3xl p-8 text-white">
            <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Misión</h3>
            <p className="text-white/90 leading-relaxed">
              Democratizar el acceso a las herramientas de inteligencia artificial en el arte, 
              creando un espacio donde la creatividad humana y la tecnología se fusionan para 
              generar transformación social positiva.
            </p>
          </div>

          {/* Vision */}
          <div className="bg-gradient-to-br from-nuclear-yellow to-nuclear-purple rounded-3xl p-8 text-nuclear-black">
            <div className="w-12 h-12 bg-nuclear-black/20 rounded-xl flex items-center justify-center mb-6">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold mb-4">Nuestra Visión</h3>
            <p className="text-nuclear-black/80 leading-relaxed">
              Ser el referente latinoamericano en la integración de IA y arte, liderando 
              una nueva era de creatividad colectiva que inspire cambios positivos en 
              nuestras comunidades y más allá.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SobreNosotros
