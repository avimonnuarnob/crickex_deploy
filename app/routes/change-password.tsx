import { useNavigate } from "react-router";
import ChangePasswordModal from "@/components/ui/password/ChangePasswordModal";
import { AnimatePresence, motion } from "motion/react";
import { RxCross2 } from "react-icons/rx";
import { useCurrentUser } from "@/contexts/CurrentUserContext";
import { useState } from "react";
import Cookies from "js-cookie";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  const { logoutUser } = useCurrentUser();

  const [notification, setNotification] = useState<string | null>(null);

  const handleSubmit = async (data: any) => {
    try {
      // Implement your password change logic here
      const response = await fetch(
        import.meta.env.VITE_API_URL + "/auth/change-password/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Token ${Cookies.get("userToken")}`,
          },
          body: JSON.stringify({
            password: data.currentPassword,
            new_password: data.newPassword,
          }),
        }
      );

      const r = await response.json();
      if (r.status === "ok") {
        setNotification(r.message);
      } else {
        setNotification(r.errors);
      }
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  return (
    <>
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed inset-0 z-100 flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-black/70" />
            <div className="relative w-full max-w-md mx-auto bg-white rounded-lg overflow-hidden">
              <div className="flex justify-between items-center p-4 bg-blue-1 text-white">
                <span className="text-base font-medium">Notification</span>
                <button
                  className="text-white cursor-pointer"
                  onClick={() => {
                    logoutUser();
                    navigate("/account-login-quick");
                  }}
                >
                  <RxCross2 className="size-5" />
                </button>
              </div>
              <div className="p-4 bg-white">
                <span className="text-xs">
                  Password reset successFully. Please Login with new password.
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
      <ChangePasswordModal
        onClose={() => {
          setTimeout(() => {
            const a = location.pathname.replace("member/change-password", "");
            !notification &&
              navigate(a ? a + location.hash : "/" + location.hash);
          }, 200);
        }}
        onSubmit={handleSubmit}
      />
    </>
  );
}
