import React, { useState } from "react";
import { FaCopy } from "react-icons/fa";
import Modal from "@/components/ui/modal/Modal";
import { QRCodeCanvas } from "qrcode.react";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classNames from "classnames";
import { useNavigate } from "react-router";
import TransactionRecordsTable from "../transaction/TransactionRecordsTable";
import ReferBonusTable from "./ReferBonusTable";
import type { ReferralData } from "@/routes/referral";
import { toast } from "react-toastify";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

interface ReferralSectionProps {
  invitationCode: string;
  invitationUrl: string;
  qrCodeUrl?: string;
  referralData: ReferralData;
}

export default function ReferralSection({
  invitationCode = "8v2YUL",
  invitationUrl = "https://example.com/invite/8v2YUL",
  qrCodeUrl,
  referralData,
}: ReferralSectionProps) {
  const { userInfo } = useCurrentUser();
  const [selectedTab, setSelectedTab] = useState(0);
  const [open, setOpen] = useState(true);

  const navigate = useNavigate();

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: invitationUrl,
          text: "Use my invitation code to sign up!",
          url: invitationUrl,
        })
        .then(() => {
          toast.success("Shared");
        })
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // Fallback for browsers that don't support the Web Share API
      navigator.clipboard.writeText(invitationUrl).then(() => {
        toast.success("Copied to clipboard");
      });
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text).then(() => {
      toast.success("Copied to clipboard");
    });
    // You could add a toast notification here
  };

  return (
    <Modal
      isFullScreen={true}
      isOpen={open}
      onClose={() => {
        setTimeout(() => {
          const a = location.pathname.replace(
            "/member/common-referral/invite",
            ""
          );
          navigate(a ? a + location.hash : "/" + location.hash);
        }, 200);
        setOpen(false);
      }}
      title="Refer Bonus"
    >
      <TabGroup selectedIndex={selectedTab} onChange={setSelectedTab}>
        <TabList
          className="flex gap-1.5 bg-[#f5f5f5] px-2.5 h-12.25 text-sm absolute top-[13.3333333333vw] sm:top-12.5 w-full z-10"
          style={{
            boxShadow: "0 1px 3px #0000004d",
          }}
        >
          <Tab className="flex-1 focus:outline-none cursor-pointer">
            {({ selected }) => (
              <span
                className={classNames(
                  "block py-1.75 text-sm font-bold text-white text-center rounded"
                )}
                style={{
                  boxShadow: "0 1px 1px #0006",

                  background: selected
                    ? "linear-gradient(to bottom,#449f15,#48ac14,#82d856)"
                    : "linear-gradient(to bottom,#0378d9,#005dab)",
                }}
              >
                Invite
              </span>
            )}
          </Tab>
          <Tab className="flex-1 focus:outline-none cursor-pointer">
            {({ selected }) => (
              <span
                className={classNames(
                  "block py-1.75 font-bold text-sm text-white text-center rounded"
                )}
                style={{
                  boxShadow: "0 1px 1px #0006",

                  background: selected
                    ? "linear-gradient(to bottom,#449f15,#48ac14,#82d856)"
                    : "linear-gradient(to bottom,#0378d9,#005dab)",
                }}
              >
                Details
              </span>
            )}
          </Tab>
        </TabList>

        <TabPanels>
          <TabPanel>
            <div className="mt-12.5">
              <div className="px-2.5 py-2.5">
                <h2 className="text-sm text-blue-700 my-2 border-l-4 border-blue-700 pl-2.5">
                  Refer Your Friends and Earn
                </h2>

                <div className="rounded-lg overflow-hidden">
                  {/* Banner image section */}
                  <img src="https://img.c88rx.com/cx/h5/assets/images/player/referral/referral-invite-banner-en.png?v=1749551408337&source=mcdsrc" />

                  {/* Invitation details section */}
                  <div className="bg-blue-1 p-4.5 text-white flex">
                    {/* QR Code section */}
                    <div className="border-r pr-4 border-blue-600">
                      <h3 className="mb-1 text-xs">Invitation QR Code</h3>
                      <div className="bg-white p-1 rounded-lg border-4 border-green-400">
                        <QRCodeCanvas
                          id="profileQR"
                          value={invitationUrl}
                          size={90}
                          bgColor="#ffffff"
                          fgColor="#000000"
                          level="H"
                        />
                      </div>
                    </div>

                    {/* Invitation URL and code section */}
                    <div className="flex-1 pl-4 flex flex-col">
                      <h3 className="mb-1 text-xs">Invitation URL</h3>
                      <button
                        onClick={handleShare}
                        className="bg-green-500 hover:bg-green-600 text-white font-bold h-8.75 rounded-sm transition-colors !mb-3.75 cursor-pointer"
                        style={{
                          background:
                            "linear-gradient( 180deg, #43fa19 0%, #1f9b09 45%, #187e03 55%, #1fa205 90%, #26bb07 100% )",
                        }}
                      >
                        Share
                      </button>

                      <h3 className="mb-1 text-xs">Invitation Code</h3>
                      <div className="flex h-8.75">
                        <div className="bg-white text-black flex-1 rounded-l-sm py-1.25 px-2.5 flex items-center">
                          <span className="text-[13px] font-mono">
                            {invitationCode}
                          </span>
                        </div>
                        <button
                          onClick={() => copyToClipboard(invitationUrl)}
                          className="bg-blue-500 hover:bg-blue-600 py-2 px-3 rounded-r-sm transition-colors cursor-pointer"
                          style={{
                            background:
                              "linear-gradient( #19bdfa 0%, #0065c1 40%, #0a5596 55%, #0560ae 80%, #006cc5 90%, #0180de 100% )",
                          }}
                        >
                          <FaCopy size={20} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dashboard Section */}
              <div className="p-2.5 border-gray-200">
                {/* Rebate Bonus Section */}
                <h2 className="text-sm text-blue-700 my-2 border-l-4 border-blue-700 pl-2.5">
                  Dashboard
                </h2>
                <div className="bg-blue-1 p-4.5">
                  <div className="grid grid-cols-2 gap-2">
                    <div className="bg-blue-500/70 rounded-lg p-3.75 text-center">
                      <p className="text-white text-xs mb-1.25">
                        Friends' Invited
                      </p>
                      <div className="flex items-center justify-center">
                        <p className="text-green-400 text-3xl font-bold">0</p>
                      </div>
                    </div>

                    <div className="bg-blue-500/70 rounded-lg p-3.75 text-center">
                      <p className="text-white text-xs mb-1.25">
                        Friends' Completed
                      </p>
                      <div className="flex items-center justify-center">
                        <p className="text-green-400 text-3xl font-bold">0</p>
                      </div>
                    </div>

                    <div className="bg-blue-500/70 rounded-lg p-3.75 text-center">
                      <p className="text-white text-xs mb-1.25">
                        Today's Rebate
                      </p>
                      <div className="flex items-center justify-center">
                        <p className="text-green-400 text-3xl font-bold">
                          {userInfo?.currency_icon}
                        </p>

                        <p className="text-green-400 text-3xl font-bold">0</p>
                      </div>
                    </div>

                    <div className="bg-blue-500/70 rounded-lg p-3.75 text-center">
                      <p className="text-white text-xs mb-1.25">
                        Yesterday's Rebate
                      </p>
                      <div className="flex items-center justify-center">
                        <p className="text-green-400 text-3xl font-bold">
                          {userInfo?.currency_icon}
                        </p>

                        <p className="text-green-400 text-3xl font-bold">0</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Rebate Section */}
              <div className="p-2.5 border-gray-200">
                {/* Rebate Bonus Section */}
                <h2 className="text-sm text-blue-700 my-2 border-l-4 border-blue-700 pl-2.5">
                  Rebate Bonus
                </h2>

                <div className="bg-blue-1 rounded-lg overflow-hidden">
                  <img src="https://img.c88rx.com/cx/h5/assets/images/player/referral/receive-betting-bonus-banner-en.png?v=1749551408337&source=mcdsrc" />

                  <div className="py-3 px-4.5 flex justify-between items-center">
                    <div className="flex items-center">
                      <p className="text-green-400 text-2xl font-bold">
                        {userInfo?.currency_icon}
                      </p>

                      <p className="text-green-400 text-2xl font-bold">0</p>
                    </div>
                    <button
                      className=" text-white text-[15px] font-bold px-4.5 h-7.5 rounded-sm"
                      style={{
                        background:
                          "linear-gradient(180deg,#43fa19,#1f9b09 45%,#187e03 55%,#1fa205 90%,#26bb07)",
                      }}
                    >
                      Claim
                    </button>
                  </div>
                </div>
              </div>

              {/* Requirement Section */}
              <div className="p-2.5 border-gray-200">
                <h2 className="text-sm text-blue-700 my-2 border-l-4 border-blue-700 pl-2.5">
                  Requirement
                </h2>

                <div className="bg-blue-1 rounded-lg overflow-hidden">
                  <img src="https://img.c88rx.com/cx/h5/assets/images/player/referral/referral-requirement-banner-en.png?v=1749551408337&source=mcdsrc" />

                  <div className="p-4.5">
                    <p className="text-white text-xs mb-2.5">
                      The following conditions must be met for each referrer and
                      referred friends.
                    </p>

                    <div className="grid grid-cols-2 gap-2">
                      {/* Total Deposits */}
                      <div className="bg-blue-3 rounded-lg p-3.75 text-center">
                        <p className="text-white text-xs">Total Deposits</p>
                        <div className="flex items-center justify-center">
                          <div className="text-green-400 text-lg font-bold">
                            {userInfo?.currency_icon}
                          </div>
                          <div className="text-green-400 text-lg font-bold">
                            2,000.00
                          </div>
                        </div>
                      </div>

                      {/* Total Turnover */}
                      <div className="bg-blue-3 rounded-lg p-3.75 text-center">
                        <p className="text-white text-xs">Total Turnover</p>
                        <div className="flex items-center justify-center">
                          <div className="text-green-400 text-lg font-bold">
                            {userInfo?.currency_icon}
                          </div>
                          <div className="text-green-400 text-lg font-bold">
                            2,000.00
                          </div>
                        </div>
                      </div>

                      {/* Within Days */}
                      <div className="bg-blue-3 rounded-lg p-3.75 text-center">
                        <p className="text-white text-xs">Within Days</p>
                        <div className="flex items-center justify-center">
                          <p className="text-green-400 text-lg font-bold">15</p>
                        </div>
                      </div>

                      {/* Phone */}
                      <div className="bg-blue-3 rounded-lg p-3.75 text-center">
                        <p className="text-white text-xs">Phone</p>
                        <div className="flex items-center justify-center">
                          <p className="text-green-400 text-lg font-bold">
                            Phone Verified
                          </p>
                        </div>
                      </div>
                    </div>

                    <p className="text-white text-[10px] my-2">
                      Both you & your friend will receive the bonus once met the
                      conditions.
                    </p>
                  </div>
                </div>
              </div>

              {/* Monthly Achievement Goals Section */}
              <div className="p-2.5 border-gray-200">
                <div className="flex items-center justify-between mb-1.25">
                  <h2 className="text-sm text-blue-700 my-2 border-l-4 border-blue-700 pl-2.5">
                    Monthly Achievement Goals
                  </h2>
                  <div
                    className=" text-white px-2.5 py-2 rounded-lg flex items-center"
                    style={{
                      background:
                        "linear-gradient(#19bdfa,#0065c1 40%,#0a5596 55%,#0560ae 80%,#006cc5,#0180de)",
                    }}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 mr-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      />
                    </svg>
                    <span className="text-xs">Goals & Bonuses</span>
                  </div>
                </div>

                <div className="bg-blue-1 rounded-lg p-4">
                  {/* Level 1 Achievement - Unlocked */}
                  <div
                    className="rounded-lg p-2 my-1.25 relative overflow-hidden"
                    style={{
                      background:
                        "linear-gradient( 135deg, #0bc9d6 0, #1083e9 60%, #0c78d3 100% )",
                    }}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-1.png?v=1749551408337&source=mcdsrc"
                          className="w-17.5 h-17.5"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <div className="text-white text-xs">
                            Agent Achievement{" "}
                            <span className="text-green-400 font-bold">5</span>
                          </div>
                        </div>
                        <div className="text-green-400 font-bold text-xs flex justify-end">
                          0 / 5
                        </div>

                        <div className="bg-blue-2 h-1.5 rounded-full w-full">
                          <div
                            className="bg-green-400 h-1.5 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>

                        <div className="mt-1.25 flex items-center">
                          <span className="text-yellow-400 text-base font-bold">
                            {userInfo?.currency_icon}
                          </span>
                          <span className="text-yellow-400 text-base font-bold">
                            177.00
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Level 2 Achievement - Unlocked */}
                  <div
                    className="rounded-lg p-2 my-1.25 relative overflow-hidden border-2 border-green-400"
                    style={{
                      background:
                        "linear-gradient( 135deg, #0bc9d6 0, #1083e9 60%, #0c78d3 100% )",
                    }}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-2.png?v=1749551408337&source=mcdsrc"
                          className="w-17.5 h-17.5"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <div className="text-white text-xs">
                            Agent Achievement{" "}
                            <span className="text-green-400 font-bold">5</span>
                          </div>
                        </div>
                        <div className="text-green-400 font-bold text-xs flex justify-end">
                          0 / 5
                        </div>

                        <div className="bg-blue-2 h-1.5 rounded-full w-full">
                          <div
                            className="bg-green-400 h-1.5 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>

                        <div className="mt-1.25 flex items-center">
                          <span className="text-yellow-400 text-base font-bold">
                            {userInfo?.currency_icon}
                          </span>{" "}
                          <span className="text-yellow-400 text-base font-bold">
                            377.00
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-900/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Level 3 Achievement - Unlocked */}
                  <div
                    className="rounded-lg p-2 my-1.25 relative overflow-hidden border-2 border-green-400"
                    style={{
                      background:
                        "linear-gradient( 135deg, #0bc9d6 0, #1083e9 60%, #0c78d3 100% )",
                    }}
                  >
                    <div className="flex items-center">
                      <div className="relative">
                        <img
                          src="https://img.c88rx.com/cx/h5/assets/images/player/referral/achievement-icon-3.png?v=1749551408337&source=mcdsrc"
                          className="w-17.5 h-17.5"
                        />
                      </div>

                      <div className="ml-4 flex-1">
                        <div className="flex justify-between items-center">
                          <div className="text-white text-xs">
                            Agent Achievement{" "}
                            <span className="text-green-400 font-bold">5</span>
                          </div>
                        </div>
                        <div className="text-green-400 font-bold text-xs flex justify-end">
                          0 / 5
                        </div>

                        <div className="bg-blue-2 h-1.5 rounded-full w-full">
                          <div
                            className="bg-green-400 h-1.5 rounded-full"
                            style={{ width: "0%" }}
                          ></div>
                        </div>

                        <div className="mt-1.25 flex items-center">
                          <span className="text-yellow-400 text-base font-bold">
                            {userInfo?.currency_icon}
                          </span>
                          <span className="text-yellow-400 text-base font-bold">
                            777.00
                          </span>
                        </div>
                      </div>
                      <div className="absolute inset-0 flex items-center justify-center bg-blue-900/50">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          className="h-12 w-12 text-white"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* How to Earn More Rewards Section */}
              <div className="p-2.5 border-gray-200">
                <h2 className="text-sm text-blue-700 my-2 border-l-4 border-blue-700 pl-2.5">
                  How to Earn More Rewards
                </h2>

                <div className="bg-blue-1 rounded-lg p-4 overflow-hidden">
                  <p className="text-white text-xs mb-6">
                    All referrer will receive a certain cash reward percentage
                    for every referee when they play games on CRICKEX.
                  </p>

                  <h3 className="text-green-400 text-sm font-bold mb-4">
                    Daily Commission Table
                  </h3>

                  <div className="overflow-x-auto mb-6">
                    <table className="w-full text-xs">
                      <thead>
                        <tr>
                          <th className="bg-blue-3 text-white p-1 text-center border border-blue-1">
                            Turnover
                          </th>
                          <th className="bg-blue-3 text-white p-1 text-center border border-blue-1">
                            Tier 1
                          </th>
                          <th className="bg-blue-3 text-white p-1 text-center border border-blue-1">
                            Tier 2
                          </th>
                          <th className="bg-blue-3 text-white p-1 text-center border border-blue-1">
                            Tier 3
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            {userInfo?.currency_icon}
                            100 - {userInfo?.currency_icon}
                            10,000
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.10%
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.06%
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.02%
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            {userInfo?.currency_icon}
                            10,001 - {userInfo?.currency_icon}
                            30,000
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.15%
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.07%
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.03%
                          </td>
                        </tr>
                        <tr>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            {userInfo?.currency_icon}
                            30,001+
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.20%
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.09%
                          </td>
                          <td className="bg-white text-blue-1 p-1.25 text-center border border-blue-1">
                            0.04%
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  <div className="mb-4">
                    <img src="https://img.c88rx.com/cx/h5/assets/images/player/referral/commission-from.png?v=1749551408337&source=mcdsrc" />
                  </div>

                  <p className="text-white text-xs mb-6">
                    Be diligent in referring, be the upline and earn upto 3
                    tiers easily.
                  </p>

                  <h3 className="text-green-400 text-base text-center font-bold">
                    Earn Lifetime Commissions! With CRICKEX
                  </h3>
                </div>
              </div>
            </div>
          </TabPanel>
          <TabPanel>
            <ReferBonusTable
              referrals={referralData}
              onFilterClick={() => {
                setOpen(!open);
              }}
              filterPeriod={[]}
            />
          </TabPanel>
        </TabPanels>
      </TabGroup>
    </Modal>
  );
}
