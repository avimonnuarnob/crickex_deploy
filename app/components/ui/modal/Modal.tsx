import {
  CloseButton,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import classNames from "classnames";
import { AnimatePresence, motion } from "motion/react";
import { IoIosArrowBack } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string;
  isFullScreen?: boolean;
  onBack?: () => void;
};

const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  isFullScreen = false,
  onBack,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          <DialogBackdrop className="fixed inset-0 sm:backdrop-blur-xs bg-black/30" />

          <div className="fixed inset-0 flex justify-center">
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
              className="w-full h-full sm:max-w-[375px] relative sm:my-auto sm:max-h-[700px] flex items-center"
              // style={{
              //   height: "calc(100dvh - 60px)",
              // }}
            >
              <DialogPanel
                className={classNames(
                  "space-y-4 rounded-none sm:rounded-[10px] absolute w-full overflow-hidden flex flex-col shadow",
                  {
                    "h-full": isFullScreen,
                    "h-auto": !isFullScreen,
                  }
                )}
              >
                {title && (
                  <div className="bg-blue-1 relative mb-0 sm:rounded-t-[10px] flex items-center justify-center min-h-[13.3333333333vw] sm:min-h-12.5">
                    <CloseButton className="absolute top-1/2 right-2 mb-0 -translate-y-1/2 cursor-pointer">
                      <IoCloseSharp className="text-xl text-white" />
                    </CloseButton>
                    {onBack && (
                      <button
                        className="absolute top-1/2 left-2 mb-0 -translate-y-1/2 cursor-pointer"
                        onClick={onBack}
                      >
                        <IoIosArrowBack className="text-xl text-white" />
                      </button>
                    )}
                    <DialogTitle className="mb-0 text-center text-xl text-white">
                      {title}
                    </DialogTitle>
                  </div>
                )}
                <div
                  className={classNames(
                    "bg-white rounded-b-[10px] overflow-y-auto [&::-webkit-scrollbar]:w-1.25 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded",
                    {
                      "flex-1": isFullScreen,
                    }
                  )}
                >
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
