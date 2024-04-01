import { NextRequest, NextResponse } from "next/server";
import { withAuth } from "next-auth/middleware";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(request) {
    const token = request.nextauth.token;
    const pathname = request.nextUrl.pathname;
    // All users won't access api
    // if (pathname.startsWith("/api")) {
    //   return NextResponse.redirect(new URL("/", request.url));
    // }

    if (
      pathname.startsWith("/fan/login") ||
      pathname.startsWith("/fan/register")
    ) {
      // Authenticated
      if (token) return NextResponse.redirect(new URL("/", request.url));
    }

    // Manager pages authentication
    if (pathname.startsWith("/manager")) {
      // Not Authenticated
      if (!token) return NextResponse.redirect(new URL("/", request.url));
      if (token && (token?.role == "fan" || token?.role == "admin"))
        return NextResponse.redirect(new URL("/", request.url));
    }
    // Admin pages authentication
    if (pathname.startsWith("/admin")) {
      // Not Authenticated
      if (!token) return NextResponse.redirect(new URL("/", request.url));
      if (token && token?.role == "fan")
        return NextResponse.redirect(new URL("/", request.url));
      if (token && token?.role == "manager")
        return NextResponse.redirect(new URL("/manager", request.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log("token", token);
        return true;
      },
    },
    secret: process.env.NEXTAUTH_SECRET,
  }
);
