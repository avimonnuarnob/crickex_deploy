import { navLinks } from "@/constants/navLinks";
import classNames from "classnames";
import { type Dispatch, type SetStateAction } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi";
import homeIcon from "@/assets/images/icon/home.svg";
import NavItem from "./NavItem";
import Submenu from "./Submenu";

type SidebarProps = Readonly<{
  isFull: boolean;
  setIsFull: Dispatch<SetStateAction<boolean>>;
}>;

const Sidebar = ({ isFull, setIsFull }: SidebarProps) => {
  return (
    <div className={classNames("bg-blue-1 relative z-100 h-full flex-none")}>
      {isFull && (
        <button
          onClick={() => setIsFull((prev) => !prev)}
          className="bg-blue-8 absolute end-0 top-2 z-1 translate-x-1/2 cursor-pointer rounded-2xl px-2.5 py-1"
        >
          <HiChevronLeft className="text-xl text-white" />
        </button>
      )}
      <div
        className={classNames("overflow-hidden transition-[width]", {
          "w-16": !isFull,
          "w-61": isFull,
        })}
      >
        <ul className="h-dvh">
          {isFull ? (
            <li className="relative">
              <NavItem href="/" icon={homeIcon}>
                Home
              </NavItem>
              <div className="border-blue-3 border-b" />
            </li>
          ) : (
            <>
              <li>
                <div className="bg-blue-2 flex h-15 w-full items-center justify-center">
                  <button
                    onClick={() => setIsFull((prev) => !prev)}
                    className="bg-blue-8 cursor-pointer rounded-2xl px-2.5 py-1"
                  >
                    <HiChevronRight className="text-xl text-white" />
                  </button>
                </div>
              </li>
              <li className={classNames("relative", { "-ml-1": !isFull })}>
                <NavItem href="/" icon={homeIcon}>
                  Home
                </NavItem>
                <div className="border-blue-3 border-b" />
              </li>
            </>
          )}

          {navLinks.map((navLink, index) =>
            navLink.children ? (
              <li
                key={index}
                onClick={() => setIsFull(true)}
                className={classNames({ "-ml-1": !isFull })}
              >
                <Submenu isFull={isFull} {...navLink} />
              </li>
            ) : (
              <li key={index} className={classNames({ "-ml-1": !isFull })}>
                <NavItem {...navLink}>{navLink.text}</NavItem>
              </li>
            )
          )}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
