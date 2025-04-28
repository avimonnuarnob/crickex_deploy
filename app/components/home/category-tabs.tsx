import React, { Fragment, useState } from "react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import { motion, AnimatePresence } from "motion/react";

import casino from "@/assets/images/icon/casino.svg";
import cricket from "@/assets/images/icon/cricket.svg";
import sportIcon from "@/assets/images/icon/sport.svg";

const tabs = [
  { name: "SPORTS", icon: sportIcon },
  { name: "CASINO", icon: sportIcon },
  { name: "SLOTS", icon: sportIcon },
  { name: "TABLE", icon: sportIcon },
  { name: "CRASH", icon: sportIcon },
  { name: "FISHING", icon: sportIcon },
  { name: "ARCADE", icon: sportIcon },
  { name: "LOTTERY", icon: sportIcon },
];

const panelItems = [
  { label: "JILI" },
  { label: "JDB" },
  { label: "FC" },
  { label: "KA" },
  { label: "JOKER" },
  { label: "CQ9" },
  { label: "Lucky365" },
  { label: "JILI" },
  { label: "JDB" },
  { label: "FC" },
  { label: "KA" },
  { label: "JOKER" },
];

export default function CategoryTab() {
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
          <TabList className="flex bg-[#004179] text-white rounded overflow-hidden">
            {tabs.map((tab, idx) => (
              <Tab key={tab.name} className="data-selected:outline-none">
                {({ selected }) => (
                  <div
                    className={` flex flex-col data items-center justify-center px-5 py-1.5 font-bold transition relative ${
                      selected && "bg-[#005dac]"
                    } `}
                  >
                    <img src={tab.icon} className="pt-3" />
                    <span className="text-[13px] mt-2.75">{tab.name}</span>
                    {selected && (
                      <span className="absolute bottom-[0px] left-1/2 -translate-x-1/2 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent border-b-white" />
                    )}
                  </div>
                )}
              </Tab>
            ))}
          </TabList>
          <TabPanels>
            {tabs.map((tab, idx) => (
              <TabPanel key={tab.name}>
                <div className="flex py-2.5 gap-1 items-center">
                  <div className="w-1 h-4 bg-[#005dac] rounded"></div>
                  <span className="font-bold text-[15px]">{tab.name}</span>
                </div>
                <motion.div
                  initial={{
                    opacity: 1,
                    x: selectedIndex < previousIndex ? 400 : -400,
                  }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{
                    opacity: 1,
                    x: selectedIndex < previousIndex ? -40 : 40,
                  }}
                  transition={{ duration: 0.3 }}
                  className="grid md:grid-cols-8 gap-1 rounded overflow-hidden pb-2.75"
                >
                  {panelItems.map((item, idx) => (
                    <div
                      key={idx}
                      className="bg-white p-2 text-center text-sm font-light flex flex-col items-center"
                    >
                      <img
                        src="https://img.c88rx.com/cx/h5/assets/images/brand/black/provider-awcmjili.png?v=1744705193129&source=mcdsrc"
                        width="40"
                        height="40"
                      />
                      {item.label}
                    </div>
                  ))}
                  {Array.from({
                    length: 8 - (panelItems.length % 8),
                  }).map((el) => (
                    <div
                      key={"blank-" + idx}
                      className="bg-white p-2 text-center text-sm font-semibold hidden md:block"
                    ></div>
                  ))}
                </motion.div>
              </TabPanel>
            ))}
          </TabPanels>
        </TabGroup>
      </div>
    </div>
  );
}
