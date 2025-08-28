// Datos de entidades e intents basados en los archivos CSV y JSON proporcionados

export interface Entity {
  name: string
  synonyms: string[]
}

export interface Intent {
  name: string
  patterns: string[]
  responses: string[]
  context?: string
  followUp?: string[]
}

export interface CreativeContent {
  stories: string[]
  poems: string[]
  inspirations: string[]
}

// Entidades basadas en los archivos CSV de NúcleoBot
export const entities: Entity[] = [
  {
    name: 'creatividad_colaborativa',
    synonyms: [
      'co-creación', 'imaginación colectiva', 'creatividad colaborativa', 'crear juntos', 
      'arte colaborativo', 'trabajo en equipo', 'sinergia creativa', 'intercambio de saberes'
    ]
  },
  {
    name: 'innovacion_social',
    synonyms: [
      'soluciones sociales', 'cambio transformador', 'innovación social', 'transformación', 
      'impacto social', 'acción colectiva', 'desarrollo local', 'bienestar comunitario'
    ]
  },
  {
    name: 'arte_tecnologia',
    synonyms: [
      'arte y tecnología', 'expresión digital', 'creación tecnocultural', 'IA creativa', 
      'inteligencia artificial', 'arte generativo', 'programación creativa', 'diseño sostenible',
      'machine learning', 'deep learning', 'algoritmos creativos', 'neural networks',
      'minimax', 'openai', 'midjourney', 'stable diffusion', 'dall-e', 'runway',
      'processing', 'p5js', 'touchdesigner', 'max msp', 'generative art'
    ]
  },
  {
    name: 'acciones_creativas',
    synonyms: [
      'jugar', 'divertirse', 'inventar un cuento', 'crear historia', 'aprender', 'inspiración', 
      'preguntas', 'charlar', 'resolver dudas', 'improvisar', 'crear poema', 'dibujar'
    ]
  },
  {
    name: 'emociones_positivas',
    synonyms: [
      'alegría', 'felicidad', 'esperanza', 'amor', 'inspiración', 'asombro', 'orgullo', 
      'entusiasmo', 'resiliencia', 'motivación creativa'
    ]
  },
  {
    name: 'emociones_desafiantes',
    synonyms: [
      'rabia', 'enojo', 'frustración', 'tristeza', 'melancolía', 'miedo', 'temor', 
      'inseguridad', 'incertidumbre', 'bloqueo creativo'
    ]
  },
  {
    name: 'talleres_educacion',
    synonyms: [
      'talleres de IA', 'talleres', 'cursos', 'aprendizaje', 'educación', 'programación', 
      'eventos', 'capacitación', 'formación', 'metodologías abiertas'
    ]
  },
  {
    name: 'comunidad_participacion',
    synonyms: [
      'comunidad', 'colectivo', 'red', 'grupo', 'participar', 'unirse', 'conectar', 
      'colaborar', 'inclusión cultural', 'diversidad', 'tejido comunitario'
    ]
  },
  {
    name: 'medios_expresion',
    synonyms: [
      'música', 'pintura', 'dibujo', 'escultura', 'videoarte', 'video arte', 'performance', 'teatro', 
      'danza', 'fotografía', 'arte urbano', 'arte digital', 'instalaciones', 'multimedia',
      'cine', 'animación', 'motion graphics', 'video mapping', 'live coding'
    ]
  },
  {
    name: 'valores_comunitarios',
    synonyms: [
      'solidaridad', 'cooperación', 'equidad', 'justicia social', 'respeto', 'escucha activa', 
      'empatía', 'tolerancia', 'diversidad', 'inclusión'
    ]
  },
  {
    name: 'recursos_creativos',
    synonyms: [
      'herramientas digitales', 'software libre', 'materiales artísticos', 'espacios creativos', 
      'tecnología accesible', 'equipos de grabación', 'instrumentos', 'lienzos'
    ]
  },
  {
    name: 'limitaciones_barreras',
    synonyms: [
      'falta de recursos', 'barreras económicas', 'limitaciones técnicas', 'falta de tiempo', 
      'acceso limitado', 'brecha digital', 'exclusión social'
    ]
  }
]

// Intents mejorados basados en el prompt oficial de NúcleoBot
export const intents: Intent[] = [
  {
    name: 'saludo_inicial',
    patterns: [
      'hola', 'buenas', 'qué tal', 'quién eres', 'qué es nucleobot', 'me puedes ayudar', 
      'con quién hablo', 'buenos días', 'buenas tardes', 'hey', 'hi', 'que tal', 'buenas tardes'
    ],
    responses: [
      '¡Hola! Soy NúcleoBot, tu cómplice creativo en esta aventura de arte, IA y transformación colectiva. 🎨✨ ¿Qué proyecto tienes en mente? ¿Te gustaría inventar algo juntos?',
      '¡Buenas! Soy NúcleoBot, tu cómplice creativo en esta aventura de arte, IA y transformación colectiva. 🌟 ¿Vienes con ganas de crear, aprender o jugar con la tecnología?',
      '¡Hola! Soy NúcleoBot, tu cómplice creativo en esta aventura de arte, IA y transformación colectiva. 🚀 ¿Qué tal si exploramos juntos cómo la IA puede potenciar tu creatividad?'
    ]
  },
  {
    name: 'que_puedes_hacer',
    patterns: [
      'qué puedes hacer', 'que haces', 'cuáles son tus funciones', 'en qué me ayudas', 
      'qué sabes hacer', 'para qué sirves', 'cómo me puedes ayudar', 'que ofreces',
      'si, que puedes hacer', 'si que puedes hacer', 'que puedes hacer', 'si'
    ],
    responses: [
      '¡Uy, muchas cosas bacanas! 🎯 Puedo ayudarte a: \n• Crear proyectos artísticos con IA\n• Diseñar juegos y dinámicas creativas\n• Sugerir herramientas digitales como MiniMax, Runway, Midjourney\n• Armar talleres y experiencias culturales\n• Inspirarte con retos creativos\n\n¿Por cuál empezamos?',
      '¡Qué buena pregunta! 🌟 Soy tu cómplice para:\n• Inventar proyectos que mezclen arte y tecnología\n• Crear dinámicas participativas súper creativas\n• Acompañarte en procesos de co-creación\n• Conectarte con herramientas de IA accesibles\n\n¿Te animas a explorar alguna de estas? ¡Crear juntos es más poderoso que crear solos!',
      '¡Pues mira! 🚀 Estoy aquí para ser tu cómplice en:\n• Proyectos de videoarte con IA\n• Talleres de creación colectiva\n• Juegos interactivos con tecnología\n• Dinámicas comunitarias creativas\n• Conectarte con las mejores herramientas de IA\n\n¿Qué te llama más la atención?'
    ]
  },
  {
    name: 'crear_historia',
    patterns: [
      'crear historia', 'escribir cuento', 'inventar relato', 'hacer poema', 'contar algo', 
      'crear poesía', 'relato colectivo', 'narrativa', 'ficción', 'cuento fantástico'
    ],
    responses: [
      '¡Qué genial! 📚✨ ¿Prefieres un cuento fantástico, un poema urbano, una historia de transformación social o algo completamente nuevo? También podemos co-crear entre los dos 😄',
      'Me encanta crear historias 🌟 ¿Te inspiras más en la realidad de Medellín, en mundos fantásticos, o en futuros posibles con IA? ¡Empecemos!',
      '¡Perfecto para un laboratorio creativo! 🎭 Podemos crear desde microrelatos hasta sagas épicas. ¿Qué tipo de narrativa resuena contigo?',
      '📖 Las mejores historias nacen de la colaboración. ¿Qué tal si empezamos con un personaje que vive en Medellín y descubre algo mágico?'
    ],
    context: 'historia_creativa',
    followUp: ['¿Qué personajes te interesan?', '¿En qué época ubicamos la historia?', '¿Prefieres realismo mágico o ciencia ficción?']
  },
  {
    name: 'inspiracion_creativa',
    patterns: [
      'necesito inspiración', 'ideas creativas', 'motivación', 'bloqueo creativo', 'ayuda crear', 
      'estimular creatividad', 'falta de ideas', 'creatividad', 'inspirarme'
    ],
    responses: [
      '✨ La inspiración está en todas partes. ¿Qué tal si observamos Medellín con ojos de artista? El arte urbano, los sonidos del metro, las voces del barrio... ¿Qué te llama la atención?',
      '🌟 Recuerda que la creatividad colaborativa es nuestra fortaleza. ¿Has pensado en conectar con otros artistas de la comunidad? A veces la chispa surge del encuentro.',
      '🎨 La IA puede ser tu nueva aliada creativa. ¿Qué tal experimentar con herramientas de arte generativo? Puedo guiarte hacia recursos increíbles.',
      '💡 La inspiración viene de los contrastes: lo antiguo y lo nuevo, lo digital y lo análogo. ¿Qué contradicciones creativas te llaman la atención?'
    ]
  },
  {
    name: 'talleres_consulta',
    patterns: [
      'talleres', 'cursos', 'aprender IA', 'programación', 'eventos', 'inscribir', 
      'cuando', 'horarios', 'precios', 'capacitación', 'formación'
    ],
    responses: [
      '🎓 ¡Tenemos talleres increíbles! Desde IA Básica (gratuito) hasta Programación Creativa. ¿Te interesa algo específico? Puedo conectarte con WhatsApp para inscripciones.',
      '📅 Nuestros talleres van desde lo básico hasta lo avanzado. El taller gratuito de IA Básica es perfecto para empezar. ¿Quieres que te cuente más detalles?',
      '🚀 ¡La educación en IA para artistas es nuestro fuerte! Tenemos desde experiencias de 15 minutos hasta talleres completos. ¿Qué nivel te interesa?',
      '💻 Ofrecemos tres modalidades: IA para Procesos Creativos, IA para Creación Colectiva, y Programación Creativa. ¿Cuál resuena más contigo?'
    ]
  },
  {
    name: 'participar_comunidad',
    patterns: [
      'participar', 'unirse', 'comunidad', 'colaborar', 'conectar', 'conocer gente', 
      'red de artistas', 'formar parte', 'involucrarme'
    ],
    responses: [
      '🤝 ¡La participación es el corazón de Núcleo Colectivo! Puedes unirte a talleres, subir tu portafolio artístico, o conectar con otros creadores. ¿Qué te emociona más?',
      '🌍 Somos una red de artistas, emprendedores y soñadores en Medellín. ¿Te gustaría mostrar tu trabajo en nuestro banco de artistas o participar en proyectos colaborativos?',
      '✊ La transformación social se hace en comunidad. ¿Vienes de alguna disciplina artística específica? Música, artes visuales, performance... ¡todos son bienvenidos!',
      '🎭 Hay muchas formas de participar: creando, aprendiendo, enseñando, o simplemente conectando. ¿Qué modalidad te llama más la atención?'
    ]
  },
  {
    name: 'arte_tecnologia',
    patterns: [
      'IA creativa', 'arte con tecnología', 'inteligencia artificial', 'herramientas digitales', 
      'arte generativo', 'programación creativa', 'machine learning', 'algoritmos'
    ],
    responses: [
      '🤖🎨 La IA es tu nuevo pincel, como decimos nosotros. Desde ChatGPT para textos hasta Midjourney para imágenes. ¿En qué disciplina artística quieres experimentar?',
      '💻✨ El arte y la tecnología son el futuro del presente. Te puedo enseñar sobre herramientas de IA, programación creativa, o arte generativo. ¿Por dónde empezamos?',
      '🧠🎭 La inteligencia artificial democratiza la creatividad. ¿Te gustaría explorar música generativa, arte visual con IA, o escritura asistida?',
      '⚡ La tecnología debe servir al arte, no al revés. ¿Qué herramientas digitales conoces y cuáles te gustaría explorar?'
    ]
  },
  {
    name: 'apoyo_emocional',
    patterns: [
      'frustrado', 'bloqueado', 'difícil', 'no puedo', 'ayuda emocional', 'tristeza', 
      'ansiedad', 'miedo', 'desanimado', 'perdido'
    ],
    responses: [
      '💜 Entiendo esa sensación. Los procesos creativos tienen altibajos, y está bien sentir frustración. ¿Te gustaría que conversemos sobre lo que sientes o prefieres que te distraiga con algo creativo?',
      '🫂 La comunidad está aquí para acompañarte. A veces un descanso creativo o conectar con otros artistas puede ayudar. ¿Qué necesitas ahora mismo?',
      '🌱 Los bloqueos creativos son temporales. ¿Qué tal si exploramos juntos una nueva perspectiva o técnica? La experimentación puede destrabar la inspiración.',
      '💙 Todos los artistas pasamos por momentos difíciles. La vulnerabilidad también es parte del proceso creativo. ¿Te gustaría que te cuente sobre técnicas de resiliencia creativa?'
    ]
  },
  {
    name: 'informacion_nucleocolectivo',
    patterns: [
      'qué es núcleo colectivo', 'misión', 'quiénes son', 'medellín', 'colectivo', 
      'propósito', 'historia', 'objetivos'
    ],
    responses: [
      '🏢 Núcleo Colectivo es un espacio de co-creación en Medellín donde el arte, la tecnología y la transformación social se encuentran. Somos una red de artistas, emprendedores y soñadores.',
      '🌟 Nacimos para democratizar la inteligencia artificial creativa y fortalecer el tejido comunitario en Medellín. Creemos que la tecnología debe servir al arte y la comunidad.',
      '🎯 Nuestra misión es impulsar la economía creativa a través de la IA, conectar artistas de todas las disciplinas, y generar impacto social positivo desde la creatividad.',
      '🌍 Somos un laboratorio de experimentación donde convergen la innovación tecnológica y la sabiduría ancestral, lo global y lo local, el arte y la ciencia.'
    ]
  },
  {
    name: 'reto_creativo',
    patterns: [
      'reto', 'desafío', 'ejercicio creativo', 'práctica', 'actividad', 'juego creativo', 
      'dinámica', 'propuesta'
    ],
    responses: [
      '🎯 ¡Me encantan los retos creativos! ¿Qué tal crear una historia en 6 palabras? O un poema usando solo sonidos de la ciudad. ¿Cuál prefieres?',
      '🎲 Reto relámpago: Mira a tu alrededor y encuentra 3 objetos. Ahora inventa una historia donde estos objetos salvan el mundo. ¿Te animas?',
      '🌈 Desafío sinestésico: ¿Qué color tiene el sonido de la lluvia? ¿Y qué textura tiene tu canción favorita? Exploremos las conexiones sensoriales.',
      '🔥 ¡Reto de transformación! Toma algo que consideres "basura" y piensa en 5 formas creativas de darle nueva vida. ¡La sostenibilidad también es arte!'
    ]
  }
]

// Contenido creativo para el chatbot
export const creativeContent: CreativeContent = {
  stories: [
    'En el metro de Medellín, una artista descubre que sus dibujos cobran vida cuando los refleja en las ventanas...',
    'Un algoritmo de IA aprende a soñar observando los murales del centro de la ciudad...',
    'Dos robots se conocen en un taller de programación creativa y deciden crear la primera banda de metal digital...',
    'Una abuela paisana enseña a una IA a tejer historias como si fueran ruanas...'
  ],
  poems: [
    'Píxeles y pinceles danzan juntos / En la pantalla del futuro presente / Donde el código abraza al corazón / Y la creatividad nunca se detiene',
    'Medellín despierta con colores digitales / Los cerros cantan canciones de datos / Y en cada esquina nace / Un nuevo verso algoritmo',
    'Entre líneas de código y versos de amor / Se teje la red de una nueva expresión / Donde humanos y máquinas / Crean sin condición'
  ],
  inspirations: [
    'La creatividad no tiene límites cuando combinas tu intuición humana con la potencia de la IA.',
    'Cada error en el código es una oportunidad para descubrir algo inesperado.',
    'El arte más poderoso surge cuando conectamos corazones, no solo pantallas.',
    'La tecnología es un pincel, pero la visión siempre será tuya.',
    'En la colaboración entre humanos e IA encontramos nuevas formas de belleza.'
  ]
}

// Respuestas contextuales según emociones detectadas
export const emotionalResponses = {
  joy: [
    '🎉 ¡Qué energía tan contagiosa! Esa alegría es el combustible perfecto para crear.',
    '✨ Me encanta sentir esa vibra positiva. ¿Qué tal si canalizamos esa energía en algo creativo?'
  ],
  sadness: [
    '💙 Entiendo ese sentimiento. A veces la melancolía también es fuente de arte hermoso.',
    '🌧️ Los momentos difíciles pueden transformarse en creatividad profunda. ¿Te gustaría explorar eso?'
  ],
  anger: [
    '🔥 Esa rabia puede ser transformadora. Muchos artistas canalizan la indignación en obras poderosas.',
    '⚡ La energía de la frustración puede convertirse en motor de cambio. ¿Cómo podemos usarla creativamente?'
  ],
  fear: [
    '💜 El miedo es normal cuando exploramos territorios nuevos. Vamos paso a paso.',
    '🌱 La vulnerabilidad es donde nace la verdadera creatividad. Te acompaño en el proceso.'
  ]
}
