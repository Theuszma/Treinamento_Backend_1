import { NextResponse } from "next/server";
import { getCategorias, createCategoria } from "@/services/categoria.services";
import { createCategoriaSchema } from "@/schemas/categoria.schema";
import { ZodError } from "zod";

export async function GET() {
  try {
    const categorias = await getCategorias();
    return NextResponse.json(categorias);
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao buscar as categorias." }, { status: 500 });
  }
}


export async function POST(request: Request) {
  try {
    const data = await request.json();
    createCategoriaSchema.parse(data);

    const newCategoria = await createCategoria(data);
    return NextResponse.json(newCategoria, { status: 201 });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json(
        { 
          message: "Dados de entrada inválidos", 
          errors: error.issues 
        },
        { status: 400 }
      );
    }
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json({ message: "Ocorreu um erro desconhecido" }, { status: 500 });
  }
}