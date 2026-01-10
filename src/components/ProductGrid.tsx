"use client";

import { ShoppingCart, Star } from "lucide-react";
import { useEffect, useState } from "react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  rating: number;
  category: string;
}

const defaultProducts: Product[] = [
  {
    id: 1,
    name: "Premium Interior Paint",
    description: "Smooth finish for walls and ceilings",
    price: "Contact for Price",
    image: "https://images.unsplash.com/photo-1589939705384-5185137a7f0f?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    category: "Interior"
  },
  {
    id: 2,
    name: "Weather-Guard Exterior",
    description: "All-weather protection coating",
    price: "Contact for Price",
    image: "https://images.unsplash.com/photo-1562259949-e8e7689d7828?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    category: "Exterior"
  },
  {
    id: 3,
    name: "Wood Stain & Varnish",
    description: "Enhance natural wood beauty",
    price: "Contact for Price",
    image: "https://images.unsplash.com/photo-1604076947026-8e9ee7eca26f?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    category: "Wood"
  },
  {
    id: 4,
    name: "Industrial Coating",
    description: "Heavy-duty protection",
    price: "Contact for Price",
    image: "https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    category: "Industrial"
  },
  {
    id: 5,
    name: "Anti-Rust Metal Primer",
    description: "Prevent corrosion effectively",
    price: "Contact for Price",
    image: "https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    category: "Primer"
  },
  {
    id: 6,
    name: "Epoxy Floor Coating",
    description: "Durable floor protection",
    price: "Contact for Price",
    image: "https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=500&auto=format&fit=crop&q=60",
    rating: 5,
    category: "Specialty"
  }
];

export default function ProductGrid() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const whatsappNumber = "1234567890"; // Replace with actual number

  useEffect(() => {
    // Load products from localStorage (managed by admin panel)
    const stored = localStorage.getItem("products");
    if (stored) {
      setProducts(JSON.parse(stored));
    } else {
      // Save default products if none exist
      localStorage.setItem("products", JSON.stringify(defaultProducts));
    }

    // Listen for product updates
    const handleStorageChange = () => {
      const updated = localStorage.getItem("products");
      if (updated) {
        setProducts(JSON.parse(updated));
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const handleOrderClick = (productName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in ordering: ${productName}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  return (
    <section id="products" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
            Our Premium Products
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Browse our extensive range of high-quality coating solutions designed for every application
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                  {product.category}
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-2 text-gray-900">
                  {product.name}
                </h3>
                
                <div className="flex items-center mb-3">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                <p className="text-gray-600 mb-4">
                  {product.description}
                </p>

                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-blue-600">
                    {product.price}
                  </span>
                  <button
                    onClick={() => handleOrderClick(product.name)}
                    className="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-full font-semibold flex items-center gap-2 transition"
                  >
                    <ShoppingCart size={18} />
                    Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
