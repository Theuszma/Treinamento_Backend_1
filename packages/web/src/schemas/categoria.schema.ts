import { z } from "zod";

export const createCategoriaSchema = z.object({
  nome: z.string().min(1, "O nome da categoria é obrigatório"),
});

export const updateCategoriaSchema = createCategoriaSchema.partial();