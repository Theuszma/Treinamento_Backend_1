import { NextResponse } from "next/server";
import { getUserStats } from "@/services/user.service";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const stats = await getUserStats(userId);

    return NextResponse.json(stats);

  } catch (error) {
    return NextResponse.json({ message: "Ocorreu um erro ao buscar as estatísticas do usuário." }, { status: 500 });
  }
}