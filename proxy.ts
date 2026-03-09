import { auth } from "@/features/auth/auth.config";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLogged = !!req.auth;

  const isProtected = nextUrl.pathname.startsWith("/dashboard") ||
                      nextUrl.pathname.startsWith("/admin");

  const isAdmin = nextUrl.pathname.startsWith("/admin");
  const isAuth = nextUrl.pathname.startsWith("/login") || nextUrl.pathname.startsWith("/register");

  if (!isLogged && isProtected) return NextResponse.redirect(new URL("/login", nextUrl));

  if (isLogged && isAuth) return NextResponse.redirect(new URL("/redirect", nextUrl));

  if (isAdmin && req.auth?.user.role !== "ADMIN")
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};