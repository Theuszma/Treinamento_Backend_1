import { z } from "zod";

export const createProdutoSchema = z.object({
  nome: z.string().min(3, "Nome deve ter pelo menos 3 caracteres"),
  descricao: z.string().min(10, "Descrição muito curta"),
  preco: z.number().positive("Preço deve ser um número positivo"),
  categoriaId: z.string().optional(),
});

export const updateProdutoSchema = createProdutoSchema.partial();