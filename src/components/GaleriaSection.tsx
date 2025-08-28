import { useState } from 'react';
import { X, Filter, ExternalLink, Play, Youtube } from 'lucide-react';

interface Obra {
  id: string;
  titulo: string;
  artista: string;
  categoria: string;
  descripcion: string;
  tecnica: string;
  gradient: string;
  videoId: string;
  videoUrl: string;
}

const GaleriaSection = () => {
  const [selectedObra, setSelectedObra] = useState<Obra | null>(null);
  const [filtroActivo, setFiltroActivo] = useState('todos');

  const obras: Obra[] = [
    {
      id: '1',
      titulo: 'Mundos Permeables',
      artista: 'Núcleo Colectivo',
      categoria: 'videoarte',
      descripcion: 'Exploración artística de fronteras entre lo físico y lo virtual. Una investigación inmersiva sobre los límites difusos entre realidades tangibles e intangibles.',
      tecnica: 'Video experimental + Medios Mixtos + Realidad Aumentada',
      gradient: 'bg-gradient-to-br from-purple-600 via-blue-500 to-cyan-400',
      videoId: 'c05UXEkb9IU',
      videoUrl: 'https://www.youtube.com/watch?v=c05UXEkb9IU'
    },
    {
      id: '2',
      titulo: 'Sinergia de Tejidos',
      artista: 'Núcleo Colectivo',
      categoria: 'talleres',
      descripcion: 'Taller colaborativo de transmisión de saberes y diseño textil. Un espacio de encuentro donde tradiciones ancestrales se entrelazan con técnicas contemporáneas.',
      tecnica: 'Tejido artesanal + Diseño participativo + Pedagogía colaborativa',
      gradient: 'bg-gradient-to-br from-orange-500 via-red-500 to-pink-500',
      videoId: '-A_c3upn3nM',
      videoUrl: 'https://www.youtube.com/watch?v=-A_c3upn3nM'
    },
    {
      id: '3',
      titulo: 'Telar Macramé',
      artista: 'Núcleo Colectivo',
      categoria: 'proceso-creativo',
      descripcion: 'Proceso de creación colectiva en Sinergia de Tejidos. Documentación del proceso creativo donde múltiples manos crean una sola obra.',
      tecnica: 'Macramé + Documentación audiovisual + Arte colaborativo',
      gradient: 'bg-gradient-to-br from-yellow-400 via-orange-400 to-red-500',
      videoId: 'KIiywJewi_o',
      videoUrl: 'https://www.youtube.com/watch?v=KIiywJewi_o'
    },
    {
      id: '4',
      titulo: 'Primer taller de Sinergia de Tejidos',
      artista: 'Núcleo Colectivo',
      categoria: 'talleres',
      descripcion: 'Creatividad y paciencia en acción. El primer encuentro que marcó el inicio de una metodología de enseñanza basada en la experimentación y el tiempo lento.',
      tecnica: 'Pedagogía experimental + Documentación + Video registro',
      gradient: 'bg-gradient-to-br from-green-400 via-teal-500 to-blue-500',
      videoId: 'ugHZ7O78-Xw',
      videoUrl: 'https://www.youtube.com/watch?v=ugHZ7O78-Xw'
    },
    {
      id: '5',
      titulo: 'Residencias Ruta N-UdeA',
      artista: 'Núcleo Colectivo',
      categoria: 'innovacion',
      descripcion: 'Proyecto de creación e innovación desarrollado en alianza con Ruta N y la Universidad de Antioquia. Investigación aplicada en la intersección de arte y tecnología.',
      tecnica: 'Investigación + Desarrollo + Prototipado + Innovación social',
      gradient: 'bg-gradient-to-br from-indigo-600 via-purple-500 to-pink-400',
      videoId: 'ptrrm5ySzDU',
      videoUrl: 'https://www.youtube.com/watch?v=ptrrm5ySzDU'
    },
    {
      id: '6',
      titulo: 'Sintonías',
      artista: 'Núcleo Colectivo',
      categoria: 'instalacion',
      descripcion: 'Instalación interactiva de imagen y sonido en tiempo real. Un sistema que responde a la presencia y movimiento del público generando paisajes audiovisuales únicos.',
      tecnica: 'Sensores + Processing + Audio reactivo + Proyección mapping',
      gradient: 'bg-gradient-to-br from-blue-600 via-cyan-400 to-green-400',
      videoId: '8TlNzWAjQOc',
      videoUrl: 'https://www.youtube.com/watch?v=8TlNzWAjQOc'
    },
    {
      id: '7',
      titulo: 'Ilustración de felinos',
      artista: 'Núcleo Colectivo',
      categoria: 'ciencia-arte',
      descripcion: 'Creación científica de especies antioqueñas. Proyecto de ilustración científica que documenta y preserva la biodiversidad felina regional a través del arte.',
      tecnica: 'Ilustración científica + Investigación biológica + Arte naturalista',
      gradient: 'bg-gradient-to-br from-amber-500 via-orange-500 to-red-500',
      videoId: 'p4CmemC8Mjo',
      videoUrl: 'https://www.youtube.com/watch?v=p4CmemC8Mjo'
    },
    {
      id: '8',
      titulo: 'Ciro y los Mundos Intermitentes',
      artista: 'Núcleo Colectivo',
      categoria: 'animacion',
      descripcion: 'Corto animado con materiales reciclados. Una narrativa audiovisual que explora la sustentabilidad y la creatividad a través de la reutilización de materiales.',
      tecnica: 'Stop motion + Materiales reciclados + Animación artesanal',
      gradient: 'bg-gradient-to-br from-emerald-400 via-teal-500 to-blue-500',
      videoId: 'l5f8GjkEWMo',
      videoUrl: 'https://www.youtube.com/watch?v=l5f8GjkEWMo'
    },
    {
      id: '9',
      titulo: 'Tiempos de Luz',
      artista: 'Núcleo Colectivo',
      categoria: 'fotografia',
      descripcion: 'Fotografía nocturna en territorios rurales. Exploración visual de la relación entre luz artificial y paisajes naturales en comunidades apartadas.',
      tecnica: 'Fotografía de larga exposición + Documentación territorial + Luz natural',
      gradient: 'bg-gradient-to-br from-slate-600 via-purple-500 to-blue-600',
      videoId: 'sM5qiNa6stg',
      videoUrl: 'https://www.youtube.com/watch?v=sM5qiNa6stg'
    },
    {
      id: '10',
      titulo: 'Maquetas y escenarios',
      artista: 'Núcleo Colectivo',
      categoria: 'produccion',
      descripcion: 'Diseño para video musical de Juanes ft. Crudo Means Raw. Creación de universos visuales en miniatura para producción audiovisual de alto impacto.',
      tecnica: 'Maquetas + Diseño de producción + Arte dirigido + Escenografía',
      gradient: 'bg-gradient-to-br from-yellow-500 via-orange-500 to-red-600',
      videoId: 'OFFgo61mwdg',
      videoUrl: 'https://www.youtube.com/watch?v=OFFgo61mwdg'
    },
    {
      id: '11',
      titulo: 'Fluir de lo micro',
      artista: 'Núcleo Colectivo',
      categoria: 'instalacion',
      descripcion: 'Instalación audiovisual con hidrófono y microscopio DIY. Exploración de mundos invisibles donde el sonido del agua se traduce en experiencias visuales inmersivas.',
      tecnica: 'Hidrófono + Microscopio DIY + Audio reactivo + Visualización generativa',
      gradient: 'bg-gradient-to-br from-teal-400 via-blue-500 to-indigo-600',
      videoId: 'LnGcLBvTvzU',
      videoUrl: 'https://www.youtube.com/watch?v=LnGcLBvTvzU'
    },
    {
      id: '12',
      titulo: 'Fluir de lo micro - Live act',
      artista: 'Núcleo Colectivo',
      categoria: 'performance',
      descripcion: 'Live act experimental durante confinamiento. Performance audiovisual remoto que explora nuevas formas de conexión y creación colectiva en tiempos de distanciamiento.',
      tecnica: 'Performance remoto + Streaming + Audio experimental + Improvisación',
      gradient: 'bg-gradient-to-br from-violet-500 via-purple-500 to-pink-500',
      videoId: 'nV3TJoi3Ax0',
      videoUrl: 'https://www.youtube.com/watch?v=nV3TJoi3Ax0'
    }
  ];

  const categorias = [
    { id: 'todos', nombre: 'Todos los Proyectos' },
    { id: 'videoarte', nombre: 'Videoarte y Multimedia' },
    { id: 'instalacion', nombre: 'Instalaciones Interactivas' },
    { id: 'talleres', nombre: 'Talleres y Procesos' },
    { id: 'animacion', nombre: 'Animación y Producción' },
    { id: 'performance', nombre: 'Performance Digital' },
    { id: 'ciencia-arte', nombre: 'Ciencia y Arte' }
  ];

  const obrasFiltradas = filtroActivo === 'todos' 
    ? obras 
    : obras.filter(obra => obra.categoria === filtroActivo);

  // Función para obtener thumbnail optimizado por video específico
  const getThumbnailUrl = (videoId: string, titulo: string) => {
    // Videos con thumbnails especiales mejorados
    const videosThumbnailsEspeciales = {
      'ptrrm5ySzDU': 'https://img.youtube.com/vi/ptrrm5ySzDU/hqdefault.jpg', // Residencias Ruta N-UdeA - alta calidad
      '8TlNzWAjQOc': 'https://img.youtube.com/vi/8TlNzWAjQOc/hqdefault.jpg'  // Sintonías - alta calidad
    };

    return videosThumbnailsEspeciales[videoId] || `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  };

  // Función para verificar si es un video con efectos especiales
  const esVideoEspecial = (videoId: string) => {
    return ['ptrrm5ySzDU', '8TlNzWAjQOc'].includes(videoId);
  };

  // Función para obtener overlay especial por video
  const getVideoOverlay = (videoId: string, titulo: string) => {
    const overlaysEspeciales = {
      'ptrrm5ySzDU': {
        badge: '🏛️ RUTA N × UdeA',
        color: 'bg-gradient-to-r from-blue-600 to-purple-600',
        glow: 'shadow-blue-500/50'
      },
      '8TlNzWAjQOc': {
        badge: '🎵 INSTALACIÓN INTERACTIVA',
        color: 'bg-gradient-to-r from-cyan-500 to-green-500',
        glow: 'shadow-cyan-500/50'
      }
    };

    return overlaysEspeciales[videoId] || null;
  };

  const Modal = ({ obra, onClose }: { obra: Obra; onClose: () => void }) => (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-gray-900 border-b border-gray-700 p-6 flex justify-between items-center">
          <h3 className="text-2xl font-bold text-white">{obra.titulo}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <X size={24} />
          </button>
        </div>
        
        <div className="p-6">
          {/* Video real de YouTube mejorado */}
          <div className={`w-full h-80 rounded-xl mb-6 relative overflow-hidden bg-black ${
            esVideoEspecial(obra.videoId) ? 'ring-2 ring-yellow-400/50 shadow-2xl shadow-yellow-400/20' : ''
          }`}>
            <iframe
              className="w-full h-full rounded-xl"
              src={`https://www.youtube.com/embed/${obra.videoId}`}
              title={obra.titulo}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
            <div className="absolute bottom-4 left-4 bg-black/70 backdrop-blur-sm rounded-lg p-3">
              <div className="text-white font-semibold">{obra.titulo}</div>
              <div className="text-gray-300 text-sm">por {obra.artista}</div>
            </div>
            
            {/* Badge especial en modal para videos destacados */}
            {esVideoEspecial(obra.videoId) && getVideoOverlay(obra.videoId, obra.titulo) && (
              <div className="absolute top-4 right-4">
                <div className={`${getVideoOverlay(obra.videoId, obra.titulo)?.color} rounded-lg px-4 py-2 shadow-lg ${getVideoOverlay(obra.videoId, obra.titulo)?.glow}`}>
                  <span className="text-white text-sm font-bold">
                    {getVideoOverlay(obra.videoId, obra.titulo)?.badge}
                  </span>
                </div>
              </div>
            )}
          </div>

          <div className="space-y-6">
            <div>
              <h4 className="text-xl font-bold text-white mb-3">Descripción</h4>
              <p className="text-gray-300 leading-relaxed">{obra.descripcion}</p>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-3">Técnica Utilizada</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <span className="text-yellow-400 font-semibold">{obra.tecnica}</span>
              </div>
            </div>

            <div>
              <h4 className="text-xl font-bold text-white mb-3">Creado por</h4>
              <div className="bg-gray-800 rounded-lg p-4">
                <span className="text-white font-semibold">{obra.artista}</span>
                <p className="text-gray-400 text-sm mt-1">Colectivo de arte, tecnología e innovación social</p>
              </div>
            </div>

            {/* Enlaces adicionales */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <a
                href={obra.videoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-full transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <Youtube size={20} />
                <span>Ver en YouTube</span>
              </a>
              <button
                onClick={() => {
                  navigator.share?.({
                    title: obra.titulo,
                    text: obra.descripcion,
                    url: obra.videoUrl
                  }) || navigator.clipboard.writeText(obra.videoUrl);
                }}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-3 rounded-full transition-colors duration-300 inline-flex items-center justify-center space-x-2"
              >
                <ExternalLink size={20} />
                <span>Compartir</span>
              </button>
            </div>

            <div className="bg-gradient-to-r from-yellow-400/10 to-purple-600/10 border border-yellow-400/20 rounded-lg p-6">
              <div className="text-center">
                <h5 className="text-xl font-bold text-white mb-2">¿Te inspira este proyecto?</h5>
                <p className="text-gray-300 mb-4">Aprende las técnicas utilizadas en nuestros talleres</p>
                <button
                  onClick={() => {
                    document.querySelector('#talleres-ia')?.scrollIntoView({ behavior: 'smooth' });
                    onClose();
                  }}
                  className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold px-6 py-3 rounded-full hover:scale-105 transition-transform duration-300 inline-flex items-center space-x-2"
                >
                  <span>Ver Talleres</span>
                  <ExternalLink size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <section id="galeria" className="py-20 bg-black">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Galería de <span className="bg-gradient-to-r from-yellow-400 to-purple-600 bg-clip-text text-transparent">
              Videoarte y Multimedia
            </span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
            Explora nuestros proyectos de investigación, creación e innovación donde el arte, la tecnología y la comunidad convergen
          </p>

          {/* Filtros */}
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {categorias.map((categoria) => (
              <button
                key={categoria.id}
                onClick={() => setFiltroActivo(categoria.id)}
                className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                  filtroActivo === categoria.id
                    ? 'bg-gradient-to-r from-yellow-400 to-purple-600 text-black'
                    : 'bg-gray-800 text-white hover:bg-gray-700 border border-gray-600'
                }`}
              >
                {categoria.nombre}
              </button>
            ))}
          </div>
        </div>

        {/* Grid de obras */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {obrasFiltradas.map((obra) => (
            <div
              key={obra.id}
              className="group cursor-pointer"
              onClick={() => setSelectedObra(obra)}
            >
              <div className="relative overflow-hidden rounded-xl">
                {/* Thumbnail de YouTube mejorado */}
                <div className={`aspect-square relative transition-transform duration-300 group-hover:scale-105 bg-black ${
                  esVideoEspecial(obra.videoId) ? 'ring-2 ring-yellow-400/50 shadow-xl' : ''
                }`}>
                  <img
                    src={getThumbnailUrl(obra.videoId, obra.titulo)}
                    alt={obra.titulo}
                    className={`w-full h-full object-cover transition-all duration-300 ${
                      esVideoEspecial(obra.videoId) 
                        ? 'group-hover:brightness-110 group-hover:contrast-110' 
                        : ''
                    }`}
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                    <div className="bg-red-600 backdrop-blur-sm rounded-full p-4 transform group-hover:scale-110 transition-transform duration-300">
                      <Play className="text-white fill-white" size={28} />
                    </div>
                  </div>
                  
                  {/* YouTube badge */}
                  <div className="absolute top-3 right-3">
                    <div className="bg-red-600 rounded px-2 py-1 flex items-center space-x-1">
                      <Youtube className="text-white" size={14} />
                      <span className="text-white text-xs font-bold">VIDEO</span>
                    </div>
                  </div>

                  {/* Badge especial para videos destacados */}
                  {esVideoEspecial(obra.videoId) && getVideoOverlay(obra.videoId, obra.titulo) && (
                    <div className="absolute top-3 left-3">
                      <div className={`${getVideoOverlay(obra.videoId, obra.titulo)?.color} rounded-lg px-3 py-1 shadow-lg ${getVideoOverlay(obra.videoId, obra.titulo)?.glow} animate-pulse`}>
                        <span className="text-white text-xs font-bold">
                          {getVideoOverlay(obra.videoId, obra.titulo)?.badge}
                        </span>
                      </div>
                    </div>
                  )}
                  
                  {/* Info overlay */}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-4">
                    <h3 className="text-white font-bold text-lg">{obra.titulo}</h3>
                    <p className="text-gray-300 text-sm">{obra.artista}</p>
                    <span className="inline-block bg-yellow-400/20 text-yellow-400 text-xs px-2 py-1 rounded-full mt-2">
                      {categorias.find(c => c.id === obra.categoria)?.nombre}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-gray-900 rounded-2xl p-8 border border-gray-700">
            <h3 className="text-2xl font-bold text-white mb-4">¿Te inspiran estos proyectos?</h3>
            <p className="text-gray-300 mb-6">
              Forma parte de nuestra comunidad y participa en proyectos de arte, tecnología e innovación social
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => document.querySelector('#talleres-ia')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-gradient-to-r from-yellow-400 to-purple-600 text-black font-bold px-8 py-4 rounded-full hover:scale-105 transition-transform duration-300"
              >
                Explorar Talleres
              </button>
              <button
                onClick={() => document.querySelector('#contacto')?.scrollIntoView({ behavior: 'smooth' })}
                className="bg-transparent border-2 border-yellow-400 text-yellow-400 font-bold px-8 py-4 rounded-full hover:bg-yellow-400 hover:text-black transition-all duration-300"
              >
                Conectar con Nosotros
              </button>
            </div>
          </div>
        </div>
      </div>

      {selectedObra && (
        <Modal obra={selectedObra} onClose={() => setSelectedObra(null)} />
      )}
    </section>
  );
};

export default GaleriaSection;
