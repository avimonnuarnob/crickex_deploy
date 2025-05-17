import type { GAMES } from "@/routes/game-type";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Modal from "../ui/modal/Modal";
import Button from "../ui/button/Button";
import GameDescription from "./game-description";

const GAMES_PER_PAGE = 20;

export default function GalleryForGames({ games }: { games: GAMES }) {
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const vendor = hash.replace("#vendor=", "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameFilter, setGameFilter] = useState<string[]>(() =>
    vendor ? [vendor] : []
  );
  const [pageNumber, setPageNumber] = useState(1);

  useEffect(() => {
    if (gameFilter.length && vendor) {
      setGameFilter([vendor]);
    }
  }, [vendor]);

  const loginBtnHandler = () => {
    setIsModalOpen(false);
    navigate(location.pathname + "/account-login-quick" + location.hash);
  };

  const signupBtnHandler = () => {
    setIsModalOpen(false);
    navigate(location.pathname + "/new-register-entry/account" + location.hash);
  };

  const gameProviders: string[] = [
    ...new Set(games.map((game) => game.p_code)),
  ];
  const filteredGames = gameFilter.length
    ? games.filter((game) => gameFilter.includes(game.p_code))
    : games;
  const totalPages =
    Math.floor(filteredGames.length / GAMES_PER_PAGE) +
    (filteredGames.length % GAMES_PER_PAGE === 0 ? 0 : 1);

  return (
    <div>
      <div className="flex gap-2.5 bg-white px-2 pt-2 pb-1.5 overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
        <button
          className={classNames(
            "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded w-[93px] h-[30px] text-center cursor-pointer hover:opacity-[0.7]",
            { "bg-[#005dac]! text-white": gameFilter.length === 0 }
          )}
          onClick={() => {
            setGameFilter([]);
          }}
        >
          All
        </button>
        {gameProviders.map((provider) => (
          <button
            key={provider}
            className={classNames(
              "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded w-[93px] h-[30px] text-center cursor-pointer hover:opacity-[0.7]",
              { "bg-[#005dac]! text-white": gameFilter.includes(provider) }
            )}
            onClick={() => {
              if (gameFilter.includes(provider)) {
                setGameFilter(
                  gameFilter.filter((filter) => filter !== provider)
                );
              } else {
                setGameFilter(gameFilter.concat(provider));
              }
            }}
          >
            {provider}
          </button>
        ))}
      </div>
      <div className="flex pt-5.25 pb-4.25 gap-1 items-center mx-2">
        <div className="w-1 h-4 bg-[#005dac]"></div>
        <span className="font-bold">Favourites</span>
      </div>

      <div
        className="grid gap-x-2.5 gap-y-5 mx-2"
        style={{
          gridTemplateColumns: "repeat(auto-fill,minmax(180px,1fr))",
        }}
      >
        {filteredGames.slice(0, pageNumber * GAMES_PER_PAGE).map((game, i) => (
          <GameDescription
            key={game.gameName.gameName_enus}
            game={game}
            setIsModalOpen={setIsModalOpen}
          />
        ))}
      </div>

      <div className="text-[13px] pt-3.75 pb-5">
        {totalPages > 0 && totalPages === pageNumber ? (
          <p className=" text-[#00000080] text-center">－end of page－</p>
        ) : (
          <div className="mx-auto w-max">
            <Button
              onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
              className=""
            >
              Load More
            </Button>
          </div>
        )}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Notification"
      >
        <div className="px-4 pt-2.5 pb-5">
          <p className="mb-6 text-sm">
            Please login or sign up to play the game.
          </p>
          <div className="mx-auto grid w-full max-w-sm grid-cols-2 gap-4">
            <Button className="h-10 rounded-xs" onClick={loginBtnHandler}>
              Login
            </Button>
            <Button
              className="rounded-xs text-black"
              color="yellow"
              onClick={signupBtnHandler}
            >
              Sign Up
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
