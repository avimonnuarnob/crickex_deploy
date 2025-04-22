import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./home-slider-arrow-buttons";

const SLIDE_COUNT = 5;
const SLIDES = Array.from(Array(SLIDE_COUNT).keys());

export default function HomeSlider() {
  const [emblaRef, emblaApi] = useEmblaCarousel();
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  return (
    <section className="embla flex items-center rounded overflow-hidden">
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
    </section>
  );
}
