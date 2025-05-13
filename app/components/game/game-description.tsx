import useImageLoaded from "@/hooks/useImageLoaded";
import type { GAME } from "@/routes/game-type";

export default function GameDescription({
  game,
  onClickHandler,
}: {
  game: GAME;
  onClickHandler: any;
}) {
  const [shouldShowSection] = useImageLoaded(
    game.imgFileName.startsWith("/")
      ? "https://ai.cloud7hub.uk" + game.imgFileName
      : game.imgFileName
  );

  return (
    <button
      // overflow hidden somehow getting overwritten by normalize css file. maybe tailwind has less precedence over normalize css.
      className="w-[180px] rounded-md overflow-hidden! bg-white cursor-pointer"
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
          <div className="loader"></div>
        </div>
      )}
      <h3 className="p-2">{game.gameName.gameName_enus}</h3>
    </button>
  );
}
