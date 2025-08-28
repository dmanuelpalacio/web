import React, { useState } from 'react'

interface ContentData {
  references: Array<{
    type: string;
    items?: Array<{
      texto: string;
      url: string;
    }>;
  }>;
}

interface TiendaProps {
  data: ContentData;
}

const Tienda: React.FC<TiendaProps> = ({ data }) => {
  const [selectedProduct, setSelectedProduct] = useState<any>(null)

  // Extraer información de la tienda del data
  const tiendaData = data.references.filter(ref => ref.type.includes('Tienda'))

  const productos = [
    {
      id: 1,
      name: "Camisetas Núcleo Colectivo",
      description: "Camisetas con diseños únicos creados por nuestra comunidad de artistas. Cada diseño representa la fusión entre arte tradicional e inteligencia artificial.",
      price: "Desde $11 USD",
      features: ["100% Algodón", "Diseños exclusivos", "Edición limitada", "Serigrafia de alta calidad"],
      image: "camiseta",
      category: "Ropa",
      paymentMethods: tiendaData.find(item => item.type.includes('Camisetas'))?.items || []
    },
    {
      id: 2,
      name: "Diseños Creativos y Originales",
      description: "Obras de arte digitales únicas creadas colaborativamente entre artistas y IA. Disponibles en múltiples formatos para impresión o uso digital.",
      price: "Desde $6 USD",
      features: ["Arte digital original", "Licencia de uso comercial", "Múltiples formatos", "Colaboración humano-IA"],
      image: "diseno",
      category: "Arte Digital",
      paymentMethods: tiendaData.find(item => item.type.includes('Diseños creativos'))?.items || []
    },
    {
      id: 3,
      name: "Merchandising Exclusivo",
      description: "Productos únicos de edición limitada que celebran la intersección entre arte, tecnología y comunidad. Cada compra apoya nuestros proyectos.",
      price: "Desde $8 USD",
      features: ["Edición limitada", "Diseños colaborativos", "Materiales sostenibles", "Numerado"],
      image: "merch",
      category: "Coleccionables",
      paymentMethods: tiendaData.find(item => item.type.includes('Merchandising exclusivo'))?.items || []
    },
    {
      id: 4,
      name: "Accesorios Creativos",
      description: "Accesorios funcionales con un toque artístico. Desde libretas hasta stickers, cada pieza cuenta una historia de innovación creativa.",
      price: "Desde $4 USD",
      features: ["Funcionales y artísticos", "Varios tamaños", "Diseño colaborativo", "Materiales de calidad"],
      image: "accesorios",
      category: "Accesorios",
      paymentMethods: tiendaData.find(item => item.type.includes('Accesorios creativos'))?.items || []
    },
    {
      id: 5,
      name: "Productos en Exhibición",
      description: "Piezas especiales que han sido parte de nuestras exposiciones y eventos. Cada una con su historia y proceso de creación documentado.",
      price: "Consultar precio",
      features: ["Piezas de exposición", "Historia documentada", "Certificado de autenticidad", "Único"],
      image: "exhibicion",
      category: "Arte",
      paymentMethods: tiendaData.find(item => item.type.includes('Productos en exhibición'))?.items || []
    },
    {
      id: 6,
      name: "Productos Promocionales",
      description: "Compra un producto y apoya directamente nuestros proyectos comunitarios. Tu compra se convierte en transformación social.",
      price: "Desde $5 USD",
      features: ["Apoyo directo al proyecto", "Impacto social medible", "Transparencia en el uso", "Comunidad global"],
      image: "promocional",
      category: "Apoyo",
      paymentMethods: tiendaData.find(item => item.type.includes('Productos promocionales'))?.items || []
    }
  ]

  const categorias = [...new Set(productos.map(p => p.category))]
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const filteredProducts = selectedCategory 
    ? productos.filter(p => p.category === selectedCategory)
    : productos

  const getIcon = (category: string) => {
    switch(category) {
      case 'Ropa':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a3 3 0 01-3-3V6z" clipRule="evenodd" />
          </svg>
        )
      case 'Arte Digital':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
          </svg>
        )
      default:
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 2L3 7v11a1 1 0 001 1h12a1 1 0 001-1V7l-7-5z" clipRule="evenodd" />
          </svg>
        )
    }
  }

  return (
    <section id="tienda" className="py-20 bg-gradient-to-br from-nuclear-white via-nuclear-yellow/5 to-nuclear-purple/5">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-nuclear-yellow/20 rounded-full mb-6">
            <svg className="w-8 h-8 text-nuclear-purple" fill="currentColor" viewBox="0 0 20 20">
              <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
            </svg>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-nuclear-black mb-6">
            Nuestra <span className="text-gradient">Tienda</span>
          </h2>
          <p className="text-xl text-nuclear-violet max-w-3xl mx-auto">
            Productos únicos creados por nuestra comunidad de artistas que exploran la frontera entre creatividad humana e inteligencia artificial.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
              selectedCategory === null
                ? 'bg-nuclear-purple text-white'
                : 'bg-nuclear-white text-nuclear-purple border border-nuclear-purple/20 hover:border-nuclear-purple/50'
            }`}
          >
            <span>Todos</span>
          </button>
          {categorias.map((categoria) => (
            <button
              key={categoria}
              onClick={() => setSelectedCategory(categoria)}
              className={`flex items-center space-x-2 px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                selectedCategory === categoria
                  ? 'bg-nuclear-purple text-white'
                  : 'bg-nuclear-white text-nuclear-purple border border-nuclear-purple/20 hover:border-nuclear-purple/50'
              }`}
            >
              {getIcon(categoria)}
              <span>{categoria}</span>
            </button>
          ))}
        </div>

        {/* Products Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredProducts.map((producto) => (
            <div 
              key={producto.id}
              className="group bg-nuclear-white rounded-3xl overflow-hidden shadow-lg border border-nuclear-purple/10 hover:border-nuclear-purple/30 hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              {/* Product Image Placeholder */}
              <div className="h-48 bg-gradient-to-br from-nuclear-purple/20 to-nuclear-violet/20 flex items-center justify-center">
                <div className="w-20 h-20 bg-nuclear-yellow/30 rounded-2xl flex items-center justify-center">
                  {getIcon(producto.category)}
                </div>
              </div>

              {/* Product Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-semibold bg-nuclear-purple/10 text-nuclear-purple px-3 py-1 rounded-full">
                    {producto.category}
                  </span>
                  <span className="text-lg font-black text-nuclear-purple">{producto.price}</span>
                </div>

                <h3 className="text-xl font-bold text-nuclear-black mb-3 group-hover:text-nuclear-purple transition-colors">
                  {producto.name}
                </h3>

                <p className="text-nuclear-violet text-sm mb-4 leading-relaxed">
                  {producto.description}
                </p>

                <div className="space-y-3">
                  <button
                    onClick={() => setSelectedProduct(producto)}
                    className="w-full bg-nuclear-white text-nuclear-purple border-2 border-nuclear-purple px-6 py-3 rounded-full font-semibold hover:bg-nuclear-purple hover:text-white transition-all duration-300"
                  >
                    Ver Detalles
                  </button>
                  
                  {producto.paymentMethods.length > 0 && (
                    <a
                      href={producto.paymentMethods[0]?.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block w-full bg-nuclear-yellow text-nuclear-black px-6 py-3 rounded-full font-bold text-center hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
                    >
                      Comprar Ahora
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Payment Methods Section */}
        <div className="bg-nuclear-black rounded-3xl p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl font-black mb-4">
              Métodos de <span className="text-nuclear-yellow">Pago</span>
            </h3>
            <p className="text-xl opacity-90 max-w-2xl mx-auto">
              Facilitamos múltiples formas de pago para que puedas apoyar nuestro proyecto de la manera más conveniente.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white/10 rounded-2xl">
              <div className="w-12 h-12 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">WhatsApp</h4>
              <p className="text-white/80 text-sm">Contacto directo para pedidos personalizados</p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-2xl">
              <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">PayPal</h4>
              <p className="text-white/80 text-sm">Pagos seguros internacionales</p>
            </div>

            <div className="text-center p-6 bg-white/10 rounded-2xl">
              <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-purple-400" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <h4 className="font-bold mb-2">Transferencias</h4>
              <p className="text-white/80 text-sm">Nequi, Bancolombia, PSE</p>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <h3 className="text-3xl font-black text-nuclear-black mb-6">
            ¿Buscas algo <span className="text-nuclear-purple">especial</span>?
          </h3>
          <p className="text-xl text-nuclear-violet mb-8 max-w-2xl mx-auto">
            También creamos productos personalizados y comisiones artísticas. Contactanos para proyectos especiales.
          </p>
          <a
            href="https://wa.me/573006101221?text=Hola%20quiero%20un%20producto%20personalizado"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-nuclear-yellow text-nuclear-black px-8 py-4 rounded-full font-bold text-lg hover:bg-nuclear-purple hover:text-white transition-all duration-300 transform hover:scale-105"
          >
            Producto Personalizado
          </a>
        </div>
      </div>

      {/* Product Detail Modal */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-nuclear-black/80 backdrop-blur-sm">
          <div className="bg-nuclear-white rounded-3xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-black text-nuclear-black">{selectedProduct.name}</h3>
              <button
                onClick={() => setSelectedProduct(null)}
                className="w-8 h-8 bg-nuclear-purple/10 rounded-full flex items-center justify-center text-nuclear-purple hover:bg-nuclear-purple hover:text-white transition-all"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="bg-nuclear-purple/10 text-nuclear-purple px-3 py-1 rounded-full text-sm font-semibold">
                    {selectedProduct.category}
                  </span>
                  <span className="text-2xl font-black text-nuclear-purple">{selectedProduct.price}</span>
                </div>
                <p className="text-nuclear-violet leading-relaxed">{selectedProduct.description}</p>
              </div>

              <div>
                <h4 className="font-bold text-nuclear-black mb-3">Características</h4>
                <ul className="space-y-2">
                  {selectedProduct.features.map((feature: string, index: number) => (
                    <li key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-nuclear-purple rounded-full"></div>
                      <span className="text-nuclear-violet">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {selectedProduct.paymentMethods.length > 0 && (
                <div>
                  <h4 className="font-bold text-nuclear-black mb-3">Métodos de Pago</h4>
                  <div className="grid grid-cols-1 gap-3">
                    {selectedProduct.paymentMethods.map((method: any, index: number) => (
                      <a
                        key={index}
                        href={method.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-between p-4 bg-nuclear-purple/5 rounded-xl hover:bg-nuclear-purple/10 transition-colors"
                      >
                        <span className="font-semibold text-nuclear-black">{method.texto}</span>
                        <svg className="w-5 h-5 text-nuclear-purple" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}

export default Tienda
