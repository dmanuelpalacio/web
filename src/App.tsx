import { useState, useEffect } from 'react'
import ErrorBoundary from './components/ErrorBoundary'
import HeroSection from './components/HeroSection'
import TalleresIA from './components/TalleresIA'
import GaleriaSection from './components/GaleriaSection'

import PortafoliosArtistas from './components/PortafoliosArtistas'
import SobreNosotros from './components/SobreNosotros'
import FAQSection from './components/FAQSection'
import Contacto from './components/Contacto'
import Navigation from './components/Navigation'

import BibliotecaRecursos from './components/BibliotecaRecursos'


import { LanguageProvider, useLanguage } from './contexts/LanguageContext'
import './App.css'

interface ContentData {
  extracted_information: string;
  pricing: {
    talleres_proximos: Array<{
      nombre: string;
      precio: string;
      notas: string;
    }>;
  };
  features: string[];
  temporal_info: {
    talleres_proximos: Array<{
      nombre: string;
      fechas: string;
      horario: string;
    }>;
    copyright_year: string;
  };
  geographical_data: {
    ciudad: string;
    pais: string;
  };
  references: Array<{
    type: string;
    items?: Array<{
      texto: string;
      url: string;
      taller?: string;
    }>;
    url_action?: string;
    description?: string;
  }>;
}

// Componente interno para usar las traducciones
const AppContent = ({ contentData }: { contentData: ContentData }) => {
  const { t } = useLanguage()

  return (
    <div className="min-h-screen bg-nuclear-white font-montserrat scroll-smooth">
      <Navigation />
      
      <main>
        <HeroSection data={contentData} />
        <TalleresIA data={contentData} />
        <GaleriaSection />
        <PortafoliosArtistas />
        <SobreNosotros data={contentData} />
        <FAQSection />
        <Contacto data={contentData} />
      </main>

      <footer className="bg-nuclear-black text-nuclear-white py-8">
        <div className="container mx-auto px-4 text-center">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <h3 className="text-xl font-bold text-gradient">Núcleo Colectivo</h3>
              <p className="text-sm opacity-80">{contentData.geographical_data.ciudad}, {contentData.geographical_data.pais}</p>
            </div>
            <div className="flex space-x-6">
              <a href="mailto:contacto@nucleocolectivo.org" className="hover:text-nuclear-yellow transition-colors">
                Email
              </a>
              <a href="https://www.instagram.com/nucleo_colectivo_art/" target="_blank" rel="noopener noreferrer" className="hover:text-nuclear-yellow transition-colors">
                Instagram
              </a>
              <a href="https://wa.me/573006101221" target="_blank" rel="noopener noreferrer" className="hover:text-nuclear-yellow transition-colors">
                WhatsApp
              </a>
            </div>
          </div>
          <div className="mt-6 pt-6 border-t border-nuclear-purple/30">
            <p className="text-sm opacity-60 mb-3">
              © {contentData.temporal_info.copyright_year} Núcleo Colectivo. {t('footer.derechosReservados')}.
            </p>
            
            {/* Información del creador */}
            <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4 mt-4">
              <div className="flex items-center space-x-2">
                <span className="text-nuclear-yellow font-bold text-sm">{t('footer.creador')}</span>
                <span className="text-lg font-bold bg-gradient-to-r from-nuclear-yellow to-nuclear-purple bg-clip-text text-transparent">
                  ✨ {t('footer.manuelPalacio')} ✨
                </span>
              </div>
              <div className="text-xs text-gray-300">
                {t('footer.especialidades')}
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Botón flotante de WhatsApp - REDISTRIBUIDO Y TAMAÑO REDUCIDO */}
      <a
        href="https://wa.me/573017089007?text=Hola%20Núcleo%20Colectivo%2C%20me%20interesa%20conocer%20más%20sobre%20los%20talleres%20de%20IA%20para%20artistas"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-72 left-4 z-[9999] bg-green-500 hover:bg-green-400 text-white p-3 rounded-full transition-all duration-500 group border-2 border-green-300"
        title="¡Contáctanos por WhatsApp! 💬"
        style={{
          willChange: 'transform, box-shadow',
          boxShadow: '0 0 20px rgba(34, 197, 94, 0.8), 0 0 40px rgba(34, 197, 94, 0.6), 0 0 60px rgba(34, 197, 94, 0.4)',
          animation: 'whatsapp-glow 2s ease-in-out infinite alternate'
        }}
      >
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.893 3.488"/>
        </svg>
        {/* Indicador de disponibilidad */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full"></span>
      </a>

      {/* Widget ElevenLabs - LADO DERECHO */}
      <div 
        className="fixed bottom-24 right-4 z-[60]"
        dangerouslySetInnerHTML={{
          __html: '<elevenlabs-convai agent-id="agent_01jvahqbrgff9tky3wf1brsssp"></elevenlabs-convai>'
        }}
      />

      {/* Botón YouTube - REDISTRIBUIDO Y TAMAÑO REDUCIDO */}
      <a
        href="https://www.youtube.com/@nucleocolectivo"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-56 left-4 z-[60] bg-red-600 hover:bg-red-500 text-white p-3 rounded-full shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-110 group border-2 border-red-400"
        title="📺 Ver nuestro canal de YouTube"
        style={{
          boxShadow: '0 0 20px rgba(220, 38, 38, 0.6), 0 0 40px rgba(220, 38, 38, 0.4)',
          animation: 'youtube-glow 3s ease-in-out infinite alternate'
        }}
      >
        {/* YouTube Play Icon */}
        <svg 
          className="w-5 h-5 group-hover:animate-pulse" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
        {/* YouTube indicator */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-400 rounded-full"></span>
      </a>



      {/* Radio Button - REDISTRIBUIDO Y TAMAÑO REDUCIDO */}
      <div 
        className="fixed bottom-40 left-4 z-50 bg-purple-600 hover:bg-purple-500 text-white p-3 rounded-full shadow-2xl hover:shadow-lg transition-all duration-300 hover:scale-110 group cursor-pointer border-2 border-purple-400"
        title="🎵 Acceder a Radio Núcleo"
        style={{
          boxShadow: '0 0 20px rgba(139, 92, 246, 0.6), 0 0 40px rgba(139, 92, 246, 0.4)',
          animation: 'radio-glow 4s ease-in-out infinite alternate'
        }}
        onClick={() => {
          // TODO: Enlazar con página HTML de radio externa
          console.log('🎵 Radio Núcleo - Próximamente enlazado con página externa');
        }}
      >
        <svg 
          className="w-5 h-5 group-hover:animate-pulse" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
        </svg>
        {/* Indicador de disponibilidad */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-purple-400 rounded-full"></span>
      </div>

      {/* Instagram Button - DEBAJO DE RADIO */}
      <a
        href="https://www.instagram.com/nucleo_colectivo_art/"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-24 left-4 z-[9999] bg-pink-500 hover:bg-pink-400 text-white p-3 rounded-full transition-all duration-500 group border-2 border-pink-300"
        title="📸 Síguenos en Instagram"
        style={{
          willChange: 'transform, box-shadow',
          boxShadow: '0 0 20px rgba(236, 72, 153, 0.8), 0 0 40px rgba(236, 72, 153, 0.6), 0 0 60px rgba(236, 72, 153, 0.4)',
          animation: 'instagram-glow 2s ease-in-out infinite alternate'
        }}
      >
        <svg 
          className="w-5 h-5 transition-transform duration-300 group-hover:scale-110" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
        {/* Indicador de disponibilidad */}
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full animate-ping"></span>
        <span className="absolute -top-1 -right-1 w-3 h-3 bg-pink-400 rounded-full"></span>
      </a>



      {/* Biblioteca de Recursos */}
      <BibliotecaRecursos />
    </div>
  )
}

function App() {
  const [contentData, setContentData] = useState<ContentData | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadContent = async () => {
      try {
        const response = await fetch('/nucleocolectivo_content.json')
        const data = await response.json()
        setContentData(data)
      } catch (error) {
        console.error('Error loading content:', error)
      } finally {
        setLoading(false)
      }
    }

    loadContent()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-nuclear-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-nuclear-purple border-t-nuclear-yellow rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-nuclear-purple font-montserrat font-medium">Cargando Núcleo Colectivo...</p>
        </div>
      </div>
    )
  }

  if (!contentData) {
    return (
      <div className="min-h-screen bg-nuclear-white flex items-center justify-center">
        <div className="text-center">
          <p className="text-nuclear-black font-montserrat font-medium">Error al cargar el contenido</p>
        </div>
      </div>
    )
  }

  return (
    <LanguageProvider>
      <ErrorBoundary>
        <AppContent contentData={contentData} />
      </ErrorBoundary>
    </LanguageProvider>
  )
}

// CSS Animations para efectos glow
const style = document.createElement('style');
style.textContent = `
  @keyframes whatsapp-glow {
    0% {
      box-shadow: 0 0 15px rgba(34, 197, 94, 0.8), 0 0 30px rgba(34, 197, 94, 0.6), 0 0 45px rgba(34, 197, 94, 0.4);
      filter: drop-shadow(0 0 10px rgba(34, 197, 94, 0.8));
    }
    100% {
      box-shadow: 0 0 25px rgba(34, 197, 94, 1), 0 0 50px rgba(34, 197, 94, 0.8), 0 0 75px rgba(34, 197, 94, 0.6), 0 0 100px rgba(34, 197, 94, 0.4);
      filter: drop-shadow(0 0 20px rgba(34, 197, 94, 1));
    }
  }
  
  @keyframes radio-glow {
    0% {
      box-shadow: 0 0 15px rgba(139, 92, 246, 0.5), 0 0 30px rgba(139, 92, 246, 0.3);
    }
    100% {
      box-shadow: 0 0 25px rgba(139, 92, 246, 0.8), 0 0 50px rgba(139, 92, 246, 0.5);
    }
  }
`;
document.head.appendChild(style);

export default App
