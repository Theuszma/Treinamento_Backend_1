"use client";

import { useState } from "react";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import Image from "next/image";
import SnakeGame from "./SnakeGame";

export default function CheckoutModal() {
  const { isCheckoutModalOpen, closeCheckoutModal } = useCart();
  const { user, updateUserAura } = useAuth();
  const [showSnakeGame, setShowSnakeGame] = useState(false);
  const [hasWon, setHasWon] = useState(false);

  const handleWin = async () => {
    if (!user) return;
    try {
      const response = await fetch(`/api/users/${user.id}/update-aura`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 1 }),
      });
      if (!response.ok) throw new Error("Falha ao atualizar aura.");
      updateUserAura(1);
      setHasWon(true);
      
      setTimeout(() => {
        closeCheckoutModal();
        setShowSnakeGame(false);
        setHasWon(false);
      }, 2500);

    } catch (err) {
      if (err instanceof Error) alert(err.message);
    }
  };

  const handleClose = () => {
    closeCheckoutModal();
    setShowSnakeGame(false);
    setHasWon(false);
  };
  
  if (!isCheckoutModalOpen) {
    return null;
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-50 flex items-center justify-center" onClick={handleClose}>
      <div className="bg-white p-6 rounded-lg shadow-xl relative w-auto" onClick={(e) => e.stopPropagation()}>
        <button onClick={handleClose} className="absolute top-2 right-4 text-gray-500 text-4xl hover:text-gray-800 z-10">&times;</button>
        
        {showSnakeGame ? (
          hasWon ? (
            <div className="p-10 text-center">
              <h2 className="text-2xl font-bold text-green-600">Você tem aura suficiente!</h2>
              <p>Agora você pode finalizar a compra.</p>
            </div>
          ) : (
            <SnakeGame onWin={handleWin} />
          )
        ) : (
          <div className="w-full max-w-md">
            <Image src="/assets/imgs/Logo/Beta.gif" alt="SOBRA NADA" width={400} height={300} unoptimized className="w-full rounded-md" />
            <p className="text-center font-bold mt-5 text-gray-800">Você não tem aura para comprar aqui betinha, vá farmar.</p>
            <button onClick={() => setShowSnakeGame(true)} className="w-full mt-4 py-3 bg-yellow-500 text-black font-bold text-lg rounded-md hover:bg-yellow-600">
              Farmar
            </button>
          </div>
        )}
      </div>
    </div>
  );
}