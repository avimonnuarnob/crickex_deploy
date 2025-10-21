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
import { Await, useNavigate } from "react-router";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { IoMail } from "react-icons/io5";
import customerIcon from "@/assets/images/icon-customer.png";
import TransactionRecordsTable from "@/components/transaction/TransactionRecordsTable";
import { Dialog, DialogBackdrop } from "@headlessui/react";
import { FaAngleLeft } from "react-icons/fa6";
import Button from "@/components/ui/button/Button";
import classNames from "classnames";
import Cookies from "js-cookie";
import type { Route } from "./+types/transaction-records";
import Deposit from "./deposit";

export interface Deposit {
  id: number;
  receiver_id: ReceiverId;
  agent_id: any;
  url_id: UrlId;
  payment_gateway: string;
  gateway_title: string;
  payment_unit: string;
  amount: string;
  payment_batch: any;
  transaction_id: string;
  referral: any;
  given_hash: any;
  payee_account: string;
  payer_account: any;
  deposit_status: string;
  deposit_type: string;
  screenshot: any;
  message: string;
  gateway_to_agent_currency_rate: string;
  gateway_to_reciver_currency_rate: string;
  exchange_amount: string;
  agent_exchange_amount: string;
  created_at: string;
  updated_at: string;
  type: "Deposit";
}
export interface ReceiverId {
  id: number;
  username: string;
  currency: string;
}

export interface UrlId {
  id: number;
  name: string;
  url: string;
}

export type Transaction = Deposit;

export async function clientLoader() {
  const deposits = fetch("https://ai.cloud7hub.uk/wallet/deposit/", {
    headers: {
      Authorization: `Token ${Cookies.get("userToken")}`,
    },
  });

  // const withdrawals = fetch("https://ai.cloud7hub.uk/wallet/withdrawal/", {
  //   headers: {
  //     Authorization: `Token ${Cookies.get("userToken")}`,
  //   },
  // });

  const data = Promise.all([
    deposits
      .then((response) => response.json())
      .then((data) => data.data)
      .then(
        (data) =>
          data.map((d: Deposit) => ({
            ...d,
            type: "Deposit",
          })) as Promise<Deposit[]>
      ),
  ]);

  return { transactionsPromise: data };
}

const TransactionRecords = ({ loaderData }: Route.ComponentProps) => {
  const { transactionsPromise } = loaderData;
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [statusFilter, setStatusFilter] = useState<
    ("Processing" | "Completed" | "Failed")[]
  >([]);
  const [paymentTypeFilter, setPaymentTypeFilter] = useState<
    ("Deposit" | "Withdrawal" | "Adjustment")[]
  >([]);
  const [dateFilter, setDateFilter] = useState<
    "Today" | "Yesterday" | "Last 7 days"
  >("Today");

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

  const handleTransactionRecordsModal = () => {
    setTimeout(() => {
      const a = location.pathname.replace("/member/transaction-records", "");
      navigate(a ? a + location.hash : "/" + location.hash);
    }, 200);
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        isOpen={isModalOpen}
        isFullScreen={true}
        onClose={handleTransactionRecordsModal}
        title="Transaction Records"
      >
        <div className="">
          {/* <TransactionRecordsTable
            transactions={transactions}
            onFilterClick={() => {
              console.log(open);
              setOpen(!open);
            }}
            onRowClick={() => {
              console.log("row clicked");
            }}
            filterPeriod={[...statusFilter, ...paymentTypeFilter, dateFilter]}
          /> */}

          <React.Suspense
            fallback={
              <div className="flex justify-center items-center flex-col h-full">
                <div className="list-loading w-10 h-10">
                  <span className="sr-only">Loading...</span>
                </div>
              </div>
            }
          >
            <Await resolve={transactionsPromise}>
              {([deposits]) => {
                return (
                  <TransactionRecordsTable
                    transactions={[...deposits]}
                    onFilterClick={() => {
                      console.log(open);
                      setOpen(!open);
                    }}
                    onRowClick={() => {
                      console.log("row clicked");
                    }}
                    filterPeriod={[
                      ...statusFilter,
                      ...paymentTypeFilter,
                      dateFilter,
                    ]}
                  />
                );
              }}
            </Await>
          </React.Suspense>

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
