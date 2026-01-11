"use client";

import { Shield } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function AdminFloatingButton() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      href="/admin"
      className="fixed bottom-6 left-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative">
        {/* Tooltip */}
        {isHovered && (
          <div className="absolute bottom-full left-0 mb-2 px-3 py-2 bg-gray-900 text-white text-sm rounded-lg whitespace-nowrap animate-fade-in">
            Admin Panel
            <div className="absolute top-full left-4 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-gray-900"></div>
          </div>
        )}
        
        {/* Floating Button */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white p-4 rounded-full shadow-2xl transition-all duration-300 transform hover:scale-110 hover:rotate-12">
          <Shield size={24} />
        </div>

        {/* Pulse Animation Ring */}
        <div className="absolute inset-0 rounded-full bg-blue-600 opacity-75 animate-ping"></div>
      </div>
    </Link>
  );
}
