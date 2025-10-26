import React from 'react';
import { FaFacebook, FaInstagram, FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        
        {/* Grilla principal */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Quiénes Somos */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quiénes Somos</h3>
            <p className="text-gray-300">
              En <strong>Multiservicios Copiapó</strong> ofrecemos un catálogo digital con una amplia variedad de productos 
              pensados para tu comodidad. Nuestro compromiso es facilitar el acceso a lo que necesitas de manera rápida y confiable.
            </p>
          </div>

          {/* Redes Sociales */}
          <div>
            <h3 className="text-xl font-bold mb-4">Síguenos</h3>
            <div className="flex flex-col gap-4">
              <a
                href="mailto:tienda.multiservicios.copiapo@gmail.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-red-400 transition"
              >
                <FaEnvelope className="text-2xl" />
                tienda.multiservicios.copiapo@gmail.com
              </a>

              <a
                href="https://instagram.com/tienda.multiservicios.copiapo"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-pink-400 transition"
              >
                <FaInstagram className="text-2xl" />
                @tienda.multiservicios.copiapo
              </a>

              <a
                href="https://facebook.com/MultiserviciosCopiapó"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 hover:text-blue-400 transition"
              >
                <FaFacebook className="text-2xl" />
                Multiservicios Copiapó
              </a>
            </div>
          </div>
        </div>

        {/* Logos institucionales */}
        <div className="mt-12 border-t border-gray-700 pt-6">
          <h3 className="text-center text-lg font-semibold mb-4"></h3>
          <div className="flex flex-wrap justify-center items-center gap-8">
            <img
              src="https://github.com/FlushaM/imagenes-matias/blob/main/proyecto%20apoyado%20por_blanco.png?raw=true"
              alt="Sercotec"
             className="h-40 md:h-52 lg:h-72 w-auto object-contain shrink-0"
            />
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
