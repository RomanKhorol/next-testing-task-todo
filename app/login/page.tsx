import { Form } from "@/components/Form";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Dashboard | Login",
  description: "List of Tasks",
};

export default function Login() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <Form title="login" />
      </div>
    </div>
  );
}
