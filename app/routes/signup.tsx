import Button from "@/components/ui/button/Button";
import { FormTextField } from "@/components/ui/form-inputs";
import FormSelect from "@/components/ui/form-inputs/FormSelect";
import PhoneInput from "@/components/ui/input/PhoneInput";
import SelectInput from "@/components/ui/input/SelectInput";
import Modal from "@/components/ui/modal/Modal";
import { signUpSchema, type SignupInput } from "@/schema/authSchema";
import { checkEmail, checkUsername } from "@/services/user/user_core";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { FaCaretDown } from "react-icons/fa";
import { Link, useNavigate } from "react-router";
import type { Route } from "./+types/signup";

export default function SignupModal({ matches }: Route.ComponentProps) {
  const navigate = useNavigate();
  const { currencyList, countryList } = matches[0].data;
  const {
    control,
    handleSubmit,
    trigger,
    setError,
    formState: { isDirty },
  } = useForm<SignupInput>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      currency: "",
      username: "",
      password: "",
      country: null,
      email: "",
      referral_code: "",
    },
  });

  const onSubmit = async (data: SignupInput) => {
    console.log("signup data:", data);

    await fetch("https://ai.cloud7hub.uk/auth/user/register/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username: data.username,
        password: data.password,
        email: data.email,
        referral_code: data.referral_code,
        social_contact_id: 1,
        currency: data.currency,
      }),
    });

    navigate(-1);
  };
  return (
    <Modal
      onClose={() => {
        navigate(-1);
      }}
      isOpen={true}
      title="Sign up"
    >
      <>
        {/* <br className="block" /> */}
        <div
          className="w-[200px] h-[35px] my-3.75 mx-auto bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
          }}
        ></div>

        <div className="w-full h-[120px] bg-gray-5"></div>
        <div className="px-[15px] py-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
            <div className="mb-5.5">
              {/* <FormSelect
                name="currency"
                options={people}
                control={control}
                label="Choose Currency"
              /> */}

              <Controller
                control={control}
                name="currency"
                render={({ field: { value, onChange } }) => (
                  <Listbox value={value} onChange={onChange}>
                    <Label className="block text-sm/6 text-[#474747]">
                      Choose currency
                    </Label>
                    <div className="relative mt-2.5">
                      <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-[#eeeeee] py-3 pr-2 pl-2 text-left font-light text-gray-900 focus:outline-none sm:text-sm/6 border-1 border-[#e7e7e7] focus:ring-none focus:border-1">
                        <span className="col-start-1 row-start-1 flex items-center gap-2 pr-6">
                          {value ? (
                            <>
                              <span className="block truncate">{value}</span>
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
                        className="absolute z-10 mt-1 max-h-56 w-full overflow-auto rounded-md bg-[#eeeeee] py-1 text-base shadow-lg ring-1 ring-black/5 focus:outline-hidden data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
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
                placeholder="4-15 char, allow numbers, no space"
                required
                onBlur={async (e) => {
                  try {
                    await checkUsername(e.target.value);
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
                name="country"
                render={({ field: { value, onChange } }) => (
                  <Listbox value={value} onChange={onChange}>
                    <Label className="block text-sm/6 text-[#474747]">
                      Country
                    </Label>
                    <div className="relative mt-2.5">
                      <ListboxButton className="grid w-full cursor-default grid-cols-1 rounded-sm bg-[#eeeeee] py-3 pr-2 pl-2 text-left font-light text-gray-900 focus:outline-none sm:text-sm/6 border-1 border-[#e7e7e7] focus:ring-none focus:border-1">
                        <span className="col-start-1 row-start-1 flex items-center gap-2 pr-6">
                          {value ? (
                            <>
                              <img
                                alt={value.country_name}
                                src={
                                  "https://ai.cloud7hub.uk" + value.country_flag
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
                                  "https://ai.cloud7hub.uk" +
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
                placeholder="Insert your mail address"
                required
                onBlur={async (e) => {
                  try {
                    await checkEmail(e.target.value);
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
                required
              />
            </div>
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
