import { useState } from 'react';
import { Mail, Phone, MapPin, Send, Instagram, Youtube, Twitter, Linkedin } from 'lucide-react';

const ContactoSection = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    telefono: '',
    mensaje: '',
    taller: '',
    experiencia: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulación de envío de formulario
    try {
      await new Promise(resolve => setTimeout(resolve, 2000));
      setSubmitStatus('success');
      setFormData({
        nombre: '',
        email: '',
        telefono: '',
        mensaje: '',
        taller: '',
        experiencia: ''
      });
    } catch (error) {
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus('idle'), 5000);
    }
  };

  const contactInfo = [
    {
      icon: <Mail className="text-yellow-400" size={24} />,
      titulo: 'Email',
      contenido: 'nucleocolectivo.art@gmail.com',
      descripcion: 'Respuesta en 24 horas'
    },
    {
      icon: <Phone className="text-purple-400" size={24} />,
      titulo: 'WhatsApp',
      contenido: '+54 11 1234-5678',
      descripcion: 'Lun - Vie: 10:00 - 18:00'
    },
    {
      icon: <MapPin className="text-green-400" size={24} />,
      titulo: 'Ubicación',
      contenido: 'Buenos Aires, Argentina',
      descripcion: 'Talleres presenciales y virtuales'
    }
  ];

  const socialMedia = [
    { icon: <Instagram size={24} />, name: 'Instagram', url: '#', color: 'hover:text-pink-400' },
    { icon: <Youtube size={24} />, name: 'YouTube', url: '#', color: 'hover:text-red-400' },
    { icon: <Twitter size={24} />, name: 'Twitter', url: '#', color: 'hover:text-blue-400' },
    { icon: <Linkedin size={24} />, name: 'LinkedIn', url: '#', color: 'hover:text-blue-500' }
  ];

  return (
    <section id="contacto" className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Inscríbete o <span className="bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
              Contáctanos
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            ¿Listo para transformar tu arte con inteligencia artificial? Estamos aquí para ayudarte a dar el siguiente paso
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Información de contacto */}
          <div className="space-y-8">
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Información de Contacto</h3>
              <div className="space-y-6">
                {contactInfo.map((info, index) => (
                  <div key={index} className="flex items-start space-x-4 bg-gray-800 rounded-lg p-4">
                    <div className="flex-shrink-0">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-semibold text-lg">{info.titulo}</h4>
                      <p className="text-gray-300 font-medium">{info.contenido}</p>
                      <p className="text-gray-400 text-sm">{info.descripcion}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Redes sociales */}
            <div>
              <h3 className="text-2xl font-bold text-white mb-6">Síguenos</h3>
              <div className="flex space-x-4">
                {socialMedia.map((social, index) => (
                  <a
                    key={index}
                    href={social.url}
                    className={`bg-gray-800 p-3 rounded-lg text-gray-400 ${social.color} transition-colors duration-300`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Horarios */}
            <div className="bg-gradient-to-br from-yellow-400/10 to-purple-600/10 border border-yellow-400/20 rounded-xl p-6">
              <h3 className="text-xl font-bold text-white mb-4">Horarios de Atención</h3>
              <div className="space-y-2 text-gray-300">
                <div className="flex justify-between">
                  <span>Lunes - Viernes:</span>
                  <span>10:00 - 18:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Sábados:</span>
                  <span>10:00 - 14:00</span>
                </div>
                <div className="flex justify-between">
                  <span>Domingos:</span>
                  <span>Cerrado</span>
                </div>
              </div>
            </div>
          </div>

          {/* Formulario */}
          <div className="bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-white mb-6">Formulario de Contacto</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="nombre" className="block text-gray-300 font-medium mb-2">
                    Nombre Completo *
                  </label>
                  <input
                    type="text"
                    id="nombre"
                    name="nombre"
                    value={formData.nombre}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="Tu nombre completo"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-gray-300 font-medium mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="tu@email.com"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="telefono" className="block text-gray-300 font-medium mb-2">
                    Teléfono/WhatsApp
                  </label>
                  <input
                    type="tel"
                    id="telefono"
                    name="telefono"
                    value={formData.telefono}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                    placeholder="+54 11 1234-5678"
                  />
                </div>

                <div>
                  <label htmlFor="taller" className="block text-gray-300 font-medium mb-2">
                    Taller de Interés
                  </label>
                  <select
                    id="taller"
                    name="taller"
                    value={formData.taller}
                    onChange={handleInputChange}
                    className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                  >
                    <option value="">Selecciona un taller</option>
                    <option value="intro-ia">Introducción a la IA para Procesos Creativos</option>
                    <option value="arte-generativo">Arte Generativo Avanzado</option>
                    <option value="musica-ia">Música y Sonido con IA</option>
                    <option value="otro">Otro / Consulta general</option>
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="experiencia" className="block text-gray-300 font-medium mb-2">
                  Nivel de Experiencia
                </label>
                <select
                  id="experiencia"
                  name="experiencia"
                  value={formData.experiencia}
                  onChange={handleInputChange}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300"
                >
                  <option value="">Selecciona tu nivel</option>
                  <option value="principiante">Principiante (sin experiencia en IA)</option>
                  <option value="intermedio">Intermedio (alguna experiencia)</option>
                  <option value="avanzado">Avanzado (experiencia considerable)</option>
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-gray-300 font-medium mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={4}
                  className="w-full bg-gray-700 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-yellow-400 transition-colors duration-300 resize-none"
                  placeholder="Cuéntanos sobre tu interés en nuestros talleres, experiencia artística, y cualquier pregunta específica que tengas..."
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold py-4 rounded-lg hover:scale-105 transition-transform duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center space-x-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-black"></div>
                    <span>Enviando...</span>
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    <span>Enviar Mensaje</span>
                  </>
                )}
              </button>

              {submitStatus === 'success' && (
                <div className="bg-green-900/50 border border-green-500 rounded-lg p-4 text-green-300">
                  ¡Mensaje enviado exitosamente! Te contactaremos pronto.
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-900/50 border border-red-500 rounded-lg p-4 text-red-300">
                  Hubo un error al enviar el mensaje. Por favor, intenta nuevamente.
                </div>
              )}
            </form>

            <div className="mt-6 pt-6 border-t border-gray-700">
              <p className="text-gray-400 text-sm text-center">
                Al enviar este formulario, aceptas que procesemos tu información para contactarte sobre nuestros talleres.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactoSection;
