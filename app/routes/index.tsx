import type { Route } from "./+types/about";

import React, { Suspense, useEffect, useState } from "react";

const HomeSlider = React.lazy(() => import("@/components/home/home-slider"));

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
  let { criticalData, nonCriticalData } = loaderData;
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="min-h-[1000px]">
      <div className="mt-18 py-1">
        {mounted ? (
          <Suspense fallback={<div>Loading...</div>}>
            <HomeSlider />
          </Suspense>
        ) : null}
      </div>
    </div>
  );
}
