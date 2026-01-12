import Hero from "@/components/Hero";
import ProductGrid from "@/components/ProductGrid";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import AdminFloatingButton from "@/components/AdminFloatingButton";
import Cart from "@/components/Cart";
import Navbar from "@/components/Navbar";
import PageLoadingScreen from "@/components/PageLoadingScreen";

export default function Home() {
  return (
    <>
      <PageLoadingScreen />
      <Navbar />
      <main className="min-h-screen">
        <Hero />
        <ProductGrid limit={6} />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
        <AdminFloatingButton />
        <Cart />
      </main>
    </>
  );
}
