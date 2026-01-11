import { CheckCircle, Award, Shield, Sparkles, TrendingUp, Users, Truck } from "lucide-react";

export default function About() {
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
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
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
          </p>
          <a
            href="#contact"
            className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg inline-block transition"
          >
            Contact Us Now
          </a>
        </div>
        {/* Trust Badges */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
          <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-2" />
            <p className="font-bold text-2xl text-gray-900">100%</p>
            <p className="text-sm text-gray-600">Quality Guaranteed</p>
          </div>
          <div className="text-center p-4 bg-white/50 rounded-xl backdrop-blur-sm">
            <TrendingUp className="w-12 h-12 text-blue-500 mx-auto mb-2" />
            <p className="font-bold text-2xl text-gray-900">500+</p>
            <p className="text-sm text-gray-600">Projects Completed</p>
          </div>
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
