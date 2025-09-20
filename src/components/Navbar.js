"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ROUTE_COLORS } from "../lib/colors";

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  const getNavLinkStyle = (route) => {
    // Check if current route starts with the nav route (for nested routes like /murals/abc)
    const isActive = pathname === route || pathname.startsWith(route + '/');
    const activeColor = ROUTE_COLORS[route];

    if (isActive && activeColor) {
      return {
        color: activeColor,
        borderBottomWidth: "2px",
        borderBottomStyle: "solid",
        borderBottomColor: activeColor,
      };
    }

    return {};
  };

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {!isHome && (
                <Link
                  href="/"
                  className="hero-title text-2xl font-normal text-primary hover:bg-primary hover:text-white hover:border-primary hover:scale-105 transition-all duration-300 px-3 py-1 rounded-lg border-2 border-transparent"
                >
                  Johina G. Concheso
                </Link>
              )}
            </div>
          </div>

          <div className="flex items-center space-x-2 sm:space-x-6 md:space-x-10">
            <Link
              href="/murals"
              className="text-gray-700 hover:opacity-80 px-2 sm:px-3 md:px-4 py-3 text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 hover:scale-105"
              style={getNavLinkStyle("/murals")}
            >
              Murals
            </Link>
            <Link
              href="/about"
              className="text-gray-700 hover:opacity-80 px-2 sm:px-3 md:px-4 py-3 text-base sm:text-lg font-semibold tracking-wide transition-all duration-200 hover:scale-105"
              style={getNavLinkStyle("/about")}
            >
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
