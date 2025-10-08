import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./home-slider-arrow-buttons";
import { DotButton, useDotButton } from "./home-slider-dots";

const SLIDE_COUNT = 11;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function HomeSlider() {
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

  return (
    <section>
      <div className="embla relative items-center w-full h-full">
        <PrevButton
          className="absolute top-1/2 w-4 h-4 text-[#8d8d8d] z-1 -translate-y-1/2 cursor-pointer left-0"
          onClick={onPrevButtonClick}
          disabled={prevBtnDisabled}
        />
        <div
          className="embla__viewport flex-1 rounded overflow-hidden"
          ref={emblaRef}
        >
          <div className="embla__container">
            {SLIDES.map((index) => (
              <div className="embla__slide md:h-[300px]" key={index}>
                <div className="embla__slide__number h-full">
                  <img
                    className="object-cover h-full w-full"
                    src="https://img.c88rx.com/upload/announcement/image_218805.jpg"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
        <NextButton
          onClick={onNextButtonClick}
          disabled={nextBtnDisabled}
          className="absolute top-1/2 w-4 h-4 z-1 text-[#8d8d8d] -translate-y-1/2 cursor-pointer right-0"
        />
      </div>
      <div className="embla__dots flex gap-1.5 justify-center pt-3.75 pb-2.75">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={"w-5 h-0.5 bg-[#7aa8d0] rounded-xl cursor-pointer"}
          />
        ))}
      </div>
    </section>
  );
}
