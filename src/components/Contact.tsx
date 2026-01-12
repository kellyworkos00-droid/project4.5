"use client";

import { MessageCircle, Phone, Mail, MapPin } from "lucide-react";

export default function Contact() {
  const whatsappNumber = "0703771771";
  const phoneNumber = "0703771771";
  const email = "supacoatinvestmentltd@gmail.com";

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Get In Touch
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Have questions? Want to place an order? We're here to help!
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-8 max-w-6xl mx-auto">
          <a
            href={`https://wa.me/254${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-green-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 text-center group border-2 border-transparent hover:border-green-500"
          >
            <div className="bg-green-500 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <MessageCircle className="w-6 h-6 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-gray-900 group-hover:text-green-600 transition">WhatsApp</h3>
            <p className="text-gray-600 text-xs md:text-sm hidden md:block">Chat with us instantly</p>
            <p className="text-xs text-green-600 font-semibold mt-1 md:mt-2">Fast Response</p>
          </a>

          <a
            href={`tel:+254${phoneNumber}`}
            className="bg-gradient-to-br from-blue-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 text-center group border-2 border-transparent hover:border-blue-500"
          >
            <div className="bg-blue-500 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Phone className="w-6 h-6 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-gray-900 group-hover:text-blue-600 transition">Phone</h3>
            <p className="text-gray-600 text-xs md:text-sm font-semibold">{phoneNumber}</p>
            <p className="text-xs text-blue-600 font-semibold mt-1 md:mt-2">Call Anytime</p>
          </a>

          <a
            href={`mailto:${email}`}
            className="bg-gradient-to-br from-purple-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 text-center group border-2 border-transparent hover:border-purple-500"
          >
            <div className="bg-purple-500 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <Mail className="w-6 h-6 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-gray-900 group-hover:text-purple-600 transition">Email</h3>
            <p className="text-gray-600 text-[10px] md:text-xs break-all">{email}</p>
            <p className="text-xs text-purple-600 font-semibold mt-1 md:mt-2">24/7 Support</p>
          </a>

          <div className="bg-gradient-to-br from-red-50 to-white p-4 md:p-8 rounded-xl md:rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 hover:scale-105 text-center group border-2 border-transparent hover:border-red-500">
            <div className="bg-red-500 w-12 h-12 md:w-20 md:h-20 rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform shadow-lg">
              <MapPin className="w-6 h-6 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-sm md:text-xl font-bold mb-1 md:mb-2 text-gray-900 group-hover:text-red-600 transition">Location</h3>
            <p className="text-gray-600 text-xs md:text-sm font-semibold">Kenya</p>
            <p className="text-xs text-red-600 font-semibold mt-1 md:mt-2">Nationwide</p>
          </div>
        </div>
      </div>
    </section>
  );
}
