import React from 'react';
import { X, ShoppingCart } from 'lucide-react';

interface ProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: {
    id: number;
    title: string;
    description: string;
    price: string;
    discount: string;
    image: string;
    category?: string;
    featured?: boolean;
  };
  onAddToCart: () => void;
}

const ProductModal: React.FC<ProductModalProps> = ({ isOpen, onClose, product, onAddToCart }) => {
  if (!isOpen) return null;

  const price = parseFloat(product.price.replace(/[$.]/g, ''));
  const discount = parseInt(product.discount) || 0;
  const finalPrice = price * (1 - discount / 100);
  const hasDiscount = discount > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4" onClick={onClose}>
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 bg-white rounded-full p-2 hover:bg-gray-100 transition shadow-lg"
          >
            <X className="w-6 h-6 text-gray-600" />
          </button>

          <div className="relative">
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-80 object-cover rounded-t-2xl"
            />
            {product.featured && (
              <span className="absolute top-4 left-4 bg-blue-600 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow">
                PRODUCTO DESTACADO
              </span>
            )}
            {hasDiscount && (
              <span className="absolute top-4 right-20 bg-red-500 text-white text-sm font-bold px-4 py-2 rounded-lg shadow">
                ¡OFERTA!
              </span>
            )}
          </div>

          <div className="p-6 space-y-4">
            {product.category && (
              <span className="inline-block bg-blue-100 text-blue-700 text-sm px-3 py-1 rounded-full font-medium">
                {product.category}
              </span>
            )}

            <h2 className="text-3xl font-bold text-gray-900">{product.title}</h2>

            <div className="border-t border-b border-gray-200 py-4">
              <h3 className="text-sm font-semibold text-gray-700 mb-2">Descripción</h3>
              <p className="text-gray-600 leading-relaxed">{product.description}</p>
            </div>

            <div className="space-y-2">
              {hasDiscount && (
                <div className="flex items-center gap-3">
                  <span className="text-2xl text-gray-400 line-through">${price.toLocaleString('es-CL')}</span>
                  <span className="bg-red-100 text-red-600 text-sm font-bold px-3 py-1 rounded-full">
                    -{discount}%
                  </span>
                </div>
              )}
              <div className="text-4xl font-bold text-blue-700">
                ${finalPrice.toLocaleString('es-CL')}
              </div>
              <p className="text-sm text-green-600 font-medium flex items-center gap-1">
                <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                En Stock
              </p>
            </div>

            <button
              onClick={onAddToCart}
              className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-3 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
            >
              <ShoppingCart className="w-5 h-5" />
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
