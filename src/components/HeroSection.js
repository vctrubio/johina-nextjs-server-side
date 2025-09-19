export default function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center px-4 z-10">
      <div className="text-center max-w-5xl mx-auto bg-white/90 backdrop-blur-sm p-12 rounded-2xl shadow-lg">
        <h1 className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-6 transform transition-all duration-1000 hover:scale-105">
          Johina G. Concheso
        </h1>
        <div className="relative">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
            A painter,{" "}
            <span className="italic relative inline-block px-3 py-1 bg-tertiary/80 text-gray-800 rounded-full transform -rotate-1 transition-all duration-300 hover:bg-transparent hover:rotate-0">
              a mother
            </span>{" "}
            and recognized international{" "}
            <span className="italic relative inline-block px-3 py-1 bg-fifth/80 text-gray-800 rounded-full transform rotate-1 transition-all duration-300 hover:bg-transparent hover:rotate-0">
              artist
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
