import Modal from "@/components/ui/modal/Modal";
import { useNavigate, useParams } from "react-router";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";

import { useState } from "react";
import { FormTextField } from "@/components/ui/form-inputs";
import Button from "@/components/ui/button/Button";
import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";
import { GiConfirmed } from "react-icons/gi";
import { FaRegCircleXmark } from "react-icons/fa6";

const categories = [
  {
    name: "Email",
  },
  {
    name: "SMS",
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
      <div className="p-2 flex-1">
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
    if (responseData.status === "ok" && responseData.message) {
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
      <TabGroup className="flex flex-col h-full">
        <TabList className={classNames("flex")}>
          {categories.map((category) => (
            <Tab
              key={category.name}
              className="flex-1 py-3.75 bg-blue-1 text-sm font-bold text-white focus:not-data-focus:outline-none data-selected:text-yellow-1 data-selected:border-b-3 data-selected:border-b-yellow-1"
            >
              <span>{category.name}</span>
              <div className="h-[3px] w-full data-selected:bg-yellow-1"></div>
            </Tab>
          ))}
        </TabList>
        <TabPanels className="flex-1 flex flex-col">
          <TabPanel className="flex-1 flex flex-col">
            <DoItByEmail
              setIsSuccessfullRegistration={setIsSuccessfullRegistration}
            />
          </TabPanel>
          <TabPanel className="flex-1">
            <p>Hello</p>
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
