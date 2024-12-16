import React from "react";
import { Form } from "@/components/Form";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard | Register",
  description: "List of Tasks",
};

export default function Register() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-lg p-6 bg-white rounded shadow-md">
        <Form title="register" />
      </div>
    </div>
  );
}
