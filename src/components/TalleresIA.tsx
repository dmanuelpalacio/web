import React, { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface ContentData {
  pricing: {
    talleres_proximos: Array<{
      nombre: string;
      precio: string;
      notas: string;
    }>;
  };
  temporal_info: {
    talleres_proximos: Array<{
      nombre: string;
      fechas: string;
      horario: string;
    }>;
  };
}

interface TalleresIAProps {
  data: ContentData;
}

interface TallerCompleto {
  nombre: string;
  precio: string;
  notas: string;
  fechas: string;
  horario: string;
  url?: string;
}

const TalleresIA: React.FC<TalleresIAProps> = ({ data }) => {
  const { t } = useLanguage()
  const [selectedTaller, setSelectedTaller] = useState<TallerCompleto | null>(null)

  // Taller gratuito destacado
  const tallerGratuito: TallerCompleto = {
    nombre: 'IA Básica - Experiencia Interactiva Gratuita',
    precio: 'GRATIS',
    notas: 'Sin registro requerido • 10-15 minutos',
    fechas: 'Disponible 24/7',
    horario: 'A tu ritmo, cuando quieras'
  }

  // Nuevos talleres con enlaces
  const talleresEspeciales: TallerCompleto[] = [
    {
      nombre: 'REVOLUCIÓN IA 360°',
      precio: 'Desde $499',
      notas: '24 Horas Intensivas • 4 Tracks • 50+ Herramientas • Oferta hasta 31 Enero',
      fechas: 'Próxima fecha: Febrero 2025',
      horario: '2-3 días intensivos',
      url: 'https://q3dx839pz9.space.minimax.io/'
    },
    {
      nombre: 'IA OMNIPOTENCIA ACADEMY',
      precio: '100% GRATIS',
      notas: 'EL PRIMER TALLER-VIDEOJUEGO DE IA DEL UNIVERSO • 12 Semanas • Comunidad 5000+ • Sin Costo',
      fechas: 'Disponible ahora',
      horario: 'A tu ritmo',
      url: 'https://xhez6tou3i.space.minimax.io/'
    },
    {
      nombre: 'Educación IA Global',
      precio: 'GRATIS',
      notas: 'Experiencia Interactiva • 6 Módulos • WebRTC • TensorFlow.js',
      fechas: 'Disponible 24/7',
      horario: '60-90 minutos',
      url: 'https://62w87p22fn.space.minimax.io/'
    }
  ]

  // Combinar información de precios y fechas
  const talleresCompletos: TallerCompleto[] = [
    tallerGratuito,
    ...talleresEspeciales,
    ...data.pricing.talleres_proximos.map(taller => {
      const fechaInfo = data.temporal_info.talleres_proximos.find(t => t.nombre === taller.nombre)
      return {
        ...taller,
        fechas: fechaInfo?.fechas || 'Fechas por confirmar',
        horario: fechaInfo?.horario || 'Horario por confirmar'
      }
    })
  ]

  const getDescripcion = (nombre: string) => {
    const descripciones: {[key: string]: string} = {
      'IA Básica - Experiencia Interactiva Gratuita': 'Aprende Inteligencia Artificial de manera visual e interactiva. Descubre cómo funciona la IA a través de módulos cortos diseñados para artistas y técnicos, pero aptos para todos los niveles.',
      'REVOLUCIÓN IA 360°': 'El taller más REVOLUCIONARIO de IA jamás diseñado. Domina las 50+ herramientas que están cambiando el mundo en 2025. 4 tracks especializados: IA Creativa, Emprendimiento, Educación y Desarrollo No-Code.',
      'IA OMNIPOTENCIA ACADEMY': 'EL PRIMER TALLER-VIDEOJUEGO DE IA DEL UNIVERSO. Completamente GRATUITO. Conviértete en Maestro Omnipotente de la IA en 12 semanas con sistema gamificado, 4 clases especializadas y comunidad de 5000+ players.',
      'Educación IA Global': 'Experiencia educativa única que combina inteligencia artificial, colaboración en tiempo real y transformación social. 6 módulos inmersivos desde fundamentos hasta ética aplicada.',
      'IA para Procesos Creativos': 'Aprende a integrar herramientas de inteligencia artificial en tu flujo de trabajo creativo. Desde generación de imágenes hasta optimización de procesos artísticos.',
      'IA para la Creación Colectiva': 'Explora cómo la IA puede potenciar proyectos colaborativos y la creación en equipo. Herramientas para co-crear con IA y otros artistas.',
      'Programación Creativa con IA': 'Combina programación y creatividad usando IA. Aprende a crear código que genere arte, música y experiencias interactivas.'
    }
    return descripciones[nombre] || 'Descripción del taller próximamente disponible.'
  }

  const getThumbnail = (nombre: string) => {
    if (nombre.includes('IA Básica')) {
      return '/images/thumbnail-ia-basica.png'
    } else if (nombre.includes('REVOLUCIÓN IA 360°')) {
      return '/images/thumbnail-revolucion-ia.png'
    } else if (nombre.includes('OMNIPOTENCIA ACADEMY')) {
      return '/images/thumbnail-omnipotencia.png'
    } else if (nombre.includes('Educación IA Global')) {
      return '/images/thumbnail-educacion-global.png'
    } else if (nombre.includes('Procesos Creativos')) {
      return '/images/thumbnail-procesos-creativos.png'
    } else if (nombre.includes('Creación Colectiva')) {
      return '/images/thumbnail-creacion-colectiva.png'
    } else if (nombre.includes('Programación Creativa')) {
      return '/images/thumbnail-programacion-creativa.png'
    } else {
      return '/images/thumbnail-ia-basica.png' // Default thumbnail
    }
  }

  const getIcono = (nombre: string) => {
    if (nombre.includes('IA Básica')) {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      )
    } else if (nombre.includes('REVOLUCIÓN IA 360°')) {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
        </svg>
      )
    } else if (nombre.includes('OMNIPOTENCIA ACADEMY')) {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
        </svg>
      )
    } else if (nombre.includes('Educación IA Global')) {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3zM3.31 9.397L5 10.12v4.102a8.969 8.969 0 00-1.05-.174 1 1 0 01-.89-.89 11.115 11.115 0 01.25-3.762zM9.3 16.573A9.026 9.026 0 007 14.935v-3.957l1.818.78a3 3 0 002.364 0l5.508-2.361a11.026 11.026 0 01.25 3.762 1 1 0 01-.89.89 8.968 8.968 0 00-5.35 2.524 1 1 0 01-1.4 0zM6 18a1 1 0 001-1v-2.065a8.935 8.935 0 00-2-.712V17a1 1 0 001 1z" />
        </svg>
      )
    } else if (nombre.includes('Procesos Creativos')) {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
        </svg>
      )
    } else if (nombre.includes('Creación Colectiva')) {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
        </svg>
      )
    } else {
      return (
        <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      )
    }
  }

  const getTituloCorto = (nombre: string) => {
    if (nombre.includes('IA Básica')) {
      return 'IA BÁSICA'
    } else if (nombre.includes('REVOLUCIÓN IA 360°')) {
      return 'REVOLUCIÓN IA 360°'
    } else if (nombre.includes('OMNIPOTENCIA ACADEMY')) {
      return 'OMNIPOTENCIA ACADEMY'
    } else if (nombre.includes('Educación IA Global')) {
      return 'EDUCACIÓN IA GLOBAL'
    } else if (nombre.includes('Procesos Creativos')) {
      return 'PROCESOS CREATIVOS'
    } else if (nombre.includes('Creación Colectiva')) {
      return 'CREACIÓN COLECTIVA'
    } else if (nombre.includes('Programación Creativa')) {
      return 'PROGRAMACIÓN CREATIVA'
    } else {
      return nombre
    }
  }

  return (
    <section id="talleres-ia" className="py-20 bg-gradient-to-br from-nuclear-white via-nuclear-purple/5 to-nuclear-violet/10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-yellow/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-nuclear-black mb-4">
            {t('talleres.title')}
          </h2>
          <p className="text-xl text-nuclear-violet max-w-3xl mx-auto">
            {t('talleres.description')}
          </p>
        </div>

        {/* BOTÓN SÚPER LLAMATIVO - REVOLUCIÓN IA 360° */}
        <div className="mb-16 relative">
          {/* Fondo animado */}
          <div className="absolute inset-0 bg-gradient-to-r from-red-500 via-nuclear-yellow to-nuclear-purple rounded-3xl animate-pulse opacity-75"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-nuclear-yellow via-red-500 to-nuclear-violet rounded-3xl animate-pulse opacity-50" style={{ animationDelay: '0.5s' }}></div>
          
          {/* Contenido principal */}
          <div className="relative bg-gradient-to-br from-nuclear-black via-gray-900 to-nuclear-black rounded-3xl p-8 md:p-12 border-4 border-nuclear-yellow shadow-2xl overflow-hidden">
            {/* Efectos de fondo mejorados */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
              {/* Partículas principales */}
              <div className="absolute top-4 left-4 w-16 h-16 bg-nuclear-yellow/30 rounded-full animate-ping shadow-lg"></div>
              <div className="absolute top-12 right-12 w-12 h-12 bg-red-500/30 rounded-full animate-ping shadow-lg" style={{ animationDelay: '0.3s' }}></div>
              <div className="absolute bottom-6 left-1/2 w-20 h-20 bg-nuclear-purple/30 rounded-full animate-ping shadow-lg" style={{ animationDelay: '0.6s' }}></div>
              
              {/* Partículas secundarias */}
              <div className="absolute top-1/3 left-12 w-8 h-8 bg-orange-500/25 rounded-full animate-ping" style={{ animationDelay: '0.9s' }}></div>
              <div className="absolute top-2/3 right-20 w-10 h-10 bg-green-500/25 rounded-full animate-ping" style={{ animationDelay: '1.2s' }}></div>
              <div className="absolute bottom-16 left-1/4 w-6 h-6 bg-blue-500/25 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
              
              {/* Efectos de destello */}
              <div className="absolute top-1/4 right-1/4 w-4 h-4 bg-white/40 rounded-full animate-pulse"></div>
              <div className="absolute bottom-1/3 left-1/3 w-3 h-3 bg-white/30 rounded-full animate-pulse" style={{ animationDelay: '0.7s' }}></div>
            </div>

            {/* Badge LIMITADO FLOTANTE */}
            <div className="absolute top-8 right-8 z-20">
              <div className="relative">
                {/* Glow effect del badge */}
                <div className="absolute inset-0 bg-red-500 rounded-full blur-lg opacity-75 animate-pulse scale-110"></div>
                
                {/* Badge principal flotante */}
                <div className="relative bg-gradient-to-r from-red-600 to-red-500 text-white px-6 py-3 rounded-full font-black text-sm md:text-base shadow-2xl transform rotate-12 animate-bounce border-4 border-white backdrop-blur-sm">
                  <div className="flex items-center space-x-2">
                    <span className="animate-pulse">🔥</span>
                    <span>{t('talleres.ofertaLimitada')}</span>
                    <span className="animate-pulse">🔥</span>
                  </div>
                  
                  {/* Efecto de brillo adicional */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent rounded-full animate-ping opacity-50"></div>
                </div>
                
                {/* Sombra flotante */}
                <div className="absolute top-2 left-2 w-full h-full bg-red-900/30 rounded-full blur-md -z-10 transform rotate-12"></div>
              </div>
            </div>

            {/* Badge URGENCIA FLOTANTE - Lado Izquierdo */}
            <div className="absolute top-20 left-8 z-20">
              <div className="relative">
                {/* Glow effect del badge urgencia */}
                <div className="absolute inset-0 bg-orange-500 rounded-full blur-md opacity-60 animate-pulse scale-105"></div>
                
                {/* Badge urgencia flotante */}
                <div className="relative bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-2 rounded-full font-bold text-xs md:text-sm shadow-xl transform -rotate-12 animate-bounce border-2 border-white" style={{ animationDelay: '0.5s' }}>
                  <div className="flex items-center space-x-1">
                    <span className="animate-pulse">⏰</span>
                    <span>SOLO 30 PLAZAS</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Badge DESCUENTO FLOTANTE - Parte Inferior */}
            <div className="absolute bottom-8 right-16 z-20">
              <div className="relative">
                {/* Glow effect del badge descuento */}
                <div className="absolute inset-0 bg-green-500 rounded-full blur-lg opacity-70 animate-pulse scale-110"></div>
                
                {/* Badge descuento flotante */}
                <div className="relative bg-gradient-to-r from-green-600 to-green-500 text-white px-5 py-2 rounded-full font-black text-sm shadow-2xl transform rotate-6 animate-bounce border-3 border-white" style={{ animationDelay: '1s' }}>
                  <div className="flex items-center space-x-1">
                    <span className="animate-pulse">💰</span>
                    <span>HASTA -48%</span>
                    <span className="animate-pulse">💰</span>
                  </div>
                  
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent rounded-full animate-ping opacity-40"></div>
                </div>
              </div>
            </div>

            <div className="relative z-10 text-center">
              {/* Título Principal */}
              <div className="mb-6">
                <div className="text-nuclear-yellow text-lg font-bold mb-2 animate-pulse">
                  🚀 TALLER INTENSIVO EXCLUSIVO 🚀
                </div>
                <h3 className="text-4xl md:text-6xl font-black text-white mb-4 leading-tight">
                  <span className="bg-gradient-to-r from-nuclear-yellow via-red-500 to-nuclear-purple bg-clip-text text-transparent animate-pulse">
                    REVOLUCIÓN
                  </span>
                  <br />
                  <span className="text-nuclear-yellow">IA 360°</span>
                </h3>
                <div className="text-xl md:text-2xl text-nuclear-yellow font-bold mb-2">
                  Domina 50+ Herramientas de IA en 24 Horas
                </div>
                <div className="text-lg text-white/90">
                  El catálogo más completo de herramientas revolucionarias 2025
                </div>
              </div>

              {/* Características destacadas */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="bg-nuclear-yellow/20 rounded-2xl p-4 border border-nuclear-yellow/50">
                  <div className="text-2xl font-black text-nuclear-yellow">50+</div>
                  <div className="text-white text-sm">Herramientas IA</div>
                </div>
                <div className="bg-red-500/20 rounded-2xl p-4 border border-red-500/50">
                  <div className="text-2xl font-black text-red-400">24H</div>
                  <div className="text-white text-sm">Intensivas</div>
                </div>
                <div className="bg-nuclear-purple/20 rounded-2xl p-4 border border-nuclear-purple/50">
                  <div className="text-2xl font-black text-nuclear-purple">12</div>
                  <div className="text-white text-sm">Misiones Épicas</div>
                </div>
                <div className="bg-green-500/20 rounded-2xl p-4 border border-green-500/50">
                  <div className="text-2xl font-black text-green-400">4</div>
                  <div className="text-white text-sm">Tracks</div>
                </div>
              </div>

              {/* Herramientas destacadas */}
              <div className="mb-8">
                <div className="text-nuclear-yellow font-bold mb-3">🛠️ Herramientas Incluidas:</div>
                <div className="flex flex-wrap justify-center gap-2 text-sm">
                  {['Sora', 'DeepSeek R1', 'ElevenLabs', 'Runway ML', 'ChatGPT Plus', 'Bolt.new', 'NotebookLM', 'Gamma', 'CrewAI', 'Midjourney V6'].map((tool, index) => (
                    <span key={index} className="bg-white/10 text-white px-3 py-1 rounded-full border border-white/20">
                      {tool}
                    </span>
                  ))}
                </div>
              </div>

              {/* Precio y urgencia */}
              <div className="mb-8">
                <div className="text-red-400 font-bold text-lg mb-2 animate-pulse">
                  ⏰ Oferta válida hasta 31 de Enero
                </div>
                <div className="text-white mb-2">
                  <span className="text-2xl font-black">Desde $499</span>
                  <span className="text-lg line-through text-gray-400 ml-2">$899</span>
                  <span className="bg-red-500 text-white px-2 py-1 rounded-full text-sm ml-2 font-bold">-44%</span>
                </div>
                <div className="text-nuclear-yellow text-sm">
                  💎 Plan Premium: $899 (antes $1,599) • 🏆 Plan Élite: $1,299 (antes $2,499)
                </div>
              </div>

              {/* BOTÓN MEGA LLAMATIVO */}
              <div className="space-y-4">
                <a
                  href="https://q3dx839pz9.space.minimax.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block relative group"
                >
                  {/* Efecto de glow */}
                  <div className="absolute inset-0 bg-gradient-to-r from-nuclear-yellow via-red-500 to-nuclear-purple rounded-2xl blur-xl opacity-75 group-hover:opacity-100 transition-opacity animate-pulse"></div>
                  
                  {/* Botón principal */}
                  <div className="relative bg-gradient-to-r from-nuclear-yellow via-red-500 to-nuclear-purple p-1 rounded-2xl">
                    <div className="bg-nuclear-black rounded-2xl px-8 py-4 group-hover:bg-transparent transition-all duration-300">
                      <div className="flex items-center justify-center space-x-3">
                        <span className="text-2xl animate-bounce">🚀</span>
                        <span className="text-2xl md:text-3xl font-black text-nuclear-yellow group-hover:text-white transition-colors">
                          {t('talleres.accederTaller')}
                        </span>
                        <span className="text-2xl animate-bounce">⚡</span>
                      </div>
                      <div className="text-sm text-nuclear-yellow/80 group-hover:text-white/80 font-medium mt-1">
                        {t('talleres.plazasDisponibles')}
                      </div>
                    </div>
                  </div>
                </a>

                {/* Indicadores adicionales */}
                <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-sm text-white/80">
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
                    <span>{t('talleres.estudiantes')}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="w-3 h-3 bg-nuclear-yellow rounded-full animate-pulse"></span>
                    <span>Garantía 100% de satisfacción</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Categorización de Talleres */}
        <div className="mb-16">
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {/* Talleres Gratuitos */}
            <div className="text-center p-6 bg-nuclear-yellow/10 rounded-3xl border-2 border-nuclear-yellow/30">
              <div className="w-16 h-16 bg-nuclear-yellow/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-nuclear-black mb-2">Talleres Gratuitos</h3>
              <p className="text-sm text-nuclear-violet">Experiencias introductorias sin costo</p>
            </div>

            {/* Talleres Premium */}
            <div className="text-center p-6 bg-nuclear-purple/10 rounded-3xl border-2 border-nuclear-purple/30">
              <div className="w-16 h-16 bg-nuclear-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-nuclear-black mb-2">Talleres Premium</h3>
              <p className="text-sm text-nuclear-violet">Programas intensivos y especializados</p>
            </div>

            {/* Talleres Regulares */}
            <div className="text-center p-6 bg-nuclear-violet/10 rounded-3xl border-2 border-nuclear-violet/30">
              <div className="w-16 h-16 bg-nuclear-violet/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-nuclear-violet" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-nuclear-black mb-2">Talleres Regulares</h3>
              <p className="text-sm text-nuclear-violet">Formación estructurada en IA creativa</p>
            </div>
          </div>
        </div>

        {/* Talleres Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {talleresCompletos.map((taller, index) => {
            const isGratuito = taller.nombre.includes('IA Básica') || taller.precio.includes('GRATIS')
            return (
              <div key={index} className={`group bg-nuclear-white rounded-3xl shadow-lg border transition-all duration-300 transform hover:scale-105 relative overflow-hidden ${
                isGratuito 
                  ? 'border-nuclear-yellow shadow-nuclear-yellow/20 hover:border-nuclear-yellow hover:shadow-nuclear-yellow/40' 
                  : 'border-nuclear-purple/10 hover:border-nuclear-purple/30 hover:shadow-2xl'
              }`}>
                {/* Badge GRATIS */}
                {isGratuito && (
                  <div className="absolute top-3 right-3 z-10 bg-nuclear-yellow text-nuclear-black px-3 py-1 rounded-full font-black text-xs shadow-lg transform rotate-12 animate-pulse">
                    ¡GRATIS!
                  </div>
                )}
                
                {/* Miniatura */}
                <div className="relative w-full h-48 overflow-hidden rounded-t-3xl">
                  <img 
                    src={getThumbnail(taller.nombre)} 
                    alt={getTituloCorto(taller.nombre)}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  
                  {/* Overlay con título sobre la imagen */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex items-end justify-center p-4">
                    <h3 className="text-white font-black text-lg md:text-xl text-center leading-tight">
                      {getTituloCorto(taller.nombre)}
                    </h3>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  {/* Título del taller completo */}
                  <h4 className="text-lg font-bold text-nuclear-black mb-3 group-hover:text-nuclear-purple transition-colors">
                    {taller.nombre}
                  </h4>
                  
                  <p className="text-nuclear-violet mb-4 text-sm leading-relaxed">
                    {getDescripcion(taller.nombre)}
                  </p>

                  {/* Detalles */}
                  <div className="space-y-2 mb-6">
                    <div className="flex items-center text-sm text-nuclear-black">
                      <svg className="w-4 h-4 mr-2 text-nuclear-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">{taller.fechas}</span>
                    </div>
                    <div className="flex items-center text-sm text-nuclear-black">
                      <svg className="w-4 h-4 mr-2 text-nuclear-purple flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                      </svg>
                      <span className="text-xs">{taller.horario}</span>
                    </div>
                  </div>

                  {/* Precio */}
                  <div className="mb-6">
                    <div className="text-2xl font-black text-nuclear-purple mb-1">
                      {taller.precio}
                    </div>
                    <div className="text-xs text-nuclear-violet">
                      {taller.notas}
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="space-y-3">
                    <button
                      onClick={() => setSelectedTaller(taller)}
                      className={`w-full border-2 px-4 py-2 rounded-full font-semibold text-sm transition-all duration-300 ${
                        isGratuito
                          ? 'bg-nuclear-white text-nuclear-yellow border-nuclear-yellow hover:bg-nuclear-yellow hover:text-nuclear-black'
                          : 'bg-nuclear-white text-nuclear-purple border-nuclear-purple hover:bg-nuclear-purple hover:text-white'
                      }`}
                    >
                      Ver Detalles
                    </button>
                    {/* Fix específico para IA OMNIPOTENCIA ACADEMY */}
                    {taller.nombre === 'IA OMNIPOTENCIA ACADEMY' ? (
                      <a
                        href="https://xhez6tou3i.space.minimax.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-nuclear-yellow text-nuclear-black px-4 py-3 rounded-full font-bold text-center text-sm hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        🚀 Acceder Gratis
                      </a>
                    ) : taller.url ? (
                      <a
                        href={taller.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-nuclear-yellow text-nuclear-black px-4 py-3 rounded-full font-bold text-center text-sm hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        🚀 {taller.precio.includes('GRATIS') ? 'Acceder Gratis' : 'Ver Taller'}
                      </a>
                    ) : isGratuito ? (
                      <a
                        href="https://7b8m3siua7.space.minimax.io/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-nuclear-yellow text-nuclear-black px-4 py-3 rounded-full font-bold text-center text-sm hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                      >
                        🚀 Comenzar Ahora
                      </a>
                    ) : (
                      <a
                        href={`https://wa.me/573006101221?text=Hola%20quiero%20inscribirme%20en%20el%20taller%20${encodeURIComponent(taller.nombre)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="block w-full bg-nuclear-yellow text-nuclear-black px-4 py-3 rounded-full font-bold text-center text-sm hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
                      >
                        ¡Inscríbete Ya!
                      </a>
                    )}
                  </div>
                </div>
              </div>
          )})}
        </div>

        {/* CTA Section */}
        <div className="text-center bg-nuclear-black rounded-3xl p-12 text-white">
          <h3 className="text-3xl font-black mb-4">
            ¿Listo para revolucionar tu <span className="text-nuclear-yellow">proceso creativo</span>?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Únete a nuestra comunidad de artistas innovadores y descubre el potencial infinito de la IA en el arte.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://wa.me/573006101221?text=Hola%20quiero%20más%20información%20sobre%20los%20talleres%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              {t('talleres.masInfo')}
            </a>
            <a
              href="#contacto"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-nuclear-black transition-all duration-300 transform hover:scale-105"
            >
              Contactar
            </a>
          </div>
        </div>
      </div>

      {/* Modal de Detalles */}
      {selectedTaller && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nuclear-black/80 backdrop-blur-sm">
          <div className="bg-nuclear-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-nuclear-black">{selectedTaller.nombre}</h3>
              <button
                onClick={() => setSelectedTaller(null)}
                className="w-8 h-8 bg-nuclear-purple/10 rounded-full flex items-center justify-center text-nuclear-purple hover:bg-nuclear-purple hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="font-bold text-nuclear-purple mb-2">Descripción</h4>
                <p className="text-nuclear-violet">{getDescripcion(selectedTaller.nombre)}</p>
              </div>

              {selectedTaller.nombre.includes('IA Básica') && (
                <div>
                  <h4 className="font-bold text-nuclear-purple mb-3">Módulos del Taller</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-nuclear-yellow/10 p-4 rounded-xl border border-nuclear-yellow/20">
                      <h5 className="font-bold text-nuclear-black mb-2">1. ¿Qué es la IA?</h5>
                      <p className="text-sm text-nuclear-violet mb-2">Entrena tu primera IA virtual</p>
                      <span className="text-xs bg-nuclear-yellow text-nuclear-black px-2 py-1 rounded-full">3 min</span>
                    </div>
                    <div className="bg-nuclear-purple/10 p-4 rounded-xl border border-nuclear-purple/20">
                      <h5 className="font-bold text-nuclear-black mb-2">2. Redes Neuronales</h5>
                      <p className="text-sm text-nuclear-violet mb-2">Construye una red neuronal visual</p>
                      <span className="text-xs bg-nuclear-purple text-white px-2 py-1 rounded-full">4 min</span>
                    </div>
                    <div className="bg-nuclear-violet/10 p-4 rounded-xl border border-nuclear-violet/20">
                      <h5 className="font-bold text-nuclear-black mb-2">3. Arte Generativo</h5>
                      <p className="text-sm text-nuclear-violet mb-2">Crea arte con algoritmos de IA</p>
                      <span className="text-xs bg-nuclear-violet text-white px-2 py-1 rounded-full">5 min</span>
                    </div>
                    <div className="bg-nuclear-yellow/20 p-4 rounded-xl border border-nuclear-yellow/30">
                      <h5 className="font-bold text-nuclear-black mb-2">4. Ética en IA</h5>
                      <p className="text-sm text-nuclear-violet mb-2">Explora decisiones éticas</p>
                      <span className="text-xs bg-nuclear-yellow text-nuclear-black px-2 py-1 rounded-full">3 min</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-bold text-nuclear-purple mb-2">Fechas</h4>
                  <p className="text-nuclear-black">{selectedTaller.fechas}</p>
                </div>
                <div>
                  <h4 className="font-bold text-nuclear-purple mb-2">Horario</h4>
                  <p className="text-nuclear-black">{selectedTaller.horario}</p>
                </div>
              </div>

              <div>
                <h4 className="font-bold text-nuclear-purple mb-2">Inversión</h4>
                <p className="text-2xl font-black text-nuclear-purple">{selectedTaller.precio}</p>
                <p className="text-nuclear-violet text-sm">{selectedTaller.notas}</p>
              </div>

              <div className="pt-6 border-t border-nuclear-purple/20">
                {selectedTaller.nombre.includes('IA Básica') ? (
                  <a
                    href="https://7b8m3siua7.space.minimax.io/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-center hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 shadow-lg"
                  >
                    🚀 Comenzar Taller Gratuito
                  </a>
                ) : (
                  <a
                    href={`https://wa.me/573006101221?text=Hola%20quiero%20inscribirme%20en%20el%20taller%20${encodeURIComponent(selectedTaller.nombre)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-center hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
                  >
                    ¡Inscríbete Ahora!
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default TalleresIA
