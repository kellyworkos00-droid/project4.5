import { CheckCircle, Award, Shield, Sparkles } from "lucide-react";

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
            We provide exceptional coating solutions backed by years of expertise 
            and commitment to quality. Your satisfaction is our priority.
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
            Ready to Transform Your Space?
          </h3>
          <p className="text-xl mb-8 text-blue-100">
            Get in touch with us today for expert advice and premium products
          </p>
          <a
            href="#contact"
            className="bg-white text-blue-900 hover:bg-blue-50 px-8 py-4 rounded-full font-bold text-lg inline-block transition"
          >
            Contact Us Now
          </a>
        </div>
      </div>
    </section>
  );
}
