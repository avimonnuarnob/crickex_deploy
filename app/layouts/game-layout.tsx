import { Outlet } from "react-router";
import type { Route } from "./+types/root-layout";
import { useState } from "react";
import classNames from "classnames";
import Topbar from "./Topbar";
import TopbarGame from "./top-bar-game";
import { motion } from "motion/react";

let API_DATA: null | string = null;

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const [isFull, setIsFull] = useState(false);

  return (
    <div className="flex h-screen overscroll-y-contain">
      <motion.main
        initial={{ opacity: 1, y: 700 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ ease: "linear" }}
        style={{
          overflow: "hidden",
          background: "#d9d9d9",
        }}
        className="flex h-full flex-1 flex-col items-center overflow-auto"
      >
        <TopbarGame isFull={isFull} />
        <div className="w-full flex-1">
          <div>
            <Outlet />
          </div>
        </div>
      </motion.main>
    </div>
  );
}
