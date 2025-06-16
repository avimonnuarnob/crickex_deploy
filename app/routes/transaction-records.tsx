import React, { useState } from "react";
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
import { Dialog, DialogBackdrop } from "@headlessui/react";
import { FaAngleLeft } from "react-icons/fa6";
import Button from "@/components/ui/button/Button";
import classNames from "classnames";

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

const TransactionRecords: React.FC<PersonalInfoModalProps> = ({
  isOpen,
  onClose,
  userData,
}) => {
  const { userInfo } = useCurrentUser();
  const displayData = userData || placeholderUserData;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [statusFilter, setStatusFilter] = useState<
    ("Processing" | "Completed" | "Failed")[]
  >([]);
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<
    ("Deposit" | "Withdrawal" | "Adjustment")[]
  >([]);
  const [dateFilter, setDateFilter] = useState<
    "Today" | "Yesterday" | "Last 7 days"
  >();

  const onStatusFilterUpdate = (
    status: "Processing" | "Completed" | "Failed"
  ) => {
    setStatusFilter((prev) => {
      if (prev.includes(status)) {
        return prev.filter((s) => s !== status);
      } else {
        return [...prev, status];
      }
    });
  };

  const onPaymentTypeFilterUpdate = (
    paymentType: "Deposit" | "Withdrawal" | "Adjustment"
  ) => {
    setPaymentTypeFilter((prev) => {
      if (prev.includes(paymentType)) {
        return prev.filter((s) => s !== paymentType);
      } else {
        return [...prev, paymentType];
      }
    });
  };

  const onDateFilterUpdate = (date: "Today" | "Yesterday" | "Last 7 days") => {
    setDateFilter(date);
  };

  return (
    <>
      <Modal
        isOpen={true}
        isFullScreen={true}
        onClose={() => navigate(-1)}
        title="Transaction Records"
      >
        <div className="">
          <TransactionRecordsTable
            transactions={transactions}
            onFilterClick={() => {
              console.log(open);
              setOpen(!open);
            }}
            onRowClick={() => {
              console.log("row clicked");
            }}
            filterPeriod={[...statusFilter, ...paymentTypeFilter, dateFilter]}
          />

          <div
            className={classNames(
              "absolute inset-0 overflow-hidden transition-all duration-300 ease-in-out",
              {
                "translate-x-0": open,
                "translate-x-full": !open,
              }
            )}
            aria-labelledby="drawer-title"
            role="dialog"
            aria-modal="true"
          >
            <div
              className="absolute inset-0 transition-opacity"
              aria-hidden="true"
            ></div>

            <div className="absolute flex flex-col inset-0 bg-white overflow-hidden">
              <div className="h-12.75 flex items-center border-b border-b-[#eeeeee]">
                <button
                  className="w-12.5 h-12.75 grid place-items-center border-r border-r-[#eeeeee] cursor-pointer"
                  onClick={() => setOpen(false)}
                >
                  <FaAngleLeft className="size-5" />
                </button>
                <span className="flex-1 text-[13px] text-[#0009] indent-5">
                  Transaction Record Filter
                </span>
              </div>

              <div className="flex flex-1 flex-col overflow-y-auto bg-red p-2.5 pt-2">
                <div className="mb-6.5">
                  <h2 className="text-xs text-[#0009] mb-2">Status</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        statusFilter.includes("Processing")
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onStatusFilterUpdate("Processing")}
                    >
                      Processing
                    </button>
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        statusFilter.includes("Failed")
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onStatusFilterUpdate("Failed")}
                    >
                      Rejected
                    </button>
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        statusFilter.includes("Completed")
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onStatusFilterUpdate("Completed")}
                    >
                      Approved
                    </button>
                  </div>
                </div>

                <div className="mb-6.5">
                  <h2 className="text-xs text-[#0009] mb-2">Payment Type</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        paymentTypeFilter.includes("Deposit")
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onPaymentTypeFilterUpdate("Deposit")}
                    >
                      Deposit
                    </button>
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        paymentTypeFilter.includes("Withdrawal")
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onPaymentTypeFilterUpdate("Withdrawal")}
                    >
                      Withdrwal
                    </button>
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        paymentTypeFilter.includes("Adjustment")
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onPaymentTypeFilterUpdate("Adjustment")}
                    >
                      Adjusment
                    </button>
                  </div>
                </div>

                <div className="mb-6.5">
                  <h2 className="text-xs text-[#0009] mb-2">Date</h2>
                  <div className="grid grid-cols-3 gap-2">
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        dateFilter === "Today" ? "bg-[#005dac]! text-white" : ""
                      }`}
                      onClick={() => onDateFilterUpdate("Today")}
                    >
                      Today
                    </button>
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        dateFilter === "Yesterday"
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onDateFilterUpdate("Yesterday")}
                    >
                      yesterday
                    </button>
                    <button
                      className={`bg-[#f5f5f5] px-4 py-2 text-[13px] rounded-xs  h-[35px] text-center cursor-pointer hover:opacity-[0.7] text-[#0009] ${
                        dateFilter === "Last 7 days"
                          ? "bg-[#005dac]! text-white"
                          : ""
                      }`}
                      onClick={() => onDateFilterUpdate("Last 7 days")}
                    >
                      Last 7 days
                    </button>
                  </div>
                </div>
              </div>

              <div className="p-2.5">
                <Button
                  className="h-12.75"
                  isBlock={true}
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  Confirm
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default TransactionRecords;
