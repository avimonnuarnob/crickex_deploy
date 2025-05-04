import CategoryTab from "@/components/home/category-tabs";
import type { Route } from "./+types/about";

import React, { Suspense, useEffect, useState } from "react";
import FavouriteGames from "@/components/home/favourite-games";
import FeaturedGames from "@/components/home/featured-games";
import HomeMarquee from "@/components/home/home-marquee";
import { Outlet, useRouteLoaderData } from "react-router";

import HomeSlider from "@/components/home/home-slider";
import type { RooteLoaderData } from "@/root";

export async function clientLoader() {
  // note this is NOT awaited
  let nonCriticalData = new Promise((res) =>
    setTimeout(() => res("non-critical"), 5000)
  );

  let criticalData = await new Promise((res) =>
    setTimeout(() => res("critical"), 300)
  );

  return { nonCriticalData, criticalData };
}

export default function Home({ loaderData }: Route.ComponentProps) {
  const data = useRouteLoaderData<RooteLoaderData>("root");

  console.log(data);

  return (
    <div className="">
      <div className="mt-18 py-1">
        <HomeSlider />
        <HomeMarquee />
        <CategoryTab />
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
