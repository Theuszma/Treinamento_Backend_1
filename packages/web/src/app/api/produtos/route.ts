import { NextResponse } from "next/server";
import { getProdutoById, updateProduto, deleteProduto } from "@/services/produto.service";
import { updateProdutoSchema } from "@/schemas/produto.schema";
import { ZodError } from "zod";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const produto = await getProdutoById(params.id);
    if (!produto) {
      return NextResponse.json({ message: "Produto não encontrado" }, { status: 404 });
    }
    return NextResponse.json(produto);
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao buscar o produto." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    // Valida os dados de entrada com o schema de atualização
    updateProdutoSchema.parse(data);

    const updatedProduto = await updateProduto(params.id, data);
    return NextResponse.json(updatedProduto);

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Dados de entrada inválidos", errors: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Ocorreu um erro ao atualizar o produto." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteProduto(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao deletar o produto." }, { status: 500 });
  }
}