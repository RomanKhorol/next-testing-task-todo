import React from "react";
import { AddTaskForm } from "@/components/TaskForm";
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Dashboard | Add Task",
  description: "List of Tasks",
};
export default function AddTaskPage() {
  return (
    <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Add a New Task</h2>
      <AddTaskForm
        apiEndpoint="http://localhost:3000/api/tasks"
        method="POST"
      />
    </div>
  );
}
