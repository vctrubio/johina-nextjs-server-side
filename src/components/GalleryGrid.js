'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

const GalleryItem = ({ imageUrl, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const itemRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1, rootMargin: '200px' }
    );

    if (itemRef.current) {
      observer.observe(itemRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Create layout variations
  const layouts = [
    { align: 'justify-start', size: { w: 500, h: 375 }, offset: 'ml-8', bg: 'bg-gradient-to-r from-blue-50/30 to-transparent' },
    { align: 'justify-center', size: { w: 700, h: 525 }, offset: '', bg: 'bg-gradient-to-l from-purple-50/20 via-pink-50/20 to-blue-50/20' },
    { align: 'justify-end', size: { w: 550, h: 400 }, offset: 'mr-8', bg: 'bg-gradient-to-l from-green-50/30 to-transparent' },
  ];

  const layout = layouts[index % 3];
  const rotation = [-2, 0, 2][index % 3];

  return (
    <div
      ref={itemRef}
      className={`relative py-16 px-4 transition-all duration-600 ${layout.bg} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${(index % 3) * 100}ms` }}
    >
      <div className={`flex ${layout.align} max-w-7xl mx-auto`}>
        <div
          className={`relative group ${layout.offset}`}
          style={{
            transform: isVisible ? `rotate(${rotation}deg)` : 'rotate(0deg)',
            transition: 'transform 600ms ease-out',
            transitionDelay: `${200 + (index % 3) * 50}ms`
          }}
        >
          <div className="relative overflow-hidden rounded-3xl shadow-2xl border-4 border-white/30 backdrop-blur-sm">
            <Image
              src={imageUrl}
              alt={`Gallery image ${index + 1}`}
              width={layout.size.w}
              height={layout.size.h}
              className="h-auto object-cover transition-all duration-700 group-hover:scale-110 relative z-20"
              onError={(e) => {
                console.log('Gallery image failed to load:', imageUrl);
                e.target.style.display = 'none';
              }}
              onLoad={() => console.log('Gallery image loaded successfully:', imageUrl)}
            />
            
            {/* Hover overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
            
            {/* Subtle glow effect */}
            <div className={`absolute -inset-1 rounded-3xl blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10 ${
              index % 5 === 0 ? 'bg-primary/20' :
              index % 5 === 1 ? 'bg-secondary/20' :
              index % 5 === 2 ? 'bg-tertiary/20' :
              index % 5 === 3 ? 'bg-fourth/20' :
              'bg-fifth/20'
            }`}></div>
          </div>
          
          {/* Floating accent */}
          <div 
            className={`absolute -top-2 -right-2 w-6 h-6 rounded-full opacity-70 group-hover:scale-125 transition-transform duration-300 ${
              index % 5 === 0 ? 'bg-primary' :
              index % 5 === 1 ? 'bg-secondary' :
              index % 5 === 2 ? 'bg-tertiary' :
              index % 5 === 3 ? 'bg-fourth' :
              'bg-fifth'
            }`}
            style={{ 
              animationDelay: `${index * 300}ms`,
              animation: isVisible ? 'float 4s ease-in-out infinite' : 'none'
            }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default function GalleryGrid({ bannersData }) {
  if (!bannersData?.entries?.length) {
    console.log('No banners data:', bannersData);
    return null;
  }

  // Extract image URLs from Contentful data - handling array of images
  const galleryImages = [];
  bannersData.entries.forEach(entry => {
    const imagesField = entry.fields.images;
    if (Array.isArray(imagesField)) {
      imagesField.forEach(img => {
        const url = img?.fields?.file?.url;
        if (url) {
          galleryImages.push(url.startsWith('//') ? `https:${url}` : url);
        }
      });
    }
  });

  console.log('Gallery images extracted:', galleryImages);

  if (galleryImages.length === 0) {
    console.log('No valid gallery images found');
    return null;
  }

  // Show all images with enhanced layout
  const displayImages = galleryImages;

  return (
    <section className="relative overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-gray-100 to-transparent"></div>
      </div>
      
      <div className="relative">
        {displayImages.map((imageUrl, index) => (
          <GalleryItem key={index} imageUrl={imageUrl} index={index} />
        ))}
      </div>
      
      {/* Bottom fade effect */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent pointer-events-none"></div>
    </section>
  );
}