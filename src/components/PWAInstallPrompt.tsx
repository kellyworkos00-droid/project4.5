"use client";

import { useEffect, useState } from "react";
import { X, Download, Smartphone } from "lucide-react";

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>;
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>;
}

export default function PWAInstallPrompt() {
  const [deferredPrompt, setDeferredPrompt] = useState<BeforeInstallPromptEvent | null>(null);
  const [showPrompt, setShowPrompt] = useState(false);

  useEffect(() => {
    const handler = (e: Event) => {
      e.preventDefault();
      const promptEvent = e as BeforeInstallPromptEvent;
      setDeferredPrompt(promptEvent);
      
      // Check if user hasn't dismissed before
      const hasSeenPrompt = localStorage.getItem('pwa-install-prompt-dismissed');
      if (!hasSeenPrompt) {
        // Show after 5 seconds
        setTimeout(() => {
          setShowPrompt(true);
        }, 5000);
      }
    };

    window.addEventListener('beforeinstallprompt', handler);

    return () => {
      window.removeEventListener('beforeinstallprompt', handler);
    };
  }, []);

  const handleInstall = async () => {
    if (!deferredPrompt) return;

    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    
    if (outcome === 'accepted' && process.env.NODE_ENV === 'development') {
      console.log('User accepted the install prompt');
    }
    
    setDeferredPrompt(null);
    setShowPrompt(false);
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    localStorage.setItem('pwa-install-prompt-dismissed', 'true');
  };

  const handleLater = () => {
    setShowPrompt(false);
  };

  if (!showPrompt || !deferredPrompt) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] animate-fade-in"
        onClick={handleLater}
      />
      
      {/* Prompt Card */}
      <div className="fixed bottom-0 left-0 right-0 z-[70] animate-slide-up md:bottom-8 md:left-auto md:right-8 md:max-w-md">
        <div className="bg-white rounded-t-3xl md:rounded-3xl shadow-2xl p-6 relative">
          {/* Close button */}
          <button
            onClick={handleDismiss}
            className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
            aria-label="Dismiss permanently"
          >
            <X size={20} />
          </button>

          {/* Icon and Title */}
          <div className="flex items-start gap-4 mb-4">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl p-3 shadow-lg flex-shrink-0">
              <img 
                src="/logo.png" 
                alt="Supacoat" 
                className="w-12 h-12 object-contain"
              />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-bold text-gray-900 mb-1">
                Install Supacoat App
              </h3>
              <p className="text-sm text-gray-600">
                Get faster access and work offline
              </p>
            </div>
          </div>

          {/* Benefits */}
          <div className="mb-5 space-y-2 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4">
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Smartphone className="w-4 h-4 text-blue-600 flex-shrink-0" />
              <span>Native app experience</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <Download className="w-4 h-4 text-green-600 flex-shrink-0" />
              <span>Works offline</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-700">
              <svg className="w-4 h-4 text-purple-600 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              <span>Quick access from home screen</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              onClick={handleLater}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-gray-700 bg-gray-100 hover:bg-gray-200 transition text-sm"
            >
              Later
            </button>
            <button
              onClick={handleInstall}
              className="flex-1 py-3 px-4 rounded-xl font-semibold text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition shadow-lg flex items-center justify-center gap-2 text-sm"
            >
              <Download size={18} />
              Install
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
