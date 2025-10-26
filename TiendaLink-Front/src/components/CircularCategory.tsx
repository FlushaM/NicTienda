import React from 'react';

interface CircularCategoryProps {
  title: string;
  image?: string; // lo marcamos opcional
}

const CircularCategory: React.FC<CircularCategoryProps> = ({ title, image }) => {
  const fallbackImage = '../../assets/img/placeholder.png'; // ruta del placeholder
  const finalImage = image && image.trim() !== '' ? image : fallbackImage;

  return (
    <div className="text-center">
      <div className="w-24 h-24 md:w-32 md:h-32 mx-auto mb-2 rounded-full overflow-hidden border-4 border-white shadow-lg hover:scale-105 transition-transform">
        <img
          src={finalImage}
          alt={title}
          className="w-full h-full object-cover"
        />
      </div>
      <h3 className="text-sm md:text-base font-medium">{title}</h3>
    </div>
  );
};

export default CircularCategory;
