import {
  Button,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
} from "@headlessui/react";
import IconButton from "../ui/button/IconButton";
// import infoIcon from "../../assets/icon/icon-info.svg";
import React, { useEffect, useState } from "react";
import { TfiReload } from "react-icons/tfi";

import depositIcon from "../../assets/images/icon-deposit.png";
import withdrawalIcon from "../../assets/images/icon-withdrawal.png";
import betrecordsIcon from "../../assets/images/icon-bet-records.png";
import turnoverIcon from "../../assets/images/icon-turnover.png";
import recordsIcon from "../../assets/images/icon-records.png";
import profileIcon from "../../assets/images/icon-profile.png";
import resetpasswordsIcon from "../../assets/images/icon-resetpasswords.png";
import inboxIcon from "../../assets/images/icon-inbox.png";
import referralIcon from "../../assets/images/icon-referral.png";
import logoutIcon from "../../assets/images/icon-logout.png";
import realTimeBonusIcon from "@/assets/images/icon-real-time-bonus.png";

import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useNavigate } from "react-router";
import Cookies from "js-cookie";

const PROFILE_ITEMS = [
  {
    section_id: 1,
    section_items: [
      {
        name: "Deposit",
        icon: depositIcon,
      },
      {
        name: "Withdrawal",
        icon: withdrawalIcon,
      },
      {
        name: "Real Time Bonus",
        icon: realTimeBonusIcon,
      },
    ],
  },
  {
    section_id: 2,
    section_items: [
      { name: "Betting Records", icon: betrecordsIcon },
      { name: "Turnover", icon: turnoverIcon },
      { name: "Transaction Records", icon: recordsIcon },
    ],
  },

  {
    section_id: 3,
    section_items: [
      { name: "Personal Info", icon: profileIcon },
      { name: "Reset Password", icon: resetpasswordsIcon },
      { name: "Inbox", icon: inboxIcon },
      { name: "Refer Bonus", icon: referralIcon },
    ],
  },
  {
    section_id: 4,
    section_items: [{ name: "Log Out", icon: logoutIcon }],
  },
];

export default function ProfileButton() {
  const { logoutUser, userInfo, userWalletData, setUserWalletData } =
    useCurrentUser();
  const navigate = useNavigate();

  const [vipPoint, setVipPoint] = useState<number>();
  const [availableCashbackId, setAvailableCashbackId] = useState<number>();

  const [isWalletDataFetching, setIsWalletDataFetching] = useState(false);
  const [isVipPointFetching, setIsVipPointFetching] = useState(false);

  const getAvailableCashbackId = async () => {
    const availablecashback = await fetch(
      import.meta.env.VITE_API_URL + "/wallet/cashback-available/",
      {
        headers: {
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
      }
    );
    const availableCashbackData = await availablecashback.json();
    return availableCashbackData.data.id as number;
  };

  const getCashbackPoints = async (id: number) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/wallet/cashback/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
        body: JSON.stringify({
          cashback_setting_id: id,
        }),
      }
    );

    const responseData = await response.json();

    return responseData.data.cash_back_amount as number;
  };

  useEffect(() => {
    getAvailableCashbackId().then((id) => {
      setAvailableCashbackId(id);
      getCashbackPoints(id).then((data) => {
        setVipPoint(data);
      });
    });
  }, []);

  const onClickHandler = (id: string) => {
    if (id === "Log Out") {
      logoutUser();
    } else if (id === "Deposit") {
      navigate("/member/wallet/deposit");
    } else if (id === "Withdrawal") {
      navigate("/member/wallet/withdrawal");
    } else if (id === "Real Time Bonus") {
      navigate("/member/real-time-bonus");
    } else if (id === "Personal Info") {
      navigate("member/new-profile-info");
    } else if (id === "Transaction Records") {
      navigate("member/transaction-records");
    } else if (id === "Reset Password") {
      navigate("member/change-password");
    } else if (id === "Inbox") {
      navigate("member/inbox/notifications");
    } else if (id === "Refer Bonus") {
      navigate("member/common-referral/invite");
    } else if (id === "Turnover") {
      navigate("member/turnover/active");
    } else if (id === "Betting Records") {
      navigate("member/betting-records/settled");
    } else if (id === "Real Time Bonus") {
      navigate("member/real-time-bonus");
    } else return;
  };
  return (
    <Menu>
      <MenuButton as={React.Fragment}>
        <div
          className="p-0! bg-white w-7.5 h-7.5 cursor-pointer"
          style={{
            maskImage: "url(/icon-info.svg)",
          }}
        />
      </MenuButton>
      <MenuItems
        anchor={{ to: "bottom end", gap: "15px", offset: "45px" }}
        className="[--anchor-max-height:35rem] w-55 bg-white rounded z-10"
      >
        <MenuSection className="pt-1 px-4 pb-4.5">
          <MenuItem as="div">
            <span className="block text-base font-bold text-[#555555]">
              {userInfo?.first_name} {userInfo?.last_name}
            </span>

            <span className="block text-sm mt-1 text-[#555555]">
              VIP Points
            </span>

            <div className="flex items-center -mt-0.5">
              <span className="text-lg font-bold text-blue-1">{vipPoint}</span>
              <IconButton
                className="inline-block"
                color="link"
                icon={
                  <TfiReload
                    className={
                      "size-2.5 text-blue-1 stroke-2" +
                      (isVipPointFetching ? " animate-spin" : "")
                    }
                  />
                }
                onClick={(e) => {
                  if (availableCashbackId) {
                    e.preventDefault();
                    setIsVipPointFetching(true);
                    getCashbackPoints(availableCashbackId).then((data) => {
                      setIsVipPointFetching(false);
                      setVipPoint(data);
                    });
                  }
                }}
              ></IconButton>
            </div>

            <span className="block text-sm mt-1 text-[#555555]">
              Bonus Wallet
            </span>

            <div className="flex items-center -mt-0.5">
              <span className="text-lg font-bold text-blue-1">
                {userInfo?.currency_icon} {userWalletData?.coin_balance}
              </span>
              <IconButton
                className="inline-block"
                color="link"
                icon={
                  <TfiReload
                    className={
                      "size-2.5 text-blue-1 stroke-2" +
                      (isWalletDataFetching ? " animate-spin" : "")
                    }
                  />
                }
                onClick={async (e) => {
                  e.preventDefault();
                  setIsWalletDataFetching(true);
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
                    setIsWalletDataFetching(false);
                  }
                }}
              ></IconButton>
            </div>
          </MenuItem>
        </MenuSection>
        <>
          {PROFILE_ITEMS.map((section) => (
            <MenuSection key={section.section_id} className="py-1.75 px-4">
              {section.section_items.map((item) => (
                <MenuItem key={item.name}>
                  <Button
                    className="w-full flex items-center gap-4 py-2 data-focus:bg-blue-100 text-left cursor-pointer"
                    onClick={() => onClickHandler(item.name)}
                  >
                    <img src={item.icon} width={30} height={30} />
                    <span className="text-[#555555] font-bold">
                      {item.name}
                    </span>
                  </Button>
                </MenuItem>
              ))}
            </MenuSection>
          ))}
        </>
      </MenuItems>
    </Menu>
  );
}
