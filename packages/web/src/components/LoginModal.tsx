"use client";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginModal() {
  const { isLoginModalOpen, closeLoginModal, login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (!isLoginModalOpen) {
    return null;
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(''); 

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('Email ou senha inválidos.');
      }

      const data = await response.json();
      
      if (data.user) {
        login(data.user);
      }
      
    } catch (err) {
      if (err instanceof Error) setError(err.message);
      else setError("Ocorreu um erro desconhecido.");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 z-40 flex items-center justify-center" onClick={closeLoginModal}>
      <div className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md relative" onClick={(e) => e.stopPropagation()}>
        <button onClick={closeLoginModal} className="absolute top-2 right-4 text-gray-500 text-4xl hover:text-gray-800">&times;</button>
        <h2 className="text-2xl font-bold text-center mb-6">Login</h2>
        <form onSubmit={handleSubmit}>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <div className="mb-5">
            <label htmlFor="email" className="block mb-2 font-medium">Email:</label>
            <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block mb-2 font-medium">Senha:</label>
            <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full p-2 border border-gray-300 rounded-md" required />
          </div>
          <button type="submit" className="w-full py-3 bg-blue-600 text-white font-bold text-lg rounded-md hover:bg-blue-700">
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}