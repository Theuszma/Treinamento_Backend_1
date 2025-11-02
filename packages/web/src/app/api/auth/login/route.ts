import { NextResponse } from "next/server";
import { findUserByEmail } from "@/services/user.service";
import { loginUserSchema } from "@/schemas/user.schema";
import { ZodError } from "zod";
import bcrypt from "bcrypt";

export async function POST(request: Request) {
  try {
    const data = await request.json();
    loginUserSchema.parse(data);

    const user = await findUserByEmail(data.email);
    if (!user) {
      return NextResponse.json({ message: "Email ou senha inválidos" }, { status: 401 });
    }

    return NextResponse.json({ user });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados de entrada inválidos", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: "Ocorreu um erro ao fazer login." }, { status: 500 });
  }
}