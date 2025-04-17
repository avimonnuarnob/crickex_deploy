import { Await, Link, NavLink, Outlet } from "react-router";
import type { Route } from "./+types/root-layout";
import React, { useState } from "react";
import classNames from "classnames";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";

let API_DATA: null | string = null;

export async function loader({ params }: Route.LoaderArgs) {
  console.log("hell0");
  let nonCriticalData = new Promise((res) =>
    setTimeout(() => res("non-critical"), 5000)
  );

  return { nonCriticalData };
}

export default function RootLayout({ loaderData }: Route.ComponentProps) {
  const { nonCriticalData } = loaderData;
  const [isFull, setIsFull] = useState(false);

  return (
    <React.Suspense fallback="Loading...">
      <Await resolve={nonCriticalData}>
        {() => (
          <div className="flex h-screen overscroll-y-contain">
            <Sidebar isFull={isFull} setIsFull={setIsFull} />
            <main className="flex h-full flex-1 flex-col items-center overflow-auto">
              <Topbar isFull={isFull} />
              <div className="w-full flex-1">
                <div
                  className={classNames("mx-auto max-w-[1200px]", {
                    "w-[calc(100%-(16px*2))]": !isFull,
                    "w-[calc(100%-(16px*4))]": isFull,
                  })}
                >
                  <Outlet />
                </div>
              </div>
            </main>
          </div>
        )}
      </Await>
    </React.Suspense>
  );
}
