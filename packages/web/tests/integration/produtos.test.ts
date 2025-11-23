import { describe, it, expect, vi } from 'vitest';
import { POST, GET } from '@/app/api/produtos/route';
import prisma from '@/lib/__mocks__/prisma';

describe('Integração - Rotas de Produtos', () => {
  
  it('Deve criar um produto com imagem (POST)', async () => {
    const novoProduto = {
      id: '1',
      nome: 'Tênis de Corrida',
      descricao: 'Muito rápido',
      preco: 299.90,
      imageUrl: 'https://fake-url.com/imagem-foda.png',
      categoriaId: null,
      compraIds: []
    };
    
    (prisma.produto.create as any).mockResolvedValue(novoProduto);

    const formData = new FormData();
    formData.append('nome', 'Tênis de Corrida');
    formData.append('descricao', 'Muito rápido');
    formData.append('preco', '299.90');
    formData.append('imagem', new Blob(['fake-content'], { type: 'image/png' }));

    const requestObj = {
      formData: async () => formData,
    } as unknown as Request;

    const response = await POST(requestObj);
    const data = await response.json();

    expect(response.status).toBe(201);
    expect(data.nome).toBe('Tênis de Corrida');
    expect(data.imageUrl).toBe('https://fake-url.com/imagem-foda.png');
  });

  it('Deve listar produtos (GET)', async () => {
    const listaMock = [{ id: '1', nome: 'Tênis' }];
    (prisma.produto.findMany as any).mockResolvedValue(listaMock);

    const requestObj = {} as Request;
    const response = await GET(requestObj);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data).toHaveLength(1);
  });
});