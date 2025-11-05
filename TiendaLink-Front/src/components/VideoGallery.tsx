import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

interface Video {
  id: number;
  title: string;
  videoUrl: string;
  thumbnailUrl?: string;
}

interface VideoGalleryProps {
  videos: Video[];
  title?: string;
}

const VideoGallery: React.FC<VideoGalleryProps> = ({ videos, title }) => {
  const [selectedVideo, setSelectedVideo] = useState<Video | null>(null);

  if (!videos || videos.length === 0) return null;

  const getVideoId = (url: string) => {
    const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))([^&?]+)/);
    return match ? match[1] : null;
  };

  const getThumbnail = (video: Video) => {
    if (video.thumbnailUrl) return video.thumbnailUrl;
    const videoId = getVideoId(video.videoUrl);
    return videoId ? `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg` : '';
  };

  const getEmbedUrl = (url: string) => {
    const videoId = getVideoId(url);
    return videoId ? `https://www.youtube.com/embed/${videoId}?autoplay=1` : url;
  };

  return (
    <>
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          {title && (
            <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
              {title}
            </h2>
          )}

          <div className="flex gap-4 overflow-x-auto scrollbar-hide pb-4">
            {videos.map((video) => (
              <div
                key={video.id}
                className="flex-shrink-0 w-[280px] md:w-[320px] cursor-pointer group"
                onClick={() => setSelectedVideo(video)}
              >
                <div className="relative aspect-[9/16] rounded-2xl overflow-hidden shadow-lg group-hover:shadow-2xl transition-all">
                  <img
                    src={getThumbnail(video)}
                    alt={video.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  <div className="absolute inset-0 bg-black/30 group-hover:bg-black/40 transition-colors" />

                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="bg-white/90 backdrop-blur-sm p-4 rounded-full group-hover:bg-blue-600 group-hover:scale-110 transition-all">
                      <Play className="w-8 h-8 text-gray-800 group-hover:text-white fill-current" />
                    </div>
                  </div>

                  {video.title && (
                    <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                      <p className="text-white font-semibold text-sm line-clamp-2">
                        {video.title}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {selectedVideo && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
          onClick={() => setSelectedVideo(null)}
        >
          <button
            className="absolute top-4 right-4 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white p-2 rounded-full transition-all"
            onClick={() => setSelectedVideo(null)}
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative w-full max-w-[500px] aspect-[9/16] bg-black rounded-lg overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              src={getEmbedUrl(selectedVideo.videoUrl)}
              title={selectedVideo.title}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoGallery;
