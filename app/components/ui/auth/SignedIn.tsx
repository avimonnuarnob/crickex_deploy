"use client";

import { useAuthStore } from "@/stores/useAuthStore";
import { type PropsWithChildren } from "react";
import { useStore } from "zustand";

export const SignedIn = ({ children }: PropsWithChildren) => {
  const isAuth = useStore(useAuthStore, ({ isAuth }) => isAuth);

  if (isAuth) return <>{children}</>;

  return null;
};
