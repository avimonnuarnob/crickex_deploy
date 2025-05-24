import {
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
  MenuSection,
  MenuSeparator,
} from "@headlessui/react";
import IconButton from "../ui/button/IconButton";
import { CgProfile } from "react-icons/cg";
import React from "react";
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
  return (
    <Menu>
      <MenuButton as={React.Fragment}>
        <IconButton
          color="link"
          icon={<CgProfile className="size-7.5 text-white" />}
          className="p-0!"
        />
      </MenuButton>
      <MenuItems
        anchor={{ to: "bottom end", gap: "18px", offset: "45px" }}
        className="[--anchor-max-height:35rem] w-55 bg-white rounded z-10"
      >
        <MenuSection className="pt-2 px-4 pb-4.5">
          <MenuItem as="div">
            <data
              value="MD. Ruhul Amin"
              className="text-base font-bold text-[#555555]"
            >
              MD. Ruhul Amin
            </data>

            <p className="text-sm mt-2 text-[#555555]">Gift Points</p>

            <div className="flex items-center">
              <data className="text-lg font-bold text-blue-1" value={0}>
                0
              </data>
              <IconButton
                className="inline-block"
                color="link"
                icon={<TfiReload className="size-2.5 text-blue-1 stroke-2" />}
                onClick={(e) => {
                  e.preventDefault();
                  console.log("hello");
                }}
              ></IconButton>
            </div>
          </MenuItem>
        </MenuSection>
        {PROFILE_ITEMS.map((section) => (
          <MenuSection key={section.section_id} className="py-2 px-4">
            {section.section_items.map((item) => (
              <MenuItem key={item.name}>
                <a
                  className="flex items-center gap-4 py-2 data-focus:bg-blue-100"
                  href="#"
                >
                  <img src={item.icon} width={30} height={30} />
                  <span className="text-[#555555] font-bold">{item.name}</span>
                </a>
              </MenuItem>
            ))}
          </MenuSection>
        ))}
      </MenuItems>
    </Menu>
  );
}
