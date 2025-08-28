import React, { createContext, useContext, useState, useEffect } from 'react';

type Language = 'es' | 'en';

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Traducciones completas
const translations = {
  es: {
    // Navigation
    'nav.inicio': 'Inicio',
    'nav.tallerGratis': 'Taller Gratis',
    'nav.talleres': 'Talleres',
    'nav.galeria': 'Galería',
    'nav.portafolios': 'Portafolios',
    'nav.nosotros': 'Nosotros',
    'nav.faq': 'FAQ',
    'nav.contacto': 'Contacto',

    // Hero Section
    'hero.title': 'La Inteligencia Artificial es tu Nuevo Pincel.',
    'hero.subtitle': 'Descúbrelo.',
    'hero.description': 'Explora las fronteras de la creatividad en nuestros talleres de IA para artistas. Transforma tu proceso y crea obras que nunca imaginaste',
    'hero.cta': 'Ver Talleres',

    // Talleres Section
    'talleres.title': 'Nuestros Talleres Creativos',
    'talleres.description': 'Programas diseñados para artistas que quieren explorar las posibilidades infinitas de la inteligencia artificial',
    'talleres.masInfo': 'Más Información',
    'talleres.accederTaller': 'ACCEDER AL TALLER',
    'talleres.ofertaLimitada': '🔥 OFERTA LIMITADA',
    'talleres.soloPlazas': '⏰ SOLO 30 PLAZAS',
    'talleres.descuento': '💰 HASTA -48%',
    'talleres.garantia': 'Garantía 100% de satisfacción',
    'talleres.estudiantes': '2,500+ estudiantes esperando',
    'talleres.herramientas': 'Domina 50+ Herramientas',
    'talleres.intensivas': '24H Intensivas',
    'talleres.misiones': '12 Misiones',
    'talleres.tracks': '4 Tracks',
    'talleres.validoHasta': 'Oferta válida hasta 31 de Enero',
    'talleres.plazasDisponibles': '¡Solo quedan 30 plazas disponibles!',

    // Galería Section
    'galeria.title': 'Galería de Videoarte y Multimedia',
    'galeria.description': 'Explora nuestros proyectos de investigación, creación e innovación donde el arte, la tecnología y la comunidad convergen',
    'galeria.todosProyectos': 'Todos los Proyectos',
    'galeria.videoarteMultimedia': 'Videoarte y Multimedia',
    'galeria.instalacionesInteractivas': 'Instalaciones Interactivas',
    'galeria.talleresProc': 'Talleres y Procesos',
    'galeria.animacionProd': 'Animación y Producción',
    'galeria.performanceDigital': 'Performance Digital',
    'galeria.cienciaArte': 'Ciencia y Arte',
    'galeria.creadoPor': 'Creado por',
    'galeria.colectivo': 'Colectivo de arte, tecnología e innovación social',
    'galeria.verTalleres': 'Ver Talleres',
    'galeria.verEnYoutube': 'Ver en YouTube',
    'galeria.compartir': 'Compartir',
    'galeria.teInspira': '¿Te inspiran estos proyectos?',
    'galeria.participaComunidad': 'Forma parte de nuestra comunidad y participa en proyectos de arte, tecnología e innovación social',
    'galeria.explorarTalleres': 'Explorar Talleres',
    'galeria.conectarNosotros': 'Conectar con Nosotros',

    // Portafolios Section
    'portafolios.title': 'Portafolios de Artistas',
    'portafolios.description': 'Conoce el trabajo de los artistas que forman parte de nuestra comunidad creativa',
    'portafolios.subeTuPortafolio': 'Sube tu Portafolio',
    'portafolios.comparteTuArte': 'Comparte tu arte con nuestra comunidad',
    'portafolios.explorar': 'Explorar',
    'portafolios.todosArtistas': 'Todos los Artistas',
    'portafolios.pintura': 'Pintura',
    'portafolios.escultura': 'Escultura',
    'portafolios.videoarte': 'Videoarte',
    'portafolios.musica': 'Música',
    'portafolios.performance': 'Performance',
    'portafolios.multimedia': 'Multimedia',
    'portafolios.contactarArtista': 'Contactar Artista',

    // Sobre Nosotros Section
    'nosotros.title': 'Somos Núcleo Colectivo',
    'nosotros.mision': 'Nuestra Misión',
    'nosotros.misionDesc': 'Democratizar el acceso a las herramientas de inteligencia artificial para artistas y creativos, fomentando la innovación y la experimentación en el arte contemporáneo.',
    'nosotros.vision': 'Nuestra Visión',
    'nosotros.visionDesc': 'Ser el puente entre la tradición artística y las nuevas tecnologías, creando un espacio donde la creatividad humana y la inteligencia artificial convergen para generar nuevas formas de expresión.',

    // FAQ Section
    'faq.title': 'Preguntas Frecuentes',
    'faq.necesitoProgramar': '¿Necesito saber programar?',
    'faq.necesitoProgramarResp': 'No, nuestros talleres están diseñados para artistas sin conocimientos técnicos previos. Te enseñamos todo lo que necesitas saber de manera práctica y accesible.',
    'faq.queNecesito': '¿Qué necesito para los talleres?',
    'faq.queNecesitoResp': 'Solo necesitas una computadora con conexión a internet y muchas ganas de experimentar. Todas las herramientas que usamos son accesibles online.',
    'faq.comoSonClases': '¿Cómo son las clases?',
    'faq.comoSonClasesResp': 'Nuestras clases combinan teoría y práctica, con un enfoque hands-on. Trabajamos en grupos pequeños para garantizar atención personalizada.',
    'faq.precioCursos': '¿Cuál es el precio de los cursos?',
    'faq.precioCursosResp': 'Ofrecemos diferentes modalidades y precios. Contáctanos para conocer nuestras opciones de financiamiento y becas disponibles.',
    'faq.certificacion': '¿Ofrecen certificación?',
    'faq.certificacionResp': 'Sí, al completar exitosamente nuestros talleres recibes un certificado de participación avalado por Núcleo Colectivo.',

    // Contacto Section
    'contacto.title': 'Inscríbete o Contáctanos',
    'contacto.email': 'nucleocolectivo.art@gmail.com',
    'contacto.formulario': 'Formulario de Inscripción',
    'contacto.redesSociales': 'Redes Sociales',

    // Footer
    'footer.derechosReservados': 'Todos los derechos reservados',
    'footer.creador': 'CREADOR:',
    'footer.manuelPalacio': 'MANUEL PALACIO',
    'footer.especialidades': 'Desarrollador Full-Stack • Especialista en IA • Innovador Digital',

    // Biblioteca de Recursos
    'biblioteca.title': 'Biblioteca de Recursos',
    'biblioteca.description': 'Descubre herramientas, bibliotecas digitales y recursos creativos seleccionados por Núcleo Colectivo',
    'biblioteca.buscarRecursos': 'Buscar recursos...',
    'biblioteca.filtrarCategoria': 'Filtrar por categoría',
    'biblioteca.todosRecursos': 'Todos los Recursos',
    'biblioteca.inteligenciaArtificial': 'Inteligencia Artificial',
    'biblioteca.processingCodigo': 'Processing y Código',
    'biblioteca.mediosAudiovisuales': 'Medios Audiovisuales',
    'biblioteca.bibliotecasDigitales': 'Bibliotecas Digitales',
    'biblioteca.arteCultura': 'Arte y Cultura',
    'biblioteca.explorar': 'Explorar',
    'biblioteca.copiarEnlace': 'Copiar enlace',
    'biblioteca.abrirNuevaVentana': 'Abrir en nueva ventana',
    'biblioteca.maximizar': 'Maximizar',
    'biblioteca.ventanaNormal': 'Ventana normal',
    'biblioteca.cerrar': 'Cerrar',
    'biblioteca.recursoEncontrado': 'recurso encontrado',
    'biblioteca.recursosEncontrados': 'recursos encontrados',
    'biblioteca.limpiarBusqueda': 'Limpiar búsqueda',
    'biblioteca.noRecursosEncontrados': 'No se encontraron recursos',
    'biblioteca.intentaOtrosTerminos': 'Intenta con otros términos de búsqueda o cambia el filtro de categoría',
    'biblioteca.verTodosRecursos': 'Ver todos los recursos',
    'biblioteca.conocesMasRecursos': '¿Conoces más recursos útiles?',
    'biblioteca.ayudanosExpandir': 'Ayúdanos a expandir nuestra biblioteca compartiendo herramientas y recursos que conoces',
    'biblioteca.comparteRecurso': 'Comparte un Recurso',

    // ChatBot
    'chatbot.hola': '¡Hola! Soy el asistente de Núcleo Colectivo',
    'chatbot.comoAyudar': '¿Cómo puedo ayudarte hoy?',
    'chatbot.escribeMensaje': 'Escribe tu mensaje...',
    'chatbot.enviar': 'Enviar',
    'chatbot.expandir': 'Expandir',
    'chatbot.minimizar': 'Minimizar',
    'chatbot.cerrar': 'Cerrar',
    'chatbot.crearHistoria': '🎨 Crear historia juntos',
    'chatbot.inspiracion': '✨ Dame inspiración',
    'chatbot.infoTalleres': '🎓 Info talleres IA',
    'chatbot.unirseComunidad': '🤝 Unirme a comunidad',
    'chatbot.arteTecnologia': '🤖 Arte + Tecnología',
    'chatbot.retoCreativo': '🎯 Reto creativo',

    // Language Toggle
    'language.espanol': 'Español',
    'language.english': 'English',
    'language.cambiarIdioma': 'Cambiar idioma',

    // Proyectos específicos
    'proyecto.mundosPermeables': 'Mundos Permeables',
    'proyecto.sinergiaTejiodos': 'Sinergia de Tejidos',
    'proyecto.telarMacrame': 'Telar Macramé',
    'proyecto.primerTaller': 'Primer taller de Sinergia de Tejidos',
    'proyecto.residenciasRuta': 'Residencias Ruta N-UdeA',
    'proyecto.sintonias': 'Sintonías',
    'proyecto.ilustracionFelinos': 'Ilustración de felinos',
    'proyecto.ciroMundos': 'Ciro y los Mundos Intermitentes',
    'proyecto.tiemposLuz': 'Tiempos de Luz',
    'proyecto.maquetasEscenarios': 'Maquetas y escenarios',
    'proyecto.fluirMicro': 'Fluir de lo micro',
    'proyecto.fluirMicroLive': 'Fluir de lo micro - Live act'
  },
  en: {
    // Navigation
    'nav.inicio': 'Home',
    'nav.tallerGratis': 'Free Workshop',
    'nav.talleres': 'Workshops',
    'nav.galeria': 'Gallery',
    'nav.portafolios': 'Portfolios',
    'nav.nosotros': 'About Us',
    'nav.faq': 'FAQ',
    'nav.contacto': 'Contact',

    // Hero Section
    'hero.title': 'Artificial Intelligence is your New Brush.',
    'hero.subtitle': 'Discover it.',
    'hero.description': 'Explore the frontiers of creativity in our AI workshops for artists. Transform your process and create works you never imagined',
    'hero.cta': 'View Workshops',

    // Talleres Section
    'talleres.title': 'Our Creative Workshops',
    'talleres.description': 'Programs designed for artists who want to explore the infinite possibilities of artificial intelligence',
    'talleres.masInfo': 'More Information',
    'talleres.accederTaller': 'ACCESS WORKSHOP',
    'talleres.ofertaLimitada': '🔥 LIMITED OFFER',
    'talleres.soloPlazas': '⏰ ONLY 30 SPOTS',
    'talleres.descuento': '💰 UP TO -48%',
    'talleres.garantia': '100% satisfaction guarantee',
    'talleres.estudiantes': '2,500+ students waiting',
    'talleres.herramientas': 'Master 50+ Tools',
    'talleres.intensivas': '24H Intensive',
    'talleres.misiones': '12 Missions',
    'talleres.tracks': '4 Tracks',
    'talleres.validoHasta': 'Offer valid until January 31st',
    'talleres.plazasDisponibles': 'Only 30 spots left!',

    // Galería Section
    'galeria.title': 'Video Art and Multimedia Gallery',
    'galeria.description': 'Explore our research, creation and innovation projects where art, technology and community converge',
    'galeria.todosProyectos': 'All Projects',
    'galeria.videoarteMultimedia': 'Video Art and Multimedia',
    'galeria.instalacionesInteractivas': 'Interactive Installations',
    'galeria.talleresProc': 'Workshops and Processes',
    'galeria.animacionProd': 'Animation and Production',
    'galeria.performanceDigital': 'Digital Performance',
    'galeria.cienciaArte': 'Science and Art',
    'galeria.creadoPor': 'Created by',
    'galeria.colectivo': 'Art, technology and social innovation collective',
    'galeria.verTalleres': 'View Workshops',
    'galeria.verEnYoutube': 'Watch on YouTube',
    'galeria.compartir': 'Share',
    'galeria.teInspira': 'Do these projects inspire you?',
    'galeria.participaComunidad': 'Be part of our community and participate in art, technology and social innovation projects',
    'galeria.explorarTalleres': 'Explore Workshops',
    'galeria.conectarNosotros': 'Connect with Us',

    // Portafolios Section
    'portafolios.title': 'Artist Portfolios',
    'portafolios.description': 'Meet the work of artists who are part of our creative community',
    'portafolios.subeTuPortafolio': 'Upload your Portfolio',
    'portafolios.comparteTuArte': 'Share your art with our community',
    'portafolios.explorar': 'Explore',
    'portafolios.todosArtistas': 'All Artists',
    'portafolios.pintura': 'Painting',
    'portafolios.escultura': 'Sculpture',
    'portafolios.videoarte': 'Video Art',
    'portafolios.musica': 'Music',
    'portafolios.performance': 'Performance',
    'portafolios.multimedia': 'Multimedia',
    'portafolios.contactarArtista': 'Contact Artist',

    // Sobre Nosotros Section
    'nosotros.title': 'We are Núcleo Colectivo',
    'nosotros.mision': 'Our Mission',
    'nosotros.misionDesc': 'Democratize access to artificial intelligence tools for artists and creatives, fostering innovation and experimentation in contemporary art.',
    'nosotros.vision': 'Our Vision',
    'nosotros.visionDesc': 'To be the bridge between artistic tradition and new technologies, creating a space where human creativity and artificial intelligence converge to generate new forms of expression.',

    // FAQ Section
    'faq.title': 'Frequently Asked Questions',
    'faq.necesitoProgramar': 'Do I need to know how to code?',
    'faq.necesitoProgramarResp': 'No, our workshops are designed for artists without prior technical knowledge. We teach you everything you need to know in a practical and accessible way.',
    'faq.queNecesito': 'What do I need for the workshops?',
    'faq.queNecesitoResp': 'You only need a computer with internet connection and a lot of desire to experiment. All the tools we use are accessible online.',
    'faq.comoSonClases': 'What are the classes like?',
    'faq.comoSonClasesResp': 'Our classes combine theory and practice, with a hands-on approach. We work in small groups to ensure personalized attention.',
    'faq.precioCursos': 'What is the price of the courses?',
    'faq.precioCursosResp': 'We offer different modalities and prices. Contact us to learn about our financing options and available scholarships.',
    'faq.certificacion': 'Do you offer certification?',
    'faq.certificacionResp': 'Yes, upon successfully completing our workshops you receive a certificate of participation endorsed by Núcleo Colectivo.',

    // Contacto Section
    'contacto.title': 'Register or Contact Us',
    'contacto.email': 'nucleocolectivo.art@gmail.com',
    'contacto.formulario': 'Registration Form',
    'contacto.redesSociales': 'Social Media',

    // Footer
    'footer.derechosReservados': 'All rights reserved',
    'footer.creador': 'CREATOR:',
    'footer.manuelPalacio': 'MANUEL PALACIO',
    'footer.especialidades': 'Full-Stack Developer • AI Specialist • Digital Innovator',

    // Biblioteca de Recursos
    'biblioteca.title': 'Resource Library',
    'biblioteca.description': 'Discover tools, digital libraries and creative resources selected by Núcleo Colectivo',
    'biblioteca.buscarRecursos': 'Search resources...',
    'biblioteca.filtrarCategoria': 'Filter by category',
    'biblioteca.todosRecursos': 'All Resources',
    'biblioteca.inteligenciaArtificial': 'Artificial Intelligence',
    'biblioteca.processingCodigo': 'Processing and Code',
    'biblioteca.mediosAudiovisuales': 'Audiovisual Media',
    'biblioteca.bibliotecasDigitales': 'Digital Libraries',
    'biblioteca.arteCultura': 'Art and Culture',
    'biblioteca.explorar': 'Explore',
    'biblioteca.copiarEnlace': 'Copy link',
    'biblioteca.abrirNuevaVentana': 'Open in new window',
    'biblioteca.maximizar': 'Maximize',
    'biblioteca.ventanaNormal': 'Normal window',
    'biblioteca.cerrar': 'Close',
    'biblioteca.recursoEncontrado': 'resource found',
    'biblioteca.recursosEncontrados': 'resources found',
    'biblioteca.limpiarBusqueda': 'Clear search',
    'biblioteca.noRecursosEncontrados': 'No resources found',
    'biblioteca.intentaOtrosTerminos': 'Try other search terms or change the category filter',
    'biblioteca.verTodosRecursos': 'View all resources',
    'biblioteca.conocesMasRecursos': 'Know more useful resources?',
    'biblioteca.ayudanosExpandir': 'Help us expand our library by sharing tools and resources you know',
    'biblioteca.comparteRecurso': 'Share a Resource',

    // ChatBot
    'chatbot.hola': 'Hello! I\'m the Núcleo Colectivo assistant',
    'chatbot.comoAyudar': 'How can I help you today?',
    'chatbot.escribeMensaje': 'Write your message...',
    'chatbot.enviar': 'Send',
    'chatbot.expandir': 'Expand',
    'chatbot.minimizar': 'Minimize',
    'chatbot.cerrar': 'Close',
    'chatbot.crearHistoria': '🎨 Create story together',
    'chatbot.inspiracion': '✨ Give me inspiration',
    'chatbot.infoTalleres': '🎓 AI workshop info',
    'chatbot.unirseComunidad': '🤝 Join community',
    'chatbot.arteTecnologia': '🤖 Art + Technology',
    'chatbot.retoCreativo': '🎯 Creative challenge',

    // Language Toggle
    'language.espanol': 'Español',
    'language.english': 'English',
    'language.cambiarIdioma': 'Change language',

    // Proyectos específicos
    'proyecto.mundosPermeables': 'Permeable Worlds',
    'proyecto.sinergiaTejiodos': 'Textile Synergy',
    'proyecto.telarMacrame': 'Macramé Loom',
    'proyecto.primerTaller': 'First Textile Synergy workshop',
    'proyecto.residenciasRuta': 'Ruta N-UdeA Residencies',
    'proyecto.sintonias': 'Syntonies',
    'proyecto.ilustracionFelinos': 'Feline illustration',
    'proyecto.ciroMundos': 'Ciro and the Intermittent Worlds',
    'proyecto.tiemposLuz': 'Times of Light',
    'proyecto.maquetasEscenarios': 'Models and scenarios',
    'proyecto.fluirMicro': 'Flow of the micro',
    'proyecto.fluirMicroLive': 'Flow of the micro - Live act'
  }
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('es');

  // Cargar idioma del localStorage
  useEffect(() => {
    const savedLanguage = localStorage.getItem('nucleocolectivo-language') as Language;
    if (savedLanguage && ['es', 'en'].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }
  }, []);

  // Guardar idioma en localStorage
  const handleSetLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('nucleocolectivo-language', lang);
  };

  // Función de traducción
  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage: handleSetLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
