import { TfiReload } from "react-icons/tfi";
import promotionsIcon from "@/assets/images/icon-promotion.png";
import depositIcon from "@/assets/images/icon-deposit-2.png";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import IconButton from "../ui/button/IconButton";
import Cookies from "js-cookie";
import { useState } from "react";
import classNames from "classnames";

export default function UserDashboard() {
  const { userWalletData, setUserWalletData, userInfo } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="px-3.75 pt-2.5 pb-2.75 bg-blue-2 flex gap-3.5 items-center rounded">
      <div className="flex-1 self-start">
        <div className="w-50 text-white">
          <span className="text-[13px] block mt-1 mb-2">
            {userInfo?.first_name} {userInfo?.last_name}
          </span>
          <div className="flex justify-between items-center">
            <span className="font-bold">
              $ {userWalletData?.credit_balance}
            </span>
            <button
              className="cursor-pointer"
              onClick={async () => {
                setIsLoading(true);
                const response = await fetch(
                  "https://ai.cloud7hub.uk/auth/user-balance/",
                  {
                    headers: {
                      Authorization: `Token ${Cookies.get("userToken")}`,
                    },
                  }
                );

                const responseData = await response.json();

                if (responseData.status === "ok") {
                  setUserWalletData(responseData.data);
                  setIsLoading(false);
                }
              }}
            >
              <TfiReload
                className={classNames({
                  "animate-spin": isLoading,
                })}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-0.25 h-7.5 bg-[#fff3]"></div>
      <div className="flex gap-3.75 text-xs text-white">
        <div>
          <img
            src={promotionsIcon}
            alt="promo_icon"
            className="w-7.5 h-7.5 mx-auto mt-1 mb-1.25"
          />
          <span>Promotions</span>
        </div>
        <div>
          <img
            src={depositIcon}
            alt="deposit_icon"
            className="w-7.5 h-7.5 mx-auto mt-1 mb-1.25"
          />
          <span>Deposit</span>
        </div>
      </div>
    </div>
  );
}
