import React, { Fragment, useEffect, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";

import type { PROVIDERS } from "@/routes/index";
import { useNavigate } from "react-router";
import classNames from "classnames";

export default function CategoryTab({ providers }: { providers: PROVIDERS }) {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isFixedTabList, setIsFixedTabList] = useState(false);
  const [topBarHeight, setTopBarHeight] = useState(0);
  const [topBarWidth, setTopBarWidth] = useState(0);

  const handleTabChange = (index: number) => {
    setSelectedIndex(index);
  };

  const filteredProviders = providers.filter((gameType) => gameType.top_menu);

  useEffect(() => {
    const isMobile = window.screen.width < 768;
    const tabList = document.getElementById("tabList");
    const tabPanels = document.getElementById("tabPanels");
    const topBar = document.getElementById("topbar");
    const topBarHeight = topBar?.offsetHeight || 0;
    const topBarWidth = topBar?.offsetWidth || 0;

    const options = {
      root: null,
      rootMargin: `-${topBarHeight}px 0px`, // Example: 50px top/bottom margin, 0px left/right
      threshold: 1,
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

  return (
    <div className="w-full">
      <TabGroup
        className="w-full"
        selectedIndex={selectedIndex}
        onChange={handleTabChange}
      >
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
                console.log(document.body.offsetHeight);
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
                    {gameType.title.toUpperCase()}
                  </span>
                  {selected && (
                    <span className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
                  )}
                </div>
              )}
            </Tab>
          ))}
        </TabList>
        <div className="px-2 sm:px-0">
          <TabPanels className="flex overflow-hidden">
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
                      {gameType.title.toUpperCase()}
                    </span>
                  </motion.div>
                  <motion.div
                    animate={{ x: selectedIndex * -100 + "%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="grid grid-cols-4 md:grid-cols-8 gap-[.5333333333vw] sm:gap-1 sm:rounded overflow-hidden pb-2.75">
                      {gameType.game_provider.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-2 text-center text-sm font-light flex flex-col items-center cursor-pointer"
                          onClick={() => {
                            navigate(
                              `/games/${gameType.game_type_code}#vendor=${item.provider_code}`,
                              {
                                viewTransition: true,
                              }
                            );
                          }}
                        >
                          <img
                            src={"https://ai.cloud7hub.uk" + item.thumbnail}
                            className="w-10 h-10 object-cover"
                          />
                          {item.title}
                        </div>
                      ))}
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
