import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { AnimatePresence, motion } from "motion/react";
import { IoCloseSharp } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
};

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 bg-white/10 backdrop-blur-xs" />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-[375px] min-h-93/100 relative"
            >
              <DialogPanel className="space-y-4 rounded-[10px] bg-white absolute w-full h-full overflow-hidden flex flex-col">
                <div className="bg-blue-1 relative mb-0 rounded-t-[10px] p-2.75">
                  <CloseButton className="absolute top-1/2 right-2 mb-0 -translate-y-1/2 cursor-pointer">
                    <IoCloseSharp className="text-xl text-white" />
                  </CloseButton>
                  <DialogTitle className="mb-0 text-center text-lg text-white">
                    {title}
                  </DialogTitle>
                </div>
                <div className="bg-white rounded-b-[10px] overflow-y-auto">
                  {children}
                </div>
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
