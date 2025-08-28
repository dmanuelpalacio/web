import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Bot, ExternalLink } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  isBot: boolean;
  timestamp: Date;
}

const ChatBot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      text: '¡Hola! 👋 Soy NúcleoBot, tu asistente de IA creativa. ¿En qué puedo ayudarte hoy?',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(scrollToBottom, [messages]);

  const quickResponses = [
    {
      question: "¿Qué talleres ofrecen?",
      answer: "Ofrecemos varios talleres:\n\n🆓 **IA Básica** - ¡Completamente GRATIS!\n• IA para Procesos Creativos ($43 USD)\n• IA para la Creación Colectiva ($57 USD)\n• Programación Creativa con IA ($57 USD)\n\n¿Te interesa alguno en particular?"
    },
    {
      question: "¿Cómo funciona el taller gratuito?",
      answer: "¡El taller **IA Básica** es completamente gratis! 🎉\n\n📚 **4 módulos interactivos:**\n• ¿Qué es la IA? (3 min)\n• Redes Neuronales (4 min)\n• Arte Generativo (5 min)\n• Ética en IA (3 min)\n\n⏱️ **Duración total:** 10-15 minutos\n💻 **Sin registro requerido**\n📱 **Totalmente responsive**\n\n¿Quieres comenzar ahora?"
    },
    {
      question: "¿Cómo me inscribo a los talleres pagos?",
      answer: "¡Es muy fácil inscribirse! 📝\n\n**Opciones de inscripción:**\n• WhatsApp: +57 300 610 1221\n• Email: contacto@nucleocolectivo.org\n• Formulario en el sitio web\n\n💰 **Tenemos descuentos:**\n• 20% para estudiantes\n• Becas parciales disponibles\n• Precios escalonados\n\n¿Te ayudo a contactarlos?"
    },
    {
      question: "¿Qué es el Banco de Artistas?",
      answer: "El **Banco de Artistas** es nuestra comunidad creativa! 🎨\n\n**Características:**\n• Perfiles de artistas de diversas disciplinas\n• Portfolio de obras e información de contacto\n• Filtros por especialidad artística\n• Networking entre artistas\n\n**¿Eres artista?** Puedes subir tu portafolio y conectar con otros creativos.\n\n¿Quieres explorar los perfiles?"
    },
    {
      question: "¿Necesito experiencia previa en programación?",
      answer: "¡Para nada! 😊\n\n**Nuestros talleres están diseñados para:**\n• Artistas de todos los niveles\n• Sin conocimientos técnicos previos\n• Enfoque visual e intuitivo\n• Herramientas user-friendly\n\n**Metodología:** \"Aprender Haciendo\"\n• Práctica hands-on\n• Experimentación creativa\n• Proyectos colaborativos\n\n¡El arte y la tecnología son para todos!"
    }
  ];

  const handleSendMessage = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: text.trim(),
      isBot: false,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsTyping(true);

    // Simular respuesta del bot
    setTimeout(() => {
      const response = generateBotResponse(text.trim());
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: response,
        isBot: true,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
      setIsTyping(false);
    }, 1000);
  };

  const generateBotResponse = (userInput: string): string => {
    const input = userInput.toLowerCase();
    
    if (input.includes('taller') && input.includes('gratis')) {
      return quickResponses[1].answer;
    } else if (input.includes('taller') || input.includes('curso')) {
      return quickResponses[0].answer;
    } else if (input.includes('inscri') || input.includes('apunt')) {
      return quickResponses[2].answer;
    } else if (input.includes('banco') || input.includes('artista') || input.includes('portafolio')) {
      return quickResponses[3].answer;
    } else if (input.includes('programación') || input.includes('experiencia') || input.includes('técnico')) {
      return quickResponses[4].answer;
    } else if (input.includes('precio') || input.includes('costo') || input.includes('descuento')) {
      return "💰 **Precios de nuestros talleres:**\n\n🆓 **IA Básica** - GRATIS\n💜 **IA para Procesos Creativos** - $43 USD (desde $21)\n💙 **IA para la Creación Colectiva** - $57 USD (desde $29)\n💚 **Programación Creativa con IA** - $57 USD (desde $29)\n\n**Descuentos disponibles:**\n• 20% estudiantes con ID vigente\n• Becas parciales\n• Inscripción temprana\n\n¿Te interesa algún taller específico?";
    } else if (input.includes('horario') || input.includes('fecha') || input.includes('cuándo')) {
      return "📅 **Próximos talleres:**\n\n🆓 **IA Básica** - ¡Disponible 24/7!\n💜 **IA para Procesos Creativos**\n   📅 Del 6 al 27/28 de junio 2025\n   🕰️ Viernes 7:00–10:00 p.m.\n\n💙 **IA para la Creación Colectiva**\n   📅 Julio 2025 (fechas por anunciar)\n\n💚 **Programación Creativa con IA**\n   📅 Agosto 2025 (fechas por confirmar)\n\n¿Te interesa inscribirte?";
    } else if (input.includes('contacto') || input.includes('teléfono') || input.includes('whatsapp')) {
      return "📞 **Canales de contacto:**\n\n📱 **WhatsApp:** +57 300 610 1221\n📧 **Email:** contacto@nucleocolectivo.org\n📸 **Instagram:** @nucleo_colectivo_art\n📍 **Ubicación:** Medellín, Colombia\n\n**Horarios de atención:**\n🕘 Lunes - Viernes: 9:00 AM - 6:00 PM\n🕙 Sábados: 10:00 AM - 4:00 PM\n❌ Domingos: Cerrado\n\n¿Quieres que te conecte por WhatsApp?";
    } else if (input.includes('gratis') || input.includes('free')) {
      return "🎉 **¡Tenemos contenido GRATUITO!**\n\n🆓 **Taller IA Básica:**\n• Experiencia interactiva completa\n• 4 módulos de aprendizaje\n• 10-15 minutos de duración\n• Sin registro requerido\n• Acceso inmediato\n\n**¿Quieres comenzar el taller gratuito ahora?** Solo haz clic en 'Taller Gratis' en el menú principal.\n\n¡Es la mejor forma de conocer nuestro enfoque educativo!";
    } else if (input.includes('hola') || input.includes('hi')) {
      return "¡Hola! 👋 ¡Qué bueno verte por aquí!\n\n✨ **¿En qué puedo ayudarte hoy?**\n• Información sobre talleres\n• Detalles del taller gratuito\n• Proceso de inscripción\n• Banco de artistas\n• Precios y descuentos\n\n¡Solo pregúntame o elige una opción! 😊";
    } else {
      return "🤔 Hmm, no estoy seguro de entender completamente tu pregunta.\n\n**¿Te podría interesar?**\n• 🆓 Nuestro taller gratuito de IA Básica\n• 📚 Información sobre nuestros talleres pagos\n• 🎨 Conocer nuestro Banco de Artistas\n• 📞 Información de contacto\n\n**¿O prefieres hablar con un humano?** Puedo conectarte con nuestro equipo por WhatsApp.\n\n¡Escríbeme de forma más específica y te ayudo mejor! 😊";
    }
  };

  const handleQuickResponse = (response: { question: string; answer: string }) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text: response.question,
      isBot: false,
      timestamp: new Date()
    };

    const botMessage: Message = {
      id: (Date.now() + 1).toString(),
      text: response.answer,
      isBot: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, botMessage]);
  };

  if (!isOpen) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsOpen(true)}
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 animate-pulse"
          aria-label="Abrir chat"
        >
          <img 
            src="/images/nucleobot.svg" 
            alt="NúcleoBot" 
            className="w-8 h-8"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<svg class="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20"><path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd" /></svg>';
              }
            }}
          />
        </button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 w-80 h-96 bg-white rounded-2xl shadow-2xl border border-purple-200 flex flex-col overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-purple-700 p-4 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <img 
            src="/images/nucleobot.svg" 
            alt="NúcleoBot" 
            className="w-8 h-8"
            onError={(e) => {
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = '<div class="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center"><svg class="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg></div>';
              }
            }}
          />
          <div>
            <h3 className="text-white font-bold text-sm">NúcleoBot</h3>
            <p className="text-purple-200 text-xs">Asistente de IA Creativa</p>
          </div>
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="text-white hover:text-purple-200 transition-colors"
        >
          <X size={20} />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
          >
            <div
              className={`max-w-xs p-3 rounded-lg ${
                message.isBot
                  ? 'bg-gray-100 text-gray-800'
                  : 'bg-purple-600 text-white'
              }`}
            >
              <p className="text-sm whitespace-pre-line">{message.text}</p>
              {message.isBot && message.text.includes('¿Quieres comenzar el taller gratuito ahora?') && (
                <a
                  href="https://7b8m3siua7.space.minimax.io/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center mt-2 text-purple-600 hover:text-purple-800 text-sm font-medium"
                >
                  <ExternalLink size={14} className="mr-1" />
                  Comenzar Taller Gratis
                </a>
              )}
            </div>
          </div>
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 p-3 rounded-lg">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Responses */}
      <div className="p-2 border-t border-gray-200">
        <div className="flex flex-wrap gap-1 mb-2">
          {quickResponses.slice(0, 3).map((response, index) => (
            <button
              key={index}
              onClick={() => handleQuickResponse(response)}
              className="text-xs bg-purple-100 text-purple-700 px-2 py-1 rounded-full hover:bg-purple-200 transition-colors"
            >
              {response.question}
            </button>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage(inputMessage)}
            placeholder="Escribe tu pregunta..."
            className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            onClick={() => handleSendMessage(inputMessage)}
            disabled={!inputMessage.trim()}
            className="bg-purple-600 text-white p-2 rounded-lg hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatBot;
