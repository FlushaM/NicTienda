// src/components/LocationSection.tsx
import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";

const LocationSection: React.FC = () => {
  return (
    <section id="localizacion" className="bg-gray-100 py-16">
      <div className="container mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
        
        {/* Mapa */}
        <div className="w-full h-64 md:h-96 rounded-lg overflow-hidden shadow-lg md:col-span-1">
          <iframe
            title="Ubicación Multiservicio"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d28345.125976463107!2d-70.34468761435532!3d-27.37131948808418!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x9698052ac6009dbb%3A0x32d0f9459f6d986!2sSupermercado%20Unimarc!5e0!3m2!1ses-419!2scl!4v1756266444586!5m2!1ses-419!2scl"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>

        {/* Info de la tienda */}
        <div className="space-y-4 md:col-span-1">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Nuestra Tienda</h2>
          <div className="flex items-center gap-3">
            <MapPin className="text-purple-600" />
            <span>Al interior del Supermercado Unimarc, local nro 5, Copiapó, Atacama</span>
          </div>
          <div className="flex items-center gap-3">
            <Clock className="text-purple-600" />
            <span>Lunes a Domingo: 9:00 – 21:00 hrs</span>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="text-purple-600" />
            <span>+569 38761485</span>
          </div>

          <a
            href={`https://wa.me/56938761485?text=${encodeURIComponent(
              'Hola, vengo del sitio web y me gustaría más información, por favor 🙌'
            )}`}
            target="_blank"
            rel="noreferrer"
            className="inline-block mt-4 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg shadow-md transition"
            aria-label="Escríbenos por WhatsApp"
            title="Escríbenos por WhatsApp"
          >
            Escríbenos por WhatsApp
          </a>
        </div>

        {/* QR Instagram */}
        <div className="flex flex-col items-center md:col-span-1 text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Escanea nuestro Instagram
          </h3>
          <img
            src="https://github.com/FlushaM/imagenes-matias/blob/main/qrmultiservicios.jpeg?raw=true"
            alt="QR Instagram Multiservicios Copiapó"
            className="w-80 h-80 md:w-96 md:h-96 lg:w-[28rem] lg:h-[28rem] object-contain rounded-lg shadow-xl"
          />
        </div>
      </div>
    </section>
  );
};

export default LocationSection;
