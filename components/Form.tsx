"use client";

import { authUser } from "@/app/helpers/authUser";
import { useAppDispatch } from "@/hooks/redux";
import { setUser } from "@/store/slices/AuthSlice";
import { FC, useState } from "react";
import { useRouter } from "next/navigation";

interface FormProp {
  title: "register" | "login";
}

export const Form: FC<FormProp> = ({ title }) => {
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const dispatch = useAppDispatch();
  const router = useRouter();
  const handleClick = async () => {
    if (!email || !pass) {
      alert("Email and password are required");
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
        router.push("/todos");
      })
      .catch((error) => {
        console.error("Error during authentication:", error.message);
        alert(`Something went wrong: ${error.message}`);
      });
  };
  return (
    <div>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="email"
      />
      <input
        type="password"
        value={pass}
        onChange={(e) => setPass(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleClick}>{title}</button>
    </div>
  );
};
