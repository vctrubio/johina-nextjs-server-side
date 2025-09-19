'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === '/';

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              {!isHome && (
                <Link href="/" className="hero-title text-2xl font-normal text-primary hover:text-secondary transition-colors">
                  Johina G. Concheso
                </Link>
              )}
            </div>
          </div>
          
          <div className="flex items-center space-x-8">
            <Link 
              href="/about" 
              className="text-gray-700 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
            >
              About
            </Link>
            <Link 
              href="/debug" 
              className="text-gray-700 hover:text-secondary px-3 py-2 rounded-md text-sm font-medium transition-colors bg-gray-100 rounded-full"
            >
              Debug
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
