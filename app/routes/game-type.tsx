import {
  Await,
  Outlet,
  useLoaderData,
  useLocation,
  useRouteLoaderData,
} from "react-router";
import type { Route } from "./+types/game-type";
import { Suspense, useEffect } from "react";
import GalleryForGames from "@/components/game/gallery-for-games";
import type { RootLoaderData } from "@/root";
import { useViewTransitionState } from "react-router";

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

const cache = new Map();

// try to link these types with clientloader response
export function clientLoader({ params }: Route.ClientLoaderArgs) {
  const key = `Game-Type-${params.gametype}`;

  if (cache.get(key)) {
    const promiseOfGames = new Promise((resolve) => resolve(cache.get(key)));
    return { promiseOfGames };
  }
  const promiseOfGames = fetch(
    `https://ai.cloud7hub.uk/game/getGameListByType/${params.gametype}/`
  )
    .then((response) => response.json())
    .then((d) => {
      cache.set(key, d.data);
      return d.data;
    });

  return { promiseOfGames };
}

export default function GameType({ loaderData, params }: Route.ComponentProps) {
  const href = `/`;
  // Hook provides transition state for specific route
  const isTransitioning = useViewTransitionState(href);

  const { promiseOfGames } = loaderData;
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { pathname, hash } = useLocation();
  const { gametype } = params;
  const providersMap = new Map<string, string>();
  const gameProviders = data?.gameProviders
    .find((gameType) => gameType.game_type_code === gametype)
    ?.game_provider.forEach((provider) => {
      if (providersMap.get(provider.provider_code)) {
        return;
      }
      providersMap.set(provider.provider_code, provider.provider_name);
    });

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--direction", "-1");
  }, []);
  return (
    <div
      className="mt-18 py-1"
      style={{
        viewTransitionName: isTransitioning ? "page" : "none",
      }}
      key={pathname}
    >
      <Suspense
        fallback={
          <div className="flex justify-center items-center flex-col h-full">
            <div className="list-loading w-10 h-10">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <Await resolve={promiseOfGames}>
          {(games: GAMES) => {
            return (
              <GalleryForGames games={games} providersMap={providersMap} />
            );
          }}
        </Await>
      </Suspense>
      <Outlet />
    </div>
  );
}
