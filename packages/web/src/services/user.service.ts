import prisma from "@/lib/prisma";
import { createUserSchema } from "@/schemas/user.schema";
import bcrypt from "bcrypt";

export const findUserByEmail = async (email: string) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async (data: unknown) => {
  const validatedData = createUserSchema.parse(data);

  const hashedPassword = await bcrypt.hash(validatedData.password, 10);

  const userData = {
    name: validatedData.name,
    email: validatedData.email,
  };

  const user = await prisma.user.create({
    data: userData,
  });


  return user;
};

export const updateUserAuraStatus = async (userId: string, status: number) => {
  return await prisma.user.update({
    where: { id: userId },
    data: { auraStatus: status },
  });
};

export const getUserStats = async (userId: string) => {
  const compras = await prisma.compra.findMany({
    where: { userId },
  });

  if (compras.length === 0) {
    return {
      totalGasto: 0,
      numeroDeCompras: 0,
      produtoMaisComprado: null,
    };
  }

  const totalGasto = compras.reduce((acc, compra) => acc + compra.precoTotal, 0);
  const numeroDeCompras = compras.length;

  const todosOsProdutosIds = compras.flatMap(compra => compra.produtoIds);

  const contagemDeProdutos = todosOsProdutosIds.reduce((acc, id) => {
    acc[id] = (acc[id] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  let produtoMaisCompradoId: string | null = null;
  let maxContagem = 0;

  for (const produtoId in contagemDeProdutos) {
    if (contagemDeProdutos[produtoId] > maxContagem) {
      maxContagem = contagemDeProdutos[produtoId];
      produtoMaisCompradoId = produtoId;
    }
  }

  const produtoMaisComprado = produtoMaisCompradoId
    ? await prisma.produto.findUnique({ where: { id: produtoMaisCompradoId } })
    : null;

  return {
    totalGasto,
    numeroDeCompras,
    produtoMaisComprado,
  };
};