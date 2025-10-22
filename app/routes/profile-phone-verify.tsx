import "react-phone-number-input/style.css";
import PhoneInput, {
  isPossiblePhoneNumber,
  type Value,
} from "react-phone-number-input";
import Modal from "@/components/ui/modal/Modal";
import classNames from "classnames";
import { useState } from "react";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import Button from "@/components/ui/button/Button";
import { Field, Fieldset, Label } from "@headlessui/react";
import { useNavigate } from "react-router";

export default function ProfilePhoneVerify() {
  const { userInfo, setUserInfo } = useCurrentUser();
  const navigate = useNavigate();
  const [phoneValue, setPhoneValue] = useState<Value | undefined>();
  const [isPhoneVerificationOpen, setIsPhoneVerificationOpen] = useState(false);
  const [value, setValue] = useState("");

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        navigate(-1);
      }}
      title="Verify Phone Number"
      isFullScreen
    >
      <div className="p-5 bg-white h-full">
        <form
          onSubmit={async (e) => {
            e.preventDefault();
            e.stopPropagation();

            const elements = new FormData(e.currentTarget);

            if (!isPhoneVerificationOpen) {
              if (phoneValue) {
                const response = await fetch(
                  import.meta.env.VITE_API_URL + "/auth/user/update/",
                  {
                    method: "PUT",

                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Token ${Cookies.get("userToken")}`,
                    },
                    body: JSON.stringify({
                      contact: phoneValue,
                    }),
                  }
                );
                const responseData = await response.json();
                if (responseData.status === "ok") {
                  setIsPhoneVerificationOpen(true);
                } else {
                  toast.error(responseData.errors);
                }
              } else {
                return;
              }
            } else {
              const response = await fetch(
                import.meta.env.VITE_API_URL + "/auth/user/update/",
                {
                  method: "PUT",

                  headers: {
                    "Content-Type": "application/json",
                    Authorization: `Token ${Cookies.get("userToken")}`,
                  },
                  body: JSON.stringify({
                    otp: elements.get("phone_verification_code"),
                    contact: phoneValue,
                  }),
                }
              );

              const responseData = await response.json();
              if (responseData.status === "ok") {
                setUserInfo(responseData.data);
                toast.success(responseData.message);
              } else {
                toast.error(responseData.errors);
              }
            }
          }}
        >
          {isPhoneVerificationOpen ? (
            <OTPInput
              pattern={REGEXP_ONLY_DIGITS}
              value={value}
              onChange={setValue}
              maxLength={6}
              containerClassName="group flex items-center has-[:disabled]:opacity-30"
              render={({ slots }) => (
                <>
                  <div className="w-full flex gap-2">
                    {slots.map((slot, idx) => (
                      <Slot key={idx} {...slot} hasFakeCaret={true} />
                    ))}
                  </div>
                </>
              )}
            />
          ) : (
            <Fieldset className="p-0!">
              <Field className="space-y-2.5">
                <Label className="block text-[#474747] text-sm">
                  Phone Number
                </Label>
                <PhoneInput
                  defaultCountry={userInfo?.country_id?.country_code}
                  className={classNames(
                    "h-[12vw] sm:h-[45px] border border-gray-1 bg-gray-1 text-foreground-200 rounded p-2 text-xs [&>input]:outline-none",
                    {
                      "border-red-900":
                        phoneValue && !isPossiblePhoneNumber(phoneValue),
                    }
                  )}
                  value={phoneValue}
                  onChange={setPhoneValue}
                  international
                  placeholder="Enter phone number"
                />
                {phoneValue && !isPossiblePhoneNumber(phoneValue) && (
                  <p className="text-foreground-100 text-xs">
                    Please enter a valid phone number.
                  </p>
                )}
              </Field>
            </Fieldset>
          )}
          <Button color="green" type="submit" className="w-full">
            Submit
          </Button>
        </form>
      </div>
    </Modal>
  );
}

function Slot(props: SlotProps) {
  return (
    <div
      className={classNames(
        "relative w-10 h-14 text-[2rem]",
        "flex flex-1 items-center justify-center",
        "border border-[#E0E0E0] rounded",
        "bg-[#EEEEEE]",
        "transition-all duration-300",
        "group-hover:border-accent-foreground/20 group-focus-within:border-accent-foreground/20"
      )}
    >
      {props.char !== null && <div>{props.char}</div>}
      {props.isActive && props.hasFakeCaret && <FakeCaret />}
    </div>
  );
}

function FakeCaret() {
  return (
    <div className="absolute pointer-events-none inset-0 flex items-center justify-center caret-blink">
      <div className="w-px h-8 bg-black" />
    </div>
  );
}
