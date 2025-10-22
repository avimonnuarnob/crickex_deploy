import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./home-slider-arrow-buttons";
import { DotButton, useDotButton } from "./home-slider-dots";
import { useRouteLoaderData } from "react-router";
import type { PROMOTION, RootLoaderData } from "@/root";
import Modal from "../ui/modal/Modal";
import { useState } from "react";

export default function HomeSlider() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<PROMOTION>();

  return (
    <section className="border-x-2 sm:border-0 border-blue-1">
      <div className="embla relative items-center w-full h-full">
        <PrevButton
          className="absolute top-1/2 w-4 h-4 text-[#8d8d8d] z-1 -translate-y-1/2 cursor-pointer left-0 xl:-left-7.5 hidden sm:block"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <div
          className="embla__viewport flex-1 sm:rounded overflow-hidden"
          ref={emblaRef}
        >
          <div className="embla__container">
            {data?.promotionList
              .filter((promotion) => promotion.slider_show)
              .map((promotion, index) => (
                <div
                  className="embla__slide h-[40vw] sm:max-h-[145px] md:max-h-[300px]"
                  key={index}
                >
                  <div className="embla__slide__number h-full">
                    {promotion.forward_url ? (
                      <a
                        href={promotion.forward_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cursor-zoom-in"
                      >
                        <img
                          className="h-full w-full"
                          src={
                            import.meta.env.VITE_API_URL +
                            promotion.banner_image
                          }
                        />
                      </a>
                    ) : (
                      <button
                        className={`h-full w-full
                          ${
                            promotion.description
                              ? "cursor-zoom-in pointer-events-auto"
                              : "pointer-events-none"
                          }`}
                        onClick={() => {
                          setIsModalOpen(true);
                          setSelectedPromotion(promotion);
                        }}
                      >
                        <img
                          className="h-full w-full"
                          src={
                            import.meta.env.VITE_API_URL +
                            promotion.banner_image
                          }
                        />
                      </button>
                    )}
                  </div>
                </div>
              ))}
          </div>
        </div>
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="absolute top-1/2 w-4 h-4 z-1 text-[#8d8d8d] -translate-y-1/2 cursor-pointer right-0 xl:-right-7.5 hidden sm:block"
        />
      </div>
      <div className="embla__dots flex gap-1.5 justify-center pt-2.75 sm:pt-3.75 pb-2.75 bg-blue-1 sm:bg-transparent">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"w-5 h-0.5 bg-[#7aa8d0] rounded-xl cursor-pointer"}
          />
        ))}
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
    </section>
  );
}
