import { NextResponse } from "next/server";
import { clearAuthCookie } from "../../../helpers/setAuthCookie";
import { revalidatePath, revalidateTag } from "next/cache";

export async function POST() {
  const response = NextResponse.json({ message: "Logged out successfully" });

  clearAuthCookie(response);
  await revalidateTag("tasks");
  await revalidatePath("/todos");

  return response;
}
