import { bottomNavLinks, topNavLinks } from "@/constants/navLinks";
import classNames from "classnames";
import {
  useEffect,
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
import type { GAMES } from "@/routes/game-type";
import Modal from "@/components/ui/modal/Modal";
import { useNavigate } from "react-router";
import Button from "@/components/ui/button/Button";
import talkIcon from "@/assets/images/icon-talk.png";
import messengerIcon from "@/assets/images/icon-facebook-messenger.png";
import emailIcon from "@/assets/images/icon-email.png";
import telegramIcon from "@/assets/images/icon-telegram.png";

type SidebarProps = Readonly<{
  isFull: boolean;
  setIsFull: Dispatch<SetStateAction<boolean>>;
}>;

const Sidebar = ({ isFull, setIsFull }: SidebarProps) => {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const navigate = useNavigate();

  const [activeDisclosurePanel, setActiveDisclosurePanel] = useState<any>(null);
  const [sportsGames, setSportsGames] = useState<GAMES>();
  const [hotGames, setHotGames] = useState<GAMES>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `/game/getGameListByType/SB/`)
      .then((response) => response.json())
      .then((d) => setSportsGames(d.data));
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `/game/getGameListByType/HT/`)
      .then((response) => response.json())
      .then((d) => setHotGames(d.data));
  }, []);

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

  const loginBtnHandler = () => {
    setIsModalOpen(false);
    navigate("/account-login-quick" + location.hash);
  };

  const signupBtnHandler = () => {
    setIsModalOpen(false);
    navigate("/new-register-entry/account" + location.hash);
  };
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
            .map((gameType) => {
              if (gameType.game_type_code === "HT") {
                return (
                  <li
                    key={gameType.id}
                    className={classNames({
                      "-ml-[9.5px]": !isFull,
                    })}
                  >
                    {hotGames && (
                      <Submenu
                        isFull={isFull}
                        icon={`/game_type/${gameType.game_type_code}.png`}
                        text={"HOT"}
                        children={hotGames?.map((game) => {
                          return {
                            icon: game.imgFileName.startsWith("/")
                              ? import.meta.env.VITE_GAME_IMG_URL +
                                game.imgFileName
                              : game.imgFileName,
                            text: game.gameName.gameName_enus,
                            href: `/open-game/${game.p_code}/${game.p_type}/${game.g_code}/${game.operator}`,
                            setIsModalOpen,
                          };
                        })}
                        togglePanels={togglePanels}
                        index={gameType.game_type_code + gameType.id}
                      />
                    )}
                  </li>
                );
              }
              if (gameType.game_type_code === "SB") {
                return (
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
                      children={gameType.game_provider.map((provider) => {
                        const game = sportsGames?.filter(
                          (game) => game.p_code === provider.provider_code
                        );
                        return {
                          setIsModalOpen:
                            game?.length === 1 ? setIsModalOpen : undefined,
                          icon:
                            import.meta.env.VITE_API_URL +
                            "" +
                            provider.thumbnail,
                          text: provider.title,
                          href:
                            game?.length === 1
                              ? `/open-game/${game[0].p_code}/${game[0].p_type}/${game[0].g_code}/${game[0].operator}`
                              : `/games/${gameType.game_type_code}#vendor=${provider.provider_code}`,
                        };
                      })}
                      togglePanels={togglePanels}
                      index={gameType.game_type_code + gameType.id}
                    />
                  </li>
                );
              }
              return (
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
              );
            })}

          {topNavLinks.map((navLink, index) => (
            <li
              key={index}
              className={classNames({
                "-ml-[9.5px]": !isFull,
              })}
            >
              <NavItem {...navLink}>{navLink.text}</NavItem>
            </li>
          ))}

          {data?.socialList && (
            <li
              className={classNames({
                "-ml-[9.5px]": !isFull,
              })}
            >
              <Submenu
                isFull={isFull}
                icon={talkIcon}
                text="Contact Us"
                children={data?.socialList
                  .filter((socialLink) => {
                    return socialLink.status && socialLink.floating;
                  })
                  .map((socialLink) => ({
                    icon:
                      socialLink.social_prefix_id.name === "Telegram"
                        ? telegramIcon
                        : socialLink.social_prefix_id.name === "Email"
                        ? emailIcon
                        : socialLink.social_prefix_id.name === "Messenger"
                        ? messengerIcon
                        : socialLink.social_prefix_id.name === "T-Channel"
                        ? telegramIcon
                        : "",
                    text: socialLink.social_prefix_id.name,
                    href: `${socialLink.social_prefix_id.prefix}${socialLink.resource}`,
                  }))}
                togglePanels={togglePanels}
                index={"contact-us"}
              />
            </li>
          )}

          {bottomNavLinks.map((navLink, index) => (
            <li
              key={index}
              className={classNames({
                "-ml-[9.5px]": !isFull,
              })}
            >
              <NavItem {...navLink}>{navLink.text}</NavItem>
            </li>
          ))}
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

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Notification"
      >
        <div className="px-4 pt-2.5 pb-5">
          <p className="mb-6 text-sm">
            Please login or sign up to play the game.
          </p>
          <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
            <Button className="h-10 rounded-xs" onClick={loginBtnHandler}>
              Login
            </Button>
            <Button
              className="rounded-xs text-black"
              color="yellow"
              onClick={signupBtnHandler}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default Sidebar;
