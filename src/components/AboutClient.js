'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Play, Pause, SkipBack, SkipForward } from 'lucide-react';

export default function AboutClient({ carouselImages = [] }) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef(null);

  // Auto-change images every 3 seconds when playing
  useEffect(() => {
    if (carouselImages.length <= 1 || !isPlaying) {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      return;
    }

    intervalRef.current = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
    }, 3000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [carouselImages.length, isPlaying]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % carouselImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + carouselImages.length) % carouselImages.length);
  };

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
                From intimate private residences to{" "}
                <span className="italic text-secondary">
                  royal palaces and embassies
                </span>
                , from grand hotel lobbies to vibrant restaurants, her murals bring 
                spaces to life with{" "}
                <span className="text-primary font-medium">
                  color, creativity, and storytelling
                </span>
                . Each project is a unique collaboration, transforming walls into 
                windows to new worlds.
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

        {/* Achievements Section */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto">
            My artistic journey has taken me from intimate commissions to prestigious international projects. 
            I have collaborated with{" "}
            <a 
              href="https://www.unesco.org/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-primary px-2 py-1 rounded transition-all duration-300 hover:bg-green-100"
            >
              UNESCO
            </a>{" "}
            on heritage restoration initiatives and created bespoke murals for{" "}
            <span className="font-semibold text-secondary">Royal Palaces</span>,{" "}
            <span className="font-semibold text-tertiary">prestigious Embassies</span>, and iconic venues including{" "}
            <span className="font-semibold text-fourth">Madrid Towers</span>,{" "}
            <span className="font-semibold text-fifth">Tanger Continental</span>, and{" "}
            <a 
              href="https://hotelmisianatarifa.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-primary px-2 py-1 rounded transition-all duration-300 hover:bg-green-100"
            >
              Hotel Misiana in Tarifa
            </a>
            . My work has been celebrated in{" "}
            <a 
              href="https://www.architecturaldigest.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-secondary px-2 py-1 rounded transition-all duration-300 hover:bg-purple-100"
            >
              Architectural Digest
            </a>{" "}
            and{" "}
            <a 
              href="https://www.elledecor.com/es/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="font-semibold text-tertiary px-2 py-1 rounded transition-all duration-300 hover:bg-orange-100"
            >
              Elle Decor
            </a>
            .
          </p>
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

      {/* Footer Quote */}
      <div className="bg-gray-100 py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-lg sm:text-xl font-light text-gray-700 italic leading-relaxed">
            &ldquo;Art is not just what I create&mdash;it&apos;s how I
            breathe, how I see the world, and how I share my heart with
            others. Every brushstroke carries a piece of my soul.&rdquo;
          </blockquote>
        </div>
      </div>
    </main>
  );
}