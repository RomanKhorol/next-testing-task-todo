"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

export default function LogOutBtn() {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      const response = await fetch(`${apiUrl}/logout`, {
        method: "POST",
        next: { tags: ["tasks"] },
      });

      if (response.ok) {
        toast.success("Logged out successfully.");
        router.push("/");
      } else {
        toast.warn("Logout failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
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
