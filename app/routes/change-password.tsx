import { useNavigate } from "react-router";
import ChangePasswordModal from "@/components/ui/password/ChangePasswordModal";

export default function ChangePasswordPage() {
  const navigate = useNavigate();
  
  const handleSubmit = async (data: any) => {
    try {
      // Implement your password change logic here
      console.log("Password change data:", data);
      
      // Show success message or redirect
      alert("Password changed successfully");
      navigate(-1);
    } catch (error) {
      console.error("Failed to change password:", error);
    }
  };

  return (
    <ChangePasswordModal
      isOpen={true}
      onClose={() => navigate(-1)}
      onSubmit={handleSubmit}
    />
  );
}