"use client";
import React, { FC, useState } from "react";
import { authUser } from "../helpers/authUser";
import { useAppDispatch } from "../hooks/redux";
import { setUser } from "../store/slices/authSlice";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

interface FormProp {
  title: "register" | "login";
}

export const Form: FC<FormProp> = ({ title }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleRedirect = () => {
    router.push(title === "login" ? "/register" : "/login");
  };

  const handleClick = async () => {
    if (!email || !pass) {
      toast.warn("Email and password are required", {
        toastId: "missing-fields",
      });
      return;
    }

    authUser(title, email, pass)
      .then((user) => {
        if (user) {
          dispatch(
            setUser({
              email: user.email,
              id: user.uid,
              token: user.stsTokenManager.accessToken,
            })
          );
          setEmail("");
          setPass("");
        }
        toast.success(
          `${title === "register" ? "Registered" : "Logged in"} successfully!`
        );
        router.push("/todos");
      })
      .catch((error) => {
        const message =
          error instanceof Error
            ? `Something went wrong: ${error.message}. Try to ${
                title === "login" ? "register" : "login"
              }`
            : "An unexpected error occurred";

        toast.error(message, {
          toastId: "auth-error",
        });
      });
  };

  return (
    <div className="flex flex-col items-center bg-gray-100 shadow-md rounded-lg p-6 w-full max-w-md mx-auto">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 capitalize">
        {title}
      </h2>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
        className="w-full px-4 py-2 mb-4 text-gray-800 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="email-input"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
        className="w-full px-4 py-2 mb-4 text-gray-800 bg-white border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        data-testid="password-input"
      />
      <button
        onClick={handleClick}
        className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded transition"
        data-testid="submit-button"
      >
        {title}
      </button>
      <button
        onClick={handleRedirect}
        className="w-full mt-4 text-blue-500 hover:underline font-medium"
        data-testid="redirect-button"
      >
        {title === "login" ? "Register" : "Login"}
      </button>
    </div>
  );
};
