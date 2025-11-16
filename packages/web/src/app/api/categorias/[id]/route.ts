import { NextResponse } from "next/server";
import { getCategoriaById, updateCategoria, deleteCategoria } from "@/services/categoria.services";
import { updateCategoriaSchema } from "@/schemas/categoria.schema";
import { handleError } from "@/lib/handleError";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const categoria = await getCategoriaById(params.id);
    if (!categoria) {
      return NextResponse.json({ message: "Categoria não encontrada" }, { status: 404 });
    }
    return NextResponse.json(categoria);
  } catch (error) {
    return handleError(error);
  }
}

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    updateCategoriaSchema.parse(data);
    const updatedCategoria = await updateCategoria(params.id, data);
    return NextResponse.json(updatedCategoria);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteCategoria(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}