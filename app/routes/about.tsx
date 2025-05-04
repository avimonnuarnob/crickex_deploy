import React from "react";
import { Await, Outlet } from "react-router";
import type { Route } from "./+types/about";

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

export default function About({ loaderData }: Route.ComponentProps) {
  let { criticalData, nonCriticalData }: any = loaderData;
  return (
    <div>
      <h1>Streaming example</h1>
      <h2>Critical data value: {criticalData}</h2>
      <Outlet />
    </div>
  );
}
