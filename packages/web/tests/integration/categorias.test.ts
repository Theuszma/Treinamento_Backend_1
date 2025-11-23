import { describe, it, expect, vi } from 'vitest';
import { GET, POST } from '@/app/api/categorias/route';
import prisma from '@/lib/__mocks__/prisma';

describe('Integração - Rotas de Categorias', () => {
  it('Deve listar todas as categorias (GET)', async () => {
    const categoriasMock = [
      { id: '1', nome: 'Eletrônicos' },
      { id: '2', nome: 'Roupas' },
    ];
    (prisma.categoria.findMany as any).mockResolvedValue(categoriasMock);

    const requestObj = {} as Request;
    const response = await GET();
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(2);
    expect(data[0].nome).toBe('Eletrônicos');
  });

  it('Deve criar uma nova categoria (POST)', async () => {
    const novaCategoria = { id: '3', nome: 'Livros' };
    (prisma.categoria.create as any).mockResolvedValue(novaCategoria);

  
    const requestObj = {
      json: async () => ({ nome: 'Livros' }),
    } as Request;

    const response = await POST(requestObj);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.nome).toBe('Livros');
  });

  it('Deve falhar ao criar categoria sem nome (Validação Zod)', async () => {
    
    const requestObj = {
      json: async () => ({}), 
    } as Request;

    const response = await POST(requestObj);
    const data = await response.json();

    expect(response.status).toBe(400); 
    
    expect(data.message).toContain('Dados inválidos');
  });
});