import { getAuthSession } from "@/helpers/getAuthSession";
import { TaskType } from "../../../models/taskType";
import Link from "next/link";
import { redirect } from "next/navigation";
import React from "react";
import { Metadata } from "next";

interface Props {
  params: {
    id: string;
  };
}
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

async function getTask(id: string): Promise<TaskType | undefined | null> {
  try {
    const response = await fetch(`${apiUrl}/tasks/${id}`, {
      method: "GET",
      credentials: "include",
      next: { tags: ["tasks"] },
    });
    if (!response.ok) {
      throw new Error("Failed to fetch task");
    }
    const task = await response.json();
    return task;
  } catch (error) {
    console.error("Fetch error:", error);
    return null;
  }
}

export async function generateMetadata({
  params: { id },
}: Props): Promise<Metadata> {
  const task = await getTask(id);
  return {
    title: task?.title || "Task Details",
  };
}

export default async function ToDo({ params: { id } }: Props) {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const task = await getTask(id);

  if (!task) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Task Not Found
        </h1>
        <p className="text-gray-600 mb-8">
          The task you are looking for does not exist or may have been deleted.
        </p>
        <Link
          href="/todos"
          className="px-6 py-2 bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Back to Task List
        </Link>
      </div>
    );
  }

  let timestamp = "";
  if (task.timestamp) {
    timestamp = new Date(task.timestamp.seconds * 1000).toLocaleString(
      "en-GB",
      {
        hour12: false,
        timeZone: "UTC",
      }
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-8 sm:px-20">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        <header className="mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">
            {task.title}
          </h1>
          <p className="text-gray-600">
            Created at: <span className="font-medium">{timestamp}</span>
          </p>
        </header>
        <main>
          <p className="text-lg text-gray-700 mb-6">
            <span className="font-bold">Description:</span>{" "}
            {task.description || "No description provided."}
          </p>
          <Link
            href={`/todos/${task.id}/editTask`}
            className="px-6 py-2 bg-yellow-500 text-white rounded shadow hover:bg-yellow-600 transition"
          >
            Edit Task
          </Link>
        </main>
        <footer className="mt-6 text-center">
          <Link
            href="/todos"
            className="text-blue-500 hover:underline transition"
          >
            Back to Task List
          </Link>
        </footer>
      </div>
    </div>
  );
}
