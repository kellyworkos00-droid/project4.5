"use client";

import { Star } from 'lucide-react';

const testimonials = [
  {
    id: 1,
    name: "John Kamau",
    role: "Construction Manager",
    image: "https://ui-avatars.com/api/?name=John+Kamau&background=3b82f6&color=fff",
    text: "Excellent quality products and fast delivery! Supacoat has been our trusted supplier for over 2 years. Highly recommend for any hardware needs.",
    rating: 5
  },
  {
    id: 2,
    name: "Mary Wanjiku",
    role: "Interior Designer",
    image: "https://ui-avatars.com/api/?name=Mary+Wanjiku&background=ec4899&color=fff",
    text: "The paint quality is outstanding and the customer service is exceptional. They always have what I need in stock. Best hardware supplier in Kenya!",
    rating: 5
  },
  {
    id: 3,
    name: "David Omondi",
    role: "Contractor",
    image: "https://ui-avatars.com/api/?name=David+Omondi&background=10b981&color=fff",
    text: "Reliable, affordable, and professional. Supacoat Investment Ltd has never disappointed. Their WhatsApp ordering system makes everything so convenient.",
    rating: 5
  }
];

export default function Testimonials() {
  return (
    <section className="py-12 md:py-20 bg-gradient-to-br from-blue-900 via-purple-900 to-blue-900 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-20 left-10 w-64 h-64 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-80 h-80 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              💬 Testimonials
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-white drop-shadow-lg">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-xl text-blue-100">
            Trusted by hundreds of satisfied customers across Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={testimonial.id}
              className="group relative bg-white/10 backdrop-blur-lg border border-white/20 p-6 md:p-8 rounded-2xl hover:bg-white/15 transition-all duration-500 transform hover:-translate-y-3 hover:scale-105 shadow-xl hover:shadow-2xl"
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              {/* Shine effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 rounded-2xl"></div>
              {/* Stars */}
              <div className="flex gap-1 mb-3 md:mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="fill-yellow-400 text-yellow-400 md:w-5 md:h-5"
                  />
                ))}
              </div>

              {/* Text */}
              <p className="text-sm md:text-gray-700 mb-4 md:mb-6 italic leading-relaxed">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 md:gap-4">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-10 h-10 md:w-12 md:h-12 rounded-full"
                />
                <div>
                  <h4 className="font-semibold text-sm md:text-base">{testimonial.name}</h4>
                  <p className="text-xs md:text-sm text-gray-600">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
