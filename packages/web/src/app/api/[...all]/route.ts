import { auth } from "@/auth";
import { NextResponse } from "next/server";

export const GET = auth.handlers.GET;
export const POST = auth.handlers.POST;
export const PUT = auth.handlers.PUT;
export const DELETE = auth.handlers.DELETE;
export const PATCH = auth.handlers.PATCH;

export const dynamic = "force-dynamic";