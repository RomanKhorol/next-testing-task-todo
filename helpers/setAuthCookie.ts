import { NextResponse } from "next/server";

export function setAuthCookie(response: NextResponse, token: string) {
  response.cookies.set("token", token, {
    httpOnly: false,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });
}
export function clearAuthCookie(response: NextResponse) {
  response.cookies.set("token", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 0,
  });
}
