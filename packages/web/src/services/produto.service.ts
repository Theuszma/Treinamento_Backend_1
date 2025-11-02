import prisma from "@/lib/prisma";
import { createProdutoSchema, updateProdutoSchema } from "@/schemas/produto.schema";

export const getProdutos = async () => {
  return await prisma.produto.findMany({ include: { categoria: true } });
};

export const getProdutoById = async (id: string) => {
  return await prisma.produto.findUnique({ where: { id }, include: { categoria: true } });
};

export const createProduto = async (data: any) => {
  const validatedData = createProdutoSchema.parse(data);
  const { categoriaId, ...produtoData } = validatedData;

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
  const validatedData = updateProdutoSchema.parse(data);
  return await prisma.produto.update({ where: { id }, data: validatedData });
};

export const deleteProduto = async (id: string) => {
  return await prisma.produto.delete({ where: { id } });
};