import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Cookies from "js-cookie";
import { TfiReload } from "react-icons/tfi";
import classNames from "classnames";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

export default function WalletButton() {
  const { userWalletData, setUserWalletData } = useCurrentUser();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Button
      className="h-[34px] flex gap-2.5 items-center"
      color="green"
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
      // href={UnProtectedRoute.Login}
    >
      <TfiReload
        className={classNames("stroke-1", {
          "animate-spin": isLoading,
        })}
      />
      <span>Main Wallet</span>
      <span className="font-bold">${userWalletData?.credit_balance}</span>
    </Button>
  );
}
