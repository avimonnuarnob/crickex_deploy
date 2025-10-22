import { navLinks } from "@/constants/navLinks";
import classNames from "classnames";
import {
  useState,
  useTransition,
  type Dispatch,
  type SetStateAction,
} from "react";
import { FaChevronRight, FaChevronLeft } from "react-icons/fa6";
import NavItem from "./NavItem";
import Submenu from "./Submenu";
import { useRouteLoaderData } from "react-router";
import type { RootLoaderData } from "@/root";

import { motion } from "motion/react";

import homeIcon from "@/assets/images/icon-home.png";

type SidebarProps = Readonly<{
  isFull: boolean;
  setIsFull: Dispatch<SetStateAction<boolean>>;
}>;

const Sidebar = ({ isFull, setIsFull }: SidebarProps) => {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const [activeDisclosurePanel, setActiveDisclosurePanel] = useState<any>(null);

  const [isPending, startTransition] = useTransition();

  function togglePanels(newPanel: any) {
    if (activeDisclosurePanel) {
      if (
        activeDisclosurePanel.key !== newPanel.key &&
        activeDisclosurePanel.open
      ) {
        activeDisclosurePanel.close();
      }
    }

    setActiveDisclosurePanel({
      ...newPanel,
      open: !newPanel.open,
    });
  }
  return (
    <div
      className={classNames(
        "relative flex-none bg-blue-1 hidden sm:flex flex-col z-20 max-h-dvh"
      )}
      style={{
        viewTransitionName: "sidebar",
      }}
    >
      {isFull ? (
        <button
          onClick={() => {
            startTransition(() => {
              setIsFull((prev) => !prev);
            });
          }}
          className="bg-blue-8 absolute z-20 end-0 top-2 translate-x-1/2 cursor-pointer rounded-2xl pl-3 pr-3 py-[7px]"
        >
          <motion.div
            animate={{ rotate: 0, opacity: 1, transition: { duration: 0.5 } }}
            initial={{ rotate: 180, opacity: 0.5 }}
          >
            <FaChevronLeft className="text-sm text-white ml-0.5" />
          </motion.div>
        </button>
      ) : (
        <div
          className={classNames(
            "bg-blue-2 flex h-15 w-full items-center justify-center transition duration-500 opacity-0",
            {
              "opacity-100": !isFull,
            }
          )}
        >
          <button
            onClick={() => {
              startTransition(() => {
                setIsFull((prev) => !prev);
              });
            }}
            className="bg-blue-8 cursor-pointer rounded-2xl pl-3 pr-3.5 py-[7px]"
          >
            <motion.div
              animate={{
                rotate: 0,
                opacity: 1,
                transition: {
                  duration: 0.5,
                },
              }}
              initial={{ opacity: 0, rotate: -180 }}
            >
              <FaChevronRight className="text-sm text-white" />
            </motion.div>
          </button>
        </div>
      )}

      <div
        className={classNames(
          "overflow-x-hidden overflow-y-scroll transition-[width] transition-discrete ease-in duration-500 flex-1",
          {
            "w-15.75": !isFull,
            "w-62.5": isFull,
          }
        )}
      >
        <ul
          onClick={() => {
            if (!isFull) {
              setIsFull(true);
            }
          }}
        >
          <li
            className={classNames({
              "-ml-[9.5px]": !isFull,
            })}
          >
            <NavItem href="/" icon={homeIcon} isFull={isFull}>
              Home
            </NavItem>
            <div className="border-blue-3 border-b" />
          </li>

          {data?.gameProviders
            .filter((gameType) => gameType.top_menu)
            .map((gameType) => (
              <li
                key={gameType.id}
                className={classNames({
                  "-ml-[9.5px]": !isFull,
                })}
              >
                <Submenu
                  isFull={isFull}
                  icon={`/game_type/${gameType.game_type_code}.png`}
                  text={gameType.title}
                  children={gameType.game_provider.map((provider) => ({
                    icon:
                      import.meta.env.VITE_API_URL + "" + provider.thumbnail,
                    text: provider.title,
                    href: `/games/${gameType.game_type_code}#vendor=${provider.provider_code}`,
                  }))}
                  togglePanels={togglePanels}
                  index={gameType.game_type_code + gameType.id}
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
                <Submenu
                  isFull={isFull}
                  {...navLink}
                  togglePanels={togglePanels}
                  index={"navlink" + index}
                />
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
          {/* design purpose 🤷 */}
          <li
            className={classNames({
              "-ml-[9.5px]": !isFull,
            })}
          >
            <div
              className={classNames(
                "flex items-center transition-colors gap-4"
              )}
              style={{
                padding: isFull ? "10px 23px 10px 23px" : "10px 10px 10px 23px",
              }}
            >
              <div className="w-7.5 h-7.5" />
              <span style={{ width: "11ch" }}></span>
            </div>
          </li>
          {/* design purpose 🤷 */}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
