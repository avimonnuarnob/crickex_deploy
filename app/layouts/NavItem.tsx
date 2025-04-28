import { useClose } from "@headlessui/react";
import classNames from "classnames";
import { useEffect } from "react";
import { BsChevronDown } from "react-icons/bs";

import { Link } from "react-router";

type NavItemProps = Readonly<{
  href?: string;
  icon: string;
  children: React.ReactNode;
  isChild?: boolean;
  isOpen?: boolean;
  isFull?: boolean;
}>;

const NavItem = ({
  href,
  icon,
  children,
  isChild = false,
  isOpen = false,
  isFull,
}: NavItemProps) => {
  const close = useClose();

  useEffect(() => {
    if (!isFull) {
      close();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFull]);

  return href ? (
    <Link
      to={href}
      className={classNames(
        "flex items-center transition-colors cursor-pointer gap-4",
        {
          "hover:!bg-blue-9": !isChild,
        }
      )}
      style={{
        padding: isFull ? "10px 23px 10px 23px" : "10px 10px 10px 23px",
      }}
    >
      <img src={icon} alt="home" className="w-7.5 h-7.5" />
      <span
        className={classNames("text-base truncate", {
          "font-bold text-white": !isChild,
          "text-dark-1": isChild,
        })}
        style={{ width: "11ch" }}
      >
        {children}
      </span>
    </Link>
  ) : (
    <button
      className="hover:bg-blue-9 flex items-center w-full cursor-pointer gap-4 transition h-[50px]"
      style={{
        padding: isFull ? "10px 18px 10px 23px" : "10px 10px 10px 23px",
      }}
    >
      <img src={icon} alt="home" className="w-7.5 h-7.5" />
      <span className="flex w-full items-center justify-between">
        <span className="text-base font-bold text-white">{children}</span>
        <BsChevronDown
          className={classNames("font-light text-white", {
            "rotate-180": isOpen,
          })}
        />
      </span>
    </button>
  );
};

export default NavItem;
