import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/services/user.service";
import { ZodError } from "zod";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json({ message: "Este email já está em uso" }, { status: 409 });
    }

    const newUser = await createUser(data);
    const { ...userWithoutPassword } = newUser; 

    return NextResponse.json(userWithoutPassword, { status: 201 });

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ message: "Dados de entrada inválidos", errors: error.issues }, { status: 400 });
    }
    return NextResponse.json({ message: "Ocorreu um erro ao registrar o usuário." }, { status: 500 });
  }
}