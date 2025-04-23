import classNames from "classnames";
import googleIcon from "@/assets/images/icon/google.svg";

import langButton from "@/assets/images/icon/lang.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import { FormTextField } from "@/components/ui/form-inputs";
import { Link } from "react-router";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "@/components/ui/input/SelectInput";
import PhoneInput from "@/components/ui/input/PhoneInput";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
  const [isOpen, setIsOpen] = useState(false);

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

  const loginBtnHandler = () => {
    setIsOpen((isOpen) => !isOpen);
  };

  const onSubmit = (data: LoginInput) => {
    console.log("login data:", data);
  };

  return (
    <>
      <div
        className={classNames(
          "bg-blue-1 fixed z-1 top-0 right-0 border-black",
          {
            "left-15.75": !isFull,
            "left-62.5": isFull,
          }
        )}
      >
        <div
          className={classNames("mx-auto max-w-[1200px]", {
            "w-[calc(100%-(16px*2))]": !isFull,
            "w-[calc(100%-(16px*3.75))]": isFull,
          })}
        >
          <div className="flex h-15 items-center justify-between py-4">
            <div
              style={{
                width: "123px",
                height: "60px",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
                backgroundImage:
                  'url("https://img.c88rx.com/cx/h5/assets/images/logo.png?v=1744705193129")',
              }}
            ></div>
            <div className="flex items-center gap-[5px]">
              <Button
                className="bg-blue-3 min-w-26 rounded-[5px] text-xs"
                onClick={loginBtnHandler}
                // href={UnProtectedRoute.Login}
              >
                Login
              </Button>
              <Button
                className="min-w-26 text-xs"
                color="green"
                // href={UnProtectedRoute.Signup}
              >
                Sign up
              </Button>

              <div className="ml-3">
                <IconButton
                  color="link"
                  icon={
                    <img src={langButton} height={24} width={24} alt="lang" />
                  }
                  className="!p-0"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        onClose={() => {
          setIsOpen(false);
        }}
        isOpen={isOpen}
        title="Login"
      >
        <>
          <br className="block" />
          <div
            className="w-[200px] h-[35px] mx-auto my-7 bg-contain bg-no-repeat bg-center"
            style={{
              backgroundImage:
                'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
            }}
          ></div>

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
              <div className="mb-3.5">
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
              <div className="mb-3.5">
                <PhoneInput
                  label="Phone"
                  id="username"
                  name="username"
                  placeholder="4-15 char, allow numbers, no space"
                  required
                />
              </div>
              <div className="mb-1">
                <SelectInput />
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
    </>
  );
};

export default Topbar;
