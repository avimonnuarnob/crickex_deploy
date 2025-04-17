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
      className="flex items-center gap-6 transition hover:bg-blue-9"
      style={{ padding: "13px 10px 13px 23px" }}
    >
      <img src={icon} alt="home" width={20} height={20} className="w-5" />
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
    <button className="hover:bg-blue-9 flex w-full cursor-pointer items-center gap-6 py-3 pr-3 pl-6 transition">
      <img src={icon} alt="home" width={20} height={20} className="w-5" />
      <span className="flex w-full items-center justify-between">
        <span className="font-bold text-white">{children}</span>
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
