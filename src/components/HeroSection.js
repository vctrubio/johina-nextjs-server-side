export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center px-4 z-10">
      <div className="text-center max-w-6xl mx-auto bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-lg">
        <h1 className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-8 transform transition-all duration-1000 hover:scale-105">
          Johina G. Concheso
        </h1>
        
        <div className="relative mb-8">
          <p className="text-base sm:text-lg md:text-xl text-gray-700 leading-relaxed font-light tracking-wide max-w-4xl mx-auto">
            International muralist bringing art to the world's most prestigious spaces
          </p>
        </div>

        <div className="relative">
          <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-5xl mx-auto">
            From{" "}
            <a 
              href="https://www.unesco.org/en" 
              target="_blank" 
              rel="noopener noreferrer"
              className="marker-link relative inline-block px-3 py-1 bg-primary/20 text-primary font-semibold rounded-full transform rotate-1 transition-all duration-300 hover:bg-transparent hover:rotate-0 align-baseline"
            >
              UNESCO heritage sites
            </a>{" "}
            to{" "}
            <span className="relative inline-block px-3 py-1 bg-secondary/20 text-secondary font-semibold rounded-full transform -rotate-1 transition-all duration-300 hover:bg-transparent hover:rotate-0">
              Royal Palaces
            </span>{" "}
            and{" "}
            <span className="relative inline-block px-3 py-1 bg-fourth/20 text-fourth font-semibold rounded-full transform rotate-2 transition-all duration-300 hover:bg-transparent hover:rotate-0">
              Saudi Arabian & Swedish Embassies
            </span>
            , featured in{" "}
            <a 
              href="https://www.architecturaldigest.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="marker-link relative inline-block px-3 py-1 bg-secondary/20 text-secondary font-semibold rounded-full transform -rotate-2 transition-all duration-300 hover:bg-transparent hover:rotate-0"
            >
              Architectural Digest
            </a>{" "}
            and{" "}
            <a 
              href="https://www.elledecor.com/es/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="marker-link relative inline-block px-3 py-1 bg-fifth/20 text-fifth font-semibold rounded-full transform rotate-1 transition-all duration-300 hover:bg-transparent hover:rotate-0"
            >
              Elle Decor
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
