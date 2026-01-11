"use client";

import { Menu, X, MessageCircle } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

export default function Hero() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const whatsappNumber = "0703771771";
  const whatsappMessage = encodeURIComponent("Hello! I'm interested in your coating products.");

  return (
    <div className="relative text-white overflow-hidden min-h-screen">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/lady.png"
          alt="Supacoat Products"
          fill
          className="object-cover object-center transform scale-105 hover:scale-110 transition-transform duration-[3000ms]"
          priority
        />
        {/* Gradient overlay for depth and readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/95 via-blue-800/85 to-transparent"></div>
        {/* Animated gradient orbs */}
        <div className="absolute top-20 right-10 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 left-10 w-80 h-80 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Sticky Navigation */}
      <nav className="sticky top-0 bg-blue-900/95 backdrop-blur-md shadow-lg z-50 border-b border-blue-700/50 relative">
        <div className="container mx-auto px-4 py-3 md:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Supacoat Logo"
                width={48}
                height={48}
                className="h-10 md:h-12 w-auto object-contain"
              />
              <span className="text-lg md:text-xl font-bold">SUPACOAT</span>
            </div>
          
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
      <div className="container mx-auto px-4 py-20 md:py-40 relative z-10 flex items-center min-h-[calc(100vh-80px)]">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-4 py-2 mb-6 animate-fade-in">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-sm font-semibold">Trusted by 500+ Businesses</span>
          </div>

          {/* Main Heading with Animation */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-6 leading-tight animate-fade-in-up">
            <span className="block bg-gradient-to-r from-white via-blue-100 to-white bg-clip-text text-transparent">
              Kenya's Leading
            </span>
            <span className="block text-white drop-shadow-2xl mt-2">
              Hardware Supplier
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-xl md:text-2xl lg:text-3xl mb-8 text-blue-50 leading-relaxed font-light animate-fade-in-up delay-200">
            Premium <span className="font-bold text-white">paints</span>, <span className="font-bold text-white">coatings</span> & <span className="font-bold text-white">building materials</span> at unbeatable wholesale prices
          </p>

          {/* Features List */}
          <div className="flex flex-wrap gap-4 mb-10 animate-fade-in-up delay-300">
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-2xl">✓</span>
              <span className="font-semibold">100% Quality Assured</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-2xl">✓</span>
              <span className="font-semibold">Fast Delivery</span>
            </div>
            <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 border border-white/20">
              <span className="text-2xl">✓</span>
              <span className="font-semibold">Wholesale Prices</span>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up delay-400">
            <a
              href="#products"
              className="group relative bg-white text-blue-900 hover:bg-blue-50 px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl text-center overflow-hidden"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Browse Products
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/0 via-blue-600/10 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
            </a>
            <a
              href={`https://wa.me/254${whatsappNumber}?text=${whatsappMessage}`}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-8 md:px-10 py-4 md:py-5 rounded-2xl font-bold text-base md:text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl shadow-green-500/50 flex items-center justify-center gap-3"
            >
              <MessageCircle size={24} className="group-hover:rotate-12 transition-transform" />
              Order on WhatsApp
              <span className="absolute inset-0 rounded-2xl bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity"></span>
            </a>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 flex flex-wrap items-center gap-6 text-sm text-blue-100 animate-fade-in-up delay-500">
            <div className="flex items-center gap-2">
              <span className="text-2xl">⭐</span>
              <span><strong className="text-white">4.9/5</strong> Customer Rating</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">📦</span>
              <span><strong className="text-white">10,000+</strong> Orders Delivered</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-2xl">🚚</span>
              <span><strong className="text-white">Same Day</strong> Dispatch</span>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Wave at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 z-10">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path d="M0 120L60 105C120 90 240 60 360 45C480 30 600 30 720 37.5C840 45 960 60 1080 67.5C1200 75 1320 75 1380 75L1440 75V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" fill="white"/>
        </svg>
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
