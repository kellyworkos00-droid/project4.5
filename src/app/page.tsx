import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminFloatingButton from "@/components/AdminFloatingButton";

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <ProductGrid />
      <About />
      <Contact />
      <Footer />
      <AdminFloatingButton />
    </main>
  );
}
