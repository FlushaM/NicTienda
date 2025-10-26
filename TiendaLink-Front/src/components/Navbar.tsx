// src/components/Navbar.tsx
import React from 'react';
import { MapPin } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <>
      {/* 🔹 Top bar solo con botón Locales */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-12 items-center justify-end">
            <a
              href="#locales-contacto"
              className="flex items-center gap-2 text-gray-700 hover:text-gray-900 text-sm"
            >
              
              
            </a>
          </div>
        </div>
      </nav>

      {/* 🔹 Banner morado con logo y título */}
      <div className="w-full bg-purple-300 text-white py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <img
            src="https://github.com/FlushaM/imagenes-matias/blob/main/WhatsApp%20Image%202025-08-13%20at%204.17.28%20PM.jpeg?raw=true"
            alt="Logo"
            className="mx-auto h-20 w-auto mb-3"
          />
          <h2 className="text-2xl font-bold">MULTISERVICIOS</h2>
          <p className="text-lg">Descubre nuestros productos y novedades exclusivas</p>
        </div>
      </div>

      {/* 🔹 Barra de categorías */}
      <div className="bg-white border-t border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-center gap-8 py-3 text-sm font-medium text-gray-700">
            <a href="#libreria" className="hover:text-purple-700">Librería</a>
            <a href="#helados" className="hover:text-purple-700">Heladería</a>
            <a href="#bebidas-alternativas" className="hover:text-purple-700">Bebidas</a>
            <a href="#localizacion" className="hover:text-purple-700">Locales y Contacto</a>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
