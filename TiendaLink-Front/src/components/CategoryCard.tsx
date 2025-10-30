// src/components/CategoryCard.tsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';

interface CategoryCardProps {
  id: number;
  title: string;
  description?: string;
  price: string;
  discount: string;
  image: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
  featured?: boolean;
  onAddToCart?: (product: { id: number; title: string; price: string; discount: string; image: string; description: string }) => void;
  onClick?: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  description = '',
  price,
  discount,
  image,
  featured = false,
  onAddToCart,
  onClick,
}) => {
  const priceNum = parseFloat(price.replace(/[$.]/g, ''));
  const discountNum = parseInt(discount) || 0;
  const finalPrice = priceNum * (1 - discountNum / 100);
  const hasDiscount = discountNum > 0;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAddToCart) {
      onAddToCart({ id, title, price, discount, image, description });
    }
  };

  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 border border-gray-100"
    >
      <div className="relative">
        <img
          src={image}
          alt={title}
          className="w-full h-48 object-cover"
        />

        {hasDiscount && (
          <span className="absolute top-3 left-3 bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-md">
            ¡OFERTA!
          </span>
        )}

        {featured && (
          <span className="absolute bottom-3 left-3 bg-blue-600 text-white text-xs font-semibold px-3 py-1 rounded-lg shadow-md">
            PRODUCTO DESTACADO
          </span>
        )}
      </div>

      <div className="p-4 space-y-3">
        <h3 className="text-gray-900 font-bold text-sm line-clamp-2 min-h-[2.5rem]">
          {title}
        </h3>

        <div className="space-y-1">
          {hasDiscount && (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-400 line-through">
                ${priceNum.toLocaleString('es-CL')}
              </span>
              <span className="bg-red-100 text-red-600 text-xs font-bold px-2 py-0.5 rounded">
                -{discountNum}%
              </span>
            </div>
          )}
          <div className="text-2xl font-bold text-blue-700">
            ${finalPrice.toLocaleString('es-CL')}
          </div>
        </div>

        <div className="flex gap-2">
          <button
            onClick={onClick}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2.5 px-4 rounded-lg transition-all text-sm"
          >
            VISITA NUESTRA TIENDA
          </button>

          <button
            onClick={handleAddToCart}
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-2.5 rounded-lg transition-all shadow-sm hover:shadow-md"
            title="Agregar al carrito"
          >
            <ShoppingCart className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;