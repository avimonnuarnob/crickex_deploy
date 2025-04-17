"use client";

import { ProtectedRoute, UnProtectedRoute } from "@/constants/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";

import { useStore } from "zustand";

export const RedirectSignedOut = () => {
  const isAuth = useStore(useAuthStore, ({ isAuth }) => isAuth);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    if (!isAuth && Object.values(ProtectedRoute).includes(pathname as ProtectedRoute)) {
      router.push(UnProtectedRoute.Login);
    }
  }, [isAuth, pathname, router]);

  return null;
};
