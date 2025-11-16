import { NextResponse } from "next/server";
import { findUserByEmail } from "@/services/user.service";
import { loginUserSchema } from "@/schemas/user.schema";
import { handleError } from "@/lib/handleError";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    loginUserSchema.parse(data);

    const user = await findUserByEmail(data.email);
    if (!user) {
      return NextResponse.json({ message: "Email ou senha inválidos" }, { status: 401 });
    }

    const { ...userWithoutPassword } = user;
    return NextResponse.json({ user: userWithoutPassword });

  } catch (error) {
    return handleError(error);
  }
}