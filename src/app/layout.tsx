import type { Metadata, Viewport } from "next";
import "./globals.css";
import Script from "next/script";

export const metadata: Metadata = {
  title: "Supacoat - Wholesale Hardware Supplier Kenya | Quality Paints & Coatings",
  description: "Leading wholesale hardware supplier in Kenya. Quality paints, coatings, building materials and hardware at competitive prices. Serving contractors and businesses nationwide. Fast delivery, expert support.",
  keywords: ["wholesale hardware Kenya", "paint supplier", "coating supplier", "building materials", "industrial coatings", "Supacoat", "hardware store Kenya"],
  authors: [{ name: "Supacoat Investment Ltd" }],
  creator: "Supacoat Investment Ltd",
  publisher: "Supacoat Investment Ltd",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Supacoat",
  },
  applicationName: "Supacoat",
  icons: {
    icon: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: [
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: "Supacoat - Wholesale Hardware Supplier Kenya",
    description: "Leading wholesale hardware supplier. Quality paints, coatings & building materials at competitive prices.",
    type: "website",
    locale: "en_KE",
    siteName: "Supacoat",
  },
  twitter: {
    card: "summary_large_image",
    title: "Supacoat - Wholesale Hardware Supplier Kenya",
    description: "Quality paints, coatings & building materials at competitive prices.",
  },
};

export const viewport: Viewport = {
  themeColor: "#2563eb",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="apple-touch-icon" href="/icon-192.png" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="antialiased">
        {children}
        <Script
          id="register-sw"
          strategy="afterInteractive"
          dangerouslySetInnerHTML={{
            __html: `
              if ('serviceWorker' in navigator) {
                window.addEventListener('load', function() {
                  navigator.serviceWorker.register('/sw.js').then(
                    function(registration) {
                      console.log('Service Worker registered:', registration.scope);
                    },
                    function(err) {
                      console.log('Service Worker registration failed:', err);
                    }
                  );
                });
              }
            `,
          }}
        />
      </body>
    </html>
  );
}
