import Modal from "@/components/ui/modal/Modal";
import boxRotateAnimation from "@/assets/coin-rotate-silver-alpha.webm";
import coinRotateAnimation from "@/assets/coin-rotate-gold-alpha.webm";
import { Await, useNavigate } from "react-router";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import type { Route } from "./+types/point-exchange";
import { FaHistory } from "react-icons/fa";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { toast } from "react-toastify";

export type CASHBACK_LEVELS = CASHBACK_LEVEL[];

export interface LEVEL {
  id: number;
  category_name: string;
  category_limit: string;
  photo: string;
}

export interface CASHBACK_LEVEL {
  id: number;
  name: string;
  cashback: string;
  turnover: string;
  status: boolean;
  created_at: string;
  updated_at: string;
  level: LEVEL;
  url_id: number;
}

export async function clientLoader() {
  const promiseOfCashbackAvailableData = fetch(
    import.meta.env.VITE_API_URL + "/wallet/cashback-available/",
    {
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => response.data as CASHBACK_LEVEL);

  const promiseOfCashbackLevelsData = fetch(
    import.meta.env.VITE_API_URL +
      "/wallet/cashback-available/?all_level_info=yes",
    {
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((response) => response.data as CASHBACK_LEVELS);

  const promise = Promise.all([
    promiseOfCashbackAvailableData,
    promiseOfCashbackLevelsData,
  ]);
  return {
    promise,
  };
}

export default function PointExchange({ loaderData }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { promise } = loaderData;
  const { userWalletData } = useCurrentUser();
  const [availableCashback, setAvailableCashback] = useState<number>();
  const [isFetching, setIsFetching] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const getCashbackPoints = async (id: number) => {
    let availableCashbackId = id || null;
    if (!availableCashbackId) {
      const availablecashback = await fetch(
        import.meta.env.VITE_API_URL + "/wallet/cashback-available/",
        {
          headers: {
            Authorization: `Token ${Cookies.get("userToken")}`,
          },
        }
      );
      const availableCashbackData = await availablecashback.json();
      availableCashbackId = availableCashbackData.id;
    }

    if (!availableCashbackId) {
      return;
    }

    const response = await fetch(
      import.meta.env.VITE_API_URL + "/wallet/cashback/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
        body: JSON.stringify({
          cashback_setting_id: availableCashbackId,
        }),
      }
    );

    const responseData = await response.json();

    return responseData.data.cash_back_amount as number;
  };

  return (
    <Modal
      title="My VIP"
      isOpen={true}
      onClose={() => {
        navigate(-1);
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
        <Await resolve={promise}>
          {([cashbackAvailableData, cashbackLevelsData]: [
            CASHBACK_LEVEL,
            CASHBACK_LEVELS
          ]) => {
            const nextLevel =
              (cashbackLevelsData.findIndex(
                (level) => level.level.id === cashbackAvailableData.level.id
              ) ?? 0) + 1;

            console.log(nextLevel);

            useEffect(() => {
              getCashbackPoints(cashbackAvailableData.id).then((data) => {
                setAvailableCashback(data);
              });
            }, []);

            return (
              <div className="px-3.75 bg-blue-2 overflow-auto min-h-full text-white h-full">
                <div
                  className="rounded-[5.3333333333vw] sm:rounded-[20px] p-[6.4vw_4.2666666667vw] sm:p-[24px_16px] space-y-[4.2666666667vw] sm:space-y-4 min-h-[45.8666666667vw] sm:min-h-[172px] mt-1.25"
                  style={{
                    background:
                      "var(--vip-card-bg, linear-gradient(120deg, rgba(59, 144, 219, .7) 0%, rgba(0, 93, 172, .7) 40%, rgba(59, 144, 219, .7) 80%, rgba(0, 93, 172, .7) 100%))",
                    boxShadow:
                      "inset 0 0 1.3333333333rem -.8rem var(--vip-card-shadow, #ffffff)",
                  }}
                >
                  <div className="flex justify-between items-center">
                    <div className="flex gap-[4vw] sm:gap-4 items-center">
                      <div
                        className="w-[12vw] h-[12vw] sm:w-[45px] sm:h-[45px] rounded-full overflow-hidden"
                        style={{
                          background:
                            "linear-gradient(to bottom,#b5b1a0,#898366)",
                        }}
                      >
                        <div
                          className="w-full h-full"
                          style={{
                            backgroundImage: `url('${
                              import.meta.env.VITE_GAME_IMG_URL +
                              cashbackAvailableData?.level?.photo
                            }')`,
                            backgroundSize: "50%",
                            backgroundPosition: "35% center",
                            backgroundRepeat: "no-repeat",
                          }}
                        ></div>
                      </div>
                      <div>
                        <p className="mb-[1.3333333333vw] sm:mb-1.25 text-[3.2vw] sm:text-xs font-bold">
                          VIP LEVEL
                        </p>
                        <p className="text-[4.8vw] sm:text-lg font-bold uppercase">
                          {cashbackAvailableData?.name}
                        </p>
                      </div>
                    </div>
                    <div>
                      <a className="rounded-[2.6666666667vw] sm:rounded-[10px] flex items-center p-[1.6vw_2.6666666667vw] sm:p-[6px_10px] bg-green-1! gap-1.5">
                        <FaHistory className="w-[3.7333333333vw] h-[3.7333333333vw] sm:w-3.5 sm:h-3.5" />
                        <p className="text-[3.2vw] sm:text-xs leading-[5.3333333333vw] sm:leading-5">
                          History
                        </p>
                      </a>
                    </div>
                  </div>

                  <div className="flex gap-[4vw] sm:gap-[17px] items-center">
                    <div className="flex-1">
                      <div className="text-right">
                        <span className="text-[#ffae12]">
                          {userWalletData?.coin_balance}
                        </span>
                        /
                        {Number(
                          cashbackLevelsData[nextLevel]?.level.category_limit
                        )}
                      </div>
                      <div
                        className="h-[1.3333333333vw] sm:h-1.25 rounded bg-[#fff3] relative"
                        style={{
                          boxShadow: "inset 0 0 1px #fff",
                        }}
                      >
                        <div
                          className="absolute left-0 h-full rounded"
                          style={{
                            background:
                              "linear-gradient(to right,#a56c0b,#b69942,#f8e67d,#e6c86d,#c5994c)",
                            width:
                              (Number(userWalletData?.coin_balance) /
                                Number(
                                  cashbackLevelsData[nextLevel]?.level
                                    .category_limit
                                )) *
                                100 +
                              "%",
                          }}
                        ></div>
                      </div>
                    </div>
                    <div
                      className="w-[8vw] h-[8vw] sm:w-7.5 sm:h-7.5 rounded-full overflow-hidden"
                      style={{
                        backgroundImage: `url('${
                          import.meta.env.VITE_GAME_IMG_URL +
                          cashbackLevelsData[nextLevel]?.level.photo
                        }')`,
                        backgroundSize: "cover",
                        backgroundPosition: "top center",
                        backgroundRepeat: "no-repeat",
                      }}
                    ></div>
                  </div>
                  <p className="text-[3.4666666667vw] sm:text-xs leading-[5.3333333333vw] sm:leading-5 text-[#ffffffb3]">
                    You need{" "}
                    <span className="text-[#ffae12]">
                      {Number(
                        cashbackLevelsData[nextLevel]?.level.category_limit
                      ) - Number(userWalletData?.coin_balance)}{" "}
                    </span>{" "}
                    more VIP Experience to upgrade to next{" "}
                    <span className="text-[#ffae12]">
                      {" "}
                      {cashbackLevelsData[nextLevel]?.name}{" "}
                    </span>{" "}
                    level.
                  </p>
                </div>

                <div className="flex justify-between items-end mb-2 p-2.5">
                  <div>
                    <p className="text-[#ffffff80] text-[13px] mb-2.5">
                      Gift Points
                    </p>
                    <div className="flex items-center">
                      {availableCashback !== undefined ? (
                        <span
                          className="text-white text-[35px] mr-2.5"
                          style={{
                            lineHeight: "0.9em",
                          }}
                        >
                          {availableCashback}
                        </span>
                      ) : (
                        <button
                          className="text-[#ffffff80] flex items-center text-[13px]"
                          onClick={() => {
                            setIsFetching(true);
                            fetch(
                              import.meta.env.VITE_API_URL +
                                "/wallet/cashback/",
                              {
                                method: "POST",
                                body: JSON.stringify({
                                  cashback_setting_id:
                                    cashbackAvailableData?.id,
                                }),
                                headers: {
                                  "Content-Type": "application/json",
                                  Authorization: `Token ${Cookies.get(
                                    "userToken"
                                  )}`,
                                },
                              }
                            )
                              .then((response) => response.json())
                              .then((response) => {
                                setIsFetching(false);
                                setAvailableCashback(
                                  response.data.cash_back_amount
                                );
                              });
                          }}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className={
                              "h-8 w-8" + (isFetching ? " animate-spin" : "")
                            }
                            viewBox="0 0 20 20"
                            fill="#ffae12"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                              clipRule="evenodd"
                            />
                          </svg>
                        </button>
                      )}
                      <span className="h-5 leading-5 bg-[#ffffff1a] text-[#ffffff80] px-2.5 mt-3 text-[13px] rounded-full">
                        Points
                      </span>
                    </div>
                  </div>
                  {/* <button
                      className="bg-green-500 hover:bg-green-600 text-white px-2.5 py-1.5 flex items-center rounded-lg"
                      style={{
                        background:
                          "linear-gradient(180deg, #60d61d 0, #4eaa17 100%)",
                      }}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3.5 w-3.5 ml-0.5"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm3 1h6v4H7V5zm8 8v-1H5v1h10zm0 3v-1H5v1h10z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="text-xs leading-5 ml-1.25">Detail</span>
                    </button> */}
                </div>
                {/* Convert Gifts Section */}
                <div className="flex justify-between items-center mb-3.75 px-2.5">
                  <div className="flex items-center">
                    <div className="w-1 h-4 bg-yellow-500 rounded mr-1.25"></div>
                    <span className="text-[#ffffffcc] text-sm font-bold">
                      Convert Gifts
                    </span>
                  </div>
                  <button
                    className="text-[#ffffff80] flex items-center text-[13px]"
                    onClick={() => {
                      setIsFetching(true);
                      fetch(
                        import.meta.env.VITE_API_URL + "/wallet/cashback/",
                        {
                          method: "POST",
                          body: JSON.stringify({
                            cashback_setting_id: cashbackAvailableData?.id,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                            Authorization: `Token ${Cookies.get("userToken")}`,
                          },
                        }
                      )
                        .then((response) => response.json())
                        .then((response) => {
                          setIsFetching(false);
                          setAvailableCashback(response.data.cash_back_amount);
                        });
                    }}
                  >
                    Refresh
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className={
                        "h-3.5 w-3.5 ml-1.5" +
                        (isFetching ? " animate-spin" : "")
                      }
                      viewBox="0 0 20 20"
                      fill="#ffae12"
                    >
                      <path
                        fillRule="evenodd"
                        d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </div>
                {/* Conversion Calculator */}
                <div
                  className="bg-blue-700 rounded-3xl p-2.5 mb-4"
                  style={{
                    background: "linear-gradient(180deg,#3b90db80,#005dac80)",
                    boxShadow: "inset 0 0 5px -3px #fff",
                  }}
                >
                  <div className="flex">
                    <div className="w-[25%] flex flex-col justify-between">
                      <video
                        width="100%"
                        height="100%"
                        autoPlay={true}
                        muted={true}
                        loop={true}
                      >
                        <source type="video/webm" src={boxRotateAnimation} />
                      </video>

                      <video
                        width="100%"
                        height="100%"
                        autoPlay={true}
                        muted={true}
                        loop={true}
                      >
                        <source type="video/webm" src={coinRotateAnimation} />
                      </video>
                    </div>
                    <div className="flex-1 px-2.5 py-1.25 ">
                      <div className="flex justify-between my-2.5">
                        <span className="text-[#ffffffb3] text-[13px]">
                          Points
                        </span>
                        {/* <span className="text-[#ffffffb3] text-[13px]">
                            Minimum Gift Required:{" "}
                            <span className="text-yellow-400">5000</span>
                          </span> */}
                      </div>
                      <div
                        style={{
                          boxShadow: "0 0 3px1 #0003 inset",
                        }}
                      >
                        <input
                          type="text"
                          placeholder="0"
                          value={availableCashback}
                          readOnly
                          className="bg-[#00000033] text-[#ffae12] text-xl w-full rounded p-2.5 outline-none"
                        />
                      </div>

                      <div className="flex gap-3 items-center my-2.5 min-h-8">
                        <span className="text-[#ffffffb3] text-xs">
                          Gift Conversion Ratio
                        </span>
                        {/* <span className="text-yellow-400 text-xs">1000</span> */}
                      </div>

                      <div className="flex justify-between mb-2.5">
                        <span className="text-[#ffffffb3] text-[13px]">
                          Real Money
                        </span>
                      </div>
                      <div
                        style={{
                          boxShadow: "0 0 3px1 #0003 inset",
                        }}
                      >
                        <input
                          readOnly
                          value={availableCashback}
                          type="text"
                          placeholder="0"
                          className="bg-[#00000033] text-[#ffae12] text-xl w-full rounded p-2.5 outline-none"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="mx-1.25 my-3.75">
                  <form
                    onSubmit={async (e) => {
                      e.preventDefault();
                      e.stopPropagation();

                      setIsSubmitting(true);

                      try {
                        const response = await fetch(
                          import.meta.env.VITE_API_URL +
                            "/wallet/cashback/?cashback_confirm=yes",
                          {
                            method: "POST",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Token ${Cookies.get(
                                "userToken"
                              )}`,
                            },
                            body: JSON.stringify({
                              cashback_setting_id: cashbackAvailableData.id,
                            }),
                          }
                        );

                        const responseData = await response.json();

                        if (responseData.status === "ok") {
                          toast.success(
                            "Cashback amount: " +
                              responseData.data.cash_back_amount
                          );
                        }

                        if (responseData.status === "failed") {
                          toast.error(responseData.errors);
                        }
                      } catch (error) {
                      } finally {
                        setIsSubmitting(false);
                      }
                    }}
                  >
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className={
                        "w-full h-14 text-white rounded-2xl text-base leading-14 relative block overflow-hidden cursor-pointer" +
                        (isSubmitting ? "opacity-20" : "opacity-100")
                      }
                      style={{
                        background: "linear-gradient(90deg,#ffce41,#ffae12)",
                        textShadow: "0 2px 4px #7f5811",
                      }}
                    >
                      Convert to Real Money
                      <img
                        src="https://img.c88rx.com/cx/h5/assets/images/player/vip/convert-button-bg.png?v=1750226110807&source=mcdsrc"
                        className="absolute inset-0 w-full h-full rounded-2xl"
                        alt="arrow-right"
                      />
                    </button>
                  </form>
                </div>
              </div>
            );
          }}
        </Await>
      </React.Suspense>
    </Modal>
  );
}
