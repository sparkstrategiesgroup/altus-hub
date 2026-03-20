import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function proxy(request: NextRequest) {
  const token = await getToken({
    req: request,
    secret: process.env.AUTH_SECRET,
  });

  const { pathname } = request.nextUrl;

  const protectedPaths = [
    "/dashboard",
    "/sessions",
    "/peer-groups",
    "/discussions",
    "/resources",
    "/events",
    "/messages",
    "/profile",
  ];

  const isProtected = protectedPaths.some((path) =>
    pathname.startsWith(path)
  );

  if (isProtected && !token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  const authPaths = ["/login", "/register"];
  const isAuthPage = authPaths.some((path) => pathname.startsWith(path));

  if (isAuthPage && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/sessions/:path*",
    "/peer-groups/:path*",
    "/discussions/:path*",
    "/resources/:path*",
    "/events/:path*",
    "/messages/:path*",
    "/profile/:path*",
    "/login",
    "/register",
  ],
};
