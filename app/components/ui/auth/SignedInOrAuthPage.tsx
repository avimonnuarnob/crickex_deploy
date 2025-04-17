"use client";

import { GuestRoute } from "@/constants/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import { usePathname, useRouter } from "next/navigation";

import { useEffect, type PropsWithChildren } from "react";
import { useStore } from "zustand";

export const SignedInOrAuthPage = ({ children }: PropsWithChildren) => {
  const isAuth = useStore(useAuthStore, ({ isAuth }) => isAuth);
  const router = useRouter();
  const pathname = usePathname();

  const isAuthRoute = pathname.startsWith("/auth");
  const isProtectedRoute = pathname.startsWith("/user");

  useEffect(() => {
    if (isAuth && isAuthRoute) {
      router.push(GuestRoute.Home);
    }
  }, [isAuth, isAuthRoute, router]);

  if (isAuth || (!isAuth && !isProtectedRoute)) return <>{children}</>;

  return null;
};
