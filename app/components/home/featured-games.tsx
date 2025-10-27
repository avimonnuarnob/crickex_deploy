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
    fetch(import.meta.env.VITE_API_URL + `/game/getGameListByType/HT/`)
      .then((response) => response.json())
      .then((d) => setGamesData(d.data));
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
