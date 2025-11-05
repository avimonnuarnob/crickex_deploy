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
import Button from "@/components/ui/button/Button";

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
      isFullScreen
    >
      <div className="flex flex-col bg-white">
        {/* Profile header with background image */}
        <div className="relative p-[5.3333333333vw] pb-0 sm:p-5 sm:pb-0">
          <div className="h-[32vw] sm:h-30 bg-gray-200 overflow-hidden rounded-lg">
            <img
              src="https://img.c88rx.com/cx/h5/assets/images/player/vip/vip-card-bg-1.jpg?v=1749551408337"
              alt="Profile background"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Profile avatar */}
          <div className="absolute left-1/2 transform -translate-x-1/2 -bottom-5.75">
            <div className="w-[21.3333333333vw] h-[21.3333333333vw] sm:w-20 sm:h-20 rounded-full bg-gray-100 flex items-center justify-center shadow">
              {/* <FaUser className="text-gray-400 text-4xl" /> */}
              <img
                src={memberIcon}
                alt="Member Icon"
                className="w-full h-full"
              />
            </div>
          </div>
        </div>

        <div className="pt-[9.3333333333vw] sm:pt-8.75 mx-[5.3333333333vw] sm:mx-5 pb-5 bg-[#6666661A]">
          {/* Username and level */}
          <div className="text-center flex justify-center items-center gap-2.5">
            <div className="text-gray-700 text-[4.2666666667vw] sm:text-base">
              {userInfo?.username.slice(2)}
            </div>
            <div className="inline-block bg-gray-400 text-white text-[3.2vw] sm:text-xs p-[1.3333333333vw] sm:p-1.25 rounded">
              {userInfo?.user_type}
            </div>
          </div>
          {/* Registration date */}
          <div className="text-center text-[3.2vw] sm:text-xs text-gray-500 mt-[2.1333333333vw] sm:mt-2.5">
            Date Registered : {userInfo?.date_joined.split("T")[0]}
          </div>
        </div>

        {/* Gift points section */}
        <div className="m-2.5 p-2.5">
          <div className="px-4 flex items-center justify-between bg-[#6666661A] h-13.5 rounded">
            <div className="flex-1 flex items-center">
              <div className="text-sm text-gray-600">VIP Points (VP)</div>
              <div className="text-xl font-medium text-blue-500 flex-1 text-center">
                {userWalletData?.coin_balance}
              </div>
            </div>
            <Link to={"/member/vip-points-exchange"}>
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2">My VIP</span>
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
            <div className="flex-1 flex items justify-between">
              <div>
                <div className="text-[#474747] leading-8.75">Full Name</div>
                <div className="text-[#999999] text-sm">
                  {userInfo?.first_name} {userInfo?.last_name}
                </div>
              </div>
              {!userInfo?.first_name && !userInfo?.last_name && (
                <Link to="/member/new-profile-verify-name">
                  <Button
                    color="green"
                    className="w-[25.3333333333vw] h-[8vw] sm:w-[95px] sm:h-[30px]"
                  >
                    Add
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Birthday */}
          <div className="flex  mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="w-8 mt-2">
              <FaBirthdayCake className="text-blue-500" />
            </div>
            <div className="flex-1 flex justify-between items-center">
              <div>
                <div className="text-[#474747] leading-8.75">Birthday</div>
                <div className="text-[#999999] text-sm">{userInfo?.dob}</div>
              </div>
              {!userInfo?.dob && (
                <Link to="/member/new-profile-verify-dob">
                  <Button
                    color="green"
                    className="w-[25.3333333333vw] h-[8vw] sm:w-[95px] sm:h-[30px]"
                  >
                    Add
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {/* Phone Number */}
          <div className="flex justify-between mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="flex">
              <div className="w-8 mt-2">
                <FaPhone className="text-blue-500" />
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <div className="flex items-center gap-2">
                    <div className="text-[#474747] leading-8.75">
                      Phone Number
                    </div>
                  </div>
                </div>
                <div className="text-[#999999] text-sm">
                  {userInfo?.contact}
                </div>
              </div>
            </div>
            {!userInfo?.contact ? (
              <Link to="/member/new-profile-verify-phone">
                <Button
                  color="green"
                  className="w-[25.3333333333vw] h-[8vw] sm:w-[95px] sm:h-[30px]"
                >
                  Add
                </Button>
              </Link>
            ) : (
              <span className="text-green-1 leading-8.75 text-sm">
                Verified
              </span>
            )}
          </div>

          {/* Email section */}
          <div className="flex justify-between mt-4 pt-4 border-t border-t-[#6666661a]">
            <div className="flex">
              <div className="w-8 mt-2">
                <IoMail className="text-blue-500" />
              </div>
              <div className="flex">
                <div>
                  <div className="flex items-center gap-2">
                    <div className="text-[#474747] leading-8.75">Email</div>
                  </div>
                  {userInfo?.email && (
                    <div className="text-[#999999] text-sm">
                      {userInfo?.email}
                    </div>
                  )}
                </div>
              </div>
            </div>

            {!userInfo?.email ? (
              <Link to="/member/new-profile-verify-email">
                <Button
                  color="green"
                  className="w-[25.3333333333vw] h-[8vw] sm:w-[95px] sm:h-[30px]"
                >
                  Add
                </Button>
              </Link>
            ) : (
              <span className="text-green-1 leading-8.75 text-sm">
                Verified
              </span>
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
