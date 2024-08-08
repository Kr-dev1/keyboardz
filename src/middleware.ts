import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/sign-in", "/sign-up", "/verify/:path*", "/"],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });
  const url = request.nextUrl;

  if (
    token &&
    (url.pathname.startsWith("/sign-in") ||
      url.pathname.startsWith("/sign-up") ||
      url.pathname.startsWith("/verify"))
  ) {
    console.log(
      "Authenticated user trying to access auth pages. Redirecting to home."
    );
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
