import Modal from "@/components/ui/modal/Modal";
import { useNavigate } from "react-router";

export default function Deposit() {
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={true}
      onClose={() => {
        navigate(-1);
      }}
      title="Funds"
    >
      <p>Hello</p>
    </Modal>
  );
}
