import useImageLoaded from "@/hooks/useImageLoaded";
import type { GAME } from "@/routes/game-type";
import classNames from "classnames";
import Cookies from "js-cookie";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router";

import heartIcon from "@/assets/icon/icon-heart.svg";

export default function GameDescription({
  game,
  setIsModalOpen,
  callGetters,
}: {
  game: GAME;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
  callGetters?: () => any;
}) {
  const [shouldShowSection] = useImageLoaded(
    game.imgFileName.startsWith("/")
      ? "https://img.softtake.net" + game.imgFileName
      : game.imgFileName
  );
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = useState(false);

  const onClickHandler = async (game: GAME) => {
    const userToken = Cookies.get("userToken");
    if (!userToken) {
      setIsModalOpen(true);
    } else {
      if (game.iframe) {
        navigate(
          `/open-game/${game.p_code}/${game.p_type}/${game.g_code}/${game.operator}`,
          {
            state: {
              from: location.search
                ? location.pathname + location.search
                : location.pathname,
              page: callGetters?.(),
            },
          }
        );
      } else {
        setIsLoading(true);
        await fetch(
          import.meta.env.VITE_API_URL +
            `/game/launchGame/${game.p_code}/${game.p_type}/?game_id=${game.g_code}&operator=${game.operator}`,
          {
            method: "GET",
            headers: {
              Authorization: `Token ${userToken}`,
            },
          }
        )
          .then((d) => d.json())
          .then((game_info) => {
            window.open(game_info?.data?.gameUrl, "_blank")?.focus();
            setIsLoading(false);
          });
      }
    }
  };

  return (
    <button
      // overflow hidden somehow getting overwritten by normalize css file. maybe tailwind has less precedence over normalize css.
      className={classNames(
        "w-full h-full rounded-[3px] overflow-hidden! bg-white cursor-pointer",
        {
          "animate-pulse": isLoading,
        }
      )}
      onClick={() => onClickHandler(game)}
    >
      {shouldShowSection ? (
        <div className="w-full h-full max-h-[120px] rounded-md">
          <img
            src={
              game.imgFileName.startsWith("/")
                ? "https://img.softtake.net" + game.imgFileName
                : game.imgFileName
            }
            alt={game.gameName.gameName_enus}
            className="w-full h-full"
            decoding="async"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="w-full h-[120px] flex justify-center items-center">
          <div className="loader small"></div>
        </div>
      )}
      <div className="flex p-2 items-center">
        <h3 className="text-left whitespace-nowrap truncate flex-1">
          {game.gameName.gameName_enus}
        </h3>
        <button>
          <img src={heartIcon} alt="heart" className="w-5 h-5" />
        </button>
      </div>
    </button>
  );
}
