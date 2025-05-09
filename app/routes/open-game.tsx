import Cookies from "js-cookie";
import type { Route } from "./+types/open-game";
import React from "react";
import { Await } from "react-router";

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const { pcode, ptype, gcode, operator } = params;

  const gamebox = fetch(
    `https://ai.cloud7hub.uk/game/launchGame/${pcode}/${ptype}/?game_id=${gcode}&operator=${operator}`,
    // `https://ai.cloud7hub.uk/game/launchGame/BCON/SL/?game_id=420013999&operator=bcon`,
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
    <div className="mt-14.75">
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
              <>
                <div
                  style={{ height: "calc(100vh - 59px)", overflow: "hidden" }}
                >
                  <iframe
                    src={value.data.gameUrl}
                    allowFullScreen={true}
                    allow="autoplay"
                    style={{
                      width: "0px",
                      height: "100%",
                      minWidth: "100%",
                      border: "20px solid red",
                    }}
                  ></iframe>
                </div>
              </>
            );
          }}
        </Await>
      </React.Suspense>
    </div>
  );
}
