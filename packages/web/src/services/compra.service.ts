import prisma from "@/lib/prisma";
import { createCompraSchema } from "@/schemas/compra.schema";

export const getCompras = async () => {
  return await prisma.compra.findMany({ include: { user: true } });
};

export const getCompraById = async (id: string) => {
  return await prisma.compra.findUnique({ where: { id }, include: { user: true } });
};

export const createCompra = async (data: unknown) => {
  const validatedData = createCompraSchema.parse(data);

  const produtos = await prisma.produto.findMany({
    where: {
      id: { in: validatedData.produtoIds },
    },
  });

  if (produtos.length !== validatedData.produtoIds.length) {
    throw new Error("Um ou mais produtos não foram encontrados");
  }

  const precoTotal = produtos.reduce((total, produto) => total + produto.preco, 0);

  return await prisma.compra.create({
    data: {
      userId: validatedData.userId,
      produtoIds: validatedData.produtoIds,
      precoTotal: precoTotal,
    },
  });
};

export const deleteCompra = async (id: string) => {
  return await prisma.compra.delete({ where: { id } });
};