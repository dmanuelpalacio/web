import { ArrowUp, Mail, Phone, MapPin, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const Footer = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const menuItems = [
    { name: 'Inicio', href: '#inicio' },
    { name: 'Talleres', href: '#talleres' },
    { name: 'Galería', href: '#galeria' },
    { name: 'Nosotros', href: '#nosotros' },
    { name: 'FAQ', href: '#faq' },
    { name: 'Contacto', href: '#contacto' }
  ];

  const socialMedia = [
    { icon: <Instagram size={20} />, name: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: <Youtube size={20} />, name: 'YouTube', url: '#', color: 'hover:text-red-400' },
    { icon: <Twitter size={20} />, name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: <Linkedin size={20} />, name: 'LinkedIn', url: '#', color: 'hover:text-blue-500' }
  ];

  const talleres = [
    'Introducción a la IA para Procesos Creativos',
    'Arte Generativo Avanzado',
    'Música y Sonido con IA',
    'Próximamente: Video Arte con IA'
  ];

  return (
    <footer className="bg-black border-t border-gray-800">
      {/* Scroll to top button */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-center mb-8">
          <button
            onClick={scrollToTop}
            className="bg-gradient-to-r from-yellow-400 to-purple-600 p-3 rounded-full hover:scale-110 transition-transform duration-300"
          >
            <ArrowUp className="text-black" size={24} />
          </button>
        </div>

        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Logo y descripción */}
          <div className="lg:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-black font-bold text-lg">N</span>
              </div>
              <span className="text-white font-bold text-xl">Núcleo Colectivo</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed mb-4">
              Colectivo de artistas especializado en talleres de inteligencia artificial. 
              Transformamos la creatividad a través de la tecnología.
            </p>
            <div className="flex space-x-3">
              {socialMedia.map((social, index) => (
                <a
                  key={index}
                  href={social.url}
                  className={`bg-gray-800 p-2 rounded-lg text-gray-400 ${social.color} transition-colors duration-300`}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Navegación */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Navegación</h3>
            <ul className="space-y-2">
              {menuItems.map((item) => (
                <li key={item.name}>
                  <button
                    onClick={() => scrollToSection(item.href)}
                    className="text-gray-400 hover:text-yellow-400 transition-colors duration-200 text-sm"
                  >
                    {item.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Talleres */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Nuestros Talleres</h3>
            <ul className="space-y-2">
              {talleres.map((taller, index) => (
                <li key={index}>
                  <span className="text-gray-400 text-sm hover:text-yellow-400 transition-colors duration-200 cursor-pointer">
                    {taller}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-white font-bold text-lg mb-4">Contacto</h3>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Mail className="text-yellow-400" size={16} />
                <span className="text-gray-400 text-sm">nucleocolectivo.art@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="text-purple-400" size={16} />
                <span className="text-gray-400 text-sm">+54 11 1234-5678</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="text-green-400" size={16} />
                <span className="text-gray-400 text-sm">Buenos Aires, Argentina</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-gray-900 rounded-lg border border-gray-700">
              <h4 className="text-white font-semibold text-sm mb-2">¿Listo para empezar?</h4>
              <button
                onClick={() => scrollToSection('#contacto')}
                className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold py-2 px-4 rounded-lg text-xs hover:scale-105 transition-transform duration-300"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>

        {/* Newsletter */}
        <div className="bg-gray-900 rounded-xl p-6 mb-8 border border-gray-700">
          <div className="text-center max-w-2xl mx-auto">
            <h3 className="text-white font-bold text-xl mb-2">Mantente Actualizado</h3>
            <p className="text-gray-400 text-sm mb-4">
              Suscríbete para recibir noticias sobre nuevos talleres, eventos especiales y recursos gratuitos
            </p>
            <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <input
                type="email"
                placeholder="tu@email.com"
                className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white text-sm focus:outline-none focus:border-yellow-400 transition-colors duration-300"
              />
              <button className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold py-2 px-6 rounded-lg text-sm hover:scale-105 transition-transform duration-300">
                Suscribirse
              </button>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © 2025 Núcleo Colectivo. Todos los derechos reservados.
            </div>
            
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Política de Privacidad
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Términos de Servicio
              </a>
              <a href="#" className="text-gray-400 hover:text-yellow-400 transition-colors duration-200">
                Política de Cookies
              </a>
            </div>
          </div>

          <div className="text-center mt-6 pt-6 border-t border-gray-800">
            <p className="text-gray-500 text-xs">
              Desarrollado con ❤️ para la comunidad artística digital
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
