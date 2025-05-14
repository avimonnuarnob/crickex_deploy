import { navLinks } from "@/constants/navLinks";
import classNames from "classnames";
import { type Dispatch, type SetStateAction } from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import homeIcon from "@/assets/images/icon/home.svg";
import NavItem from "./NavItem";
import Submenu from "./Submenu";
import { useRouteLoaderData } from "react-router";
import type { RootLoaderData } from "@/root";

type SidebarProps = Readonly<{
  isFull: boolean;
  setIsFull: Dispatch<SetStateAction<boolean>>;
}>;

const Sidebar = ({ isFull, setIsFull }: SidebarProps) => {
  const data = useRouteLoaderData<RootLoaderData>("root");

  return (
    <div className={classNames("relative flex-none bg-blue-1 flex flex-col")}>
      {isFull ? (
        <button
          onClick={() => setIsFull((prev) => !prev)}
          className="bg-blue-8 absolute z-20 end-0 top-2 translate-x-1/2 cursor-pointer rounded-2xl pl-3 pr-3 py-[7px]"
        >
          <FaChevronLeft className="text-sm text-white ml-0.5" />
        </button>
      ) : (
        <div className="bg-blue-2 flex h-15 w-full items-center justify-center">
          <button
            onClick={() => setIsFull((prev) => !prev)}
            className="bg-blue-8 cursor-pointer rounded-2xl pl-3 pr-3.5 py-[7px]"
          >
            <FaChevronRight className="text-sm text-white" />
          </button>
        </div>
      )}

      <div
        className={classNames(
          "overflow-x-hidden overflow-y-scroll transition-[width] flex-1 [&::-webkit-scrollbar]:hidden border-r-5 border-[#255c93]",
          {
            "w-15.75": !isFull,
            "w-62.5": isFull,
          }
        )}
      >
        <ul>
          <li
            className={classNames({
              "-ml-[9.5px]": !isFull,
            })}
          >
            <NavItem
              href="/"
              icon={
                "https://img.c88rx.com/cx/h5/assets/images/icon-set/theme-icon/side-nav/icon-home.png?v=1744705193129"
              }
              isFull={isFull}
            >
              Home
            </NavItem>
            <div className="border-blue-3 border-b" />
          </li>

          {data?.gameProviders.map((gameType) => (
            <li
              key={gameType.id}
              className={classNames({
                "-ml-[9.5px]": !isFull,
              })}
            >
              <Submenu
                isFull={isFull}
                icon={"https://ai.cloud7hub.uk" + gameType.thumbnail}
                text={gameType.title}
                children={gameType.game_provider.map((provider) => ({
                  icon: "https://ai.cloud7hub.uk" + provider.thumbnail,
                  text: provider.title,
                  href: `/games/${gameType.game_type_code}#vendor=${provider.provider_code}`,
                }))}
              />
            </li>
          ))}

          {navLinks.map((navLink, index) =>
            navLink.children ? (
              <li
                className={classNames({
                  "-ml-[9.5px]": !isFull,
                })}
                key={index}
                onClick={() => setIsFull(true)}
              >
                <Submenu isFull={isFull} {...navLink} />
              </li>
            ) : (
              <li
                key={index}
                className={classNames({
                  "-ml-[9.5px]": !isFull,
                })}
              >
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
