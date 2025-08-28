import { useState, useEffect } from 'react'
import { Globe, X } from 'lucide-react'
import { useLanguage } from '../contexts/LanguageContext'

const Navigation = () => {
  const { t, language, setLanguage } = useLanguage()
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
      // Cerrar dropdowns al hacer scroll
      setIsLanguageDropdownOpen(false)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar dropdowns al hacer click fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      if (!target.closest('.language-dropdown') && !target.closest('.language-button')) {
        setIsLanguageDropdownOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navItems = [
    { text: t('nav.inicio'), href: '#inicio' },
    { text: t('nav.tallerGratis'), href: 'https://7b8m3siua7.space.minimax.io/', external: true },
    { text: t('nav.talleres'), href: '#talleres-ia' },
    { text: t('nav.galeria'), href: '#galeria' },
    { text: t('nav.portafolios'), href: '#portafolios' },
    { text: t('nav.nosotros'), href: '#nosotros' },
    { text: t('nav.faq'), href: '#faq' },
    { text: t('nav.contacto'), href: '#contacto' },
  ]

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
    setIsMobileMenuOpen(false)
  }

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled 
        ? 'bg-nuclear-white/95 backdrop-blur-sm shadow-lg' 
        : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <button 
              onClick={() => scrollToSection('#inicio')}
              className="flex items-center space-x-3 hover:opacity-80 transition-opacity"
            >
              <div className="w-12 h-12 bg-nuclear-yellow rounded-lg flex items-center justify-center shadow-lg">
                <svg viewBox="0 0 100 100" className="w-8 h-8">
                  {/* Núcleo symbol - simplified version of the logo */}
                  <g fill="#000000" strokeWidth="3">
                    {/* Central hexagon */}
                    <polygon points="40,25 60,25 70,40 60,55 40,55 30,40" fill="none" stroke="#000000" strokeWidth="2"/>
                    {/* Radiating lines */}
                    <line x1="20" y1="20" x2="35" y2="35" stroke="#000000" strokeWidth="3"/>
                    <line x1="50" y1="10" x2="50" y2="25" stroke="#000000" strokeWidth="3"/>
                    <line x1="80" y1="20" x2="65" y2="35" stroke="#000000" strokeWidth="3"/>
                    <line x1="85" y1="50" x2="70" y2="50" stroke="#000000" strokeWidth="3"/>
                    <line x1="80" y1="80" x2="65" y2="65" stroke="#000000" strokeWidth="3"/>
                    <line x1="50" y1="90" x2="50" y2="75" stroke="#000000" strokeWidth="3"/>
                    <line x1="20" y1="80" x2="35" y2="65" stroke="#000000" strokeWidth="3"/>
                    <line x1="15" y1="50" x2="30" y2="50" stroke="#000000" strokeWidth="3"/>
                  </g>
                </svg>
              </div>
              <div className="hidden sm:block">
                <div className={`text-lg font-bold leading-tight ${
                  isScrolled ? 'text-nuclear-black' : 'text-white'
                }`}>
                  <div>NÚCLEO</div>
                  <div className={`text-sm font-normal ${
                    isScrolled ? 'text-nuclear-purple' : 'text-nuclear-yellow'
                  }`}>COLECTIVO</div>
                </div>
              </div>
            </button>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navItems.map((item) => (
              item.external ? (
                <a
                  key={item.text}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-nuclear-yellow hover:text-nuclear-purple transition-colors font-bold bg-nuclear-yellow/20 px-3 py-1 rounded-full"
                >
                  🎓 {item.text}
                </a>
              ) : (
                <button
                  key={item.text}
                  onClick={() => scrollToSection(item.href)}
                  className={`px-3 py-2 rounded-full font-medium transition-all duration-300 transform hover:scale-105 text-sm ${
                    isScrolled
                      ? 'text-nuclear-black hover:text-nuclear-purple hover:bg-nuclear-yellow/20'
                      : 'text-white hover:text-nuclear-yellow'
                  }`}
                >
                  {item.text}
                </button>
              )
            ))}
            
            {/* Language Selector Desktop */}
            <div className="relative language-dropdown">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`language-button flex items-center space-x-2 px-3 py-2 rounded-full transition-all duration-300 ${
                  isScrolled
                    ? 'text-nuclear-black hover:bg-nuclear-yellow/20'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                <Globe className="w-4 h-4" />
                <span className="text-sm font-medium">{language.toUpperCase()}</span>
                <span className="text-xs">{language === 'es' ? '🇪🇸' : '🇺🇸'}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[120px] z-60">
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                      language === 'es' ? 'bg-nuclear-purple text-white' : 'text-gray-700'
                    }`}
                  >
                    <span>🇪🇸</span>
                    <span className="font-medium">Español</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full px-4 py-3 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 ${
                      language === 'en' ? 'bg-nuclear-purple text-white' : 'text-gray-700'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span className="font-medium">English</span>
                  </button>
                </div>
              )}
            </div>
            
            <a
              href="https://wa.me/573006101221?text=Hola%20quiero%20inscribirme%20en%20los%20talleres%20de%20IA"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-nuclear-yellow text-nuclear-black px-4 py-2 rounded-full font-semibold hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 text-sm"
            >
              ¡Inscríbete Ya!
            </a>
          </div>

          {/* Mobile Controls */}
          <div className="md:hidden flex items-center space-x-2">
            {/* Language Toggle Mobile */}
            <div className="relative language-dropdown">
              <button
                onClick={() => setIsLanguageDropdownOpen(!isLanguageDropdownOpen)}
                className={`language-button flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium transition-colors ${
                  isScrolled 
                    ? 'text-nuclear-black bg-nuclear-yellow/20' 
                    : 'text-white bg-white/10'
                }`}
              >
                <Globe className="w-3 h-3" />
                <span>{language.toUpperCase()}</span>
              </button>
              
              {isLanguageDropdownOpen && (
                <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-lg border border-gray-200 overflow-hidden min-w-[100px] z-60">
                  <div className="flex justify-between items-center px-3 py-2 bg-gray-50 border-b">
                    <span className="text-xs font-medium text-gray-600">Idioma</span>
                    <button
                      onClick={() => setIsLanguageDropdownOpen(false)}
                      className="text-gray-400 hover:text-gray-600"
                    >
                      <X className="w-3 h-3" />
                    </button>
                  </div>
                  <button
                    onClick={() => {
                      setLanguage('es');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm ${
                      language === 'es' ? 'bg-nuclear-purple text-white' : 'text-gray-700'
                    }`}
                  >
                    <span>🇪🇸</span>
                    <span>ES</span>
                  </button>
                  <button
                    onClick={() => {
                      setLanguage('en');
                      setIsLanguageDropdownOpen(false);
                    }}
                    className={`w-full px-3 py-2 text-left hover:bg-gray-50 transition-colors flex items-center space-x-2 text-sm ${
                      language === 'en' ? 'bg-nuclear-purple text-white' : 'text-gray-700'
                    }`}
                  >
                    <span>🇺🇸</span>
                    <span>EN</span>
                  </button>
                </div>
              )}
            </div>

            {/* Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-md transition-colors ${
                isScrolled ? 'text-nuclear-black' : 'text-white'
              }`}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-nuclear-white/95 backdrop-blur-sm border-t border-nuclear-purple/20 animate-in slide-in-from-top-2 duration-200">
            <div className="py-4 px-4 space-y-3 max-h-[calc(100vh-120px)] overflow-y-auto">
              {/* Header del menú móvil */}
              <div className="flex items-center justify-between pb-3 border-b border-nuclear-purple/20">
                <span className="text-nuclear-black font-bold text-sm">Menú de Navegación</span>
                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-nuclear-black/60 hover:text-nuclear-black"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              {/* Navigation Items */}
              <div className="space-y-2">
                {navItems.map((item, index) => (
                  item.external ? (
                    <a
                      key={item.text}
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between w-full text-left text-nuclear-yellow hover:text-nuclear-purple transition-colors font-bold bg-nuclear-yellow/20 px-4 py-3 rounded-lg border border-nuclear-yellow/30"
                    >
                      <span className="flex items-center space-x-2">
                        <span>🎓</span>
                        <span>{item.text}</span>
                      </span>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                      </svg>
                    </a>
                  ) : (
                    <button
                      key={item.text}
                      onClick={() => scrollToSection(item.href)}
                      className="flex items-center justify-between w-full text-left text-nuclear-black hover:text-nuclear-purple hover:bg-nuclear-purple/10 transition-all duration-200 font-medium py-3 px-4 rounded-lg"
                    >
                      <span>{item.text}</span>
                      <span className="text-xs text-nuclear-purple">#{item.href.substring(1)}</span>
                    </button>
                  )
                ))}
              </div>
              
              {/* CTA Button */}
              <div className="pt-4 border-t border-nuclear-purple/20">
                <a
                  href="https://wa.me/573006101221?text=Hola%20quiero%20inscribirme%20en%20los%20talleres%20de%20IA"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center w-full bg-nuclear-yellow text-nuclear-black px-6 py-4 rounded-full font-bold text-center hover:bg-nuclear-purple hover:text-white transition-all duration-300 shadow-lg"
                >
                  <span className="mr-2">💬</span>
                  ¡Inscríbete Ya!
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navigation
