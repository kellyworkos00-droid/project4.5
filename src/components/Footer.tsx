import { MessageCircle } from "lucide-react";

export default function Footer() {
  const whatsappNumber = "0703771771";

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img src="/logo.png" alt="Supacoat Logo" className="h-12 w-auto mb-4" />
            <p className="text-gray-400">
              Your trusted partner for premium coating solutions. Quality products, 
              exceptional service.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="#products" className="hover:text-blue-400 transition">Products</a></li>
              <li><a href="#about" className="hover:text-blue-400 transition">About Us</a></li>
              <li><a href="#contact" className="hover:text-blue-400 transition">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Get Started</h4>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 px-6 py-3 rounded-full font-semibold inline-flex items-center gap-2 transition"
            >
              <MessageCircle size={18} />
              Order on WhatsApp
            </a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Supacoat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
