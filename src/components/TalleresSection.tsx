import { useState } from 'react';
import { Clock, Users, Monitor, Award, X, Calendar, MapPin } from 'lucide-react';

interface Taller {
  id: string;
  titulo: string;
  descripcion: string;
  duracion: string;
  modalidad: string;
  dirigido: string;
  precio: string;
  detalles: {
    temario: string[];
    requisitos: string[];
    instructores: string[];
    beneficios: string[];
  };
}

const TalleresSection = () => {
  const [selectedTaller, setSelectedTaller] = useState<Taller | null>(null);

  const talleres: Taller[] = [
    {
      id: 'intro-ia',
      titulo: 'Introducción a la IA para Procesos Creativos',
      descripcion: 'Descubre cómo integrar herramientas de inteligencia artificial en tu flujo de trabajo artístico y lleva tu creatividad al siguiente nivel.',
      duracion: '8 semanas',
      modalidad: 'Presencial + Virtual',
      dirigido: 'Artistas, estudiantes de arte (9° grado+)',
      precio: 'Consultar',
      detalles: {
        temario: [
          'Fundamentos de IA en el arte contemporáneo',
          'Herramientas de generación de imágenes (DALL-E, Midjourney, Stable Diffusion)',
          'Técnicas de prompt engineering avanzado',
          'Integración de IA en procesos tradicionales',
          'Ética en el arte generado por IA',
          'Proyectos prácticos colaborativos',
          'Creación de portafolio digital',
          'Presentación final de proyectos'
        ],
        requisitos: [
          'Computadora con conexión a internet',
          'Curiosidad artística y apertura al aprendizaje',
          'Conocimientos básicos de manejo de archivos digitales',
          'Ganas de experimentar y colaborar'
        ],
        instructores: [
          'María González - Artista Digital y Desarrolladora IA',
          'Carlos Ruiz - Especialista en Arte Generativo',
          'Ana Martínez - Diseñadora UX con enfoque en IA'
        ],
        beneficios: [
          'Certificado de participación oficial',
          'Acceso a comunidad privada de artistas',
          'Sesiones de mentoría individual',
          'Descuentos en talleres avanzados',
          'Portafolio digital profesional'
        ]
      }
    },
    {
      id: 'arte-generativo',
      titulo: 'Arte Generativo Avanzado',
      descripcion: 'Profundiza en técnicas avanzadas de arte generativo usando algoritmos, código creativo y sistemas de IA para crear obras únicas.',
      duracion: '6 semanas',
      modalidad: 'Presencial',
      dirigido: 'Artistas con experiencia básica en IA',
      precio: 'Consultar',
      detalles: {
        temario: [
          'Algoritmos creativos y sistemas generativos',
          'Programación creativa con Processing y p5.js',
          'Redes neuronales para arte',
          'Sistemas complejos y emergencia',
          'Arte interactivo y responsive',
          'Instalaciones digitales inmersivas'
        ],
        requisitos: [
          'Taller básico completado o experiencia equivalente',
          'Conocimientos básicos de programación (deseable)',
          'Laptop con capacidad gráfica',
          'Proyecto personal en mente'
        ],
        instructores: [
          'David López - Artista Generativo Internacional',
          'Laura Rodríguez - Investigadora en Creative AI'
        ],
        beneficios: [
          'Certificado avanzado',
          'Exposición colectiva final',
          'Networking con artistas establecidos',
          'Asesoría para proyectos comerciales'
        ]
      }
    },
    {
      id: 'musica-ia',
      titulo: 'Música y Sonido con IA',
      descripcion: 'Explora la composición musical asistida por IA, síntesis de sonido algorítmica y paisajes sonoros generativos.',
      duracion: '4 semanas',
      modalidad: 'Virtual',
      dirigido: 'Músicos, productores, artistas sonoros',
      precio: 'Consultar',
      detalles: {
        temario: [
          'Composición asistida por IA',
          'Síntesis de sonido con machine learning',
          'Paisajes sonoros generativos',
          'Herramientas: AIVA, Amper, Magenta',
          'Producción musical híbrida'
        ],
        requisitos: [
          'DAW instalado (Ableton, Logic, etc.)',
          'Conocimientos básicos de producción musical',
          'Interfaz de audio (recomendado)',
          'Auriculares de calidad'
        ],
        instructores: [
          'Roberto Silva - Compositor y Tecnólogo Musical',
          'Elena Vargas - Productora Experimental'
        ],
        beneficios: [
          'Biblioteca de samples generativos',
          'Plugins y herramientas exclusivas',
          'Colaboraciones con otros estudiantes',
          'Showcase en plataformas digitales'
        ]
      }
    }
  ];

  const Modal = ({ taller, onClose }: { taller: Taller; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">{taller.titulo}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6 space-y-6">
          {/* Info básica */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800 rounded-lg p-4">
              <Clock className="text-yellow-400 mb-2" size={20} />
              <div className="text-sm text-gray-400">Duración</div>
              <div className="text-white font-semibold">{taller.duracion}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <Monitor className="text-purple-400 mb-2" size={20} />
              <div className="text-sm text-gray-400">Modalidad</div>
              <div className="text-white font-semibold">{taller.modalidad}</div>
            </div>
            <div className="bg-gray-800 rounded-lg p-4">
              <Users className="text-yellow-400 mb-2" size={20} />
              <div className="text-sm text-gray-400">Dirigido a</div>
              <div className="text-white font-semibold">{taller.dirigido}</div>
            </div>
          </div>

          {/* Temario */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Temario del Curso</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {taller.detalles.temario.map((tema, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-gradient-to-r from-yellow-400 to-purple-600 rounded-full flex items-center justify-center text-black text-sm font-bold mt-0.5">
                    {index + 1}
                  </div>
                  <span className="text-gray-300">{tema}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Requisitos */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Requisitos</h4>
            <ul className="space-y-2">
              {taller.detalles.requisitos.map((requisito, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2"></div>
                  <span className="text-gray-300">{requisito}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Instructores */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">Instructores</h4>
            <div className="space-y-3">
              {taller.detalles.instructores.map((instructor, index) => (
                <div key={index} className="bg-gray-800 rounded-lg p-4">
                  <span className="text-white font-semibold">{instructor}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Beneficios */}
          <div>
            <h4 className="text-xl font-bold text-white mb-4">¿Qué Incluye?</h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {taller.detalles.beneficios.map((beneficio, index) => (
                <div key={index} className="flex items-center space-x-3">
                  <Award className="text-yellow-400" size={16} />
                  <span className="text-gray-300">{beneficio}</span>
                </div>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="bg-gradient-to-r from-yellow-400/10 to-purple-600/10 border border-yellow-400/20 rounded-lg p-6">
            <div className="text-center">
              <h5 className="text-xl font-bold text-white mb-2">¿Listo para comenzar?</h5>
              <p className="text-gray-300 mb-4">Contáctanos para más información y proceso de inscripción</p>
              <button
                onClick={() => {
                  document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  onClose();
                }}
                className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300"
              >
                Inscribirse Ahora
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="talleres" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Nuestros <span className="bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
              Talleres Creativos
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Programas diseñados para artistas que quieren explorar las infinitas posibilidades 
            de la inteligencia artificial en sus procesos creativos
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {talleres.map((taller) => (
            <div
              key={taller.id}
              className="bg-gray-800 rounded-2xl p-6 hover:bg-gray-750 transition-all duration-300 border border-gray-700 hover:border-yellow-400/30 group"
            >
              <div className="space-y-4">
                <h3 className="text-xl font-bold text-white group-hover:text-yellow-400 transition-colors">
                  {taller.titulo}
                </h3>
                
                <p className="text-gray-300 leading-relaxed">
                  {taller.descripcion}
                </p>

                <div className="space-y-3">
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Clock size={16} />
                    <span>{taller.duracion}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <MapPin size={16} />
                    <span>{taller.modalidad}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-400">
                    <Users size={16} />
                    <span>{taller.dirigido}</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedTaller(taller)}
                  className="w-full bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-semibold py-3 rounded-lg hover:scale-105 transition-transform duration-300"
                >
                  Más Información
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedTaller && (
        <Modal taller={selectedTaller} onClose={() => setSelectedTaller(null)} />
      )}
    </section>
  );
};

export default TalleresSection;
