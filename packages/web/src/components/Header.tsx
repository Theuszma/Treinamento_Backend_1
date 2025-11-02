"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Link from 'next/link';
import Image from 'next/image';

export default function Header() {
  const { cartItems, openCart } = useCart();
  const { user, openLoginModal, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const username = user ? user.email.split('@')[0] : null;

  return (
    <>
      <header className="bg-white shadow-md sticky top-0 z-20">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div>
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)} 
              className="text-gray-800 focus:outline-none" 
              aria-label="Abrir menu"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
            </button>
          </div>
          <div className="h-10 flex items-center">
            <Link href="/">
              <Image 
                src="/assets/imgs/Logo/Logo.png" 
                alt="Meme Drop Logo" 
                width={47} 
                height={29} 
                unoptimized 
              />
            </Link>
          </div>
          <div className="flex items-center gap-6">
            {user ? (
              <button onClick={logout} className="text-gray-600 hover:text-blue-600 font-semibold">{username}</button>
            ) : (
              <button onClick={openLoginModal} className="text-gray-600 hover:text-blue-600 font-semibold">Login</button>
            )}
            <div 
              className="relative cursor-pointer" 
              onClick={openCart} 
              aria-label="Abrir carrinho de compras"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold w-6 h-6 rounded-full flex items-center justify-center animate-pulse">{totalItems}</span>
              )}
            </div>
          </div>
        </div>
      </header>
      <div className={`fixed top-0 left-0 h-full w-64 bg-gray-800 text-white z-50 transform transition-transform duration-300 ease-in-out ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="p-5">
          <h2 className="text-xl font-bold mb-4">Menu</h2>
          <nav>
            <ul>
              <li className="mb-2"><Link href="#" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Início</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Sobre</Link></li>
              <li className="mb-2"><Link href="#" className="hover:text-blue-400" onClick={() => setIsMenuOpen(false)}>Serviços</Link></li>
            </ul>
          </nav>
        </div>
      </div>
      {isMenuOpen && <div className="fixed inset-0 bg-black opacity-50 z-40" onClick={() => setIsMenuOpen(false)}></div>}
    </>
  );
}