"use client";

import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from "@headlessui/react";
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
        <Dialog open={isOpen} onClose={onClose} className='relative z-50'>
          <DialogBackdrop className='fixed inset-0 bg-black/10 backdrop-blur-xs' />

          <div className='fixed inset-0 flex w-screen items-center justify-center p-4'>
            <motion.div
              initial={{ opacity: 0, y: 100 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 100 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <DialogPanel className='w-sm space-y-4 rounded-[10px] bg-white'>
                <div className='bg-blue-1 relative mb-0 rounded-t-[10px] p-3.5'>
                  <CloseButton className='absolute top-1/2 right-2 mb-0 -translate-y-1/2 cursor-pointer'>
                    <IoCloseSharp className='text-xl text-white' />
                  </CloseButton>
                  <DialogTitle className='mb-0 text-center text-sm font-bold text-white'>{title}</DialogTitle>
                </div>
                <div className='bg-gray-1 rounded-b-[10px]'>{children}</div>
              </DialogPanel>
            </motion.div>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default Modal;
