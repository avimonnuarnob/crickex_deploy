import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import { MdCheckCircle, MdError } from "react-icons/md";
import { Field, Fieldset, Label } from "@headlessui/react";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .refine((value) => /[a-zA-Z]/.test(value), {
        message: "Password must contain at least one letter",
      })
      .refine((value) => /[0-9]/.test(value), {
        message: "Password must contain at least one number",
      })
      .refine(
        (value) => /^[a-zA-Z0-9]+$/.test(value),
        "Password can only contain letters and numbers, no spaces"
      ),
    confirmPassword: z.string().min(1, "Please confirm your password"),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

type PasswordFormData = z.infer<typeof passwordSchema>;

type ChangePasswordModalProps = {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: PasswordFormData) => void;
};

const ChangePasswordModal = ({
  isOpen,
  onClose,
  onSubmit,
}: ChangePasswordModalProps) => {
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

  const password = watch("newPassword");

  const requirements = [
    {
      label: "Between 6~20 characters.",
      test: password?.length >= 6 && password?.length <= 20,
    },
    { label: "At least one alphabet.", test: /[a-zA-Z]/.test(password) },
    {
      label: "At least one number. (Special character, symbols are allowed).",
      test: /[0-9]/.test(password),
    },
  ];

  console.log(errors);

  const handleFormSubmit = (data: PasswordFormData) => {
    onSubmit(data);
  };

  return (
    <Modal
      isOpen={isOpen}
      isFullScreen={true}
      onClose={onClose}
      title="Change Password"
    >
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="inline-block w-full h-full bg-white space-y-4"
      >
        <div className="p-[2.6666666667vw] m-[2.6666666667vw] sm:p-2.5 sm:m-2.5 space-y-[2.6666666667vw] sm:space-y-2.5">
          <Fieldset className="p-0! space-y-[2.6666666667vw] sm:space-y-2.5">
            <Field>
              <Label className="flex text-[#474747] text-[3.7333333333vw] sm:text-sm h-[6.4vw] sm:h-6 leading-[6.4vw] sm:leading-6">
                Current password
              </Label>
              <div className="relative">
                <input
                  autoComplete="one-time-code"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full h-[12vw] sm:h-11.25 p-[0_4.2666666667vw] sm:px-4 border border-gray-1 bg-gray-1 text-foreground-200 rounded text-[3.2vw]! sm:text-xs!"
                  {...register("currentPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {!showNewPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-black" />
                  ) : (
                    <FaEye className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </Field>
            <Field>
              <Label className="flex text-[#474747] text-[3.7333333333vw] sm:text-sm h-[6.4vw] sm:h-6 leading-[6.4vw] sm:leading-6">
                New password
              </Label>
              <div className="relative">
                <input
                  autoComplete="one-time-code"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full h-[12vw] sm:h-11.25 p-[0_4.2666666667vw] sm:px-4 border border-gray-1 bg-gray-1 text-foreground-200 rounded text-[3.2vw]! sm:text-xs!"
                  {...register("newPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {!showNewPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-black" />
                  ) : (
                    <FaEye className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </Field>
            <ul
              className={`space-y-[3.2vw] sm:space-y-3 ${
                password ? "grayscale-0" : "grayscale-100"
              }`}
            >
              {requirements.map((req) => (
                <li
                  key={req.label}
                  style={{ color: req.test ? "green" : "red" }}
                  className="text-[3.7333333333vw] sm:text-sm flex gap-2 items-center"
                >
                  <span className="">
                    {((req.test && password) || !password) && (
                      <MdCheckCircle className="size-5" />
                    )}
                    {!req.test && password && <MdError className="size-5" />}
                  </span>
                  {req.label}
                </li>
              ))}
            </ul>
            <Field>
              <Label className="flex text-[#474747] text-[3.7333333333vw] sm:text-sm h-[6.4vw] sm:h-6 leading-[6.4vw] sm:leading-6">
                Confirm New password
              </Label>
              <div className="relative">
                <input
                  autoComplete="one-time-code"
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New password"
                  className="w-full h-[12vw] sm:h-11.25 p-[0_4.2666666667vw] sm:px-4 border border-gray-1 bg-gray-1 text-foreground-200 rounded text-[3.2vw]! sm:text-xs!"
                  {...register("confirmPassword")}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-2 top-1/2 -translate-y-1/2"
                >
                  {!showNewPassword ? (
                    <FaEyeSlash className="w-5 h-5 text-black" />
                  ) : (
                    <FaEye className="w-5 h-5 text-black" />
                  )}
                </button>
              </div>
            </Field>
          </Fieldset>

          {/* Error Messages */}
          {(errors.currentPassword || errors.confirmPassword) && (
            <div className="text-red-500 text-sm flex items-center gap-2">
              <MdError className="size-5" />
              <span>
                {errors.currentPassword?.message ||
                  errors.confirmPassword?.message}
              </span>
            </div>
          )}

          {/* Submit Button */}
          <Button type="submit" color="blue" isBlock size="lg" className="mt-4">
            Confirm
          </Button>
        </div>
      </form>
    </Modal>
  );
};

export default ChangePasswordModal;
