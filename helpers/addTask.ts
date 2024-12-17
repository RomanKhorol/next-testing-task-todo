import { TaskType } from "@/models/taskType";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export async function addTask(
  title: string,
  description: string
): Promise<TaskType> {
  try {
    const response = await fetch(`${apiUrl}/api/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description }),
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.message || `Failed to add task`);
    }
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    throw new Error("Unexpected error occurred");
  }
}
