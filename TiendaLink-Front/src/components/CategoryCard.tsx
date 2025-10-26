// src/components/CategoryCard.tsx
import React, { useState } from 'react';
import { Heart, MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '56938761485'; // sin +, con código país

interface CategoryCardProps {
  id: number;
  title: string;
  image: string;
  size: 'small' | 'medium' | 'large' | 'xl';
  category?: string;
  unit?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  id,
  title,
  image,
  size,
  category = "Productos",
  unit = "1 un",
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const sizeClassesMap = {
    small:  'col-span-1 row-span-1',
    medium: 'col-span-2 row-span-1',
    large:  'col-span-3 row-span-2',
    xl:     'col-span-6 row-span-1'
  } as const;
  const spanClasses = sizeClassesMap[size];

  const aspectMap = {
    small:  'aspect-square',
    medium: 'aspect-[2/1]',
    large:  'aspect-[3/2]',
    xl:     'aspect-[6/1]'
  } as const;
  const aspectClasses = aspectMap[size];

  const toggleFavorite = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsFavorite(f => !f);
  };

  // Construimos el mensaje y el link a api.whatsapp.com (NO wa.me)
  const message = `Hola, me interesa el producto "${title}". ¿Me puedes dar más información?`;
  const encoded = encodeURIComponent(message);
  const whatsappHref = `https://api.whatsapp.com/send?phone=${WHATSAPP_NUMBER}&text=${encoded}`;

  return (
    <div
      className={`
        ${spanClasses}
        flex flex-col bg-white rounded-lg overflow-hidden
        shadow-sm hover:shadow-md transition-shadow duration-300
      `}
    >
      <div className="relative">
        <span className="absolute top-2 left-2 z-10 bg-amber-500 text-white text-xs px-2 py-1 rounded-sm">
          MultiserviciosCopiapo
        </span>
        <button
          onClick={toggleFavorite}
          className="absolute top-2 right-2 z-10 bg-white/80 p-1.5 rounded-full hover:bg-white transition"
        >
          <Heart
            className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-400'}`}
          />
        </button>

        <div className={`w-full ${aspectClasses} overflow-hidden`}>
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-col flex-grow p-4">
        <p className="text-xs text-gray-500 uppercase">{category}</p>
        <h3 className="text-gray-800 font-medium line-clamp-2 mb-2">{title}</h3>

        <div className="mt-auto space-y-2">
          <span className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded">
            {unit}
          </span>

          {/* Enlace directo a api.whatsapp.com */}
          <a
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-lg flex items-center justify-center gap-2 transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-white"
            aria-label="Ir al WhatsApp"
            title="Ir al WhatsApp"
          >
            <MessageCircle className="w-4 h-4" />
            Ir al WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
};

export default CategoryCard;
