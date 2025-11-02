import { NextResponse } from "next/server";
import { getCategoriaById, updateCategoria, deleteCategoria } from "@/services/categoria.services";
import { updateCategoriaSchema } from "@/schemas/categoria.schema";
import { ZodError } from "zod";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const categoria = await getCategoriaById(params.id);
    if (!categoria) {
      return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
    }
    return NextResponse.json(categoria);
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao buscar a categoria." }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    updateCategoriaSchema.parse(data);

    const updatedCategoria = await updateCategoria(params.id, data);
    return NextResponse.json(updatedCategoria);

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { message: "Dados de entrada inválidos", errors: error.issues },
        { status: 400 }
      );
    }
    return NextResponse.json({ message: "Ocorreu um erro ao atualizar a categoria." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteCategoria(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao deletar a categoria." }, { status: 500 });
  }
}