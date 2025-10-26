// src/components/AnnouncementBar.tsx
import React, { useEffect, useState } from 'react';

interface AnnouncementBarProps {
  announcements: string[];
}

const AnnouncementBar: React.FC<AnnouncementBarProps> = ({ announcements }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [announcements]);

  if (!announcements.length) return null;

  return (
    <div className="bg-purple-500 text-white py-2 relative overflow-hidden">
      <div className="container mx-auto px-4 flex justify-center items-center">
        <p className="text-sm font-medium animate-fade-in-out">
          {announcements[index]}
        </p>
      </div>
      <div className="absolute bottom-0 left-0 w-full h-1 bg-blue-500">
        <div 
          className="h-full bg-white animate-progress-bar"
          style={{ animation: 'progress 3s linear infinite' }}
        />
      </div>
    </div>
  );
};

export default AnnouncementBar;
