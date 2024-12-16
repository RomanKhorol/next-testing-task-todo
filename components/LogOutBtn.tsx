"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

export default function LogOutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        toast.success("Logged out successfully.");
        router.push("/");
      } else {
        toast.warn("Logout failed. Please try again.");
      }
    } catch (error) {
      toast.error("An unexpected error occurred during logout.");
    }
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 ease-in-out"
    >
      Log Out
    </button>
  );
}
