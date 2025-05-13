import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req });
  console.log(token, "token")
  const isAuth = !!token;

  const { pathname } = req.nextUrl;

  if (!isAuth && pathname !== "/signin") {
    return NextResponse.redirect(new URL("/signin", req.url));
  }

  if (isAuth && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/signin", "/profile", "/easter", "/mypage", "/chat"],
};
