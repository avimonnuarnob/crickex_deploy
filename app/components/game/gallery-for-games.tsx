import type { GAMES } from "@/routes/game-type";
import classNames from "classnames";
import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";

import GameDescription from "./game-description";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  Field,
  Input,
} from "@headlessui/react";
import { FaChevronRight } from "react-icons/fa6";
import IconButton from "@/components/ui/button/IconButton";
import { FaSearch } from "react-icons/fa";

import noGameImage from "@/assets/images/img-no-game.png";

const GAMES_PER_PAGE = 40;

export default function GalleryForGames({
  games,
  providersMap,
}: {
  games: GAMES;
  providersMap: Map<string, string>;
}) {
  const navigate = useNavigate();
  const { hash, state } = useLocation();
  const vendor = hash.replace("#vendor=", "");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [gameFilter, setGameFilter] = useState<string[]>(() =>
    vendor ? [vendor] : []
  );
  const [pageNumber, setPageNumber] = useState(
    state?.page ? Number(state.page) : 1
  );
  const [open, setOpen] = useState(false);
  const [textFilterInput, setTextFilterInput] = useState<string>();

  const gettersRef = useRef<() => number | null>(null);
  gettersRef.current = () => {
    return pageNumber;
  };
  const callGetters = useCallback(() => gettersRef.current?.(), []);

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
    ? games.filter((game) => {
        return gameFilter.includes(game.p_code);
      })
    : games;

  const gamesToShow = textFilterInput?.length
    ? filteredGames.filter((game) =>
        game.gameName.gameName_enus
          .toLocaleLowerCase()
          .includes(textFilterInput)
      )
    : filteredGames;

  const totalPages =
    Math.floor(gamesToShow.length / GAMES_PER_PAGE) +
    (gamesToShow.length % GAMES_PER_PAGE === 0 ? 0 : 1);

  return (
    <div>
      <div className="relative overflow-hidden sm:rounded">
        <div className="flex gap-2.5 bg-white px-2 pt-2 pb-1.5 overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded pr-14.5">
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
                "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded min-w-[93px] h-[30px] text-center cursor-pointer hover:opacity-[0.7] truncate!",
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
              {providersMap.get(provider)}
            </button>
          ))}
          <IconButton
            className="absolute right-0 top-0 bottom-0 aspect-square rounded-none bg-white sm:bg-blue-1 border-l border-gray-1"
            icon={
              <FaSearch
                aria-hidden="true"
                className="text-black sm:text-white size-4"
              />
            }
            onClick={() => setOpen(true)}
          ></IconButton>
        </div>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex pt-5.25 pb-4.25 gap-1 items-center mx-2">
          <div className="w-1 h-4 bg-[#005dac]"></div>
          <span className="font-bold">Favourites</span>
        </div>
      </div>

      {gamesToShow.length ? (
        <div className="grid gap-x-2.5 gap-y-5 mx-2 grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))]">
          {gamesToShow.slice(0, pageNumber * GAMES_PER_PAGE).map((game, i) => (
            <GameDescription
              key={game.gameName.gameName_enus}
              game={game}
              setIsModalOpen={setIsModalOpen}
              callGetters={callGetters}
            />
          ))}
        </div>
      ) : (
        <div className="p-12.5 bg-white flex flex-col items-center gap-8 drop-shadow-lg">
          <div className="text-blue-1 flex flex-col items-center gap-2">
            <h3 className="text-[68px] font-bold tracking-tighter">SORRY</h3>
            <span>Sorry,</span>
            <span>No matching games</span>
          </div>

          <Button
            className="w-57.5 h-11.25"
            onClick={() => setTextFilterInput(undefined)}
          >
            Back
          </Button>

          <img
            src={noGameImage}
            alt="game_not_found"
            className="w-full h-[40vh] object-contain"
          />
        </div>
      )}

      <div className="text-[13px] mt-6 mb-6">
        {pageNumber >= totalPages ? (
          <p className=" text-[#00000080] text-center">－end of page－</p>
        ) : (
          <>
            <div className="mx-auto w-max">
              <Button
                onClick={() => setPageNumber((pageNumber) => pageNumber + 1)}
                className="w-[105px]"
              >
                Load More
              </Button>
            </div>

            <div className="w-10/12 max-w-96 bg-gray-200 rounded-full h-1.25 dark:bg-gray-700 mx-auto mt-6">
              <div
                className="bg-blue-600 h-1.25 rounded-full"
                style={{ width: `${(pageNumber / totalPages) * 100}%` }}
              ></div>
            </div>

            <p className="text-center mt-4">
              Showing{" "}
              {filteredGames.slice(0, pageNumber * GAMES_PER_PAGE).length} of{" "}
              {""}
              {filteredGames.length} games
            </p>
          </>
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

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        <DialogBackdrop
          transition
          className="fixed inset-0 transition-opacity duration-300 ease-in-out data-closed:opacity-0"
        />

        <div className="fixed inset-0 overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="pointer-events-none fixed top-0 sm:top-15 bottom-0 right-0 flex max-w-full">
              <DialogPanel
                transition
                className="pointer-events-auto relative w-screen max-w-md transform transition duration-300 ease-in-out data-closed:translate-x-full sm:duration-300"
              >
                <form
                  className="h-full bg-white p-1"
                  onSubmit={(e) => {
                    e.preventDefault();
                    const data = new FormData(e.currentTarget);
                    const filterText = data.get("filter")?.toString();
                    setTextFilterInput(filterText);
                    setOpen(false);
                  }}
                >
                  <div className="flex  flex-col">
                    <div className="">
                      <DialogTitle className="text-base font-semibold text-gray-900 flex border-b border-b-[#eeeeee] py-0.5 px-0.75">
                        <IconButton
                          type="button"
                          className="bg-transparent hover:bg-transparent"
                          icon={
                            <FaChevronRight
                              aria-hidden="true"
                              className="size-5.5 text-black"
                            />
                          }
                          onClick={() => setOpen(false)}
                        ></IconButton>
                        <Field className="flex-1">
                          <Input
                            defaultValue={textFilterInput}
                            name="filter"
                            placeholder="Search Games"
                            className="w-full h-full focus:ring-0 focus:outline-0 text-sm font-normal px-5"
                          />
                        </Field>

                        <IconButton
                          type="submit"
                          className="bg-transparent hover:bg-transparent"
                          icon={
                            <FaSearch
                              aria-hidden="true"
                              className="size-5.5 text-black stroke-3"
                            />
                          }
                        ></IconButton>
                      </DialogTitle>
                    </div>
                    <div className="relative mt-3.75 flex-1 px-3">
                      {/* Your content */}
                      <p className="text-sm text-[#0009]">Providers</p>
                      <div className="grid grid-cols-3 gap-2.5 bg-white pt-1.25 pb-4">
                        <button
                          type="button"
                          className={classNames(
                            "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded max-w-[132.48px] h-[35px] text-center cursor-pointer hover:opacity-[0.7]",
                            {
                              "bg-[#005dac]! text-white":
                                gameFilter.length === 0,
                            }
                          )}
                          onClick={() => {
                            setGameFilter([]);
                          }}
                        >
                          All
                        </button>
                        {gameProviders.map((provider) => (
                          <button
                            type="button"
                            key={provider}
                            className={classNames(
                              "bg-[#f5f5f5] px-4 py-2 text-[13px] rounded max-w-[132.48px] h-[35px] text-center cursor-pointer hover:opacity-[0.7] whitespace-nowrap text-ellipsis",
                              {
                                "bg-[#005dac]! text-white":
                                  gameFilter.includes(provider),
                              }
                            )}
                            onClick={() => {
                              if (gameFilter.includes(provider)) {
                                setGameFilter(
                                  gameFilter.filter(
                                    (filter) => filter !== provider
                                  )
                                );
                              } else {
                                setGameFilter(gameFilter.concat(provider));
                              }
                            }}
                          >
                            {providersMap.get(provider)}
                          </button>
                        ))}
                      </div>
                      <Button type="submit" isBlock={true} className="h-12.5">
                        Confirm
                      </Button>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  );
}
