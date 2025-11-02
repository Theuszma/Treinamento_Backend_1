import { z } from "zod";

export const createCompraSchema = z.object({
  userId: z.string().min(1, "ID do usuário é obrigatório"),
  produtoIds: z.array(z.string()).min(1, "A compra deve ter pelo menos um produto"),
});

export const updateCompraSchema = createCompraSchema.partial();