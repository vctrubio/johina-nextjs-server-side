"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const routes = [
  { name: "About", href: "/about" },
  { name: "Debug", href: "/debug" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="relative z-20 bg-transparent py-8">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <Link href="/" className="block mb-8">
          <h1 className="font-handwritten text-6xl sm:text-8xl md:text-9xl lg:text-[12rem] xl:text-[14rem] font-bold bg-gradient-nature bg-clip-text text-transparent transform transition-all duration-700 hover:scale-105 cursor-pointer leading-none">
            Johina G. Concheso
          </h1>
        </Link>

        <div className="flex justify-center items-center gap-12">
          {routes.map((route) => (
            <Link
              key={route.href}
              href={route.href}
              className={`font-handwritten text-4xl transition-all duration-500 relative ${
                pathname === route.href
                  ? "text-primary scale-110"
                  : "text-gray-500 hover:text-primary hover:scale-105"
              }`}
            >
              {route.name.toLowerCase()}
              {pathname === route.href && (
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-primary rounded-full"></div>
              )}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
