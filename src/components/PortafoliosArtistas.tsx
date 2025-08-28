import { useState } from 'react';
import { User, Filter, Plus, ExternalLink, Download, Instagram, Mail, Globe, Upload, Image, Video, FileText, Link, X } from 'lucide-react';

interface Artista {
  id: string;
  nombre: string;
  disciplinas: string[];
  biografia: string;
  imagen: string;
  obras: {
    titulo: string;
    imagen: string;
    descripcion: string;
  }[];
  contacto: {
    email?: string;
    instagram?: string;
    website?: string;
  };
  portafolioUrl?: string;
}

const PortafoliosArtistas = () => {
  const [filtroActivo, setFiltroActivo] = useState<string>('todos');
  const [artistaSeleccionado, setArtistaSeleccionado] = useState<Artista | null>(null);
  const [mostrarFormulario, setMostrarFormulario] = useState(false);
  
  // Estados para el formulario de subida
  const [archivosSubidos, setArchivosSubidos] = useState<{
    imagenes: File[];
    videos: File[];
    documentos: File[];
    enlaces: string[];
  }>({
    imagenes: [],
    videos: [],
    documentos: [],
    enlaces: []
  });
  
  const [nuevoEnlace, setNuevoEnlace] = useState('');

  // Funciones para manejar archivos
  const manejarSubidaArchivo = (tipo: 'imagenes' | 'videos' | 'documentos', archivos: FileList | null) => {
    if (!archivos) return;
    
    const nuevosArchivos = Array.from(archivos);
    setArchivosSubidos(prev => ({
      ...prev,
      [tipo]: [...prev[tipo], ...nuevosArchivos]
    }));
  };

  const eliminarArchivo = (tipo: 'imagenes' | 'videos' | 'documentos', indice: number) => {
    setArchivosSubidos(prev => ({
      ...prev,
      [tipo]: prev[tipo].filter((_, i) => i !== indice)
    }));
  };

  const agregarEnlace = () => {
    if (nuevoEnlace.trim()) {
      setArchivosSubidos(prev => ({
        ...prev,
        enlaces: [...prev.enlaces, nuevoEnlace.trim()]
      }));
      setNuevoEnlace('');
    }
  };

  const eliminarEnlace = (indice: number) => {
    setArchivosSubidos(prev => ({
      ...prev,
      enlaces: prev.enlaces.filter((_, i) => i !== indice)
    }));
  };

  const formatearTamanoArchivo = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const disciplinas = [
    'Música', 'Pintura', 'Escultura', 'Grabado', 'Videoarte', 
    'Performance', 'Teatro', 'Arte Digital', 'Fotografía', 'Cerámica'
  ];

  const artistas: Artista[] = [
    {
      id: '1',
      nombre: 'María González',
      disciplinas: ['Arte Digital', 'IA Generativa'],
      biografia: 'Artista visual especializada en arte generativo e inteligencia artificial. Exploro las intersecciones entre tecnología y creatividad humana.',
      imagen: '/images/artist-1.jpg',
      obras: [
        {
          titulo: 'Sueños Digitales',
          imagen: '/images/obra-1.jpg',
          descripcion: 'Serie de 10 obras generadas con IA que exploran los sueños colectivos'
        },
        {
          titulo: 'Algoritmos Emocionales',
          imagen: '/images/obra-2.jpg',
          descripcion: 'Instalación interactiva que responde a emociones humanas'
        }
      ],
      contacto: {
        email: 'maria@ejemplo.com',
        instagram: '@maria_digital_art',
        website: 'www.mariagonzalez.art'
      }
    },
    {
      id: '2',
      nombre: 'Carlos Mendoza',
      disciplinas: ['Música', 'IA Compositiva'],
      biografia: 'Compositor y productor musical que integra inteligencia artificial en procesos creativos. Fundador del colectivo SoundIA.',
      imagen: '/images/artist-2.jpg',
      obras: [
        {
          titulo: 'Sinfonía Neural',
          imagen: '/images/obra-3.jpg',
          descripcion: 'Composición musical colaborativa entre humano e IA'
        },
        {
          titulo: 'Beats Generativos',
          imagen: '/images/obra-4.jpg',
          descripcion: 'Album completo producido con herramientas de IA'
        }
      ],
      contacto: {
        email: 'carlos@ejemplo.com',
        instagram: '@carlosmusic_ia'
      }
    },
    {
      id: '3',
      nombre: 'Ana Rodríguez',
      disciplinas: ['Pintura', 'Arte Tradicional'],
      biografia: 'Pintora tradicional que experimenta con la integración de herramientas digitales e IA en su proceso creativo.',
      imagen: '/images/artist-3.jpg',
      obras: [
        {
          titulo: 'Retratos Híbridos',
          imagen: '/images/obra-5.jpg',
          descripcion: 'Serie de retratos que combinan técnicas tradicionales con IA'
        }
      ],
      contacto: {
        email: 'ana@ejemplo.com',
        website: 'www.anarodriguez.art'
      }
    },
    {
      id: '4',
      nombre: 'Diego Peralta',
      disciplinas: ['Videoarte', 'Performance'],
      biografia: 'Artista multidisciplinario enfocado en performance y videoarte experimental. Utiliza IA para crear narrativas visuales inmersivas.',
      imagen: '/images/artist-4.jpg',
      obras: [
        {
          titulo: 'Cuerpos Algorítmicos',
          imagen: '/images/obra-6.jpg',
          descripcion: 'Performance interactivo con proyección de IA en tiempo real'
        }
      ],
      contacto: {
        instagram: '@diego_performance',
        website: 'www.diegoperalta.com'
      }
    }
  ];

  const artistasFiltrados = filtroActivo === 'todos' 
    ? artistas 
    : artistas.filter(artista => 
        artista.disciplinas.some(disciplina => 
          disciplina.toLowerCase().includes(filtroActivo.toLowerCase())
        )
      );

  const abrirModal = (artista: Artista) => {
    setArtistaSeleccionado(artista);
  };

  const cerrarModal = () => {
    setArtistaSeleccionado(null);
  };

  return (
    <section id="portafolios" className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        {/* Header de la sección */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-nuclear-yellow to-nuclear-purple rounded-full flex items-center justify-center">
              <User className="text-nuclear-black" size={32} />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-nuclear-black mb-6">
            Banco de <span className="text-gradient">Artistas</span>
          </h2>
          <p className="text-xl text-nuclear-violet max-w-3xl mx-auto mb-8">
            Descubre el trabajo y perfiles de artistas de diversas disciplinas que forman parte de nuestra comunidad
          </p>

          {/* Botón para agregar portafolio */}
          <button
            onClick={() => setMostrarFormulario(true)}
            className="bg-nuclear-yellow text-nuclear-black px-6 py-3 rounded-full font-bold hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105 flex items-center mx-auto"
          >
            <Plus size={20} className="mr-2" />
            Agregar mi Portafolio
          </button>
        </div>

        {/* Filtros */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          <button
            onClick={() => setFiltroActivo('todos')}
            className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
              filtroActivo === 'todos'
                ? 'bg-nuclear-purple text-white'
                : 'bg-white text-nuclear-purple border border-nuclear-purple hover:bg-nuclear-purple hover:text-white'
            }`}
          >
            <Filter size={16} className="inline mr-2" />
            Todos
          </button>
          {disciplinas.map((disciplina) => (
            <button
              key={disciplina}
              onClick={() => setFiltroActivo(disciplina)}
              className={`px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                filtroActivo === disciplina
                  ? 'bg-nuclear-purple text-white'
                  : 'bg-white text-nuclear-purple border border-nuclear-purple hover:bg-nuclear-purple hover:text-white'
              }`}
            >
              {disciplina}
            </button>
          ))}
        </div>

        {/* Grid de artistas */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {artistasFiltrados.map((artista) => (
            <div
              key={artista.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:scale-105 cursor-pointer"
              onClick={() => abrirModal(artista)}
            >
              <div className="h-48 bg-gradient-to-br from-nuclear-purple/20 to-nuclear-yellow/20 flex items-center justify-center overflow-hidden">
                <img 
                  src="/images/artist-avatar.svg" 
                  alt={`Avatar de ${artista.nombre}`}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.innerHTML = '<div class="flex items-center justify-center w-full h-full"><svg class="w-12 h-12 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3z" /></svg></div>';
                    }
                  }}
                />
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-bold text-nuclear-black mb-2">{artista.nombre}</h3>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {artista.disciplinas.map((disciplina, index) => (
                    <span
                      key={index}
                      className="bg-nuclear-yellow/20 text-nuclear-purple text-xs px-2 py-1 rounded-full font-medium"
                    >
                      {disciplina}
                    </span>
                  ))}
                </div>
                
                <p className="text-nuclear-violet text-sm mb-4 line-clamp-3">
                  {artista.biografia}
                </p>
                
                <button className="w-full bg-nuclear-purple text-white py-2 rounded-lg font-medium hover:bg-nuclear-yellow hover:text-nuclear-black transition-all duration-300">
                  Ver Portafolio
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Modal de detalle del artista */}
        {artistaSeleccionado && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-3xl font-bold text-nuclear-black mb-2">
                      {artistaSeleccionado.nombre}
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {artistaSeleccionado.disciplinas.map((disciplina, index) => (
                        <span
                          key={index}
                          className="bg-nuclear-yellow text-nuclear-black px-3 py-1 rounded-full text-sm font-medium"
                        >
                          {disciplina}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={cerrarModal}
                    className="text-gray-500 hover:text-nuclear-black text-2xl"
                  >
                    ×
                  </button>
                </div>

                {/* Biografía */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-nuclear-black mb-3">Biografía</h4>
                  <p className="text-nuclear-violet leading-relaxed">{artistaSeleccionado.biografia}</p>
                </div>

                {/* Obras */}
                <div className="mb-6">
                  <h4 className="text-xl font-bold text-nuclear-black mb-4">Obras Destacadas</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    {artistaSeleccionado.obras.map((obra, index) => (
                      <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                        <div className="h-32 bg-gradient-to-br from-nuclear-purple/20 to-nuclear-yellow/20"></div>
                        <div className="p-4">
                          <h5 className="font-bold text-nuclear-black mb-2">{obra.titulo}</h5>
                          <p className="text-sm text-nuclear-violet">{obra.descripcion}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Contacto */}
                <div className="border-t pt-6">
                  <h4 className="text-xl font-bold text-nuclear-black mb-4">Contacto</h4>
                  <div className="flex flex-wrap gap-4">
                    {artistaSeleccionado.contacto.email && (
                      <a
                        href={`mailto:${artistaSeleccionado.contacto.email}`}
                        className="flex items-center text-nuclear-purple hover:text-nuclear-yellow transition-colors"
                      >
                        <Mail size={16} className="mr-2" />
                        Email
                      </a>
                    )}
                    {artistaSeleccionado.contacto.instagram && (
                      <a
                        href={`https://instagram.com/${artistaSeleccionado.contacto.instagram.replace('@', '')}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-nuclear-purple hover:text-nuclear-yellow transition-colors"
                      >
                        <Instagram size={16} className="mr-2" />
                        Instagram
                      </a>
                    )}
                    {artistaSeleccionado.contacto.website && (
                      <a
                        href={`https://${artistaSeleccionado.contacto.website}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center text-nuclear-purple hover:text-nuclear-yellow transition-colors"
                      >
                        <Globe size={16} className="mr-2" />
                        Website
                      </a>
                    )}
                    {artistaSeleccionado.portafolioUrl && (
                      <a
                        href={artistaSeleccionado.portafolioUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center bg-nuclear-yellow text-nuclear-black px-4 py-2 rounded-lg hover:bg-nuclear-purple hover:text-white transition-all"
                      >
                        <Download size={16} className="mr-2" />
                        Descargar CV
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Modal del formulario para nuevos artistas */}
        {mostrarFormulario && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl max-h-[95vh] overflow-y-auto w-full">
              <div className="p-6">
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-nuclear-black">Agregar mi Portafolio</h3>
                  <button
                    onClick={() => setMostrarFormulario(false)}
                    className="text-gray-500 hover:text-nuclear-black text-2xl"
                  >
                    ×
                  </button>
                </div>

                <form className="space-y-4">
                  <div>
                    <label className="block text-nuclear-black font-medium mb-2">Nombre Completo</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none"
                      placeholder="Tu nombre completo"
                    />
                  </div>

                  <div>
                    <label className="block text-nuclear-black font-medium mb-2">Disciplinas Artísticas</label>
                    <div className="grid grid-cols-2 gap-2">
                      {disciplinas.map((disciplina) => (
                        <label key={disciplina} className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-gray-700">{disciplina}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-nuclear-black font-medium mb-2">Biografía Artística</label>
                    <textarea
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none"
                      placeholder="Cuéntanos sobre tu trayectoria artística..."
                    ></textarea>
                  </div>

                  <div>
                    <label className="block text-nuclear-black font-medium mb-2">Email de Contacto</label>
                    <input
                      type="email"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none"
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label className="block text-nuclear-black font-medium mb-2">Instagram (opcional)</label>
                    <input
                      type="text"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none"
                      placeholder="@tu_usuario"
                    />
                  </div>

                  <div>
                    <label className="block text-nuclear-black font-medium mb-2">Website (opcional)</label>
                    <input
                      type="url"
                      className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none"
                      placeholder="www.tuportafolio.com"
                    />
                  </div>

                  {/* Sección de subida de archivos multimedia */}
                  <div className="border-t border-gray-200 pt-6 mt-6">
                    <h4 className="text-lg font-bold text-nuclear-black mb-4 flex items-center">
                      <Upload className="w-5 h-5 mr-2" />
                      Sube tu Trabajo
                    </h4>
                    
                    {/* Subida de Imágenes */}
                    <div className="mb-6">
                      <label className="block text-nuclear-black font-medium mb-2 flex items-center">
                        <Image className="w-4 h-4 mr-2" />
                        Imágenes de tus obras (JPG, PNG, WEBP)
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => manejarSubidaArchivo('imagenes', e.target.files)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nuclear-yellow file:text-nuclear-black hover:file:bg-nuclear-purple hover:file:text-white"
                      />
                      {archivosSubidos.imagenes.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {archivosSubidos.imagenes.map((archivo, indice) => (
                            <div key={indice} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center">
                                <Image className="w-4 h-4 mr-2 text-green-600" />
                                <span className="text-sm text-gray-700">{archivo.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({formatearTamanoArchivo(archivo.size)})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => eliminarArchivo('imagenes', indice)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Subida de Videos */}
                    <div className="mb-6">
                      <label className="block text-nuclear-black font-medium mb-2 flex items-center">
                        <Video className="w-4 h-4 mr-2" />
                        Videos de tus performances (MP4, MOV, AVI)
                      </label>
                      <input
                        type="file"
                        multiple
                        accept="video/*"
                        onChange={(e) => manejarSubidaArchivo('videos', e.target.files)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nuclear-yellow file:text-nuclear-black hover:file:bg-nuclear-purple hover:file:text-white"
                      />
                      {archivosSubidos.videos.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {archivosSubidos.videos.map((archivo, indice) => (
                            <div key={indice} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center">
                                <Video className="w-4 h-4 mr-2 text-blue-600" />
                                <span className="text-sm text-gray-700">{archivo.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({formatearTamanoArchivo(archivo.size)})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => eliminarArchivo('videos', indice)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Subida de Documentos */}
                    <div className="mb-6">
                      <label className="block text-nuclear-black font-medium mb-2 flex items-center">
                        <FileText className="w-4 h-4 mr-2" />
                        Portafolio PDF o documentos
                      </label>
                      <input
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => manejarSubidaArchivo('documentos', e.target.files)}
                        className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-nuclear-yellow file:text-nuclear-black hover:file:bg-nuclear-purple hover:file:text-white"
                      />
                      {archivosSubidos.documentos.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {archivosSubidos.documentos.map((archivo, indice) => (
                            <div key={indice} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center">
                                <FileText className="w-4 h-4 mr-2 text-red-600" />
                                <span className="text-sm text-gray-700">{archivo.name}</span>
                                <span className="text-xs text-gray-500 ml-2">({formatearTamanoArchivo(archivo.size)})</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => eliminarArchivo('documentos', indice)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Enlaces externos */}
                    <div className="mb-6">
                      <label className="block text-nuclear-black font-medium mb-2 flex items-center">
                        <Link className="w-4 h-4 mr-2" />
                        Enlaces a tu trabajo online
                      </label>
                      <div className="flex space-x-2">
                        <input
                          type="url"
                          value={nuevoEnlace}
                          onChange={(e) => setNuevoEnlace(e.target.value)}
                          className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:border-nuclear-purple focus:outline-none"
                          placeholder="https://youtube.com/watch?v=..., https://behance.net/..."
                        />
                        <button
                          type="button"
                          onClick={agregarEnlace}
                          className="bg-nuclear-yellow text-nuclear-black px-4 py-3 rounded-lg hover:bg-nuclear-purple hover:text-white transition-all"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>
                      {archivosSubidos.enlaces.length > 0 && (
                        <div className="mt-2 space-y-2">
                          {archivosSubidos.enlaces.map((enlace, indice) => (
                            <div key={indice} className="flex items-center justify-between bg-gray-50 p-2 rounded">
                              <div className="flex items-center">
                                <ExternalLink className="w-4 h-4 mr-2 text-purple-600" />
                                <span className="text-sm text-gray-700 truncate">{enlace}</span>
                              </div>
                              <button
                                type="button"
                                onClick={() => eliminarEnlace(indice)}
                                className="text-red-500 hover:text-red-700"
                              >
                                <X className="w-4 h-4" />
                              </button>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-4">
                      <div className="flex items-start">
                        <div className="flex-shrink-0">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="ml-3">
                          <h3 className="text-sm font-medium text-yellow-800">Información importante</h3>
                          <div className="mt-2 text-sm text-yellow-700">
                            <ul className="list-disc list-inside space-y-1">
                              <li>Tamaño máximo por archivo: 50MB</li>
                              <li>Formatos aceptados: JPG, PNG, WEBP, MP4, MOV, PDF</li>
                              <li>Puedes subir hasta 10 archivos por categoría</li>
                              <li>Los enlaces deben ser públicos y accesibles</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-6">
                    <button
                      type="submit"
                      className="w-full bg-nuclear-purple text-white py-3 rounded-lg font-bold hover:bg-nuclear-yellow hover:text-nuclear-black transition-all duration-300"
                    >
                      Enviar Solicitud
                    </button>
                    <p className="text-sm text-gray-500 mt-2 text-center">
                      Tu solicitud será revisada y aprobada en 24-48 horas
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* CTA final */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-nuclear-purple to-nuclear-yellow p-8 rounded-2xl text-white">
            <h3 className="text-2xl font-bold mb-4">¿Eres artista y quieres unirte?</h3>
            <p className="mb-6 opacity-90">
              Únete a nuestra comunidad de más de 200 artistas explorando las fronteras de la creatividad con IA
            </p>
            <button
              onClick={() => setMostrarFormulario(true)}
              className="bg-white text-nuclear-purple px-8 py-3 rounded-full font-bold hover:bg-nuclear-black hover:text-white transition-all duration-300 transform hover:scale-105"
            >
              Subir mi Portafolio
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PortafoliosArtistas;
