"use client";

import React from "react";
import { useRouter } from "next/navigation";

const ErrorWrapper = ({ error }: { error: Error }) => {
  const router = useRouter();
  const hadleBack = () => {
    router.push("/todos");
  };
  return (
    <>
      <h2>Oops !!! Unable to fetch task because: {error.message}</h2>;
      <button onClick={hadleBack}>Back Tasks list</button>
    </>
  );
};
export default ErrorWrapper;
