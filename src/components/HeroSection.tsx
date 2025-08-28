import React, { useState, useEffect } from 'react'
import { useLanguage } from '../contexts/LanguageContext'

interface ContentData {
  extracted_information: string;
  features: string[];
  geographical_data: {
    ciudad: string;
    pais: string;
  };
}

interface HeroSectionProps {
  data: ContentData;
}

const HeroSection: React.FC<HeroSectionProps> = ({ data }) => {
  const { t } = useLanguage()
  
  // Estado para el carrusel de fondo
  const [currentBg, setCurrentBg] = useState(0)
  
  // Array de videos/imágenes animadas de fondo temáticas
  const backgroundVideos = [
    {
      image: '/videos/community-tech-loop.png',
      theme: 'Comunidad & Tecnología',
      animation: 'community-pulse'
    },
    {
      image: '/videos/art-painting-loop-new.png', 
      theme: 'Arte & Pintura',
      animation: 'art-flow'
    },
    {
      image: '/videos/programming-tech-loop.png',
      theme: 'Programación & Tech',
      animation: 'code-matrix'
    },
    // Nuevas imágenes de fusión arte-ciencia-tecnología
    {
      image: '/backgrounds/bg-neural-art.png',
      theme: 'Neuro Arte',
      animation: 'neural-flow'
    },
    {
      image: '/backgrounds/bg-lab-creative.png',
      theme: 'Laboratorio Creativo',
      animation: 'lab-synthesis'
    },
    {
      image: '/backgrounds/bg-digital-symphony.png',
      theme: 'Sinfonía Digital',
      animation: 'symphony-wave'
    },
    {
      image: '/backgrounds/bg-cosmic-digital.png',
      theme: 'Cosmos Digital',
      animation: 'cosmic-spiral'
    },
    {
      image: '/backgrounds/bg-ar-reality.png',
      theme: 'Realidad Aumentada',
      animation: 'ar-brush'
    },
    // Nuevas imágenes de artes clásicas con paleta expandida
    {
      image: '/backgrounds/bg-music-symphony.png',
      theme: 'Sinfonía Musical',
      animation: 'music-symphony'
    },
    {
      image: '/backgrounds/bg-theater-drama.png',
      theme: 'Teatro Dramático',
      animation: 'theater-drama'
    },
    {
      image: '/backgrounds/bg-dance-flow.png',
      theme: 'Danza Fluida',
      animation: 'dance-flow'
    },
    {
      image: '/backgrounds/bg-sculpture-digital.png',
      theme: 'Escultura Digital',
      animation: 'sculpture-carving'
    },
    {
      image: '/backgrounds/bg-literature-words.png',
      theme: 'Literatura Cósmica',
      animation: 'literature-words'
    },
    // Nuevas técnicas de pintura clásicas
    {
      image: '/backgrounds/bg-cubism-paint.png',
      theme: 'Cubismo',
      animation: 'cubism-fragments'
    },
    {
      image: '/backgrounds/bg-impressionism-paint.png',
      theme: 'Impresionismo',
      animation: 'impressionist-light'
    },
    {
      image: '/backgrounds/bg-modernism-paint.png',
      theme: 'Modernismo',
      animation: 'modernist-curves'
    },

    {
      image: '/backgrounds/bg-pencil-paint.png',
      theme: 'Dibujo a Lápiz',
      animation: 'pencil-sketch'
    },
    // Nuevas disciplinas artísticas expandidas
    {
      image: '/backgrounds/bg-cinema-film.png',
      theme: 'Cine',
      animation: 'cinema-reel'
    },
    {
      image: '/backgrounds/bg-textile-weaving.png',
      theme: 'Tejido',
      animation: 'textile-weaving'
    },
    {
      image: '/backgrounds/bg-photography-lens.png',
      theme: 'Fotografía',
      animation: 'photography-lens'
    },
    {
      image: '/backgrounds/bg-biology-science.png',
      theme: 'Biología',
      animation: 'biology-microscope'
    },
    {
      image: '/backgrounds/bg-synesthesia-senses.png',
      theme: 'Sinestesia',
      animation: 'synesthesia-waves'
    },
    // Mantenemos algunas imágenes originales con nuevas animaciones
    {
      image: '/backgrounds/bg-1.png',
      theme: 'Digital Art',
      animation: 'digital-wave'
    },
    {
      image: '/backgrounds/bg-4.png',
      theme: 'Creative Flow',
      animation: 'creative-zoom'
    },
    {
      image: '/backgrounds/bg-7.png',
      theme: 'Abstract Energy',
      animation: 'energy-pulse'
    }
  ]
  
  // Carrusel automático cada 15 segundos (tiempo óptimo para transiciones suaves)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentBg((prev) => (prev + 1) % backgroundVideos.length)
    }, 15000)
    
    return () => clearInterval(interval)
  }, [])
  return (
    <section id="inicio" className="min-h-screen relative overflow-hidden flex items-center">
      {/* Carrusel de Videos/Fondos Animados Fullscreen */}
      <div className="absolute inset-0">
        {/* Videos/Imágenes animadas de fondo en carrusel */}
        {backgroundVideos.map((video, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-[5000ms] ease-in-out ${
              index === currentBg ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-102 z-0'
            }`}
            style={{
              transition: 'opacity 5s cubic-bezier(0.4, 0, 0.2, 1), transform 5s cubic-bezier(0.4, 0, 0.2, 1)',
            }}
          >
            <div
              className={`w-full h-full bg-cover bg-center bg-no-repeat transition-all duration-[5000ms] cubic-bezier(0.4, 0, 0.2, 1) ${video.animation} ${
                index === currentBg ? 'scale-100' : 'scale-103'
              }`}
              style={{
                backgroundImage: `url(${video.image})`,
                backgroundAttachment: 'fixed',
                filter: index === currentBg ? 'blur(0px) brightness(1)' : 'blur(1px) brightness(0.7)',
                transition: 'all 5s cubic-bezier(0.4, 0, 0.2, 1)',
                willChange: 'transform, filter, opacity'
              }}
            />
            
            {/* Overlay de transición suave */}
            <div 
              className={`absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-transparent transition-opacity duration-[3000ms] ${
                index === currentBg ? 'opacity-0' : 'opacity-30'
              }`}
            />
            
            {/* Indicador del tema actual con transición suave */}
            <div className={`absolute bottom-4 left-4 bg-black/70 backdrop-blur-lg px-5 py-3 rounded-full border border-white/20 transition-all duration-[2000ms] ${
              index === currentBg ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-6 scale-95'
            }`}>
              <span className="text-white text-sm font-medium tracking-wide">{video.theme}</span>
            </div>
          </div>
        ))}
        
        {/* Overlay para legibilidad del texto */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/70 via-purple-900/60 to-black/70"></div>
        
        {/* Overlay adicional con patrón sutil */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40"></div>
        
        {/* Efectos de brillo artístico */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-radial from-nuclear-yellow/30 to-transparent rounded-full blur-3xl animate-pulse-slow"></div>
          <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-gradient-radial from-nuclear-purple/40 to-transparent rounded-full blur-2xl animate-pulse-slow" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-radial from-nuclear-yellow/25 to-transparent rounded-full blur-xl animate-float"></div>
        </div>
        
        {/* Indicadores del carrusel */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
          {backgroundVideos.map((video, index) => (
            <button
              key={index}
              onClick={() => setCurrentBg(index)}
              className={`group relative transition-all duration-300 ${
                index === currentBg 
                  ? 'scale-110' 
                  : 'scale-100 hover:scale-105'
              }`}
              title={video.theme}
            >
              {/* Indicador principal */}
              <div className={`w-4 h-4 rounded-full transition-all duration-300 ${
                index === currentBg 
                  ? 'bg-nuclear-yellow shadow-lg shadow-nuclear-yellow/50 border-2 border-white' 
                  : 'bg-white/40 hover:bg-white/60 border border-white/50'
              }`} />
              
              {/* Anillo animado para el activo */}
              {index === currentBg && (
                <div className="absolute inset-0 w-4 h-4 rounded-full border-2 border-nuclear-yellow/50 animate-ping" />
              )}
              
              {/* Tooltip del tema */}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <div className="bg-black/80 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                  {video.theme}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10 pt-16">
        <div className="max-w-5xl mx-auto text-center">
          {/* Logo Núcleo Colectivo - Bajado con margen superior */}
          <div className="mb-8 flex justify-center mt-8 md:mt-12 lg:mt-16">
            <div className="relative group">
              <img 
                src="/logo-nucleo-colectivo.png" 
                alt="Núcleo Colectivo Logo" 
                className="w-48 h-48 md:w-64 md:h-64 object-contain drop-shadow-2xl transition-transform duration-500 hover:scale-110 group-hover:drop-shadow-3xl"
              />
              {/* Glow effect behind logo */}
              <div className="absolute inset-0 w-48 h-48 md:w-64 md:h-64 bg-gradient-to-r from-nuclear-yellow/20 to-nuclear-purple/20 rounded-full blur-3xl -z-10 animate-pulse-slow"></div>
            </div>
          </div>

          {/* Main Title - Diagramación corregida */}
          <h1 className="text-2xl md:text-4xl lg:text-5xl mb-8 leading-tight mt-8 md:mt-12 lg:mt-16 max-w-4xl mx-auto">
            <span className="text-nuclear-yellow font-bold block text-center" style={{fontFamily: 'Montserrat, sans-serif', lineHeight: '1.2'}}>
              La Inteligencia Artificial es tu Nuevo Pincel.
            </span>
            <span className="text-white font-bold block text-center text-2xl md:text-4xl lg:text-5xl mt-3" style={{fontFamily: 'Montserrat, sans-serif', lineHeight: '1.1'}}>
              Descúbrelo.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl lg:text-2xl text-white/95 mb-8 font-semibold max-w-4xl mx-auto leading-relaxed">
            {t('hero.description')}
          </p>

          {/* Location */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center space-x-2 bg-black/60 backdrop-blur-md px-6 py-3 rounded-full border border-nuclear-yellow/50 shadow-2xl">
              <svg className="w-5 h-5 text-nuclear-yellow" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
              </svg>
              <span className="text-white font-bold">{data.geographical_data.ciudad}, {data.geographical_data.pais}</span>
            </div>
          </div>

          {/* Key Features */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-nuclear-purple/50 hover:border-nuclear-yellow/70 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="w-12 h-12 bg-nuclear-purple/30 rounded-full flex items-center justify-center mb-4 mx-auto border border-nuclear-purple/50">
                <svg className="w-6 h-6 text-nuclear-purple filter brightness-125" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Co-creación</h3>
              <p className="text-white/90 text-sm drop-shadow-md">Espacio para la colaboración entre artistas, emprendedores y la comunidad</p>
            </div>

            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-nuclear-yellow/50 hover:border-nuclear-purple/70 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="w-12 h-12 bg-nuclear-yellow/30 rounded-full flex items-center justify-center mb-4 mx-auto border border-nuclear-yellow/50">
                <svg className="w-6 h-6 text-nuclear-yellow filter brightness-125" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3 5a2 2 0 012-2h10a2 2 0 012 2v8a2 2 0 01-2 2h-2.22l.123.489.804.804A1 1 0 0113 18H7a1 1 0 01-.707-1.707l.804-.804L7.22 15H5a2 2 0 01-2-2V5zm5.771 7H5V5h10v7H8.771z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">IA Creativa</h3>
              <p className="text-white/90 text-sm drop-shadow-md">Integración de herramientas de inteligencia artificial para procesos creativos</p>
            </div>

            <div className="bg-black/70 backdrop-blur-xl rounded-2xl p-6 border border-nuclear-purple/50 hover:border-nuclear-yellow/70 transition-all duration-300 transform hover:scale-105 shadow-2xl">
              <div className="w-12 h-12 bg-nuclear-purple/30 rounded-full flex items-center justify-center mb-4 mx-auto border border-nuclear-purple/50">
                <svg className="w-6 h-6 text-nuclear-purple filter brightness-125" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-bold text-white mb-2 drop-shadow-lg">Transformación</h3>
              <p className="text-white/90 text-sm drop-shadow-md">Impulso de la economía creativa y el cambio social positivo</p>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://7b8m3siua7.space.minimax.io/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-black text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-110 shadow-2xl hover:shadow-nuclear-yellow/50 border-2 border-nuclear-yellow relative backdrop-blur-sm"
            >
              <span className="absolute -top-2 -right-2 bg-nuclear-purple text-white text-xs px-3 py-1 rounded-full animate-pulse font-bold shadow-lg">GRATIS</span>
              🚀 Prueba Nuestro Taller Gratis
            </a>
            <a
              href="#talleres-ia"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#talleres-ia')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-white/10 backdrop-blur-md text-white border-2 border-white px-8 py-4 rounded-full font-black text-lg hover:bg-white hover:text-nuclear-black transition-all duration-300 transform hover:scale-110 shadow-2xl"
            >
              Ver Todos los Talleres
            </a>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2 animate-bounce z-20">
        <div className="bg-black/50 backdrop-blur-md rounded-full p-3 border border-white/30 shadow-2xl">
          <svg className="w-6 h-6 text-white drop-shadow-lg" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
