import useImageLoaded from "@/hooks/useImageLoaded";
import type { GAME } from "@/routes/game-type";
import classNames from "classnames";
import Cookies from "js-cookie";
import { useState, type Dispatch, type SetStateAction } from "react";
import { useLocation, useNavigate } from "react-router";

export default function GameDescription({
  game,
  setIsModalOpen,
}: {
  game: GAME;
  setIsModalOpen: Dispatch<SetStateAction<boolean>>;
}) {
  const [shouldShowSection] = useImageLoaded(
    game.imgFileName.startsWith("/")
      ? "https://ai.cloud7hub.uk" + game.imgFileName
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
              redirect: location.pathname,
            },
          }
        );
      } else {
        setIsLoading(true);
        await fetch(
          `https://ai.cloud7hub.uk/game/launchGame/${game.p_code}/${game.p_type}/?game_id=${game.g_code}&operator=${game.operator}`,
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
        "w-[180px] rounded-md overflow-hidden! bg-white cursor-pointer",
        {
          "animate-pulse": isLoading,
        }
      )}
      onClick={() => onClickHandler(game)}
    >
      {shouldShowSection ? (
        <img
          src={
            game.imgFileName.startsWith("/")
              ? "https://ai.cloud7hub.uk" + game.imgFileName
              : game.imgFileName
          }
          alt={game.gameName.gameName_enus}
          className="w-full h-[120px]"
          decoding="async"
          loading="lazy"
        />
      ) : (
        <div className="w-full h-[120px] flex justify-center items-center">
          <div className="loader small"></div>
        </div>
      )}
      <h3 className="p-2">{game.gameName.gameName_enus}</h3>
    </button>
  );
}
