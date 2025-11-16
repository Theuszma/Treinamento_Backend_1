import { NextResponse } from "next/server";
import { getUserStats } from "@/services/user.service";
import { handleError } from "@/lib/handleError";

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const userId = params.id;
    const stats = await getUserStats(userId);
    return NextResponse.json(stats);
  } catch (error) {
    return handleError(error);
  }
}