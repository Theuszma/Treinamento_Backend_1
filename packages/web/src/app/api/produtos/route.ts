import { NextResponse } from "next/server";
import { getProdutos, createProduto } from "@/services/produto.service";
import { createProdutoSchema } from "@/schemas/produto.schema";
import { handleError } from "@/lib/handleError";
import { uploadImageToS3 } from "@/lib/s3";

export async function GET(request: Request) {
  try {
    const produtos = await getProdutos();
    return NextResponse.json(produtos);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    
    const data = Object.fromEntries(formData);
    const validatedData = createProdutoSchema.parse(data);

    const file = formData.get("imagem") as File | null;
    let imageUrl: string | undefined = undefined;

    if (file) {
      imageUrl = await uploadImageToS3(file);
    }

    const produtoParaSalvar = {
      ...validatedData,
      imageUrl: imageUrl,
    };

    const newProduto = await createProduto(produtoParaSalvar);
    return NextResponse.json(newProduto, { status: 201 });

  } catch (error) {
    return handleError(error);
  }
}