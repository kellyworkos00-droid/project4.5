"use client";

import { Shield, Award, Zap, TrendingUp } from "lucide-react";

export default function SocialProofBadges() {
  const badges = [
    {
      icon: <Shield className="w-6 h-6 text-blue-600" />,
      title: "Certified Quality",
      subtitle: "ISO Compliant"
    },
    {
      icon: <Award className="w-6 h-6 text-purple-600" />,
      title: "500+ Projects",
      subtitle: "Delivered Successfully"
    },
    {
      icon: <Zap className="w-6 h-6 text-yellow-600" />,
      title: "24/7 Support",
      subtitle: "Always Available"
    },
    {
      icon: <TrendingUp className="w-6 h-6 text-green-600" />,
      title: "5-Star Rated",
      subtitle: "Customer Approved"
    }
  ];

  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-blue-50 py-8 border-y border-gray-200">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {badges.map((badge, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className="bg-white rounded-full p-3 mb-2 shadow-lg group-hover:shadow-xl transition-shadow">
                {badge.icon}
              </div>
              <h3 className="font-bold text-gray-900 text-sm md:text-base">{badge.title}</h3>
              <p className="text-xs md:text-sm text-gray-600">{badge.subtitle}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
