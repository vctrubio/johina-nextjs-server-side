'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

export default function AboutClient({ carouselImages = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-change images every 3 seconds
  useEffect(() => {
    if (carouselImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [carouselImages.length]);

  // Check if we have carousel images
  const hasCarousel = carouselImages.length > 0;

  return (
    <main className="min-h-screen bg-gray-50 py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="hero-title text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal mb-4 text-primary">
            About Johina
          </h1>
          <div className="w-24 h-0.5 bg-primary mx-auto opacity-60"></div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Profile Image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl shadow-lg">
              <Image
                src="/johina-profile.jpg"
                alt="Johina G. Concheso - Artist Portrait"
                width={600}
                height={700}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-tertiary rounded-full opacity-20 -z-10"></div>
            <div className="absolute -top-4 -left-4 w-16 h-16 bg-fifth rounded-full opacity-30 -z-10"></div>
          </div>

          {/* Text Content */}
          <div className="space-y-6">
            <div className="space-y-4">
              <h2 className="text-2xl sm:text-3xl font-light text-secondary mb-6">
                Artist, Mother, Visionary
              </h2>

              <p className="text-lg text-gray-700 leading-relaxed">
                Johina G. Concheso is a{" "}
                <span className="text-primary font-medium">
                  renowned international artist
                </span>{" "}
                whose vibrant works capture the essence of human emotion and
                natural beauty. With over two decades of artistic experience,
                she has developed a distinctive style that bridges
                contemporary techniques with classical sensibilities.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                As both{" "}
                <span className="italic text-secondary">
                  a dedicated mother
                </span>{" "}
                and{" "}
                <span className="italic text-secondary">
                  a passionate creator
                </span>
                , Johina finds inspiration in the delicate balance between
                family life and artistic expression. Her paintings reflect
                this duality, often exploring themes of nurturing, growth, and
                transformation.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Her work has been exhibited internationally, earning
                recognition for its{" "}
                <span className="text-fourth font-medium">
                  emotional depth
                </span>{" "}
                and technical mastery. Johina&apos;s art invites viewers into
                a world where color and form dance together, creating visual
                poetry that speaks to the soul.
              </p>
            </div>
          </div>
        </div>

        {/* Quote Section */}
        <div className="mt-20 text-center">
          <blockquote className="text-xl sm:text-2xl font-light text-secondary italic max-w-3xl mx-auto leading-relaxed">
            &ldquo;Art is not just what I create&mdash;it&apos;s how I
            breathe, how I see the world, and how I share my heart with
            others. Every brushstroke carries a piece of my soul.&rdquo;
          </blockquote>
          <cite className="block mt-4 text-gray-600 font-medium">
            &mdash; Johina G. Concheso
          </cite>
        </div>

        {/* Carousel Section - Only show if images available */}
        {hasCarousel && (
          <section className="relative py-20">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-4xl font-bold text-center mb-12 bg-gradient-nature bg-clip-text text-transparent">
                Behind the Scenes
              </h2>

              <div className="relative max-w-2xl mx-auto h-[600px]">
                {/* Card Stack */}
                <div className="relative w-full h-full">
                  {carouselImages.map((imageUrl, index) => {
                    const isActive = index === currentImageIndex;
                    const offset = index - currentImageIndex;
                    
                    return (
                      <div
                        key={index}
                        className={`absolute inset-0 rounded-2xl overflow-hidden shadow-2xl transition-all duration-700 ease-out cursor-pointer ${
                          isActive ? 'z-20' : 'z-10'
                        }`}
                        style={{
                          transform: `
                            translateX(${offset * 12}px) 
                            translateY(${offset * 6}px) 
                            scale(${isActive ? 1 : 0.95})
                          `,
                          opacity: Math.abs(offset) > 2 ? 0 : isActive ? 1 : 0.7,
                        }}
                        onClick={() => setCurrentImageIndex(index)}
                      >
                        <Image
                          src={imageUrl}
                          alt={`Gallery image ${index + 1}`}
                          fill
                          className="object-contain"
                          onError={(e) => {
                            console.log('About image failed to load:', imageUrl);
                            e.target.style.display = 'none';
                          }}
                        />
                        
                        {/* Card border effect */}
                        <div className="absolute inset-0 border-4 border-white/20 rounded-2xl pointer-events-none"></div>
                      </div>
                    );
                  })}
                </div>

                {/* Dot Indicators */}
                <div className="absolute bottom-[-3rem] left-1/2 transform -translate-x-1/2 flex space-x-2">
                  {carouselImages.map((_, index) => (
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
          </section>
        )}
      </div>
    </main>
  );
}