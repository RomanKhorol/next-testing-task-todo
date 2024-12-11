"use client";

import { useRouter } from "next/navigation";

export default function LogOutBtn() {
  const router = useRouter();
  const handleLogout = async () => {
    try {
      const response = await fetch("/api/logout", {
        method: "POST",
      });

      if (response.ok) {
        router.push("/"); // Перенаправляем пользователя на главную страницу
      } else {
        alert("Logout failed. Please try again.");
      }
    } catch (error) {
      console.error("Logout error:", error);
      alert("An error occurred during logout.");
    }
  };
  return (
    <div>
      <button onClick={handleLogout}>Log Out</button>
    </div>
  );
}
