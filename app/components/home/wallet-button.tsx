import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Cookies from "js-cookie";
import { TfiReload } from "react-icons/tfi";
import classNames from "classnames";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useRouteLoaderData } from "react-router";
import type { RootLoaderData } from "@/root";

export default function WalletButton() {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { userWalletData, setUserWalletData, userInfo } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      className="h-[34px] flex gap-2.5 items-center"
      color="green"
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
      // href={UnProtectedRoute.Login}
    >
      <TfiReload
        className={classNames("stroke-1", {
          "animate-spin": isLoading,
        })}
      />
      <span>Main Wallet</span>
      <span className="font-bold">
        {
          data?.currencyList.find(
            (currency) => currency.currency === userInfo?.currency
          )?.currency_icon
        }
        {userWalletData?.credit_balance}
      </span>
    </Button>
  );
}
