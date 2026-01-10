"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart } from "lucide-react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);
  const [phase, setPhase] = useState<"logo" | "splash">("logo");

  useEffect(() => {
    // Reset animations on every mount (fresh page load)
    setShow(true);
    setPhase("logo");

    // Logo animation phase: 3 seconds
    const logoTimer = setTimeout(() => {
      setPhase("splash");
    }, 3000);

    // Splash screen phase: 2.5 seconds (text appear + cart animation + fade out)
    const splashTimer = setTimeout(() => {
      setShow(false);
    }, 5500);

    return () => {
      clearTimeout(logoTimer);
      clearTimeout(splashTimer);
    };
  }, []); // Empty dependency array ensures this runs on every component mount

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-gradient-to-br from-blue-600 via-blue-500 to-blue-700 z-[9999] flex items-center justify-center overflow-hidden">
      {phase === "logo" && (
        <div className="relative w-48 h-48 md:w-64 md:h-64">
          <div className="logo-animation">
            <Image
              src="/logo.png"
              alt="Supacoat Logo"
              width={256}
              height={256}
              className="w-full h-full object-contain drop-shadow-2xl"
              priority
            />
          </div>
        </div>
      )}

      {phase === "splash" && (
        <div className="splash-container flex flex-col items-center justify-center">
          <div className="relative">
            <h1 className="text-5xl md:text-7xl font-bold text-white splash-text tracking-wider">
              SUPACOAT
            </h1>
            <div className="cart-animation absolute top-1/2 -translate-y-1/2">
              <ShoppingCart size={48} className="text-yellow-400 md:w-16 md:h-16" strokeWidth={2.5} />
            </div>
          </div>
          <p className="text-white/90 text-lg md:text-xl mt-4 splash-subtitle">
            Premium Coating Solutions
          </p>
        </div>
      )}

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
            opacity: 1;
            transform: translateX(0);
          }
        }

        .splash-container {
          animation: splashFadeIn 0.5s ease-out, splashFadeOut 0.5s ease-in 2s forwards;
        }

        @keyframes splashFadeIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @keyframes splashFadeOut {
          from {
            opacity: 1;
            transform: scale(1);
          }
          to {
            opacity: 0;
            transform: scale(1.1);
          }
        }

        .splash-text {
          animation: textGlow 2s ease-in-out;
          text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                       0 0 40px rgba(255, 255, 255, 0.3);
        }

        @keyframes textGlow {
          0%, 100% {
            text-shadow: 0 0 20px rgba(255, 255, 255, 0.5),
                         0 0 40px rgba(255, 255, 255, 0.3);
          }
          50% {
            text-shadow: 0 0 30px rgba(255, 255, 255, 0.8),
                         0 0 60px rgba(255, 255, 255, 0.5);
          }
        }

        .cart-animation {
          animation: cartSlide 1.5s ease-in-out 0.3s;
          left: -60px;
        }

        @keyframes cartSlide {
          0% {
            left: -60px;
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          50% {
            left: 50%;
            transform: translateX(-50%) translateY(-50%);
          }
          80% {
            opacity: 1;
          }
          100% {
            left: calc(100% + 60px);
            opacity: 0;
          }
        }

        .splash-subtitle {
          animation: subtitleFadeIn 0.8s ease-out 0.5s backwards;
        }

        @keyframes subtitleFadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}
