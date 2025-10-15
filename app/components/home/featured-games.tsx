import type { GAME, GAMES } from "@/routes/game-type";
import { useEffect, useState } from "react";
import GameDescription from "../game/game-description";
import Modal from "../ui/modal/Modal";
import { useNavigate } from "react-router";
import Button from "../ui/button/Button";

export default function FeaturedGames() {
  const [gamesData, setGamesData] = useState<GAMES | null>(null);
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const loginBtnHandler = () => {
    setIsModalOpen(false);
    navigate("/account-login-quick");
  };

  const signupBtnHandler = () => {
    setIsModalOpen(false);
    navigate("/new-register-entry/account");
  };

  useEffect(() => {
    fetch(`https://ai.cloud7hub.uk/game/getGameListByType/HT/`)
      .then((response) => response.json())
      .then((d) =>
        setGamesData([
          {
            g_code: "1_237_CrazyTime0000001",
            g_type: "Casino",
            p_code: "EVL",
            p_type: "LC",
            gameName: {
              gameName_enus: "Crazy Time",
              gameName_zhcn: "Crazy Time",
            },
            imgFileName:
              "/media/whitecliff_game_image/EVL/1_237_CrazyTime0000001.svg",
            displaydemo: "",
            iframe: true,
            operator: "whitecliff",
          },
          {
            g_code: "roulette_244",
            g_type: "Exclusive",
            p_code: "VIVO",
            p_type: "LC",
            gameName: {
              gameName_enus: "Blaze Roulette",
              gameName_zhcn: "Blaze Roulette",
            },
            imgFileName: "/media/vivo_game_image/VIVO/roulette_244.png",
            displaydemo: "",
            iframe: true,
            operator: "vivo",
          },
          {
            g_code: "420033385",
            g_type: "Slots",
            p_code: "POK",
            p_type: "SL",
            gameName: {
              gameName_enus: "Crash Extreme",
              gameName_zhcn: "Crash Extreme",
            },
            imgFileName: "/media/bcon_game_image/POK/420033385.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "420032901",
            g_type: "Slots",
            p_code: "POK",
            p_type: "SL",
            gameName: {
              gameName_enus: "Lucky Spin",
              gameName_zhcn: "Lucky Spin",
            },
            imgFileName: "/media/bcon_game_image/POK/420032901.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "500000203",
            g_type: "Slots",
            p_code: "POK",
            p_type: "SL",
            gameName: {
              gameName_enus: "Crash Poki",
              gameName_zhcn: "Crash Poki",
            },
            imgFileName: "/media/bcon_game_image/POK/500000203.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "500000397",
            g_type: "Slots",
            p_code: "POK",
            p_type: "SL",
            gameName: {
              gameName_enus: "Avi",
              gameName_zhcn: "Avi",
            },
            imgFileName: "/media/bcon_game_image/POK/500000397.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "3259_tg_400044043",
            g_type: "Lava",
            p_code: "BCON",
            p_type: "LC",
            gameName: {
              gameName_enus: "3 Card Poker",
              gameName_zhcn: "3 Card Poker",
            },
            imgFileName: "/media/bcon_game_image/BCON/3259_tg_400044043.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "3210_1_tg_400044000",
            g_type: "Lava",
            p_code: "BCON",
            p_type: "LC",
            gameName: {
              gameName_enus: "Roulette Lava Winner",
              gameName_zhcn: "Roulette Lava Winner",
            },
            imgFileName: "/media/bcon_game_image/BCON/3210_1_tg_400044000.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "3213_tg_400044023",
            g_type: "Lava",
            p_code: "BCON",
            p_type: "LC",
            gameName: {
              gameName_enus: "Roulette Lava English",
              gameName_zhcn: "Roulette Lava English",
            },
            imgFileName: "/media/bcon_game_image/BCON/3213_tg_400044023.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "3670_1_tg_400032362",
            g_type: "BCON",
            p_code: "BCON",
            p_type: "LC",
            gameName: {
              gameName_enus: "Roulette Aurum",
              gameName_zhcn: "Roulette Aurum",
            },
            imgFileName: "/media/bcon_game_image/BCON/3670_1_400032362.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "125_tg_400040781",
            g_type: "BCON",
            p_code: "BCON",
            p_type: "LC",
            gameName: {
              gameName_enus: "Roulette Brasileira",
              gameName_zhcn: "Roulette Brasileira",
            },
            imgFileName: "/media/bcon_game_image/BCON/125_tg_400040781.png",
            displaydemo: "",
            iframe: true,
            operator: "bcon",
          },
          {
            g_code: "22-22001",
            g_type: "Exclusive",
            p_code: "JDB",
            p_type: "SL",
            gameName: {
              gameName_enus: "Aviator",
              gameName_zhcn: "Aviator",
            },
            imgFileName: "/media/jdbsw_game_image/JDB/22-22001.png",
            displaydemo: "",
            iframe: true,
            operator: "jdbsw",
          },
          {
            g_code: "22-22004",
            g_type: "Exclusive",
            p_code: "JDB",
            p_type: "SL",
            gameName: {
              gameName_enus: "Plinko",
              gameName_zhcn: "Plinko",
            },
            imgFileName: "/media/jdbsw_game_image/JDB/22-22004.png",
            displaydemo: "",
            iframe: true,
            operator: "jdbsw",
          },
          {
            g_code: "41-41001",
            g_type: "Exclusive",
            p_code: "JDB",
            p_type: "LC",
            gameName: {
              gameName_enus: "Baccarat",
              gameName_zhcn: "Baccarat",
            },
            imgFileName: "/media/jdbsw_game_image/JDB/41-41001.png",
            displaydemo: "",
            iframe: true,
            operator: "jdbsw",
          },
          {
            g_code: "0-14093",
            g_type: "Exclusive",
            p_code: "JDB",
            p_type: "SL",
            gameName: {
              gameName_enus: "Magic Ace WILD LOCK",
              gameName_zhcn: "Magic Ace WILD LOCK",
            },
            imgFileName: "/media/jdbsw_game_image/JDB/0-14093.png",
            displaydemo: "",
            iframe: true,
            operator: "jdbsw",
          },
          {
            g_code: "0-14088",
            g_type: "Exclusive",
            p_code: "JDB",
            p_type: "SL",
            gameName: {
              gameName_enus: "Magic Ace",
              gameName_zhcn: "Magic Ace",
            },
            imgFileName: "/media/jdbsw_game_image/JDB/0-14088.png",
            displaydemo: "",
            iframe: true,
            operator: "jdbsw",
          },
          {
            g_code: "rl-29",
            g_type: "Exclusive",
            p_code: "MJO",
            p_type: "LC",
            gameName: {
              gameName_enus: "500x Egypt Auto Roulette",
              gameName_zhcn: "500x Egypt Auto Roulette",
            },
            imgFileName: "/media/mojos_game_image/MJO/rl-29.png",
            displaydemo: "",
            iframe: true,
            operator: "mojos",
          },
          {
            g_code: "rl-19",
            g_type: "Exclusive",
            p_code: "MJO",
            p_type: "LC",
            gameName: {
              gameName_enus: "500x Sports Auto Roulette",
              gameName_zhcn: "500x Sports Auto Roulette",
            },
            imgFileName: "/media/mojos_game_image/MJO/rl-19.png",
            displaydemo: "",
            iframe: true,
            operator: "mojos",
          },
          {
            g_code: "dt-1",
            g_type: "Exclusive",
            p_code: "MJO",
            p_type: "LC",
            gameName: {
              gameName_enus: "Dragon Tiger",
              gameName_zhcn: "Dragon Tiger",
            },
            imgFileName: "/media/mojos_game_image/MJO/dt-1.jpg",
            displaydemo: "",
            iframe: true,
            operator: "mojos",
          },
          {
            g_code: "rl-24",
            g_type: "Exclusive",
            p_code: "MJO",
            p_type: "LC",
            gameName: {
              gameName_enus: "500x Cyber Auto Roulette",
              gameName_zhcn: "500x Cyber Auto Roulette",
            },
            imgFileName: "/media/mojos_game_image/MJO/rl-24.png",
            displaydemo: "",
            iframe: true,
            operator: "mojos",
          },
          {
            g_code: "rl-14",
            g_type: "Exclusive",
            p_code: "MJO",
            p_type: "LC",
            gameName: {
              gameName_enus: "500x Turkish Roulette",
              gameName_zhcn: "500x Turkish Roulette",
            },
            imgFileName: "/media/mojos_game_image/MJO/rl-14.png",
            displaydemo: "",
            iframe: true,
            operator: "mojos",
          },
          {
            g_code: "rl-15",
            g_type: "Exclusive",
            p_code: "MJO",
            p_type: "LC",
            gameName: {
              gameName_enus: "777x Galaxy Roulette",
              gameName_zhcn: "777x Galaxy Roulette",
            },
            imgFileName: "/media/mojos_game_image/MJO/rl-15.png",
            displaydemo: "",
            iframe: true,
            operator: "mojos",
          },
          {
            g_code: "STUDIO-LW-LLWC01",
            g_type: "Casino",
            p_code: "WE",
            p_type: "LC",
            gameName: {
              gameName_enus: "LUCKY WHEEL",
              gameName_zhcn: "LUCKY WHEEL",
            },
            imgFileName: "/media/we_game_image/WE/STUDIO-LW-LLWC01.png",
            displaydemo: "",
            iframe: true,
            operator: "we",
          },
          {
            g_code: "MINI-WEC_MINI-plinkogame",
            g_type: "Exclusive",
            p_code: "WE",
            p_type: "TR",
            gameName: {
              gameName_enus: "Plinko Game",
              gameName_zhcn: "Plinko Game",
            },
            imgFileName: "/media/we_game_image/WE/MINI-WEC_MINI-plinkogame.png",
            displaydemo: "",
            iframe: true,
            operator: "we",
          },
          {
            g_code: "200000136",
            g_type: "Exclusive",
            p_code: "JCTP",
            p_type: "LC",
            gameName: {
              gameName_enus: "Space Ball Roulette",
              gameName_zhcn: "Space Ball Roulette",
            },
            imgFileName: "/media/jacktop_game_image/JCTP/200000136.png",
            displaydemo: "",
            iframe: true,
            operator: "jacktop",
          },
          {
            g_code: "200000240",
            g_type: "Exclusive",
            p_code: "JCTP",
            p_type: "LC",
            gameName: {
              gameName_enus: "Lucky Chicken Crossing",
              gameName_zhcn: "Lucky Chicken Crossing",
            },
            imgFileName: "/media/jacktop_game_image/JCTP/200000240.png",
            displaydemo: "",
            iframe: true,
            operator: "jacktop",
          },
          {
            g_code: "25",
            g_type: "Exclusive",
            p_code: "TVB",
            p_type: "LC",
            gameName: {
              gameName_enus: "Roulette X500",
              gameName_zhcn: "Roulette X500",
            },
            imgFileName: "/media/tvbet_game_image/TVB/25.png",
            displaydemo: "",
            iframe: true,
            operator: "tvbet",
          },
          {
            g_code: "9",
            g_type: "Exclusive",
            p_code: "TVB",
            p_type: "LC",
            gameName: {
              gameName_enus: "Keno",
              gameName_zhcn: "Keno",
            },
            imgFileName: "/media/tvbet_game_image/TVB/9.png",
            displaydemo: "",
            iframe: true,
            operator: "tvbet",
          },
          {
            g_code: "HLBCRT30S",
            g_type: "Exclusive",
            p_code: "VIA",
            p_type: "LC",
            gameName: {
              gameName_enus: "Rocket HiLo ​​Baccarat",
              gameName_zhcn: "Rocket HiLo ​​Baccarat",
            },
            imgFileName: "/media/via_game_image/VIA/HLBCRT30S.png",
            displaydemo: "",
            iframe: true,
            operator: "via",
          },
        ])
      );
  }, []);

  return (
    <div className="w-full px-2 sm:px-0">
      <div className="flex py-2 gap-1 items-center">
        <div className="w-1 h-4 bg-[#005dac] rounded"></div>
        <span className="font-bold">Popular Games</span>
      </div>

      <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
        <div className="flex gap-x-2 [&>*]:min-w-[180px] [&_img]:max-h-[120px]">
          {gamesData?.map((game, i) => (
            <GameDescription
              key={game.gameName.gameName_enus}
              game={game}
              setIsModalOpen={setIsModalOpen}
            />
          ))}
        </div>
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
