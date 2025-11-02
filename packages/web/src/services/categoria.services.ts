import prisma from "@/lib/prisma"; // Caminho de importação corrigido
import { createCategoriaSchema, updateCategoriaSchema } from "../schemas/categoria.schema";

export const getCategorias = async () => {
  return await prisma.categoria.findMany(); // Corrigido: 'categorias' para 'categoria'
};

export const getCategoriaById = async (id: string) => {
  return await prisma.categoria.findUnique({ where: { id } }); // Corrigido: 'categorias' para 'categoria'
};

export const createCategoria = async (data: unknown) => {
  const validatedData = createCategoriaSchema.parse(data);
  return await prisma.categoria.create({ data: validatedData }); // Corrigido: 'categorias' para 'categoria'
};

export const updateCategoria = async (id: string, data: unknown) => {
  const validatedData = updateCategoriaSchema.parse(data);
  return await prisma.categoria.update({ where: { id }, data: validatedData }); // Corrigido: 'categorias' para 'categoria'
};

export const deleteCategoria = async (id: string) => {
  return await prisma.categoria.delete({ where: { id } }); // Corrigido: 'categorias' para 'categoria'
};