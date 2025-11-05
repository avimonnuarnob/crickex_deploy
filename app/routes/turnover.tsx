import Modal from "@/components/ui/modal/Modal";
import Cookies from "js-cookie";
import type { Route } from "./+types/turnover";
import { Await, useNavigate } from "react-router";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import React, { Fragment, useState } from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";

export interface TURNOVER {
  id: number;
  base_amount: string;
  turnover_amount: string;
  bet_amount: string;
  turnover_achieved: string;
  bonus_base_amount: string;
  bonus_turnover_amount: string;
  bonus_bet_amount: string;
  bonus_turnover_achieved: string;
  created_at: string;
  updated_at: string;
  user: number;
}

export const clientLoader = async () => {
  const promiseOfTurnover = fetch(
    import.meta.env.VITE_API_URL + "/turnover/user-turnover/",
    {
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.data as TURNOVER);
  return {
    promiseOfTurnover,
  };
};

export default function TurnoverPage({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { promiseOfTurnover } = loaderData;
  const { userInfo } = useCurrentUser();
  const navigate = useNavigate();
  const status = params.status;

  const [selectedIndex, setSelectedIndex] = useState(
    status === "active" ? 0 : 1
  );

  const [isTurnoverModalOpen, setTurnoverModalOpen] = useState(true);
  const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
  const [selectedTurnover, setSelectedTurnover] = useState<TURNOVER | null>(
    null
  );

  return (
    <>
      <Modal
        title="Turnover"
        isOpen={isTurnoverModalOpen}
        onClose={() => {
          setTimeout(() => {
            const a = location.pathname.replace(
              "/member/turnover/" + status,
              ""
            );
            navigate(a ? a + location.hash : "/" + location.hash);
          }, 200);

          setTurnoverModalOpen(false);
        }}
        isFullScreen={true}
      >
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center flex-col h-full">
              <div className="list-loading w-10 h-10">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <Await resolve={promiseOfTurnover}>
            {(turnover) => {
              if (!turnover) {
                return (
                  <div className="p-2">
                    <p className="text-center text-gray-8">
                      - No turnover found -
                    </p>
                  </div>
                );
              }
              const isTurnoverActive =
                Number(turnover?.turnover_achieved) < 100 ||
                Number(turnover?.bonus_turnover_achieved) < 100;

              return (
                <TabGroup
                  className="flex flex-col h-full max-w-full overflow-x-hidden"
                  selectedIndex={selectedIndex}
                  onChange={(index) => {
                    setSelectedIndex(index);
                  }}
                >
                  <TabList
                    className="flex bg-blue-1 text-sm"
                    style={{
                      boxShadow: "0 1px 3px #0000004d",
                    }}
                  >
                    <Tab as={Fragment}>
                      <button className="flex-1 p-[4vw_0] sm:p-[15px_0] border-b-3 border-transparent rounded-none data-selected:border-yellow-1 group cursor-pointer">
                        <span className="group-data-selected:text-yellow-1 text-gray-1 font-semibold">
                          Active
                        </span>
                      </button>
                    </Tab>
                    <Tab as={Fragment}>
                      <button className="flex-1 p-[4vw_0] sm:p-[15px_0] border-b-3 border-transparent rounded-none data-selected:border-yellow-1 group cursor-pointer">
                        <span className="group-data-selected:text-yellow-1 text-gray-1 font-semibold">
                          Completed
                        </span>
                      </button>
                    </Tab>
                  </TabList>

                  <TabPanels className="flex bg-white flex-1">
                    <TabPanel
                      unmount={false}
                      className="data-[selected]:w-full w-0"
                    >
                      <Transition
                        appear
                        show={selectedIndex == 0}
                        enter="transition-transform duration-300"
                        enterFrom="-translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-transform duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="-translate-x-full"
                      >
                        <div className="p-2">
                          {isTurnoverActive && (
                            <div className="bg-[#a9c1d6] flex p-[1.3333333333vw] sm:p-1.25 items-center justify-center w-full relative">
                              <div className="h-full w-full bg-white flex">
                                <div className="w-[75%] p-[2.6666666667vw_2.6666666667vw_2.6666666667vw_4vw] sm:p-[10px_10px_10px_15px] border-r-2 border-r-[#a9c1d6] border-dashed space-y-[1.3333333333vw] sm:space-y-1.25">
                                  <div className="flex gap-[1.0666666667vw] sm:gap-1 items-center">
                                    <div className="h-[4.8vw] w-[1.0666666667vw] sm:h-4.5 sm:w-1 rounded bg-blue-1"></div>
                                    <div className="text-[3.7333333333vw] sm:text-sm font-semibold truncate">
                                      Deposit{" "}
                                      {turnover?.bonus_base_amount
                                        ? "+ Bonus"
                                        : null}
                                    </div>
                                  </div>

                                  <div className="flex gap-[1.3333333333vw] sm:gap-1.25 items-center">
                                    <div className="text-[2.6666666667vw] sm:text-[10px] text-blue-1">
                                      Start at:{" "}
                                      {turnover?.created_at.split("T")[0]}
                                    </div>
                                    <button
                                      onClick={() => {
                                        setIsDetailModalOpen(true);
                                        setSelectedTurnover(turnover);
                                      }}
                                      className="z-2 p-[.5333333333vw_1.0666666667vw]! sm:px-1! sm:py-0.5! border-[.2666666667vw]! sm:border-1 border-blue-1 rounded text-[2.6666666667vw]! sm:text-[10px]! text-blue-1"
                                    >
                                      Detail
                                    </button>
                                  </div>

                                  <div className="text-[#ffae12] text-[5.8666666667vw] sm:text-[22px] font-bold">
                                    {userInfo?.currency_icon}{" "}
                                    {Number(turnover?.base_amount) +
                                      Number(turnover?.bonus_base_amount ?? 0)}
                                  </div>

                                  <div className="space-y-[1.3333333333vw] sm:space-y-1.25">
                                    <div
                                      className="relative w-full h-[1.3333333333vw] sm:h-1.25 rounded bg-[#0000004d]"
                                      style={{
                                        boxShadow:
                                          "inset 0 0 .2666666667rem #999",
                                      }}
                                    >
                                      <div
                                        className="absolute left-0 h-full rounded"
                                        style={{
                                          width: `${
                                            Number(
                                              turnover?.turnover_achieved
                                            ) >= 100
                                              ? 100
                                              : turnover?.turnover_achieved
                                          }%`,
                                          background:
                                            "linear-gradient(to right,#ffce41,#fbac26)",
                                        }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-8 text-[2.6666666667vw] sm:text-[10px]">
                                        {Number(turnover?.turnover_achieved) +
                                          Number(
                                            turnover?.bonus_turnover_achieved ??
                                              0
                                          )}
                                      </span>
                                      <span className="text-gray-8 text-[2.6666666667vw] sm:text-[10px]">
                                        {Number(turnover?.base_amount) +
                                          Number(
                                            turnover?.bonus_base_amount ?? 0
                                          )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="w-[25%] flex justify-center items-center">
                                  <div>
                                    <span>Active</span>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute z-1 inset-0 overflow-hidden">
                                <div
                                  className="absolute left-0 w-5 h-full"
                                  style={{
                                    background:
                                      "radial-gradient(circle, #a9c1d6 48%, #fff0 0%)",
                                    backgroundPosition: "-5px",
                                    backgroundSize: "20px 20px",
                                    backgroundRepeat: "repeat-y",
                                  }}
                                ></div>
                                <div
                                  className="absolute right-0 w-5 h-full"
                                  style={{
                                    background:
                                      "radial-gradient(circle, #a9c1d6 48%, #fff0 0%)",
                                    backgroundPosition: "5px",
                                    backgroundSize: "20px 20px",
                                    backgroundRepeat: "repeat-y",
                                  }}
                                ></div>
                                <div className="absolute left-[75%] w-[3.7333333333vw] h-[3.7333333333vw] sm:w-3.5 sm:h-3.5 bg-[#a9c1d6] -translate-x-[72%] rounded-full -top-[2px]"></div>
                                <div className="absolute left-[75%] w-[3.7333333333vw] h-[3.7333333333vw] sm:w-3.5 sm:h-3.5 bg-[#a9c1d6] -translate-x-[72%] rounded-full -bottom-[2px]"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Transition>
                    </TabPanel>

                    <TabPanel
                      unmount={false}
                      className="data-[selected]:w-full w-0"
                    >
                      <Transition
                        appear
                        show={selectedIndex == 1}
                        enter="transition-transform duration-300"
                        enterFrom="translate-x-full"
                        enterTo="translate-x-0"
                        leave="transition-transform duration-300"
                        leaveFrom="translate-x-0"
                        leaveTo="translate-x-full"
                      >
                        <div className="p-2">
                          {!isTurnoverActive && (
                            <div className="bg-[#a9c1d6] flex p-[1.3333333333vw] sm:p-1.25 items-center justify-center w-full relative">
                              <div className="h-full w-full bg-white flex">
                                <div className="w-[75%] p-[2.6666666667vw_2.6666666667vw_2.6666666667vw_4vw] sm:p-[10px_10px_10px_15px] border-r-2 border-r-[#a9c1d6] border-dashed space-y-[1.3333333333vw] sm:space-y-1.25">
                                  <div className="flex gap-[1.0666666667vw] sm:gap-1 items-center">
                                    <div className="h-[4.8vw] w-[1.0666666667vw] sm:h-4.5 sm:w-1 rounded bg-blue-1"></div>
                                    <div className="text-[3.7333333333vw] sm:text-sm font-semibold truncate">
                                      Deposit{" "}
                                      {turnover?.bonus_base_amount
                                        ? "+ Bonus"
                                        : null}
                                    </div>
                                  </div>

                                  <div className="flex gap-[1.3333333333vw] sm:gap-1.25 items-center">
                                    <div className="text-[2.6666666667vw] sm:text-[10px] text-blue-1">
                                      Start at:{" "}
                                      {turnover?.created_at.split("T")[0]}
                                    </div>
                                    <button className="p-[.5333333333vw_1.0666666667vw]! sm:px-1! sm:py-0.5! border-[.2666666667vw]! sm:border-1 border-blue-1 rounded text-[2.6666666667vw]! sm:text-[10px]! text-blue-1">
                                      Detail
                                    </button>
                                  </div>

                                  <div className="text-[#ffae12] text-[5.8666666667vw] sm:text-[22px] font-bold">
                                    {userInfo?.currency_icon}{" "}
                                    {Number(turnover?.base_amount) +
                                      Number(turnover?.bonus_base_amount ?? 0)}
                                  </div>

                                  <div className="space-y-[1.3333333333vw] sm:space-y-1.25">
                                    <div
                                      className="relative w-full h-[1.3333333333vw] sm:h-1.25 rounded bg-[#0000004d]"
                                      style={{
                                        boxShadow:
                                          "inset 0 0 .2666666667rem #999",
                                      }}
                                    >
                                      <div
                                        className="absolute left-0 h-full rounded"
                                        style={{
                                          width: `${
                                            Number(
                                              turnover?.turnover_achieved
                                            ) >= 100
                                              ? 100
                                              : turnover?.turnover_achieved
                                          }%`,
                                          background:
                                            "linear-gradient(to right,#ffce41,#fbac26)",
                                        }}
                                      ></div>
                                    </div>
                                    <div className="flex justify-between items-center">
                                      <span className="text-gray-8 text-[2.6666666667vw] sm:text-[10px]">
                                        {Number(turnover?.turnover_achieved) +
                                          Number(
                                            turnover?.bonus_turnover_achieved ??
                                              0
                                          )}
                                      </span>
                                      <span className="text-gray-8 text-[2.6666666667vw] sm:text-[10px]">
                                        {Number(turnover?.base_amount) +
                                          Number(
                                            turnover?.bonus_base_amount ?? 0
                                          )}
                                      </span>
                                    </div>
                                  </div>
                                </div>

                                <div className="w-[25%] flex justify-center items-center">
                                  <div>
                                    <span className="text-green-1 text-xs">
                                      Completed
                                    </span>
                                  </div>
                                </div>
                              </div>
                              <div className="absolute z-1 inset-0 overflow-hidden">
                                <div
                                  className="absolute left-0 w-5 h-full"
                                  style={{
                                    background:
                                      "radial-gradient(circle, #a9c1d6 48%, #fff0 0%)",
                                    backgroundPosition: "-5px",
                                    backgroundSize: "20px 20px",
                                    backgroundRepeat: "repeat-y",
                                  }}
                                ></div>
                                <div
                                  className="absolute right-0 w-5 h-full"
                                  style={{
                                    background:
                                      "radial-gradient(circle, #a9c1d6 48%, #fff0 0%)",
                                    backgroundPosition: "5px",
                                    backgroundSize: "20px 20px",
                                    backgroundRepeat: "repeat-y",
                                  }}
                                ></div>
                                <div className="absolute left-[75%] w-[3.7333333333vw] h-[3.7333333333vw] sm:w-3.5 sm:h-3.5 bg-[#a9c1d6] -translate-x-[72%] rounded-full -top-[2px]"></div>
                                <div className="absolute left-[75%] w-[3.7333333333vw] h-[3.7333333333vw] sm:w-3.5 sm:h-3.5 bg-[#a9c1d6] -translate-x-[72%] rounded-full -bottom-[2px]"></div>
                              </div>
                            </div>
                          )}
                        </div>
                      </Transition>
                    </TabPanel>
                  </TabPanels>
                </TabGroup>
              );
            }}
          </Await>
        </React.Suspense>
      </Modal>

      <Modal
        isOpen={isDetailModalOpen}
        onClose={() => setIsDetailModalOpen(false)}
        title={
          "Deposit" + (selectedTurnover?.bonus_base_amount ? "+ Bonus" : "")
        }
      >
        <div className="p-2 flex m-[0_0_10px] overflow-x-scroll [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
          <div className="flex flex-col">
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>Transaction Amount</span>
            </div>
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>{selectedTurnover?.base_amount}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>Bonus</span>
            </div>
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>{selectedTurnover?.bonus_base_amount}</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>Turnover Requirement</span>
            </div>
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>
                {Number(selectedTurnover?.base_amount) +
                  Number(selectedTurnover?.bonus_base_amount ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>Turnover Completed</span>
            </div>
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>
                {Number(selectedTurnover?.bet_amount) +
                  Number(selectedTurnover?.bonus_bet_amount ?? 0)}
              </span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>Completed Ratio</span>
            </div>
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>{selectedTurnover?.turnover_achieved}%</span>
            </div>
          </div>
          <div className="flex flex-col">
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>Turnover Create Time</span>
            </div>
            <div className="p-[2.6666666667vw_2.1333333333vw] sm:px-2 sm:py-2.5 border border-[#bbbbbb] whitespace-nowrap sm:text-xs text-[3.2vw]">
              <span>{selectedTurnover?.created_at.split("T")[0]}</span>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
}
