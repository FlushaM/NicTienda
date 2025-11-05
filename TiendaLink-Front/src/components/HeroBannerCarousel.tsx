import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import axios from 'axios';

interface Banner {
  id: string;
  title: string;
  subtitle: string;
  buttonText?: string;
  buttonLink?: string;
  image: string;
  position: number;
}

const HeroBannerCarousel: React.FC = () => {
  const [banners, setBanners] = useState<Banner[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const baseURL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    if (banners.length > 1) {
      const timer = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % banners.length);
      }, 5000);
      return () => clearInterval(timer);
    }
  }, [banners.length]);

  const fetchBanners = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/banners`);
      const sorted = res.data.sort((a: Banner, b: Banner) => a.position - b.position);
      setBanners(sorted);
    } catch (error) {
      console.error('Error al obtener banners:', error);
    }
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % banners.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + banners.length) % banners.length);
  };

  if (banners.length === 0) return null;

  return (
    <div className="relative w-full h-[500px] bg-gray-900 overflow-hidden">
      {banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-opacity duration-700 ${
            index === currentIndex ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <img
            src={banner.image}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
            <div className="text-center text-white px-4 max-w-4xl">
              <h1 className="text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                {banner.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 drop-shadow-md">
                {banner.subtitle}
              </p>
              {banner.buttonText && banner.buttonLink && (
                <a
                  href={banner.buttonLink}
                  className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors duration-200 shadow-lg"
                >
                  {banner.buttonText}
                </a>
              )}
            </div>
          </div>
        </div>
      ))}

      {banners.length > 1 && (
        <>
          <button
            onClick={prevSlide}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all"
            aria-label="Anterior"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-30 hover:bg-opacity-50 rounded-full p-2 transition-all"
            aria-label="Siguiente"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {banners.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-3 h-3 rounded-full transition-all ${
                  index === currentIndex
                    ? 'bg-white w-8'
                    : 'bg-white bg-opacity-50 hover:bg-opacity-75'
                }`}
                aria-label={`Ir a banner ${index + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default HeroBannerCarousel;
