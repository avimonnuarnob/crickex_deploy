import CategoryTab from "@/components/home/category-tabs";
import type { Route } from "./+types/about";

import React, { Suspense, useEffect, useState } from "react";
import FavouriteGames from "@/components/home/favourite-games";
import FeaturedGames from "@/components/home/featured-games";
import HomeMarquee from "@/components/home/home-marquee";
import { Outlet, useRouteLoaderData } from "react-router";

import HomeSlider from "@/components/home/home-slider";

export default function Home() {
  // const data = useRouteLoaderData<RooteLoaderData>("root");

  // console.log(data);

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
