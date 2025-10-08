import type { Gateway, Gateways, UserDeposit } from "@/routes/deposit";
import {
  Field,
  Input,
  Label,
  Select,
  TabGroup,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { useEffect, useState } from "react";
import { BsCheck, BsFileSlides, BsUpload } from "react-icons/bs";
import { IoCloseCircleSharp, IoInformationCircleSharp } from "react-icons/io5";
import {
  LuLoader,
  LuPencilLine,
  LuThumbsUp,
  LuTriangleAlert,
} from "react-icons/lu";
import Button from "../ui/button/Button";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import Countdown from "../ui/countdown";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useRouteLoaderData } from "react-router";
import type { RootLoaderData } from "@/root";
import { FaCopy } from "react-icons/fa6";
import { format } from "date-fns";

import pendingLogo from "@/assets/pending.webp";
import processingLogo from "@/assets/processing.webp";

type DepositFormProps = {
  gateways: Gateways;
  selectedPromotion?: string;
  parentCallback: () => void;
};

export default function DepositForm({
  gateways,
  selectedPromotion,
  parentCallback,
}: DepositFormProps) {
  const data = useRouteLoaderData<RootLoaderData>("root");
  const { userInfo } = useCurrentUser();
  const [selectedIndex, setSelectedIndex] = useState(0);

  const [promotion, setPromotion] = useState<string | undefined>(
    selectedPromotion || data?.promotionList[0]?.id.toString()
  );
  const selectedMethods = gateways
    .filter((gateway) => {
      return (
        gateway.enable &&
        (gateway.gateway_name.purpose === "deposit" ||
          gateway.gateway_name.purpose === "both") &&
        gateway.gateway_name.gateway_status
      );
    })
    .map((gateway) => {
      return gateway.gateway_name.supported_method[0];
    })
    .filter((method, index, self) => {
      return self.findIndex((m) => m.id === method.id) === index;
    });
  const [selectedMethod, setSelectedMethod] = useState<number | undefined>(
    selectedMethods[0].id
  );
  const [selectedGateway, setSelectedGateway] = useState<Gateway | undefined>(
    () => {
      return gateways?.filter((gateway) => {
        return gateway.gateway_name.supported_method.some(
          (method) => method.id === selectedMethod
        );
      })?.[0];
    }
  );
  const [depositAmount, setDepositAmount] = useState<string>("0");
  const [isFocused, setIsFocused] = useState(false);
  const [isExpired, setExpired] = useState(false);

  const [pendingDeposit, setPendingDeposit] = useState<UserDeposit>();
  const [isActivated, setIsActivated] = useState(false);

  const filteredGateways = gateways?.filter((gateway) => {
    return gateway.gateway_name.supported_method.some(
      (method) => method.id === selectedMethod
    );
  });

  const selectedPromotionData = Number(
    data?.promotionList.find((p) => p.id === Number(promotion))?.gift_amount
  );

  useEffect(() => {
    async function getDepositData() {
      return fetch(import.meta.env.VITE_API_URL + "/wallet/deposit/", {
        headers: {
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
      });
    }
    getDepositData()
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "failed") {
          toast.error(data.errors);
        }
        if (data.status === "ok") {
          const pendingDeposit = data.data.find(
            (deposit: UserDeposit) =>
              deposit.deposit_status === "pending" ||
              deposit.deposit_status === "in review"
          );
          if (pendingDeposit) {
            setPendingDeposit(pendingDeposit);
            setSelectedIndex(3);
          } else {
            setIsActivated(true);
          }
        }
      });
  }, []);

  // Parent component
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data.type === "cancel") {
        toast.error(event.data.data);
      } else if (event.data.type === "success") {
        toast.success(event.data.data);
      }
    };

    window.addEventListener("message", handleMessage);

    return () => {
      window.removeEventListener("message", handleMessage);
    };
  }, []);

  useEffect(() => {
    if (selectedMethod)
      setSelectedGateway(
        gateways?.filter((gateway) => {
          return gateway.gateway_name.supported_method.some(
            (method) => method.id === selectedMethod
          );
        })?.[0]
      );
  }, [selectedMethod]);

  return (
    <TabGroup
      key={selectedIndex}
      defaultIndex={selectedIndex}
      onChange={setSelectedIndex}
    >
      <TabPanels>
        <TabPanel>
          <div className="h-full flex flex-col relative">
            {!isActivated && (
              <div className="absolute mb-0 inset-0 bg-foreground-400/80 flex flex-col gap-2 justify-center items-center backdrop-blur-xs z-10">
                <LuLoader className="size-10 text-foreground-100 animate-spin" />
              </div>
            )}
            <div className="m-2.5">
              <div className="flex items-center justify-between bg-[#e4b621] p-2.5 rounded">
                <div className="flex items-center gap-2 text-white">
                  <PromoIcon />
                  <span className="text-sm">Select Promotion</span>
                </div>
                <Select
                  value={promotion}
                  onChange={(e) => {
                    setPromotion(e.target.value);
                  }}
                  name="status"
                  aria-label="Project status"
                  className="focus:outline-0 text-white text-sm! truncate max-w-[20ch]"
                >
                  {data?.promotionList
                    .filter((promotion) => promotion.deposit_option)
                    .map((promotion) => (
                      <option
                        key={promotion.id}
                        value={promotion.id.toString()}
                      >
                        {promotion.title}
                      </option>
                    ))}
                </Select>
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
                {selectedMethods?.map((method, i) => (
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
                        if (method.id !== selectedMethod) {
                          setSelectedMethod(method.id);
                          setSelectedGateway(undefined);
                          setDepositAmount("0");
                        }
                      }}
                      className="relative w-full bg-white border-1 border-blue-1 rounded py-1.25 px-2.5 flex flex-col items-center justify-center hover:bg-gray-50 transition-colors group overflow-hidden leading-[35px]"
                    >
                      {/* Icon container */}
                      <div className="rounded-full w-6.25 h-6.25 flex items-center justify-center mb-1.75">
                        <img
                          src={"https://ai.cloud7hub.uk" + method.logo}
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

                    {selectedPromotionData > 0 ? (
                      <div className="absolute bg-[#d15454] min-h-5 top-1.25 -right-1 px-0.75 rounded-r-xs">
                        <span className="text-xs text-white tracking-tighter whitespace-nowrap truncate">
                          +{selectedPromotionData}%
                        </span>

                        <div
                          className="absolute bg-[#d15454] w-1 h-2.5 top-0 -left-1"
                          style={{
                            clipPath: "polygon(-1% -1%, 101% -1%, 101% 101%)",
                          }}
                        ></div>

                        <div
                          className="absolute bg-[#d15454] w-1 h-2.5 top-2.5 -left-1"
                          style={{
                            clipPath: "polygon(100% 0, 0 100%, 100% 100%)",
                          }}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div
                className="py-2.5 grid gap-2.5 border-t border-t-[#cccccc] border-dashed"
                style={{
                  gridTemplateColumns:
                    "repeat(auto-fill,calc((100% - 20px) / 2))",
                }}
              >
                {filteredGateways?.map((gateway) => {
                  return (
                    <div
                      key={gateway.id}
                      className={`relative rounded-xs flex items-center`}
                    >
                      {selectedGateway?.id === gateway.id && (
                        <>
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
                          <div
                            className="absolute bottom-0 right-0 w-5 h-4 bg-blue-1 z-2 rounded-br-xs"
                            style={{
                              clipPath: "polygon(100% 0, 100% 100%, 0 100%)",
                            }}
                          >
                            <div className="absolute bottom-0 right-0 flex items-center justify-center">
                              <BsCheck className="size-3 text-white stroke-1" />
                            </div>
                          </div>
                        </>
                      )}
                      <button
                        className="w-full z-1 h-8.75 border border-[#cccccc] rounded-xs bg-white flex items-center justify-center overflow-auto"
                        type="button"
                        onClick={() => setSelectedGateway(gateway)}
                      >
                        <span className="text-xs text-[#555555]">
                          {gateway.gateway_name.gateway_title}
                        </span>
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>

            <Transition
              show={!!selectedGateway}
              enter="transition-transform duration-300"
              enterFrom="-translate-y-full"
              enterTo="translate-y-0"
              leave="transition-transform duration-300"
              leaveFrom="translate-y-0"
              leaveTo="-translate-y-full"
            >
              <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow transition-transform duration-300">
                <div className="flex gap-1.25 items-center border-b border-b-[#cccccc]">
                  <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
                  <span className="font-bold text-[15px] block my-2 flex-1 text-[#555555]">
                    Amount
                  </span>
                  {selectedGateway && (
                    <span className="font-bold text-[15px] block my-2 self-end text-blue-1">
                      {selectedGateway.gateway_name.currency.currency_icon}{" "}
                      {parseInt(selectedGateway.min_d_limit)} {"-"}{" "}
                      {selectedGateway.gateway_name.currency.currency_icon}{" "}
                      {parseInt(selectedGateway.max_d_limit)}
                    </span>
                  )}
                </div>

                <div className="py-2.5 grid grid-cols-4 gap-2.5">
                  {selectedGateway?.gateway_name.amount_suggestion.map(
                    (suggestion) => (
                      <button
                        key={suggestion}
                        className="min-w-1/4 p-2.5 text-xs border border-[#cccccc] text-[#555555] rounded flex items-center justify-center mb-4 bg-white cursor-pointer"
                        onClick={() =>
                          setDepositAmount(
                            (amount) => +amount + +suggestion + ""
                          )
                        }
                      >
                        {depositAmount && "+"}
                        {parseInt(suggestion)}
                      </button>
                    )
                  )}
                </div>

                <div className="relative mb-2.5">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                    <span className="text-blue-1 text-center text-xs">
                      {selectedGateway?.gateway_name.currency.currency_icon}
                    </span>
                  </div>
                  <input
                    type="text"
                    className={classNames(
                      "block w-full pl-2.5 pr-2.5 py-3 bg-gray-1 border-gray-300 text-sm text-right transition-[padding] appearance-none rounded-xs",
                      { "pr-10 ": isFocused, "text-blue-1": depositAmount }
                    )}
                    placeholder="0.00"
                    value={depositAmount}
                    onChange={(e) => setDepositAmount(e.target.value)}
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
                    onClick={() => setDepositAmount("")}
                  >
                    <IoCloseCircleSharp className="size-4 text-blue-1" />
                  </button>
                </div>

                <div className="p-2.5 bg-[#EAEFF8] rounded-xs flex gap-2">
                  <div>
                    <IoInformationCircleSharp className="size-5 text-[#2d58bb]" />
                  </div>
                  {selectedGateway?.gateway_name.deposit_des && (
                    <div
                      className="text-[#2d58bb]"
                      dangerouslySetInnerHTML={{
                        __html: selectedGateway.gateway_name.deposit_des,
                      }}
                    ></div>
                  )}
                </div>
              </div>
            </Transition>

            <div className="m-2.5">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  if (
                    selectedGateway?.gateway_name.deposit_type === "Auto-Pay"
                  ) {
                    const response = await fetch(
                      import.meta.env.VITE_API_URL +
                        "/wallet/deposit/auto-pay/",
                      {
                        method: "POST",
                        headers: {
                          "Content-Type": "application/json",
                          Authorization: `Token ${Cookies.get("userToken")}`,
                        },
                        body: JSON.stringify({
                          amount: depositAmount,
                          payment_gateway_id: selectedGateway?.id,
                          promotion_id: selectedPromotion,
                          email: "",
                        }),
                      }
                    );
                    const responseData = await response.json();

                    if (responseData.status === "ok") {
                      const strWindowFeatures =
                        "location=yes,height=570,width=520,scrollbars=yes,status=yes";

                      window
                        .open(
                          responseData.data.payment_url,
                          "_blank",
                          strWindowFeatures
                        )
                        ?.focus();
                    }

                    if (responseData.status === "failed") {
                      if (typeof responseData.errors === "string") {
                        toast.error(responseData.errors);
                      } else {
                        toast.error("Something went wrong!");
                      }
                    }
                  } else {
                    setSelectedIndex(1);
                  }
                }}
              >
                <Button
                  type="submit"
                  disabled={
                    !selectedMethod ||
                    !selectedGateway ||
                    Number(depositAmount) <
                      Number(selectedGateway.min_d_limit) ||
                    Number(depositAmount) > Number(selectedGateway.max_d_limit)
                  }
                  className="bg-blue-600 text-white py-3 rounded"
                  size="lg"
                  isBlock
                >
                  Submit
                </Button>
              </form>
            </div>
          </div>
        </TabPanel>
        <TabPanel>
          <div className="space-y-5 relative h-full">
            {isExpired && (
              <div className="absolute mb-0 inset-0 bg-foreground-400/80 flex flex-col gap-2 justify-center items-center backdrop-blur-xs z-1">
                <LuTriangleAlert className="size-10 text-red-500" />
                <p className="text-center text-red-500">
                  Sorry, your session has expired.
                </p>
                <Button
                  className="bg-red-500"
                  onClick={() => {
                    setSelectedIndex(0);
                    setExpired(false);
                  }}
                >
                  Go back
                </Button>
              </div>
            )}

            <div className="px-5.5 py-5.5 bg-foreground-400 flex justify-between items-center">
              <div className="w-20 aspect-square">
                <div className="p-4 bg-white rounded-full shadow">
                  <img
                    src={
                      import.meta.env.VITE_API_URL +
                      selectedGateway?.gateway_name.supported_method[0].logo
                    }
                    className="w-full h-full object-cover"
                    alt={selectedGateway?.gateway_name.gateway_title}
                  />
                </div>
              </div>
              <div className="flex-1 text-right">
                <Countdown
                  timer={Date.now() + 1000 * 60 * 10}
                  callbackFn={() => {
                    // setExpired(true);
                  }}
                />
              </div>
            </div>

            <div>
              {selectedGateway?.gateway_image && (
                <img
                  src={
                    import.meta.env.VITE_API_URL +
                    selectedGateway?.gateway_image
                  }
                  alt={selectedGateway?.gateway_name.gateway_title}
                />
              )}
            </div>

            <div className="grid grid-cols-3 items-center gap-y-5 px-2.5 py-4 bg-gray-4">
              <div>Amount:</div>
              <div className="col-span-2 flex justify-end text-right font-semibold">
                <button
                  className="flex gap-1 items-center justify-end cursor-pointer"
                  type="button"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(depositAmount.toString() ?? "")
                      .then(() => {
                        toast.success("Copied to clipboard");
                      });
                  }}
                >
                  <span className="font-semibold text-right">
                    {depositAmount}
                  </span>
                  <FaCopy className="size-3.5 text-primary-button shrink-0" />
                </button>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-[8px] text-foreground-100/30 border border-foreground-100/30 px-1 w-max rounded">
                  {selectedGateway?.gateway_name.supported_method[0].name}
                </span>
                <span>Wallet No:</span>
                <div className="flex gap-1 items-center">
                  <span className="text-[8px] p-0.5">
                    {selectedGateway?.gateway_name.gateway_title}{" "}
                  </span>
                  <button
                    className="cursor-pointer"
                    type="button"
                    onClick={() => setSelectedIndex(0)}
                  >
                    <LuPencilLine className="size-2.5" />
                  </button>
                </div>
              </div>
              <div className="col-span-2 text-right flex flex-col gap-1">
                <button
                  className="self-end flex gap-1 items-center cursor-pointer"
                  type="button"
                  onClick={() => {
                    navigator.clipboard
                      .writeText(selectedGateway?.gateway_account ?? "")
                      .then(() => {
                        toast.success("Copied to clipboard");
                      });
                  }}
                >
                  <span className="font-semibold text-right">
                    {selectedGateway?.gateway_account}
                  </span>
                  <FaCopy className="size-3.5 text-primary-button shrink-0" />
                  {/* <p>(MOHAMMAD IMTYAZ ANSARI)</p> */}
                </button>
              </div>
            </div>

            <form
              className="space-y-5 p-2.5"
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                let formData = new FormData(e.currentTarget);

                formData.append("amount", depositAmount);
                formData.append("payer_account", userInfo?.username ?? "");
                formData.append(
                  "payment_gateway_id",
                  selectedGateway?.id.toString() ?? ""
                );
                formData.append(
                  "deposit_type",
                  selectedGateway?.gateway_name.deposit_type ?? ""
                );
                // formData.append("promotion_id", promotion ?? "");

                const response = await fetch(
                  import.meta.env.VITE_API_URL + "/wallet/deposit/",
                  {
                    method: "POST",
                    headers: {
                      Authorization: `token ${Cookies.get("userToken")}`,
                    },
                    body: formData,
                  }
                );

                const responseDate = await response.json();

                if (responseDate.status === "ok") {
                  setPendingDeposit(responseDate.data);
                  setSelectedIndex(2);
                }

                if (responseDate.status === "failed") {
                  if (typeof responseDate.errors === "string") {
                    toast.error(responseDate.errors);
                  } else {
                    toast.error("Something went wrong!");
                  }
                }
              }}
            >
              <Field>
                <div className="grid w-full items-center gap-2">
                  <Label htmlFor="transaction_id">TrxID / REF.NO. / UTR</Label>
                  <Input
                    id="transaction_id"
                    name="transaction_id"
                    required
                    type="text"
                    placeholder="Enter your TrxID / REF.NO / UTR"
                    className="block w-full pl-2.5 pr-2.5 py-3 bg-gray-1 border border-gray-300 text-sm "
                  />
                </div>
              </Field>

              <Field>
                <div className="grid w-full items-center bg-foreground-400 border border-dashed border-foreground-500 p-2">
                  <label
                    htmlFor="screenshot"
                    className="w-full text-center justify-center text-xs font-light flex flex-col items-center"
                  >
                    <BsUpload className="size-4 text-foreground-100mx-auto" />
                    <span>Upload your reference image (Optional)</span>
                  </label>
                  <input
                    onChange={(e) => {
                      const el = document.getElementById("file-name");
                      if (el)
                        el.textContent =
                          e.currentTarget.files?.[0].name ?? null;
                    }}
                    type="file"
                    id="screenshot"
                    name="screenshot"
                    className="hidden border-none border-foreground-100 bg-foreground-400 rounded placeholder:text-foreground-100/30"
                  />
                  <span
                    id="file-name"
                    className="text-xs text-center text-foreground-100/30"
                  ></span>
                </div>
              </Field>

              <Button className="w-full">Submit</Button>
            </form>
          </div>
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
              <p>Pending deposit in progress.</p>
              <p>You may submit a new request after approval.</p>
            </div>

            <div className="bg-foreground-400 text-foreground-100 p-3 rounded space-y-2">
              <p className="font-bold">Deposit</p>
              <p className="text-xs">{pendingDeposit?.id}</p>
              <div className="flex justify-between items-center">
                <p>{pendingDeposit?.gateway_title}</p>
                <Button size="sm" onClick={() => setSelectedIndex(3)}>
                  Details
                </Button>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-t-foreground-300">
                <p>
                  {format(new Date(pendingDeposit?.created_at ?? 0), "Pppp")}
                </p>
                <p>{pendingDeposit?.amount}</p>
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
                  {pendingDeposit?.deposit_status === "pending" && (
                    <img
                      src={pendingLogo}
                      alt="pending"
                      className="w-25 aspect-square"
                    />
                  )}
                  {pendingDeposit?.deposit_status === "in review" && (
                    <img
                      src={processingLogo}
                      alt="processing"
                      className="w-25 aspect-square"
                    />
                  )}
                </>
                <div>
                  <p className="text-foreground-100 text-[28px] my-1.25 font-bold">
                    {pendingDeposit?.payment_unit}{" "}
                    {Number(pendingDeposit?.amount).toFixed(2)}
                  </p>
                </div>
                <div className="flex items-center justify-between mb-3.75">
                  {/* <Alert
                  variant={
                    pendingDeposit?.deposit_status as "pending" | "in review"
                  }
                  className="py-1 px-3 w-max rounded-full text-xs"
                >
                  <AlertTitle className="uppercase">
                    {pendingDeposit?.deposit_status}
                  </AlertTitle>
                </Alert> */}
                  <div className="bg-gray-3 px-2 py-1 text-background rounded-full text-xs">
                    {pendingDeposit?.deposit_status}
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gray-4 p-3 mb-5 grid grid-cols-3 gap-y-3 items-center [&>*]:py-1.5 rounded">
              <div>TrxID</div>
              <div className="col-span-2 text-right">
                {pendingDeposit?.transaction_id}
              </div>
              <div>Type</div>
              <div className="col-span-2 text-right">
                {pendingDeposit?.payment_gateway}
              </div>
              <div>Date</div>
              <div className="col-span-2 text-right">
                {format(pendingDeposit?.created_at ?? 0, "Pppp")}
              </div>
            </div>

            <Button className="w-full" onClick={parentCallback}>
              Close
            </Button>
          </div>
        </TabPanel>
      </TabPanels>
    </TabGroup>
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
