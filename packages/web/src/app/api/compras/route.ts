import { NextResponse } from "next/server";
import { createCompra, getCompras } from "@/services/compra.service";
import { createCompraSchema } from "@/schemas/compra.schema";
import { handleError } from "@/lib/handleError";

export async function GET(request: Request) {
  try {
    const compras = await getCompras();
    return NextResponse.json(compras);
  } catch (error) {
    return handleError(error);
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    createCompraSchema.parse(data);
    const newCompra = await createCompra(data);
    return NextResponse.json(newCompra, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}