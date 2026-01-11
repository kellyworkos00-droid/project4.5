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
    <section className="py-12 md:py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8 md:mb-16">
          <h2 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            What Our Clients Say
          </h2>
          <p className="text-base md:text-xl text-gray-600">
            Trusted by hundreds of satisfied customers across Kenya
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-4 md:gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
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
