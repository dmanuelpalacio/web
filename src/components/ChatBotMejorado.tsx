import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Sparkles, Heart, Brain, Users } from 'lucide-react'
import { entities, intents, creativeContent, emotionalResponses, type Entity, type Intent } from '../utils/chatbotData'

interface Message {
  id: string
  text: string
  isBot: boolean
  timestamp: Date
  intent?: string
  entities?: string[]
  mood?: string
}

const ChatBotMejorado: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [isExpanded, setIsExpanded] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentContext, setCurrentContext] = useState('')
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Detectar estado emocional del usuario
  const detectMood = (text: string): string | null => {
    const lowerText = text.toLowerCase()
    
    if (/alegr|feliz|content|genial|increíble|emocion|entusias/.test(lowerText)) return 'joy'
    if (/trist|deprimi|melanc|dolor|llor/.test(lowerText)) return 'sadness'
    if (/enoja|molest|frustra|rabia|odio/.test(lowerText)) return 'anger'
    if (/miedo|tem|asustad|nervios|ansied/.test(lowerText)) return 'fear'
    if (/amor|cariño|quiero|ador/.test(lowerText)) return 'love'
    
    return null
  }

  const quickResponses = [
    { text: '🎨 Crear historia juntos', intent: 'crear_historia' },
    { text: '✨ Dame inspiración', intent: 'inspiracion_creativa' },
    { text: '🎓 Info talleres IA', intent: 'talleres_consulta' },
    { text: '🤝 Unirme a comunidad', intent: 'participar_comunidad' },
    { text: '🤖 Arte + Tecnología', intent: 'arte_tecnologia' },
    { text: '🎯 Reto creativo', intent: 'reto_creativo' }
  ]

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      addBotMessage('¡Hola! Soy NúcleoBot, tu cómplice creativo en esta aventura de arte, IA y transformación colectiva. 🎨✨ ¿Qué proyecto tienes en mente? ¿Te gustaría inventar algo juntos?', 'saludo_inicial')
    }
    
    // Focus en el input cuando se abre el chat
    if (isOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus()
      }, 100)
    }
  }, [isOpen])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const extractEntities = (text: string): string[] => {
    const extractedEntities: string[] = []
    const lowerText = text.toLowerCase()

    entities.forEach(entity => {
      entity.synonyms.forEach(synonym => {
        if (lowerText.includes(synonym.toLowerCase())) {
          extractedEntities.push(entity.name)
        }
      })
    })

    return [...new Set(extractedEntities)]
  }

  const findBestIntent = (text: string): Intent | null => {
    const lowerText = text.toLowerCase()
    let bestMatch: Intent | null = null
    let maxMatches = 0

    intents.forEach(intent => {
      let matches = 0
      intent.patterns.forEach(pattern => {
        if (lowerText.includes(pattern.toLowerCase())) {
          matches++
        }
      })

      if (matches > maxMatches) {
        maxMatches = matches
        bestMatch = intent
      }
    })

    return maxMatches > 0 ? bestMatch : null
  }

  const generateContextualResponse = (intent: Intent, entities: string[], mood?: string): string => {
    let response = intent.responses[Math.floor(Math.random() * intent.responses.length)]

    // Personalizar respuesta basada en estado emocional
    if (mood && emotionalResponses[mood as keyof typeof emotionalResponses]) {
      const moodResponse = emotionalResponses[mood as keyof typeof emotionalResponses]
      response = moodResponse[Math.floor(Math.random() * moodResponse.length)] + '\n\n' + response
    }

    // Personalizar respuesta basada en entidades detectadas
    if (entities.includes('arte_tecnologia') && !response.includes('IA')) {
      response += ' 🤖 Por cierto, me especializo en la intersección del arte y la IA.'
    }

    if (entities.includes('comunidad_participacion') && !response.includes('comunidad')) {
      response += ' 🌍 La fuerza está en la comunidad creativa.'
    }

    if (entities.includes('emociones_positivas')) {
      response = '✨ ' + response + ' ¡Me alegra tu energía positiva!'
    }

    // Agregar contenido creativo si es relevante
    if (intent.name === 'crear_historia' && Math.random() > 0.5) {
      const randomStory = creativeContent.stories[Math.floor(Math.random() * creativeContent.stories.length)]
      response += `\n\n💡 Inspiración: "${randomStory}"`
    }

    if (intent.name === 'inspiracion_creativa' && Math.random() > 0.3) {
      const randomInspiration = creativeContent.inspirations[Math.floor(Math.random() * creativeContent.inspirations.length)]
      response += `\n\n✨ Recuerda: "${randomInspiration}"`
    }

    return response
  }

  const addBotMessage = (text: string, intent?: string, entities?: string[]) => {
    setIsTyping(true)
    setTimeout(() => {
      const newMessage: Message = {
        id: Date.now().toString(),
        text,
        isBot: true,
        timestamp: new Date(),
        intent,
        entities
      }
      setMessages(prev => [...prev, newMessage])
      setIsTyping(false)
    }, 1500)
  }

  const handleSendMessage = (text?: string) => {
    const messageText = text || inputValue.trim()
    if (!messageText) return

    // Agregar mensaje del usuario
    const userMessage: Message = {
      id: Date.now().toString(),
      text: messageText,
      isBot: false,
      timestamp: new Date()
    }
    setMessages(prev => [...prev, userMessage])
    setInputValue('')
    
    // Enfocar el input de nuevo después de enviar
    setTimeout(() => {
      inputRef.current?.focus()
    }, 100)

    // Procesar respuesta del bot
    const detectedEntities = extractEntities(messageText)
    const detectedMood = detectMood(messageText)
    const matchedIntent = findBestIntent(messageText)

    if (matchedIntent) {
      const response = generateContextualResponse(matchedIntent, detectedEntities, detectedMood || undefined)
      addBotMessage(response, matchedIntent.name, detectedEntities)
      
      if (matchedIntent.context) {
        setCurrentContext(matchedIntent.context)
      }
    } else {
      // Respuesta por defecto más contextual y emocional
      let fallbackResponse = ''
      
      if (detectedMood) {
        const moodResponses = emotionalResponses[detectedMood as keyof typeof emotionalResponses]
        if (moodResponses) {
          fallbackResponse = moodResponses[Math.floor(Math.random() * moodResponses.length)] + '\n\n'
        }
      }

      const genericFallbacks = [
        '🤔 Interesante perspectiva. ¿Podrías contarme más? Me especializo en arte, tecnología y creatividad.',
        '💭 No estoy seguro de entender completamente, pero me encanta explorar nuevas ideas. ¿Te refieres a algo relacionado con creatividad o tecnología?',
        '🌟 Cada pregunta es una oportunidad de aprender. ¿Te gustaría que conversemos sobre talleres, arte con IA, o participación comunitaria?',
        '🎨 A veces las mejores conversaciones nacen de lo inesperado. ¿Qué tal si me cuentas más sobre tu proyecto o interés creativo?'
      ]
      
      fallbackResponse += genericFallbacks[Math.floor(Math.random() * genericFallbacks.length)]
      addBotMessage(fallbackResponse, 'fallback', detectedEntities)
    }
  }

  const handleQuickResponse = (response: { text: string; intent: string }) => {
    handleSendMessage(response.text)
  }

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('es-ES', { hour: '2-digit', minute: '2-digit' })
  }

  return (
    <>
      {/* Chat Button - subido un poco */}
      <div className="fixed bottom-24 right-6 z-50">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-nuclear-purple hover:bg-nuclear-violet text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110 group"
        >
          {isOpen ? (
            <X className="w-6 h-6" />
          ) : (
            <div className="relative">
              <MessageCircle className="w-6 h-6" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-nuclear-yellow rounded-full animate-pulse"></div>
            </div>
          )}
        </button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className={`fixed transition-all duration-300 z-50 bg-white rounded-2xl shadow-2xl border border-nuclear-purple/20 overflow-hidden ${
          isExpanded 
            ? 'inset-4 md:bottom-32 md:right-6 md:w-[500px] md:h-[700px] md:inset-auto' 
            : 'bottom-32 right-4 left-4 h-[500px] md:left-auto md:w-[420px] md:h-[600px]'
        }`}>
          
          {/* Header */}
          <div className="bg-gradient-to-r from-nuclear-purple to-nuclear-violet p-4 md:p-6 text-white">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-nuclear-yellow rounded-full flex items-center justify-center shadow-lg">
                  <Brain className="w-6 h-6 text-nuclear-black" />
                </div>
                <div>
                  <h3 className="font-bold text-xl">NúcleoBot</h3>
                  <p className="text-sm opacity-90">Tu Cómplice Creativo</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setIsExpanded(!isExpanded)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  title={isExpanded ? "Ventana pequeña" : "Pantalla completa"}
                >
                  {isExpanded ? '📱' : '🖥️'}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-white/80 hover:text-white transition-colors p-2 rounded-lg hover:bg-white/10"
                  title="Cerrar chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>
            
            {/* Status Indicators */}
            <div className="flex items-center justify-between mt-3">
              <div className="flex items-center space-x-4 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  <span>En línea</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Sparkles className="w-4 h-4" />
                  <span>IA Creativa</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Users className="w-4 h-4" />
                  <span>Medellín</span>
                </div>
              </div>
              
              {/* Mini Actions */}
              <div className="flex space-x-1">
                <button 
                  onClick={() => setMessages([])}
                  className="text-xs px-2 py-1 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
                  title="Limpiar chat"
                >
                  🗑️
                </button>
                <button 
                  onClick={() => {
                    const lastMessage = messages[messages.length - 1]?.text || "Conversación con NúcleoBot"
                    navigator.share?.({ text: lastMessage }) || navigator.clipboard?.writeText(lastMessage)
                  }}
                  className="text-xs px-2 py-1 bg-white/20 rounded-md hover:bg-white/30 transition-colors"
                  title="Compartir"
                >
                  📤
                </button>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className={`flex-1 overflow-y-auto p-4 md:p-6 space-y-4 ${
            isExpanded ? 'min-h-[400px]' : 'min-h-[300px]'
          }`}>
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isBot ? 'justify-start' : 'justify-end'}`}
              >
                <div className={`max-w-[85%] md:max-w-[80%] ${
                  message.isBot
                    ? 'bg-gradient-to-br from-nuclear-purple/5 to-nuclear-violet/10 text-nuclear-black border border-nuclear-purple/15'
                    : 'bg-gradient-to-br from-nuclear-yellow to-nuclear-yellow/90 text-nuclear-black shadow-lg'
                } rounded-2xl px-4 py-3 md:px-5 md:py-4`}>
                  
                  {message.isBot && (
                    <div className="flex items-center space-x-2 mb-3">
                      <Brain className="w-5 h-5 text-nuclear-purple" />
                      <span className="text-sm font-bold text-nuclear-purple">NúcleoBot</span>
                      {message.entities && message.entities.length > 0 && (
                        <div className="flex flex-wrap gap-1 ml-2">
                          {message.entities.slice(0, 2).map(entity => (
                            <span key={entity} className="text-xs bg-nuclear-yellow/30 px-2 py-0.5 rounded-full">
                              {entity.replace('_', ' ')}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                  
                  <div className="text-base md:text-sm leading-relaxed whitespace-pre-line">
                    {message.text}
                  </div>
                  
                  <div className="flex items-center justify-between mt-2">
                    <p className="text-xs opacity-60">{formatTime(message.timestamp)}</p>
                    {message.isBot && (
                      <div className="flex space-x-1">
                        <button 
                          onClick={() => navigator.clipboard?.writeText(message.text)}
                          className="text-xs px-2 py-1 bg-nuclear-purple/10 hover:bg-nuclear-purple/20 rounded transition-colors"
                          title="Copiar mensaje"
                        >
                          📋
                        </button>
                        <button 
                          onClick={() => {
                            const response = prompt("¿Qué te pareció esta respuesta? (opcional)")
                            if (response !== null) {
                              console.log("Feedback:", response)
                            }
                          }}
                          className="text-xs px-2 py-1 bg-nuclear-purple/10 hover:bg-nuclear-purple/20 rounded transition-colors"
                          title="Dar feedback"
                        >
                          💬
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gradient-to-br from-nuclear-purple/5 to-nuclear-violet/10 rounded-2xl px-4 py-3 border border-nuclear-purple/15">
                  <div className="flex items-center space-x-3">
                    <Brain className="w-5 h-5 text-nuclear-purple animate-pulse" />
                    <span className="text-sm text-nuclear-purple font-medium">NúcleoBot está pensando</span>
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-nuclear-purple rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-nuclear-purple rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-nuclear-purple rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Responses */}
          <div className="px-4 md:px-6 py-3 border-t border-nuclear-purple/10">
            <div className="mb-3">
              <p className="text-sm font-medium text-nuclear-violet mb-3">💡 Respuestas rápidas:</p>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {quickResponses.map((response, index) => (
                  <button
                    key={index}
                    onClick={() => handleQuickResponse(response)}
                    className="text-sm bg-gradient-to-r from-nuclear-purple/10 to-nuclear-violet/10 hover:from-nuclear-purple/20 hover:to-nuclear-violet/20 text-nuclear-purple px-3 py-2 rounded-xl transition-all duration-200 transform hover:scale-105 border border-nuclear-purple/20 hover:border-nuclear-purple/30"
                  >
                    {response.text}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Additional Options */}
            <div className="grid grid-cols-2 gap-2 mt-3">
              <button
                onClick={() => handleSendMessage('¿Puedes recomendarme un taller específico?')}
                className="text-xs bg-nuclear-yellow/20 hover:bg-nuclear-yellow/30 text-nuclear-black px-3 py-2 rounded-lg transition-colors"
              >
                🎓 Recomiéndame taller
              </button>
              <button
                onClick={() => handleSendMessage('Quiero crear un proyecto de videoarte con IA')}
                className="text-xs bg-nuclear-yellow/20 hover:bg-nuclear-yellow/30 text-nuclear-black px-3 py-2 rounded-lg transition-colors"
              >
                🎬 Proyecto videoarte
              </button>
            </div>
          </div>

          {/* Input */}
          <div className="p-4 md:p-6 border-t border-nuclear-purple/10 bg-gray-50/50">
            <div className="flex space-x-3 mb-3">
              <div className="flex-1 relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && !e.shiftKey && handleSendMessage()}
                  placeholder="Escribe tu mensaje... (Enter para enviar)"
                  className="w-full border-2 border-nuclear-purple/20 rounded-2xl px-4 py-3 text-base text-nuclear-black bg-white focus:outline-none focus:border-nuclear-purple focus:ring-2 focus:ring-nuclear-purple/20 transition-all placeholder:text-gray-400 disabled:bg-gray-100 disabled:text-gray-500 disabled:cursor-not-allowed caret-nuclear-purple selection:bg-nuclear-yellow/30"
                  disabled={isTyping}
                  autoComplete="off"
                  spellCheck="false"
                  style={{
                    fontSize: '16px',
                    lineHeight: '1.5',
                    color: '#000000',
                    caretColor: '#9D4EDD'
                  }}
                />
                {inputValue && (
                  <button
                    onClick={() => setInputValue('')}
                    className="absolute right-12 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                    type="button"
                  >
                    ✕
                  </button>
                )}
              </div>
              <button
                onClick={() => handleSendMessage()}
                disabled={!inputValue.trim() || isTyping}
                className="bg-gradient-to-r from-nuclear-purple to-nuclear-violet hover:from-nuclear-violet hover:to-nuclear-purple text-white p-3 rounded-2xl transition-all duration-200 transform hover:scale-105 disabled:opacity-50 disabled:transform-none disabled:cursor-not-allowed shadow-lg"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
            
            {/* Quick Actions */}
            <div className="flex flex-wrap gap-2 mb-3">
              <button
                onClick={() => setInputValue('¿Qué herramientas de IA me recomiendas para videoarte?')}
                className="text-xs bg-white/80 hover:bg-white text-nuclear-purple px-3 py-1.5 rounded-lg border border-nuclear-purple/20 transition-colors"
              >
                🛠️ Herramientas IA
              </button>
              <button
                onClick={() => setInputValue('¿Cómo puedo participar en la comunidad?')}
                className="text-xs bg-white/80 hover:bg-white text-nuclear-purple px-3 py-1.5 rounded-lg border border-nuclear-purple/20 transition-colors"
              >
                🤝 Participar
              </button>
              <button
                onClick={() => setInputValue('Necesito inspiración para mi proyecto')}
                className="text-xs bg-white/80 hover:bg-white text-nuclear-purple px-3 py-1.5 rounded-lg border border-nuclear-purple/20 transition-colors"
              >
                ✨ Inspiración
              </button>
            </div>
            
            {/* Footer Links */}
            <div className="flex flex-col md:flex-row items-center justify-between text-xs text-gray-600 space-y-2 md:space-y-0">
              <a
                href="https://wa.me/573006101221?text=Hola%20NúcleoBot,%20necesito%20ayuda%20personalizada"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-1 text-nuclear-violet hover:text-nuclear-purple transition-colors"
              >
                <span>💬</span>
                <span>Ayuda personalizada</span>
              </a>
              
              <div className="flex space-x-4">
                <button 
                  onClick={() => setCurrentContext('')}
                  className="hover:text-nuclear-purple transition-colors"
                  title="Nuevo tema"
                >
                  🔄 Nuevo tema
                </button>
                <span className="text-gray-400">|</span>
                <span className="flex items-center space-x-1">
                  <Heart className="w-3 h-3 text-red-400" />
                  <span>Crear juntos es más poderoso</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default ChatBotMejorado
