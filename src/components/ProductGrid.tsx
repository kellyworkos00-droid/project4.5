"use client";

import { Star, ChevronLeft, ChevronRight, Search, Zap } from "lucide-react";
import { useEffect, useState } from "react";
import Link from "next/link";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  images?: string[];
  rating: number;
  category: string;
  created_at?: string;
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

export default function ProductGrid({ limit }: { limit?: number } = {}) {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  let filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  // Apply limit if specified
  if (limit) {
    filteredProducts = filteredProducts.slice(0, limit);
  }
  
  const whatsappNumber = "0703771771";

  const handleCategoryChange = (category: string) => {
    setIsFilterAnimating(true);
    setSelectedCategory(category);
    setTimeout(() => setIsFilterAnimating(false), 300);
  };

  useEffect(() => {
    loadProducts();
    
    // Refresh products every 5 seconds to catch updates
    const interval = setInterval(loadProducts, 5000);
    return () => clearInterval(interval);
  }, []);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        if (data && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      // Fallback to localStorage if API fails
      const stored = localStorage.getItem("products");
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOrderClick = (productName: string) => {
    const message = encodeURIComponent(`Hi! I'm interested in ordering: ${productName}`);
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const addToCart = (product: Product, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: { id: number }) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      const images = getProductImages(product);
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        image: images[0],
        quantity: 1
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    // Visual feedback
    const button = e.currentTarget as HTMLButtonElement;
    button.textContent = '✓ Added!';
    setTimeout(() => {
      button.textContent = 'Add to Cart';
    }, 1500);
  };

  const nextImage = (productId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) + 1) % totalImages
    }));
  };

  const prevImage = (productId: number, totalImages: number, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: ((prev[productId] || 0) - 1 + totalImages) % totalImages
    }));
  };

  const getProductImages = (product: Product): string[] => {
    return product.images && product.images.length > 0 ? product.images : [product.image];
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

        {/* Category Filter Chips */}
        <div className="mb-8 flex justify-center">
          <div className="inline-flex flex-wrap gap-3 bg-white rounded-2xl p-2 shadow-lg">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => handleCategoryChange(category)}
                className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 transform ${
                  selectedCategory === category
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg scale-105'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105'
                }`}
              >
                {category}
                {selectedCategory === category && (
                  <span className="ml-2 inline-flex items-center justify-center w-6 h-6 bg-white text-blue-600 rounded-full text-xs font-bold">
                    {filteredProducts.length}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8 flex flex-col md:flex-row gap-4 max-w-4xl mx-auto">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-full border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-800"
            />
          </div>
        </div>

        {/* Results count */}
        {!loading && (
          <p className="text-center text-gray-600 mb-6">
            Showing {filteredProducts.length} of {products.length} products
            {selectedCategory !== "All" && (
              <span className="ml-2 text-blue-600 font-semibold">
                in {selectedCategory}
              </span>
            )}
          </p>
        )}

        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8">
            {[1, 2, 3, 4, 5, 6].map((n) => (
              <div key={n} className="bg-white rounded-lg md:rounded-2xl shadow-md overflow-hidden animate-pulse">
                <div className="h-32 md:h-64 bg-gray-300"></div>
                <div className="p-2 md:p-6 space-y-2 md:space-y-4">
                  <div className="h-4 md:h-6 bg-gray-300 rounded w-3/4"></div>
                  <div className="h-3 md:h-4 bg-gray-300 rounded w-1/2"></div>
                  <div className="h-8 md:h-10 bg-gray-300 rounded"></div>
                </div>
              </div>
            ))}
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-2xl text-gray-600 mb-4">No products found</p>
            <p className="text-gray-500">Try adjusting your search or filters</p>
          </div>
        ) : (
        <div className={`grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 md:gap-8 transition-all duration-300 ${
          isFilterAnimating ? 'opacity-0 scale-95' : 'opacity-100 scale-100'
        }`}>
          {filteredProducts.map((product, index) => {
            const images = getProductImages(product);
            const currentIndex = currentImageIndex[product.id] || 0;
            
            return (
              <div
                key={product.id}
                className="group relative bg-white rounded-lg md:rounded-2xl shadow-md md:shadow-lg overflow-hidden hover:shadow-2xl md:hover:shadow-[0_20px_50px_rgba(8,_112,_184,_0.3)] transition-all duration-500 transform hover:-translate-y-2 md:hover:-translate-y-3 hover:scale-[1.02] animate-fade-in"
                style={{ 
                  perspective: '1000px',
                  animationDelay: `${index * 50}ms`
                }}
              >
                {/* Shine effect on hover */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000 pointer-events-none z-10"></div>
              <Link href={`/product/${product.id}`}>
              <div className="relative h-32 md:h-64 overflow-hidden cursor-pointer">
                <img
                  src={images[currentIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                {/* Gradient overlay on hover */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                
                {/* Animated category badge */}
                <div className="absolute top-1 right-1 md:top-4 md:right-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-1.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-sm font-semibold shadow-lg animate-bounce-slow">
                  {product.category}
                </div>
                
                {/* New badge */}
                <div className="absolute top-1 left-1 md:top-4 md:left-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white px-1.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-sm font-bold shadow-lg flex items-center gap-1">
                  <Zap className="w-3 h-3 md:w-4 md:h-4 fill-white" />
                  HOT
                </div>
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={(e) => prevImage(product.id, images.length, e)}
                      className="absolute left-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronLeft size={16} className="md:w-6 md:h-6" />
                    </button>
                    <button
                      onClick={(e) => nextImage(product.id, images.length, e)}
                      className="absolute right-1 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronRight size={16} className="md:w-6 md:h-6" />
                    </button>
                    
                    {/* Image dots indicator */}
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex gap-1">
                      {images.map((_, idx) => (
                        <div
                          key={idx}
                          className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition ${
                            idx === currentIndex ? 'bg-white' : 'bg-white/50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>
              </Link>
              
              <div className="p-2 md:p-6">
                <Link href={`/product/${product.id}`}>
                <h3 className="text-xs md:text-2xl font-bold mb-1 md:mb-2 text-gray-900 line-clamp-2 hover:text-blue-600 transition cursor-pointer">
                  {product.name}
                </h3>
                </Link>
                
                <div className="flex items-center mb-1 md:mb-3">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star key={i} size={10} className="fill-yellow-400 text-yellow-400 md:w-[18px] md:h-[18px]" />
                  ))}
                </div>

                <p className="text-[10px] md:text-base text-gray-600 mb-2 md:mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex gap-2">
                  <button
                    onClick={(e) => addToCart(product, e)}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-1.5 md:py-3 px-2 md:px-4 rounded-lg md:rounded-xl font-semibold text-xs md:text-base transition-all shadow-md hover:shadow-lg"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      handleOrderClick(product.name);
                    }}
                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-1.5 md:py-3 px-2 md:px-4 rounded-lg md:rounded-xl font-semibold text-xs md:text-base transition-all shadow-md hover:shadow-lg"
                  >
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
          );
        })}
        
        {/* See More Button */}
        {limit && products.length > limit && (
          <div className="mt-12 text-center">
            <Link 
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-xl hover:shadow-2xl"
            >
              <span>See All Products</span>
              <ChevronRight size={24} />
            </Link>
            <p className="mt-4 text-gray-600">
              Showing {limit} of {products.length} products
            </p>
          </div>
        )}
        </div>
        )}
      </div>
    </section>
  );
}
