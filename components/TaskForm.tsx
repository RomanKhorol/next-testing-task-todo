"use client";

import React, { FC, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface AddTaskFormProps {
  initialTitle?: string;
  initialDescription?: string;
  id?: string;
  method: string;
  apiEndpoint: string;
}

export const AddTaskForm: FC<AddTaskFormProps> = ({
  initialTitle = "",
  initialDescription = "",
  method,
  apiEndpoint,
  id,
}) => {
  const [title, setTitle] = useState(initialTitle);
  const [description, setDescription] = useState(initialDescription);
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleCancel = () => {
    setTitle(initialTitle);
    setDescription(initialDescription);
    router.push("/todos");
  };

  const handleDelete = async (): Promise<void> => {
    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to delete task");
      }

      toast.success("Task deleted successfully!");
      router.push("/todos");
    } catch (error) {
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async () => {
    if (!title || !description) {
      toast.warn("Title and description are required");
      return;
    }

    try {
      setLoading(true);
      const response = await fetch(apiEndpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || "Failed to submit task");
      }

      toast.success(
        `Task ${method === "POST" ? "created" : "updated"} successfully!`
      );
      router.push("/todos");
    } catch (error) {
      toast.error(
        `Error: ${error instanceof Error ? error.message : "Unknown error"}`
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        {method === "POST" ? "Add New Task" : "Edit Task"}
      </h1>
      <div className="mb-4">
        <label
          htmlFor="title"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
        />
      </div>
      <div className="mb-6">
        <label
          htmlFor="description"
          className="block text-sm font-medium text-gray-600 mb-1"
        >
          Description
        </label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter description"
          className="w-full px-4 py-2 border rounded-lg text-gray-800 focus:ring-2 focus:ring-blue-400 outline-none"
          rows={4}
        />
      </div>
      <div className="flex gap-4">
        <button
          onClick={handleSubmit}
          className={`px-4 py-2 rounded-lg text-white ${
            loading ? "bg-gray-400" : "bg-blue-500 hover:bg-blue-600"
          }`}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>
        {id && (
          <button
            onClick={() => handleDelete()}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400" : "bg-red-500 hover:bg-red-600"
            }`}
            disabled={loading}
          >
            {loading ? "Deleting..." : "Delete"}
          </button>
        )}
        <button
          onClick={handleCancel}
          className="px-4 py-2 rounded-lg text-gray-700 bg-gray-200 hover:bg-gray-300"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
