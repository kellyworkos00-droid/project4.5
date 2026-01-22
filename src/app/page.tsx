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
import SocialProofBadges from "@/components/SocialProofBadges";
import FloatingCTA from "@/components/FloatingCTA";
import IOSInstallPrompt from "@/components/IOSInstallPrompt";
import PWAInstallPrompt from "@/components/PWAInstallPrompt";

export default function Home() {
  return (
    <>
      <PageLoadingScreen />
      <Navbar />
      <IOSInstallPrompt />
      <PWAInstallPrompt />
      <main className="min-h-screen">
        <Hero />
        <SocialProofBadges />
        <ProductGrid limit={6} />
        <About />
        <Testimonials />
        <Contact />
        <Footer />
        <AdminFloatingButton />
        <FloatingCTA />
        <Cart />
      </main>
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Supacoat Investment Ltd",
            "description": "Leading wholesale hardware supplier in Kenya",
            "url": "https://www.supacoat.com",
            "telephone": "+254703771771",
            "email": "supacoatinvestmentltd@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "addressCountry": "KE",
              "addressLocality": "Kenya"
            },
            "sameAs": [
              "https://wa.me/254703771771"
            ]
          })
        }}
      />
    </>
  );
}
