import type { BONUSES } from "@/routes/index";
import Autoplay from "embla-carousel-autoplay";
import useEmblaCarousel from "embla-carousel-react";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./home-slider-arrow-buttons";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Button from "../ui/button/Button";

export default function ClaimBonusSlider({ bonuses }: { bonuses?: BONUSES }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: true, delay: 3000 }),
  ]);
  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);
  const { isLoggedIn } = useCurrentUser();
  if (!bonuses) return null;
  return (
    <div className="embla relative xl:flex gap-4 items-center w-full h-full @container">
      <div
        className="embla__viewport flex-1 sm:rounded overflow-hidden"
        ref={emblaRef}
      >
        <div className="embla__container">
          {bonuses.map((bonus, index) => (
            <div
              className="embla__slide h-[40vw] sm:max-h-[145px] md:max-h-[300px]"
              key={index}
            >
              <img
                src={import.meta.env.VITE_API_URL + bonus.image}
                alt={bonus.alt_text}
              />

              <div className="bg-[#141615] w-full flex flex-col items-center justify-center p-3 pt-0 gap-3 rounded-b">
                <div
                  className="w-full p-2 rounded flex justify-center"
                  style={{
                    clipPath: "polygon(0 0, 100% 0, 90% 100%, 10% 100%)",
                    boxShadow:
                      "-3px -4px 4px 0 rgba(0, 0, 0, 0.25) inset, 5px 0 4px 0 rgba(0, 0, 0, 0.25) inset, 0 7px 4px 0 rgba(0, 0, 0, 0.25) inset",
                    background:
                      "linear-gradient(270deg, #1E4640 0%, #111 50%, #530E0E 100%)",
                  }}
                >
                  <h3 className="text-base font-semibold text-foreground-100">
                    {bonus.name}
                  </h3>
                </div>
                {isLoggedIn ? (
                  <form
                    className="w-10/12"
                    onSubmit={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      fetch(
                        import.meta.env.VITE_API_URL +
                          "/wallet/add-claim-bonus/",
                        {
                          method: "POST",
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${Cookies.get("userToken")}`,
                          },
                          body: JSON.stringify({
                            claim_bonus_id: bonus.id,
                          }),
                        }
                      )
                        .then((response) => response.json())
                        .then((data) => {
                          if (data.status === "ok") {
                            toast.success(data.message);
                          } else {
                            toast.error(data.errors);
                          }
                        });
                    }}
                  >
                    <div className="w-full mx-auto">
                      <Button
                        disabled={!bonus.active}
                        className="w-full text-2xl p-6 font-bold cursor-pointer text-foreground-100 uppercase rounded-2xl"
                        type="submit"
                        style={{
                          background:
                            "linear-gradient(90deg, #b31217, #e52d27)",
                          border: "6px solid #3b0c0c",
                          boxShadow:
                            "inset 0 4px 12px rgba(0, 0, 0, 0.7),\n    inset 0 -4px 8px rgba(255, 255, 255, 0.1)",
                        }}
                      >
                        {bonus?.alt_text}
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="w-full mx-auto">
                    <Button
                      disabled={!bonus.active}
                      className="w-full text-2xl p-6 font-bold cursor-pointer text-foreground-100 uppercase rounded-2xl"
                      type="submit"
                      style={{
                        background: "linear-gradient(90deg, #b31217, #e52d27)",
                        border: "6px solid #3b0c0c",
                        boxShadow:
                          "inset 0 4px 12px rgba(0, 0, 0, 0.7),\n    inset 0 -4px 8px rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      {bonus?.alt_text}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
