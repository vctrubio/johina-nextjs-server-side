'use client';

import { useState, useEffect } from 'react';
import { Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;
      
      // Show footer when user is within 100px of the bottom
      const isAtBottom = scrollTop + windowHeight >= documentHeight - 100;
      setIsVisible(isAtBottom);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <footer className={`fixed bottom-0 left-0 right-0 z-30 bg-white/95 backdrop-blur-sm border-t border-gray-200 px-6 py-6 transition-transform duration-300 ${
      isVisible ? 'translate-y-0' : 'translate-y-full'
    }`}>
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="text-left">
          <h3 className="font-handwritten text-2xl text-primary font-bold">
            Johina G. Concheso
          </h3>
          <p className="text-gray-600 text-sm mt-1">
            Muralist based in Madrid
          </p>
        </div>
        
        <div className="flex items-center space-x-6">
          <a
            href="https://wa.me/34609988138"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Phone size={18} />
            <span className="hidden sm:inline">+34 609 988 138</span>
          </a>
          <a
            href="mailto:johina22@gmail.com"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Mail size={18} />
            <span className="hidden sm:inline">johina22@gmail.com</span>
          </a>
          <a
            href="https://www.instagram.com/johinagconcheso/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-gray-600 hover:text-primary transition-colors"
          >
            <Instagram size={18} />
            <span className="hidden sm:inline">johinagconcheso</span>
          </a>
        </div>
      </div>
    </footer>
  );
}