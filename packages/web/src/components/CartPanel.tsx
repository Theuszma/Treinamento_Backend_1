"use client";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { type Product } from "@/data/products";

export default function CartPanel() {
 
  const { isCartOpen, closeCart, cartItems, addToCart, decreaseQuantity, removeFromCart, clearCart, openCheckoutModal } = useCart();
  const { user, openLoginModal } = useAuth();

  const handleCheckout = async () => {
  if (cartItems.length === 0) {
    alert("Seu carrinho está vazio!");
    return;
  }

  if (user) {
    if (user.auraStatus === 0) {
      closeCart();
      openCheckoutModal();
    } else {
      try {
        const produtoIds = cartItems.map(item => item.id);
        const response = await fetch('/api/compras', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: user.id, produtoIds }),
        });

        if (!response.ok) throw new Error("Falha ao efetivar a compra.");

        alert("Compra finalizada com sucesso!");
        clearCart();
        closeCart();

      } catch (err) {
        if (err instanceof Error) alert(err.message);
      }
    }
  } else {
    alert("Você precisa fazer login para finalizar a compra.");
    openLoginModal();
  }
};

  return (
    <>
      <div 
        className={`fixed inset-0 bg-black z-30 transition-opacity duration-300 ${isCartOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'}`}
        onClick={closeCart}
      />
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white shadow-2xl z-40 transform transition-transform duration-300 ease-in-out flex flex-col ${isCartOpen ? 'translate-x-0' : 'translate-x-full'}`}
      >
        <div className="p-5 border-b flex justify-between items-center">
          <h3 className="text-xl font-bold">Seu Carrinho</h3>
          <button onClick={closeCart} className="text-gray-500 text-3xl hover:text-gray-800">&times;</button>
        </div>
        {cartItems.length === 0 ? (
          <div className="flex-grow flex items-center justify-center"><p className="text-gray-500">Seu carrinho está vazio.</p></div>
        ) : (
          <div className="flex-grow p-3 overflow-y-auto">
            {cartItems.map(item => (
              <div key={item.id} className="flex items-center gap-4 p-3 border-b">
                <img src={`${item.folder}${item.images[0]}`} alt={item.name} className="w-16 h-16 object-cover rounded-md" />
                <div className="flex-grow">
                  <h4 className="font-bold">{item.name}</h4>
                  <p className="text-sm text-gray-600">{item.priceText}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <button onClick={() => decreaseQuantity(item.id)} className="border w-6 h-6 rounded font-bold">-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => addToCart(item as Product)} className="border w-6 h-6 rounded font-bold">+</button>
                  </div>
                </div>
                <button onClick={() => removeFromCart(item.id)} className="text-red-500 text-2xl hover:text-red-700 font-bold">&times;</button>
              </div>
            ))}
          </div>
        )}
        <div className="p-5 border-t">
          {cartItems.length > 0 && (<button onClick={clearCart} className="w-full mb-4 py-2 bg-red-500 text-white font-semibold rounded-md hover:bg-red-600">Limpar Carrinho</button>)}
          <button onClick={handleCheckout} className="w-full py-4 bg-green-600 text-white font-bold text-lg rounded-md hover:bg-green-700">Finalizar Compra</button>
        </div>
      </div>
    </>
  );
}