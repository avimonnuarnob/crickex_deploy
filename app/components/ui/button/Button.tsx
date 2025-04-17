import classNames from "classnames";
import React from "react";
import Spinner from "../spinner/Spinner";

export type ButtonProps<T extends React.ElementType = "button"> = {
  color?: "blue" | "green" | "red" | "link" | "white" | "yellow";
  isBlock?: boolean;
  size?: "sm" | "md";
  isLoading?: boolean;
  isDisabled?: boolean;
  as?: T;
} & React.ComponentPropsWithoutRef<T>;

const Button = <T extends React.ElementType = "button">({
  color = "blue",
  isBlock = false,
  size = "md",
  isLoading = false,
  isDisabled = false,
  as,
  className,
  children,
  ...props
}: ButtonProps<T>) => {
  const Component: React.ElementType = as || "button";
  const baseClasses =
    "flex items-center justify-center cursor-pointer rounded-sm transition-all disabled:cursor-not-allowed disabled:opacity-80";
  const colorClasses = {
    blue: "bg-blue-1 text-white hover:bg-blue-7 disabled:bg-gray-3",
    green: "bg-green-1 text-white hover:bg-green-600 disabled:bg-gray-3",
    red: "bg-red-1 text-white hover:bg-red-700 disabled:bg-red-400",
    yellow: "bg-yellow-1 text-black hover:bg-yellow-2 disabled:bg-yellow-400",
    link: "bg-transparent text-black",
    white: "bg-white text-gray-9 hover:bg-gray-2 disabled:bg-gray-3 shadow-sm"
  };
  const sizeClasses = {
    sm: "px-6 py-2 text-sm",
    md: "px-6 py-2.5 text-sm",
    lg: "px-7 py-3 text-xs"
  };

  return (
    <Component
      className={classNames(
        baseClasses,
        colorClasses[color],
        sizeClasses[size],
        {
          "w-full": isBlock
        },
        className
      )}
      disabled={isDisabled || isLoading}
      {...props}
    >
      {isLoading && <Spinner />}
      {children}
    </Component>
  );
};

export default Button;
