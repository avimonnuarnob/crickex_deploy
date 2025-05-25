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

  return (
    <div className="">
      <div className="mt-18 py-1">
        <HomeSlider />
        <HomeMarquee />
        <UserDashboard />
        {data?.gameProviders && <CategoryTab providers={data?.gameProviders} />}
        <div className="py-2.75">
          <FavouriteGames />
        </div>
        <div className="py-2.5">
          <FeaturedGames />
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export const links: LinksFunction = () => {
  return [
    {
      rel: "icon",
      href: "email.png",
      type: "image/png",
    },
  ];
};

export const meta: MetaFunction = ({ matches }) => {
  const rootData = matches[0].data as RootLoaderData;
  return [{ title: rootData?.mirrorLinks?.web_title }];
};
