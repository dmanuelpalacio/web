import React, { useState } from 'react'

interface ContentData {
  references: Array<{
    type: string;
    items?: Array<{
      texto: string;
      url: string;
    }>;
    metodos_adicionales_imagen?: string[];
  }>;
}

interface ApoyoEconomicoProps {
  data: ContentData;
}

const ApoyoEconomico: React.FC<ApoyoEconomicoProps> = ({ data }) => {
  const [selectedAmount, setSelectedAmount] = useState<string>('')
  const [customAmount, setCustomAmount] = useState<string>('')
  const [selectedMethod, setSelectedMethod] = useState<string>('')

  // Extraer métodos de apoyo del data
  const apoyoData = data.references.find(ref => ref.type === 'Apoyo Económico')
  const metodosApoyo = apoyoData?.items || []
  const metodosAdicionales = apoyoData?.metodos_adicionales_imagen || []

  const montosPredefinidos = [
    { valor: '5', etiqueta: '$5 USD', descripcion: 'Apoya un taller básico' },
    { valor: '12', etiqueta: '$12 USD', descripcion: 'Financia materiales creativos' },
    { valor: '24', etiqueta: '$24 USD', descripcion: 'Patrocina un proyecto comunitario' },
    { valor: '48', etiqueta: '$48 USD', descripcion: 'Apoya un mes de actividades' },
    { valor: '119', etiqueta: '$119 USD', descripcion: 'Impulsa una exposición completa' }
  ]

  const impactoPorMonto = {
    '5': {
      title: 'Apoyo Básico',
      items: ['Material para 1 artista en taller', 'Acceso a herramientas digitales', 'Documentación de proceso creativo']
    },
    '12': {
      title: 'Apoyo Creativo',
      items: ['Kit completo para 2 artistas', 'Licencias de software especializado', 'Materiales para prototipado']
    },
    '24': {
      title: 'Apoyo Comunitario',
      items: ['Taller completo para 10 personas', 'Equipos de trabajo colaborativo', 'Exhibición en galería local']
    },
    '48': {
      title: 'Apoyo Transformador',
      items: ['Programa mensual completo', 'Invitación a artista internacional', 'Documentación profesional']
    },
    '119': {
      title: 'Apoyo Visionario',
      items: ['Exposición con curaduría', 'Publicación digital especializada', 'Red internacional de colaboradores']
    }
  }

  const formasDeApoyo = [
    {
      title: 'Donación Única',
      description: 'Contribuye con una cantidad específica para proyectos inmediatos',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
        </svg>
      ),
      color: 'from-nuclear-yellow to-nuclear-purple'
    },
    {
      title: 'Apoyo Mensual',
      description: 'Conviértete en patrocinador recurrente y ayuda a la sostenibilidad',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-nuclear-purple to-nuclear-violet'
    },
    {
      title: 'Patrocinio de Proyecto',
      description: 'Apoya un proyecto específico y recibe reconocimiento público',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      ),
      color: 'from-nuclear-violet to-nuclear-yellow'
    }
  ]

  const handleAmountSelect = (monto: string) => {
    setSelectedAmount(monto)
    setCustomAmount('')
  }

  const getCurrentAmount = () => {
    return customAmount || selectedAmount
  }

  const generateDonationUrl = (method: string) => {
    const amount = getCurrentAmount()
    const message = `Hola! Quiero hacer una donación de $${amount} USD para apoyar los proyectos de Núcleo Colectivo.`
    
    switch(method) {
      case 'whatsapp':
        return `https://wa.me/573006101221?text=${encodeURIComponent(message)}`
      case 'paypal':
        return metodosApoyo.find(m => m.texto.includes('PayPal'))?.url || '#'
      case 'patreon':
        return metodosApoyo.find(m => m.texto.includes('Patreon'))?.url || '#'
      case 'pse':
        return metodosApoyo.find(m => m.texto.includes('PSE'))?.url || '#'
      default:
        return '#'
    }
  }

  return (
    <section id="apoyo" className="py-20 bg-gradient-to-br from-nuclear-black via-nuclear-purple/20 to-nuclear-violet/20">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-yellow/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
            Apoya la <span className="text-nuclear-yellow">Revolución Creativa</span>
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Tu apoyo hace posible que sigamos democratizando el acceso a la inteligencia artificial en el arte. 
            Cada contribución transforma vidas y comunidades.
          </p>
        </div>

        {/* Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-16">
          {[
            { number: "500+", label: "Artistas Beneficiados", icon: "👥" },
            { number: "50+", label: "Proyectos Realizados", icon: "🎨" },
            { number: "25", label: "Comunidades Impactadas", icon: "🏘️" },
            { number: "15K+", label: "Personas Alcanzadas", icon: "🌍" }
          ].map((stat, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 text-center border border-white/20">
              <div className="text-3xl mb-3">{stat.icon}</div>
              <div className="text-2xl font-black text-nuclear-yellow mb-2">{stat.number}</div>
              <div className="text-white/80 text-sm">{stat.label}</div>
            </div>
          ))}
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Donation Form */}
          <div className="bg-nuclear-white rounded-3xl p-8 shadow-2xl">
            <h3 className="text-2xl font-bold text-nuclear-black mb-6">Hacer una Donación</h3>
            
            {/* Amount Selection */}
            <div className="mb-8">
              <h4 className="font-semibold text-nuclear-black mb-4">Selecciona un monto</h4>
              <div className="grid grid-cols-2 gap-3 mb-4">
                {montosPredefinidos.map((monto) => (
                  <button
                    key={monto.valor}
                    onClick={() => handleAmountSelect(monto.valor)}
                    className={`p-4 rounded-xl border-2 transition-all text-left ${
                      selectedAmount === monto.valor
                        ? 'border-nuclear-purple bg-nuclear-purple/10 text-nuclear-purple'
                        : 'border-nuclear-purple/20 hover:border-nuclear-purple/50 text-nuclear-black'
                    }`}
                  >
                    <div className="font-bold">{monto.etiqueta}</div>
                    <div className="text-xs opacity-70">{monto.descripcion}</div>
                  </button>
                ))}
              </div>
              
              <div className="mb-6">
                <label className="block text-sm font-semibold text-nuclear-black mb-2">
                  Monto personalizado (USD)
                </label>
                <input
                  type="number"
                  value={customAmount}
                  onChange={(e) => {
                    setCustomAmount(e.target.value)
                    setSelectedAmount('')
                  }}
                  placeholder="Ingresa otro monto"
                  className="w-full px-4 py-3 rounded-xl border border-nuclear-purple/20 focus:border-nuclear-purple focus:ring-2 focus:ring-nuclear-purple/20 transition-all"
                />
              </div>
            </div>

            {/* Impact Preview */}
            {getCurrentAmount() && impactoPorMonto[getCurrentAmount() as keyof typeof impactoPorMonto] && (
              <div className="mb-8 p-6 bg-nuclear-purple/5 rounded-2xl border border-nuclear-purple/20">
                <h4 className="font-bold text-nuclear-purple mb-3">
                  {impactoPorMonto[getCurrentAmount() as keyof typeof impactoPorMonto].title}
                </h4>
                <p className="text-sm text-nuclear-violet mb-3">Tu donación permitirá:</p>
                <ul className="space-y-2">
                  {impactoPorMonto[getCurrentAmount() as keyof typeof impactoPorMonto].items.map((item, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <span className="text-nuclear-purple mt-1">•</span>
                      <span className="text-nuclear-violet">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Payment Methods */}
            <div className="mb-6">
              <h4 className="font-semibold text-nuclear-black mb-4">Método de pago</h4>
              <div className="space-y-3">
                <button
                  onClick={() => window.open(generateDonationUrl('paypal'), '_blank')}
                  disabled={!getCurrentAmount()}
                  className="w-full flex items-center justify-between p-4 bg-blue-50 border border-blue-200 rounded-xl hover:bg-blue-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M7.076 21.337H2.47a.641.641 0 0 1-.633-.74L4.944 2.79A.649.649 0 0 1 5.583 2H12.85a.649.649 0 0 1 .639.79l-3.107 17.797a.641.641 0 0 1-.633.75h-2.673z"/>
                      </svg>
                    </div>
                    <span className="font-medium text-nuclear-black">PayPal</span>
                  </div>
                  <span className="text-sm text-nuclear-violet">Seguro y global</span>
                </button>

                <button
                  onClick={() => window.open(generateDonationUrl('whatsapp'), '_blank')}
                  disabled={!getCurrentAmount()}
                  className="w-full flex items-center justify-between p-4 bg-green-50 border border-green-200 rounded-xl hover:bg-green-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                      </svg>
                    </div>
                    <span className="font-medium text-nuclear-black">WhatsApp</span>
                  </div>
                  <span className="text-sm text-nuclear-violet">Contacto directo</span>
                </button>

                <button
                  onClick={() => window.open(generateDonationUrl('pse'), '_blank')}
                  disabled={!getCurrentAmount()}
                  className="w-full flex items-center justify-between p-4 bg-purple-50 border border-purple-200 rounded-xl hover:bg-purple-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-purple-500 rounded-lg flex items-center justify-center">
                      <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                      </svg>
                    </div>
                    <span className="font-medium text-nuclear-black">Transferencia PSE</span>
                  </div>
                  <span className="text-sm text-nuclear-violet">Bancos colombianos</span>
                </button>
              </div>
            </div>

            {/* Additional Methods */}
            <div className="pt-6 border-t border-nuclear-purple/20">
              <p className="text-sm text-nuclear-violet mb-3">También puedes usar:</p>
              <div className="flex flex-wrap gap-3">
                {metodosAdicionales.map((metodo, index) => (
                  <span key={index} className="bg-nuclear-purple/10 text-nuclear-purple px-3 py-1 rounded-full text-sm">
                    {metodo}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Ways to Support */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Formas de Apoyar</h3>
              <div className="space-y-6">
                {formasDeApoyo.map((forma, index) => (
                  <div key={index} className={`bg-gradient-to-r ${forma.color} rounded-2xl p-6 text-white`}>
                    <div className="flex items-start space-x-4">
                      <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center flex-shrink-0">
                        {forma.icon}
                      </div>
                      <div>
                        <h4 className="text-lg font-bold mb-2">{forma.title}</h4>
                        <p className="text-white/90 text-sm leading-relaxed">{forma.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Transparency */}
            <div className="bg-nuclear-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-4">Transparencia Total</h3>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-nuclear-yellow rounded-full"></div>
                  <span className="text-white/80 text-sm">100% de las donaciones van directamente a proyectos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-nuclear-yellow rounded-full"></div>
                  <span className="text-white/80 text-sm">Reportes mensuales de impacto y gastos</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-nuclear-yellow rounded-full"></div>
                  <span className="text-white/80 text-sm">Reconocimiento público a patrocinadores</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-nuclear-yellow rounded-full"></div>
                  <span className="text-white/80 text-sm">Participación en decisiones de proyecto</span>
                </div>
              </div>
            </div>

            {/* Success Stories */}
            <div className="bg-nuclear-yellow/20 rounded-2xl p-8">
              <h3 className="text-xl font-bold text-white mb-4">Historias de Éxito</h3>
              <div className="space-y-4">
                <div className="border-l-3 border-nuclear-yellow pl-4">
                  <p className="text-white/90 text-sm italic mb-2">
                    "Gracias al apoyo recibido, pudimos crear nuestro primer mural interactivo que ahora es visitado por cientos de personas cada semana."
                  </p>
                  <span className="text-nuclear-yellow text-xs font-semibold">— Proyecto Mural Digital 2024</span>
                </div>
                <div className="border-l-3 border-nuclear-yellow pl-4">
                  <p className="text-white/90 text-sm italic mb-2">
                    "El apoyo económico nos permitió equipar nuestro laboratorio y formar a más de 100 artistas en herramientas de IA."
                  </p>
                  <span className="text-nuclear-yellow text-xs font-semibold">— Laboratorio IA Creativa 2024</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-16 text-center">
          <h3 className="text-3xl font-black text-white mb-6">
            Juntos podemos <span className="text-nuclear-yellow">democratizar</span> el arte con IA
          </h3>
          <p className="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
            Cada donación, por pequeña que sea, tiene un impacto real en nuestra comunidad. 
            Sé parte de esta revolución creativa.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573006101221?text=Hola%20quiero%20hacer%20una%20donación%20para%20apoyar%20Núcleo%20Colectivo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Donar Ahora
            </a>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-nuclear-black transition-all duration-300 transform hover:scale-105"
            >
              Más Información
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default ApoyoEconomico
