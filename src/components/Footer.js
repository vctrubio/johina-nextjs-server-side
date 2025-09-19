import { Phone, Mail, Instagram } from 'lucide-react';

export default function Footer() {

  return (
    <footer className="relative z-30 bg-white border-t border-gray-200 px-6 py-12 shadow-2xl">
      {/* Layer effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-gray-100/50 to-transparent pointer-events-none"></div>
      
      <div className="relative max-w-7xl mx-auto flex justify-between items-center">
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