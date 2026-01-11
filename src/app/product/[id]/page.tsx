"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Star, ShoppingCart, ChevronLeft, ChevronRight, ArrowLeft } from "lucide-react";
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
}

export default function ProductPage() {
  const params = useParams();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const whatsappNumber = "254703771771";

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
    alert('Added to cart!');
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Link
            href="/#products"
            className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
          >
            <ArrowLeft size={20} />
            Back to All Products
          </Link>
        </div>
      </header>

      {/* Product Details */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 p-6 md:p-12">
            {/* Image Gallery */}
            <div className="space-y-4">
              <div className="relative aspect-square rounded-xl overflow-hidden group bg-gray-100">
                <img
                  src={images[currentImageIndex]}
                  alt={product.name}
                  className="w-full h-full object-cover"
                />
                
                {/* Image Navigation */}
                {images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronLeft size={24} />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full opacity-0 group-hover:opacity-100 transition"
                    >
                      <ChevronRight size={24} />
                    </button>
                    
                    {/* Image Counter */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 text-white px-4 py-2 rounded-full text-sm">
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
                      className={`aspect-square rounded-lg overflow-hidden border-2 transition ${
                        idx === currentImageIndex
                          ? 'border-blue-600 scale-105'
                          : 'border-gray-200 hover:border-blue-400'
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
            </div>

            {/* Product Info */}
            <div className="space-y-6">
              {/* Category Badge */}
              <span className="inline-block bg-blue-100 text-blue-600 px-4 py-2 rounded-full text-sm font-semibold">
                {product.category}
              </span>

              {/* Product Name */}
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                {product.name}
              </h1>

              {/* Rating */}
              <div className="flex items-center gap-2">
                <div className="flex items-center">
                  {[...Array(product.rating)].map((_, i) => (
                    <Star
                      key={i}
                      size={24}
                      className="fill-yellow-400 text-yellow-400"
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.rating}.0)</span>
              </div>

              {/* Price */}
              <div className="border-t border-b border-gray-200 py-6">
                <p className="text-sm text-gray-600 mb-2">Price</p>
                <p className="text-4xl font-bold text-blue-600">{product.price}</p>
              </div>

              {/* Description */}
              <div>
                <h2 className="text-xl font-bold text-gray-900 mb-3">Description</h2>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {product.description}
                </p>
              </div>

              {/* Order Buttons */}
              <div className="space-y-3">
                <button
                  onClick={addToCart}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                >
                  <ShoppingCart size={24} />
                  Add to Cart
                </button>
                <button
                  onClick={() => handleOrderClick(product.name)}
                  className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white py-4 px-6 rounded-xl font-semibold text-lg transition-all transform hover:scale-105 shadow-lg hover:shadow-xl"
                >
                  Order via WhatsApp
                </button>
              </div>

              {/* Features */}
              <div className="bg-gray-50 rounded-xl p-6 space-y-3">
                <h3 className="font-bold text-gray-900">Product Features</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>High-quality coating solution</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Professional-grade durability</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Easy application process</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-500 mt-1">✓</span>
                    <span>Long-lasting protection</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Related Products</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProducts.map((relatedProduct) => {
                const images = getProductImages(relatedProduct);
                return (
                  <Link
                    key={relatedProduct.id}
                    href={`/product/${relatedProduct.id}`}
                    className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
                  >
                    <img
                      src={images[0]}
                      alt={relatedProduct.name}
                      className="w-full h-64 object-cover"
                    />
                    <div className="p-6">
                      <h3 className="font-bold text-xl text-gray-800 mb-2">
                        {relatedProduct.name}
                      </h3>
                      <p className="text-blue-600 font-semibold">
                        {relatedProduct.category}
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
