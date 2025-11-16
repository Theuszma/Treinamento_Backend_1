import { NextResponse } from "next/server";
import { createUser, findUserByEmail } from "@/services/user.service";
import { handleError } from "@/lib/handleError";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const existingUser = await findUserByEmail(data.email);
    if (existingUser) {
      return NextResponse.json({ message: "Este email já está em uso" }, { status: 409 });
    }

    const newUser = await createUser(data);
    return NextResponse.json(newUser, { status: 201 });
  } catch (error) {
    return handleError(error);
  }
}