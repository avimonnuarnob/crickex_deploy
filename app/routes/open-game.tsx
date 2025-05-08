import Cookies from "js-cookie";
import type { Route } from "./+types/open-game";
import React from "react";
import { Await } from "react-router";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { pcode, ptype, gcode, operator } = params;

  const gamebox = fetch(
    `https://ai.cloud7hub.uk/game/launchGame/${pcode}/${ptype}/?game_id=${gcode}&operator=${operator}`,
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
  console.log(gamebox);
  return (
    <div className="mt-18 py-1">
      <div className="w-full h-dvh text-center">
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center flex-col h-full">
              <div className="loader">
                <span className="sr-only">Loading...</span>
              </div>
              <span>Loading...</span>
            </div>
          }
        >
          <Await resolve={gamebox}>
            {(value) => {
              return (
                <iframe
                  src={value.data.gameUrl}
                  className="w-full h-full"
                ></iframe>
              );
            }}
          </Await>
        </React.Suspense>
      </div>
    </div>
  );
}
