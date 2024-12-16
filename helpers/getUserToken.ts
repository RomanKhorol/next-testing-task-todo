import { getAuth } from "firebase/auth";

export async function getUserToken() {
  const user = getAuth().currentUser;
  if (user) {
    const token = await user.getIdToken();
    console.log("User Token:", token);
    return token;
  }
  throw new Error("User not authenticated");
}
