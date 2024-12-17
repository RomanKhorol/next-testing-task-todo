import { authUser } from "../helpers/authUser";
import fetchMock from "jest-fetch-mock";

describe("authUser", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  const mockUser = {
    email: "test@example.com",
    stsTokenManager: { accessToken: "mockAccessToken" },
    uid: "mockUID",
  };

  test("should register user and return User obj", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: mockUser }), {
      status: 200,
    });

    const result = await authUser(
      "register",
      "test@example.com",
      "password123"
    );

    expect(result).toEqual(mockUser);
    expect(fetchMock).toHaveBeenCalledWith(
      "http://localhost:3000/api/register",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: "test@example.com",
          password: "password123",
        }),
        next: { tags: ["tasks"] }, // Новое свойство
      }
    );
  });

  test("should login user and return User obj", async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ user: mockUser }), {
      status: 200,
    });

    const result = await authUser("login", "test@example.com", "password123");

    expect(result).toEqual(mockUser);
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "test@example.com",
        password: "password123",
      }),
      next: { tags: ["tasks"] }, // Новое свойство
    });
  });

  test("should return error during server response not ok", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Invalid credentials" }),
      { status: 401 }
    );

    await expect(
      authUser("login", "wrong@example.com", "wrongpassword")
    ).rejects.toThrow("Invalid credentials");

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: "wrong@example.com",
        password: "wrongpassword",
      }),
      next: { tags: ["tasks"] }, // Новое свойство
    });
  });

  test("should return error during unexpected error", async () => {
    fetchMock.mockRejectOnce(new Error("Unexpected error"));

    await expect(
      authUser("register", "test@example.com", "password123")
    ).rejects.toThrow("Unexpected error");
  });
});
