import { render, screen } from "@testing-library/react";
import Page from "../app/todos/page";
import { redirect } from "next/navigation";
import { getAuthSession } from "../helpers/getAuthSession";
import { AppRouterContextProviderMock } from "../mocks/app-router-context-provider-mock";
import { useRouter } from "next/navigation";

jest.mock("next/navigation", () => ({
  ...jest.requireActual("next/navigation"),
  useRouter: jest.fn(),
  redirect: jest.fn(),
}));

const mockRouter = {
  back: jest.fn(),
  forward: jest.fn(),
  push: jest.fn(),
  replace: jest.fn(),
  refresh: jest.fn(),
  prefetch: jest.fn(),
};
beforeEach(() => {
  jest.spyOn(global, "fetch").mockResolvedValue({
    ok: true,
    json: async () => [], // Тестовые данные для задач
  });
  useRouter.mockReturnValue(mockRouter);
});

jest.mock("../helpers/getAuthSession", () => ({
  getAuthSession: jest.fn(),
}));

global.fetch = jest.fn();

describe("Todos Page", () => {
  afterEach(() => {
    jest.restoreAllMocks();
    jest.clearAllMocks();
  });

  test("renders tasks if session exists and tasks are available", async () => {
    const push = jest.fn();

    getAuthSession.mockResolvedValue({ user: { id: "1" } });
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([
        { id: "1", title: "Task 1" },
        { id: "2", title: "Task 2" },
      ]),
    });
    const renderedPage = await Page();

    render(
      <AppRouterContextProviderMock router={{ push: mockRouter.push }}>
        {renderedPage}
      </AppRouterContextProviderMock>
    );

    expect(screen.getByText("Your Tasks")).toBeInTheDocument();
    expect(screen.getByText("Task 1")).toBeInTheDocument();
    expect(screen.getByText("Task 2")).toBeInTheDocument();
  });

  test("renders 'No tasks are available' if session exists but no tasks are found", async () => {
    const push = jest.fn();

    getAuthSession.mockResolvedValue({ user: { id: "1" } });
    global.fetch.mockResolvedValue({
      ok: true,
      json: jest.fn().mockResolvedValue([]),
    });

    const renderedPage = await Page();

    render(
      <AppRouterContextProviderMock router={{ push: mockRouter.push }}>
        {renderedPage}
      </AppRouterContextProviderMock>
    );

    expect(
      screen.getByText("No tasks available. Start by adding a new task.")
    ).toBeInTheDocument();
  });
});
