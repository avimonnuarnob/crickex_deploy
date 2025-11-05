import CategoryTab from "@/components/home/category-tabs";

import FavouriteGames from "@/components/home/favourite-games";
import FeaturedGames from "@/components/home/featured-games";
import HomeMarquee from "@/components/home/home-marquee";
import {
  Outlet,
  useRouteLoaderData,
  type LinksFunction,
  type MetaFunction,
} from "react-router";

import HomeSlider from "@/components/home/home-slider";
import type { Route } from "./+types/index";
import type { RootLoaderData } from "@/root";
import UserDashboard from "@/components/home/user-dashboard";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useEffect, useRef, useState } from "react";
import type { GAMES } from "@/routes/game-type";

export type PROVIDERS = GAMETYPE[];

export interface GAMETYPE {
  id: number;
  game_provider: GAMEPROVIDER[];
  page: { id: number; name: string };
  title: string;
  game_type_code: string;
  thumbnail: string;
  alt_text: string;
  status: boolean;
  custom_game_type: boolean;
  real_game_type: boolean;
  display_order: number;
  provider_display_order: string[];
  top_menu: boolean;
  menu_card: boolean;
  features: boolean;
}

export interface GAMEPROVIDER {
  id: number;
  title: string;
  provider_name: string;
  provider_code: string;
  status: boolean;
  thumbnail: string;
  game_img: string;
  is_provide_gamelist: boolean;
  iframe: boolean;
  transfer_min_limit: string;
  extra_param?: string;
  operator: string;
  supported_currency: number[];
}

export default function Home() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const [hotGamesData, setHotGamesData] = useState<GAMES>();
  const { isLoggedIn } = useCurrentUser();

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--direction", "1");
  }, []);

  useEffect(() => {
    fetch(import.meta.env.VITE_API_URL + `/game/getGameListByType/HT/`)
      .then((response) => response.json())
      .then((d) => setHotGamesData(d.data));
  }, []);

  return (
    <>
      <div className="py-0 sm:py-4 page-body">
        <HomeSlider />
        <HomeMarquee />
        {isLoggedIn && <UserDashboard />}
        <div className="transition-all">
          {data?.gameProviders && (
            <CategoryTab
              providers={data?.gameProviders}
              hotGames={hotGamesData}
            />
          )}
        </div>
        <div className="py-2.75">
          <FavouriteGames />
        </div>
        <div className="py-2.5">
          <FeaturedGames hotGames={hotGamesData} />
        </div>
      </div>
      <Outlet />
    </>
  );
}

// export const links: LinksFunction = () => {
//   return [
//     {
//       rel: "icon",
//       href: "/email.png",
//       type: "image/png",
//     },
//   ];
// };

// export const meta: MetaFunction = ({ matches }) => {
//   const rootData = matches[0].data as RootLoaderData;
//   return [{ title: rootData?.mirrorLinks?.web_title }];
// };
