
import ListaProdutos from '@/components/ListaProdutos';

export default function HomePage() {
  
  console.log('Componente HomePage renderizado.');

  return (
    <main className="bg-gray-100 p-4 sm:p-8">
     
      <ListaProdutos />
    </main>
  );
}