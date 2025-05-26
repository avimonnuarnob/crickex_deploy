import Button from "@/components/ui/button/Button";
import { FormTextField } from "@/components/ui/form-inputs";
import Modal from "@/components/ui/modal/Modal";
import { signUpSchema, type SignupInput } from "@/schema/authSchema";
import { checkEmail, checkUsername } from "@/services/user/user_core";
import { GiConfirmed } from "react-icons/gi";
import { FaRegCircleXmark } from "react-icons/fa6";

import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaCaretDown, FaLaptopHouse } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/signup";
import { useState } from "react";
import { OTPInput, type SlotProps, REGEXP_ONLY_DIGITS } from "input-otp";
import classNames from "classnames";
import { useCurrentUser } from "@/contexts/CurrentUserContext";

export default function SignupModal({ matches }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { loginUser } = useCurrentUser();

  const { currencyList, countryList, defaultReferral } = matches[0].data;
  const [secondSubmission, setSecondSubmission] = useState(false);
  const [isSuccessfulRegistration, setIsSuccessfullRegistration] = useState<
    boolean | undefined
  >(undefined);
  const [responseData, setResponseData] = useState<{
    username: string;
    email: string;
    password: string;
    contact: any;
    referral_code: string;
    currency: string;
    country_id: any;
    social_contact_id: number;
    reg_link: string;
    user_type: any;
    url_id: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(true);

  const {
    control,
    handleSubmit,
    setError,
    clearErrors,
    formState: { isDirty },
  } = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      username: "",
      password: "",
      email: "",
      referral_code: "",
      otp: "",
    },
  });

  const loginBtnHandler = async () => {
    setIsLoading(true);
    const respose = await fetch("https://ai.cloud7hub.uk/auth/user/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: responseData?.username.toLowerCase(),
        password: responseData?.password,
      }),
    });
    const r = (await respose.json()) as {
      status: "failed" | "ok";
      errors?: string;
      data?: { token: string; user_base_origin: string };
    };
    if (r.status === "ok" && r.data) {
      setIsLoading(false);
      loginUser(r.data.token);
      navigate(-1);
    }
  };

  const onSubmit = async (data: SignupInput) => {
    setIsLoading(true);
    if (responseData && secondSubmission) {
      const response = await fetch(
        "https://ai.cloud7hub.uk/auth/user/register-confirm/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...responseData,
            otp: data.otp,
          }),
        }
      );
      const r = await response.json();
      if (r.status === "ok") {
        setIsLoading(false);
        setIsSuccessfullRegistration(true);
      } else {
        setIsLoading(false);
        setIsSuccessfullRegistration(false);
      }
    } else {
      const response = await fetch(
        "https://ai.cloud7hub.uk/auth/user/register/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: data.username.toLowerCase(),
            password: data.password,
            email: data.email.toLowerCase(),
            referral_code: data.referral_code.length
              ? data.referral_code
              : defaultReferral.referral_code,
            social_contact_id: 1,
            currency: data.currency,
          }),
        }
      );
      const responseData = await response.json();
      setIsLoading(false);
      setResponseData(responseData.data);
      setSecondSubmission(true);
    }
  };

  if (isSuccessfulRegistration === true) {
    return (
      <Modal
        onClose={() => {
          // setIsSuccessfullRegistration(undefined);
          navigate(-1);
        }}
        isOpen={isSuccessfulRegistration === true}
        title="Registration Confirmation"
      >
        <div className="flex flex-col justify-between items-center p-4">
          <div className="h-[527px] flex flex-col items-center gap-4 mt-4">
            <GiConfirmed className="text-[66px] text-green-1 mx-auto" />
            <span>Your registration was successful</span>
          </div>

          <Button
            size="lg"
            isBlock
            onClick={loginBtnHandler}
            isLoading={isLoading}
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
        title="Registration Confirmation"
      >
        <div className="flex flex-col justify-between items-center p-4">
          <div className="flex flex-col items-center gap-4 mt-4">
            <FaRegCircleXmark className="text-[66px] text-red-1 mx-auto" />
            <span>Your registration has failed</span>
          </div>
        </div>
      </Modal>
    );
  }

  return (
    <Modal
      onClose={async () => {
        setTimeout(() => {
          navigate(-1);
        }, 300);
        setIsOpen(false);
      }}
      isOpen={isOpen}
      isFullScreen={true}
      title="Sign up"
    >
      <>
        {/* <br className="block" /> */}
        {!secondSubmission ? (
          <>
            <div
              className="w-[200px] h-[35px] my-3.75 mx-auto bg-contain bg-no-repeat bg-center"
              style={{
                backgroundImage:
                  'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
              }}
            ></div>
            <div className="w-full h-[120px] bg-gray-5"></div>
          </>
        ) : null}

        {secondSubmission && (
          <p className="text-center text-[#acacac] py-4">
            Please enter the 6-digit code sent to{" "}
            <span className="text-black">{responseData?.email}</span>
          </p>
        )}

        <div className="px-[15px] py-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            {secondSubmission ? (
              <div className="mb-4 overflow-hidden">
                <Controller
                  control={control}
                  name="otp"
                  rules={{ required: secondSubmission ? true : false }}
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
            ) : (
              <>
                <div className="mb-5.5">
                  <Controller
                    control={control}
                    defaultValue={currencyList[0].currency}
                    name="currency"
                    render={({ field: { value, onChange } }) => (
                      <Listbox value={value} onChange={onChange}>
                        <Label className="block text-sm/6 text-[#474747]">
                          Choose currency
                        </Label>
                        <div className="relative mt-2.5">
                          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-[#eeeeee] py-3 pr-2 pl-2 text-left font-light text-gray-900 focus:outline-1 focus:outline-blue-1 sm:text-sm/6">
                            <span className="col-start-1 row-start-1 flex items-center gap-2 pr-6">
                              {value ? (
                                <>
                                  <span className="block truncate">
                                    {value}
                                  </span>
                                </>
                              ) : (
                                <span className="block truncate">
                                  Choose a currency
                                </span>
                              )}
                            </span>
                            <FaCaretDown
                              aria-hidden="true"
                              className="col-start-1 row-start-1 size-3 self-center justify-self-end text-gray-500"
                            />
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#eeeeee] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm border-1 border-[#e7e7e7]"
                          >
                            {currencyList.map((currency) => (
                              <ListboxOption
                                key={currency.id}
                                value={currency.currency}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none"
                              >
                                <div className="flex items-center">
                                  <span className="ml-2 block truncate font-normal">
                                    {currency.currency}
                                  </span>
                                </div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    )}
                  />
                </div>
                <div className="mb-3.5">
                  <FormTextField
                    control={control}
                    label="Username"
                    id="username"
                    name="username"
                    placeholder="6-10 character, allow numbers, no space"
                    required
                    className="lowercase"
                    onBlur={async (e) => {
                      try {
                        await checkUsername(e.target.value);
                        clearErrors("username");
                      } catch (error) {
                        if (error instanceof Error) {
                          setError("username", { message: error.message });
                        }
                      }
                    }}
                  />
                </div>
                <div className="mb-4">
                  <FormTextField
                    control={control}
                    label="Password"
                    id="password"
                    name="password"
                    type="password"
                    placeholder="6-20 characters and Numbers"
                    required
                  />
                </div>
                <div className="mb-4">
                  <Controller
                    control={control}
                    defaultValue={countryList[0]}
                    name="country"
                    render={({ field: { value, onChange } }) => (
                      <Listbox value={value} onChange={onChange}>
                        <Label className="block text-sm/6 text-[#474747]">
                          Country
                        </Label>
                        <div className="relative mt-2.5">
                          <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-[#eeeeee] py-3 pr-2 pl-2 text-left font-light text-gray-900 focus:outline-1 focus:outline-blue-1 sm:text-sm/6 border-1 border-[#e7e7e7]">
                            <span className="col-start-1 row-start-1 flex items-center gap-2 pr-6">
                              {value ? (
                                <>
                                  <img
                                    alt={value.country_name}
                                    src={
                                      "https://img.softtake.net" +
                                      value.country_flag
                                    }
                                    className="w-5 h-5 shrink-0 rounded-full"
                                  />
                                  <span className="block truncate">
                                    {value.country_name}
                                  </span>
                                </>
                              ) : (
                                <span className="block truncate">
                                  Choose a Country
                                </span>
                              )}
                            </span>
                            <FaCaretDown
                              aria-hidden="true"
                              className="col-start-1 row-start-1 size-3 self-center justify-self-end text-gray-500"
                            />
                          </ListboxButton>

                          <ListboxOptions
                            transition
                            className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#eeeeee] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
                          >
                            {countryList.map((country, idx) => (
                              <ListboxOption
                                key={country.country_name + idx + ""}
                                value={country}
                                className="group relative cursor-default py-2 pr-9 pl-3 text-gray-900 select-none"
                              >
                                <div className="flex items-center">
                                  <img
                                    alt={country.country_name}
                                    src={
                                      "https://img.softtake.net" +
                                      country.country_flag
                                    }
                                    className="w-5 h-5 shrink-0 rounded-full"
                                  />
                                  <span className="ml-2 block truncate font-normal">
                                    {country.country_name}
                                  </span>
                                </div>
                              </ListboxOption>
                            ))}
                          </ListboxOptions>
                        </div>
                      </Listbox>
                    )}
                  />
                </div>
                <div className="mb-4">
                  <FormTextField
                    control={control}
                    label="Email"
                    id="email"
                    name="email"
                    required
                    className="lowercase"
                    onBlur={async (e) => {
                      try {
                        await checkEmail(e.target.value);
                        clearErrors("email");
                      } catch (error) {
                        if (error instanceof Error) {
                          setError("email", { message: error.message });
                        }
                      }
                    }}
                  />
                </div>
                <div className="mb-13">
                  <FormTextField
                    control={control}
                    label="Refer Code"
                    id="referral_code"
                    name="referral_code"
                  />
                </div>
              </>
            )}

            {/* <div className="mb-1">
            <SelectInput />
          </div>
          <div className="mb-1">
            <SelectInput />
          </div>
          <div className="mb-1">
            <SelectInput />
          </div>
          <div className="mb-1">
            <SelectInput />
          </div> */}
            <div className="mb-4.5">
              <Button
                type="submit"
                color="green"
                size="lg"
                isBlock
                isDisabled={!isDirty}
                isLoading={isLoading}
              >
                Submit
              </Button>
            </div>

            <p className="text-gray-3 text-center text-sm mb-4.5">
              Already a member ?{" "}
              <Link to="/" className="text-blue-1">
                Log In
              </Link>
            </p>

            <p className="text-gray-3 text-center text-sm mb-1.5">
              Registering means you are over 18 years old, have read and agree
              to the{" "}
              <Link to="/" className="text-blue-1">
                Terms & Conditions.
              </Link>
            </p>
          </form>
        </div>
      </>
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
