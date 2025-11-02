"use client";

import { createContext, useState, useContext, ReactNode, useEffect } from 'react';

interface User {
  id: string;
  email: string;
  name?: string;
  auraStatus: number; 
}

interface AuthContextType {
  user: User | null;
  isLoginModalOpen: boolean;
  login: (user: User) => void;
  logout: () => void;
  openLoginModal: () => void;
  closeLoginModal: () => void;
  updateUserAura: (newStatus: number) => void; 
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const login = (userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData)); 
    closeLoginModal();
  };

  const logout = () => {
    if (confirm('Você tem certeza que deseja sair?')) {
      setUser(null);
      localStorage.removeItem('user');
    }
  };

  const updateUserAura = (newStatus: number) => {
    if (user) {
      const updatedUser = { ...user, auraStatus: newStatus };
      setUser(updatedUser);
      localStorage.setItem('user', JSON.stringify(updatedUser));
    }
  };

  const openLoginModal = () => setIsLoginModalOpen(true);
  const closeLoginModal = () => setIsLoginModalOpen(false);

  const value = { 
    user, 
    isLoginModalOpen, 
    login, 
    logout, 
    openLoginModal, 
    closeLoginModal, 
    updateUserAura 
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}