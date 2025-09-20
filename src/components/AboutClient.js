"use client";

import Image from "next/image";
import ImageCarousel from "./ImageCarousel";

export default function AboutClient({ carouselImages = [] }) {
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
                she has developed a distinctive style that bridges contemporary
                techniques with classical sensibilities.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                From intimate private residences to{" "}
                <span className="italic text-secondary">
                  royal palaces and embassies
                </span>
                , from grand hotel lobbies to vibrant restaurants, her murals
                bring spaces to life with{" "}
                <span className="text-primary font-medium">
                  color, creativity, and storytelling
                </span>
                . Each project is a unique collaboration, transforming walls
                into windows to new worlds.
              </p>

              <p className="text-lg text-gray-700 leading-relaxed">
                Her work has been exhibited internationally, earning recognition
                for its{" "}
                <span className="text-fourth font-medium">emotional depth</span>{" "}
                and technical mastery. Johina&apos;s art invites viewers into a
                world where color and form dance together, creating visual
                poetry that speaks to the soul.
              </p>
            </div>
          </div>
        </div>

        {/* Achievements Section */}
        <div className="mt-20 text-center">
          <p className="text-lg text-gray-700 leading-relaxed max-w-5xl mx-auto">
            My artistic journey has taken me from intimate commissions to
            prestigious international projects. I have collaborated with{" "}
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
            <span className="font-semibold text-tertiary">
              prestigious Embassies
            </span>
            , and iconic venues including{" "}
            <span className="font-semibold text-fourth">Madrid Towers</span>,{" "}
            <span className="font-semibold text-fifth">Tanger Continental</span>
            , and{" "}
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
              className="font-semibold text-fifth px-2 py-1 rounded transition-all duration-300 hover:bg-orange-100"
            >
              Elle Decor
            </a>
            .
          </p>
        </div>

        {/* Carousel Section - Only show if images available */}
        {hasCarousel && (
          <ImageCarousel images={carouselImages} title="Behind the Scenes" />
        )}
      </div>

      {/* Footer Quote */}
      <div className="bg-gray-100 py-12 px-4 mt-16">
        <div className="max-w-4xl mx-auto text-center">
          <blockquote className="text-lg sm:text-xl font-light text-gray-700 italic leading-relaxed">
            &ldquo;Art is not just what I create&mdash;it&apos;s how I breathe,
            how I see the world, and how I share my heart with others. Every
            brushstroke carries a piece of my soul.&rdquo;
          </blockquote>
        </div>
      </div>
    </main>
  );
}
