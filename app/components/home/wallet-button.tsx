import { useEffect, useState } from "react";
import Button from "../ui/button/Button";
import Cookies from "js-cookie";
import { TfiReload } from "react-icons/tfi";

export default function WalletButton() {
  const [walletData, setWalletData] = useState<number>(0);
  //   useEffect(() => {
  //     async function getWalletData() {
  //       const response = await fetch(
  //         "https://ai.cloud7hub.uk/auth/user-balance/",
  //         {
  //           headers: {
  //             Authorization: `token ${Cookies.get("userToken")}`,
  //           },
  //         }
  //       );

  //       const responseData = await response.json();

  //       if (responseData.status === "ok") {
  //         setWalletData(responseData.data.credit_balance);
  //       }
  //     }

  //     getWalletData();
  //   }, []);
  return (
    <Button
      className="text-xs h-[34px] flex gap-2 items-center"
      color="green"
      onClick={async () => {
        const response = await fetch(
          "https://ai.cloud7hub.uk/auth/user-balance/",
          {
            headers: {
              Authorization: `token ${Cookies.get("userToken")}`,
            },
          }
        );

        const responseData = await response.json();

        if (responseData.status === "ok") {
          setWalletData(responseData.data.credit_balance);
        }
      }}
      // href={UnProtectedRoute.Login}
    >
      <TfiReload /> <span>Main wallet ${walletData}</span>
    </Button>
  );
}
