import Modal from "@/components/ui/modal/Modal";
import { useNavigate } from "react-router";
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from "@headlessui/react";
import classNames from "classnames";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  forgotPasswordByMailSchema,
  type forgotPasswordByMailInput,
} from "@/schema/authSchema";
import { useCallback, useState } from "react";
import { FormTextField } from "@/components/ui/form-inputs";
import Button from "@/components/ui/button/Button";
import { OTPInput, REGEXP_ONLY_DIGITS, type SlotProps } from "input-otp";

const categories = [
  {
    name: "Email",
  },
  {
    name: "SMS",
  },
];

const DoItByEmail = () => {
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
      <div className="p-2">
        {step === 0 && <EmailFormInput setStep={setStep} setEmail={setEmail} />}
        {step === 1 && <OtpFormInput setStep={setStep} setOtp={setOtp} />}
        {step === 2 && <ConfirmPasswordFromInput email={email} otp={otp} />}
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
      "https://ai.cloud7hub.uk/auth/forgot-password/",
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
      {responseMessage && (
        <p className="text-center bg-red-500 mx-2 py-4 text-white shadow rounded animate-bounce">
          {responseMessage}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
      >
        <div className="mb-1">
          <FormTextField
            control={control}
            label="Email"
            id="email"
            name="email"
            required
          />
        </div>
        <div className="mb-4.5">
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
        <div className="mb-4.5">
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
}: {
  email: string | undefined;
  otp: string | undefined;
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
    const respose = await fetch("https://ai.cloud7hub.uk/auth/set-password/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        password: data.password,
        email,
        otp,
      }),
    });
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
      navigate(-1);
    }
  };
  return (
    <>
      {responseMessage && (
        <p className="text-center bg-red-500 mx-2 py-4 text-white shadow rounded animate-bounce">
          {responseMessage}
        </p>
      )}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmit(onSubmit)(e);
        }}
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
        <div className="mb-4.5">
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
  return (
    <Modal
      isFullScreen={true}
      isOpen={true}
      onClose={() => {
        navigate(-1);
      }}
      title="Forgot password?"
    >
      <TabGroup>
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
        <TabPanels>
          <TabPanel className="flex-1">
            <DoItByEmail />
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
