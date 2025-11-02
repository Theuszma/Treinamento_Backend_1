import { NextResponse } from "next/server";
import { getCompraById, deleteCompra } from "@/services/compra.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const compra = await getCompraById(params.id);
    if (!compra) {
      return NextResponse.json({ message: "Compra não encontrada" }, { status: 404 });
    }
    return NextResponse.json(compra);
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao buscar a compra." }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  try {
    await deleteCompra(params.id);
    return new NextResponse(null, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao deletar a compra." }, { status: 500 });
  }
}