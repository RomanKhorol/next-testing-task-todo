import { NextResponse } from "next/server";
import { clearAuthCookie } from "../../helpers/setAuthCookie";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  
  clearAuthCookie(response);


  return response;
}
