import CategoryTab from "@/components/home/category-tabs";

import FavouriteGames from "@/components/home/favourite-games";
import FeaturedGames from "@/components/home/featured-games";
import HomeMarquee from "@/components/home/home-marquee";
import {
  Outlet,
  useLocation,
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
import { useViewTransitionState } from "react-router";
import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
} from "@headlessui/react";
import ClaimBonusSlider from "@/components/home/claim-bonus-slider";

let shouldUserSeeClaimBonusSlider = true;

export type PROVIDERS = GAMETYPE[];
export type BONUSES = BONUS[];

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

export interface BONUS {
  id: number;
  currency: Currency;
  category: Category;
  name: string;
  description: string;
  image: string;
  alt_text: string;
  amount: string;
  wallet: string;
  active: boolean;
  started_at: string;
  expired_at: string;
  turnover_percentage: string;
  created_at: string;
  updated_at: string;
  url_id: any;
}

export interface Currency {
  id: number;
  currency: string;
  currency_title: string;
  currency_icon: string;
  user_currency: boolean;
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: number;
  sort_id: number;
  name: string;
}

const cache = new Map();
const cacheDataDuration = Date.now() + 6 * 60 * 60 * 1000;

export async function clientLoader() {
  const key = `Home-Loader-Data`;

  if (cache.get(key) && Date.now() < cacheDataDuration) {
    return { bonuses: cache.get(key) as BONUSES };
  }

  const bonusesRsponse = await fetch(
    import.meta.env.VITE_API_URL + "/wallet/claim-bonus/"
  );
  const bonuses = await bonusesRsponse.json();
  cache.set(key, bonuses.data);

  return { bonuses: bonuses.data as BONUSES };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { bonuses } = loaderData;
  const p = useLocation();

  const [isDialogOpen, setIsDialogOpen] = useState(
    bonuses?.length ? true : false
  );
  const { isLoggedIn, userInfo } = useCurrentUser();

  const filteredBonuses = isLoggedIn
    ? bonuses?.filter(
        (bonus) =>
          bonus.currency.currency === userInfo?.currency && bonus.active
      )
    : bonuses?.filter((bonus) => bonus.active);

  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty("--direction", "1");
  }, []);

  return (
    <>
      <div
        className="py-0 sm:py-4"
        style={{
          viewTransitionName: p.hash !== "#chatbox" ? "page" : "none",
        }}
      >
        <HomeSlider />
        <HomeMarquee />
        {isLoggedIn && <UserDashboard />}
        <div className="transition-all">
          {data?.gameProviders && data?.hotGames && (
            <CategoryTab
              providers={data?.gameProviders}
              hotGames={data.hotGames}
            />
          )}
        </div>
        <div className="py-2.75">
          <FavouriteGames />
        </div>
        <div className="py-2.5">
          <FeaturedGames hotGames={data?.hotGames} />
        </div>
      </div>
      <Outlet />
      {/* <Dialog
        open={
          filteredBonuses &&
          filteredBonuses.length > 0 &&
          isDialogOpen &&
          shouldUserSeeClaimBonusSlider
        }
        onClose={() => {}}
        className="relative z-50"
      >
        <DialogBackdrop className="fixed inset-0 bg-black/30" />
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          <DialogPanel className="min-w-lg h-auto space-y-4 border bg-white">
            <ClaimBonusSlider bonuses={filteredBonuses} />
          </DialogPanel>
        </div>
      </Dialog> */}
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
