import { render, screen, fireEvent } from "@testing-library/react";
import LogOutBtn from "../components/LogOutBtn";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import { AppRouterContextProviderMock } from "../mocks/app-router-context-provider-mock";

jest.mock("react-toastify", () => ({
  toast: {
    warn: jest.fn(),
    error: jest.fn(),
    success: jest.fn(),
  },
}));
const mockPush = jest.fn();

jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

describe("LogOutBtn Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders the logout button", () => {
    const push = jest.fn();

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByText("Log Out");
    expect(button).toBeInTheDocument();
  });

  test("calls fetch and redirects to '/' on successful logout", async () => {
    const push = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
      })
    );

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByText("Log Out");
    fireEvent.click(button);
    await screen.findByText("Log Out");
    expect(global.fetch).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });

    expect(mockPush).toHaveBeenCalledWith("/");
  });

  test("shows a toast message on failed logout", async () => {
    const push = jest.fn();

    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: false,
      })
    );

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByText("Log Out");
    fireEvent.click(button);

    expect(global.fetch).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });

    await screen.findByText("Log Out");

    expect(toast.warn).toHaveBeenCalledWith("Logout failed. Please try again.");
  });

  test("shows a toast message on fetch error", async () => {
    const push = jest.fn();

    global.fetch = jest.fn(() => Promise.reject(new Error("Network error")));

    render(
      <AppRouterContextProviderMock router={{ push }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    const button = screen.getByText("Log Out");
    fireEvent.click(button);

    expect(global.fetch).toHaveBeenCalledWith("/api/logout", {
      method: "POST",
    });

    await screen.findByText("Log Out");

    expect(toast.error).toHaveBeenCalledWith(
      "An unexpected error occurred during logout."
    );
  });
});
