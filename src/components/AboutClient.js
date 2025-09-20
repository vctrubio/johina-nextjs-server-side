"use client";

import Image from "next/image";
import Link from "next/link";
import { MessageCircle, Instagram } from "lucide-react";
import ImageCarousel from "./ImageCarousel";
import { SITE_CONFIG } from "../lib/constants";

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
              <h2 className="text-2xl sm:text-3xl font-light text-secondary mb-6 px-4">
                Artist, Mother, Visionary
              </h2>

              <div className="px-4 space-y-6 text-xl lg:text-lg text-gray-700 leading-relaxed">
                <p>
                  Johina G. Concheso is a{" "}
                  <span className="text-primary font-medium">
                    renowned international artist
                  </span>{" "}
                  whose vibrant works capture the essence of human emotion and
                  natural beauty. With over two decades of artistic experience,
                  she has developed a distinctive style that bridges
                  contemporary techniques with classical sensibilities.
                </p>

                <p>
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

                <p>
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
        </div>

        {/* Achievements Section */}
        <div className="mt-20 text-center">
          <blockquote className="text-xl sm:text-2xl font-medium text-gray-500 leading-relaxed max-w-5xl mx-auto tracking-wide">
            &ldquo;My artistic journey has taken me from intimate commissions to
            prestigious international projects. I have collaborated with{" "}
            <Link
              href="https://www.unesco.org/en"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary px-2 py-1 rounded transition-all duration-300 hover:bg-green-100"
            >
              UNESCO
            </Link>{" "}
            on heritage restoration initiatives and created bespoke murals for{" "}
            <span className="font-semibold text-secondary">Royal Palaces</span>,{" "}
            <span className="font-semibold text-tertiary">
              prestigious Embassies
            </span>
            , and iconic venues including{" "}
            <span className="font-semibold text-fourth">Madrid Towers</span>,{" "}
            <span className="font-semibold text-fifth">Tanger Continental</span>
            , and{" "}
            <Link
              href="https://hotelmisianatarifa.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-primary px-2 py-1 rounded transition-all duration-300 hover:bg-green-100"
            >
              Hotel Misiana in Tarifa
            </Link>
            . My work has been celebrated in{" "}
            <Link
              href="https://www.architecturaldigest.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-secondary px-2 py-1 rounded transition-all duration-300 hover:bg-purple-100"
            >
              Architectural Digest
            </Link>{" "}
            and{" "}
            <Link
              href="https://www.elledecor.com/es/"
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-fifth px-2 py-1 rounded transition-all duration-300 hover:bg-orange-100"
            >
              Elle Decor
            </Link>
            .&rdquo;
          </blockquote>
        </div>

        {/* Carousel Section - Only show if images available */}
        {hasCarousel && (
          <ImageCarousel images={carouselImages} title="Behind the Scenes" />
        )}
      </div>

      {/* Footer Quote */}
      <div className="bg-gray-100 py-12 px-4 mt-16">
        <div className="max-w-5xl mx-auto text-center">
          <blockquote className="text-lg sm:text-xl font-light text-gray-700 italic leading-relaxed">
            &ldquo;Art is not just what I create&mdash;it&apos;s how I breathe,
            how I see the world, and how I share my heart with others.
            <div className="mt-6 text-right">
              <span className="font-handwritten text-4xl sm:text-5xl text-primary opacity-90">
                ~ Johina
              </span>
              <div className="flex justify-end gap-4 mt-4">
                <a
                  href={`https://wa.me/${SITE_CONFIG.WHATSAPP_NUMBER}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110 hover:rotate-6"
                >
                  <MessageCircle size={24} />
                </a>
                <a
                  href={SITE_CONFIG.INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary transition-all duration-300 hover:scale-110 hover:-rotate-6"
                >
                  <Instagram size={24} />
                </a>
              </div>
            </div>
          </blockquote>
        </div>
      </div>
    </main>
  );
}
