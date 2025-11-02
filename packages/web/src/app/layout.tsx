import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import Header from "@/components/Header";
import CartPanel from "@/components/CartPanel";
import LoginModal from "@/components/LoginModal";
import CheckoutModal from "@/components/CheckoutModal";

const inter = Inter({ subsets: ["latin"] });

export const metadata = { title: "Meme Drop", description: "Sua loja de memes" };

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <CartProvider>
            <Header />
            <CartPanel />
            <LoginModal />
            <CheckoutModal />
            {children}
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}