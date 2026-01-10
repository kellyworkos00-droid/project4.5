"use client";

import { useState, useEffect } from "react";
import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminFloatingButton from "@/components/AdminFloatingButton";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loading after animation completes
    const timer = setTimeout(() => {
      setLoading(false);
    }, 3500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {loading && <LoadingScreen />}
      <main className={`min-h-screen ${loading ? 'overflow-hidden' : ''}`}>
        <Hero />
        <ProductGrid />
        <About />
        <Contact />
        <Footer />
        <AdminFloatingButton />
      </main>
    </>
  );
}
