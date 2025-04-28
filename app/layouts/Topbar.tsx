import classNames from "classnames";
import googleIcon from "@/assets/images/icon/google.svg";

import langButton from "@/assets/images/icon/lang.svg";
import Button from "@/components/ui/button/Button";
import IconButton from "@/components/ui/button/IconButton";
import { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import { FormTextField } from "@/components/ui/form-inputs";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { loginSchema, type LoginInput } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectInput from "@/components/ui/input/SelectInput";
import PhoneInput from "@/components/ui/input/PhoneInput";

type TopbarProps = Readonly<{
  isFull: boolean;
}>;

const Topbar = ({ isFull }: TopbarProps) => {
  const navigate = useNavigate();

  const loginBtnHandler = () => {
    navigate("/account-login-quick");
  };

  const signupBtnHandler = () => {
    navigate("/new-register-entry/account");
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
            <div className="flex items-center gap-[5px] justify-between">
              <Button
                className="bg-blue-3 text-xs w-[105px] h-[34px]"
                onClick={loginBtnHandler}
                // href={UnProtectedRoute.Login}
              >
                Login
              </Button>
              <Button
                className="text-xs w-[105px] h-[34px]"
                color="green"
                onClick={signupBtnHandler}
                // href={UnProtectedRoute.Signup}
              >
                Sign up
              </Button>

              <div className="ml-3 grow-0">
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
    </>
  );
};

export default Topbar;
