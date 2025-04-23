import classNames from "classnames";
import React, { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import type { FieldError } from "react-hook-form";

type FormTextFieldProps = (
  | {
      label: string;
      id: string;
    }
  | {
      label?: never;
      id?: string;
    }
) & {
  error?: FieldError;
} & React.InputHTMLAttributes<HTMLInputElement>;

const PhoneInput = ({
  label,
  id,
  type = "text",
  error,
  className,
  ...props
}: FormTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className="w-full">
      {label && (
        <label htmlFor={id} className="mb-3.5 block text-[#474747] text-sm">
          {label}
        </label>
      )}
      <div className="flex bg-[#eeeeee] items-center">
        <div className="w-[28%] flex gap-2 justify-center items-center bg-[#eeeeee]">
          <img
            src="https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1745315485946&source=mcdsrc"
            className="w-5 h-5 rounded-full"
          />
          <span className="text-xs font-light">+880</span>
        </div>
        <div className="w-0.5 bg-[#6666661a] h-5"></div>
        <div className="relative flex-1">
          <input
            id={id}
            type={isPassword && showPassword ? "text" : type}
            className={classNames(
              "border-none bg-gray-8 focus:ring-blue-1 w-full border px-3 py-3.5 text-xs transition-all focus:ring-1 focus:outline-none",
              {
                "border-red-1 focus:ring-2 focus:ring-red-400": !!error,
              },
              className
            )}
            {...props}
          />
          {isPassword && (
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute top-1/2 right-3 -translate-y-1/2"
            >
              {showPassword ? (
                <FaEyeSlash className="text-gray-3 text-sm" />
              ) : (
                <FaEye className="text-gray-3 text-sm" />
              )}
            </button>
          )}
        </div>
      </div>
      {error && <p className="text-red-1 text-xs">{error.message}</p>}
    </div>
  );
};

export default PhoneInput;
