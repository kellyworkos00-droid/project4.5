import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supacoat - Wholesale Hardware Supplier Kenya",
  description: "Leading wholesale hardware supplier in Kenya. Quality paints, coatings, building materials and hardware at competitive prices. Serving contractors and businesses nationwide.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
