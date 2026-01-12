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
        return prev + 10;
      });
    }, 150);

    // Hide loading screen after animation
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

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
        <div className="mb-8 animate-bounce">
          <div className="relative w-32 h-32 mx-auto mb-4">
            <Image
              src="/logo.png"
              alt="Supacoat Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Supacoat
          </h1>
          <p className="text-blue-200 text-lg">
            Premium Hardware Solutions
          </p>
        </div>

        {/* Loading bar */}
        <div className="w-64 md:w-80 mx-auto">
          <div className="h-2 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
            <div
              className="h-full bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 rounded-full transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            >
              <div className="h-full w-full bg-white/30 animate-pulse"></div>
            </div>
          </div>
          <p className="text-white/80 mt-3 text-sm font-semibold">
            Loading... {progress}%
          </p>
        </div>

        {/* Loading spinner */}
        <div className="mt-6 flex justify-center gap-2">
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce"></div>
          <div className="w-3 h-3 bg-purple-400 rounded-full animate-bounce delay-100"></div>
          <div className="w-3 h-3 bg-blue-400 rounded-full animate-bounce delay-200"></div>
        </div>
      </div>
    </div>
  );
}
