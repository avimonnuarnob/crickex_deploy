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
import GalleryForPromotion from "@/components/promotion/gallery-for-promotion";

// try to link these types with clientloader response

export default function Promotion({ params }: Route.ComponentProps) {
  const href = `/`;
  // Hook provides transition state for specific route
  const isTransitioning = useViewTransitionState(href);

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
      className="py-4"
      style={{
        viewTransitionName: isTransitioning ? "page" : "none",
      }}
      key={pathname}
    >
      <GalleryForPromotion />
      <Outlet />
    </div>
  );
}
