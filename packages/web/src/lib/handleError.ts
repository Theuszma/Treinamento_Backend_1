import { NextResponse } from "next/server";
import { ZodError } from "zod";

export class AuthError extends Error {
  constructor(message = "falta-te permissão betinha") {
    super(message);
    this.name = "AuthError";
  }
}

export const handleError = (error: unknown) => {
  if (error instanceof ZodError) {
    return NextResponse.json(
      { success: false, message: "Dados inválidos", errors: error.issues },
      { status: 400 }
    );
  }

  if (error instanceof AuthError) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }

  if (error instanceof Error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json(
    { success: false, message: "Reinicia o pc que funciona dog" },
    { status: 500 }
  );
};