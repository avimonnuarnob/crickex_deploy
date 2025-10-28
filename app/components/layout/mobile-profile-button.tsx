import { CloseButton } from "@headlessui/react";
import Modal from "@/components/ui/modal/Modal";
import memberIcon from "@/assets/icon/member.svg";
import refreshIcon from "@/assets/icon/refresh.svg";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cookies from "js-cookie";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { useState } from "react";
import depositIcon from "../../assets/images/icon-deposit.png";
import withdrawalIcon from "../../assets/images/icon-withdrawal.png";
import realTimeBonusIcon from "@/assets/images/icon-real-time-bonus.png";
import betrecordsIcon from "../../assets/images/icon-bet-records.png";
import turnoverIcon from "../../assets/images/icon-turnover.png";
import recordsIcon from "../../assets/images/icon-records.png";
import profileIcon from "../../assets/images/icon-profile.png";
import resetpasswordsIcon from "../../assets/images/icon-resetpasswords.png";
import inboxIcon from "../../assets/images/icon-inbox.png";
import referralIcon from "../../assets/images/icon-referral.png";
import customerIcon from "@/assets/images/icon-customer.png";
import emailIcon from "@/assets/images/icon-email.png";
import telegramIcon from "@/assets/images/icon-telegram.png";
import { IoExitOutline } from "react-icons/io5";
import { IoMdClose } from "react-icons/io";
import { Link } from "react-router";
import { useRouteLoaderData } from "react-router";
import type { RootLoaderData } from "@/root";
export default function MobileProfileButton({
  isOpen,
  onClose,
  children,
}: {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}) {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { userInfo, setUserWalletData, userWalletData, logoutUser } =
    useCurrentUser();
  const [showBalance, setShowBalance] = useState(false);
  return (
    <>
      {children}
      <Modal isFullScreen isOpen={isOpen} onClose={onClose} title="">
        <div className="relative">
          <CloseButton className="absolute top-0 right-0 px-1 py-2">
            <IoMdClose className="size-7.5" />
          </CloseButton>
          <div className="p-[4vw_2.6666666667vw] flex gap-[2.6666666667vw] items-center">
            <img
              src={memberIcon}
              alt="Member Icon"
              className="w-[17.3333333333vw] aspect-square"
            />
            <div className="text-[3.2vw] space-y-[.5333333333vw]">
              <span className="text-[4.8vw]">
                {userInfo?.first_name ?? "N/A"} {userInfo?.last_name ?? "N/A"}
              </span>
              <div className="flex gap-[2.6666666667vw] items-center leading-[4.8vw]">
                <span>ID</span>
                <span className="text-blue-3">
                  {userInfo?.username ?? "N/A"}
                </span>
              </div>
              <div className="flex gap-[2.6666666667vw] items-center">
                <span>VIP Points (VP)</span>
                <div className="flex items-center gap-[2.6666666667vw]">
                  <span className="text-blue-3">
                    {userInfo?.user_type ?? "N/A"}
                  </span>
                  <div>
                    <button className="p-[1.6vw_3.2vw] bg-blue-1 text-white text-[2.6666666667vw]! font-bold rounded">
                      My Vip
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="p-[2.6666666667vw] space-y-[2.6666666667vw] [&>*]:shadow-[0_2px_5px_.1px_#0003]">
            <div className="flex items-center justify-between p-[2.6666666667vw] text-[3.2vw] h-[18.4vw]">
              <div className="flex items-center gap-0.5">
                <span className="leading-[3.2vw] text-blue-1">Main Wallet</span>
                <button
                  type="button"
                  data-fetching="false"
                  onClick={async (e: React.SyntheticEvent<EventTarget>) => {
                    if (!(e.target instanceof HTMLButtonElement)) {
                      return;
                    }
                    try {
                      e.target.dataset.fetching = "true";
                      const response = await fetch(
                        import.meta.env.VITE_API_URL + "/auth/user-balance/",
                        {
                          headers: {
                            Authorization: `Token ${Cookies.get("userToken")}`,
                          },
                        }
                      );

                      const responseData = await response.json();

                      if (responseData.status === "ok") {
                        setUserWalletData(responseData.data);
                        e.target.dataset.fetching = "false";
                      } else {
                        e.target.dataset.fetching = "false";
                      }
                    } catch (error) {
                      e.target.dataset.fetching = "false";
                    }
                  }}
                  className="bg-blue-1 w-[5.8666666667vw] aspect-square data-[fetching='true']:animate-spin"
                  style={{
                    maskImage: `url("${refreshIcon}")`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "65%",
                  }}
                ></button>
                <button
                  type="button"
                  className="min-w-[5.8666666667vw] aspect-square grid place-items-center text-blue-1"
                  onClick={() => {
                    setShowBalance((state) => !state);
                  }}
                >
                  {showBalance ? (
                    <FaEye className="w-full h-full aspect-square" />
                  ) : (
                    <FaEyeSlash className="w-full h-full aspect-square" />
                  )}
                </button>
              </div>
              <div className="max-h-[5.8666666667vw] text-[4.2666666667vw] leading-[5.8666666667vw] whitespace-nowrap text-[#ff8400] flex flex-col overflow-hidden">
                <div
                  className={`w-full h-full grid place-items-center transition-transform duration-300 ${
                    showBalance ? "translate-y-0" : "-translate-y-full"
                  }`}
                >
                  <span>
                    {
                      data?.currencyList.find(
                        (currency) => currency.currency === userInfo?.currency
                      )?.currency_icon
                    }{" "}
                    {userWalletData?.credit_balance}
                  </span>
                </div>
                <div
                  className={`w-full h-full grid place-items-center transition-transform duration-300 ${
                    showBalance ? "translate-y-0" : "-translate-y-full"
                  }`}
                >
                  ＊＊＊＊＊
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="p-[0_2.6666666667vw] flex items-center gap-[1.3333333333vw] leading-[9.3333333333vw]">
                <div className="w-1 h-4 bg-[#005dac] rounded"></div>
                <span className="text-[4vw]">Funds</span>
              </div>
              <div className="h-px w-full bg-gray-3"></div>
              <div className="pt-2 flex [&>*]:flex-1">
                <Link to="/member/wallet/deposit">
                  <div>
                    <img
                      src={depositIcon}
                      alt="Deposit"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Deposit</p>
                  </div>
                </Link>
                <Link to="/member/wallet/deposit">
                  <div>
                    <img
                      src={withdrawalIcon}
                      alt="Deposit"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Withdrawal</p>
                  </div>
                </Link>
                <div>
                  <div>
                    <img
                      src={realTimeBonusIcon}
                      alt="Real Time Bonus"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Real Time Bonus</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <div className="p-[0_2.6666666667vw] flex items-center gap-[1.3333333333vw] leading-[9.3333333333vw]">
                <div className="w-1 h-4 bg-[#005dac] rounded"></div>
                <span className="text-[4vw]">History</span>
              </div>
              <div className="h-px w-full bg-gray-3"></div>
              <div className="pt-2 flex [&>*]:flex-1">
                <div>
                  <div>
                    <img
                      src={betrecordsIcon}
                      alt="Betting Records"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Betting Records</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src={turnoverIcon}
                      alt="Turnover"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Turnover</p>
                  </div>
                </div>
                <Link to="member/transaction-records">
                  <div>
                    <img
                      src={recordsIcon}
                      alt="Transaction Records"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Transaction Records</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="p-[0_2.6666666667vw] flex items-center gap-[1.3333333333vw] leading-[9.3333333333vw]">
                <div className="w-1 h-4 bg-[#005dac] rounded"></div>
                <span className="text-[4vw]">Profile</span>
              </div>
              <div className="h-px w-full bg-gray-3"></div>
              <div className="pt-2 flex [&>*]:flex-1">
                <Link to="/member/new-profile-info">
                  <div>
                    <img
                      src={profileIcon}
                      alt="Personal Info"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Personal Info</p>
                  </div>
                </Link>
                <Link to="member/change-password">
                  <div>
                    <img
                      src={resetpasswordsIcon}
                      alt="Reset Password"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Change Password</p>
                  </div>
                </Link>
                <div>
                  <div>
                    <img
                      src={inboxIcon}
                      alt="Inbox"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Inbox</p>
                  </div>
                </div>
                <Link to="member/common-referral/invite">
                  <div>
                    <img
                      src={referralIcon}
                      alt="Refer Bonus"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Refer Bonus</p>
                  </div>
                </Link>
              </div>
            </div>

            <div className="text-center">
              <div className="p-[0_2.6666666667vw] flex items-center gap-[1.3333333333vw] leading-[9.3333333333vw]">
                <div className="w-1 h-4 bg-[#005dac] rounded"></div>
                <span className="text-[4vw]">Contact Us</span>
              </div>
              <div className="h-px w-full bg-gray-3"></div>
              <div className="pt-2 flex [&>*]:flex-1">
                <div>
                  <div>
                    <img
                      src={customerIcon}
                      alt="Live Chat"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Live Chat</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src={emailIcon}
                      alt="Support Email"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Support Email</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src={emailIcon}
                      alt="Marketing Email"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Marketing Email</p>
                  </div>
                </div>
                <div>
                  <div>
                    <img
                      src={telegramIcon}
                      alt="Telegram"
                      className="w-[9.3333333333vw] aspect-square mx-auto mb-[1.3333333333vw]"
                    />
                  </div>
                  <div className="h-9.25 bg-gray-2 flex items-center justify-center border border-gray-1 py-1.25">
                    <p className="text-[3.2vw]">Telegram Channel</p>
                  </div>
                </div>
              </div>
            </div>

            <button
              className="w-full flex gap-[1.3333333333vw] justify-center items-center p-[2.6666666667vw] text-blue-7"
              onClick={logoutUser}
            >
              <IoExitOutline className="w-[5.3333333333vw] h-[5.3333333333vw]" />
              <p className="text-[3.4666666667vw]">Log Out</p>
            </button>
          </div>
        </div>
      </Modal>
    </>
  );
}
