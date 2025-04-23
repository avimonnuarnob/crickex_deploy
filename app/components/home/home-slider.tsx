import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./home-slider-arrow-buttons";
import { DotButton, useDotButton } from "./home-slider-dots";

const SLIDE_COUNT = 11;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function HomeSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
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
      <div className="embla flex items-center rounded overflow-hidden">
        {/* <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} /> */}
        <div className="embla__viewport flex-1" ref={emblaRef}>
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
        {/* <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} /> */}
      </div>
      <div className="embla__dots flex gap-1.5 justify-center py-3.75">
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
