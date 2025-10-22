import { useCurrentUser } from "@/contexts/CurrentUserContext";
import type {
  BankEntry,
  Gateway,
  Gateways,
  UserWithdrawal,
} from "@/routes/deposit";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  TabGroup,
  TabPanel,
  TabPanels,
} from "@headlessui/react";
import classNames from "classnames";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsCaretDown, BsCheck } from "react-icons/bs";
import { IoCloseCircleSharp, IoInformationCircleSharp } from "react-icons/io5";
import { TfiReload } from "react-icons/tfi";
import BankBook from "./bank-book";
import Button from "../ui/button/Button";
import { toast } from "react-toastify";

import pendingLogo from "@/assets/pending.webp";
import processingLogo from "@/assets/processing.webp";
import { format } from "date-fns";

async function getCurrencyRate(currency_from: string, currency_to: string) {
  return fetch(import.meta.env.VITE_API_URL + "/configuration/currency-rate/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Token ${Cookies.get("userToken")}`,
    },
    body: JSON.stringify({
      currency_from: currency_from,
      currency_to: currency_to,
    }),
  });
}

type WithdrawalFormProps = {
  gateways: Gateways;
  selectedPromotion?: string;
  parentCallback: () => void;
};

export default function WithdrawalForm({
  gateways,
  parentCallback,
}: WithdrawalFormProps) {
  const { userWalletData, setUserWalletData, userInfo } = useCurrentUser();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const [selectedMethod, setSelectedMethod] = useState<number | undefined>(
    gateways[0].gateway_name.supported_method[0].id
  );
  const [selectedGateway, setSelectedGateway] = useState<Gateway | undefined>(
    () => {
      return gateways.filter((gateway) => {
        return gateway.gateway_name.supported_method.some(
          (method) => method.id === selectedMethod
        );
      })?.[0];
    }
  );
  const [selectedBank, setSelectedBank] = useState<BankEntry>();
  const [pendingWithdrawal, setPendingWithdrawal] = useState<UserWithdrawal>();
  const [withdrawAmount, setWithdrawAmount] = useState<string>("0");
  const [currencyRate, setCurrencyRate] = useState<number>(1);
  const [isFocused, setIsFocused] = useState(false);

  const selectedMethods = gateways.map((gateway) => {
    return gateway.gateway_name.supported_method[0];
  });
  const filteredGateways = gateways.filter((gateway) => {
    return gateway.gateway_name.supported_method.some(
      (method) => method.id === selectedMethod
    );
  });

  useEffect(() => {
    async function getWithdrawalData() {
      return fetch(import.meta.env.VITE_API_URL + "/wallet/withdrawal/", {
        headers: {
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
      });
    }
    getWithdrawalData()
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "failed") {
          toast.error(data.errors);
        }
        if (data.status === "ok") {
          const pendingWithdrawal = data.data.find(
            (withdrawal: UserWithdrawal) =>
              withdrawal.status === "pending" ||
              withdrawal.status === "in review"
          );
          if (pendingWithdrawal) {
            setPendingWithdrawal(pendingWithdrawal);
            setSelectedIndex(2);
          } else {
            setIsActivated(true);
          }
        }
      });
  }, []);

  useEffect(() => {
    if (selectedMethod)
      setSelectedGateway(
        gateways.filter((gateway) => {
          return gateway.gateway_name.supported_method.some(
            (method) => method.id === selectedMethod
          );
        })?.[0]
      );
  }, [selectedMethod]);

  useEffect(() => {
    if (selectedGateway) {
      getCurrencyRate(
        selectedGateway?.gateway_name.currency.currency,
        userInfo?.currency || "BDT"
      )
        .then((response) => response.json())
        .then((data) => {
          setCurrencyRate(data.data.currency_rate);
        });
    }
  }, [selectedGateway]);

  const onSelectedBankHandler = (bank?: BankEntry) => {
    setSelectedBank(bank);
  };

  return (
    <TabGroup
      key={selectedIndex}
      defaultIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabPanels>
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
          <div className="m-2.5 bg-white p-2.5 rounded-xs shadow">
            <div className="flex gap-1.25 items-center border-b border-b-[#cccccc]">
              <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
              <span className="font-bold text-[15px] block my-2 text-[#555555]">
                Payment Method
              </span>
            </div>
            <div
              className="grid gap-2.5 py-2.5"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill,calc((100% - 20px) / 3))",
              }}
            >
              {selectedMethods.map((method, i) => (
                <div
                  key={method.id}
                  className={`flex items-center relative ${
                    selectedMethod === method.id
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelectedMethod(method.id);
                      setSelectedGateway(undefined);
                      setWithdrawAmount("0");
                    }}
                    className="relative w-full bg-white border-1 border-blue-1 rounded py-1.25 px-2.5 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group overflow-hidden leading-[35px]"
                  >
                    {/* Icon container */}
                    <div className="rounded-full w-6.25 h-6.25 flex items-center justify-center mb-1.75">
                      <img
                        src={import.meta.env.VITE_API_URL + method.logo}
                        className="w-full h-full object-cover"
                        alt={method.name}
                      />
                    </div>

                    {/* Text */}
                    <span className="text-blue-1 font-medium text-xs max-w-full whitespace-nowrap truncate">
                      {method.name}
                    </span>

                    {/* Triangle with check mark in bottom right corner */}
                    {selectedMethod === method.id && (
                      <div
                        className="absolute bottom-0 right-0 w-5 h-4 bg-blue-1 rounded-br-xs"
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
          <div className="m-2.5 bg-white p-2.5 rounded-xs shadow">
            <div className="flex gap-1.25 items-center border-b border-b-[#cccccc]">
              <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
              <span className="font-bold text-[15px] block my-2 text-[#555555]">
                Select Gateway
              </span>
            </div>
            <div
              className="grid gap-2.5 py-2.5"
              style={{
                gridTemplateColumns:
                  "repeat(auto-fill,calc((100% - 20px) / 3))",
              }}
            >
              {filteredGateways.map((gateway, i) => (
                <div
                  key={gateway.id}
                  className={`flex items-center relative ${
                    selectedMethod === gateway.id
                      ? "border-blue-500"
                      : "border-gray-300"
                  }`}
                >
                  <button
                    onClick={() => {
                      setSelectedGateway(gateway);
                    }}
                    className="relative w-full bg-white border-1 border-blue-1 rounded py-1.25 px-2.5 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group overflow-hidden leading-[35px]"
                  >
                    {/* Text */}
                    <span className="text-blue-1 font-medium text-xs max-w-full whitespace-nowrap truncate">
                      {gateway.gateway_name.gateway_title}
                    </span>

                    {/* Triangle with check mark in bottom right corner */}
                    {selectedGateway?.id === gateway.id && (
                      <div
                        className="absolute bottom-0 right-0 w-5 h-4 bg-blue-1 rounded-br-xs"
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
          {selectedGateway && (
            <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
              <div className="flex gap-1.25 items-center border-b border-b-[#cccccc]">
                <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                <span className="font-bold text-[15px] block my-2 flex-1 text-[#555555]">
                  Amount
                </span>
                <span className="font-bold text-[15px] block my-2 self-end text-blue-1">
                  {userInfo?.currency}{" "}
                  {Number(selectedGateway.min_w_limit) * currencyRate} -{" "}
                  {userInfo?.currency}{" "}
                  {Number(selectedGateway.max_w_limit) * currencyRate}
                </span>
              </div>

              <div className="relative mb-2.5">
                <input
                  type="text"
                  className={classNames(
                    "block w-full pl-2.5 pr-2.5 py-3 bg-gray-1 border-gray-300 text-sm text-right transition-[padding] appearance-none rounded-xs",
                    { "pr-10 ": isFocused, "text-blue-1": withdrawAmount }
                  )}
                  placeholder="0.00"
                  value={withdrawAmount}
                  onChange={(e) => setWithdrawAmount(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  onKeyDown={(e) => {
                    return isNaN(Number(e.key)) && e.key !== "Backspace"
                      ? e.preventDefault()
                      : null;
                  }}
                />
                <button
                  className={classNames(
                    "absolute inset-y-0 right-0 w-10 flex justify-center items-center opacity-0 cursor-pointer",
                    { "opacity-100": isFocused }
                  )}
                  onClick={() => setWithdrawAmount("")}
                >
                  <IoCloseCircleSharp className="size-4 text-blue-1" />
                </button>
              </div>

              {selectedGateway.gateway_name.withdraw_des && (
                <div className="p-2.5 bg-[#EAEFF8] rounded-xs flex gap-2">
                  <div>
                    <IoInformationCircleSharp className="size-5 text-[#2d58bb]" />
                  </div>
                  <div
                    className="text-[#2d58bb]"
                    dangerouslySetInnerHTML={{
                      __html: selectedGateway.gateway_name.withdraw_des,
                    }}
                  ></div>
                </div>
              )}
            </div>
          )}
          <BankBook
            onSelectedBankHandler={onSelectedBankHandler}
            gatewayTitle={selectedGateway?.gateway_name.gateway_title}
          />
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              const respose = await fetch(
                import.meta.env.VITE_API_URL + "/wallet/withdrawal/",
                {
                  method: "POST",
                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${Cookies.get("userToken")}`,
                  },
                  body: JSON.stringify({
                    amount: withdrawAmount,
                    payment_gateway_id: selectedGateway?.id,
                    to_account: selectedBank?.account_number,
                    withdrawal_type:
                      selectedGateway?.gateway_name.withdrawal_type,
                  }),
                }
              );

              const responseData = await respose.json();

              if (responseData.status === "ok") {
                setPendingWithdrawal(responseData.data);
                setSelectedIndex((selectedIndex) => selectedIndex + 1);
                toast.success(responseData.message);
              }

              if (responseData.status === "failed") {
                if (typeof responseData.errors === "string") {
                  toast.error(responseData.errors);
                } else {
                  toast.error("Something went wrong!");
                }
              }
            }}
            className="relative"
          >
            <div className="m-2.5">
              <Button
                className="bg-blue-600 text-white py-3 rounded"
                size="lg"
                isBlock
              >
                Submit
              </Button>
            </div>
          </form>
        </TabPanel>
        <TabPanel>
          <div className="p-2 relative h-full">
            <img
              src={pendingLogo}
              alt="pending"
              className="w-25 aspect-square mx-auto"
            />

            <div className="text-center my-1.25 mb-3.75">
              <p className="text-xl">Processing Transaction</p>
              <p>Pending withdrawal in progress.</p>
              <p>You may submit a new request after approval.</p>
            </div>

            <div className="bg-foreground-400 text-foreground-100 p-3 rounded space-y-2">
              <p className="font-bold">Withdrawal</p>
              <p className="text-xs">{pendingWithdrawal?.id}</p>
              <div className="flex justify-between items-center">
                <p>{pendingWithdrawal?.gateway_title}</p>
                <Button
                  size="sm"
                  onClick={() =>
                    setSelectedIndex((selectedIndex) => selectedIndex + 1)
                  }
                >
                  Details
                </Button>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-t-foreground-300">
                <p>
                  {format(new Date(pendingWithdrawal?.created_at ?? 0), "Pppp")}
                </p>
                <p>{pendingWithdrawal?.amount}</p>
              </div>
            </div>

            <Button
              className="w-full absolute p-6 bottom-0 left-0 right-0"
              onClick={parentCallback}
            >
              Close
            </Button>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="p-2 space-y-2 relative h-full">
            <div className="mx-auto w-max">
              <div className="flex flex-col justify-center items-center">
                <>
                  {pendingWithdrawal?.status === "pending" && (
                    <img
                      src={pendingLogo}
                      alt="pending"
                      className="w-25 aspect-square"
                    />
                  )}
                  {pendingWithdrawal?.status === "in review" && (
                    <img
                      src={processingLogo}
                      alt="processing"
                      className="w-25 aspect-square"
                    />
                  )}
                </>
                <div>
                  <p className="text-foreground-100 text-[28px] my-1.25 font-bold">
                    {pendingWithdrawal?.payment_unit}{" "}
                    {Number(pendingWithdrawal?.amount).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-3.75">
                  {/* <Alert
                    variant={
                      pendingWithdrawal?.status as "pending" | "in review"
                    }
                    className="py-1 px-3 w-max rounded-full text-xs"
                  >
                    <AlertTitle className="uppercase">
                      {pendingWithdrawal?.status}
                    </AlertTitle>
                  </Alert> */}
                  {pendingWithdrawal?.status === "pending" && (
                    <Button
                      className="text-primary-button underline"
                      onClick={async () => {
                        const response = await fetch(
                          import.meta.env.VITE_API_URL +
                            "/wallet/withdrawal/cancel/" +
                            pendingWithdrawal?.id +
                            "/",
                          {
                            method: "PUT",
                            headers: {
                              "Content-Type": "application/json",
                              Authorization: `Token ${Cookies.get(
                                "userToken"
                              )}`,
                            },
                          }
                        );

                        const responseData = await response.json();

                        if (responseData.status === "ok") {
                          toast.success("Withdrawal cancelled.");
                          setPendingWithdrawal(undefined);
                          setIsActivated(true);
                          setSelectedIndex(0);
                        }

                        if (responseData.status === "failed") {
                          toast.error(responseData.errors);
                        }
                      }}
                    >
                      Refund Balance
                    </Button>
                  )}
                </div>
              </div>
            </div>

            <div className="bg-foreground-400 p-3 mb-5 grid grid-cols-3 gap-y-3 items-center [&>*]:py-1.5 rounded">
              <div>TrxID</div>
              <div className="col-span-2 text-right">
                {pendingWithdrawal?.transaction_id}
              </div>
              <div>Type</div>
              <div className="col-span-2 text-right">
                {pendingWithdrawal?.payment_gateway}
              </div>
              <div>Wallet/Account</div>
              <div className="col-span-2 text-right">
                {pendingWithdrawal?.to_account}
              </div>
              <div>Date</div>
              <div className="col-span-2 text-right">
                {format(pendingWithdrawal?.created_at ?? 0, "Pppp")}
              </div>
            </div>

            <Button
              className="w-full absolute p-6 bottom-0 left-0 right-0"
              onClick={parentCallback}
            >
              Close
            </Button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
  );
}

{
  /* //   <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
//     <div className="flex gap-1.25 items-center border-b border-b-[#cccccc]">
//       <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
//       <span className="font-bold text-[15px] block my-2 text-[#555555]">
//         Please select phone number
//       </span>
//     </div>
//     <div className="py-2.5 grid grid-cols-1 gap-2.5">
//       <button
//         className="w-full bg-blue-1 text-white flex gap-2 items-center px-2.5 py-2.75 mb-4 rounded"
//         style={{
//           backgroundImage:
//             "url(https://img.c88rx.com/cx/h5/assets/images/player/bg-bankcard.png?v=1749020378117)",
//           backgroundSize: "cover",
//           backgroundPosition: "center",
//           backgroundRepeat: "no-repeat",
//         }}
//       >
//         <FaCheckCircle className="size-6.25 text-[#28b849]" />
//         <span className="text-xl inline-block">
//           +880 1866300200
//         </span>
//       </button>
//     </div>
//   </div> */
}
