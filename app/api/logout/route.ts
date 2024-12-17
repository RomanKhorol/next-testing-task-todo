import { NextResponse } from "next/server";
import { clearAuthCookie } from "../../../helpers/setAuthCookie";
import { revalidateTag } from "next/cache";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  clearAuthCookie(response);
  revalidateTag("tasks");
  return response;
}
