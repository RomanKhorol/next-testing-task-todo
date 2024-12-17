import { render, screen, fireEvent, waitFor } from "@testing-library/react";
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

// Мок useRouter
const mockPush = jest.fn();
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(() => ({
    push: mockPush,
  })),
}));

// Мокаем fetch глобально
beforeEach(() => {
  jest.clearAllMocks();
  global.fetch = jest.fn();
});

const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

describe("LogOutBtn Component", () => {
  // Проверяем рендер кнопки
  test("renders the logout button", () => {
    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    expect(screen.getByText("Log Out")).toBeInTheDocument();
  });

  // Проверяем успешный сценарий
  test("calls fetch and redirects to '/' on successful logout", async () => {
    global.fetch.mockResolvedValueOnce({ ok: true });

    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/logout`,
      expect.objectContaining({
        method: "POST",
        next: { tags: ["tasks"] },
      })
    );

    expect(toast.success).toHaveBeenCalledWith("Logged out successfully.");
    expect(mockPush).toHaveBeenCalledWith("/");
  });

  // Проверяем ошибку сервера
  test("shows a toast message on failed logout", async () => {
    global.fetch.mockResolvedValueOnce({ ok: false });

    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/logout`,
      expect.objectContaining({
        method: "POST",
        next: { tags: ["tasks"] },
      })
    );

    expect(toast.warn).toHaveBeenCalledWith("Logout failed. Please try again.");
    expect(mockPush).not.toHaveBeenCalled();
  });

  // Проверяем сетевую ошибку
  test("handles fetch error gracefully", async () => {
    global.fetch.mockRejectedValueOnce(new Error("Network error"));

    render(
      <AppRouterContextProviderMock router={{ push: mockPush }}>
        <LogOutBtn />
      </AppRouterContextProviderMock>
    );

    fireEvent.click(screen.getByText("Log Out"));

    await waitFor(() => expect(global.fetch).toHaveBeenCalledTimes(1));

    expect(global.fetch).toHaveBeenCalledWith(
      `${apiUrl}/logout`,
      expect.objectContaining({
        method: "POST",
        next: { tags: ["tasks"] },
      })
    );

    expect(toast.error).toHaveBeenCalledWith(
      "An unexpected error occurred during logout."
    );
    expect(mockPush).not.toHaveBeenCalled();
  });
});
