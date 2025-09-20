"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { Play, Pause, SkipBack, SkipForward } from "lucide-react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";

export default function ImageCarousel({ images = [], title = "Gallery", enableLightbox = false }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [showLightbox, setShowLightbox] = useState(false);
  const intervalRef = useRef(null);

  // Preload all images in background for smooth transitions
  useEffect(() => {
    images.forEach((src, index) => {
      if (index > 0) { // Skip first image as it's already prioritized
        const img = new window.Image();
        img.src = src;
      }
    });
  }, [images]);

  // Handle ESC key to close lightbox
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape' && showLightbox) {
        setShowLightbox(false);
      }
    };

    if (showLightbox) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showLightbox]);

  // Prepare images for react-image-gallery
  const galleryImages = images.map((url) => ({
    original: url,
    thumbnail: url,
  }));

  // Auto-change images every 3 seconds when playing
  useEffect(() => {
    if (images.length <= 1 || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [images.length, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + images.length) % images.length,
    );
  };

  // Don't render if no images
  if (!images.length) return null;

  return (
    <section className="relative py-20">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-nature bg-clip-text text-transparent">
          {title}
        </h2>

        <div className="relative max-w-2xl mx-auto h-[600px]">
          {/* Card Stack */}
          <div className="relative w-full h-full">
            {images.map((imageUrl, index) => {
              const isActive = index === currentImageIndex;
              const offset = index - currentImageIndex;

              return (
                <div
                  key={index}
                  className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer ${
                    isActive ? "z-20" : "z-10"
                  }`}
                  style={{
                    transform: `
                      translateX(${offset * 12}px) 
                      translateY(${offset * 6}px) 
                      scale(${isActive ? 1 : 0.95})
                    `,
                    opacity:
                      Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.7,
                  }}
                  onClick={() => {
                    if (enableLightbox) {
                      setIsPlaying(false); // Stop autoplay when opening lightbox
                      setShowLightbox(true);
                      setCurrentImageIndex(index);
                    } else {
                      setCurrentImageIndex(index);
                    }
                  }}
                >
                  <Image
                    src={imageUrl}
                    alt={`Gallery image ${index + 1}`}
                    fill
                    className="object-contain"
                    priority={index === 0}
                    loading={index === 0 ? "eager" : "lazy"}
                    onError={(e) => {
                      e.target.style.display = "none";
                    }}
                  />

                  {/* Card border effect */}
                  <div className="absolute inset-0 border-4 border-white/20 rounded-2xl pointer-events-none"></div>
                </div>
              );
            })}
          </div>

          {/* DVD Player Controls */}
          <div className="absolute bottom-[-5rem] left-1/2 transform -translate-x-1/2 flex items-center space-x-4">
            {/* Previous Button */}
            <button
              onClick={prevImage}
              className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
              title="Previous"
            >
              <SkipBack size={20} />
            </button>

            {/* Play/Pause Button */}
            <button
              onClick={togglePlayPause}
              className="p-4 bg-tertiary hover:bg-tertiary/90 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
              title={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? <Pause size={24} /> : <Play size={24} />}
            </button>

            {/* Next Button */}
            <button
              onClick={nextImage}
              className="p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg"
              title="Next"
            >
              <SkipForward size={20} />
            </button>
          </div>

          {/* Dot Indicators */}
          <div className="absolute bottom-[-8rem] left-1/2 transform -translate-x-1/2 flex space-x-2">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-3 h-3 rounded-full transition-all duration-300 ${
                  index === currentImageIndex
                    ? "bg-tertiary shadow-lg scale-125"
                    : "bg-gray-300 hover:bg-gray-400"
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {enableLightbox && showLightbox && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <div className="w-full max-w-5xl mx-auto">
            <ImageGallery
              items={galleryImages}
              startIndex={currentImageIndex}
              showThumbnails={true}
              showPlayButton={false}
              showFullscreenButton={false}
              onSlide={(index) => setCurrentImageIndex(index)}
              onScreenChange={() => {}}
              additionalClass="custom-gallery"
              renderLeftNav={(onClick, disabled) => (
                <button
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg z-10"
                  disabled={disabled}
                  onClick={onClick}
                >
                  <SkipBack size={20} />
                </button>
              )}
              renderRightNav={(onClick, disabled) => (
                <button
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 p-3 bg-gray-800 hover:bg-gray-700 text-white rounded-full transition-all duration-200 hover:scale-105 shadow-lg z-10"
                  disabled={disabled}
                  onClick={onClick}
                >
                  <SkipForward size={20} />
                </button>
              )}
            />
          </div>
          <button
            onClick={() => setShowLightbox(false)}
            className="absolute top-4 right-4 text-white text-2xl bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-all"
          >
            ×
          </button>
        </div>
      )}
    </section>
  );
}