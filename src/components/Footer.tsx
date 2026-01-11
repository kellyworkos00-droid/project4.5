"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";

export default function Footer() {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const whatsappNumber = "0703771771";

  useEffect(() => {
    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
    {/* Back to Top Button */}
    {showBackToTop && (
      <button
        onClick={scrollToTop}
        className="fixed bottom-20 right-4 md:bottom-8 md:right-8 bg-blue-600 hover:bg-blue-700 text-white p-3 md:p-4 rounded-full shadow-lg transition-all transform hover:scale-110 z-40"
        aria-label="Back to top"
      >
        <ArrowUp size={24} />
      </button>
    )}
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/logo.png" alt="Supacoat Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-400">
              Kenya's trusted wholesale hardware supplier. Quality products, 
              competitive prices, exceptional service for contractors and businesses.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#products" className="hover:text-blue-400 transition">Products</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Get Started</h4>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Supacoat. All rights reserved.</p>
        </div>
      </div>
    </footer>
    </>
  );
}
