"use client";

import { useState, useEffect } from "react";
import { MessageCircle, Phone, X } from "lucide-react";

export default function FloatingCTA() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  const whatsappNumber = "0703771771";
  const phoneNumber = "0703771771";

  return (
    <div className="fixed bottom-24 md:bottom-8 right-4 md:right-8 z-40">
      {isExpanded && (
        <div className="mb-3 flex flex-col gap-3 animate-fade-in">
          <a
            href={`https://wa.me/254${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-3 group"
            aria-label="Chat on WhatsApp"
          >
            <MessageCircle size={24} />
            <span className="text-sm font-semibold whitespace-nowrap">WhatsApp</span>
          </a>
          <a
            href={`tel:+254${phoneNumber}`}
            className="bg-blue-500 hover:bg-blue-600 text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110 flex items-center gap-3"
            aria-label="Call us"
          >
            <Phone size={24} />
            <span className="text-sm font-semibold whitespace-nowrap">Call Now</span>
          </a>
        </div>
      )}
      
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`${
          isExpanded ? 'bg-gray-700 hover:bg-gray-800' : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700'
        } text-white p-4 rounded-full shadow-lg transition-all transform hover:scale-110`}
        aria-label={isExpanded ? "Close contact options" : "Open contact options"}
        aria-expanded={isExpanded}
      >
        {isExpanded ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
}
