import { NextResponse } from "next/server";
import { getCategorias, createCategoria } from "@/services/categoria.services";
import { createCategoriaSchema } from "@/schemas/categoria.schema";
import { handleError } from "@/lib/handleError";

export async function GET() {
  try {
    const categorias = await getCategorias();
    return NextResponse.json(categorias);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    createCategoriaSchema.parse(data);
    const newCategoria = await createCategoria(data);
    return NextResponse.json(newCategoria, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}