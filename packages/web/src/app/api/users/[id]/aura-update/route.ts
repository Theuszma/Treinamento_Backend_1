import { NextResponse } from "next/server";
import { updateUserAuraStatus } from "@/services/user.service";
import { handleError } from "@/lib/handleError";
import { z } from "zod";

const auraUpdateSchema = z.object({
  status: z.number().int(),
});

export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const data = await request.json();
    const { status } = auraUpdateSchema.parse(data);
    
    const updatedUser = await updateUserAuraStatus(params.id, status);
    return NextResponse.json(updatedUser);
  } catch (error) {
    return handleError(error);
  }
}