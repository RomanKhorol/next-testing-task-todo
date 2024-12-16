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
      <h2>Oops !!! Unable to login: {error.message}</h2>;
      <button onClick={hadleBack}>Home Page</button>
    </>
  );
};
export default ErrorWrapper;
