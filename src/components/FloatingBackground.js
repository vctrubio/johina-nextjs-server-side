'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function FloatingBackground({ floatersData }) {
  const [floatingImages, setFloatingImages] = useState([]);

  useEffect(() => {
    if (!floatersData?.entries?.length) {
      console.log('No floaters data:', floatersData);
      return;
    }

    // Extract image URLs from Contentful data - handling array of images
    const imageUrls = [];
    floatersData.entries.forEach(entry => {
      const imageField = entry.fields.image;
      if (Array.isArray(imageField)) {
        imageField.forEach(img => {
          const url = img?.fields?.file?.url;
          if (url) {
            imageUrls.push(url.startsWith('//') ? `https:${url}` : url);
          }
        });
      }
    });

    console.log('Extracted image URLs:', imageUrls);

    if (imageUrls.length === 0) {
      console.log('No valid image URLs found');
      return;
    }

    // Shuffle the image URLs for variety on each visit
    const shuffledUrls = [...imageUrls].sort(() => Math.random() - 0.5);

    // Create floating images with random properties - using ALL available images
    const images = shuffledUrls.map((url, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 180 + 120,
      rotation: Math.random() * 360,
      delay: Math.random() * 4,
      imageUrl: url,
      opacity: 0.8 + Math.random() * 0.2,
    }));

    console.log('Generated floating images:', images);
    setFloatingImages(images);
  }, [floatersData]);

  if (!floatingImages.length) return null;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {floatingImages.map((image) => (
        <div
          key={image.id}
          className="absolute rounded-lg overflow-hidden shadow-sm animate-float-slow"
          style={{
            left: `${image.x}%`,
            top: `${image.y}%`,
            width: `${image.size}px`,
            height: `${image.size * 0.75}px`,
            transform: `rotate(${image.rotation}deg)`,
            animationDelay: `${image.delay}s`,
            opacity: image.opacity,
          }}
        >
          {image.imageUrl && (
            <Image
              src={image.imageUrl}
              alt="Background artwork"
              fill
              className="object-cover"
              onError={(e) => {
                console.log('Image failed to load:', image.imageUrl);
                e.target.style.display = 'none';
              }}
              onLoad={() => console.log('Image loaded successfully:', image.imageUrl)}
            />
          )}
        </div>
      ))}
    </div>
  );
}