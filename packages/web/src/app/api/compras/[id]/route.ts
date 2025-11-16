import { NextResponse } from "next/server";
import { getCompraById, deleteCompra, updateCompraStatus } from "@/services/compra.service";
import { handleError } from "@/lib/handleError";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const compra = await getCompraById(params.id);
    if (!compra) {
      return NextResponse.json({ message: "Compra não encontrada" }, { status: 404 });
    }
    return NextResponse.json(compra);
  } catch (error) {
    return handleError(error);
  }
}

export async function PATCH(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const updatedCompra = await updateCompraStatus(params.id, data);
    return NextResponse.json(updatedCompra);
  } catch (error) {
    return handleError(error);
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteCompra(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return handleError(error);
  }
}