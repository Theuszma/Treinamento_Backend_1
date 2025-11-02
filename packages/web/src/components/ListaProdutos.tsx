

"use client"; 
import { useState, useEffect } from "react";
import ProdutoCard from './ProdutoCard';
import { type Product } from "@/data/products"; 

export default function ListaProdutos() {

  const [produtos, setProdutos] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const response = await fetch('/api/produtos');
        if (!response.ok) {
          throw new Error('Falha ao buscar produtos');
        }
        const data = await response.json();
        setProdutos(data); 
      } catch (err) {
        if (err instanceof Error) setError(err.message);
        else setError("Ocorreu um erro desconhecido");
      } finally {
        setLoading(false); 
      }
    };

    fetchProdutos();
  }, []); 


  if (loading) {
    return <p className="text-center">Carregando produtos do banco de dados...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Erro: {error}</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
      {produtos.map((product) => (
        <ProdutoCard key={product.id} product={product} />
      ))}
    </div>
  );
}