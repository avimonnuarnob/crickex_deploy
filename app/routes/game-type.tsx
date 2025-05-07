import { Outlet, useSearchParams } from "react-router";
import type { Route } from "./+types/game-type";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import Cookies from "js-cookie";
import Modal from "@/components/ui/modal/Modal";

type GAMES = GAME[];

interface GAME {
  g_code: string;
  g_type: string;
  p_code: string;
  p_type: string;
  gameName: GameName;
  imgFileName: string;
  displaydemo: string;
  iframe: boolean;
  operator: string;
}

interface GameName {
  gameName_enus: string;
  gameName_zhcn: string;
}

export async function clientLoader({ params }: Route.ClientLoaderArgs) {
  const res = await fetch(
    `https://ai.cloud7hub.uk/game/getGameListByType/${params.gametype}/`
  );
  const games = await res.json();
  return games.data as GAMES;
}

export default function GameType({ loaderData }: Route.ComponentProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gameurl = useRef("");

  const [searchParams] = useSearchParams();
  const vendor = searchParams.get("vendor");
  const [gameFilter, setGameFilter] = useState<string[]>(() =>
    vendor ? [vendor] : []
  );
  const games = loaderData;

  useEffect(() => {
    if (gameFilter.length && vendor) {
      setGameFilter([vendor]);
    }
  }, [vendor]);

  const gameProviders: string[] = [
    ...new Set(games.map((game) => game.p_code)),
  ];
  const filteredGames = gameFilter.length
    ? games.filter((game) => gameFilter.includes(game.p_code))
    : games;

  if (vendor) {
    // setGameFilter(gameFilter.concat(vendor));
  }

  return (
    <>
      <div className="mt-18 py-1">
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
          {filteredGames.map((game, i) => (
            <button
              key={i.toString()}
              // overflow hidden somehow getting overwritten by normalize css file. maybe tailwind has less precedence over normalize css.
              className="w-[180px] rounded-md overflow-hidden! bg-white"
              onClick={async () => {
                const response = await fetch(
                  "https://ai.cloud7hub.uk/game/launchGame/BCON/SL/?game_id=420013999&operator=bcon",
                  {
                    method: "GET",
                    headers: {
                      Authorization: `Token ${Cookies.get("userToken")}`,
                    },
                  }
                );
                const data = (await response.json()) as any;
                gameurl.current = data.data.gameUrl;
                setIsModalOpen(true);
              }}
            >
              <img
                src={"https://ai.cloud7hub.uk" + game.imgFileName}
                alt={`Match ${i + 1}`}
                className="w-full h-[120px]"
              />
              <h3 className="p-2">{game.gameName.gameName_enus}</h3>
            </button>
          ))}
        </div>
        <div className="text-[13px] pt-3.75 pb-5 text-[#00000080] text-center">
          －end of page－
        </div>

        <Modal
          onClose={() => {
            setIsModalOpen(false);
          }}
          isOpen={isModalOpen}
          title="Game"
        >
          <iframe src={gameurl.current} className="w-full h-100"></iframe>
        </Modal>
        <Outlet />
      </div>
    </>
  );
}
