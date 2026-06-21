import { NextResponse } from "next/server";
import { jwtVerify } from "jose"; // We use jose because jsonwebtoken uses Node modules not supported in Edge runtime

export async function middleware(request) {
  const token = request.cookies.get("token")?.value;

  const isAuthPage = request.nextUrl.pathname.startsWith("/login") || request.nextUrl.pathname.startsWith("/signup");
  const isDashboard = request.nextUrl.pathname.startsWith("/dashboard");

  if (isDashboard) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
    try {
      const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your_long_random_jwt_secret");
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch (err) {
      return NextResponse.redirect(new URL("/login", request.url));
    }
  }

  if (isAuthPage) {
    if (token) {
      try {
        const secret = new TextEncoder().encode(process.env.JWT_SECRET || "your_long_random_jwt_secret");
        await jwtVerify(token, secret);
        return NextResponse.redirect(new URL("/dashboard", request.url));
      } catch (err) {
        return NextResponse.next();
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*", "/login", "/signup"],
};
