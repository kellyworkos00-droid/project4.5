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

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          <a
            href={`https://wa.me/${whatsappNumber}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group"
          >
            <div className="bg-green-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition">
              <MessageCircle className="w-6 h-6 md:w-8 md:h-8 text-green-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">WhatsApp</h3>
            <p className="text-gray-600">Chat with us instantly</p>
          </a>

          <a
            href={`tel:${whatsappNumber}`}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group"
          >
            <div className="bg-blue-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition">
              <Phone className="w-6 h-6 md:w-8 md:h-8 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600">{phoneNumber}</p>
          </a>

          <a
            href={`mailto:${email}`}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group"
          >
            <div className="bg-purple-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500 transition">
              <Mail className="w-6 h-6 md:w-8 md:h-8 text-purple-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-600">{email}</p>
          </a>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group">
            <div className="bg-red-100 w-12 h-12 md:w-16 md:h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition">
              <MapPin className="w-6 h-6 md:w-8 md:h-8 text-red-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Location</h3>
            <p className="text-gray-600">Kenya</p>
          </div>
        </div>
      </div>
    </section>
  );
}
