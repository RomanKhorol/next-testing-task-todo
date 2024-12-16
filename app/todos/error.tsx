"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ErrorWrapper = ({ error }: { error: Error }) => {
  const router = useRouter();
  const hadleBack = () => {
    router.push("/");
  };
  return (
    <>
      <h2>Oops !!! Unable to fetch tasks because: {error.message}</h2>;
      <button onClick={hadleBack}>Back to Login</button>
    </>
  );
};
export default ErrorWrapper;
