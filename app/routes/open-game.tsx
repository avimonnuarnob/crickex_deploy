import Cookies from "js-cookie";
import type { Route } from "./+types/open-game";
import React, { useState } from "react";
import { Await, useSearchParams } from "react-router";
import { motion } from "motion/react";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { pcode, ptype, gcode, operator } = params;

  const gamebox = fetch(
    import.meta.env.VITE_API_URL +
      `/game/launchGame/${pcode}/${ptype}/?game_id=${gcode}&operator=${operator}`,
    // import.meta.env.VITE_API_URL + `/game/launchGame/BCON/SL/?game_id=420013999&operator=bcon`,
    {
      method: "GET",
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  ).then((d) => d.json());

  return { gamebox };
}

export default function GameLauncher({ loaderData }: Route.ComponentProps) {
  const { gamebox } = loaderData;

  return (
    <div className="mt-11">
      <React.Suspense
        fallback={
          <div
            className="flex justify-center items-center flex-col bg-black"
            style={{ height: "calc(100vh - 44px)" }}
          >
            <div className="list-loading w-10 h-10">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <Await resolve={gamebox}>
          {(value) => {
            return (
              <>
                <motion.div
                  initial={{ opacity: 1, y: 700 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ ease: "linear" }}
                  style={{
                    height: "calc(100vh - 44px)",
                    overflow: "hidden",
                  }}
                >
                  <iframe
                    src={value.data?.gameUrl}
                    allowFullScreen={true}
                    allow="autoplay"
                    style={{
                      width: "0px",
                      height: "100%",
                      minWidth: "100%",
                    }}
                  ></iframe>
                </motion.div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}
