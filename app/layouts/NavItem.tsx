import { useClose } from "@headlessui/react";
import classNames from "classnames";
import { useEffect } from "react";
import { HiChevronDown } from "react-icons/hi";
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
      className="flex items-center transition cursor-pointer gap-4 hover:bg-blue-9"
      style={{
        padding: isFull ? "10px 10px 10px 23px" : "10px 0 10px 13.6px",
      }}
    >
      <img
        src={
          "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-home.png?v=1744705193129"
        }
        alt="home"
        className="w-7.5"
      />
      <span
        className={classNames("text-base", {
          "font-bold text-white": !isChild,
          "text-dark-1": isChild,
        })}
      >
        {children}
      </span>
    </Link>
  ) : (
    <button
      className="hover:bg-blue-9 flex w-full cursor-pointer items-center gap-4 transition"
      style={{
        padding: isFull ? "10px 10px 10px 23px" : "10px 0 10px 13.6px",
      }}
    >
      <img
        src="https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/nav/icon-sport.png?v=1744705193129"
        alt="home"
        className="w-7.5"
      />
      <span className="flex w-full items-center justify-between">
        <span className="text-base font-bold text-white">{children}</span>
        <HiChevronDown
          className={classNames("text-base text-white", {
            "rotate-180": isOpen,
          })}
        />
      </span>
    </button>
  );
};

export default NavItem;
