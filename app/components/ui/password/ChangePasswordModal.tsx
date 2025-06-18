import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { IoInformationCircle } from "react-icons/io5";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import { MdError } from "react-icons/md";

const passwordSchema = z
  .object({
    currentPassword: z.string().min(1, "Current password is required"),
    newPassword: z
      .string()
      .min(6, "Password must be at least 6 characters")
      .max(20, "Password must be at most 20 characters")
      .regex(
        /^[a-zA-Z0-9]+$/,
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
    formState: { errors, isValid },
  } = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
  });

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
      <div className="p-2.5">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div className="bg-white text-[13px]">
              {/* Current Password */}
              <div className="border-b border-gray-200 pl-4.5 py-1.5">
                <div className="flex items-center relative">
                  <label className="w-1/4 text-gray-700 leading-3.25">
                    Current password
                  </label>
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    placeholder="Current password"
                    className="flex-1 p-3 outline-none"
                    {...register("currentPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-2"
                  >
                    {!showCurrentPassword ? (
                      <FaEyeSlash className="w-5 h-5 text-black" />
                    ) : (
                      <FaEye className="w-5 h-5 text-black" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div className="border-b border-gray-200 pl-4.5 py-1.5">
                <div className="flex items-center relative">
                  <label className="w-1/4 text-gray-700">New password</label>
                  <input
                    type={showNewPassword ? "text" : "password"}
                    placeholder="New password"
                    className="flex-1 p-3 outline-none"
                    {...register("newPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-2"
                  >
                    {!showNewPassword ? (
                      <FaEyeSlash className="w-5 h-5 text-black" />
                    ) : (
                      <FaEye className="w-5 h-5 text-black" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm New Password */}
              <div className="border-b border-gray-200 pl-4.5 py-1.5">
                <div className="flex items-center relative">
                  <label className="w-1/4 text-gray-700">
                    Confirm new password
                  </label>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm new password"
                    className="flex-1 p-3 outline-none"
                    {...register("confirmPassword")}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-2"
                  >
                    {!showConfirmPassword ? (
                      <FaEyeSlash className="w-5 h-5 text-black" />
                    ) : (
                      <FaEye className="w-5 h-5 text-black" />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {/* Error Messages */}
            {(errors.currentPassword ||
              errors.newPassword ||
              errors.confirmPassword) && (
              <div className="text-red-500 text-sm flex items-center gap-2">
                <MdError className="size-5" />
                <span>
                  {errors.currentPassword?.message ||
                    errors.newPassword?.message ||
                    errors.confirmPassword?.message}
                </span>
              </div>
            )}

            {/* Password Requirements */}
            <div className="bg-blue-50 p-2.5 rounded-md border border-blue-500">
              <div className="flex items-start gap-2">
                <div className="text-blue-700">
                  <div className="font-medium flex items-center gap-1 mb-6">
                    <IoInformationCircle className="text-blue-500 mt-0.5" />
                    <span>Password requirements</span>
                  </div>
                  <ol className="list-decimal pl-5 space-y-1 text-xs">
                    <li>6-20 characters</li>
                    <li>
                      must contain at least one English letter and one numeric
                    </li>
                    <li>allow uppercase and lowercase letters</li>
                    <li>allow numbers</li>
                    <li>allow special characters (@$!%#)</li>
                  </ol>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              color="blue"
              isBlock
              size="lg"
              className="mt-4"
            >
              Confirm
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default ChangePasswordModal;
