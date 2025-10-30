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
  const [priceFilter, setPriceFilter] = useState<'all' | 'low' | 'medium' | 'high'>('all')
  const [discountFilter, setDiscountFilter] = useState(false)
  const [featuredFilter, setFeaturedFilter] = useState(false)

  let offerSectionIndex = 0

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

  const filterProducts = (products: any[]) => {
    return products.filter(prod => {
      const price = parseFloat(prod.price.replace(/[$.]/g, ''))
      const discount = parseInt(prod.discount) || 0

      // Price filter
      if (priceFilter === 'low' && price > 10000) return false
      if (priceFilter === 'medium' && (price <= 10000 || price > 50000)) return false
      if (priceFilter === 'high' && price <= 50000) return false

      // Discount filter
      if (discountFilter && discount === 0) return false

      // Featured filter
      if (featuredFilter && !prod.featured) return false

      return true
    })
  }

  return (
    <>
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

        // 🟣 Productos → compactos con filtro
        if (section.type === 'products') {
          const filteredProducts = filterProducts(section.items || [])
          return (
            <section
              key={section.id}
              id={cleanId}
              className="container mx-auto px-4 py-8 max-w-7xl scroll-mt-24"
            >
              <div className="flex gap-6">
                {/* Sidebar Filter */}
                <div className="hidden lg:block w-64 flex-shrink-0">
                  <div className="sticky top-24 bg-white rounded-xl shadow-md p-6 border border-gray-200">
                    <h3 className="text-lg font-bold text-blue-700 mb-4">Filtros</h3>

                    <div className="space-y-6">
                      {/* Price Filter */}
                      <div>
                        <h4 className="text-sm font-semibold text-gray-700 mb-3">Precio</h4>
                        <div className="space-y-2">
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="price"
                              checked={priceFilter === 'all'}
                              onChange={() => setPriceFilter('all')}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Todos</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="price"
                              checked={priceFilter === 'low'}
                              onChange={() => setPriceFilter('low')}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Hasta $10.000</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="price"
                              checked={priceFilter === 'medium'}
                              onChange={() => setPriceFilter('medium')}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">$10.000 - $50.000</span>
                          </label>
                          <label className="flex items-center cursor-pointer">
                            <input
                              type="radio"
                              name="price"
                              checked={priceFilter === 'high'}
                              onChange={() => setPriceFilter('high')}
                              className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                            />
                            <span className="ml-2 text-sm text-gray-700">Más de $50.000</span>
                          </label>
                        </div>
                      </div>

                      {/* Discount Filter */}
                      <div className="pt-4 border-t border-gray-200">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={discountFilter}
                            onChange={(e) => setDiscountFilter(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">Solo ofertas</span>
                        </label>
                      </div>

                      {/* Featured Filter */}
                      <div className="pt-4 border-t border-gray-200">
                        <label className="flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={featuredFilter}
                            onChange={(e) => setFeaturedFilter(e.target.checked)}
                            className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">Destacados</span>
                        </label>
                      </div>

                      {/* Clear Filters */}
                      {(priceFilter !== 'all' || discountFilter || featuredFilter) && (
                        <button
                          onClick={() => {
                            setPriceFilter('all')
                            setDiscountFilter(false)
                            setFeaturedFilter(false)
                          }}
                          className="w-full mt-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 rounded-lg transition text-sm"
                        >
                          Limpiar filtros
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-6 text-blue-700">{section.title}</h2>
                  {filteredProducts.length === 0 ? (
                    <div className="text-center py-12">
                      <p className="text-gray-500 text-lg">No se encontraron productos con estos filtros</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                      {filteredProducts.map(prod => (
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
                  )
                  }
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
