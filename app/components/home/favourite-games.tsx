import type { PROMOTION, RootLoaderData } from "@/root";
import { useState } from "react";
import { useRouteLoaderData } from "react-router";
import Modal from "../ui/modal/Modal";

export default function FavouriteGames() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<PROMOTION>();

  const events = data?.promotionList.filter((promotion) => {
    return promotion.is_active && promotion.event;
  });
  return (
    <>
      <div className="w-full px-2 sm:px-0">
        <div className="flex py-2 gap-1 items-center">
          <div className="w-1 h-4 bg-[#005dac] rounded"></div>
          <span className="font-bold">Favourites</span>
        </div>

        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded py-1">
          <div className="flex space-x-2">
            {events?.map((m, i) => (
              <div
                key={i}
                className="min-w-[72vw] sm:min-w-[25%] h-[41.33vw] sm:h-[172px] rounded-md overflow-hidden shadow bg-white shadow-gray-9"
              >
                {m.forward_url ? (
                  <a
                    href={m.forward_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cursor-zoom-in"
                  >
                    <img
                      className="h-full w-full"
                      src={import.meta.env.VITE_API_URL + m.banner_image}
                    />
                  </a>
                ) : (
                  <button
                    className={`h-full w-full
                          ${
                            m.description
                              ? "cursor-zoom-in pointer-events-auto"
                              : "pointer-events-none"
                          }`}
                    onClick={() => {
                      setIsModalOpen(true);
                      setSelectedPromotion(m);
                    }}
                  >
                    <img
                      className="h-full w-full"
                      src={import.meta.env.VITE_API_URL + m.banner_image}
                    />
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedPromotion?.title ?? ""}
        isFullScreen
      >
        <div className="p-2">
          <img
            src={import.meta.env.VITE_API_URL + selectedPromotion?.banner_image}
            alt={selectedPromotion?.alt_text}
            className="w-full h-30"
          />
          <p className="my-2 font-bold">{selectedPromotion?.sub_title}</p>
          {selectedPromotion?.description && (
            <div
              className="bg-foreground-400 text-sm"
              dangerouslySetInnerHTML={{
                __html: selectedPromotion.description,
              }}
            ></div>
          )}
        </div>
      </Modal>
    </>
  );
}
