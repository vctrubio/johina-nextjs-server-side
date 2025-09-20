'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Home } from 'lucide-react';
import { getBackgroundFloaters } from '../services/backgroundFloaters';
import { getMurals } from '../services/murals';

export default function NotFound() {
  const [floatingImages, setFloatingImages] = useState([]);
  const [recommendedMurals, setRecommendedMurals] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch floating background images
        const floatersData = await getBackgroundFloaters();
        if (floatersData?.entries?.length) {
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

          // Create floating images for 404 page
          const shuffledUrls = [...imageUrls].sort(() => Math.random() - 0.5);
          const images = shuffledUrls.slice(0, 6).map((url, i) => ({
            id: i,
            x: 10 + Math.random() * 80,
            y: 10 + Math.random() * 80,
            size: Math.random() * 120 + 80,
            rotation: Math.random() * 360,
            delay: Math.random() * 4,
            imageUrl: url,
            opacity: 0.6 + Math.random() * 0.3,
          }));

          setFloatingImages(images);
        }

        // Fetch random murals for recommendations
        const muralsData = await getMurals();
        if (muralsData?.items?.length) {
          const shuffled = [...muralsData.items].sort(() => Math.random() - 0.5);
          setRecommendedMurals(shuffled.slice(0, 3));
        }
      } catch (error) {
        console.error('Error fetching 404 page data:', error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-gray-50 to-white">
      {/* Floating Background Images */}
      <div className="fixed inset-0 pointer-events-none">
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
                  e.target.style.display = 'none';
                }}
              />
            )}
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="text-center max-w-4xl mx-auto bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-lg">
          {/* 404 Header */}
          <div className="mb-8">
            <h1 className="font-handwritten text-8xl md:text-9xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-4">
              404
            </h1>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              Oops! Page not found
            </h2>
            <p className="text-lg text-gray-600 mb-8">
              The page you&apos;re looking for doesn&apos;t exist, but here are some beautiful murals you might enjoy instead.
            </p>
          </div>

          {/* Navigation Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full hover:bg-primary/90 transition-colors"
            >
              <Home size={20} />
              Go Home
            </Link>
            <Link
              href="/murals"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-full hover:bg-gray-700 transition-colors"
            >
              <ArrowLeft size={20} />
              Browse Murals
            </Link>
          </div>

          {/* Recommended Murals */}
          {recommendedMurals.length > 0 && (
            <div>
              
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {recommendedMurals.map((mural) => {
                  const coverPhoto = mural.fields.photos?.[0];
                  const coverImageUrl = coverPhoto?.fields?.file?.url;
                  const fullImageUrl = coverImageUrl?.startsWith('//')
                    ? `https:${coverImageUrl}`
                    : coverImageUrl;

                  return (
                    <Link
                      key={mural.sys.id}
                      href={`/murals/${mural.fields.url}`}
                      className="group block"
                    >
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 group-hover:shadow-xl group-hover:scale-105">
                        {fullImageUrl && (
                          <div className="relative aspect-[4/3] overflow-hidden">
                            <Image
                              src={fullImageUrl}
                              alt={mural.fields.title || 'Mural'}
                              fill
                              className="object-cover transition-all duration-500 group-hover:scale-110"
                            />
                          </div>
                        )}

                        <div className="p-4">
                          <h3 className="font-serif text-xl font-light text-gray-800 group-hover:text-primary transition-colors">
                            {mural.fields.title}
                          </h3>
                        </div>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}