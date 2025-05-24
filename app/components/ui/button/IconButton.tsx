import classNames from "classnames";
import Button, { type ButtonProps } from "./Button";

type IconButtonProps<T extends React.ElementType = "button"> =
  ButtonProps<T> & {
    icon: React.ReactNode;
    iconPosition?: "left" | "right";
    children?: React.ReactNode;
    className?: string;
  };

const IconButton = <T extends React.ElementType = "button">({
  icon: Icon,
  iconPosition = "left",
  children,
  as,
  className,
  ...props
}: IconButtonProps<T>) => {
  return (
    <Button
      as={as as React.ElementType}
      {...props}
      className={classNames("flex items-center gap-2.5", className)}
    >
      {iconPosition === "left" && Icon && <>{Icon}</>}
      {children}
      {iconPosition === "right" && Icon && <>{Icon}</>}
    </Button>
  );
};

export default IconButton;
