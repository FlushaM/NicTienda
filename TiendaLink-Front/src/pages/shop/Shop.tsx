import React, { useState, useEffect } from 'react';
import { X, Grid, List, Filter, ShoppingCart } from 'lucide-react';
import axios from 'axios';
import { useCart } from '../../contexts/CartContext';

interface Product {
  id: string;
  title: string;
  description: string;
  price: string;
  discount: string;
  image: string;
  category_id: string;
}

interface Category {
  id: string;
  title: string;
}

const Shop: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const itemsPerPage = 12;

  const { addToCart } = useCart();
  const baseURL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/categories`);
      setCategories(res.data.filter((cat: Category) => cat.title));
    } catch (error) {
      console.error('Error al obtener categorías:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/products`);
      setProducts(res.data);
    } catch (error) {
      console.error('Error al obtener productos:', error);
    }
  };

  const handleCategoryToggle = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
    setCurrentPage(1);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategories.length === 0 || selectedCategories.includes(product.category_id);
    const matchesSearch = product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + itemsPerPage);

  const clearFilters = () => {
    setSelectedCategories([]);
    setSearchQuery('');
    setCurrentPage(1);
  };

  const FilterSidebar = () => (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-lg">Productos</h3>
        {selectedCategories.length > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
          >
            <X className="w-4 h-4" />
            Eliminar filtros
          </button>
        )}
      </div>

      <div className="space-y-2">
        {categories.map(category => (
          <label
            key={category.id}
            className="flex items-center gap-2 p-2 hover:bg-gray-50 rounded cursor-pointer"
          >
            <input
              type="checkbox"
              checked={selectedCategories.includes(category.id)}
              onChange={() => handleCategoryToggle(category.id)}
              className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
            />
            <span className="text-sm text-gray-700">{category.title}</span>
          </label>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        <div className="flex gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar />
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            {/* Search and View Controls */}
            <div className="bg-white rounded-lg shadow-sm p-4 mb-4">
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="text"
                  placeholder="Buscar..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex gap-2">
                  {/* Mobile Filter Button */}
                  <button
                    onClick={() => setIsMobileFilterOpen(true)}
                    className="lg:hidden px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
                  >
                    <Filter className="w-5 h-5" />
                    Filtros
                  </button>

                  {/* View Mode Toggles */}
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg border ${
                      viewMode === 'grid'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Grid className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg border ${
                      viewMode === 'list'
                        ? 'bg-blue-600 text-white border-blue-600'
                        : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <List className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <div className="mt-2 text-sm text-gray-600">
                {filteredProducts.length} productos encontrados
              </div>
            </div>

            {/* Products Grid/List */}
            {viewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {paginatedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow"
                  >
                    <div className="aspect-square bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-sm text-gray-800 mb-2 line-clamp-2 min-h-[40px]">
                        {product.title}
                      </h3>
                      <div className="flex items-center justify-between">
                        <div>
                          {product.discount && parseInt(product.discount) > 0 ? (
                            <div className="flex flex-col">
                              <span className="text-xs text-gray-500 line-through">
                                ${product.price}
                              </span>
                              <span className="text-lg font-bold text-blue-600">
                                ${product.discount}
                              </span>
                            </div>
                          ) : (
                            <span className="text-lg font-bold text-gray-800">
                              ${product.price}
                            </span>
                          )}
                        </div>
                        <button
                          onClick={() => addToCart({
                            id: parseInt(product.id),
                            title: product.title,
                            price: product.discount || product.price,
                            discount: product.discount,
                            quantity: 1,
                            image: product.image,
                            description: product.description,
                          })}
                          className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-lg transition-colors"
                        >
                          <ShoppingCart className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {paginatedProducts.map(product => (
                  <div
                    key={product.id}
                    className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow flex"
                  >
                    <div className="w-32 sm:w-48 flex-shrink-0 bg-gray-100">
                      <img
                        src={product.image}
                        alt={product.title}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 flex-1 flex flex-col sm:flex-row justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-800 mb-2">
                          {product.title}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex sm:flex-col items-end justify-between sm:justify-end gap-2 mt-4 sm:mt-0 sm:ml-4">
                        {product.discount && parseInt(product.discount) > 0 ? (
                          <div className="flex flex-col items-end">
                            <span className="text-sm text-gray-500 line-through">
                              ${product.price}
                            </span>
                            <span className="text-xl font-bold text-blue-600">
                              ${product.discount}
                            </span>
                          </div>
                        ) : (
                          <span className="text-xl font-bold text-gray-800">
                            ${product.price}
                          </span>
                        )}
                        <button
                          onClick={() => addToCart({
                            id: parseInt(product.id),
                            title: product.title,
                            price: product.discount || product.price,
                            discount: product.discount,
                            quantity: 1,
                            image: product.image,
                            description: product.description,
                          })}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center gap-2"
                        >
                          <ShoppingCart className="w-5 h-5" />
                          <span className="hidden sm:inline">Agregar</span>
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-8 flex justify-center gap-2">
                <button
                  onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Anterior
                </button>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-4 py-2 rounded-lg ${
                      currentPage === page
                        ? 'bg-blue-600 text-white'
                        : 'border border-gray-300 hover:bg-gray-50'
                    }`}
                  >
                    {page}
                  </button>
                ))}

                <button
                  onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
                >
                  Siguiente
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      {isMobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black bg-opacity-50"
            onClick={() => setIsMobileFilterOpen(false)}
          />
          <div className="absolute left-0 top-0 bottom-0 w-80 max-w-[85vw] bg-white shadow-xl overflow-y-auto">
            <div className="p-4 border-b flex items-center justify-between">
              <h3 className="font-bold text-lg">Filtros</h3>
              <button
                onClick={() => setIsMobileFilterOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4">
              <FilterSidebar />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Shop;
