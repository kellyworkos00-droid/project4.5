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

    // Validation
    if (!editingProduct.name.trim()) {
      alert('Please enter a product name');
      return;
    }
    if (!editingProduct.description.trim()) {
      alert('Please enter a product description');
      return;
    }
    if (!editingProduct.category.trim()) {
      alert('Please enter a product category');
      return;
    }
    if (!editingProduct.image && (!editingProduct.images || editingProduct.images.length === 0)) {
      alert('Please upload at least one image');
      return;
    }

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
        alert('Product saved successfully!');
      } else {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save');
      }
    } catch (error) {
      console.error('Failed to save product:', error);
      alert(`Failed to save product: ${error instanceof Error ? error.message : 'Please check your database connection and try again.'}`);
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

  if (!isAuthenticated) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40 border-b border-gray-200">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Supacoat Logo" className="h-12 w-auto" />
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Admin Dashboard
              </h1>
              <p className="text-sm text-gray-600">Manage your products & inventory</p>
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white px-5 py-2.5 rounded-xl transition-all transform hover:scale-105 shadow-lg font-semibold"
          >
            <LogOut size={18} />
            Logout
          </button>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-blue-100 mb-1 font-semibold">Total Products</p>
                <p className="text-4xl font-bold">{products.length}</p>
                <p className="text-sm text-blue-100 mt-2">Active Listings</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <Package className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-green-500 to-green-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-green-100 mb-1 font-semibold">Categories</p>
                <p className="text-4xl font-bold">
                  {new Set(products.map(p => p.category)).size}
                </p>
                <p className="text-sm text-green-100 mt-2">Product Types</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <BarChart3 className="w-12 h-12" />
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-purple-500 to-purple-600 p-6 rounded-2xl shadow-xl text-white transform hover:scale-105 transition-all">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-purple-100 mb-1 font-semibold">Orders</p>
                <p className="text-2xl font-bold">Via WhatsApp</p>
                <p className="text-sm text-purple-100 mt-2">Track Manually</p>
              </div>
              <div className="bg-white/20 p-4 rounded-2xl backdrop-blur-sm">
                <ShoppingCart className="w-12 h-12" />
              </div>
            </div>
          </div>
        </div>

        {/* Products Section */}
        <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
          <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Product Management</h2>
              <p className="text-gray-600 text-sm">Add, edit, or remove products from your store</p>
            </div>
            <button
              onClick={handleAddProduct}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl transition-all transform hover:scale-105 shadow-lg font-semibold"
            >
              <Plus size={20} />
              Add New Product
            </button>
          </div>

          {/* Product List */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr className="border-b border-gray-200">
                  <th className="text-left py-4 px-6 text-gray-700 font-bold">Image</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-bold">Product Info</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-bold">Category</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-bold">Price</th>
                  <th className="text-left py-4 px-6 text-gray-700 font-bold">Rating</th>
                  <th className="text-right py-4 px-6 text-gray-700 font-bold">Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr 
                    key={product.id} 
                    className="border-b border-gray-100 hover:bg-blue-50/50 transition-colors"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <td className="py-4 px-6">
                      <img 
                        src={product.image} 
                        alt={product.name}
                        className="w-20 h-20 object-cover rounded-xl shadow-md border-2 border-gray-200"
                      />
                    </td>
                    <td className="py-4 px-6">
                      <div className="font-bold text-gray-900">{product.name}</div>
                      <div className="text-sm text-gray-500 mt-1 line-clamp-2">{product.description}</div>
                    </td>
                    <td className="py-4 px-6">
                      <span className="bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
                        {product.category}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-semibold text-gray-900">{product.price}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500 font-bold">{product.rating}</span>
                        <span className="text-yellow-500">⭐</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-end gap-2">
                        <button
                          onClick={() => handleEditProduct(product)}
                          className="text-blue-600 hover:bg-blue-100 p-2.5 rounded-xl transition-all transform hover:scale-110"
                          title="Edit Product"
                        >
                          <Edit size={20} />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product.id)}
                          className="text-red-600 hover:bg-red-100 p-2.5 rounded-xl transition-all transform hover:scale-110"
                          title="Delete Product"
                        >
                          <Trash2 size={20} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {products.length === 0 && (
              <div className="text-center py-16">
                <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-semibold mb-2">No products yet</p>
                <p className="text-gray-400 text-sm">Click "Add New Product" to get started</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Product Form Modal */}
      {showForm && editingProduct && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
          <div className="bg-white rounded-3xl p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto shadow-2xl animate-fade-in-up">
            <div className="flex items-center justify-between mb-6 pb-6 border-b border-gray-200">
              <div>
                <h3 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {isEditing ? "Edit Product" : "Add New Product"}
                </h3>
                <p className="text-gray-600 mt-1">Fill in the product details below</p>
              </div>
              <button
                onClick={() => setShowForm(false)}
                className="text-gray-400 hover:text-gray-600 hover:bg-gray-100 p-2 rounded-xl transition"
              >
                <X size={28} />
              </button>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-bold text-sm flex items-center gap-2">
                    <Package size={16} className="text-blue-600" />
                    Product Name *
                  </label>
                  <input
                    type="text"
                    value={editingProduct.name}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900 font-medium"
                    placeholder="e.g., Premium Interior Paint"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className="block text-gray-700 mb-2 font-bold text-sm">Description *</label>
                  <textarea
                    value={editingProduct.description}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900"
                    rows={3}
                    placeholder="Brief description of the product..."
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-bold text-sm">Category *</label>
                  <input
                    type="text"
                    value={editingProduct.category}
                    onChange={(e) => setEditingProduct({ ...editingProduct, category: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900"
                    placeholder="e.g., Interior, Exterior"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-bold text-sm">Price</label>
                  <input
                    type="text"
                    value={editingProduct.price}
                    onChange={(e) => setEditingProduct({ ...editingProduct, price: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900"
                    placeholder="e.g., KSh 2,500 or Contact for Price"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 mb-2 font-bold text-sm">Rating (1-5)</label>
                  <input
                    type="number"
                    min="1"
                    max="5"
                    value={editingProduct.rating}
                    onChange={(e) => setEditingProduct({ ...editingProduct, rating: parseInt(e.target.value) || 5 })}
                    className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900"
                  />
                  <div className="flex mt-2 gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span 
                        key={star}
                        className={`text-2xl ${star <= editingProduct.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-6">
                <label className="block text-gray-700 mb-4 font-bold text-sm">Product Images *</label>
                
                {/* File Upload Option */}
                <div className="mb-4">
                  <label className="block w-full cursor-pointer">
                    <div className="border-2 border-dashed border-blue-300 rounded-2xl p-8 text-center hover:border-blue-500 hover:bg-blue-50/50 transition-all bg-gradient-to-br from-blue-50 to-purple-50">
                      <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                      <div className="text-blue-600">
                        <svg className="mx-auto h-16 w-16 mb-3" stroke="currentColor" fill="none" viewBox="0 0 48 48">
                          <path d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <p className="text-lg font-bold mb-1">Click to upload product images</p>
                        <p className="text-sm text-blue-500">Select one or more images (JPG, PNG, any size)</p>
                      </div>
                    </div>
                  </label>
                </div>

                {/* Image Gallery Preview */}
                {editingProduct.images && editingProduct.images.length > 0 && (
                  <div className="bg-gray-50 rounded-2xl p-4 border-2 border-gray-200">
                    <p className="text-sm text-gray-700 mb-3 font-bold flex items-center gap-2">
                      <span className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                        {editingProduct.images.length}
                      </span>
                      Uploaded Images
                    </p>
                    <div className="grid grid-cols-3 md:grid-cols-4 gap-3">
                      {editingProduct.images.map((img, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={img} 
                            alt={`Product ${index + 1}`}
                            className={`w-full h-28 object-cover rounded-xl border-2 ${
                              editingProduct.image === img 
                                ? 'border-blue-500 ring-2 ring-blue-200' 
                                : 'border-gray-300'
                            } cursor-pointer hover:border-blue-400 transition-all transform hover:scale-105`}
                            onClick={() => handleSetMainImage(img)}
                            onError={(e) => {
                              e.currentTarget.src = "https://via.placeholder.com/300x200?text=Invalid+Image";
                            }}
                          />
                          {editingProduct.image === img && (
                            <div className="absolute top-2 left-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white text-xs px-2 py-1 rounded-full font-bold shadow-lg">
                              MAIN
                            </div>
                          )}
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white p-1.5 rounded-full opacity-0 group-hover:opacity-100 transition-all transform hover:scale-110 shadow-lg"
                          >
                            <X size={14} />
                          </button>
                        </div>
                      ))}
                    </div>
                    <p className="text-xs text-gray-500 mt-3 text-center">
                      💡 Click an image to set as main • Hover and click ✕ to remove
                    </p>
                  </div>
                )}

                {/* OR divider */}
                <div className="flex items-center my-4">
                  <div className="flex-1 border-t border-gray-300"></div>
                  <span className="px-4 text-gray-500 text-sm font-semibold">OR</span>
                  <div className="flex-1 border-t border-gray-300"></div>
                </div>

                {/* URL Input Option */}
                <input
                  type="text"
                  value={editingProduct.image}
                  onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition text-gray-900"
                  placeholder="Or paste image URL here..."
                />
              </div>

              <div className="flex gap-4 pt-6 border-t border-gray-200">
                <button
                  onClick={handleSaveProduct}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <Save size={20} />
                  {isEditing ? 'Update Product' : 'Save Product'}
                </button>
                <button
                  onClick={() => setShowForm(false)}
                  className="px-8 bg-gray-200 hover:bg-gray-300 text-gray-700 font-bold py-4 rounded-xl transition"
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
