import Modal from "@/components/ui/modal/Modal";
import { useNavigate } from "react-router";
import { Fragment, useState } from "react";
import Button from "@/components/ui/button/Button";
import { FormTextField } from "@/components/ui/form-inputs";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Select,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import classNames from "classnames";
import Cookies from "js-cookie";
import type { Route } from "./+types/deposit";
import { BsCaretDown, BsCheck } from "react-icons/bs";
import { TfiReload } from "react-icons/tfi";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { LuThumbsUp } from "react-icons/lu";

export type Gateways = Gateway[];

export interface Gateway {
  id: number;
  agent: Agent;
  gateway_name: GatewayName;
  transaction_id: any;
  gateway_account: string;
  gateway_old_account: string;
  gateway_username: any;
  pm_gateway_url: any;
  gateway_url: any;
  gateway_image: any;
  agent_status: string;
  enable: boolean;
  use_in_affiliate: boolean;
  use_in_user: boolean;
  use_in_agent: boolean;
  updated_at: string;
  url_id: number;
}

export interface Agent {
  username: string;
  id: number;
}

export interface GatewayName {
  id: number;
  currency: Currency;
  min_withdrawal_limit: number;
  max_withdrawal_limit: number;
  gateway_title: string;
  gateway_name: string;
  gateway_logo: string;
  gateway_status: boolean;
  gateway_type: string;
  purpose: string;
  withdrawal_type: string;
  deposit_type: string;
  gateway_tooltip: string;
  min_deposit_limit: string;
  max_deposit_limit: string;
  agent_min_deposit_limit: string;
  agent_max_deposit_limit: string;
  amount_suggestion: string[];
  agent_amount_suggestion: string[];
  deposit_des: string;
  withdraw_des: string;
  updated_at: string;
  url_id: number;
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

export const clientLoader = async () => {
  const response = await fetch(
    "https://ai.cloud7hub.uk/payment/domain-wise/live-gateway/list/",
    {
      headers: {
        Authorization: `Token ${Cookies.get("userToken")}`,
      },
    }
  );
  const data = await response.json();
  return { gateways: data.data as Gateways };
};

export default function Deposit({ loaderData }: Route.ComponentProps) {
  const { gateways } = loaderData;
  const { userWalletData, setUserWalletData } = useCurrentUser();
  const navigate = useNavigate();
  const [amount, setAmount] = useState("");
  const [selectedPaymentIndex, setSelectedPaymentIndex] = useState<
    number | null
  >(0);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Modal
      isFullScreen={true}
      isOpen={true}
      onClose={() => {
        navigate(-1);
      }}
      title="Funds"
    >
      <div className="flex flex-col">
        <TabGroup className="">
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
                    "flex-1 py-1.25 bg-blue-1 text-white text-center focus:outline-none data-selected:bg-blue-3 rounded",
                    {}
                  )}
                >
                  <span
                    className={classNames(
                      "block bg-blue-2 py-1.25 text-[13px] rounded-l",
                      {
                        "bg-blue-3": selected,
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
                    "flex-1 py-1.25 bg-blue-1 text-white text-center focus:outline-none data-selected:bg-blue-3 rounded",
                    {}
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
            <TabPanel>
              <div className="m-2.5">
                <div className="flex items-center justify-between bg-yellow-500 p-2.5 rounded">
                  <div className="flex items-center gap-2 text-white text-sm">
                    <PromoIcon />
                    <span>Select Promotion</span>
                  </div>
                  <Select
                    name="status"
                    aria-label="Project status"
                    className="focus:outline-0 text-white"
                  >
                    <option value="active">Active</option>
                    <option value="paused">Paused</option>
                    <option value="delayed">Delayed</option>
                    <option value="canceled">Canceled</option>
                  </Select>
                </div>
              </div>

              <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
                <div className="flex gap-1.25 items-center border-b">
                  <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                  <span className="font-bold text-[15px] block my-2 text-gray-9">
                    Payment Method
                  </span>
                </div>
                <div
                  className="grid gap-2.5 py-2.5 border-b border-dashed"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill,calc((100% - 20px) / 3))",
                  }}
                >
                  {gateways.map((gateway, i) => (
                    <div
                      key={gateway.id}
                      className={`flex items-center ${
                        selectedPaymentIndex === i
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setSelectedPaymentIndex(i)}
                        className="relative w-full bg-white border-1 border-blue-1 rounded py-1.25 px-2.5 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group overflow-hidden leading-[35px]"
                      >
                        {/* Icon container */}
                        <div className="rounded-full w-6.25 h-6.25 flex items-center justify-center mb-1.75">
                          <img
                            src={
                              "https://ai.cloud7hub.uk" +
                              gateway.gateway_name.gateway_logo
                            }
                            className="w-full h-full object-cover"
                            alt={gateway.gateway_name.gateway_name}
                          />
                        </div>

                        {/* Text */}
                        <span className="text-blue-1 font-medium text-xs">
                          {gateway.gateway_name.gateway_title}
                        </span>

                        {/* Triangle with check mark in bottom right corner */}
                        {selectedPaymentIndex === i && (
                          <div
                            className="absolute bottom-0 right-0 w-5 h-4 bg-blue-1"
                            style={{
                              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                            }}
                          >
                            <div className="absolute bottom-0 right-0 flex items-center justify-center">
                              <BsCheck className="size-3 text-white stroke-1" />
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
                <div
                  className="py-2.5 grid gap-2.5"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill,calc((100% - 20px) / 2))",
                  }}
                >
                  <button className="w-full bg-blue-1 text-white rounded-sm flex items-center justify-center mb-4 h-8.75">
                    <span className="text-xs">TRC20</span>
                  </button>
                </div>
              </div>

              {selectedPaymentIndex !== null && (
                <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
                  <div className="flex gap-1.25 items-center border-b">
                    <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                    <span className="font-bold text-[15px] block my-2 flex-1">
                      Deposit Channel
                    </span>
                  </div>
                  <div
                    className="py-2.5 grid gap-2.5"
                    style={{
                      gridTemplateColumns:
                        "repeat(auto-fill,calc((100% - 20px) / 2))",
                    }}
                  >
                    <div className={`relative rounded-xs flex items-center`}>
                      <div
                        className="absolute z-2"
                        style={{ top: "5px", left: "-4px" }}
                      >
                        <div className="bg-[#76bd6a] text-white text-xs h-3.75 w-5 rounded-xs grid place-items-center">
                          <LuThumbsUp className="size-3 text-white" />
                        </div>
                      </div>

                      <div
                        className="absolute z-0 rounded-xs"
                        style={{
                          width: "20px",
                          height: "15px",
                          // transform: "rotate(45deg)",
                          top: "5px",
                          left: "-4px",
                          boxShadow: "2px 2px 3px 0",
                        }}
                      ></div>
                      <button className="w-full z-1 h-8.75 border rounded-xs border-black bg-white flex items-center justify-center overflow-auto">
                        <span className="text-xs">TRC20</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {selectedPaymentIndex !== null && (
                <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
                  <div className="flex gap-1.25 items-center border-b">
                    <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                    <span className="font-bold text-[15px] block my-2 flex-1">
                      Amount
                    </span>
                    <span className="font-bold text-[15px] block my-2 self-end">
                      {
                        gateways[selectedPaymentIndex].gateway_name.currency
                          .currency
                      }{" "}
                      {parseInt(
                        gateways[selectedPaymentIndex].gateway_name
                          .min_deposit_limit
                      )}{" "}
                      {"-"}{" "}
                      {
                        gateways[selectedPaymentIndex].gateway_name.currency
                          .currency
                      }{" "}
                      {parseInt(
                        gateways[selectedPaymentIndex].gateway_name
                          .max_deposit_limit
                      )}
                    </span>
                  </div>

                  <div className="relative my-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <div className="bg-green-500 w-5 h-5 rounded-full p-1 flex justify-center items-center">
                        <span className="text-white text-center text-xs">
                          T
                        </span>
                      </div>
                    </div>
                    <input
                      type="number"
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {selectedPaymentIndex !== null && (
                <div className="m-2.5 grid grid-cols-4 gap-0.5">
                  {gateways[
                    selectedPaymentIndex
                  ].gateway_name.amount_suggestion.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="min-w-1/4 p-2.5 text-xs border border-grey rounded flex items-center justify-center mb-4 bg-white"
                      onClick={() => setAmount(suggestion)}
                    >
                      +{parseInt(suggestion)}
                    </button>
                  ))}
                </div>
              )}

              <div className="mx-2.5">
                <Button
                  disabled
                  className="bg-blue-600 text-white py-3 rounded"
                  size="lg"
                  isBlock
                >
                  Submit
                </Button>
              </div>
            </TabPanel>

            <TabPanel>
              <div className="flex flex-col bg-blue-1 px-4.25 py-7.5 pt-0">
                <div>
                  <div className="flex gap-1.5 items-center">
                    <span className="text-white text-xs">Main wallet</span>
                    <button
                      className="cursor-pointer"
                      onClick={async () => {
                        setIsLoading(true);
                        const response = await fetch(
                          "https://ai.cloud7hub.uk/auth/user-balance/",
                          {
                            headers: {
                              Authorization: `Token ${Cookies.get(
                                "userToken"
                              )}`,
                            },
                          }
                        );

                        const responseData = await response.json();

                        if (responseData.status === "ok") {
                          setUserWalletData(responseData.data);
                          setIsLoading(false);
                        }
                      }}
                    >
                      <TfiReload
                        className={classNames("size-3 text-white", {
                          "animate-spin": isLoading,
                        })}
                      />
                    </button>
                  </div>
                  <div className="justify-self-end">
                    <span className="text-[45px] text-white">
                      {userWalletData?.credit_balance}
                    </span>
                  </div>
                </div>
              </div>

              <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
                <div className="flex gap-1.25 items-center border-b">
                  <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                  <span className="font-bold text-[15px] block my-2 text-gray-9">
                    Payment Method
                  </span>
                </div>
                <div
                  className="grid gap-2.5 py-2.5 border-b border-dashed"
                  style={{
                    gridTemplateColumns:
                      "repeat(auto-fill,calc((100% - 20px) / 3))",
                  }}
                >
                  {gateways.map((gateway, i) => (
                    <div
                      key={gateway.id}
                      className={`flex items-center ${
                        selectedPaymentIndex === i
                          ? "border-blue-500"
                          : "border-gray-300"
                      }`}
                    >
                      <button
                        onClick={() => setSelectedPaymentIndex(i)}
                        className="relative w-full bg-white border-1 border-blue-1 rounded py-1.25 px-2.5 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group overflow-hidden leading-[35px]"
                      >
                        {/* Icon container */}
                        <div className="rounded-full w-6.25 h-6.25 flex items-center justify-center mb-1.75">
                          <img
                            src={
                              "https://ai.cloud7hub.uk" +
                              gateway.gateway_name.gateway_logo
                            }
                            className="w-full h-full object-cover"
                            alt={gateway.gateway_name.gateway_name}
                          />
                        </div>

                        {/* Text */}
                        <span className="text-blue-1 font-medium text-xs">
                          {gateway.gateway_name.gateway_title}
                        </span>

                        {/* Triangle with check mark in bottom right corner */}
                        {selectedPaymentIndex === i && (
                          <div
                            className="absolute bottom-0 right-0 w-5 h-4 bg-blue-1"
                            style={{
                              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                            }}
                          >
                            <div className="absolute bottom-0 right-0 flex items-center justify-center">
                              <BsCheck className="size-3 text-white stroke-1" />
                            </div>
                          </div>
                        )}
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {selectedPaymentIndex !== null && (
                <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
                  <div className="flex gap-1.25 items-center border-b">
                    <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                    <span className="font-bold text-[15px] block my-2 flex-1">
                      Amount
                    </span>
                    <span className="font-bold text-[15px] block my-2 self-end">
                      {
                        gateways[selectedPaymentIndex].gateway_name.currency
                          .currency
                      }{" "}
                      {parseInt(
                        gateways[selectedPaymentIndex].gateway_name
                          .agent_min_deposit_limit
                      )}{" "}
                      {"-"}{" "}
                      {
                        gateways[selectedPaymentIndex].gateway_name.currency
                          .currency
                      }{" "}
                      {parseInt(
                        gateways[selectedPaymentIndex].gateway_name
                          .agent_max_deposit_limit
                      )}
                    </span>
                  </div>

                  <div className="relative my-2.5">
                    <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                      <div className="bg-green-500 w-5 h-5 rounded-full p-1 flex justify-center items-center">
                        <span className="text-white text-center text-xs">
                          T
                        </span>
                      </div>
                    </div>
                    <input
                      type="number"
                      className="block w-full pl-10 pr-4 py-2 border border-gray-300 rounded"
                      placeholder="0"
                      value={amount}
                      onChange={(e) => setAmount(e.target.value)}
                    />
                  </div>
                </div>
              )}

              {selectedPaymentIndex !== null && (
                <div className="m-2.5 grid grid-cols-4 gap-0.5">
                  {gateways[
                    selectedPaymentIndex
                  ].gateway_name.agent_amount_suggestion.map((suggestion) => (
                    <button
                      key={suggestion}
                      className="min-w-1/4 p-2.5 text-xs border border-grey rounded flex items-center justify-center mb-4 bg-white"
                      onClick={() => setAmount(suggestion)}
                    >
                      +{parseInt(suggestion)}
                    </button>
                  ))}
                </div>
              )}

              <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
                <div className="flex gap-1.25 items-center border-b">
                  <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                  <span className="font-bold text-[15px] block my-2 text-gray-9">
                    Please select address
                  </span>
                </div>
                <span className="block pt-3.75 pb-5 text-center text-sm text-gray-9">
                  -- support no more than 3 addresses --
                </span>
                <Disclosure as="div" className="rounded overflow-hidden">
                  <DisclosureButton className="w-full h-11 flex items-center gap-1.5 pl-2.5 pr-7.5 bg-[#6a84cb]">
                    <AddCardIcon />
                    <span className="flex-1 text-left text-sm text-white">
                      Add Address
                    </span>
                    <BsCaretDown className="text-white" />
                  </DisclosureButton>
                  <DisclosurePanel className="text-gray-500  border border-[#6a84cb] rounded-b">
                    <div className="m-2.5 px-2.5 py-3.75 group">
                      <label className="text-xs">Wallet Address</label>
                      <input
                        className="box-border w-full h-10 border border-gray-300 rounded px-2.5 text-sm"
                        placeholder="Wallet Address"
                      />
                    </div>
                  </DisclosurePanel>
                </Disclosure>
              </div>

              <div className="mx-2.5">
                <Button
                  disabled
                  className="bg-blue-600 text-white py-3 rounded"
                  size="lg"
                  isBlock
                >
                  Submit
                </Button>
              </div>
            </TabPanel>
          </TabPanels>
        </TabGroup>
      </div>
    </Modal>
  );
}

const PromoIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={20} height={20} {...props}>
    <title>{"icon-set/icon-selectpromotion"}</title>
    <path
      fill="#FFF"
      fillRule="nonzero"
      d="M8.389.653a1.676 1.676 0 0 1 2.654 0l.525.688c.42.55 1.147.783 1.815.58l.836-.249c1.054-.319 2.13.448 2.147 1.538l.012.858a1.644 1.644 0 0 0 1.122 1.52l.823.278c1.046.357 1.454 1.6.82 2.49l-.5.705a1.614 1.614 0 0 0 0 1.882l.495.704a1.629 1.629 0 0 1-.82 2.491l-.822.278a1.639 1.639 0 0 0-1.122 1.52l-.013.858c-.016 1.09-1.092 1.857-2.146 1.538l-.832-.249a1.673 1.673 0 0 0-1.815.58l-.516.684c-.664.87-1.991.87-2.655 0l-.525-.688a1.673 1.673 0 0 0-1.815-.58l-.832.253c-1.054.32-2.13-.448-2.146-1.538l-.013-.857a1.644 1.644 0 0 0-1.121-1.521l-.824-.278c-1.046-.356-1.453-1.6-.819-2.49l.5-.705a1.614 1.614 0 0 0 0-1.882l-.5-.704a1.629 1.629 0 0 1 .82-2.49l.823-.279a1.639 1.639 0 0 0 1.121-1.52l.013-.858c.017-1.09 1.092-1.857 2.146-1.538l.832.249a1.673 1.673 0 0 0 1.815-.58Zm1.648 4.057a.269.269 0 0 0-.496 0L8.207 7.867l-3.415.293a.27.27 0 0 0-.153.472l2.59 2.244-.776 3.339a.269.269 0 0 0 .401.29l2.935-1.77 2.935 1.77a.269.269 0 0 0 .4-.29l-.776-3.339 2.59-2.244a.27.27 0 0 0-.153-.471l-3.415-.294Z"
    />
  </svg>
);

const AddCardIcon = (props: any) => (
  <svg xmlns="http://www.w3.org/2000/svg" width={31} height={25} {...props}>
    <title>{"icon-add-card"}</title>
    <path
      fill="#FFF"
      fillRule="nonzero"
      d="M25.543 15.217a4.891 4.891 0 1 1 0 9.783 4.891 4.891 0 0 1 0-9.783Zm0 2.174c-.3 0-.543.244-.543.544v1.63h-1.63a.543.543 0 0 0 0 1.087H25v1.63a.543.543 0 1 0 1.087 0v-1.63h1.63a.543.543 0 1 0 0-1.087h-1.63v-1.63c0-.3-.243-.544-.544-.544ZM27.717 0c.9 0 1.63.73 1.63 1.63V15.5a5.973 5.973 0 0 0-9.754 4.065H1.63c-.9 0-1.63-.73-1.63-1.63V1.63C0 .73.73 0 1.63 0h26.087ZM10.165 12.842a2.717 2.717 0 0 0-3.65-.333 2.693 2.693 0 0 0-1.624-.553 2.717 2.717 0 0 0 0 5.435 2.693 2.693 0 0 0 1.625-.552 2.717 2.717 0 0 0 3.649-3.997Zm-5.274.201a1.63 1.63 0 1 1 0 3.261 1.63 1.63 0 0 1 0-3.26Zm14.13 0h-5.434c-.3 0-.544.244-.544.544v2.174c0 .3.244.543.544.543h5.435c.3 0 .543-.243.543-.543v-2.174c0-.3-.243-.544-.543-.544Zm-11.956.288a1.823 1.823 0 0 1 2.03.042c.596.424.836 1.16.595 1.825-.24.666-.907 1.112-1.654 1.106a1.798 1.798 0 0 1-.97-.288 2.49 2.49 0 0 0 0-2.685Zm11.413.8v1.086H14.13V14.13h4.348Zm4.348-5.435h-2.174v1.087h2.174V8.696Zm4.348 0H25v1.087h2.174V8.696Zm-8.696 0h-2.174v1.087h2.174V8.696Zm-4.348 0h-2.173v1.087h2.173V8.696ZM7.065 2.174h-3.26c-.901 0-1.631.73-1.631 1.63v2.174c0 .9.73 1.63 1.63 1.63h3.261c.9 0 1.63-.73 1.63-1.63V3.804c0-.9-.73-1.63-1.63-1.63Zm.544 3.26v.544c0 .3-.244.544-.544.544h-.543V5.435h1.087ZM5.435 3.262v3.26h-1.63a.543.543 0 0 1-.544-.543V3.804c0-.3.243-.543.543-.543h1.63Zm21.739 0h-1.087v2.174h1.087V3.26ZM25 3.26h-1.087v2.174H25V3.26Zm-2.174 0H21.74v2.174h1.087V3.26Zm-2.174 0h-1.087v2.174h1.087V3.26Zm-2.174 0h-1.087v2.174h1.087V3.26Zm-2.174 0h-1.087v2.174h1.087V3.26Zm-9.239 0c.3 0 .544.243.544.543v.544H6.522V3.26h.543Z"
    />
  </svg>
);
