// src/components/Navbar.tsx
import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '../contexts/CartContext';

interface NavbarProps {
  onCartClick?: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ onCartClick }) => {
  const { itemCount } = useCart();

  return (
    <>
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-end">
            <button
              onClick={onCartClick}
              className="relative flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all shadow-sm hover:shadow-md"
            >
              <ShoppingCart className="w-5 h-5" />
              <span className="font-semibold">Carrito</span>
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center shadow-md">
                  {itemCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </nav>

      <div className="w-full bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://github.com/FlushaM/imagenes-matias/blob/main/WhatsApp%20Image%202025-11-11%20at%205.42.53%20PM.jpeg?raw=true"
            alt="Logo"
            className="mx-auto h-20 w-auto mb-3"
          />
          <h2 className="text-2xl font-bold">MULTISERVICIOS</h2>
          <p className="text-lg">Descubre nuestros productos y novedades exclusivas</p>
        </div>
      </div>

      <div className="bg-white border-t border-gray-200 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 py-3 text-sm font-medium text-gray-700">
            <a href="#detergentes" className="hover:text-blue-700 transition-colors">Detergentes</a>
            <a href="#lavalozas" className="hover:text-blue-700 transition-colors">Lavalozas</a>
            <a href="#limpieza-automotriz" className="hover:text-blue-700 transition-colors">Limpieza Automotriz</a>
            <a href="#localizacion" className="hover:text-blue-700 transition-colors">Locales y Contacto</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
