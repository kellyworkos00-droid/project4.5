import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Supacoat - Premium Coating Solutions",
  description: "Discover premium coating and paint products for all your needs. Quality products with expert support.",
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
