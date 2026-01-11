"use client";

import { useState, useEffect } from 'react';
import { ShoppingCart, X, Plus, Minus, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface CartItem {
  id: number;
  name: string;
  category: string;
  image: string;
  quantity: number;
}

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const whatsappNumber = "254703771771";

  useEffect(() => {
    // Load cart from localStorage
    const stored = localStorage.getItem("cart");
    if (stored) {
      setCartItems(JSON.parse(stored));
    }
  }, []);

  useEffect(() => {
    // Save cart to localStorage whenever it changes
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  const updateQuantity = (id: number, change: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + change) }
          : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) return;
    
    const orderDetails = cartItems
      .map(item => `${item.name} - Quantity: ${item.quantity}`)
      .join('\n');
    
    const message = encodeURIComponent(
      `Hi! I would like to order the following:\n\n${orderDetails}\n\nPlease confirm availability and total price. Thank you!`
    );
    
    window.open(`https://wa.me/${whatsappNumber}?text=${message}`, '_blank');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <>
      {/* Floating Cart Button */}
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all z-50 group"
      >
        <ShoppingCart size={24} />
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
            {totalItems}
          </span>
        )}
      </button>

      {/* Cart Sidebar */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black/50 z-50"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className="fixed right-0 top-0 h-full w-full md:w-96 bg-white shadow-2xl z-50 flex flex-col animate-slide-in">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <div className="flex items-center gap-2">
                <ShoppingCart className="text-blue-600" size={24} />
                <h2 className="text-xl font-bold">Shopping Cart</h2>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition"
              >
                <X size={24} />
              </button>
            </div>

            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cartItems.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-gray-500">
                  <ShoppingCart size={64} className="mb-4 opacity-50" />
                  <p className="text-lg">Your cart is empty</p>
                  <p className="text-sm">Add products to get started</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cartItems.map(item => (
                    <div
                      key={item.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <Link href={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-20 h-20 object-cover rounded cursor-pointer hover:opacity-80 transition"
                        />
                      </Link>
                      <div className="flex-1">
                        <Link href={`/product/${item.id}`} onClick={() => setIsOpen(false)}>
                          <h3 className="font-semibold hover:text-blue-600 cursor-pointer">
                            {item.name}
                          </h3>
                        </Link>
                        <p className="text-sm text-gray-600">{item.category}</p>
                        
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                          >
                            <Minus size={16} />
                          </button>
                          <span className="font-semibold">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="p-1 bg-gray-200 hover:bg-gray-300 rounded"
                          >
                            <Plus size={16} />
                          </button>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="ml-auto p-1 text-red-500 hover:bg-red-50 rounded"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Footer */}
            {cartItems.length > 0 && (
              <div className="border-t p-4 space-y-3">
                <div className="flex justify-between text-lg font-bold">
                  <span>Total Items:</span>
                  <span>{totalItems}</span>
                </div>
                <button
                  onClick={handleCheckout}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-semibold flex items-center justify-center gap-2 transition"
                >
                  <ShoppingCart size={20} />
                  Order via WhatsApp
                </button>
                <p className="text-xs text-gray-500 text-center">
                  You'll be redirected to WhatsApp to complete your order
                </p>
              </div>
            )}
          </div>
        </>
      )}
    </>
  );
}
