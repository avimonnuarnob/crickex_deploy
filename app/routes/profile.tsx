import React, { useState } from "react";
import Modal from "@/components/ui/modal/Modal";
import {
  FaUser,
  FaBirthdayCake,
  FaPhone,
  FaChevronRight,
  FaPlus,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { IoMail } from "react-icons/io5";
import customerIcon from "@/assets/images/icon-customer.png";
import memberIcon from "@/assets/icon/member.svg";

const PersonalInfoModal: React.FC = () => {
  const { userInfo, userWalletData } = useCurrentUser();
  const navigate = useNavigate();

  const [isModalOpen, setIsModalOpen] = useState(true);

  const handlePersonalInfoModal = () => {
    setTimeout(() => {
      const a = location.pathname.replace("/member/new-profile-info", "");
      navigate(a ? a + location.hash : "/" + location.hash);
    }, 200);
    setIsModalOpen(false);
  };

  return (
    <Modal
      isOpen={isModalOpen}
      onClose={handlePersonalInfoModal}
      title="Personal Info"
    >
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
              {/* <FaUser className="text-gray-400 text-4xl" /> */}
              <img
                src={memberIcon}
                alt="Member Icon"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-8.75 mx-6.5 pb-5 bg-[#6666661A]">
          {/* Username and level */}
          <div className="text-center flex justify-center items-center gap-2.5">
            <div className="text-gray-700">{userInfo?.username}</div>
            <div className="inline-block bg-gray-400 text-white text-xs px-2 py-0.5 rounded mt-1">
              {userInfo?.user_type}
            </div>
          </div>
          {/* Registration date */}
          <div className="text-center text-xs text-gray-500 mt-4.5">
            Date Registered : {userInfo?.date_joined.split("T")[0]}
          </div>
        </div>

        {/* Gift points section */}
        <div className="m-2.5 p-2.5">
          <div className="px-4 flex items-center justify-between bg-[#6666661A] h-13.5 rounded">
            <div className="flex-1 flex items-center">
              <div className="text-sm text-gray-600">Gift Points</div>
              <div className="text-xl font-medium text-blue-500 flex-1 text-center">
                {userWalletData?.coin_balance}
              </div>
            </div>
            <Link to={"/member/vip-points-exchange"}>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">
                  My Gift Points
                </span>
                <FaChevronRight className="text-gray-400" />
              </div>
            </Link>
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
                {userInfo?.first_name} {userInfo?.last_name}
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
              <div className="text-[#999999] text-sm">{userInfo?.dob}</div>
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex  mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="w-8 mt-2">
              <FaPhone className="text-blue-500" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between">
                <div className="flex items-center gap-2">
                  <div className="text-[#474747] leading-8.75">
                    Phone Number
                  </div>
                  <span className="text-blue-500 text-[10px] py-0.75 px-1.5 bg-blue-100 rounded">
                    Default
                  </span>
                </div>

                {userInfo?.is_active && (
                  <div className="text-green-500 text-sm grid place-items-center">
                    Verified
                  </div>
                )}
              </div>
              <div className="text-[#999999] text-sm">
                {userInfo?.support_contact}
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
              <div>
                <div className="flex items-center gap-2">
                  <div className="text-[#474747] leading-8.75">Email</div>
                  <span className="text-blue-500 text-[10px] py-0.75 px-1.5 bg-blue-100 rounded">
                    Default
                  </span>
                </div>
                {userInfo?.email && (
                  <div className="text-[#999999] text-sm">
                    {userInfo?.email}
                  </div>
                )}
              </div>
            </div>

            {!userInfo?.email && (
              <button
                className=" rounded px-4 flex items-center justify-center text-white text-sm w-23.75 h-7.5"
                style={{
                  background: "linear-gradient(to right,#82d856,#5ab72a 50%)",
                  boxShadow: "0 0 2px #50a325,inset 0 0 2px #ffffff80",
                }}
              >
                <span>Add</span>
              </button>
            )}
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
