import { Outlet } from "react-router";
import type { Route } from "./+types/root-layout";
import { useState } from "react";
import classNames from "classnames";
import Topbar from "./Topbar";
import TopbarGame from "./top-bar-game";

let API_DATA: null | string = null;

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const [isFull, setIsFull] = useState(false);

  return (
    <div className="flex h-screen overscroll-y-contain">
      <main className="flex h-full flex-1 flex-col items-center overflow-auto">
        <TopbarGame isFull={isFull} />
        <div className="w-full flex-1">
          <div>
            <Outlet />
          </div>
        </div>
      </main>
    </div>
  );
}
