"use client";

import { Star, ChevronLeft, ChevronRight, Search, Zap, Home } from "lucide-react";
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

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>(defaultProducts);
  const [currentImageIndex, setCurrentImageIndex] = useState<{ [key: number]: number }>({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [isFilterAnimating, setIsFilterAnimating] = useState(false);

  const categories = ["All", ...Array.from(new Set(products.map(p => p.category)))];
  
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const whatsappNumber = "0703771771";

  const handleCategoryChange = (category: string) => {
    setIsFilterAnimating(true);
    setSelectedCategory(category);
    setTimeout(() => setIsFilterAnimating(false), 300);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("/api/products");
        if (response.ok) {
          const data = await response.json();
          if (data.products && data.products.length > 0) {
            const productsWithMultipleImages = data.products.map((product: Product) => ({
              ...product,
              images: product.images || [product.image]
            }));
            setProducts(productsWithMultipleImages);
            const initialIndices: { [key: number]: number } = {};
            productsWithMultipleImages.forEach((product: Product) => {
              initialIndices[product.id] = 0;
            });
            setCurrentImageIndex(initialIndices);
          }
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const nextImage = (productId: number, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: (prev[productId] + 1) % imagesLength
    }));
  };

  const prevImage = (productId: number, imagesLength: number) => {
    setCurrentImageIndex(prev => ({
      ...prev,
      [productId]: (prev[productId] - 1 + imagesLength) % imagesLength
    }));
  };

  if (loading) {
    return (
      <section id="products" className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Loading products...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header Section */}
      <section className="relative py-16 bg-gradient-to-r from-blue-900 via-purple-900 to-blue-900 text-white overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="flex items-center gap-4 mb-6">
            <Link 
              href="/"
              className="flex items-center gap-2 text-white/80 hover:text-white transition-colors group"
            >
              <Home size={20} />
              <span className="group-hover:translate-x-1 transition-transform">Back to Home</span>
            </Link>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">
            All Products
          </h1>
          <p className="text-xl text-blue-100 text-center max-w-2xl mx-auto">
            Browse our complete catalog of quality hardware and coating products
          </p>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          {/* Search Bar */}
          <div className="mb-8 max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900 shadow-lg"
              />
            </div>
          </div>

          {/* Category Filter */}
          <div className="mb-8 flex flex-wrap gap-3 justify-center">
            {categories.map((category) => {
              const categoryCount = category === "All" 
                ? products.length 
                : products.filter(p => p.category === category).length;
              
              return (
                <button
                  key={category}
                  onClick={() => handleCategoryChange(category)}
                  className={`px-6 py-3 rounded-xl font-bold transition-all transform hover:scale-105 shadow-md flex items-center gap-2 ${
                    selectedCategory === category
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border-2 border-gray-200'
                  }`}
                >
                  {category}
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    selectedCategory === category
                      ? 'bg-white/20'
                      : 'bg-gray-100'
                  }`}>
                    {categoryCount}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Results Count */}
          <div className="mb-6 text-center">
            <p className="text-gray-600 font-medium">
              {filteredProducts.length === 0 ? (
                <span className="text-red-600">No products found</span>
              ) : (
                <>
                  Showing <span className="font-bold text-blue-600">{filteredProducts.length}</span> 
                  {selectedCategory !== "All" && (
                    <> <span className="text-blue-600">{selectedCategory}</span></>
                  )} product{filteredProducts.length !== 1 ? 's' : ''}
                </>
              )}
            </p>
          </div>

          {/* Products Grid */}
          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 transition-opacity duration-300 ${isFilterAnimating ? 'opacity-50' : 'opacity-100'}`}>
            {filteredProducts.map((product, index) => {
              const productImages = product.images || [product.image];
              const currentIndex = currentImageIndex[product.id] || 0;

              return (
                <div
                  key={product.id}
                  className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 animate-fade-in"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={productImages[currentIndex]}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.currentTarget.src = "https://via.placeholder.com/300x200?text=Product+Image";
                      }}
                    />
                    
                    {productImages.length > 1 && (
                      <>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            prevImage(product.id, productImages.length);
                          }}
                          className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition hover:bg-white"
                        >
                          <ChevronLeft size={20} className="text-gray-800" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            nextImage(product.id, productImages.length);
                          }}
                          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition hover:bg-white"
                        >
                          <ChevronRight size={20} className="text-gray-800" />
                        </button>
                        
                        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                          {productImages.map((_, idx) => (
                            <div
                              key={idx}
                              className={`w-2 h-2 rounded-full transition ${
                                idx === currentIndex ? 'bg-white w-6' : 'bg-white/50'
                              }`}
                            />
                          ))}
                        </div>
                      </>
                    )}

                    <div className="absolute top-3 right-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-3 py-1 rounded-full text-sm font-bold shadow-lg">
                      {product.category}
                    </div>
                  </div>

                  <div className="p-6">
                    <div className="flex items-center mb-2">
                      {[...Array(product.rating)].map((_, i) => (
                        <Star
                          key={i}
                          size={16}
                          className="fill-yellow-400 text-yellow-400"
                        />
                      ))}
                      <span className="ml-2 text-sm text-gray-600">
                        ({product.rating}.0)
                      </span>
                    </div>

                    <h3 className="text-xl font-bold mb-2 text-gray-900 group-hover:text-blue-600 transition">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 mb-4 text-sm">
                      {product.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-lg font-bold text-blue-600">
                        {product.price}
                      </span>
                      <Link
                        href={`/product/${product.id}`}
                        className="text-blue-600 hover:text-blue-700 font-semibold text-sm flex items-center gap-1 group/link"
                      >
                        View Details
                        <Zap size={16} className="group-hover/link:translate-x-1 transition-transform" />
                      </Link>
                    </div>

                    <a
                      href={`https://wa.me/254${whatsappNumber}?text=Hi, I'm interested in ${encodeURIComponent(product.name)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-4 w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-3 rounded-xl font-bold transition-all transform hover:scale-105 flex items-center justify-center gap-2 shadow-lg"
                    >
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                      </svg>
                      Order on WhatsApp
                    </a>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredProducts.length === 0 && (
            <div className="text-center py-16">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">No products found</h3>
              <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
              <button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All");
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-xl font-bold hover:shadow-lg transition"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
