"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft, Shield, Truck, RotateCcw, CheckCircle, Share2, Heart, ZoomIn, Package, Award, Clock } from "lucide-react";
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
  variants?: {
    sizes?: Array<{ size: string; price: string }>;
    colors?: string[];
  };
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [activeTab, setActiveTab] = useState<'description' | 'features' | 'delivery'>('description');
  const [quantity, setQuantity] = useState(1);
  const [isZoomed, setIsZoomed] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedPrice, setSelectedPrice] = useState<string>('');

  useEffect(() => {
    loadProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  useEffect(() => {
    if (product) {
      loadRelatedProducts();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  const loadProduct = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        const foundProduct = data.find((p: Product) => p.id === Number(params.id));
        setProduct(foundProduct || null);
        
        // Set default selections
        if (foundProduct?.variants?.sizes && foundProduct.variants.sizes.length > 0) {
          setSelectedSize(foundProduct.variants.sizes[0].size);
          setSelectedPrice(foundProduct.variants.sizes[0].price);
        } else {
          setSelectedPrice(foundProduct?.price || '');
        }
        
        if (foundProduct?.variants?.colors && foundProduct.variants.colors.length > 0) {
          setSelectedColor(foundProduct.variants.colors[0]);
        }
      }
    } catch (error) {
      console.error('Failed to load product:', error);
    } finally {
      setLoading(false);
    }
  };

  const getProductImages = (product: Product): string[] => {
    if (product.images && product.images.length > 0) {
      return product.images;
    }
    return product.image ? [product.image] : [];
  };

  const handleOrderClick = (productName: string) => {
    const message = `Hello! I'm interested in ordering: ${productName}`;
    const whatsappUrl = `https://wa.me/254703771771?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const loadRelatedProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        const related = data
          .filter((p: Product) => 
            p.id !== product?.id && 
            p.category === product?.category
          )
          .slice(0, 3);
        setRelatedProducts(related);
      }
    } catch (error) {
      console.error('Failed to load related products:', error);
    }
  };

  const addToCart = () => {
    if (!product) return;
    
    const cart = JSON.parse(localStorage.getItem('cart') || '[]');
    const existingItem = cart.find((item: { id: number }) => item.id === product.id);
    
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      const images = getProductImages(product);
      cart.push({
        id: product.id,
        name: product.name,
        category: product.category,
        image: images[0],
        quantity: quantity
      });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    window.dispatchEvent(new Event('storage'));
    
    // Show animated success message
    const btn = document.activeElement as HTMLElement;
    const originalText = btn?.innerHTML;
    if (btn) {
      btn.innerHTML = '✓ Added to Cart!';
      btn.classList.add('animate-pulse');
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.classList.remove('animate-pulse');
      }, 2000);
    }
  };

  const shareProduct = () => {
    if (navigator.share) {
      navigator.share({
        title: product?.name,
        text: `Check out ${product?.name} on Supacoat`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Link copied to clipboard!');
    }
  };

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    // Could save to localStorage for persistence
  };

  const nextImage = () => {
    if (product) {
      const images = getProductImages(product);
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      const images = getProductImages(product);
      setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-6">The product you're looking for doesn't exist.</p>
          <Link
            href="/#products"
            className="bg-blue-600 text-white px-6 py-3 rounded-full hover:bg-blue-700 transition inline-flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            Back to Products
          </Link>
        </div>
      </div>
    );
  }

  const images = getProductImages(product);

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50 backdrop-blur-lg bg-white/90">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition font-semibold"
          >
            <ArrowLeft size={20} />
            Back to All Products
          </Link>
          <div className="flex gap-2">
            <button
              onClick={toggleFavorite}
              className={`p-2 rounded-full transition-all ${
                isFavorite 
                  ? 'bg-red-100 text-red-600' 
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
              title="Add to favorites"
            >
              <Heart size={20} className={isFavorite ? 'fill-current' : ''} />
            </button>
            <button
              onClick={shareProduct}
              className="p-2 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-200 transition"
              title="Share product"
            >
              <Share2 size={20} />
            </button>
          </div>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-2xl overflow-hidden group bg-gradient-to-br from-gray-100 to-gray-200">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className={`w-full h-full object-cover transition-transform duration-500 ${
                    isZoomed ? 'scale-150 cursor-zoom-out' : 'cursor-zoom-in'
                  }`}
                  onClick={() => setIsZoomed(!isZoomed)}
                />
                
                {/* Zoom hint */}
                {!isZoomed && (
                  <div className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition">
                    <ZoomIn size={20} />
                  </div>
                )}
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-900 p-3 rounded-full opacity-0 group-hover:opacity-100 transition shadow-lg"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm text-gray-900 px-4 py-2 rounded-full text-sm font-semibold shadow-lg">
                      {currentImageIndex + 1} / {images.length}
                    </div>
                  </>
                )}
              </div>

              {/* Thumbnail Gallery */}
              {images.length > 1 && (
                <div className="grid grid-cols-4 md:grid-cols-5 gap-2 md:gap-3">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setCurrentImageIndex(idx)}
                      className={`aspect-square rounded-xl overflow-hidden border-2 transition-all transform ${
                        idx === currentImageIndex
                          ? 'border-blue-600 scale-105 shadow-lg'
                          : 'border-gray-200 hover:border-blue-400 hover:scale-105'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} - Image ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-3 pt-4">
                <div className="flex items-center gap-2 bg-green-50 text-green-700 p-3 rounded-xl">
                  <CheckCircle size={20} />
                  <span className="text-sm font-semibold">100% Authentic</span>
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 p-3 rounded-xl">
                  <Shield size={20} />
                  <span className="text-sm font-semibold">Quality Guaranteed</span>
                </div>
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              <div className="flex items-center gap-3">
                <span className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                  <Package size={16} />
                  {product.category}
                </span>
                <span className="inline-flex items-center gap-1 bg-amber-50 text-amber-700 px-3 py-1.5 rounded-full text-sm font-semibold">
                  <Award size={16} />
                  Best Seller
                </span>
              </div>

              {/* Product Name */}
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                {product.name}
              </h1>

              {/* Rating & Reviews */}
              <div className="flex items-center gap-4 pb-6 border-b border-gray-200">
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className={i < product.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}
                      />
                    ))}
                  </div>
                  <span className="text-gray-900 font-semibold">{product.rating}.0</span>
                </div>
                <span className="text-gray-500">|</span>
                <span className="text-gray-600 text-sm">150+ Reviews</span>
                <span className="text-gray-500">|</span>
                <span className="text-green-600 text-sm font-semibold flex items-center gap-1">
                  <CheckCircle size={16} />
                  In Stock
                </span>
              </div>

              {/* Price */}
              <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-6">
                <p className="text-sm text-gray-600 mb-1">Price</p>
                <div className="flex items-baseline gap-3">
                  <p className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    {selectedPrice || product.price}
                  </p>
                  <span className="text-gray-500 text-sm">+ VAT</span>
                </div>
                <p className="text-sm text-green-600 mt-2 flex items-center gap-1">
                  <Truck size={16} />
                  Free delivery on orders over KSh 5,000
                </p>
              </div>

              {/* Size Selector */}
              {product.variants?.sizes && product.variants.sizes.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Select Size
                  </label>
                  <div className="grid grid-cols-3 gap-3">
                    {product.variants.sizes.map((variant) => (
                      <button
                        key={variant.size}
                        onClick={() => {
                          setSelectedSize(variant.size);
                          setSelectedPrice(variant.price);
                        }}
                        className={`px-4 py-3 rounded-xl border-2 font-semibold transition-all ${
                          selectedSize === variant.size
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-blue-400 text-gray-700'
                        }`}
                      >
                        <div className="text-sm">{variant.size}</div>
                        <div className="text-xs text-gray-600 mt-1">{variant.price}</div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Color Selector */}
              {product.variants?.colors && product.variants.colors.length > 0 && (
                <div>
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Select Color
                  </label>
                  <div className="flex flex-wrap gap-3">
                    {product.variants.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-6 py-3 rounded-xl border-2 font-semibold transition-all ${
                          selectedColor === color
                            ? 'border-blue-600 bg-blue-50 text-blue-600'
                            : 'border-gray-300 hover:border-blue-400 text-gray-700'
                        }`}
                      >
                        {color}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Selector */}
              <div>
                <label className="block text-sm font-semibold text-gray-900 mb-2">
                  Quantity
                </label>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition font-bold text-xl"
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                    className="w-20 h-12 text-center border-2 border-gray-300 rounded-xl font-bold text-xl focus:border-blue-600 focus:outline-none"
                    min="1"
                  />
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-12 h-12 rounded-xl border-2 border-gray-300 hover:border-blue-600 hover:bg-blue-50 transition font-bold text-xl"
                  >
                    +
                  </button>
                  <span className="text-gray-600 text-sm ml-2">
                    {quantity > 10 && '🔥 Bulk order discount available!'}
                  </span>
                </div>
              </div>

              {/* Order Buttons */}
              <div className="space-y-3">
                <button
                  onClick={addToCart}
                  className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleOrderClick(product.name)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-bold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  Order via WhatsApp
                </button>
              </div>

              {/* Quick Info Cards */}
              <div className="grid grid-cols-3 gap-3 pt-4">
                <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <Truck className="w-6 h-6 text-blue-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-900">Fast Delivery</p>
                  <p className="text-xs text-gray-600">Same Day</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <RotateCcw className="w-6 h-6 text-green-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-900">Easy Returns</p>
                  <p className="text-xs text-gray-600">7 Days</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition">
                  <Shield className="w-6 h-6 text-purple-600 mx-auto mb-1" />
                  <p className="text-xs font-semibold text-gray-900">Warranty</p>
                  <p className="text-xs text-gray-600">1 Year</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs Section */}
          <div className="border-t border-gray-200">
            <div className="container mx-auto px-6 md:px-12">
              {/* Tab Headers */}
              <div className="flex gap-8 border-b border-gray-200">
                <button
                  onClick={() => setActiveTab('description')}
                  className={`py-4 px-2 font-semibold transition-all relative ${
                    activeTab === 'description'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Description
                  {activeTab === 'description' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('features')}
                  className={`py-4 px-2 font-semibold transition-all relative ${
                    activeTab === 'features'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Features & Benefits
                  {activeTab === 'features' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab('delivery')}
                  className={`py-4 px-2 font-semibold transition-all relative ${
                    activeTab === 'delivery'
                      ? 'text-blue-600'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  Delivery & Returns
                  {activeTab === 'delivery' && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600"></div>
                  )}
                </button>
              </div>

              {/* Tab Content */}
              <div className="py-8">
                {activeTab === 'description' && (
                  <div className="space-y-4 animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900">Product Description</h3>
                    <p className="text-gray-600 leading-relaxed text-lg">
                      {product.description}
                    </p>
                    <p className="text-gray-600 leading-relaxed">
                      Our {product.name} is specially formulated for professional use, providing exceptional 
                      coverage and durability. Perfect for both interior and exterior applications, this coating 
                      solution delivers a smooth, long-lasting finish that stands up to the toughest conditions.
                    </p>
                  </div>
                )}

                {activeTab === 'features' && (
                  <div className="space-y-6 animate-fade-in">
                    <h3 className="text-2xl font-bold text-gray-900">Key Features & Benefits</h3>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center">
                          <CheckCircle className="w-6 h-6 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Premium Quality</h4>
                          <p className="text-gray-600 text-sm">High-quality coating solution with superior coverage and finish</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center">
                          <Shield className="w-6 h-6 text-green-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Long-Lasting Protection</h4>
                          <p className="text-gray-600 text-sm">Durable formula that protects surfaces for years</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center">
                          <Award className="w-6 h-6 text-purple-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Professional Grade</h4>
                          <p className="text-gray-600 text-sm">Trusted by contractors and professionals across Kenya</p>
                        </div>
                      </div>
                      <div className="flex gap-4">
                        <div className="flex-shrink-0 w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center">
                          <Clock className="w-6 h-6 text-orange-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-1">Quick Application</h4>
                          <p className="text-gray-600 text-sm">Easy to apply with fast drying time for efficiency</p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'delivery' && (
                  <div className="space-y-6 animate-fade-in">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Delivery Information</h3>
                      <div className="space-y-3 text-gray-600">
                        <div className="flex items-start gap-3">
                          <Truck className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">Same Day Delivery</p>
                            <p className="text-sm">Orders placed before 2 PM are delivered the same day within Nairobi</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Package className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">Nationwide Shipping</p>
                            <p className="text-sm">We deliver to all major towns across Kenya (1-3 business days)</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <CheckCircle className="w-5 h-5 text-purple-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">Free Delivery</p>
                            <p className="text-sm">Free shipping on orders over KSh 5,000</p>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="pt-6 border-t border-gray-200">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">Returns Policy</h3>
                      <div className="space-y-3 text-gray-600">
                        <div className="flex items-start gap-3">
                          <RotateCcw className="w-5 h-5 text-blue-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">7-Day Returns</p>
                            <p className="text-sm">Return unopened products within 7 days for a full refund</p>
                          </div>
                        </div>
                        <div className="flex items-start gap-3">
                          <Shield className="w-5 h-5 text-green-600 mt-1 flex-shrink-0" />
                          <div>
                            <p className="font-semibold text-gray-900">Quality Guarantee</p>
                            <p className="text-sm">All products come with our quality guarantee and warranty</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-3 text-gray-900">You May Also Like</h2>
              <p className="text-gray-600">More products from the {product.category} category</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const images = getProductImages(relatedProduct);
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="group bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <div className="relative overflow-hidden aspect-square">
                      <img
                        src={images[0]}
                        alt={relatedProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm text-gray-900 px-3 py-1 rounded-full text-sm font-bold">
                        {relatedProduct.price}
                      </div>
                    </div>
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full font-semibold">
                          {relatedProduct.category}
                        </span>
                        <div className="flex items-center gap-1">
                          <Star size={14} className="fill-yellow-400 text-yellow-400" />
                          <span className="text-xs font-semibold text-gray-600">{relatedProduct.rating}.0</span>
                        </div>
                      </div>
                      <h3 className="font-bold text-xl text-gray-900 mb-2 group-hover:text-blue-600 transition">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {relatedProduct.description}
                      </p>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
