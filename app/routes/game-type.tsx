import { Await, Outlet, useLocation } from "react-router";
import type { Route } from "./+types/game-type";
import { Suspense } from "react";
import GalleryForGames from "@/components/game/gallery-for-games";

export type GAMES = GAME[];

export interface GAME {
  g_code: string;
  g_type: string;
  p_code: string;
  p_type: string;
  gameName: GameName;
  imgFileName: string;
  displaydemo: string;
  iframe: boolean;
  operator: string;
}

export interface GameName {
  gameName_enus: string;
  gameName_zhcn: string;
}

// try to link these types with clientloader response
export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const promiseOfGames = fetch(
    `https://ai.cloud7hub.uk/game/getGameListByType/${params.gametype}/`
  )
    .then((response) => response.json())
    .then((d) => d.data);

  return { promiseOfGames };
}

export default function GameType({ loaderData }: Route.ComponentProps) {
  const { promiseOfGames } = loaderData;
  const { pathname, hash } = useLocation();

  return (
    <div className="mt-18 py-1" key={pathname}>
      <Suspense
        fallback={
          <div className="flex justify-center items-center flex-col h-full">
            <div className="loader">
              <span className="sr-only">Loading...</span>
            </div>
            <span>Loading...</span>
          </div>
        }
      >
        <Await resolve={promiseOfGames}>
          {(games) => <GalleryForGames games={games} />}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}
