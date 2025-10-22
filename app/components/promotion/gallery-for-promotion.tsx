import type { PROMOTION, RootLoaderData } from "@/root";
import classNames from "classnames";
import { format } from "date-fns";
import { useState } from "react";
import { BsClock } from "react-icons/bs";
import { Link, useRouteLoaderData } from "react-router";
import Button from "../ui/button/Button";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Modal from "../ui/modal/Modal";
import { RiArrowGoBackFill } from "react-icons/ri";
import { useNavigate } from "react-router";

export default function GalleryForPromotion() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { isLoggedIn } = useCurrentUser();
  const navigate = useNavigate();
  const [selectedFilter, setSelectedFilter] = useState<string>();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<PROMOTION>();

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

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 py-2">
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
              <div className="flex gap-2.5 justify-end items-center mt-auto text-[13px]">
                {isLoggedIn && promotion.deposit_option && (
                  <Button
                    color="green"
                    className="w-1/2 sm:w-30 h-[8vw] sm:h-9 bg-primary-button text-white rounded py-2.5"
                    onClick={() => {
                      navigate({
                        pathname: "member/wallet/deposit",
                        search: location.search
                          ? location.search + `&promotion=${promotion.id}`
                          : `?promotion=${promotion.id}`,
                      });
                    }}
                  >
                    Deposit
                  </Button>
                )}
                {!isLoggedIn && (
                  <Link
                    to="new-register-entry/account"
                    className="w-1/2 sm:w-30 h-[8vw] sm:h-9"
                  >
                    <Button
                      color="green"
                      className="w-full bg-primary-button text-white rounded py-2.5"
                    >
                      Register Now
                    </Button>
                  </Link>
                )}
                {promotion.forward_url ? (
                  <Button className="w-1/2 sm:w-30 h-[8vw] sm:h-9 text-primary-button rounded py-2.5">
                    <a
                      href={promotion.forward_url}
                      target="_blank"
                      rel="noreferrer"
                    >
                      Detail
                    </a>
                  </Button>
                ) : (
                  <Button
                    className="w-1/2 sm:w-30 h-[8vw] sm:h-9 text-primary-button rounded py-2.5"
                    onClick={() => {
                      setIsOpen(true);
                      setSelectedPromotion(promotion);
                    }}
                  >
                    Detail
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      <Modal
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
          setSelectedPromotion(undefined);
        }}
        isFullScreen
        title="Promotion"
      >
        <>
          {selectedPromotion && (
            <div className="p-2 space-y-2">
              <div className="flex gap-2 items-center justify-between">
                <h3 className="text-base font-semibold text-foreground-100">
                  {selectedPromotion.title}
                </h3>
              </div>
              <img
                src={
                  import.meta.env.VITE_API_URL + selectedPromotion.banner_image
                }
                alt={selectedPromotion?.alt_text}
                className="w-full h-30 object-cover object-top"
              />

              <div>
                <h4 className="text-sm">{selectedPromotion.sub_title}</h4>
              </div>

              <div className="flex items-center gap-1 text-[10px]">
                <BsClock className="size-4 text-foreground-100" />
                <p>
                  {format(new Date(selectedPromotion.created_at), "Pp")} -{" "}
                  {format(new Date(selectedPromotion.end_at), "Pp")}
                </p>
              </div>

              <div className="bg-foreground-400 rounded">
                <p
                  className="text-xs"
                  dangerouslySetInnerHTML={{
                    __html: selectedPromotion.description,
                  }}
                />
              </div>
            </div>
          )}
        </>
      </Modal>
    </>
  );
}
