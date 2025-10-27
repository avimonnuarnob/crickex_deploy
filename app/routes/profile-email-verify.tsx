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
import { Field, Fieldset, Input, Label } from "@headlessui/react";
import { useNavigate } from "react-router";

export default function ProfileEmailVerify() {
  const { userInfo, setUserInfo } = useCurrentUser();
  const navigate = useNavigate();
  const [emailValue, setEmailValue] = useState<string | undefined>();
  const [isEmailVerificationOpen, setIsEmailVerificationOpen] = useState(false);
  const [value, setValue] = useState("");

  const verifyEmail = async (value: string) => {
    const response = await fetch(
      import.meta.env.VITE_API_URL + "/auth/user/update/",
      {
        method: "PUT",

        headers: {
          "Content-Type": "application/json",
          Authorization: `Token ${Cookies.get("userToken")}`,
        },
        body: JSON.stringify({
          otp: value,
          email: emailValue,
        }),
      }
    );

    const responseData = await response.json();
    if (responseData.status === "ok") {
      setUserInfo(responseData.data);
      navigate(-1);
      toast.success(responseData.message);
    } else {
      toast.error(responseData.errors);
    }
  };

  return (
    <Modal
      isOpen={true}
      onClose={() => {
        navigate(-1);
      }}
      onBack={() => {
        navigate(-1);
      }}
      title="Add E-mail"
      isFullScreen
    >
      <div className="bg-white h-full">
        <div className="h-px"></div>
        <div className="">
          <form
            onSubmit={async (e) => {
              e.preventDefault();
              e.stopPropagation();

              if (!isEmailVerificationOpen) {
                const response = await fetch(
                  import.meta.env.VITE_API_URL + "/auth/user/update/",
                  {
                    method: "PUT",

                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Token ${Cookies.get("userToken")}`,
                    },
                    body: JSON.stringify({
                      email: emailValue,
                    }),
                  }
                );
                const responseData = await response.json();
                if (responseData.status === "ok") {
                  setIsEmailVerificationOpen(true);
                } else {
                  toast.error(responseData.errors);
                }
              }
            }}
          >
            {isEmailVerificationOpen ? (
              <div className="space-y-2.5 text-center p-[2.6666666667vw] m-[2.6666666667vw] sm:p-2.5 sm:m-2.5">
                <div>
                  <p className="text-[3.7333333333vw] sm:text-sm">
                    Please enter the verification code sent to
                  </p>
                  <p className="text-[3.7333333333vw] sm:text-sm font-bold">
                    {emailValue}
                  </p>
                </div>
                <OTPInput
                  className="w-full!"
                  pattern={REGEXP_ONLY_DIGITS}
                  value={value}
                  onChange={(value) => {
                    setValue(value);
                    if (value.length === 6) {
                      setValue(value);
                      verifyEmail(value);
                    }
                  }}
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
              </div>
            ) : (
              <Fieldset className="p-[2.6666666667vw]! m-[2.6666666667vw]! sm:p-2.5! sm:m-2.5!">
                <Field className="space-y-[2.6666666667vw] sm:space-y-2.5">
                  <Label className="flex text-[#474747] text-[3.7333333333vw] sm:text-sm h-[6.4vw] sm:h-6 leading-[6.4vw] sm:leading-6">
                    E-mail
                  </Label>
                  <Input
                    required
                    type="email"
                    name="email"
                    value={emailValue}
                    onChange={(e) => setEmailValue(e.target.value)}
                    placeholder="Enter your E-mail"
                    className="w-full h-[12vw] sm:h-11.25 p-[0_4.2666666667vw] sm:px-4 border border-gray-1 bg-gray-1 text-foreground-200 rounded text-[3.2vw]! sm:text-xs!"
                  />
                </Field>
              </Fieldset>
            )}
            {!isEmailVerificationOpen && (
              <Button
                color="green"
                type="submit"
                className="w-[calc(100%-10.6666666667vw)] sm:w-[calc(100%-40px)] m-[2.6666666667vw_auto]! sm:m-[10px_auto]! block text-[4vw]! sm:text-[15px]! h-[12vw] sm:h-11.25 leading-[12vw] sm:leading-11.25"
                disabled={!emailValue}
              >
                Send verfication code
              </Button>
            )}
            {!isEmailVerificationOpen && (
              <p className="text-[#999] text-[3.7333333333vw] p-[2.6666666667vw_5.3333333333vw] sm:py-2.5 sm:px-5 sm:text-sm">
                For your privacy, the information cannot be modified after
                confirmation.If you need help, please contact{" "}
                <span className="text-blue-1">Customer Service</span>.
              </p>
            )}
          </form>
        </div>
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
