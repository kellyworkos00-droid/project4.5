"use client";

import { useEffect, useState } from "react";
import { MessageCircle, ArrowUp } from "lucide-react";
import Newsletter from './Newsletter';

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
    <Newsletter />
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
    <footer className="relative bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 text-white py-16 overflow-hidden">
      {/* Animated Background Orbs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-20 -left-20 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-20 -right-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand Section */}
          <div className="md:col-span-2">
            <img src="/logo.png" alt="Supacoat Logo" className="h-14 w-auto mb-6 drop-shadow-lg" />
            <p className="text-gray-300 text-lg leading-relaxed mb-6">
              Kenya's trusted wholesale hardware supplier. Quality products, 
              competitive prices, exceptional service for contractors and businesses.
            </p>
            <div className="flex gap-4">
              <a
                href={`https://wa.me/254${whatsappNumber}`}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 px-6 py-3 rounded-xl font-bold inline-flex items-center gap-2 transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle size={20} />
                WhatsApp Us
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Quick Links</h4>
            <ul className="space-y-3">
              <li>
                <a href="#products" className="text-gray-300 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Products
                </a>
              </li>
              <li>
                <a href="#about" className="text-gray-300 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  About Us
                </a>
              </li>
              <li>
                <a href="#contact" className="text-gray-300 hover:text-blue-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Contact
                </a>
              </li>
              <li>
                <a href="/admin" className="text-gray-300 hover:text-purple-400 transition-colors inline-flex items-center gap-2 group">
                  <span className="w-2 h-2 bg-purple-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></span>
                  Admin
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-xl font-bold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Contact</h4>
            <ul className="space-y-3 text-gray-300">
              <li className="flex items-start gap-3">
                <MessageCircle size={20} className="text-green-400 mt-1 flex-shrink-0" />
                <span>+254 {whatsappNumber}</span>
              </li>
              <li className="flex items-start gap-3">
                <svg className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="break-all">supacoatinvestmentltd@gmail.com</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8 mt-8">
          <div className="flex flex-col md:flex-row justify-center items-center gap-2">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} Supacoat Investment Ltd. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
    </>
  );
}
