import Button from "@/components/ui/button/Button";
import { FormTextField } from "@/components/ui/form-inputs";
import Modal from "@/components/ui/modal/Modal";
import { loginSchema, type LoginInput } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";
import Cookies from "js-cookie";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

export default function LoginModal() {
  const navigate = useNavigate();
  const { isLoggedIn, loginUser } = useCurrentUser();

  const [responseError, setError] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginInput) => {
    setIsLoading(true);
    const respose = await fetch("https://ai.cloud7hub.uk/auth/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username.toLowerCase(),
        password: data.password,
      }),
    });
    const responseData = (await respose.json()) as {
      status: "failed" | "ok";
      errors?: string;
      data?: { token: string; user_base_origin: string };
    };
    setIsLoading(false);
    if (responseData.status === "failed" && responseData.errors) {
      setError(responseData.errors);
    }
    if (responseData.status === "ok" && responseData.data) {
      loginUser(responseData.data.token);
      navigate(-1);
    }
  };
  return (
    <Modal
      onClose={() => {
        navigate(-1);
      }}
      isOpen={true}
      title="Login"
      isFullScreen={true}
    >
      <>
        {/* <br className="block" /> */}

        <div
          className="w-[200px] h-[35px] mx-auto my-7 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
          }}
        ></div>
        {responseError && (
          <p className="text-center bg-red-500 mx-2 py-4 text-white shadow rounded animate-bounce">
            {responseError}
          </p>
        )}
        {isLoggedIn && (
          <p className="text-center bg-green-500 mx-2 py-4 text-white shadow rounded animate-bounce">
            Logging in successful
          </p>
        )}
        <div className="px-4 py-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            <div className="mb-3.5">
              <FormTextField
                control={control}
                label="Username"
                id="username"
                name="username"
                placeholder="4-15 char, allow numbers, no space"
                required
              />
            </div>
            <div className="mb-1">
              <FormTextField
                control={control}
                label="Password"
                id="password"
                name="password"
                type="password"
                placeholder="6-20 characters and Numbers"
                required
              />
            </div>
            <div className="mb-6.25 text-right">
              <Link to="/" className="text-blue-1 text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="mb-4.5">
              <Button
                type="submit"
                color="green"
                size="lg"
                isBlock
                isDisabled={!isDirty}
                isLoading={isLoading}
              >
                Login
              </Button>
            </div>

            <p className="text-gray-3 text-center text-sm mb-1.5">
              Do not have an account?{" "}
              <Link to="/" className="text-blue-1">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </>
    </Modal>
  );
}
