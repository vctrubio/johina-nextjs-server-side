export default function HeroSection() {
  return (
    <section className="relative flex items-center justify-center px-4 border-b border-gray-300 z-10">
      <div className="text-center max-w-5xl mx-auto">
        <h1 className="font-handwritten text-5xl sm:text-7xl md:text-8xl lg:text-9xl font-bold bg-gradient-nature bg-clip-text text-transparent mb-6 transform transition-all duration-1000 hover:scale-105">
          Johina G. Concheso
        </h1>
        <div className="relative">
          <p className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-700 leading-relaxed font-light tracking-wide max-w-2xl mx-auto">
            A painter,{" "}
            <span className="italic underline decoration-1 underline-offset-2">
              a mother
            </span>{" "}
            and recognized international{" "}
            <span className="italic underline decoration-1 underline-offset-2">
              artist
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
