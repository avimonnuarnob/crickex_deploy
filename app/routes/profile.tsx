import React from "react";
import Modal from "@/components/ui/modal/Modal";
import {
  FaUser,
  FaBirthdayCake,
  FaPhone,
  FaChevronRight,
  FaPlus,
  FaMailchimp,
} from "react-icons/fa";
import { IoMdClose } from "react-icons/io";
import { useNavigate } from "react-router";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { IoMail } from "react-icons/io5";
import customerIcon from "@/assets/images/icon-customer.png";
import TransactionRecordsTable from "@/components/transaction/TransactionRecordsTable";

interface PersonalInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData?: {
    username: string;
    level: string;
    dateRegistered: string;
    giftPoints: number;
    fullName: string;
    birthday: string;
    phoneNumber: string;
    isPhoneVerified: boolean;
  };
}

const placeholderUserData = {
  username: "Guest User",
  level: "Basic",
  dateRegistered: new Date().toISOString().split("T")[0],
  giftPoints: 0,
  fullName: "Not Available",
  birthday: "Not Available",
  phoneNumber: "Not Available",
  isPhoneVerified: true,
};

const transactions = [
  {
    id: "1",
    date: "2025/06/15",
    type: "Deposit",
    amount: 30000.0,
    status: "Processing" as const,
    time: "19:52:09",
  },
  {
    id: "2",
    date: "2025/06/15",
    type: "Deposit",
    amount: 5000.0,
    status: "Processing" as const,
    time: "19:49:18",
  },
  {
    id: "3",
    date: "2025/06/12",
    type: "Deposit",
    amount: 10000.0,
    status: "Failed" as const,
    time: "02:39:16",
  },
];

const PersonalInfoModal: React.FC<PersonalInfoModalProps> = ({
  isOpen,
  onClose,
  userData,
}) => {
  const { userInfo } = useCurrentUser();
  const displayData = userData || placeholderUserData;
  const navigate = useNavigate();

  console.log(userInfo);

  return (
    <Modal isOpen={true} onClose={() => navigate(-1)} title="Personal Info">
      <div className="flex flex-col bg-white">
        {/* Profile header with background image */}
        <div className="relative px-5 pt-5 pr-5">
          <div className="h-30 bg-gray-200 overflow-hidden rounded-lg">
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/player/vip/vip-card-bg-1.jpg?v=1749551408337"
              alt="Profile background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile avatar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-5">
            <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center shadow">
              <FaUser className="text-gray-400 text-4xl" />
            </div>
          </div>
        </div>

        <div className="pt-8.75 mx-6.5 pb-5 bg-[#6666661A]">
          {/* Username and level */}
          <div className="text-center flex justify-center items-center gap-2.5">
            <div className="text-gray-700">{displayData.username}</div>
            <div className="inline-block bg-gray-400 text-white text-xs px-2 py-0.5 rounded mt-1">
              {displayData.level}
            </div>
          </div>
          {/* Registration date */}
          <div className="text-center text-xs text-gray-500 mt-4.5">
            Date Registered : {displayData.dateRegistered}
          </div>
        </div>

        {/* Gift points section */}
        <div className="m-2.5 p-2.5">
          <div className="px-4 flex items-center justify-between bg-[#6666661A] h-13.5 rounded">
            <div className="flex-1 flex items-center">
              <div className="text-sm text-gray-600">Gift Points</div>
              <div className="text-xl font-medium text-blue-500 flex-1 text-center">
                {displayData.giftPoints}
              </div>
            </div>
            <div className="flex items-center">
              <span className="text-sm text-gray-600 mr-2">My Gift Points</span>
              <FaChevronRight className="text-gray-400" />
            </div>
          </div>
        </div>

        {/* Personal info fields */}
        <div className="p-2.5 m-2.5 mt-0">
          {/* Full Name */}
          <div className="flex">
            <div className="w-8 mt-2">
              <FaUser className="text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="text-[#474747] leading-8.75">Full Name</div>
              <div className="text-[#999999] text-sm">
                {displayData.fullName}
              </div>
            </div>
          </div>

          {/* Birthday */}
          <div className="flex  mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="w-8 mt-2">
              <FaBirthdayCake className="text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="text-[#474747] leading-8.75">Birthday</div>
              <div className="text-[#999999] text-sm">
                {displayData.birthday}
              </div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex  mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="w-8 mt-2">
              <FaPhone className="text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="text-[#474747] leading-8.75">Phone Number</div>
                {displayData.isPhoneVerified && (
                  <div className="text-green-500 text-sm grid place-items-center">
                    Verified
                  </div>
                )}
              </div>
              <div className="text-[#999999] text-sm">
                {displayData.phoneNumber}
              </div>

              <div className="mt-2.5 flex gap-2 items-center">
                <button className="border border-dotted border-gray-300 rounded-lg px-4 py-2 flex items-center text-gray-600">
                  <FaPlus className=" text-gray-500" />
                </button>
                <span className="text-xs text-[#999999]">Add</span>
              </div>
            </div>
          </div>

          {/* Email section */}
          <div className="flex justify-between mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="flex">
              <div className="w-8 mt-2">
                <IoMail className="text-blue-500" />
              </div>
              <div className="text-[#474747] leading-8.75">Email</div>
            </div>

            <button
              className=" rounded px-4 flex items-center justify-center text-white text-sm w-23.75 h-7.5"
              style={{
                background: "linear-gradient(to right,#82d856,#5ab72a 50%)",
                boxShadow: "0 0 2px #50a325,inset 0 0 2px #ffffff80",
              }}
            >
              <span>Add</span>
            </button>
          </div>
        </div>

        <div className="flex gap-2 items-center mb-2.5 px-4 py-2.5">
          <div className="w-8 h-8">
            <img className="w-full h-full" src={customerIcon} />
          </div>

          <div className="text-xs flex-1">
            <p>
              For privacy and security, Information can’t modified after
              confirmation. Please{" "}
              <span className="text-orange-400">contact customer service</span>
            </p>
          </div>
        </div>
      </div>
      {/* <TransactionRecordsTable
        transactions={transactions}
        onFilterClick={() => {
          console.log("filter clicked");
        }}
        onRowClick={() => {
          console.log("row clicked");
        }}
      /> */}
    </Modal>
  );
};

export default PersonalInfoModal;
