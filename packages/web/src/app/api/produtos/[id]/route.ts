import { NextResponse } from "next/server";
import { getProdutoById, updateProduto, deleteProduto } from "@/services/produto.service";
import { updateProdutoSchema } from "@/schemas/produto.schema";
import { handleError } from "@/lib/handleError";
import { uploadImageToS3 } from "@/lib/s3";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const produto = await getProdutoById(params.id);
    if (!produto) {
      return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const formData = await request.formData();
    
    const data = Object.fromEntries(formData);
    const validatedData = updateProdutoSchema.parse(data);

    const file = formData.get("imagem") as File | null;
    let imageUrl: string | undefined = validatedData.imageUrl; 

    if (file) {
      imageUrl = await uploadImageToS3(file);
    }

    const produtoParaSalvar = {
      ...validatedData,
      imageUrl: imageUrl,
    };

    const updatedProduto = await updateProduto(params.id, produtoParaSalvar);
    return NextResponse.json(updatedProduto);

  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteProduto(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}