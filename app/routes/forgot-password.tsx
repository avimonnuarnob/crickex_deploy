import "react-phone-number-input/style.css";

import Modal from "@/components/ui/modal/Modal";
import { useNavigate, useParams } from "react-router";
import {
  Field,
  Label,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels,
  Transition,
} from "@headlessui/react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { FormTextField } from "@/components/ui/form-inputs";
import Button from "@/components/ui/button/Button";
import PhoneInput, {
  getCountryCallingCode,
  type Value,
} from "react-phone-number-input";
import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import { GiConfirmed } from "react-icons/gi";
import { FaRegCircleXmark } from "react-icons/fa6";
import emailIcon from "@/assets/icon/icon-email.svg";
import smsIcon from "@/assets/icon/icon-phone.svg";

const categories = [
  {
    name: "SMS",
  },
  {
    name: "Email",
  },
];

const DoItByEmail = ({
  setIsSuccessfullRegistration,
}: {
  setIsSuccessfullRegistration: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}) => {
  const [step, setStep] = useState(0);

  const [email, setEmail] = useState<string | undefined>();
  const [otp, setOtp] = useState<string | undefined>();
  const [password, setPassword] = useState<string | undefined>();

  return (
    <>
      <div
        className="w-[200px] h-[35px] mx-auto my-7 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage:
            'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
        }}
      ></div>
      <div className="p-2.5 flex-1 m-2.5">
        {step === 0 && <EmailFormInput setStep={setStep} setEmail={setEmail} />}
        {step === 1 && <OtpFormInput setStep={setStep} setOtp={setOtp} />}
        {step === 2 && (
          <ConfirmPasswordFromInput
            setIsSuccessfullRegistration={setIsSuccessfullRegistration}
            email={email}
            otp={otp}
          />
        )}
      </div>
    </>
  );
};

const DoItBySMS = ({
  setIsSuccessfullRegistration,
}: {
  setIsSuccessfullRegistration: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}) => {
  const [step, setStep] = useState(0);

  const [phone, setPhone] = useState<Value | undefined>();
  const [otp, setOtp] = useState<string | undefined>();

  return (
    <>
      <div
        className="w-[200px] h-[35px] mx-auto my-7 bg-contain bg-no-repeat bg-center"
        style={{
          backgroundImage:
            'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
        }}
      ></div>
      <div className="p-2.5 flex-1 m-2.5">
        {step === 0 && <PhoneFormInput setStep={setStep} setPhone={setPhone} />}
        {step === 1 && <OtpFormInput setStep={setStep} setOtp={setOtp} />}
        {step === 2 && (
          <ConfirmPasswordFromInput
            setIsSuccessfullRegistration={setIsSuccessfullRegistration}
            email={""}
            otp={otp}
          />
        )}
      </div>
    </>
  );
};

const EmailFormInput = ({
  setStep,
  setEmail,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setEmail: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const [responseMessage, setResponseMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<{
    email: string;
  }>({
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: { email: string }) => {
    setIsLoading(true);
    const respose = await fetch(
      import.meta.env.VITE_API_URL + "/auth/forgot-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: data.email,
        }),
      }
    );
    const responseData = (await respose.json()) as {
      status: "failed" | "ok";
      errors?: string;
      message?: string;
    };
    setIsLoading(false);
    if (responseData.status === "failed" && responseData.errors) {
      setResponseMessage(responseData.errors);
    }
    if (responseData.status === "ok") {
      setStep((step) => step + 1);
      setEmail(data.email);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="h-full flex flex-col"
      >
        <div className="mb-1">
          <FormTextField
            control={control}
            label="Email"
            id="email"
            name="email"
            placeholder="Enter your email"
            required
            className="bg-gray-1! border-gray-4!"
          />
        </div>
        <div className="flex-1 flex flex-col">
          {responseMessage && (
            <p className="text-center bg-red-500 my-4 py-4 text-white shadow rounded animate-bounce">
              {responseMessage}
            </p>
          )}
          <div className="h-[12vw] sm:h-[45px] my-[6.4vw] sm:my-6">
            <Button
              type="submit"
              size="lg"
              isBlock
              isDisabled={!isDirty}
              isLoading={isLoading}
            >
              Send verification code
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

const PhoneFormInput = ({
  setStep,
  setPhone,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setPhone: React.Dispatch<React.SetStateAction<Value | undefined>>;
}) => {
  const [responseMessage, setResponseMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<{
    phone: Value;
  }>({
    defaultValues: {
      phone: "+" + getCountryCallingCode("BD"),
    },
  });

  const onSubmit = async (data: { phone: Value }) => {
    setIsLoading(true);
    const respose = await fetch(
      import.meta.env.VITE_API_URL + "/auth/forgot-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contact: data.phone,
        }),
      }
    );
    const responseData = (await respose.json()) as {
      status: "failed" | "ok";
      errors?: string;
      message?: string;
    };
    setIsLoading(false);
    if (responseData.status === "failed" && responseData.errors) {
      setResponseMessage(responseData.errors);
    }
    if (responseData.status === "ok") {
      setStep((step) => step + 1);
      setPhone(data.phone);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="h-full flex flex-col"
      >
        <Field>
          <Label className="mb-3 block text-[#474747] text-sm">
            Phone number
          </Label>
          <Controller
            name="phone"
            control={control}
            rules={{ required: "Phone number is required" }}
            render={({ field }) => (
              <PhoneInput
                countrySelectProps={{
                  disabled: true,
                }}
                countries={["BD"]}
                defaultCountry="BD"
                {...field}
                placeholder="Enter phone number"
                international
                value={field.value}
                onChange={field.onChange}
                className="flex h-[12vw] sm:h-[45px] border border-gray-4 bg-gray-1 text-foreground-200 rounded p-2 text-xs [&>input]:outline-none mt-[2.6666666667vw] sm:mt-2.5"
                style={{
                  "--PhoneInputCountrySelectArrow-opacity": "0",
                }}
              />
            )}
          />
        </Field>
        <div className="flex-1 flex flex-col">
          {responseMessage && (
            <p className="text-center bg-red-500 my-4 py-4 text-white shadow rounded animate-bounce">
              {responseMessage}
            </p>
          )}
          <div className="h-[12vw] sm:h-[45px] my-[6.4vw] sm:my-6">
            <Button
              type="submit"
              size="lg"
              isBlock
              isDisabled={!isDirty}
              isLoading={isLoading}
            >
              Send verification code
            </Button>
          </div>
        </div>
      </form>
    </>
  );
};

const OtpFormInput = ({
  setStep,
  setOtp,
}: {
  setStep: React.Dispatch<React.SetStateAction<number>>;
  setOtp: React.Dispatch<React.SetStateAction<string | undefined>>;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<{ otp: string }>({
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = (data: { otp: string }) => {
    setOtp(data.otp);
    setStep((step) => step + 1);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="h-full flex flex-col"
      >
        <div className="mb-4 overflow-hidden">
          <Controller
            control={control}
            name="otp"
            render={({ field: { value, onChange } }) => (
              <OTPInput
                pattern={REGEXP_ONLY_DIGITS}
                value={value}
                onChange={onChange}
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
            )}
          />

          <p className="text-sm font-light py-2">Didn’t receive code?</p>
        </div>
        <div className="flex-1 flex items-end">
          <Button type="submit" size="lg" isBlock isDisabled={!isDirty}>
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};

const ConfirmPasswordFromInput = ({
  email,
  otp,
  setIsSuccessfullRegistration,
}: {
  email: string | undefined;
  otp: string | undefined;
  setIsSuccessfullRegistration: React.Dispatch<
    React.SetStateAction<boolean | undefined>
  >;
}) => {
  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<{
    password: string;
    confirm_password: string;
  }>({
    defaultValues: {
      password: "",
      confirm_password: "",
    },
  });
  const navigate = useNavigate();

  const [responseMessage, setResponseMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = async (data: {
    password: string;
    confirm_password: string;
  }) => {
    setIsLoading(true);
    const respose = await fetch(
      import.meta.env.VITE_API_URL + "/auth/set-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          password: data.password,
          email,
          otp,
        }),
      }
    );
    const responseData = (await respose.json()) as {
      status: "failed" | "ok";
      errors?: string;
      message?: string;
    };
    setIsLoading(false);
    if (responseData.status === "failed" && responseData.errors) {
      setResponseMessage(responseData.errors);
    }
    if (responseData.status === "ok" && responseData.message) {
      setIsSuccessfullRegistration(true);
    }
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
        className="h-full flex flex-col"
      >
        <div className="mb-4">
          <FormTextField
            control={control}
            label="Password"
            id="password"
            name="password"
            type="password"
            required
          />
        </div>
        <div className="mb-4">
          <FormTextField
            control={control}
            label="Confirm password"
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
          />
        </div>
        <div className="flex-1 flex flex-col justify-end">
          {responseMessage && (
            <p className="text-center bg-red-500 my-4 py-4 text-white shadow rounded animate-bounce">
              {responseMessage}
            </p>
          )}
          <Button
            type="submit"
            size="lg"
            isBlock
            isDisabled={!isDirty}
            isLoading={isLoading}
          >
            Confirm
          </Button>
        </div>
      </form>
    </>
  );
};

export default function ForgotPassword() {
  const navigate = useNavigate();
  const params = useParams();
  const [isOpen, setIsOpen] = useState(true);
  const [isSuccessfulRegistration, setIsSuccessfullRegistration] = useState<
    boolean | undefined
  >(undefined);
  const [selectedIndex, setSelectedIndex] = useState(0);

  if (isSuccessfulRegistration === true) {
    return (
      <Modal
        onClose={() => {
          navigate(-1);
        }}
        isOpen={isSuccessfulRegistration === true}
        title="Recovery Confirmation"
      >
        <div className="flex flex-col justify-between items-center p-4">
          <div className="h-[527px] flex flex-col items-center gap-4 mt-4">
            <GiConfirmed className="text-[66px] text-green-1 mx-auto" />
            <span>Password recovery was successful</span>
          </div>

          <Button
            size="lg"
            isBlock
            onClick={() =>
              navigate(
                location.pathname.replace(
                  "forgot-password/email",
                  "account-login-quick"
                )
              )
            }
          >
            Continue to login
          </Button>
        </div>
      </Modal>
    );
  }

  if (isSuccessfulRegistration === false) {
    return (
      <Modal
        onClose={() => {
          // setIsSuccessfullRegistration(undefined);
          navigate(-1);
        }}
        isOpen={isSuccessfulRegistration === false}
        title="Recovery Confirmation"
      >
        <div className="flex flex-col justify-between items-center p-4">
          <div className="flex flex-col items-center gap-4 mt-4">
            <FaRegCircleXmark className="text-[66px] text-red-1 mx-auto" />
            <span>Password recovery failed</span>
          </div>
        </div>
      </Modal>
    );
  }
  return (
    <Modal
      isFullScreen={true}
      isOpen={isOpen}
      onClose={async () => {
        setTimeout(() => {
          const a = location.pathname.replace(
            `/account-login-quick/forgot-password/${params.medium}`,
            ""
          );
          navigate(a ? a + location.hash : "/" + location.hash);
        }, 200);
        setIsOpen(false);
      }}
      title="Forgot password?"
    >
      <TabGroup
        className="flex flex-col h-full max-w-full overflow-x-hidden"
        selectedIndex={selectedIndex}
        onChange={setSelectedIndex}
      >
        <TabList
          className={classNames(
            "flex p-[4vw_3.2vw] sm:py-4 sm:px-3 bg-white gap-1"
          )}
        >
          {categories.map((category) => (
            <Tab
              key={category.name}
              className="flex-1 text-sm font-bold focus:not-data-focus:outline-none group"
            >
              <div
                className="py-[4vw] sm:py-4 bg-gray-2 group-data-[selected]:bg-green-1 rounded"
                style={{
                  boxShadow:
                    "inset 0 .2666666667vw .2666666667vw 0 var(--tab-icon-section-btn-shadow-inset, rgba(102, 102, 102, .1))",
                  border:
                    "1px solid var(--tab-icon-section-btn-border, rgba(102, 102, 102, .1))",
                }}
              >
                <div
                  style={{
                    maskImage: `url("${
                      category.name === "Email" ? emailIcon : smsIcon
                    }")`,
                    maskRepeat: "no-repeat",
                    maskPosition: "center",
                    maskSize: "100%",
                  }}
                  className="w-[8vw] h-[8vw] sm:w-7.5 sm:h-7.5 group-data-[selected]:bg-gray-1 bg-gray-7 mx-auto"
                ></div>
              </div>
              <span className="py-[2.6666666667vw] sm:py-2.5 text-[3.2vw] sm:text-xs block data-selected:text-blue-1 text-gray-7">
                {category.name}
              </span>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="flex bg-white flex-1">
          <TabPanel unmount={false} className="data-[selected]:w-full w-0">
            <Transition
              appear
              show={selectedIndex == 0}
              enter="transition-transform duration-300"
              enterFrom="-translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-300"
              leaveFrom="translate-x-0"
              leaveTo="-translate-x-full"
            >
              <div>
                <DoItBySMS
                  setIsSuccessfullRegistration={setIsSuccessfullRegistration}
                />
              </div>
            </Transition>
          </TabPanel>
          <TabPanel unmount={false} className="data-[selected]:w-full w-0">
            <Transition
              appear
              show={selectedIndex == 1}
              enter="transition-transform duration-300"
              enterFrom="translate-x-full"
              enterTo="translate-x-0"
              leave="transition-transform duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div>
                <DoItByEmail
                  setIsSuccessfullRegistration={setIsSuccessfullRegistration}
                />
              </div>
            </Transition>
          </TabPanel>
        </TabPanels>
      </TabGroup>
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
