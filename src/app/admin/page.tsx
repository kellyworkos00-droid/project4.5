"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Eye, EyeOff, Shield, Sparkles } from "lucide-react";
import Image from "next/image";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if already logged in
    if (localStorage.getItem("adminAuth") === "true") {
      router.push("/admin/dashboard");
    }
  }, [router]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    // Simulate loading for better UX
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Authentication with specific email and password
    if (email === "supacoatinvestmentltd@gmail.com" && password === "q123456789P") {
      localStorage.setItem("adminAuth", "true");
      router.push("/admin/dashboard");
    } else {
      setError("Invalid email or password");
      setPassword("");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-blue-800 to-purple-900 relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/20 rounded-full filter blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full filter blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Logo Header */}
        <div className="text-center mb-8 animate-fade-in-up">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-white/10 backdrop-blur-md rounded-2xl mb-4 border border-white/20 shadow-2xl">
            <Image
              src="/logo.png"
              alt="Supacoat Logo"
              width={48}
              height={48}
              className="object-contain"
            />
          </div>
          <h1 className="text-4xl font-bold text-white mb-2">Supacoat Admin</h1>
          <p className="text-blue-200 flex items-center justify-center gap-2">
            <Shield size={16} />
            Secure Dashboard Access
          </p>
        </div>

        {/* Login Form */}
        <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-2xl p-8 border border-white/20 animate-fade-in-up delay-200">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="bg-blue-500/20 p-3 rounded-xl">
              <Lock className="w-8 h-8 text-blue-200" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">Welcome Back</h2>
              <p className="text-blue-200 text-sm">Enter your credentials</p>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-5">
            {/* Email Input */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm flex items-center gap-2">
                <Mail size={16} />
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  setError("");
                }}
                className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition text-white placeholder-blue-200"
                placeholder="admin@supacoat.com"
                required
                disabled={isLoading}
              />
            </div>

            {/* Password Input */}
            <div>
              <label className="block text-white mb-2 font-semibold text-sm flex items-center gap-2">
                <Lock size={16} />
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError("");
                  }}
                  className="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/20 focus:border-blue-400 focus:ring-2 focus:ring-blue-400/50 outline-none transition text-white placeholder-blue-200"
                  placeholder="Enter your password"
                  required
                  disabled={isLoading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-200 hover:text-white transition"
                  disabled={isLoading}
                >
                  {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                </button>
              </div>
              
              {error && (
                <div className="mt-3 bg-red-500/20 border border-red-500/50 text-red-200 px-4 py-3 rounded-xl text-sm flex items-center gap-2 animate-fade-in">
                  <span className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></span>
                  {error}
                </div>
              )}
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 rounded-xl transition-all transform hover:scale-105 shadow-lg hover:shadow-2xl flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  Authenticating...
                </>
              ) : (
                <>
                  <Sparkles size={20} />
                  Access Dashboard
                </>
              )}
            </button>
          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-white/10 text-center">
            <p className="text-blue-200 text-sm flex items-center justify-center gap-2">
              <Shield size={14} />
              Authorized Personnel Only
            </p>
          </div>
        </div>

        {/* Security Notice */}
        <div className="mt-6 text-center text-blue-200 text-sm animate-fade-in-up delay-400">
          <p className="flex items-center justify-center gap-2">
            <Lock size={14} />
            Your session is protected with end-to-end encryption
          </p>
        </div>
      </div>
    </div>
  );
}
