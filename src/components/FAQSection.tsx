import { useState } from 'react';
import { ChevronDown, HelpCircle } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface FAQ {
  pregunta: string;
  respuesta: string;
}

const FAQSection = () => {
  const { t } = useLanguage();
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const faqs: FAQ[] = [
    {
      pregunta: '¿Cómo accedo al taller gratuito de IA Básica?',
      respuesta: '¡Es muy fácil! El taller gratuito "IA Básica" está disponible 24/7 sin necesidad de registro. Solo haz clic en "Taller Gratis" en el menú principal o en cualquier botón "Comenzar Ahora". La experiencia dura 10-15 minutos e incluye 4 módulos interactivos: ¿Qué es la IA?, Redes Neuronales, Arte Generativo y Ética en IA. Es completamente gratuito y funciona en cualquier dispositivo.'
    },
    {
      pregunta: '¿El chatbot NúcleoBot puede ayudarme con mis proyectos?',
      respuesta: 'Sí, NúcleoBot es nuestro asistente de IA creativa especializado en arte y tecnología. Puede ayudarte con información sobre talleres, guías sobre herramientas de IA, el proceso de inscripción, el banco de artistas y preguntas generales sobre arte e inteligencia artificial. También puede conectarte directamente con nuestro equipo humano por WhatsApp cuando necesites asistencia personalizada.'
    },
    {
      pregunta: '¿Necesito conocimientos previos de programación para participar en los talleres?',
      respuesta: 'No es necesario tener conocimientos de programación. Nuestros talleres están diseñados para artistas de todos los niveles técnicos. Comenzamos desde lo básico y utilizamos herramientas intuitivas que no requieren programación. Sin embargo, si tienes experiencia técnica, podrás aprovechar módulos más avanzados.'
    },
    {
      pregunta: '¿Qué equipos o software necesito para los talleres?',
      respuesta: 'Solo necesitas una computadora con conexión a internet estable. La mayoría de herramientas que utilizamos son gratuitas o tienen versiones gratuitas disponibles. Te proporcionaremos una lista detallada de software recomendado antes del inicio del taller, junto con tutoriales de instalación.'
    },
    {
      pregunta: '¿Cómo son las clases? ¿Son presenciales o virtuales?',
      respuesta: 'Ofrecemos modalidades presencial, virtual e híbrida según el taller. Las clases presenciales se realizan en nuestro estudio equipado con tecnología de punta. Las sesiones virtuales son en vivo e interactivas a través de plataformas especializadas. Todas las clases quedan grabadas para revisión posterior.'
    },
    {
      pregunta: '¿Hay límite de edad para participar?',
      respuesta: 'Nuestros talleres están dirigidos principalmente a partir de 9° grado (aproximadamente 14-15 años) en adelante. No hay límite superior de edad. Lo importante es tener curiosidad artística y ganas de experimentar con nuevas tecnologías.'
    },
    {
      pregunta: '¿Ofrecen certificados al completar los talleres?',
      respuesta: 'Sí, al completar satisfactoriamente cualquier taller recibirás un certificado oficial de Núcleo Colectivo que detalla las competencias adquiridas. Este certificado es reconocido en el ámbito artístico y tecnológico, y puede ser valioso para tu portafolio profesional.'
    },
    {
      pregunta: '¿Hay descuentos disponibles para estudiantes?',
      respuesta: 'Ofrecemos descuentos del 20% para estudiantes de arte, música y carreras afines con identificación estudiantil vigente. También tenemos becas parciales para casos especiales y descuentos por inscripción temprana. Contáctanos para más información sobre opciones de financiamiento.'
    },
    {
      pregunta: '¿Puedo recuperar clases si falto a alguna sesión?',
      respuesta: 'Todas las clases quedan grabadas y disponibles para los participantes por 6 meses después de finalizado el taller. Además, ofrecemos sesiones de recuperación grupales para repasar contenidos importantes. También tienes acceso a nuestra comunidad online para resolver dudas.'
    },
    {
      pregunta: '¿Qué tipo de proyectos voy a crear durante el taller?',
      respuesta: 'Cada taller incluye proyectos prácticos específicos de la disciplina. En arte generativo crearás obras visuales únicas, en música compondrás piezas originales, y en todos los talleres desarrollarás un proyecto final personal que formará parte de tu portafolio artístico.'
    },
    {
      pregunta: '¿Ofrecen seguimiento o mentoría después del taller?',
      respuesta: 'Sí, todos los egresados tienen acceso a nuestra comunidad privada donde pueden compartir proyectos, recibir feedback y continuar aprendiendo. También ofrecemos sesiones de mentoría individual opcionales y descuentos en talleres avanzados.'
    },
    {
      pregunta: '¿Cuál es la metodología de enseñanza que utilizan?',
      respuesta: 'Utilizamos una metodología práctica y colaborativa llamada "Aprender Haciendo". Combinamos explicaciones conceptuales breves con mucha práctica hands-on. Fomentamos la experimentación, el error como parte del proceso creativo, y el trabajo en equipo para proyectos colaborativos.'
    }
  ];

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-purple-600 rounded-full flex items-center justify-center">
              <HelpCircle className="text-black" size={32} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Preguntas <span className="bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
              Frecuentes
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Resolvemos las dudas más comunes sobre nuestros talleres y metodología de enseñanza
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="bg-gray-900 rounded-xl border border-gray-700 overflow-hidden hover:border-yellow-400/30 transition-all duration-300"
              >
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full px-6 py-6 text-left flex items-center justify-between hover:bg-gray-800 transition-colors duration-200"
                >
                  <h3 className="text-white font-semibold text-lg pr-4">{faq.pregunta}</h3>
                  <ChevronDown
                    className={`text-yellow-400 transition-transform duration-300 flex-shrink-0 ${
                      activeIndex === index ? 'rotate-180' : ''
                    }`}
                    size={24}
                  />
                </button>
                
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    activeIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                  }`}
                >
                  <div className="px-6 pb-6 border-t border-gray-700">
                    <p className="text-gray-300 leading-relaxed pt-4">{faq.respuesta}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA después de FAQ */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">¿Tienes alguna otra pregunta?</h3>
            <p className="text-gray-300 mb-6">
              Nuestro equipo está aquí para ayudarte. No dudes en contactarnos para resolver cualquier duda específica.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300"
              >
                Contáctanos
              </button>
              <button
                onClick={() => document.querySelector('#talleres')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Ver Talleres
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
