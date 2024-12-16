import React from "react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Main Page",
  description: "Page for Login and Password",
};

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-8 sm:px-20">
      <header className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Welcome to the Dashboard
        </h1>
        <p className="text-lg text-gray-600">
          Manage your tasks efficiently and stay organized.
        </p>
      </header>
      <main className="flex flex-col gap-6 items-center sm:items-start">
        <Link
          href="/login"
          className="px-6 py-3 text-lg bg-blue-500 text-white rounded shadow hover:bg-blue-600 transition"
        >
          Log In
        </Link>
        <span className="text-gray-600 text-lg">or</span>
        <Link
          href="/register"
          className="px-6 py-3 text-lg bg-green-500 text-white rounded shadow hover:bg-green-600 transition"
        >
          Register
        </Link>
      </main>
      <footer className="mt-12 text-center text-gray-500">
        <p className="text-sm">© 2024 Created by Gordiienko</p>
      </footer>
    </div>
  );
}
