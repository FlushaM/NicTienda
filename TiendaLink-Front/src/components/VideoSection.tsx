import React, { useState, useEffect } from 'react';
import axios from 'axios';
import VideoGallery from './VideoGallery';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
  position: number;
}

const VideoSection: React.FC = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const baseURL = import.meta.env.VITE_API_URL || '';

  useEffect(() => {
    fetchVideos();
  }, []);

  const fetchVideos = async () => {
    try {
      const res = await axios.get(`${baseURL}/api/videos`);
      const sorted = res.data.sort((a: Video, b: Video) => a.position - b.position);
      setVideos(sorted);
    } catch (error) {
      console.error('Error al obtener videos:', error);
    }
  };

  if (videos.length === 0) return null;

  return <VideoGallery videos={videos} title="Nuestros Videos" />;
};

export default VideoSection;
