import { NextResponse, type NextRequest } from "next/server";
import { getSession } from "better-auth/server";

export async function middleware(request: NextRequest) {
  const session = await getSession(request);

  if (!session) {
    return NextResponse.json(
      { success: false, message: "Usuário não autenticado" },
      { status: 401 }
    );
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-user-id', session.userId);
  requestHeaders.set('x-user-email', session.email);

  return NextResponse.next({
    request: {
      headers: requestHeaders,
    },
  });
}

export const config = {
  matcher: [
    '/api/compras/:path*', 
    '/api/users/:path*/stats', 
  ],
};