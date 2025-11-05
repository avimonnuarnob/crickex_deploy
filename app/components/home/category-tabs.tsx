import React, { Fragment, use, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";

import type { PROVIDERS } from "@/routes/index";
import { useLocation, useNavigate } from "react-router";
import classNames from "classnames";
import type { GAMES } from "@/routes/game-type";
import Cookies from "js-cookie";
import { LuLoader } from "react-icons/lu";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";

export default function CategoryTab({
  providers,
  hotGames,
}: {
  providers: PROVIDERS;
  hotGames?: GAMES;
}) {
  const navigate = useNavigate();
  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFixedTabList, setIsFixedTabList] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [sportsGames, setSportsGames] = useState<GAMES>();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  const filteredProviders = providers.filter((gameType) => gameType.top_menu);

  useEffect(() => {
    const isMobile = window.screen.width < 768;
    const tabList = document.getElementById("tabList");
    const tabPanels = document.getElementById("observing");
    const topBar = document.getElementById("topbar");
    const topBarHeight = topBar?.offsetHeight || 0;
    const topBarWidth = topBar?.offsetWidth || 0;

    const options = {
      root: null,
      rootMargin: `-${topBarHeight}px 0px`, // Example: 50px top/bottom margin, 0px left/right
      threshold: 0,
    };

    const observer = isMobile
      ? new IntersectionObserver((entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setIsFixedTabList(false);
              tabList?.style.removeProperty("position");
              tabList?.style.removeProperty("top");
              tabList?.style.removeProperty("width");
            } else {
              setIsFixedTabList(true);
              tabList?.style.setProperty("position", "fixed");
              tabList?.style.setProperty("top", `${topBarHeight - 2}px`);
              tabList?.style.setProperty("width", `${topBarWidth}px`);
            }
          });
        }, options)
      : null;

    observer?.observe(tabPanels!);

    return () => {
      observer?.unobserve(tabPanels!);
    };
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `/game/getGameListByType/SB/`)
      .then((response) => response.json())
      .then((d) => setSportsGames(d.data));
  }, []);

  const loginBtnHandler = () => {
    setIsModalOpen(false);
    navigate("/account-login-quick" + location.hash);
  };

  const signupBtnHandler = () => {
    setIsModalOpen(false);
    navigate("/new-register-entry/account" + location.hash);
  };

  // useEffect(() => {
  //   const touchableElement = document.getElementById("touchPanel");
  //   let touchstartX = 0;
  //   let touchstartY = 0;
  //   let touchendX = 0;
  //   let touchendY = 0;

  //   function handleGesture() {
  //     if (touchendX < touchstartX) {
  //       console.log("Swiped Left");
  //       if (selectedIndex > 0) {
  //         setSelectedIndex((state) => state - 1);
  //       }
  //     }

  //     if (touchendX > touchstartX) {
  //       console.log("Swiped Right");
  //       if (selectedIndex < filteredProviders.length - 1) {
  //         setSelectedIndex((state) => state + 1);
  //       }
  //     }
  //   }

  //   const touchEndhandler = (event: any) => {
  //     touchendX = event.changedTouches[0].screenX;
  //     touchendY = event.changedTouches[0].screenY;
  //     handleGesture();
  //   };
  //   const touchStartHandler = (event: any) => {
  //     touchstartX = event.changedTouches[0].screenX;
  //     touchstartY = event.changedTouches[0].screenY;
  //   };

  //   touchableElement?.addEventListener("touchstart", touchStartHandler);
  //   touchableElement?.addEventListener("touchend", touchEndhandler);

  //   return () => {
  //     touchableElement?.removeEventListener("touchstart", touchStartHandler);
  //     touchableElement?.removeEventListener("touchend", touchEndhandler);
  //   };
  // }, []);

  return (
    <div className="w-full">
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
      <TabGroup
        className="w-full"
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
      >
        <div id="observing">
          <TabList
            id="tabList"
            className={`flex bg-[#004179] text-white sm:rounded overflow-x-scroll [&::-webkit-scrollbar]:h-0 z-10 sm:static`}
          >
            {filteredProviders.map((gameType) => (
              <Tab
                key={gameType.id}
                className="data-selected:outline-none"
                onClick={() => {
                  const e = document.getElementById("tabPanels");
                  const main = document.getElementById("main");
                  if (e && isFixedTabList) {
                    main?.scrollTo({
                      top: e.offsetTop,
                      left: 0,
                      behavior: "smooth",
                    });
                  }
                }}
              >
                {({ selected }) => (
                  <div
                    className={`relative flex flex-col data items-center justify-center w-[77.27px] ${
                      isFixedTabList ? "h-[48.73px]" : "h-[101.99px]"
                    } sm:w-22.5 sm:h-19 font-bold transition-[height] duration-300 relative ${
                      selected && "bg-[#005dac]"
                    } `}
                  >
                    {isFixedTabList && (
                      <div className="absolute inset-0" onClick={() => {}} />
                    )}
                    {isFixedTabList ? null : (
                      <img
                        src={`/game_type/${gameType.game_type_code}.png`}
                        className="pt-1.5 w-[45.33px] aspect-square sm:w-10 sm:h-10 object-cover"
                      />
                    )}

                    <span className="text-sm sm:text-[13px] mt-2.25 mb-0.5 font-bold">
                      {gameType.game_type_code === "HT"
                        ? "HOT"
                        : gameType.title.toUpperCase()}
                    </span>
                    {selected && (
                      <span className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
                    )}
                  </div>
                )}
              </Tab>
            ))}
          </TabList>
        </div>
        <div className="px-2 sm:px-0">
          <TabPanels id="touchPanel" className="flex overflow-hidden">
            {filteredProviders.map((gameType, idx) => (
              <TabPanel
                id="tabPanels"
                static={true}
                className={`flex-1 min-w-full ${
                  idx === selectedIndex ? "max-h-max" : "max-h-0"
                }`}
                key={gameType.game_type_code + gameType.id}
              >
                <AnimatePresence>
                  <motion.div
                    animate={{ x: selectedIndex * -100 + "%" }}
                    transition={{ duration: 0 }}
                    className={classNames("flex pb-2 gap-1.25 items-center", {
                      "pt-2.75": !isFixedTabList,
                      "pt-15": isFixedTabList,
                    })}
                  >
                    <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                    <span className="font-bold text-[15px]">
                      {gameType.game_type_code === "HT"
                        ? "HOT"
                        : gameType.title.toUpperCase()}
                    </span>
                  </motion.div>
                  <motion.div
                    animate={{ x: selectedIndex * -100 + "%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-[.5333333333vw] sm:gap-1 sm:rounded overflow-hidden pb-2.75">
                      {gameType.game_type_code === "HT" ? (
                        <>
                          {hotGames?.map((game) => (
                            <div
                              key={game.g_code}
                              className="bg-white p-2 text-center text-sm font-light flex flex-col items-center cursor-pointer"
                              onClick={async () => {
                                const userToken = Cookies.get("userToken");
                                if (!userToken) {
                                  setIsModalOpen(true);
                                  return;
                                }
                                if (game.iframe) {
                                  navigate(
                                    `/open-game/${game.p_code}/${game.p_type}/${game.g_code}/${game.operator}`,
                                    {
                                      state: {
                                        from: location.search
                                          ? location.pathname + location.search
                                          : location.pathname,
                                      },
                                    }
                                  );
                                } else {
                                  setIsLoading(true);
                                  await fetch(
                                    import.meta.env.VITE_API_URL +
                                      `/game/launchGame/${game.p_code}/${game.p_type}/?game_id=${game.g_code}&operator=${game.operator}`,
                                    {
                                      method: "GET",
                                      headers: {
                                        Authorization: `Token ${userToken}`,
                                      },
                                    }
                                  )
                                    .then((d) => d.json())
                                    .then((game_info) => {
                                      window
                                        .open(
                                          game_info?.data?.gameUrl,
                                          "_blank"
                                        )
                                        ?.focus();
                                      setIsLoading(false);
                                    });
                                }
                              }}
                            >
                              <img
                                src={
                                  game.imgFileName.startsWith("/")
                                    ? import.meta.env.VITE_GAME_IMG_URL +
                                      game.imgFileName
                                    : game.imgFileName
                                }
                                className="w-10 h-10 object-cover"
                              />
                              <p className="truncate w-full">
                                {game.gameName.gameName_enus}
                                {isLoading && (
                                  <LuLoader className="animate-spin" />
                                )}
                              </p>
                            </div>
                          ))}
                        </>
                      ) : (
                        <>
                          {gameType.game_provider.map((item) => {
                            return (
                              <div
                                key={item.id}
                                className="bg-white p-2 text-center text-sm font-light flex flex-col items-center cursor-pointer"
                                onClick={async () => {
                                  if (gameType.game_type_code === "SB") {
                                    const games = sportsGames?.filter(
                                      (game) =>
                                        game.p_code === item.provider_code
                                    );

                                    const availableLengthOfGames =
                                      games?.length;
                                    if (
                                      availableLengthOfGames &&
                                      availableLengthOfGames > 1
                                    ) {
                                      navigate(
                                        `/games/${gameType.game_type_code}#vendor=${item.provider_code}`,
                                        {
                                          viewTransition: true,
                                        }
                                      );
                                    } else {
                                      const userToken =
                                        Cookies.get("userToken");

                                      if (!userToken) {
                                        setIsModalOpen(true);
                                        return;
                                      }

                                      const game = sportsGames?.find(
                                        (game) =>
                                          game.p_code === item.provider_code
                                      );

                                      if (game) {
                                        if (item.iframe) {
                                          navigate(
                                            `/open-game/${game.p_code}/${game.p_type}/${game.g_code}/${game.operator}`,
                                            {
                                              state: {
                                                from: location.search
                                                  ? location.pathname +
                                                    location.search
                                                  : location.pathname,
                                              },
                                            }
                                          );
                                        } else {
                                          setIsLoading(true);
                                          await fetch(
                                            import.meta.env.VITE_API_URL +
                                              `/game/launchGame/${game.p_code}/${game.p_type}/?game_id=${game.g_code}&operator=${game.operator}`,
                                            {
                                              method: "GET",
                                              headers: {
                                                Authorization: `Token ${userToken}`,
                                              },
                                            }
                                          )
                                            .then((d) => d.json())
                                            .then((game_info) => {
                                              window
                                                .open(
                                                  game_info?.data?.gameUrl,
                                                  "_blank"
                                                )
                                                ?.focus();
                                              setIsLoading(false);
                                            });
                                        }
                                      }
                                    }
                                  } else {
                                    navigate(
                                      `/games/${gameType.game_type_code}#vendor=${item.provider_code}`,
                                      {
                                        viewTransition: true,
                                      }
                                    );
                                  }
                                }}
                              >
                                <img
                                  src={
                                    import.meta.env.VITE_API_URL +
                                    "" +
                                    item.thumbnail
                                  }
                                  className="w-10 h-10 object-cover"
                                />
                                {item.title}
                              </div>
                            );
                          })}
                        </>
                      )}

                      {/* {Array.from({
                        length: 8 - (gameType.game_provider.length % 8),
                      }).map((el, index) => (
                        <div
                          key={"blank-" + index}
                          className="bg-white p-2 text-center text-sm font-semibold hidden md:block"
                        ></div>
                      ))} */}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabPanel>
            ))}
          </TabPanels>
        </div>
      </TabGroup>
    </div>
  );
}
