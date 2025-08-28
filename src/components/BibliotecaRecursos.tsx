import { useState } from 'react';
import { X, Filter, ExternalLink, Search, Book, Brain, Code, Image as ImageIcon, Globe, Palette, Maximize2, Minimize2 } from 'lucide-react';

interface Recurso {
  titulo: string;
  descripcion: string;
  url: string;
  categoria: string;
  imagen: string;
}

interface Categoria {
  id: string;
  nombre: string;
  icono: JSX.Element;
  color: string;
}

export default function BibliotecaRecursos() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const [filtroCategoria, setFiltroCategoria] = useState('todos');
  const [busqueda, setBusqueda] = useState('');

  const recursos: Recurso[] = [
    {
      titulo: "RunwayML",
      descripcion: "Plataforma de herramientas de inteligencia artificial para creativos, con modelos gratuitos.",
      url: "https://runwayml.com",
      categoria: "ia",
      imagen: "https://cdn.runwayml.com/static/favicon.ico"
    },
    {
      titulo: "Google Teachable Machine",
      descripcion: "Entrena modelos de IA fácilmente sin código, ideal para proyectos creativos y educativos.",
      url: "https://teachablemachine.withgoogle.com",
      categoria: "ia",
      imagen: "https://teachablemachine.withgoogle.com/favicon.ico"
    },
    {
      titulo: "OpenProcessing",
      descripcion: "Comunidad y editor en línea para proyectos creativos en Processing (código abierto).",
      url: "https://www.openprocessing.org",
      categoria: "codigo",
      imagen: "https://www.openprocessing.org/favicon.ico"
    },
    {
      titulo: "HuggingFace Spaces",
      descripcion: "Modelos y demos de inteligencia artificial listos para usar, muchos son gratuitos.",
      url: "https://huggingface.co/spaces",
      categoria: "ia",
      imagen: "https://huggingface.co/front/assets/huggingface_logo-noborder.svg"
    },
    {
      titulo: "Artbreeder",
      descripcion: "Crea arte colaborativo con IA. Genética visual aplicada a retratos, paisajes, y más.",
      url: "https://www.artbreeder.com",
      categoria: "ia",
      imagen: "https://www.artbreeder.com/favicon.ico"
    },
    {
      titulo: "DeepAI",
      descripcion: "Herramientas de IA gratuitas para generación de imágenes, texto y más.",
      url: "https://deepai.org",
      categoria: "ia",
      imagen: "https://deepai.org/favicon.ico"
    },
    {
      titulo: "Stable Diffusion Online",
      descripcion: "Generador de imágenes con IA completamente gratuito y de código abierto.",
      url: "https://stablediffusionweb.com",
      categoria: "ia",
      imagen: "https://stablediffusionweb.com/favicon.ico"
    },
    {
      titulo: "Wikimedia Commons",
      descripcion: "Millones de imágenes, sonidos y videos de dominio público o con licencias libres.",
      url: "https://commons.wikimedia.org",
      categoria: "medios",
      imagen: "https://commons.wikimedia.org/static/favicon/commons.ico"
    },
    {
      titulo: "Freesound",
      descripcion: "Base de datos colaborativa de sonidos de dominio público y Creative Commons.",
      url: "https://freesound.org",
      categoria: "medios",
      imagen: "https://freesound.org/media/images/favicon.ico"
    },
    {
      titulo: "Archive.org",
      descripcion: "Biblioteca digital con millones de libros, películas, música y sitios web gratuitos.",
      url: "https://archive.org",
      categoria: "bibliotecas",
      imagen: "https://archive.org/images/glogo.jpg"
    },
    {
      titulo: "Biblioteca Digital Mundial (UNESCO)",
      descripcion: "Acceso gratuito a mapas, textos, fotos, grabaciones y películas de todo el mundo.",
      url: "https://www.wdl.org/es/",
      categoria: "bibliotecas",
      imagen: "https://www.wdl.org/static/img/favicon.ico"
    },
    {
      titulo: "Museo de Arte Moderno de Medellín (MAMM)",
      descripcion: "Recursos visuales, exposiciones digitales y archivo audiovisual.",
      url: "https://www.elmamm.org",
      categoria: "cultura",
      imagen: "https://www.elmamm.org/favicon.ico"
    },
    {
      titulo: "Banco de la República - Biblioteca Virtual",
      descripcion: "Recursos en historia del arte, patrimonio y cultura colombiana.",
      url: "https://www.banrepcultural.org/biblioteca-virtual",
      categoria: "cultura",
      imagen: "https://www.banrepcultural.org/themes/custom/bootstrap_banrep/favicon.ico"
    },
    {
      titulo: "Google Arts & Culture",
      descripcion: "Explora arte, historia y cultura de museos y archivos de todo el mundo.",
      url: "https://artsandculture.google.com",
      categoria: "cultura",
      imagen: "https://artsandculture.google.com/favicon.ico"
    },
    {
      titulo: "Creative Commons",
      descripcion: "Encuentra y comparte obras con licencias libres para uso creativo.",
      url: "https://creativecommons.org",
      categoria: "medios",
      imagen: "https://creativecommons.org/favicon.ico"
    },
    {
      titulo: "p5.js",
      descripcion: "Biblioteca de JavaScript para arte generativo y visualizaciones interactivas.",
      url: "https://p5js.org",
      categoria: "codigo",
      imagen: "https://p5js.org/favicon.ico"
    },
    {
      titulo: "Three.js",
      descripcion: "Biblioteca JavaScript para crear experiencias 3D en la web.",
      url: "https://threejs.org",
      categoria: "codigo",
      imagen: "https://threejs.org/favicon.ico"
    },
    {
      titulo: "GitHub",
      descripcion: "Plataforma de desarrollo colaborativo con millones de proyectos de código abierto.",
      url: "https://github.com",
      categoria: "codigo",
      imagen: "https://github.com/favicon.ico"
    }
  ];

  const categorias: Categoria[] = [
    {
      id: 'todos',
      nombre: 'Todos los Recursos',
      icono: <Book className="w-5 h-5" />,
      color: 'text-gray-600'
    },
    {
      id: 'ia',
      nombre: 'Inteligencia Artificial',
      icono: <Brain className="w-5 h-5" />,
      color: 'text-purple-600'
    },
    {
      id: 'codigo',
      nombre: 'Processing y Código',
      icono: <Code className="w-5 h-5" />,
      color: 'text-green-600'
    },
    {
      id: 'medios',
      nombre: 'Medios Audiovisuales',
      icono: <ImageIcon className="w-5 h-5" />,
      color: 'text-blue-600'
    },
    {
      id: 'bibliotecas',
      nombre: 'Bibliotecas Digitales',
      icono: <Globe className="w-5 h-5" />,
      color: 'text-indigo-600'
    },
    {
      id: 'cultura',
      nombre: 'Arte y Cultura',
      icono: <Palette className="w-5 h-5" />,
      color: 'text-pink-600'
    }
  ];

  const recursosFiltrados = recursos.filter(recurso => {
    const cumpleFiltro = filtroCategoria === 'todos' || recurso.categoria === filtroCategoria;
    const cumpleBusqueda = recurso.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
                          recurso.descripcion.toLowerCase().includes(busqueda.toLowerCase());
    return cumpleFiltro && cumpleBusqueda;
  });

  const contarRecursosPorCategoria = (categoriaId: string) => {
    if (categoriaId === 'todos') return recursos.length;
    return recursos.filter(r => r.categoria === categoriaId).length;
  };

  const getLogoFallback = (categoria: string) => {
    const iconos = {
      'ia': <Brain className="w-6 h-6 text-purple-600" />,
      'codigo': <Code className="w-6 h-6 text-green-600" />,
      'medios': <ImageIcon className="w-6 h-6 text-blue-600" />,
      'bibliotecas': <Globe className="w-6 h-6 text-indigo-600" />,
      'cultura': <Palette className="w-6 h-6 text-pink-600" />
    };
    return iconos[categoria] || <ExternalLink className="w-6 h-6 text-gray-400" />;
  };

  const abrirEnNuevaVentana = () => {
    const ventana = window.open('', 'BibliotecaRecursos', 'width=1200,height=800,scrollbars=yes,resizable=yes');
    if (ventana) {
      ventana.document.write(`
        <!DOCTYPE html>
        <html lang="es">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Biblioteca de Recursos - Núcleo Colectivo</title>
          <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;700&display=swap" rel="stylesheet">
          <script src="https://cdn.tailwindcss.com"></script>
          <style>
            body { font-family: 'Montserrat', sans-serif; }
          </style>
        </head>
        <body class="bg-gray-50">
          <div class="container mx-auto p-6">
            <div class="bg-gradient-to-r from-purple-600 to-yellow-400 text-white p-6 rounded-2xl mb-8">
              <h1 class="text-3xl font-bold mb-2">🎁 Biblioteca de Recursos</h1>
              <p class="text-white/90">Herramientas, bibliotecas digitales y recursos creativos seleccionados por Núcleo Colectivo</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              ${recursos.map(recurso => `
                <div class="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow border">
                  <div class="flex items-center space-x-3 mb-4">
                    <div class="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img src="${recurso.imagen}" alt="${recurso.titulo}" class="w-8 h-8" onerror="this.style.display='none'; this.nextElementSibling.style.display='block';">
                      <div style="display:none;" class="text-2xl">${recurso.categoria === 'ia' ? '🧠' : recurso.categoria === 'codigo' ? '💻' : recurso.categoria === 'medios' ? '🎨' : recurso.categoria === 'bibliotecas' ? '🌐' : '🎭'}</div>
                    </div>
                    <div>
                      <h3 class="font-bold text-gray-900">${recurso.titulo}</h3>
                      <span class="text-xs px-2 py-1 bg-purple-100 text-purple-800 rounded-full">${categorias.find(c => c.id === recurso.categoria)?.nombre || recurso.categoria}</span>
                    </div>
                  </div>
                  <p class="text-gray-600 text-sm mb-4">${recurso.descripcion}</p>
                  <a href="${recurso.url}" target="_blank" class="inline-flex items-center space-x-2 bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-semibold px-4 py-2 rounded-full hover:scale-105 transition-transform">
                    <span>Explorar</span>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15,3 21,3 21,9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                  </a>
                </div>
              `).join('')}
            </div>
          </div>
        </body>
        </html>
      `);
      ventana.document.close();
    }
  };

  return (
    <>
      {/* Botón flotante - lado izquierdo, agrandado 15% */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed top-20 left-6 z-40 group"
        style={{ transform: 'translateZ(0)' }}
      >
        <div className="relative">
          {/* Imagen del regalo - agrandada 15% (de 64px a 73.6px) */}
          <img
            src="/regalo.png"
            alt="Biblioteca de Recursos"
            className="w-[18.4rem] h-[18.4rem] hover:scale-110 transition-transform duration-300 filter drop-shadow-lg hover:drop-shadow-2xl"
            style={{ width: '73.6px', height: '73.6px' }}
          />
          
          {/* Badge con número de recursos - agrandado proporcionalmente */}
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-black text-sm font-bold rounded-full w-7 h-7 flex items-center justify-center shadow-lg animate-pulse">
            {recursos.length}
          </div>

          {/* Tooltip */}
          <div className="absolute bottom-full right-0 mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
            <div className="bg-black text-white text-sm px-3 py-2 rounded-lg whitespace-nowrap shadow-lg">
              Biblioteca de Recursos 🎁
              <div className="absolute top-full right-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black"></div>
            </div>
          </div>
        </div>
      </button>

      {/* Panel deslizante */}
      {isOpen && (
        <div className="fixed inset-0 z-50 overflow-hidden">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Panel */}
          <div className={`absolute ${isMaximized ? 'inset-0' : 'right-0 top-0 h-full w-full max-w-4xl'} bg-white shadow-2xl transform transition-all duration-300 overflow-hidden flex flex-col`}>
            {/* Header */}
            <div className="flex-shrink-0 bg-gradient-to-r from-purple-600 to-yellow-400 text-white p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <img src="/regalo.png" alt="Regalo" className="w-8 h-8" />
                  <h2 className="text-2xl font-bold">Biblioteca de Recursos</h2>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={abrirEnNuevaVentana}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 group"
                    title="Abrir en nueva ventana"
                  >
                    <ExternalLink size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                  <button
                    onClick={() => setIsMaximized(!isMaximized)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 group"
                    title={isMaximized ? "Ventana normal" : "Maximizar"}
                  >
                    {isMaximized ? 
                      <Minimize2 size={20} className="group-hover:scale-110 transition-transform" /> : 
                      <Maximize2 size={20} className="group-hover:scale-110 transition-transform" />
                    }
                  </button>
                  <button
                    onClick={() => setIsOpen(false)}
                    className="p-2 hover:bg-white/20 rounded-full transition-colors duration-200 group"
                    title="Cerrar"
                  >
                    <X size={20} className="group-hover:scale-110 transition-transform" />
                  </button>
                </div>
              </div>

              <p className="text-white/90 mb-4">
                Descubre herramientas, bibliotecas digitales y recursos creativos seleccionados por Núcleo Colectivo
              </p>

              {/* Buscador */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
                <input
                  type="text"
                  placeholder="Buscar recursos..."
                  value={busqueda}
                  onChange={(e) => setBusqueda(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 rounded-xl border-0 text-gray-900 placeholder-gray-500 focus:ring-2 focus:ring-yellow-400 focus:outline-none"
                />
              </div>
            </div>

            {/* Contenido scrolleable */}
            <div className="flex-1 overflow-y-auto">
              {/* Filtros de categoría */}
              <div className="p-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-4">
                <Filter className="text-gray-600" size={20} />
                <h3 className="font-semibold text-gray-900">Filtrar por categoría</h3>
              </div>
              
              <div className="flex flex-wrap gap-2">
                {categorias.map((categoria) => (
                  <button
                    key={categoria.id}
                    onClick={() => setFiltroCategoria(categoria.id)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full border transition-all duration-200 ${
                      filtroCategoria === categoria.id
                        ? 'bg-gradient-to-r from-yellow-400 to-purple-600 text-black border-transparent shadow-lg'
                        : 'bg-white border-gray-300 text-gray-700 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <span className={filtroCategoria === categoria.id ? 'text-black' : categoria.color}>
                      {categoria.icono}
                    </span>
                    <span>{categoria.nombre}</span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      filtroCategoria === categoria.id 
                        ? 'bg-black/20 text-black' 
                        : 'bg-gray-100 text-gray-600'
                    }`}>
                      {contarRecursosPorCategoria(categoria.id)}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Grid de recursos */}
            <div className="p-6">
              {recursosFiltrados.length > 0 ? (
                <>
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {recursosFiltrados.length} recurso{recursosFiltrados.length !== 1 ? 's' : ''} encontrado{recursosFiltrados.length !== 1 ? 's' : ''}
                    </h3>
                    {busqueda && (
                      <button
                        onClick={() => setBusqueda('')}
                        className="text-purple-600 hover:text-purple-800 text-sm"
                      >
                        Limpiar búsqueda
                      </button>
                    )}
                  </div>

                  <div className={`grid gap-6 ${isMaximized ? 'grid-cols-1 lg:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1 md:grid-cols-2'}`}>
                    {recursosFiltrados.map((recurso, index) => (
                      <div
                        key={index}
                        className="bg-gray-50 rounded-xl p-6 hover:shadow-lg transition-all duration-300 border border-gray-200 hover:border-purple-300 group"
                      >
                        <div className="flex items-start space-x-4">
                          {/* Logo/Favicon */}
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-white rounded-xl shadow-sm flex items-center justify-center border-2 border-gray-100 group-hover:border-purple-200 transition-colors">
                              <img
                                src={recurso.imagen}
                                alt={recurso.titulo}
                                className="w-8 h-8 object-contain"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.style.display = 'none';
                                  const fallback = target.nextElementSibling as HTMLElement;
                                  if (fallback) fallback.style.display = 'block';
                                }}
                              />
                              <div style={{ display: 'none' }} className="text-gray-400">
                                {getLogoFallback(recurso.categoria)}
                              </div>
                            </div>
                          </div>

                          {/* Contenido */}
                          <div className="flex-1 min-w-0">
                            <h4 className="font-bold text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-200">
                              {recurso.titulo}
                            </h4>
                            <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                              {recurso.descripcion}
                            </p>

                            {/* Categoría badge */}
                            <div className="flex items-center justify-between">
                              <span className="inline-flex items-center space-x-1 bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                                {categorias.find(c => c.id === recurso.categoria)?.icono}
                                <span>{categorias.find(c => c.id === recurso.categoria)?.nombre}</span>
                              </span>

                              {/* Botones de acción */}
                              <div className="flex items-center space-x-2">
                                <a
                                  href={recurso.url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  className="flex-1 inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-semibold px-4 py-2 rounded-full hover:scale-105 transition-all duration-200 shadow-md hover:shadow-lg"
                                  onClick={(e) => {
                                    // Asegurar que el enlace funcione
                                    e.stopPropagation();
                                  }}
                                >
                                  <span>Explorar</span>
                                  <ExternalLink size={14} />
                                </a>
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    navigator.clipboard.writeText(recurso.url);
                                    // Mostrar feedback visual
                                    const btn = e.currentTarget;
                                    const originalText = btn.innerHTML;
                                    btn.innerHTML = '✓';
                                    btn.classList.add('bg-green-500', 'text-white');
                                    setTimeout(() => {
                                      btn.innerHTML = originalText;
                                      btn.classList.remove('bg-green-500', 'text-white');
                                    }, 1000);
                                  }}
                                  className="p-2 bg-gray-200 hover:bg-gray-300 rounded-full transition-colors duration-200"
                                  title="Copiar enlace"
                                >
                                  📋
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="text-center py-12">
                  <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                    <Search className="w-8 h-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    No se encontraron recursos
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Intenta con otros términos de búsqueda o cambia el filtro de categoría
                  </p>
                  <button
                    onClick={() => {
                      setBusqueda('');
                      setFiltroCategoria('todos');
                    }}
                    className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200"
                  >
                    Ver todos los recursos
                  </button>
                </div>
              )}
            </div>

              {/* Footer */}
              <div className="border-t border-gray-200 p-6 bg-gray-50">
              <div className="text-center">
                <div className="flex items-center justify-center space-x-2 mb-3">
                  <img src="/regalo.png" alt="Regalo" className="w-6 h-6" />
                  <span className="font-semibold text-gray-900">¿Conoces más recursos útiles?</span>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  Ayúdanos a expandir nuestra biblioteca compartiendo herramientas y recursos que conoces
                </p>
                <button
                  onClick={() => {
                    setIsOpen(false);
                    document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="bg-gradient-to-r from-purple-600 to-yellow-400 text-white font-semibold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-200 shadow-lg"
                >
                  Comparte un Recurso
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
