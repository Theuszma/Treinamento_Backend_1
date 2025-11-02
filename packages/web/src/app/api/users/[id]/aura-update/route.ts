import { updateUserAuraStatus } from "@/app/(backend)/services/user.service";
import { NextResponse } from "next/server";

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const { status } = await request.json();
    if (typeof status !== 'number') {
      return NextResponse.json({ message: "Status inválido" }, { status: 400 });
    }

    const updatedUser = await updateUserAuraStatus(params.id, status);
    return NextResponse.json(updatedUser);
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 500 });
    }
    return NextResponse.json({ message: "Ocorreu um erro inesperado" }, { status: 500 });
  }
}