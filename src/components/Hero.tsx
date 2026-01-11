"use client";

import { ShoppingCart, Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappNumber = "0703771771";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your coating products.");

  return (
    <div className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-slate-900 text-white overflow-hidden">
      {/* Sticky Navigation */}
      <nav className=\"sticky top-0 bg-blue-900/95 backdrop-blur-md shadow-lg z-50 border-b border-blue-700/50\">
      <div className=\"container mx-auto px-4 py-3 md:py-4\">
        <div className=\"flex items-center justify-between\">\n          <div className=\"flex items-center gap-2\">\n            <Image\n              src=\"/logo.png\"\n              alt=\"Supacoat Logo\"\n              width={48}\n              height={48}\n              className=\"h-10 md:h-12 w-auto object-contain\"\n            />\n            <span className=\"text-lg md:text-xl font-bold\">SUPACOAT</span>\n          </div>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 lg:space-x-8">
            <a href="#products" className="hover:text-blue-300 transition font-medium">Products</a>
            <a href="#about" className="hover:text-blue-300 transition font-medium">About</a>
            <a href="#contact" className="hover:text-blue-300 transition font-medium">Contact</a>
            <a
              href={`https://wa.me/254${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-4 lg:px-6 py-2 rounded-full font-semibold flex items-center gap-2 transition text-sm transform hover:scale-105"
            >
              <MessageCircle size={18} />
              Order Now
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-blue-800/50 rounded-lg transition"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3 border-t border-blue-700/30 pt-4">
            <a href="#products" className="block hover:text-blue-300 transition text-base font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Products</a>
            <a href="#about" className="block hover:text-blue-300 transition text-base font-medium py-2" onClick={() => setMobileMenuOpen(false)}>About</a>
            <a href="#contact" className="block hover:text-blue-300 transition text-base font-medium py-2" onClick={() => setMobileMenuOpen(false)}>Contact</a>
            <a
              href={`https://wa.me/254${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-4 py-2 rounded-full font-semibold inline-flex items-center justify-center gap-2 transition"
              onClick={() => setMobileMenuOpen(false)}
            >
              <MessageCircle size={18} />
              Order Now
            </a>
          </div>
        )}
        </div>
      </nav>

      {/* Hero Content */}
      <div className="container mx-auto px-4 py-16 md:py-32">
        <div className="max-w-4xl">
          <h1 className="text-4xl md:text-7xl font-bold mb-4 md:mb-6 leading-tight animate-fade-in">
            Kenya's Leading Wholesale Hardware Supplier
          </h1>
          <p className="text-lg md:text-2xl mb-6 md:mb-8 text-blue-100 leading-relaxed">
            Premium quality paints, coatings, and building materials at competitive wholesale prices. Serving contractors and businesses nationwide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#products"
              className="bg-white text-blue-600 hover:bg-blue-50 px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition transform hover:scale-105 shadow-xl text-center"
            >
              Browse Products
            </a>
            <a
              href={`https://wa.me/254${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-6 md:px-8 py-3 md:py-4 rounded-full font-bold text-base md:text-lg transition transform hover:scale-105 shadow-xl flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Contact Us
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
            Your trusted partner for quality hardware, paints, coatings, and building materials. 
            Serving contractors, builders, and businesses across Kenya with competitive wholesale prices.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
            <a
              href="#products"
              className="bg-white text-blue-900 hover:bg-blue-50 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg transition text-center"
            >
              Browse Products
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 md:px-8 md:py-4 rounded-full font-bold text-sm md:text-lg transition flex items-center justify-center gap-2"
            >
              <ShoppingCart size={18} className="md:w-[22px] md:h-[22px]" />
              WhatsApp Order
            </a>
          </div>
        </div>
      </div>

      {/* Decorative Wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
          />
        </svg>
      </div>
    </div>
  );
}
