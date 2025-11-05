import React from 'react';
import VideoGallery from './VideoGallery';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

const VideoSection: React.FC = () => {
  const videos: Video[] = [
    {
      id: 1,
      title: 'Cómo Usar Nuestros Productos',
      videoUrl: 'https://www.youtube.com/watch?v=dQw4w9WgXcQ',
    },
    {
      id: 2,
      title: 'Lo Que Dicen Nuestros Clientes',
      videoUrl: 'https://www.youtube.com/watch?v=9bZkp7q19f0',
    },
    {
      id: 3,
      title: 'Detrás de Cámaras',
      videoUrl: 'https://www.youtube.com/watch?v=K4TOrB7at0Y',
    },
    {
      id: 4,
      title: 'Unboxing de Productos',
      videoUrl: 'https://www.youtube.com/watch?v=ysz5S6PUM-U',
    },
  ];

  if (videos.length === 0) return null;

  return <VideoGallery videos={videos} title="Nuestros Videos" />;
};

export default VideoSection;
