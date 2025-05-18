import React, { Fragment, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";

import type { GAMES } from "@/routes/index";
import { useNavigate } from "react-router";

export default function CategoryTab({ games }: { games: GAMES }) {
  const navigate = useNavigate();

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [previousIndex, setPreviousIndex] = useState(0);

  const handleTabChange = (index: number) => {
    setPreviousIndex(selectedIndex);
    setSelectedIndex(index);
  };

  return (
    <div className="flex w-full justify-center">
      <div className="w-full">
        <TabGroup selectedIndex={selectedIndex} onChange={handleTabChange}>
          <TabList className="flex bg-[#004179] text-white rounded overflow-x-scroll [&::-webkit-scrollbar]:h-0">
            {games.map((game) => (
              <Tab key={game.id} className="data-selected:outline-none">
                {({ selected }) => (
                  <div
                    className={` flex flex-col data items-center justify-center px-5 py-1.5 font-bold transition relative ${
                      selected && "bg-[#005dac]"
                    } `}
                  >
                    <img
                      src={"https://ai.cloud7hub.uk" + game.thumbnail}
                      className="pt-3 w-10 h-10 object-cover"
                    />
                    <span className="text-[13px] mt-2.75">{game.title}</span>
                    {selected && (
                      <span className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
                    )}
                  </div>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels className="flex overflow-hidden">
            {games.map((game, idx) => (
              <TabPanel
                static={true}
                className="flex-1 min-w-full"
                key={game.id}
              >
                <AnimatePresence>
                  <motion.div
                    key="div"
                    animate={{ x: selectedIndex * -100 + "%" }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="flex py-2.5 gap-1 items-center">
                      <div className="w-1 h-4 bg-[#005dac] rounded"></div>
                      <span className="font-bold text-[15px]">
                        {game.title}
                      </span>
                    </div>
                    <div className="grid md:grid-cols-8 gap-1 rounded overflow-hidden pb-2.75">
                      {game.game_provider.map((item) => (
                        <div
                          key={item.id}
                          className="bg-white p-2 text-center text-sm font-light flex flex-col items-center cursor-pointer"
                          onClick={() => {
                            navigate(
                              `/games/${game.game_type_code}#vendor=${item.provider_code}`
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
                      {Array.from({
                        length: 8 - (game.game_provider.length % 8),
                      }).map((el, index) => (
                        <div
                          key={"blank-" + index}
                          className="bg-white p-2 text-center text-sm font-semibold hidden md:block"
                        ></div>
                      ))}
                    </div>
                  </motion.div>
                </AnimatePresence>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
