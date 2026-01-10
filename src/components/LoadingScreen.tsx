"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    // Hide loading screen after animation completes (3 cycles × 1s = 3s + 0.5s delay)
    const timer = setTimeout(() => {
      setShow(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-white z-[9999] flex items-center justify-center">
      <div className="relative w-48 h-48 md:w-64 md:h-64">
        <div className="logo-animation">
          <Image
            src="/logo.png"
            alt="Supacoat Logo"
            width={256}
            height={256}
            className="w-full h-full object-contain"
            priority
          />
        </div>
      </div>

      <style jsx>{`
        .logo-animation {
          animation: slideAnimation 3s ease-in-out;
          animation-fill-mode: forwards;
        }

        @keyframes slideAnimation {
          0% {
            opacity: 0;
            transform: translateX(-100vw);
          }
          10% {
            opacity: 1;
            transform: translateX(0);
          }
          23.33% {
            opacity: 1;
            transform: translateX(0);
          }
          33.33% {
            opacity: 0;
            transform: translateX(100vw);
          }
          43.33% {
            opacity: 0;
            transform: translateX(-100vw);
          }
          53.33% {
            opacity: 1;
            transform: translateX(0);
          }
          66.66% {
            opacity: 1;
            transform: translateX(0);
          }
          76.66% {
            opacity: 0;
            transform: translateX(100vw);
          }
          86.66% {
            opacity: 0;
            transform: translateX(-100vw);
          }
          96.66% {
            opacity: 1;
            transform: translateX(0);
          }
          100% {
            opacity: 0;
            transform: translateX(0) scale(1.2);
          }
        }
      `}</style>
    </div>
  );
}
