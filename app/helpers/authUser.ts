interface User {
  email: string;
  stsTokenManager: { accessToken: string };

  uid: string;
}
interface ApiResponse {
  user?: User;
  message?: string;
}

export async function authUser(
  endpoint: "register" | "login",
  email: string,
  password: string
): Promise<User> {
  try {
    const response = await fetch(`http://localhost:3000/api/${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data: ApiResponse = await response.json();
    if (response.ok && data.user) {
      return data.user;
    } else {
      throw new Error(data.message || `Failed to ${endpoint} user`);
    }
  } catch (error) {
    if (error instanceof Error) {
      alert(
        `${endpoint.charAt(0).toUpperCase() + endpoint.slice(1)} failed: ${
          error.message
        }`
      );
      throw error;
    }
    throw new Error("Unexpected error occurred");
  }
}
