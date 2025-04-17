"use client";

import { UnProtectedRoute } from "@/constants/routes";
import { useAuthStore } from "@/stores/useAuthStore";
import Link from "next/link";
import { useStore } from "zustand";
import Button from "../button/Button";
import Modal from "../modal/Modal";

const RequireLoginNotification = () => {
  const requireLogin = useStore(useAuthStore, ({ requireLogin }) => requireLogin);
  const setRequireLogin = useStore(useAuthStore, ({ setRequireLogin }) => setRequireLogin);

  return (
    <Modal isOpen={requireLogin} onClose={() => setRequireLogin(false)} title='Notification'>
      <div className='px-4 pt-2.5 pb-5'>
        <p className='mb-6 text-sm'>Please login or sin up to play the game.</p>
        <div className='mx-auto grid w-full max-w-sm grid-cols-2 gap-4'>
          <Button as={Link} href={UnProtectedRoute.Login} color='blue' isBlock>
            Login
          </Button>
          <Button as={Link} href={UnProtectedRoute.Signup} color='yellow' className='bg-yellow-3' isBlock>
            Signup
          </Button>
        </div>
      </div>
    </Modal>
  );
};

export default RequireLoginNotification;
