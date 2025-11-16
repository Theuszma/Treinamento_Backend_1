import prisma from "@/lib/prisma";
import { 
  createCompraSchema, 
  updateCompraStatusSchema 
} from "@/schemas/compra.schema";
import { sendEmail } from "@/lib/email";

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

export const updateCompraStatus = async (id: string, data: unknown) => {
  const validatedData = updateCompraStatusSchema.parse(data);
  const newStatus = validatedData.status;

  const updatedCompra = await prisma.compra.update({
    where: { id },
    data: {
      status: newStatus,
    },
    include: {
      user: {
        select: { email: true, name: true },
      },
    },
  });

  if (updatedCompra.user.email) {
    let subject = "";
    let body = "";

    switch (newStatus) {
      case "PAID":
        subject = "Pagamento confirmado!";
        body = `Olá ${updatedCompra.user.name}, seu pagamento foi confirmado.`;
        break;
      case "SHIPPED":
        subject = "Seu pedido foi enviado!";
        body = `Olá ${updatedCompra.user.name}, seu pedido foi enviado e está a caminho.`;
        break;
      case "DELIVERED":
        subject = "Seu pedido foi entregue!";
        body = `Olá ${updatedCompra.user.name}, seu pedido foi entregue com sucesso.`;
        break;
    }

    if (subject && body) {
      await sendEmail({
        to: updatedCompra.user.email,
        subject,
        body,
      });
    }
  }

  return updatedCompra;
};

export const deleteCompra = async (id: string) => {
  return await prisma.compra.delete({ where: { id } });
};