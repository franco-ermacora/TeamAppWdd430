import type { Metadata } from "next";
import Navbar from "@/components/navbar";
import { ClerkProvider } from "@clerk/nextjs";
import "./globals.css";

export const metadata: Metadata = {
  title: "CardVault | TCG Collection Manager",
  description: "Track your TCG collections and wishlists easily.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider>
      <html lang="es">
        <body className="bg-zinc-950 text-zinc-50 antialiased min-h-screen">
          <Navbar />
          {children}
        </body>
      </html>
    </ClerkProvider>
  );
}