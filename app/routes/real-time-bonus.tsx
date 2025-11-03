import Modal from "@/components/ui/modal/Modal";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cookies from "js-cookie";
import { useState } from "react";
import { LuLoaderCircle } from "react-icons/lu";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

export default function RealTimeBonus() {
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);
  const { userInfo, userWalletData } = useCurrentUser();

  return (
    <Modal
      isFullScreen
      title="Real Time Bonus"
      isOpen={isModalOpen}
      onClose={() => {
        setTimeout(() => {
          const a = location.pathname.replace("/member/real-time-bonus", "");
          navigate(a ? a + location.hash : "/" + location.hash);
        }, 200);
        setIsModalOpen(false);
      }}
    >
      <div className="p-3 overflow-hidden space-y-3">
        <div
          className="flex flex-col justify-center items-center overflow-hidden relative p-2 z-1 rounded"
          style={{
            background: "linear-gradient(180deg,#508bbe,#136bb6)",
          }}
        >
          <div
            className="absolute inset-0 min-h-[80vw] sm:min-h-[300px] bg-no-repeat bg-center bg-cover z-2"
            style={{
              backgroundImage: "url('/real-time-bonus-bg.png')",
            }}
          ></div>

          <div className="flex justify-center items-center gap-[1.3333333333vw] sm:gap-1.5">
            <div
              className="w-[5.3333333333vw] h-[5.3333333333vw] sm:w-5 sm:h-5 bg-white"
              style={{
                maskImage: "url('/icon-available-amount.svg')",
              }}
            ></div>
            <div className="text-[3.7333333333vw] sm:text-sm text-white">
              Available Amount
            </div>
          </div>

          <div
            className="w-[21.3333333333vw] sm:w-20 h-[21.3333333333vw] sm:h-20 m-[4vw_auto] sm:m-[15px_auto] bg-no-repeat bg-center bg-cover"
            style={{
              backgroundImage: "url('/deco-available-amount.png')",
            }}
          ></div>

          <div className="m-[2.6666666667vw_auto] sm:m-[10px_auto] text-[7.4666666667vw] sm:text-[28px] font-bold text-white">
            {userInfo ? (
              <>
                {userInfo?.currency_icon}
                {userWalletData?.coin_balance}
              </>
            ) : (
              <LuLoaderCircle className="size-10 animate-spin" />
            )}
          </div>

          <form
            className="m-[2.6666666667vw_auto] sm:m-[10px_auto] z-3"
            onSubmit={async (e) => {
              e.preventDefault();

              const response = await fetch(
                import.meta.env.VITE_API_URL + "/wallet/convert/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${Cookies.get("userToken")}`,
                  },
                  body: JSON.stringify({
                    from_wallet: "credit_balance",
                    to_wallet: "coin_balance",
                    amount: userWalletData?.coin_balance,
                  }),
                }
              );

              const responseData = await response.json();

              if (responseData.status === "ok") {
                setIsModalOpen(false);
              } else if (responseData.status === "failed") {
                toast.error(
                  Object.entries(responseData.errors)
                    .map(([key, value]) => `${value}`)
                    .join("\n")
                );
              }
            }}
          >
            {userWalletData && userWalletData?.coin_balance > 0 && (
              <button
                type="submit"
                className="h-[10.6666666667vw] sm:h-10  bg-green-1 text-[4.2666666667vw] sm:text-base p-[1.6vw_8.5333333333vw] sm:p-[6px_32px] text-white rounded-xs"
              >
                Claim
              </button>
            )}
            {userWalletData && userWalletData?.coin_balance === 0 && (
              <button
                type="button"
                onClick={() => {
                  navigate("/");
                }}
                className="h-[10.6666666667vw] sm:h-10  bg-green-1 text-[4.2666666667vw] sm:text-base p-[1.6vw_8.5333333333vw] sm:p-[6px_32px] text-white rounded-xs"
              >
                Play Games
              </button>
            )}
          </form>
        </div>

        <div></div>
      </div>
    </Modal>
  );
}
