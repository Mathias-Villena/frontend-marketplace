import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const role = req.cookies.get("role")?.value || "";

  const adminRoutes = ["/admin"];
  const isAdminRoute = adminRoutes.some((r) =>
    req.nextUrl.pathname.startsWith(r)
  );

  if (isAdminRoute && role !== "ADMIN") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
