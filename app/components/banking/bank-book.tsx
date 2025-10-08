import { useCurrentUser } from "@/contexts/CurrentUserContext";
import type { BankBook, BankEntry } from "@/routes/deposit";
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Field,
  Label,
  Radio,
  RadioGroup,
} from "@headlessui/react";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";
import { BsCaretDown, BsCheck } from "react-icons/bs";
import { LuLoader } from "react-icons/lu";
import { toast } from "react-toastify";
import Button from "../ui/button/Button";

type BankBookProps = {
  onSelectedBankHandler: (bank?: BankEntry) => void;
  gatewayTitle?: string;
};

export default function BankBook({
  onSelectedBankHandler,
  gatewayTitle,
}: BankBookProps) {
  const { userInfo } = useCurrentUser();
  const [bankData, setBankData] = useState<BankBook>();
  const [loading, setLoading] = useState(true);
  const [addBankDataAccordion, setAddBankDataAccordion] = useState("");

  const [selected, setSelected] = useState(bankData?.[0]);

  useEffect(() => {
    async function getBankData() {
      return fetch(import.meta.env.VITE_API_URL + "/user/bank-book", {
        headers: {
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
      });
    }

    getBankData()
      .then((response) => response.json())
      .then((data) => {
        setBankData(data.data);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-8">
        <LuLoader className="size-4 animate-spin" />
      </div>
    );
  }

  return (
    <div className="m-2.5 bg-white px-3.75 py-2.5 rounded shadow">
      <div className="flex gap-1.25 items-center border-b">
        <div className="w-1 h-3.75 bg-[#005dac] rounded"></div>
        <span className="font-bold text-[15px] block my-2 text-gray-9">
          Please select address
        </span>
      </div>
      <div className="py-2">
        <RadioGroup
          by="account_number"
          value={selected}
          onChange={(bank) => {
            console.log(bank);
            onSelectedBankHandler(bank);
          }}
          className="space-y-2"
        >
          {bankData?.map((bank) => (
            <Field key={bank.id.toString()}>
              <div
                style={{
                  backgroundImage: `url(/shared_images/bg-card.png)`,
                  backgroundSize: "cover",
                  backgroundPosition: "100% 100%",
                }}
                className="flex items-center justify-between p-4 rounded-2xl text-foreground bg-blue-1/10 border border-blue-1/10 has-data-[headlessui-state=checked]:border-blue-1"
              >
                <Label
                  htmlFor={"bank-" + bank.id.toString()}
                  className="flex-1"
                >
                  <div className="space-y-1">
                    <p>{bank.bank_name}</p>
                    <p className="mt-6 text-xs">
                      {userInfo?.first_name} {userInfo?.last_name}
                    </p>
                    <p>{bank.account_number}</p>
                  </div>
                </Label>

                <Radio value={bank} id={"bank-" + bank.id.toString()}>
                  {({ checked }) => {
                    return (
                      <div
                        className={`w-5 h-5 rounded-full border border-gray-300 flex items-center justify-center ${
                          checked ? "bg-blue-1" : "bg-white"
                        }`}
                      >
                        {checked && (
                          <BsCheck className="size-3 text-white stroke-1" />
                        )}
                      </div>
                    );
                  }}
                </Radio>
              </div>
            </Field>
          ))}
        </RadioGroup>
      </div>

      <span className="block pt-3.75 pb-5 text-center text-sm text-gray-9">
        -- support no more than 3 addresses --
      </span>
      {bankData && bankData.length < 3 && (
        <Disclosure as="div" className="rounded overflow-hidden">
          <DisclosureButton className="w-full h-11 flex items-center gap-1.5 pl-2.5 pr-2.5 bg-[#6a84cb]">
            <AddCardIcon />
            <span className="flex-1 text-left text-sm text-white">
              Add Address
            </span>
            <BsCaretDown className="text-white" />
          </DisclosureButton>
          <DisclosurePanel className="text-gray-500  border border-[#6a84cb] rounded-b">
            <form
              onSubmit={async (e) => {
                e.preventDefault();
                e.stopPropagation();

                const formdata = new FormData(e.currentTarget);

                const response = await fetch(
                  import.meta.env.VITE_API_URL + "/user/bank-book/",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Token ${Cookies.get("userToken")}`,
                    },
                    body: JSON.stringify({
                      bank_name: gatewayTitle,
                      account_name: userInfo?.username,
                      account_number: formdata.get("account_number"),
                    }),
                  }
                );

                const responseData = await response.json();

                if (responseData.status === "ok") {
                  setBankData(bankData.concat(responseData.data));
                  setAddBankDataAccordion("");
                  toast.success(responseData.message);
                }

                if (responseData.status === "failed") {
                  setAddBankDataAccordion("");
                  toast.error(responseData.errors);
                }
              }}
              className="space-y-1"
            >
              <div className="m-2.5 px-2.5 py-3.75 group">
                <label className="text-xs">Wallet Address</label>
                <input
                  className="box-border w-full h-10 border border-gray-300 rounded px-2.5 text-sm"
                  placeholder="Wallet Address"
                  required
                  name="account_number"
                  id="account_number"
                />
              </div>

              <Button isBlock className="rounded-none" type="submit">
                Add
              </Button>
            </form>
          </DisclosurePanel>
        </Disclosure>
      )}
    </div>
  );
}

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
