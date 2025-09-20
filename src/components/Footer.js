"use client";
import { Phone, Mail, Instagram, MessageCircle } from "lucide-react";
import Link from "next/link";
import { COLORS } from "../lib/colors";

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
          <p className="text-gray-600 text-sm mt-1">Muralist based in Madrid</p>
          <Link
            href="/murals"
            className="inline-block mt-2 text-sm font-medium transition-all duration-300 hover:scale-105"
            style={{ color: COLORS.tertiary }}
          >
            → see my work
          </Link>
        </div>

        <div className="flex items-center space-x-8">
          <a
            href="https://wa.me/34609988138"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-105"
          >
            <div
              className="p-2 rounded-full transition-all duration-300 group-hover:bounce-once"
              style={{
                backgroundColor: "#f5f5f5",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = COLORS.fifth + "40")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            >
              <Phone size={22} />
            </div>
            <span className="text-base font-medium hidden sm:inline transition-colors duration-300">
              609 988 138
            </span>
          </a>
          <a
            href="mailto:johina22@gmail.com"
            className="group flex items-center gap-3 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-105"
          >
            <div
              className="p-2 rounded-full transition-all duration-300 group-hover:bounce-once"
              style={{
                backgroundColor: "#f5f5f5",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = COLORS.fifth + "40")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            >
              <Mail size={22} />
            </div>
            <span className="text-base font-medium hidden sm:inline transition-colors duration-300">
              johina22@gmail.com
            </span>
          </a>
          <a
            href="https://www.instagram.com/johinagconcheso/"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-3 text-gray-600 hover:text-primary transition-all duration-300 hover:scale-105"
          >
            <div
              className="p-2 rounded-full transition-all duration-300 group-hover:bounce-once"
              style={{
                backgroundColor: "#f5f5f5",
              }}
              onMouseEnter={(e) =>
                (e.target.style.backgroundColor = COLORS.fifth + "40")
              }
              onMouseLeave={(e) => (e.target.style.backgroundColor = "#f5f5f5")}
            >
              <Instagram size={22} />
            </div>
            <span className="text-base font-medium hidden sm:inline transition-colors duration-300">
              johinagconcheso
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
}
