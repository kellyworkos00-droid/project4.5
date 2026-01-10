"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { 
  LogOut, 
  Package, 
  Plus, 
  Edit, 
  Trash2, 
  Save,
  X,
  BarChart3,
  ShoppingCart
} from "lucide-react";

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
  images?: string[]; // Multiple images support
  rating: number;
  category: string;
}

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const auth = localStorage.getItem("adminAuth");
    if (auth !== "true") {
      router.push("/admin");
    } else {
      setIsAuthenticated(true);
      loadProducts();
    }
  }, [router]);

  const loadProducts = async () => {
    try {
      const response = await fetch('/api/products');
      if (response.ok) {
        const data = await response.json();
        setProducts(data);
      }
    } catch (error) {
      console.error('Failed to load products:', error);
      // Fallback to localStorage for backward compatibility
      const stored = localStorage.getItem("products");
      if (stored) {
        setProducts(JSON.parse(stored));
      }
    }
  };
      // Initial products
      const initialProducts: Product[] = [
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
      setProducts(initialProducts);
      localStorage.setItem("products", JSON.stringify(initialProducts));
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("adminAuth");
    router.push("/admin");
  };

  const handleAddProduct = () => {
    setEditingProduct({
      id: Date.now(),
      name: "",
      description: "",
      price: "Contact for Price",
      image: "",
      rating: 5,
      category: ""
    });
    setShowForm(true);
    setIsEditing(false);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct({ ...product });
    setShowForm(true);
    setIsEditing(true);
  };

  const handleSaveProduct = async () => {
    if (!editingProduct) return;

    try {
      const method = isEditing ? 'PUT' : 'POST';
      const response = await fetch('/api/products', {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(editingProduct),
      });

      if (response.ok) {
        await loadProducts();
        setShowForm(false);
        setEditingProduct(null);
      } else {
        throw new Error('Failed to save');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert('Failed to save product. Please try again.');
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm("Are you sure you want to delete this product?")) return;

    try {
      const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        await loadProducts();
      } else {
        throw new Error('Failed to delete');
      }
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && editingProduct) {
      const fileArray = Array.from(files);
      
      // Process all selected images
      const imagePromises = fileArray.map(file => {
        return new Promise<string>((resolve) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            resolve(reader.result as string);
          };
          reader.readAsDataURL(file);
        });
      });

      Promise.all(imagePromises).then(imageResults => {
        const currentImages = editingProduct.images || [];
        const allImages = [...currentImages, ...imageResults];
        
        // Set first image as main image if not set
        const mainImage = editingProduct.image || allImages[0];
        
        setEditingProduct({ 
          ...editingProduct, 
          image: mainImage,
          images: allImages 
        });
      });
    }
  };

  const handleRemoveImage = (index: number) => {
    if (!editingProduct || !editingProduct.images) return;
    
    const newImages = editingProduct.images.filter((_, i) => i !== index);
    const mainImage = newImages.length > 0 ? newImages[0] : "";
    
    setEditingProduct({
      ...editingProduct,
      image: mainImage,
      images: newImages
    });
  };

  const handleSetMainImage = (imageUrl: string) => {
    if (!editingProduct) return;
    setEditingProduct({
      ...editingProduct,
      image: imageUrl
    });
  };

  const handleDeleteProduct = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      const updatedProducts = products.filter(p => p.id !== id);
      setProducts(updatedProducts);
      localStorage.setItem("products", JSON.stringify(updatedProducts));
    }
  };

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Supacoat Logo" className="h-10 w-auto" />
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1">Total Products</p>
                <p className="text-3xl font-bold text-blue-600">{products.length}</p>
              </div>
              <Package className="w-12 h-12 text-blue-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1">Categories</p>
                <p className="text-3xl font-bold text-green-600">
                  {new Set(products.map(p => p.category)).size}
                </p>
              </div>
              <BarChart3 className="w-12 h-12 text-green-600 opacity-20" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 mb-1">Orders (WhatsApp)</p>
                <p className="text-3xl font-bold text-purple-600">Track Manually</p>
              </div>
              <ShoppingCart className="w-12 h-12 text-purple-600 opacity-20" />
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Manage Products</h2>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
            >
              <Plus size={18} />
              Add Product
            </button>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 px-4">Image</th>
                  <th className="text-left py-3 px-4">Name</th>
                  <th className="text-left py-3 px-4">Category</th>
                  <th className="text-left py-3 px-4">Price</th>
                  <th className="text-left py-3 px-4">Rating</th>
                  <th className="text-right py-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold">{product.name}</div>
                      <div className="text-sm text-gray-500">{product.description}</div>
                    </td>
                    <td className="py-3 px-4">
                      <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-3 px-4">{product.price}</td>
                    <td className="py-3 px-4">{product.rating} ⭐</td>
                    <td className="py-3 px-4">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:bg-blue-50 p-2 rounded-lg transition"
                        >
                          <Edit size={18} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:bg-red-50 p-2 rounded-lg transition"
                        >
                          <Trash2 size={18} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && editingProduct && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-bold">
                {isEditing ? "Edit Product" : "Add New Product"}
              </h3>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={24} />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Product Name</label>
                <input
                  type="text"
                  value={editingProduct.name}
                  onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="e.g., Premium Interior Paint"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Description</label>
                <textarea
                  value={editingProduct.description}
                  onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  rows={3}
                  placeholder="Brief description"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Category</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="e.g., Interior"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-semibold">Price</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                    placeholder="e.g., $99 or Contact for Price"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Product Images</label>
                
                {/* File Upload Option */}
                <div className="mb-3">
                  <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="text-gray-600">
                        <svg className="mx-auto h-12 w-12 text-gray-400 mb-2" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-sm font-semibold">Click to upload multiple images</p>
                        <p className="text-xs text-gray-500 mt-1">Select one or more images (any size)</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Image Gallery Preview */}
                {editingProduct.images && editingProduct.images.length > 0 && (
                  <div className="mt-4">
                    <p className="text-sm text-gray-700 mb-2 font-semibold">
                      Uploaded Images ({editingProduct.images.length})
                    </p>
                    <div className="grid grid-cols-3 gap-3">
                      {editingProduct.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img} 
                            alt={`Product ${index + 1}`}
                            className={`w-full h-32 object-cover rounded-lg border-2 ${
                              editingProduct.image === img 
                                ? 'border-blue-500' 
                                : 'border-gray-200'
                            } cursor-pointer hover:border-blue-400 transition`}
                            onClick={() => handleSetMainImage(img)}
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/300x200?text=Invalid+Image";
                            }}
                          />
                          {editingProduct.image === img && (
                            <div className="absolute top-1 left-1 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                              Main
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full opacity-0 group-hover:opacity-100 transition"
                          >
                            <X size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-2">
                      Click an image to set as main image. Hover and click X to remove.
                    </p>
                  </div>
                )}

                {/* OR divider */}
                <div className="flex items-center my-3">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-3 text-gray-500 text-sm">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* URL Input Option */}
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                  placeholder="Or paste image URL"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2 font-semibold">Rating (1-5)</label>
                <input
                  type="number"
                  min="1"
                  max="5"
                  value={editingProduct.rating}
                  onChange={(e) => setEditingProduct({ ...editingProduct, rating: parseInt(e.target.value) || 5 })}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition"
                />
              </div>

              <div className="flex gap-4 pt-4">
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center gap-2"
                >
                  <Save size={18} />
                  Save Product
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-3 rounded-lg transition"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
