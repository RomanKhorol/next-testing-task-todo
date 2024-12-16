import { cookies } from "next/headers";
import { auth } from "../app/lib/firebaseAdmin";

export async function getAuthSession() {
  const cookieStore = cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) return null;

  try {
    const decodedToken = await auth.verifyIdToken(token);
    return decodedToken;
  } catch (error) {
    return null;
  }
}
