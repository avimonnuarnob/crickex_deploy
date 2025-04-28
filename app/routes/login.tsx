import Button from "@/components/ui/button/Button";
import { FormTextField } from "@/components/ui/form-inputs";
import Modal from "@/components/ui/modal/Modal";
import { loginSchema, type LoginInput } from "@/schema/authSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router";

export default function LoginModal() {
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
      title="Login"
    >
      <>
        {/* <br className="block" /> */}
        <div
          className="w-[200px] h-[35px] mx-auto my-7 bg-contain bg-no-repeat bg-center"
          style={{
            backgroundImage:
              'url("https://img.c88rx.com/cx/h5/assets/images/member-logo.png?v=1745315485946")',
          }}
        ></div>

        <div className="px-4 py-2.5">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit(onSubmit)(e);
            }}
          >
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
            <div className="mb-1">
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
            <div className="mb-6.25 text-right">
              <Link to="/" className="text-blue-1 text-sm">
                Forgot password?
              </Link>
            </div>
            <div className="mb-4.5">
              <Button
                type="submit"
                color="green"
                size="lg"
                isBlock
                isDisabled={!isDirty}
              >
                Login
              </Button>
            </div>

            <p className="text-gray-3 text-center text-sm mb-1.5">
              Do not have an account?{" "}
              <Link to="/" className="text-blue-1">
                Sign Up
              </Link>
            </p>
          </form>
        </div>
      </>
    </Modal>
  );
}
