import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "motion/react";
import { IoCloseSharp } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isFullScreen?: boolean;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  isFullScreen = false,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 backdrop-blur-xs" />

          <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-[375px] relative"
              style={{
                height: "calc(100dvh - 60px)",
                maxHeight: "700px",
              }}
            >
              <DialogPanel
                className={classNames(
                  "space-y-4 rounded-[10px] absolute w-full h-full overflow-hidden flex flex-col",
                  {
                    "bg-white": isFullScreen,
                  }
                )}
              >
                <div className="bg-blue-1 relative mb-0 rounded-t-[10px] p-2.75">
                  <CloseButton className="absolute top-1/2 right-2 mb-0 -translate-y-1/2 cursor-pointer">
                    <IoCloseSharp className="text-xl text-white" />
                  </CloseButton>
                  <DialogTitle className="mb-0 text-center text-lg text-white">
                    {title}
                  </DialogTitle>
                </div>
                <div className="bg-white rounded-b-[10px] overflow-y-auto [&::-webkit-scrollbar]:w-1.25 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded">
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
