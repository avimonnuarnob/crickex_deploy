"use client";

import { UnProtectedRoute } from "@/constants/routes";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

enum RedirectModal {
  Login = "login",
  Signup = "signup",
  ForgetPassword = "forget-password"
}

const redirectMap: Record<RedirectModal, UnProtectedRoute> = {
  [RedirectModal.Login]: UnProtectedRoute.Login,
  [RedirectModal.Signup]: UnProtectedRoute.Signup,
  [RedirectModal.ForgetPassword]: UnProtectedRoute.ForgotPassword
};

const AuthRedirect = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectModal = searchParams.get("redirect") as RedirectModal | null;

  useEffect(() => {
    if (!redirectModal || !(redirectModal in redirectMap)) return;

    router.replace(redirectMap[redirectModal]);
  }, [redirectModal, router]);

  return <></>;
};

export default AuthRedirect;
