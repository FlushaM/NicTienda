// src/components/OfferCard.tsx
import React from 'react';

interface OfferCardProps {
  id: string;
  title: string;
  image: string;
  link: string;
  size?: 'small' | 'medium' | 'large' | 'xl';
}

const sizeClasses: Record<NonNullable<OfferCardProps['size']>, string> = {
  small:  'col-span-1',
  medium: 'col-span-1 sm:col-span-2',
  large:  'col-span-1 sm:col-span-3',
  xl:     'col-span-full', // 👈 ocupa todo el ancho del grid
};

const OfferCard: React.FC<OfferCardProps> = ({
  title,
  image,
  link,
  size = 'medium',
}) => {
  const handleClick = (e: React.MouseEvent) => {
    if (link.startsWith('#')) {
      e.preventDefault();
      const id = link.slice(1);
      const target = document.getElementById(id);
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <a
      href={link}
      onClick={handleClick}
      target={link.startsWith('#') ? undefined : '_blank'}
      rel="noreferrer"
      className={`
        ${sizeClasses[size]}
        block bg-white rounded-lg overflow-hidden
        shadow-sm hover:shadow-md transition-shadow duration-300
      `}
    >
      <img
        src={image}
        alt={title}
        className="block w-full h-auto object-contain"
        loading="lazy"
      />
    </a>
  );
};

export default OfferCard;
