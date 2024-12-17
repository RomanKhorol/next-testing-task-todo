interface User {
  email: string;
  stsTokenManager: { accessToken: string };

  uid: string;
}
interface ApiResponse {
  user?: User;
  message?: string;
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;
export async function authUser(
  endpoint: "register" | "login",
  email: string,
  password: string
): Promise<User> {
  try {
    const response = await fetch(`${apiUrl}/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
      next: { tags: ["tasks"] },
    });

    const data: ApiResponse = await response.json();
    if (response.ok && data.user) {
      return data.user;
    } else {
      throw new Error(data.message || `Failed to ${endpoint} user`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occurred");
  }
}
