import React from 'react';
import { MessageCircle, ShoppingBag } from 'lucide-react';

interface BannerProps {
  onAddToCart: () => void;
}

const Banner: React.FC<BannerProps> = ({ onAddToCart }) => {
  const handleWhatsAppClick = () => {
    window.open('https://wa.me/+56912345678', '_blank');
  };

  return (
    <div className="relative h-[400px] overflow-hidden">
      <img
        src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1920"
        alt="Banner principal"
        className="w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
        <div className="text-center text-white">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Ofertas Especiales</h1>
          <p className="text-xl mb-8">Descubre nuestras increíbles promociones</p>
          <div className="flex gap-4 justify-center">
            <button
              onClick={handleWhatsAppClick}
              className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <MessageCircle className="w-5 h-5" />
              Contactar
            </button>
            <button
              onClick={onAddToCart}
              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              Agregar al Carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;