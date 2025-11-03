import Modal from "@/components/ui/modal/Modal";
import boxRotateAnimation from "@/assets/coin-rotate-silver-alpha.webm";
import coinRotateAnimation from "@/assets/coin-rotate-gold-alpha.webm";
import { Await, useNavigate } from "react-router";
import Cookies from "js-cookie";
import React from "react";
import type { Route } from "./+types/point-exchange";

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

  return (
    <Modal
      title="My Gift Points"
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
            return (
              <div>
                <p>{cashbackAvailableData?.name}</p>
                <p>{cashbackLevelsData[0]?.name}</p>
              </div>
            );
          }}
        </Await>
      </React.Suspense>

      <div className="px-3.75 bg-blue-2 overflow-auto min-h-full">
        <div
          className="mt-1.25 mb-2 h-auto min-h-43 relative bg-transparent"
          style={{
            boxShadow: "inset 0 0 1.3333333333rem -.8rem transparent, #ffffff)",
            backdropFilter: "blur(8px)",
          }}
        >
          <img
            src="https://img.c88rx.com/cx/h5/assets/images/vip/banner.png?v=1750226110807&source=mcdsrc"
            className="w-full h-full object-cover"
            style={{
              borderRadius: "20px",
            }}
          />

          <div
            className="absolute text-white text-[26px] font-bold w-full px-3.75"
            style={{
              textShadow: "0 2px 4px #005399",
              bottom: "15%",
            }}
          >
            <span>View Gift Points T&C</span>
          </div>
        </div>

        <div className="flex justify-between items-end mb-2 p-2.5">
          <div>
            <p className="text-[#ffffff80] text-[13px] mb-2.5">Gift Points</p>
            <div className="flex items-center">
              <span
                className="text-white text-[35px] mr-2.5"
                style={{
                  lineHeight: "0.9em",
                }}
              >
                0
              </span>
              <span className="h-5 leading-5 bg-[#ffffff1a] text-[#ffffff80] px-2.5 mt-3 text-[13px] rounded-full">
                Points
              </span>
            </div>
          </div>
          <button
            className="bg-green-500 hover:bg-green-600 text-white px-2.5 py-1.5 flex items-center rounded-lg"
            style={{
              background: "linear-gradient(180deg, #60d61d 0, #4eaa17 100%)",
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
          </button>
        </div>

        {/* Convert Gifts Section */}
        <div className="flex justify-between items-center mb-3.75 px-2.5">
          <div className="flex items-center">
            <div className="w-1 h-4 bg-yellow-500 rounded mr-1.25"></div>
            <span className="text-[#ffffffcc] text-sm font-bold">
              Convert Gifts
            </span>
          </div>
          <button className="text-[#ffffff80] flex items-center text-[13px]">
            Refresh
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3.5 w-3.5 ml-1.5"
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
                <span className="text-[#ffffffb3] text-[13px]">Points</span>
                <span className="text-[#ffffffb3] text-[13px]">
                  Minimum Gift Required:{" "}
                  <span className="text-yellow-400">5000</span>
                </span>
              </div>
              <div
                style={{
                  boxShadow: "0 0 3px1 #0003 inset",
                }}
              >
                <input
                  type="text"
                  placeholder="0"
                  className="bg-[#00000033] text-[#ffae12] text-xl w-full rounded p-2.5 outline-none"
                />
              </div>

              <div className="flex gap-3 items-center my-2.5 min-h-8">
                <span className="text-[#ffffffb3] text-xs">
                  Gift Conversion Ratio
                </span>
                <span className="text-yellow-400 text-xs">1000</span>
              </div>

              <div className="flex justify-between mb-2.5">
                <span className="text-[#ffffffb3] text-[13px]">Real Money</span>
              </div>
              <div
                style={{
                  boxShadow: "0 0 3px1 #0003 inset",
                }}
              >
                <input
                  type="text"
                  placeholder="0"
                  className="bg-[#00000033] text-[#ffae12] text-xl w-full rounded p-2.5 outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="mx-1.25 my-3.75">
          <button
            className="w-full h-14 text-white rounded-2xl text-base leading-14 relative block overflow-hidden cursor-pointer"
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
        </div>
      </div>
    </Modal>
  );
}
