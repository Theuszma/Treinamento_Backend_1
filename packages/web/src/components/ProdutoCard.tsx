"use client";

import { useState } from 'react';
import { type Product } from '@/data/products';
import { useCart } from '@/contexts/CartContext';

interface ProdutoCardProps {
  product: Product;
}

export default function ProdutoCard({ product }: ProdutoCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const { addToCart } = useCart();

  const images = product.images.map((imageName: string) => `${product.folder}${imageName}`);

  const goToNextImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const goToPrevImage = () => {
    setCurrentImageIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden flex flex-col group transition-transform duration-300 hover:scale-105">
      <div className="relative">
        <img src={images[currentImageIndex]} alt={product.name} className="w-full h-64 object-cover" />
        {images.length > 1 && (
          <>
            <button 
              onClick={goToPrevImage} 
              className="absolute top-1/2 left-2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &lt;
            </button>
            <button 
              onClick={goToNextImage} 
              className="absolute top-1/2 right-2 -translate-y-1/2 bg-black/40 text-white rounded-full w-8 h-8 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
            >
              &gt;
            </button>
          </>
        )}
      </div>
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-gray-800">{product.name}</h3>
        <p className="text-gray-600 mt-2 text-sm">{product.description}</p>
        <p className="mt-auto pt-4 font-semibold text-lg text-gray-900">
          Preço: {product.priceText}
        </p>
        <button 
          onClick={() => addToCart(product)} 
          className="w-full mt-4 py-2 bg-blue-600 text-white font-bold rounded-md hover:bg-blue-700 transition-colors"
        >
          Adicionar ao Carrinho
        </button>
      </div>
    </div>
  );
}