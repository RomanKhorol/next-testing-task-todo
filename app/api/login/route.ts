import { NextRequest, NextResponse } from "next/server";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../lib/firebase";
import { setAuthCookie } from "../../../helpers/setAuthCookie";
import { revalidateTag } from "next/cache";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const token = await user.getIdToken();
    const response = NextResponse.json(
      { message: "Login successful", user },
      { status: 200 }
    );
    setAuthCookie(response, token);
    revalidateTag("tasks");
    return response;
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }
    return NextResponse.json(
      { message: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
