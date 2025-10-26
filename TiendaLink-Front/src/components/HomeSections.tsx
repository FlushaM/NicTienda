import React from 'react'
import CategoryCard from './CategoryCard'
import OfferCard from './OfferCard'
import CircularCategory from './CircularCategory'

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
  addToCart
}) => {
  let offerSectionIndex = 0

  // 👉 Función para generar IDs limpios
  const getCleanId = (title: string) =>
    title.replace(/\s+/g, '-').toLowerCase()

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

        // 🟣 Productos → compactos
        if (section.type === 'products') {
          return (
            <section
              key={section.id}
              id={cleanId}
              className="container mx-auto px-4 py-8 max-w-7xl scroll-mt-24"
            >
              <h2 className="text-2xl font-bold mb-8">{section.title}</h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                {(section.items || []).map(prod => (
                  <CategoryCard
                    key={prod.id}
                    id={prod.id}
                    title={prod.title}
                    image={prod.image}
                    size={prod.size}
                    discount={prod.discount}
                    price={prod.price}
                    onAddToCart={addToCart}
                  />
                ))}
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
    </>
  )
}

export default HomeSections
