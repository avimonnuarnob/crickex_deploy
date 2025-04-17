"use client";

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

const TextField = ({ label, id, type = "text", error, className, ...props }: FormTextFieldProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const isPassword = type === "password";

  return (
    <div className='w-full'>
      {label && (
        <label htmlFor={id} className='mb-1.5 block text-[#474747]'>
          {label}
        </label>
      )}
      <div className='relative mb-1'>
        <input
          id={id}
          type={isPassword && showPassword ? "text" : type}
          className={classNames(
            "border-gray-7 bg-gray-8 focus:ring-blue-1 w-full rounded-sm border px-3 py-3.5 text-xs transition-all focus:ring-1 focus:outline-none",
            {
              "border-red-1 focus:ring-2 focus:ring-red-400": !!error
            },
            className
          )}
          {...props}
        />
        {isPassword && (
          <button
            type='button'
            onClick={() => setShowPassword(!showPassword)}
            className='absolute top-1/2 right-3 -translate-y-1/2'
          >
            {showPassword ? <FaEyeSlash className='text-gray-3 text-sm' /> : <FaEye className='text-gray-3 text-sm' />}
          </button>
        )}
      </div>
      {error && <p className='text-red-1 text-xs'>{error.message}</p>}
    </div>
  );
};

export default TextField;
