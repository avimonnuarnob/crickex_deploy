import type { RootLoaderData } from "@/root";
import { useRouteLoaderData } from "react-router";

export default function HomeMarquee() {
  const data = useRouteLoaderData<RootLoaderData>("root");

  return (
    <div className="flex items-center bg-blue-1 sm:bg-transparent">
      <span
        className="w-7.5 h-7.5 bg-background sm:bg-[#000c] bg-no-repeat mask-no-repeat marquee--icon ml-3 sm:ml-0"
        style={{
          maskImage:
            'url("https://img.c88rx.com/cx/h5/assets/images/icon-set/index-theme-icon/index-announcement-icon.svg?v=1745315485946")',
        }}
      />
      <p className="marquee overflow-hidden box-border w-full text-background sm:text-foreground">
        {data?.announcements?.map((el) => (
          <span className="text-sm">{el.announcement}</span>
        ))}
      </p>
    </div>
  );
}
