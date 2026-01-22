"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function PageLoadingScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Simulate loading progress
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + Math.random() * 15;
      });
    }, 120);

    // Hide loading screen after animation
    const timer = setTimeout(() => {
      setProgress(100);
      setTimeout(() => setIsLoading(false), 400);
    }, 1800);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, []);

  if (!isLoading) return null;

  return (
    <div className="fixed inset-0 z-[9999] bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 flex items-center justify-center">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 text-center">
        {/* Logo with animation */}
        <div className="mb-8">
          <div className="relative inline-block animate-fade-in">
            {/* Glow effect */}
            <div className="absolute inset-0 bg-white/20 rounded-full blur-2xl animate-pulse"></div>
            {/* Logo container */}
            <div className="relative bg-white rounded-3xl p-6 shadow-2xl transform hover:scale-105 transition-transform">
              <div className="relative w-24 h-24 md:w-28 md:h-28">
                <Image
                  src="/logo.png"
                  alt="Supacoat Logo"
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </div>
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-white mb-2 mt-6 tracking-tight animate-fade-in-up">
            SUPACOAT
          </h1>
          <p className="text-blue-100 text-lg md:text-xl font-light animate-fade-in-up delay-200">
            Wholesale Hardware Supplier
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 md:w-80 mx-auto animate-fade-in-up delay-300">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-white via-blue-200 to-white rounded-full transition-all duration-300 ease-out"
              style={{ 
                width: `${Math.min(progress, 100)}%`,
                boxShadow: '0 0 20px rgba(255, 255, 255, 0.6)'
              }}
            >
              <div className="h-full w-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <p className="text-white/90 mt-3 text-sm font-semibold">
            {Math.min(Math.floor(progress), 100)}%
          </p>
        </div>

        {/* Loading spinner */}
        <div className="mt-6 flex justify-center gap-2 animate-fade-in-up delay-400">
          <div className="w-2 h-2 bg-white rounded-full animate-bounce"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-100"></div>
          <div className="w-2 h-2 bg-white rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
