import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import { AddTaskForm } from "../components/TaskForm";
import { AppRouterContextProviderMock } from "../mocks/app-router-context-provider-mock";
import "@testing-library/jest-dom";

const mockApiEndpoint = "/api/tasks";

// Мокаем глобальный fetch
global.fetch = jest.fn(async (url, options) => {
  console.log("Fetch called with:", url, options);

  if (options?.next) {
    delete options.next; // Удаляем `next`, если он был
  }

  return {
    ok: true,
    json: jest.fn().mockResolvedValue({}),
  };
});

describe("AddTaskForm", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("should render correctly with initial values", async () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AddTaskForm
          initialTitle="Initial Task"
          initialDescription="Initial Description"
          method="POST"
          apiEndpoint={mockApiEndpoint}
        />
      </AppRouterContextProviderMock>
    );

    expect(screen.getByPlaceholderText("Enter title").value).toBe(
      "Initial Task"
    );
    expect(screen.getByPlaceholderText("Enter description").value).toBe(
      "Initial Description"
    );
  });

  test("should validate inputs before submitting", async () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AddTaskForm method="POST" apiEndpoint={mockApiEndpoint} />
      </AppRouterContextProviderMock>
    );

    const submitButton = screen.getByText("Submit");
    await act(async () => {
      fireEvent.click(submitButton);
    });

    expect(global.fetch).not.toHaveBeenCalled();
  });

  test("should submit form and call API on successful task creation", async () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AddTaskForm
          method="POST"
          apiEndpoint={mockApiEndpoint}
          initialTitle="Test Task"
          initialDescription="Test Description"
        />
      </AppRouterContextProviderMock>
    );

    const submitButton = screen.getByText("Submit");

    await act(async () => {
      fireEvent.click(submitButton);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        mockApiEndpoint,
        expect.objectContaining({
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: "Test Task",
            description: "Test Description",
          }),
        })
      );
    });
  });

  test("should delete a task and call API correctly without 'next' affecting behavior", async () => {
    const push = jest.fn();
    render(
      <AppRouterContextProviderMock router={{ push }}>
        <AddTaskForm
          id="1"
          method="DELETE"
          apiEndpoint={mockApiEndpoint}
          initialTitle="Test Task"
          initialDescription="Test Description"
        />
      </AppRouterContextProviderMock>
    );

    const deleteButton = screen.getByText("Delete");

    await act(async () => {
      fireEvent.click(deleteButton);
    });

    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith(
        mockApiEndpoint,
        expect.objectContaining({
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
        })
      );
    });
  });
});
