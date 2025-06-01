import { Await, Outlet } from "react-router";
import HomeSlider from "@/components/home/home-slider";
import React from "react";
import type { Route } from "./+types/responsible-gaming";

export async function clientLoader() {
  return fetch("https://ai.cloud7hub.uk/statics/privacy-and-policy/")
    .then((response) => response.json())
    .then((data) => data.data);
}

export default function ResponsibleGaming({
  loaderData,
}: Route.ComponentProps) {
  const data = loaderData as Promise<
    {
      id: number;
      title: string;
      description: string;
      created_at: string;
      updated_at: string;
      url_id: number;
    }[]
  >;
  return (
    <div className="mt-18 py-1">
      <HomeSlider />
      <React.Suspense
        fallback={
          <div className="flex justify-center items-center flex-col h-full">
            <div className="list-loading w-10 h-10">
              <span className="sr-only">Loading...</span>
            </div>
          </div>
        }
      >
        <Await resolve={data}>
          {(value) => {
            return value.map((item) => (
              <div key={item.id}>
                <h1 className="text-center mt-8! mb-8! border rounded mx-auto! w-max p-4">
                  {item.title}
                </h1>
                <div
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></div>
              </div>
            ));
          }}
        </Await>
      </React.Suspense>
      <Outlet />
    </div>
  );
}
