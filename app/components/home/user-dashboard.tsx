import promotionsIcon from "@/assets/images/icon-promotion.png";
import depositIcon from "@/assets/images/icon-deposit-2.png";
import refreshIcon from "@/assets/icon/refresh.svg";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cookies from "js-cookie";
import { useState } from "react";
import classNames from "classnames";
import { useRouteLoaderData } from "react-router";
import type { RootLoaderData } from "@/root";
import { Link } from "react-router";

export default function UserDashboard() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { userWalletData, setUserWalletData, userInfo } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="px-3.75 pt-2.5 pb-2.75 bg-blue-2 flex gap-3.5 items-center sm:rounded overflow-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-track]:bg-black [&::-webkit-scrollbar-thumb]:bg-white">
      <div className="flex-1 self-start">
        <div className="w-50 text-white">
          <span className="text-[13px] block mt-1 mb-2">
            {userInfo?.first_name} {userInfo?.last_name}
          </span>
          <div className="flex justify-between items-center">
            <span className="font-bold">
              {
                data?.currencyList.find(
                  (currency) => currency.currency === userInfo?.currency
                )?.currency_icon
              }{" "}
              {userWalletData?.credit_balance}
            </span>
            <button
              className="cursor-pointer"
              onClick={async () => {
                setIsLoading(true);
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
                  setIsLoading(false);
                }
              }}
            >
              <img
                src={refreshIcon}
                alt="refresh"
                className={classNames("size-3.5", {
                  "animate-spin": isLoading,
                })}
              />
            </button>
          </div>
        </div>
      </div>
      <div className="w-0.25 h-7.5 bg-[#fff3]"></div>
      <div className="flex gap-3.75 text-xs text-white">
        <Link to="/promotion">
          <img
            src={promotionsIcon}
            alt="promo_icon"
            className="w-7.5 h-7.5 mx-auto mt-1 mb-1.25"
          />
          <span>Promotions</span>
        </Link>
        <Link to="member/wallet/deposit">
          <img
            src={depositIcon}
            alt="deposit_icon"
            className="w-7.5 h-7.5 mx-auto mt-1 mb-1.25"
          />
          <span>Deposit</span>
        </Link>
      </div>
    </div>
  );
}
