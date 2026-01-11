"use client";

import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Award, Shield, Sparkles, TrendingUp, Users, Truck } from "lucide-react";

export default function About() {
  const [counters, setCounters] = useState({ quality: 0, projects: 0, clients: 0 });
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimated) {
          setHasAnimated(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const animateCounters = () => {
    const duration = 2000;
    const steps = 60;
    const interval = duration / steps;

    let step = 0;
    const timer = setInterval(() => {
      step++;
      setCounters({
        quality: Math.min(100, Math.floor((100 * step) / steps)),
        projects: Math.min(500, Math.floor((500 * step) / steps)),
        clients: Math.min(300, Math.floor((300 * step) / steps))
      });

      if (step >= steps) clearInterval(timer);
    }, interval);
  };

  const features = [
    {
      icon: <Award className="w-12 h-12 text-blue-600" />,
      title: "Premium Quality",
      description: "Only the finest materials for lasting results"
    },
    {
      icon: <Shield className="w-12 h-12 text-blue-600" />,
      title: "Guaranteed Durability",
      description: "Long-lasting protection for all surfaces"
    },
    {
      icon: <Sparkles className="w-12 h-12 text-blue-600" />,
      title: "Expert Formulation",
      description: "Professional-grade coating technology"
    },
    {
      icon: <CheckCircle className="w-12 h-12 text-blue-600" />,
      title: "Trusted by Professionals",
      description: "Chosen by contractors and homeowners alike"
    }
  ];

  return (
    <section id="about" ref={sectionRef} className="py-12 md:py-20 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-blue-200/20 rounded-full filter blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-200/20 rounded-full filter blur-3xl"></div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-16">
          <div className="inline-block mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
              ⭐ Why Choose Us
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Why Choose Supacoat?
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            As Kenya's premier wholesale hardware supplier, we provide exceptional products 
            and service to contractors, builders, and businesses. Your success is our priority.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-6 rounded-xl hover:bg-blue-50 transition"
            >
              <div className="flex justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2 text-gray-900">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="bg-gradient-to-r from-blue-900 to-blue-700 rounded-3xl p-12 text-white text-center">
          <h3 className="text-3xl md:text-4xl font-bold mb-4">
            Ready to Stock Quality Hardware?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Get in touch with us today for wholesale pricing and bulk orders
          </p>6">
          <div className="group relative bg-gradient-to-br from-blue-50 via-blue-100 to-blue-50 p-4 md:p-6 rounded-xl md:rounded-2xl text-center transform hover:scale-110 hover:-rotate-2 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400/0 via-blue-400/30 to-blue-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <CheckCircle className="w-10 h-10 md:w-12 md:h-12 text-blue-600 mx-auto mb-2 transform group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="text-xl md:text-2xl font-bold text-blue-900 mb-1">{counters.quality}%</h3>
            <p className="text-xs md:text-sm text-blue-700 font-semibold">Quality Assured</p>
          </div>
          <div className="group relative bg-gradient-to-br from-green-50 via-green-100 to-green-50 p-4 md:p-6 rounded-xl md:rounded-2xl text-center transform hover:scale-110 hover:rotate-2 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-green-400/0 via-green-400/30 to-green-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <TrendingUp className="w-10 h-10 md:w-12 md:h-12 text-green-600 mx-auto mb-2 transform group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="text-xl md:text-2xl font-bold text-green-900 mb-1">{counters.projects}+</h3>
            <p className="text-xs md:text-sm text-green-700 font-semibold">Projects Done</p>
          </div>
          <div className="group relative bg-gradient-to-br from-purple-50 via-purple-100 to-purple-50 p-4 md:p-6 rounded-xl md:rounded-2xl text-center transform hover:scale-110 hover:-rotate-2 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-purple-400/0 via-purple-400/30 to-purple-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <Users className="w-10 h-10 md:w-12 md:h-12 text-purple-600 mx-auto mb-2 transform group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="text-xl md:text-2xl font-bold text-purple-900 mb-1">{counters.clients}+</h3>
            <p className="text-xs md:text-sm text-purple-700 font-semibold">Happy Clients</p>
          </div>
          <div className="group relative bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 p-4 md:p-6 rounded-xl md:rounded-2xl text-center transform hover:scale-110 hover:rotate-2 transition-all duration-500 shadow-lg hover:shadow-2xl overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-orange-400/0 via-orange-400/30 to-orange-400/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000"></div>
            <Truck className="w-10 h-10 md:w-12 md:h-12 text-orange-600 mx-auto mb-2 transform group-hover:rotate-12 transition-transform duration-500" />
            <h3 className="text-xl md:text-2xl font-bold text-orange-900 mb-1">⚡ Fast</h3>
            <p className="text-xs md:text-sm text-orange-700 font-semibold">Same Day Delivery
          <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <Users className="w-12 h-12 text-purple-500 mx-auto mb-2" />
            <p className="font-bold text-2xl text-gray-900">300+</p>
            <p className="text-sm text-gray-600">Happy Clients</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <Truck className="w-12 h-12 text-orange-500 mx-auto mb-2" />
            <p className="font-bold text-2xl text-gray-900">Fast</p>
            <p className="text-sm text-gray-600">Delivery Service</p>
          </div>
        </div>      </div>
    </section>
  );
}
