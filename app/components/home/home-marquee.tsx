import { useEffect, useState } from "react";

export default function HomeMarquee() {
  const [data, setData] = useState([]);
  useEffect(() => {
    const getAnnouncementData = async () => {
      const response = await fetch(
        "https://ai.cloud7hub.uk/statics/announcements/"
      );
      const responseData = await response.json();
      setData(responseData.data);
    };
    getAnnouncementData();
  }, []);
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
        {data?.map((el) => (
          <span className="text-sm">{el.announcement}</span>
        ))}
      </p>
    </div>
  );
}
