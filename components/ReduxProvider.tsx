"use client";

import { Provider } from "react-redux";

import React from "react";
import store from "@/store";

export const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider store={store}>{children}</Provider>;
};
