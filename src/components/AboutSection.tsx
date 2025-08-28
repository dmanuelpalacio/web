import { Users, Target, Heart, Zap, Award, Globe } from 'lucide-react';

const AboutSection = () => {
  const equipo = [
    {
      nombre: 'María González',
      rol: 'Co-fundadora & Directora Creativa',
      especialidad: 'Arte Digital y Desarrollo IA',
      descripcion: 'Artista digital con 8 años de experiencia, especializada en la intersección entre arte y tecnología. Pionera en el uso de GAN para creación artística.',
      gradient: 'from-yellow-400 to-orange-500'
    },
    {
      nombre: 'Carlos Ruiz',
      rol: 'Co-fundador & Director Técnico',
      especialidad: 'Arte Generativo y Algoritmos Creativos',
      descripcion: 'Ingeniero y artista generativo, experto en sistemas complejos y algoritmos creativos. Ha expuesto sus obras en galerías internacionales.',
      gradient: 'from-purple-500 to-pink-500'
    },
    {
      nombre: 'Ana Martínez',
      rol: 'Coordinadora Pedagógica',
      especialidad: 'UX Design y Educación Tecnológica',
      descripcion: 'Diseñadora UX con enfoque en IA, especialista en metodologías de enseñanza innovadoras para la integración de tecnología en procesos creativos.',
      gradient: 'from-blue-500 to-cyan-400'
    },
    {
      nombre: 'Roberto Silva',
      rol: 'Instructor de Audio IA',
      especialidad: 'Composición Musical y Tecnología',
      descripcion: 'Compositor y tecnólogo musical, experto en síntesis de sonido asistida por IA y paisajes sonoros generativos.',
      gradient: 'from-green-500 to-teal-400'
    }
  ];

  const valores = [
    {
      icon: <Heart className="text-red-400" size={32} />,
      titulo: 'Pasión por el Arte',
      descripcion: 'Creemos que la tecnología debe amplificar la expresión artística, no reemplazarla.'
    },
    {
      icon: <Zap className="text-yellow-400" size={32} />,
      titulo: 'Innovación Constante',
      descripcion: 'Exploramos continuamente nuevas herramientas y técnicas para mantener a nuestros artistas a la vanguardia.'
    },
    {
      icon: <Users className="text-blue-400" size={32} />,
      titulo: 'Comunidad Colaborativa',
      descripcion: 'Fomentamos un ambiente de aprendizaje mutuo donde cada artista aporta su perspectiva única.'
    },
    {
      icon: <Target className="text-purple-400" size={32} />,
      titulo: 'Enfoque Práctico',
      descripcion: 'Nuestros talleres están diseñados para aplicar inmediatamente lo aprendido en proyectos reales.'
    }
  ];

  const logros = [
    { numero: '150+', descripcion: 'Artistas Formados', icon: <Users className="text-yellow-400" size={24} /> },
    { numero: '25+', descripcion: 'Exposiciones Colectivas', icon: <Award className="text-purple-400" size={24} /> },
    { numero: '5', descripcion: 'Países Participantes', icon: <Globe className="text-blue-400" size={24} /> },
    { numero: '3', descripcion: 'Años de Experiencia', icon: <Target className="text-green-400" size={24} /> }
  ];

  return (
    <section id="nosotros" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Somos <span className="bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
              Núcleo Colectivo
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Un colectivo de artistas, tecnólogos y educadores unidos por la visión de democratizar 
            las herramientas de inteligencia artificial en el arte contemporáneo
          </p>
        </div>

        {/* Misión y Visión */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-20">
          <div className="bg-gradient-to-br from-yellow-400/10 to-purple-600/10 border border-yellow-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Nuestra Misión</h3>
            <p className="text-gray-300 leading-relaxed">
              Empoderar a artistas de todas las disciplinas con las herramientas y conocimientos necesarios 
              para integrar la inteligencia artificial en sus procesos creativos, creando un puente entre 
              la tradición artística y la innovación tecnológica.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-600/10 to-yellow-400/10 border border-purple-400/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-4">Nuestra Visión</h3>
            <p className="text-gray-300 leading-relaxed">
              Ser el referente latinoamericano en educación artística con IA, formando una comunidad 
              global de artistas que utilicen la tecnología como extensión natural de su creatividad, 
              redefiniendo los límites del arte contemporáneo.
            </p>
          </div>
        </div>

        {/* Valores */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Nuestros Valores</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {valores.map((valor, index) => (
              <div key={index} className="bg-gray-800 rounded-xl p-6 text-center hover:bg-gray-750 transition-colors duration-300">
                <div className="flex justify-center mb-4">
                  {valor.icon}
                </div>
                <h4 className="text-xl font-bold text-white mb-3">{valor.titulo}</h4>
                <p className="text-gray-300 text-sm leading-relaxed">{valor.descripcion}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Logros */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-white text-center mb-12">Nuestro Impacto</h3>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {logros.map((logro, index) => (
              <div key={index} className="text-center bg-gray-800 rounded-xl p-6">
                <div className="flex justify-center mb-3">
                  {logro.icon}
                </div>
                <div className="text-3xl font-bold text-white mb-2">{logro.numero}</div>
                <div className="text-gray-400 text-sm">{logro.descripcion}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Equipo */}
        <div>
          <h3 className="text-3xl font-bold text-white text-center mb-12">Nuestro Equipo</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {equipo.map((miembro, index) => (
              <div key={index} className="bg-gray-800 rounded-2xl overflow-hidden hover:bg-gray-750 transition-all duration-300 group">
                <div className={`h-48 bg-gradient-to-br ${miembro.gradient} relative`}>
                  <div className="absolute inset-0 bg-black/30"></div>
                  <div className="absolute bottom-4 left-6">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                      <Users className="text-white" size={24} />
                    </div>
                  </div>
                </div>
                
                <div className="p-6">
                  <h4 className="text-xl font-bold text-white mb-1">{miembro.nombre}</h4>
                  <div className="text-yellow-400 font-semibold mb-2">{miembro.rol}</div>
                  <div className="text-purple-400 text-sm mb-3">{miembro.especialidad}</div>
                  <p className="text-gray-300 text-sm leading-relaxed">{miembro.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-800 to-gray-700 rounded-2xl p-8 border border-gray-600">
            <h3 className="text-2xl font-bold text-white mb-4">¿Quieres formar parte del colectivo?</h3>
            <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
              Únete a nuestra comunidad de artistas y descubre cómo la inteligencia artificial 
              puede transformar tu práctica creativa
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#talleres')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300"
              >
                Ver Talleres
              </button>
              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-white text-white font-bold px-8 py-4 rounded-full hover:bg-white hover:text-black transition-all duration-300"
              >
                Contáctanos
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
