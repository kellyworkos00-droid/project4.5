"use client";

import { useState, useEffect } from "react";
import { Menu, X, ShoppingCart, Phone, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    const updateCartCount = () => {
      const cart = JSON.parse(localStorage.getItem('cart') || '[]');
      const total = cart.reduce((sum: number, item: { quantity: number }) => sum + item.quantity, 0);
      setCartCount(total);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('storage', updateCartCount);
    updateCartCount();

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('storage', updateCartCount);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;
      window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { name: 'Home', id: '' },
    { name: 'Products', id: 'products' },
    { name: 'All Products', href: '/products' },
    { name: 'About', id: 'about' },
    { name: 'Testimonials', id: 'testimonials' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/95 backdrop-blur-lg shadow-lg py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2 group">
              <Image
                src="/logo.png"
                alt="Supacoat Logo"
                width={40}
                height={40}
                className="transition-transform group-hover:scale-110"
              />
              <span
                className={`text-xl font-bold transition-colors ${
                  isScrolled ? 'text-gray-900' : 'text-white'
                }`}
              >
                Supacoat
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => {
                if (link.href) {
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      className={`font-semibold transition-colors hover:text-blue-600 ${
                        isScrolled ? 'text-gray-700' : 'text-white'
                      }`}
                    >
                      {link.name}
                    </Link>
                  );
                }
                return (
                  <button
                    key={link.id}
                    onClick={() => link.id ? scrollToSection(link.id) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                    className={`font-semibold transition-colors hover:text-blue-600 ${
                      isScrolled ? 'text-gray-700' : 'text-white'
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              {/* WhatsApp Button - Desktop */}
              <a
                href="https://wa.me/254703771771"
                target="_blank"
                rel="noopener noreferrer"
                className="hidden md:flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full font-semibold transition-all transform hover:scale-105 shadow-lg"
              >
                <MessageCircle size={18} />
                <span>WhatsApp</span>
              </a>

              {/* Cart Button */}
              <button
                onClick={() => scrollToSection('cart')}
                className={`relative p-2 rounded-full transition-all ${
                  isScrolled
                    ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                    : 'bg-white/20 text-white hover:bg-white/30'
                }`}
              >
                <ShoppingCart size={24} />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Toggle */}
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className={`lg:hidden p-2 rounded-full transition-all ${
                  isScrolled
                    ? 'bg-gray-100 text-gray-900'
                    : 'bg-white/20 text-white'
                }`}
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 bg-white z-40 lg:hidden transition-transform duration-300 ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ top: '72px' }}
      >
        <div className="flex flex-col p-6 space-y-4">
          {navLinks.map((link) => {
            if (link.href) {
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-left text-xl font-semibold text-gray-900 hover:text-blue-600 transition py-3 border-b border-gray-100"
                >
                  {link.name}
                </Link>
              );
            }
            return (
              <button
                key={link.id}
                onClick={() => link.id ? scrollToSection(link.id) : window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-left text-xl font-semibold text-gray-900 hover:text-blue-600 transition py-3 border-b border-gray-100"
              >
                {link.name}
              </button>
            );
          })}
          <a
            href="https://wa.me/254703771771"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 bg-green-500 hover:bg-green-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg mt-4"
          >
            <MessageCircle size={24} />
            Order on WhatsApp
          </a>
          <a
            href="tel:+254703771771"
            className="flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg"
          >
            <Phone size={24} />
            Call Us Now
          </a>
        </div>
      </div>
    </>
  );
}
