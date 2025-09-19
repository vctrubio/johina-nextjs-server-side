import Image from "next/image";
import Navbar from "../../components/Navbar";

export default function AboutPage() {
  return (
    <>
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

              {/* Highlights */}
              <div className="pt-6 border-t border-gray-200">
                <h3 className="text-xl font-medium text-secondary mb-4">
                  Artistic Journey
                </h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-primary rounded-full mr-3"></div>
                    International exhibitions and recognition
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-secondary rounded-full mr-3"></div>
                    Over 20 years of artistic dedication
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-fourth rounded-full mr-3"></div>
                    Distinctive contemporary style
                  </li>
                  <li className="flex items-center">
                    <div className="w-2 h-2 bg-fifth rounded-full mr-3"></div>
                    Themes of family, nature, and transformation
                  </li>
                </ul>
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
        </div>
      </main>
    </>
  );
}
