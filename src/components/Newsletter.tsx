"use client";

import { useState } from 'react';
import { Mail, Send } from 'lucide-react';

export default function Newsletter() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }

    // Save to localStorage (in production, you'd send to an API)
    const subscribers = JSON.parse(localStorage.getItem('newsletter') || '[]');
    subscribers.push({ email, date: new Date().toISOString() });
    localStorage.setItem('newsletter', JSON.stringify(subscribers));

    setStatus('success');
    setEmail('');
    
    setTimeout(() => setStatus('idle'), 3000);
  };

  return (
    <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-8 md:py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center text-white">
          <Mail className="w-10 h-10 md:w-12 md:h-12 mx-auto mb-3 md:mb-4" />
          <h3 className="text-2xl md:text-3xl font-bold mb-2">Stay Updated!</h3>
          <p className="mb-4 md:mb-6 text-sm md:text-base opacity-90">
            Subscribe to our newsletter for exclusive deals, new products, and hardware tips
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-2 md:gap-3 max-w-md mx-auto">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 md:py-3 rounded-lg text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-white"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-2 md:py-3 rounded-lg font-semibold hover:bg-gray-100 transition flex items-center justify-center gap-2"
            >
              <Send size={18} />
              Subscribe
            </button>
          </form>

          {status === 'success' && (
            <p className="mt-3 md:mt-4 text-sm md:text-base text-green-200 font-semibold">
              ✓ Thank you for subscribing!
            </p>
          )}
          {status === 'error' && (
            <p className="mt-3 md:mt-4 text-sm md:text-base text-red-200 font-semibold">
              Please enter a valid email address
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
