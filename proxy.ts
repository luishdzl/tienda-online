import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const { nextUrl } = req;
  const isLogged = !!req.auth;

  const isProtectedRoute =
    nextUrl.pathname.startsWith("/dashboard") ||
    nextUrl.pathname.startsWith("/admin");

  const isAdminRoute = nextUrl.pathname.startsWith("/admin");
  const isAuthRoute =
    nextUrl.pathname.startsWith("/login") ||
    nextUrl.pathname.startsWith("/register");

  // 1️⃣ Usuario no logeado intenta entrar a zona privada
  if (!isLogged && isProtectedRoute) {
    return NextResponse.redirect(new URL("/login", nextUrl));
  }

  // 2️⃣ Usuario logeado intenta ir al login
  if (isLogged && isAuthRoute) {
    return NextResponse.redirect(new URL("/redirect", nextUrl));
  }

  // 3️⃣ Usuario normal intenta entrar al admin
  if (isAdminRoute && req.auth?.user.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", nextUrl));
  }
});

export const config = {
  matcher: ["/admin/:path*", "/dashboard/:path*", "/login", "/register"],
};