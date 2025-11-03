import Modal from "@/components/ui/modal/Modal";
import { Await, useNavigate } from "react-router";
import React, { Fragment, useEffect, useState } from "react";
import Button from "@/components/ui/button/Button";
import { LuThumbsUp } from "react-icons/lu";
import {
  Select,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import Cookies from "js-cookie";
import type { Route } from "./+types/transaction";
import { BsCaretDown, BsCheck } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { IoCloseCircleSharp, IoInformationCircleSharp } from "react-icons/io5";
import { FaCheckCircle } from "react-icons/fa";
import { toast } from "react-toastify";
import DepositForm from "@/components/banking/deposit-form";
import WithdrawalForm from "@/components/banking/withdrawal-form";
import { useSearchParams } from "react-router";

export type Gateways = Gateway[];
export interface Gateway {
  id: number;
  agent: Agent;
  gateway_name: GatewayName;
  transaction_id: any;
  gateway_account: string;
  gateway_old_account: any;
  gateway_username: any;
  pm_gateway_url: any;
  gateway_url: any;
  gateway_image: any;
  agent_status: string;
  enable: boolean;
  gateway_purpose: string;
  min_w_limit: string;
  max_w_limit: string;
  min_d_limit: string;
  max_d_limit: string;
  use_in_affiliate: boolean;
  use_in_user: boolean;
  use_in_agent: boolean;
  updated_at: string;
  url_id: any;
  note: string | null;
}

export interface Agent {
  username: string;
  id: number;
}

export interface Category {
  id: number;
  name: string;
}

export interface SupportedMethod {
  id: number;
  category: Category;
  name: string;
  note: string;
  logo: string;
}

export interface GatewayName {
  id: number;
  currency: Currency;
  min_withdrawal_limit: number;
  max_withdrawal_limit: number;
  supported_method: SupportedMethod[];
  gateway_title: string;
  gateway_name: string;
  gateway_logo: any;
  gateway_status: boolean;
  gateway_type: string;
  purpose: string;
  withdrawal_type: string;
  deposit_type: string;
  gateway_tooltip?: string;
  min_deposit_limit: string;
  max_deposit_limit: string;
  agent_min_deposit_limit: string;
  agent_max_deposit_limit: string;
  amount_suggestion: string[];
  agent_amount_suggestion: string[];
  deposit_des: string;
  withdraw_des: string;
  updated_at: string;
  url_id: any;
}

export interface Currency {
  id: number;
  currency: string;
  currency_title: string;
  currency_icon: string;
  user_currency: boolean;
  created_at: string;
  updated_at: string;
}

interface User {
  id: number;
  username: string;
  currency: string;
}

interface UrlId {
  id: number;
  name: string;
  url: string;
}

export interface UserDeposit {
  id: number;
  receiver_id: User;
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
}
export interface UserWithdrawal {
  id: number;
  user_id: User;
  agent_id: any;
  url_id: UrlId;
  payment_gateway: string;
  gateway_title: string;
  payment_unit: string;
  amount: string;
  transaction_id: string;
  to_account: string;
  withdrawal_fee_percentage: string;
  fee_amount: string;
  withdrawal_amount: string;
  withdrawal_type: string;
  wallet: string;
  bank_acc_name: any;
  bank_name: any;
  bank_branch: any;
  bank_code: any;
  account_email: any;
  bank_country: any;
  bank_swift_code: any;
  bank_iban: any;
  status: string;
  busy_screenshot: any;
  busy_reason: any;
  user_previous_balance: string;
  user_current_balance: string;
  user_to_gateway_currency_rate: string;
  user_to_agent_currency_rate: string;
  exchange_amount: string;
  agent_exchange_amount: string;
  created_at: string;
  updated_at: string;
}

export type BankBook = BankEntry[];

export interface BankEntry {
  id: number;
  bank_name: string;
  is_verified: boolean;
  account_name: string;
  account_number: string;
  user: number;
}

export const clientLoader = async () => {
  const promiseOfGateways = fetch(
    import.meta.env.VITE_API_URL + "/payment/domain-wise/live-gateway/list/",
    {
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  )
    .then((response) => response.json())
    .then((data) => data.data as Gateways);
  return { promiseOfGateways };
};

export default function Transaction({
  loaderData,
  params,
}: Route.ComponentProps) {
  const { transaction_type } = params;
  const { promiseOfGateways } = loaderData;
  const navigate = useNavigate();

  let [searchParams, setSearchParams] = useSearchParams();
  const promotion = searchParams.get("promotion");

  const [isModalOpen, setIsModalOpen] = useState(true);
  const [selectedIndex, setSelectedIndex] = useState(
    transaction_type === "deposit" ? 0 : 1
  );

  const handleCasheirModal = () => {
    setIsModalOpen(false);

    setTimeout(() => {
      const a = location.pathname.replace(
        "/member/wallet/" + transaction_type,
        ""
      );
      const b = a ? a : "/";
      setSearchParams((searchParams) => {
        searchParams.delete("promotion");
        return searchParams;
      });
      navigate(b + "?" + searchParams.toString());
    }, 500);
  };

  return (
    <Modal
      isFullScreen={true}
      isOpen={isModalOpen}
      onClose={handleCasheirModal}
      title="Funds"
    >
      <div className="flex flex-col">
        <React.Suspense
          fallback={
            <div className="flex justify-center items-center flex-col h-full">
              <div className="list-loading w-10 h-10">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <Await resolve={promiseOfGateways}>
            {(gateways) => {
              return (
                <TabGroup
                  className=""
                  selectedIndex={selectedIndex}
                  onChange={(index) => {
                    setSelectedIndex(index);

                    if (index === 0) {
                      navigate("/member/wallet/deposit", {
                        replace: true,
                      });
                    } else {
                      navigate("/member/wallet/withdrawal", {
                        replace: true,
                      });
                    }
                  }}
                >
                  <TabList
                    className="flex bg-blue-1 pb-3 px-3.75 pt-2 text-sm"
                    style={{
                      boxShadow: "0 1px 3px #0000004d",
                    }}
                  >
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={classNames(
                            "flex-1 py-0.75 bg-transparent text-white text-center focus:outline-none data-selected:bg-[#2d9eff] rounded",
                            {
                              "shadow shadow-[#00197980]": selected,
                            }
                          )}
                        >
                          <span
                            className={classNames(
                              "block py-1.25 text-[13px] rounded-l",
                              {
                                "bg-[#2d9eff]": selected,
                                "bg-blue-2": !selected,
                              }
                            )}
                          >
                            Deposit
                          </span>
                        </button>
                      )}
                    </Tab>
                    <Tab as={Fragment}>
                      {({ selected }) => (
                        <button
                          className={classNames(
                            "flex-1 py-0.75 bg-blue-1 text-white text-center focus:outline-none data-selected:bg-blue-3 rounded",
                            {
                              "shadow shadow-[#00197980]": selected,
                            }
                          )}
                        >
                          <span
                            className={classNames(
                              "block bg-blue-2 py-1.25 text-[13px] rounded-r",
                              {
                                "bg-blue-3": selected,
                              }
                            )}
                          >
                            Withdrawal
                          </span>
                        </button>
                      )}
                    </Tab>
                  </TabList>

                  <TabPanels>
                    <Transition
                      show={selectedIndex === 0}
                      enter="transition-transform duration-300"
                      enterFrom="-translate-x-full"
                      enterTo="translate-x-0"
                      leave="transition-transform duration-300"
                      leaveFrom="translate-x-0"
                      leaveTo="-translate-x-full"
                    >
                      <TabPanel static>
                        <DepositForm
                          gateways={gateways.filter(
                            (gateway) =>
                              gateway.use_in_user &&
                              (gateway.gateway_purpose === "deposit" ||
                                gateway.gateway_purpose === "both")
                          )}
                          parentCallback={handleCasheirModal}
                          selectedPromotion={promotion ?? undefined}
                        />
                      </TabPanel>
                    </Transition>
                    <Transition
                      show={selectedIndex === 1}
                      enter="transition-transform delay-200 duration-300"
                      enterFrom="translate-y-full opacity-0"
                      enterTo="translate-y-0 opacity-100"
                      leave="transition-transform delay-200 duration-300"
                      leaveFrom="translate-y-0 opacity-100"
                      leaveTo="-translate-y-full opacity-0"
                    >
                      <TabPanel static>
                        <WithdrawalForm
                          gateways={gateways.filter(
                            (gateway) =>
                              gateway.use_in_user &&
                              (gateway.gateway_purpose === "withdrawal" ||
                                gateway.gateway_purpose === "both")
                          )}
                          parentCallback={handleCasheirModal}
                        />
                      </TabPanel>
                    </Transition>
                  </TabPanels>
                </TabGroup>
              );
            }}
          </Await>
        </React.Suspense>
      </div>
    </Modal>
  );
}
