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
            <div className="bg-green-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-green-500 transition">
              <MessageCircle className="w-8 h-8 text-green-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">WhatsApp</h3>
            <p className="text-gray-600">Chat with us instantly</p>
          </a>

          <a
            href={`tel:${whatsappNumber}`}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group"
          >
            <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-blue-500 transition">
              <Phone className="w-8 h-8 text-blue-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Phone</h3>
            <p className="text-gray-600">{phoneNumber}</p>
          </a>

          <a
            href={`mailto:${email}`}
            className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group"
          >
            <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-purple-500 transition">
              <Mail className="w-8 h-8 text-purple-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Email</h3>
            <p className="text-gray-600">{email}</p>
          </a>

          <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all transform hover:-translate-y-2 text-center group">
            <div className="bg-red-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-red-500 transition">
              <MapPin className="w-8 h-8 text-red-600 group-hover:text-white" />
            </div>
            <h3 className="text-xl font-bold mb-2 text-gray-900">Location</h3>
            <p className="text-gray-600">Kenya</p>
          </div>
        </div>

        <div className="mt-16 max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-lg">
          <h3 className="text-2xl font-bold mb-6 text-center text-gray-900">
            Quick Contact Form
          </h3>
          <form className="space-y-4">
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Name</label>
              <input
                type="text"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Your name"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Phone</label>
              <input
                type="tel"
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Your phone number"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-2 font-semibold">Message</label>
              <textarea
                rows={4}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                placeholder="Tell us about your project"
              ></textarea>
            </div>
            <button
              type="button"
              onClick={() => {
                const message = encodeURIComponent("I would like to inquire about your products");
                window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
              }}
              className="w-full bg-green-500 hover:bg-green-600 text-white font-bold py-4 rounded-lg transition flex items-center justify-center gap-2"
            >
              <MessageCircle size={20} />
              Send via WhatsApp
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
