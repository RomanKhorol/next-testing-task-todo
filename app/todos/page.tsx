import { redirect } from "next/navigation";
import { getAuthSession } from "../../helpers/getAuthSession";
import LogOutBtn from "../../components/LogOutBtn";
import { TaskType } from "../../models/taskType";
import Link from "next/link";
import React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | List of Tasks",
  description: "List of Tasks",
};

async function getTasks(): Promise<TaskType[]> {
  try {
    const response = await fetch("http://localhost:3000/api/tasks");
    if (!response.ok) {
      throw new Error("Failed to fetch tasks");
    }
    const data = await response.json();

    return Array.isArray(data) ? data : [];
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    return [];
  }
}

export default async function Todos() {
  const session = await getAuthSession();

  if (!session) {
    redirect("/");
  }

  const tasks = await getTasks();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-8 sm:px-20">
      <header className="text-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Your Tasks</h1>
        <p className="text-lg text-gray-600">
          Manage your tasks effectively and stay on top of your goals.
        </p>
      </header>
      <main className="w-full max-w-2xl bg-white shadow-lg rounded-lg p-6">
        {tasks.length > 0 ? (
          <ul className="space-y-4">
            {tasks.map((task: TaskType) => (
              <li
                key={task.id}
                className="flex justify-between items-center border-b pb-2 last:border-b-0"
              >
                <Link
                  href={`/todos/${task.id}`}
                  className="text-blue-500 hover:underline"
                >
                  {task.title}
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-600 text-center">
            No tasks available. Start by adding a new task.
          </p>
        )}
        <div className="mt-6 flex justify-between items-center">
          <Link
            href="/addtask"
            className="px-6 py-2 bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
          >
            Add New Task
          </Link>
          <LogOutBtn />
        </div>
      </main>
    </div>
  );
}
