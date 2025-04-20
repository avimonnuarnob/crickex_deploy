import React from "react";
import { Await } from "react-router";
import type { Route } from "./+types/about";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";

import "swiper/css/navigation";

export async function loader() {
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
  let { criticalData, nonCriticalData } = loaderData;
  return (
    <div className="min-h-[1000px]">
      {/* <h1>Streaming example</h1>
      <h2>Critical data value: {criticalData}</h2>

      <React.Suspense fallback={<div>Loading...</div>}>
        <Await resolve={nonCriticalData}>
          {(value) => <h3>Non critical value: {value}</h3>}
        </Await>
      </React.Suspense> */}
      <div className="mt-18 py-1">
        <Swiper
          className="mySwiper rounded-sm"
          navigation={true}
          modules={[Pagination, Navigation]}
          pagination={{
            clickable: true,
            bulletClass: "swiper-bullet",
            renderBullet: function (index, className) {
              return `<span class='${className} bg-[#7AA8D0] rounded-full h-0.5 w-4 inline-block mx-2.5 cursor-pointer'></span>`;
            },
          }}
        >
          <SwiperSlide key={1}>
            <img src="https://img.c88rx.com/upload/announcement/image_221710.jpg" />
          </SwiperSlide>
          <SwiperSlide key={2}>
            <img src="https://img.c88rx.com/upload/announcement/image_221710.jpg" />
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}
