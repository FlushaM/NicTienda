import React, { useState } from 'react'
import CategoryCard from './CategoryCard'
import OfferCard from './OfferCard'
import CircularCategory from './CircularCategory'
import ProductModal from './ProductModal'
import { useCart } from '../contexts/CartContext'

interface HomeSectionsProps {
  sections: Array<{
    id: string
    title: string
    type: 'products' | 'offers' | 'category'
    layout: 'grid' | 'carousel' | 'featured'
    items?: any[]
    offers?: any[]
  }>
  categories: Array<{
    id: string
    title: string
    categoryItems?: any[]
  }>
  addToCart: (p: {
    id: number
    title: string
    price: string
    discount: string
  }) => void
}

const HomeSections: React.FC<HomeSectionsProps> = ({
  sections,
  categories,
}) => {
  const { addToCart } = useCart()
  const [selectedProduct, setSelectedProduct] = useState<any>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedSectionId, setSelectedSectionId] = useState<string>('all')

  let offerSectionIndex = 0
  const productSections = sections.filter(s => s.type === 'products')
  const hasProductSections = productSections.length > 0

  const getCleanId = (title: string) =>
    title.replace(/\s+/g, '-').toLowerCase()

  const handleProductClick = (product: any) => {
    setSelectedProduct(product)
    setIsModalOpen(true)
  }

  const handleAddToCart = (product: any) => {
    addToCart(product)
    setIsModalOpen(false)
  }

  return (
    <>
      {/* Mobile Filter - Horizontal Banner (visible only on mobile) */}
      {hasProductSections && (
        <div className="lg:hidden bg-white border-b border-gray-200 sticky top-[140px] z-30 shadow-sm">
          <div className="container mx-auto px-4 py-3 max-w-7xl">
            <div className="flex items-center gap-3 overflow-x-auto scrollbar-hide">
              <span className="text-xs font-semibold text-gray-700 whitespace-nowrap">Filtrar:</span>
              <button
                onClick={() => setSelectedSectionId('all')}
                className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all ${
                  selectedSectionId === 'all'
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Todos
              </button>
              {productSections.map(section => (
                <button
                  key={section.id}
                  onClick={() => setSelectedSectionId(section.id)}
                  className={`px-3 py-1.5 rounded-lg font-medium text-xs whitespace-nowrap transition-all ${
                    selectedSectionId === section.id
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {section.title}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {sections.map(section => {
        const cleanId = getCleanId(section.title)

        // 🟣 Ofertas → primera destacada
        if (section.type === 'offers') {
          const isFirstOfferSection = offerSectionIndex === 0
          offerSectionIndex++

          if (isFirstOfferSection) {
            return (
              <section
                key={section.id}
                id={cleanId} // 👈 ID para scroll
                className="py-16 bg-gradient-to-r from-violet-50 via-purple-50 to-violet-50 scroll-mt-24"
              >
                <div className="mx-auto px-4 max-w-[1800px]">
                  <h2 className="text-3xl font-bold mb-8 text-center">{section.title}</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
                    {(section.offers || []).map(off => (
                      <OfferCard
                        key={off.id}
                        id={off.id}
                        title={off.title}
                        image={off.image}
                        size={off.size}
                        link={off.link} // 👈 Aquí puedes poner #id
                      />
                    ))}
                  </div>
                </div>
              </section>
            )
          }

          // Otras ofertas → normales
          return (
            <section
              key={section.id}
              id={cleanId}
              className="container mx-auto px-4 py-8 max-w-7xl scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(section.offers || []).map(off => (
                  <OfferCard
                    key={off.id}
                    id={off.id}
                    title={off.title}
                    image={off.image}
                    size={off.size}
                    link={off.link}
                  />
                ))}
              </div>
            </section>
          )
        }

        // 🟣 Productos → con filtro responsive
        if (section.type === 'products') {
          // Filter by selected section
          if (selectedSectionId !== 'all' && selectedSectionId !== section.id) {
            return null
          }

          return (
            <section
              key={section.id}
              id={cleanId}
              className="container mx-auto px-4 py-8 max-w-7xl scroll-mt-24"
            >
              <div className="flex gap-6">
                {/* Desktop Sidebar Filter */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-24 bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-blue-700 mb-4">Categorías</h3>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedSectionId('all')}
                        className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                          selectedSectionId === 'all'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        Todos los productos
                      </button>
                      {productSections.map(sec => (
                        <button
                          key={sec.id}
                          onClick={() => setSelectedSectionId(sec.id)}
                          className={`w-full text-left px-4 py-2.5 rounded-lg font-medium text-sm transition-all ${
                            selectedSectionId === sec.id
                              ? 'bg-blue-600 text-white shadow-md'
                              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                          }`}
                        >
                          {sec.title}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6 text-blue-700">{section.title}</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {(section.items || []).map(prod => (
                      <CategoryCard
                        key={prod.id}
                        id={prod.id}
                        title={prod.title}
                        description={prod.description || ''}
                        image={prod.image}
                        size={prod.size}
                        discount={prod.discount}
                        price={prod.price}
                        featured={prod.featured}
                        onAddToCart={addToCart}
                        onClick={() => handleProductClick(prod)}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </section>
          )
        }

        // 🟣 Categorías circulares
        if (section.type === 'category') {
          return (
            <section
              key={section.id}
              id={cleanId}
              className="container mx-auto px-4 py-8 max-w-7xl scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
              {categories.map(cat => (
                <div key={cat.id} className="mb-12">
                  <h3 className="text-xl font-semibold mb-4">{cat.title}</h3>
                  <div className="flex gap-6 overflow-x-auto scrollbar-hide">
                    {(cat.categoryItems || []).map(item => (
                      <CircularCategory
                        key={item.id}
                        title={item.title}
                        image={item.image}
                      />
                    ))}
                  </div>
                </div>
              ))}
            </section>
          )
        }

        return null
      })}

      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          product={selectedProduct}
          onAddToCart={() => handleAddToCart(selectedProduct)}
        />
      )}
    </>
  )
}

export default HomeSections

