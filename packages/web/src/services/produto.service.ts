import prisma from "@/lib/prisma";

export const getProdutos = async () => {
  return await prisma.produto.findMany({ include: { categoria: true } });
};

export const getProdutoById = async (id: string) => {
  return await prisma.produto.findUnique({ where: { id }, include: { categoria: true } });
};

export const createProduto = async (data: any) => {
  const { categoriaId, ...produtoData } = data;

  return await prisma.produto.create({
    data: {
      ...produtoData,
      ...(categoriaId && {
        categoria: {
          connect: { id: categoriaId },
        },
      }),
    },
  });
};


export const updateProduto = async (id: string, data: any) => {
  return await prisma.produto.update({ 
    where: { id }, 
    data: data 
  });
};

export const deleteProduto = async (id: string) => {
  return await prisma.produto.delete({ where: { id } });
};