"use client";

import { useEffect, useState } from "react";
import { X, Share, Plus, Download } from "lucide-react";

export default function IOSInstallPrompt() {
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    // Check if running on iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // Check if already installed (running in standalone mode)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || 
                        (navigator as any).standalone === true;
    
    // Check if user has dismissed the prompt before
    const hasSeenPrompt = localStorage.getItem('ios-install-prompt-seen');
    
    // Show prompt if on iOS Safari, not installed, and hasn't been dismissed
    if (isIOS && !isStandalone && !hasSeenPrompt) {
      // Show after 3 seconds to not be intrusive
      const timer = setTimeout(() => {
        setShowPrompt(true);
      }, 3000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('ios-install-prompt-seen', 'true');
  };

  const handleRemindLater = () => {
    setShowPrompt(false);
    // Don't set the localStorage flag so it shows again next time
  };

  if (!showPrompt) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={handleRemindLater}
      />
      
      {/* Prompt Card */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] animate-slide-up">
        <div className="bg-white rounded-t-3xl shadow-2xl p-6 mx-auto max-w-lg">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Dismiss"
          >
            <X size={24} />
          </button>

          {/* Logo and Title */}
          <div className="flex items-center gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-3 shadow-lg">
              <img 
                src="/logo.png" 
                alt="Supacoat" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">Install Supacoat</h3>
              <p className="text-sm text-gray-600">Get the full app experience</p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-6 space-y-2">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="bg-green-100 rounded-full p-1.5">
                <Download className="w-4 h-4 text-green-600" />
              </div>
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="bg-blue-100 rounded-full p-1.5">
                <Plus className="w-4 h-4 text-blue-600" />
              </div>
              <span>Faster access from home screen</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <div className="bg-purple-100 rounded-full p-1.5">
                <Share className="w-4 h-4 text-purple-600" />
              </div>
              <span>Native app experience</span>
            </div>
          </div>

          {/* Instructions */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-4 mb-4">
            <p className="text-sm font-semibold text-gray-900 mb-3">
              To install this app:
            </p>
            <ol className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">1</span>
                <span>Tap the <Share className="inline w-4 h-4 mx-1" /> <strong>Share</strong> button below</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">2</span>
                <span>Scroll and tap <strong>"Add to Home Screen"</strong></span>
              </li>
              <li className="flex items-start gap-2">
                <span className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs flex-shrink-0 mt-0.5">3</span>
                <span>Tap <strong>"Add"</strong> to confirm</span>
              </li>
            </ol>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleRemindLater}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition"
            >
              Maybe Later
            </button>
            <button
              onClick={handleDismiss}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition shadow-lg"
            >
              Got It!
            </button>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes slide-up {
          from {
            transform: translateY(100%);
          }
          to {
            transform: translateY(0);
          }
        }
        .animate-slide-up {
          animation: slide-up 0.3s ease-out;
        }
      `}</style>
    </>
  );
}
