import { addTask } from "../helpers/addTask";

describe("addTask", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test("should add task", async () => {
    const mockResponse = {
      id: "1",
      title: "Test Task",
      description: "Test Description",
    };

    fetchMock.mockResponseOnce(JSON.stringify(mockResponse), { status: 200 });

    const result = await addTask("Test Task", "Test Description");

    expect(result).toEqual(mockResponse);
    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Task",
        description: "Test Description",
      }),
    });
  });

  test("return err if server is not ok", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({ message: "Failed to add task" }),
      { status: 400 }
    );

    await expect(addTask("Test Task", "Test Description")).rejects.toThrow(
      "Failed to add task"
    );

    expect(fetchMock).toHaveBeenCalledWith("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: "Test Task",
        description: "Test Description",
      }),
    });
  });

  test("should return error during unexpected error", async () => {
    fetchMock.mockRejectOnce(new Error("Unexpected error"));

    await expect(addTask("Test Task", "Test Description")).rejects.toThrow(
      "Unexpected error"
    );
  });
});
