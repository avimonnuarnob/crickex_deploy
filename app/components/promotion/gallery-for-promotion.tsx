import type { RootLoaderData } from "@/root";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { useRouteLoaderData } from "react-router";
import Button from "../ui/button/Button";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

export default function GalleryForPromotion() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { isLoggedIn } = useCurrentUser();
  const [selectedFilter, setSelectedFilter] = useState<string>();

  const filters = [
    ...new Set(
      data?.promotionList
        .filter((promotion) => {
          return promotion.promotion_page;
        })
        .map((promotion) => promotion.alt_text)
    ),
  ];

  const visibleData = selectedFilter
    ? data?.promotionList.filter((promotion) => {
        return (
          promotion.promotion_page && promotion.alt_text === selectedFilter
        );
      })
    : data?.promotionList.filter((promotion) => {
        return promotion.promotion_page;
      });
  return (
    <>
      <div className="relative overflow-hidden rounded">
        <div className="flex gap-2.5 bg-white px-2 pt-2 pb-1.5 overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
          <button
            className={classNames(
              "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded min-w-[93px] h-[30px] text-center cursor-pointer hover:opacity-[0.7]",
              { "bg-[#005dac]! text-white": !selectedFilter }
            )}
            onClick={() => {
              setSelectedFilter(undefined);
            }}
          >
            All
          </button>
          {filters.map((filter) => (
            <button
              key={filter}
              className={classNames(
                "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded min-w-[93px] h-[30px] text-center cursor-pointer hover:opacity-[0.7]",
                { "bg-[#005dac]! text-white": selectedFilter === filter }
              )}
              onClick={() => {
                setSelectedFilter(filter);
              }}
            >
              {filter}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-2.5 py-2">
        {visibleData?.map((promotion) => (
          <div
            key={promotion.id}
            className="bg-white rounded overflow-hidden flex flex-col"
          >
            <div className="relative overflow-hidden">
              <img
                src={import.meta.env.VITE_API_URL + promotion.banner_image}
                alt={promotion.alt_text}
                className="w-full h-30 object-cover object-top"
              />
              <div className="absolute -bottom-1.5 left-0 right-0 w-full">
                <img
                  src="/promotion-bg.svg"
                  alt="promotion-bg"
                  className="h-full w-full"
                />
              </div>
            </div>
            <div className="p-3 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3>{promotion.title}</h3>
                <p className="text-sm">{promotion.sub_title}</p>
                <div className="flex items-center gap-1 text-sm text-black/80 mb-5">
                  <BsClock className="size-3.5 text-primary-button" />
                  <p>
                    {format(new Date(promotion.created_at), "Pp")} -{" "}
                    {format(new Date(promotion.end_at), "Pp")}
                  </p>
                </div>
              </div>
              <div className="flex gap-2.5 justify-end items-center mt-auto">
                {isLoggedIn ? (
                  <Button className="w-30 bg-primary-button text-white rounded py-2.5">
                    Apply
                  </Button>
                ) : (
                  <Button className="w-30 bg-primary-button text-white rounded py-2.5">
                    Register Now
                  </Button>
                )}
                <Button
                  className="w-30 text-primary-button rounded py-2.5"
                  color="green"
                >
                  Detail
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
