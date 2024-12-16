import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { Form } from "../components/Form";
import { toast } from "react-toastify";
import { authUser } from "../helpers/authUser";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "../hooks/redux";
import { setUser } from "../store/slices/authSlice";
import { AppRouterContextProviderMock } from "../mocks/app-router-context-provider-mock";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));

jest.mock("../helpers/authUser", () => ({
  authUser: jest.fn(),
}));

jest.mock("../hooks/redux", () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock("../store/slices/authSlice", () => ({
  setUser: jest.fn(),
}));

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}));

describe("Form Component", () => {
  const mockPush = jest.fn();
  const mockDispatch = jest.fn();
  useAppDispatch.mockReturnValue(mockDispatch);

  beforeEach(() => {
    useRouter.mockReturnValue({ push: mockPush });
    useAppDispatch.mockReturnValue(mockDispatch);
    jest.clearAllMocks();
  });

  test("renders input fields and buttons", () => {
    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <Form title="login" />
      </AppRouterContextProviderMock>
    );

    expect(screen.getByTestId("email-input")).toBeInTheDocument();
    expect(screen.getByTestId("password-input")).toBeInTheDocument();
    expect(screen.getByTestId("submit-button")).toBeInTheDocument();
    expect(screen.getByTestId("redirect-button")).toBeInTheDocument();
  });

  test("displays toast message if email or password is missing", () => {
    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <Form title="login" />
      </AppRouterContextProviderMock>
    );

    fireEvent.click(screen.getByTestId("submit-button"));

    expect(toast.warn).toHaveBeenCalledWith("Email and password are required", {
      toastId: "missing-fields",
    });
  });

  test("calls authUser and updates state on successful login", async () => {
    authUser.mockResolvedValueOnce({
      email: "test@example.com",
      uid: "12345",
      stsTokenManager: { accessToken: "testToken" },
    });

    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <Form title="login" />
      </AppRouterContextProviderMock>
    );

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    expect(authUser).toHaveBeenCalledWith(
      "login",
      "test@example.com",
      "password123"
    );

    await screen.findByTestId("submit-button"); // Wait for any related side effects

    expect(mockDispatch).toHaveBeenCalledWith(
      setUser({
        email: "test@example.com",
        id: "12345",
        token: "testToken",
      })
    );
    expect(mockPush).toHaveBeenCalledWith("/todos");
    expect(toast.success).toHaveBeenCalledWith("Logged in successfully!");
  });

  test("displays toast on authentication error", async () => {
    // Замокируем ошибку для authUser
    authUser.mockRejectedValueOnce(new Error("Invalid credentials"));

    render(
      <AppRouterContextProviderMock>
        <Form title="login" />
      </AppRouterContextProviderMock>
    );

    fireEvent.change(screen.getByTestId("email-input"), {
      target: { value: "test@example.com" },
    });
    fireEvent.change(screen.getByTestId("password-input"), {
      target: { value: "password" },
    });
    fireEvent.click(screen.getByTestId("submit-button"));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith(
        expect.stringMatching(/Something went wrong: Invalid credentials/),
        expect.objectContaining({
          toastId: "auth-error",
        })
      );
    });

    jest.restoreAllMocks();
  });

  test("redirects to register page on clicking the 'register' button", () => {
    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <Form title="login" />
      </AppRouterContextProviderMock>
    );

    fireEvent.click(screen.getByTestId("redirect-button"));

    expect(mockPush).toHaveBeenCalledWith("/register");
  });

  test("redirects to login page on clicking the 'login' button", () => {
    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <Form title="register" />
      </AppRouterContextProviderMock>
    );

    fireEvent.click(screen.getByTestId("redirect-button"));

    expect(mockPush).toHaveBeenCalledWith("/login");
  });
});
