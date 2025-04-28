import Button from "@/components/ui/button/Button";
import { FormTextField } from "@/components/ui/form-inputs";
import PhoneInput from "@/components/ui/input/PhoneInput";
import SelectInput from "@/components/ui/input/SelectInput";
import Modal from "@/components/ui/modal/Modal";
import { loginSchema, type LoginInput } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function SignupModal() {
  const navigate = useNavigate();

  const {
    control,
    handleSubmit,
    formState: { isDirty },
  } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onSubmit = (data: LoginInput) => {
    console.log("login data:", data);
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
              <SelectInput />
            </div>
            <div className="mb-3.5">
              <FormTextField
                control={control}
                label="Username"
                id="username"
                name="username"
                placeholder="4-15 char, allow numbers, no space"
                required
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
            <div className="mb-13">
              <PhoneInput
                label="Phone Number"
                id="username"
                name="username"
                placeholder="Phone Number"
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
