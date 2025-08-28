import React, { useState } from 'react'

interface ContentData {
  geographical_data: {
    ciudad: string;
    pais: string;
  };
  references: Array<{
    type: string;
    items?: Array<{
      texto: string;
      url: string;
    }>;
  }>;
}

interface ContactoProps {
  data: ContentData;
}

const Contacto: React.FC<ContactoProps> = ({ data }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    asunto: 'Información General',
    mensaje: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const asuntos = [
    'Información General',
    'Inscripción a Talleres de IA',
    'Colaboraciones',
    'Proyectos Comunitarios',
    'Compra de Productos',
    'Propuesta de Proyecto',
    'Prensa y Medios',
    'Otro'
  ]

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simulate form submission
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))
      setSubmitStatus('success')
      setFormData({ nombre: '', email: '', asunto: 'Información General', mensaje: '' })
    } catch (error) {
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const generateWhatsAppMessage = () => {
    const message = `Hola! Mi nombre es ${formData.nombre}. 

*Asunto:* ${formData.asunto}
*Email:* ${formData.email}

*Mensaje:*
${formData.mensaje}

Gracias por su tiempo!`
    
    return `https://wa.me/573006101221?text=${encodeURIComponent(message)}`
  }

  return (
    <section id="contacto" className="py-20 bg-nuclear-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-purple/10 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
              <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-nuclear-black mb-6">
            Conecta con <span className="text-gradient">Nosotros</span>
          </h2>
          <p className="text-xl text-nuclear-violet max-w-3xl mx-auto">
            ¿Tienes una idea, pregunta o quieres formar parte de nuestra comunidad? 
            Estamos aquí para escucharte y crear juntos.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Form */}
          <div className="bg-nuclear-white rounded-3xl p-8 shadow-lg border border-nuclear-purple/10">
            <h3 className="text-2xl font-bold text-nuclear-black mb-6">Envíanos un mensaje</h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="nombre" className="block text-sm font-semibold text-nuclear-black mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="nombre"
                  name="nombre"
                  value={formData.nombre}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-nuclear-purple/20 focus:border-nuclear-purple focus:ring-2 focus:ring-nuclear-purple/20 transition-all"
                  placeholder="Tu nombre completo"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-nuclear-black mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-nuclear-purple/20 focus:border-nuclear-purple focus:ring-2 focus:ring-nuclear-purple/20 transition-all"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="asunto" className="block text-sm font-semibold text-nuclear-black mb-2">
                  Asunto
                </label>
                <select
                  id="asunto"
                  name="asunto"
                  value={formData.asunto}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 rounded-xl border border-nuclear-purple/20 focus:border-nuclear-purple focus:ring-2 focus:ring-nuclear-purple/20 transition-all"
                >
                  {asuntos.map((asunto) => (
                    <option key={asunto} value={asunto}>{asunto}</option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="mensaje" className="block text-sm font-semibold text-nuclear-black mb-2">
                  Mensaje *
                </label>
                <textarea
                  id="mensaje"
                  name="mensaje"
                  value={formData.mensaje}
                  onChange={handleInputChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-nuclear-purple/20 focus:border-nuclear-purple focus:ring-2 focus:ring-nuclear-purple/20 transition-all resize-none"
                  placeholder="Cuéntanos sobre tu idea, pregunta o cómo quieres colaborar con nosotros..."
                />
              </div>

              {submitStatus === 'success' && (
                <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-green-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <p className="text-green-800">¡Mensaje enviado exitosamente! Nos pondremos en contacto contigo pronto.</p>
                  </div>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                  <div className="flex items-center">
                    <svg className="w-5 h-5 text-red-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="text-red-800">Hubo un error al enviar el mensaje. Por favor intenta de nuevo.</p>
                  </div>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
                
                <a
                  href={generateWhatsAppMessage()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-500 text-white px-8 py-4 rounded-full font-bold text-lg hover:bg-green-600 transition-all duration-300 transform hover:scale-105 text-center flex items-center justify-center"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                  </svg>
                  WhatsApp
                </a>
              </div>
            </form>
          </div>

          {/* Contact Info */}
          <div className="space-y-8">
            {/* Location */}
            <div className="bg-gradient-to-br from-nuclear-purple to-nuclear-violet rounded-3xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">Ubicación</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-4">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-1">{data.geographical_data.ciudad}, {data.geographical_data.pais}</h4>
                    <p className="text-white/80 text-sm">En el corazón del ecosistema de innovación de Medellín</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Methods */}
            <div className="bg-nuclear-white rounded-3xl p-8 shadow-lg border border-nuclear-purple/10">
              <h3 className="text-2xl font-bold text-nuclear-black mb-6">Canales de Contacto</h3>
              <div className="space-y-4">
                <a
                  href="mailto:contacto@nucleocolectivo.org"
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-nuclear-purple/5 transition-colors group"
                >
                  <div className="w-12 h-12 bg-nuclear-purple/10 rounded-xl flex items-center justify-center group-hover:bg-nuclear-purple group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                      <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nuclear-black">Email</h4>
                    <p className="text-nuclear-violet text-sm">contacto@nucleocolectivo.org</p>
                  </div>
                </a>

                <a
                  href="https://wa.me/573006101221"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-green-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center group-hover:bg-green-500 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893A11.821 11.821 0 0020.885 3.106"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nuclear-black">WhatsApp</h4>
                    <p className="text-nuclear-violet text-sm">+57 300 610 1221</p>
                  </div>
                </a>

                <a
                  href="https://www.instagram.com/nucleo_colectivo_art/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-4 p-4 rounded-xl hover:bg-pink-50 transition-colors group"
                >
                  <div className="w-12 h-12 bg-pink-100 rounded-xl flex items-center justify-center group-hover:bg-pink-500 group-hover:text-white transition-all">
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.62 5.367 11.987 11.988 11.987 6.62 0 11.987-5.367 11.987-11.987C24.004 5.367 18.637.001 12.017.001zM8.449 16.988c-1.297 0-2.348-1.051-2.348-2.348 0-1.297 1.051-2.348 2.348-2.348 1.297 0 2.348 1.051 2.348 2.348 0 1.297-1.051 2.348-2.348 2.348zM12.017 7.129c-2.685 0-4.858 2.173-4.858 4.858 0 2.685 2.173 4.858 4.858 4.858 2.685 0 4.858-2.173 4.858-4.858 0-2.685-2.173-4.858-4.858-4.858zm0 8.006c-1.74 0-3.148-1.408-3.148-3.148s1.408-3.148 3.148-3.148 3.148 1.408 3.148 3.148-1.408 3.148-3.148 3.148zm4.858-8.871c0-.626-.508-1.134-1.134-1.134s-1.134.508-1.134 1.134.508 1.134 1.134 1.134 1.134-.508 1.134-1.134z"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-nuclear-black">Instagram</h4>
                    <p className="text-nuclear-violet text-sm">@nucleo_colectivo_art</p>
                  </div>
                </a>
              </div>
            </div>

            {/* Hours & Availability */}
            <div className="bg-nuclear-yellow/10 rounded-3xl p-8">
              <h3 className="text-2xl font-bold text-nuclear-black mb-6">Horarios de Atención</h3>
              <div className="space-y-3">
                <div className="flex justify-between">
                  <span className="text-nuclear-black font-medium">Lunes - Viernes</span>
                  <span className="text-nuclear-violet">9:00 AM - 6:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nuclear-black font-medium">Sábados</span>
                  <span className="text-nuclear-violet">10:00 AM - 4:00 PM</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-nuclear-black font-medium">Domingos</span>
                  <span className="text-nuclear-violet">Cerrado</span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-nuclear-purple/10 rounded-xl">
                <p className="text-sm text-nuclear-violet">
                  <strong>Nota:</strong> Para talleres y eventos especiales, consulta nuestros horarios específicos. 
                  Los tiempos de respuesta por WhatsApp son más rápidos.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* FAQ Quick Section */}
        <div className="mt-16 bg-nuclear-black rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl font-black mb-6">
            ¿Tienes <span className="text-nuclear-yellow">preguntas frecuentes</span>?
          </h3>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Consulta nuestras preguntas más comunes o contáctanos directamente. 
            Estamos aquí para ayudarte en tu journey creativo con IA.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#talleres-ia"
              onClick={(e) => {
                e.preventDefault()
                document.querySelector('#talleres-ia')?.scrollIntoView({ behavior: 'smooth' })
              }}
              className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Ver Talleres
            </a>
            <a
              href="https://wa.me/573006101221?text=Hola%20tengo%20algunas%20preguntas%20sobre%20Núcleo%20Colectivo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-transparent text-white border-2 border-white px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:text-nuclear-black transition-all duration-300 transform hover:scale-105"
            >
              Preguntar por WhatsApp
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contacto
