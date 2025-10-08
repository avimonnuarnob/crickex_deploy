import React from "react";
import { Slide, ToastContainer } from "react-toastify";

const Toast: React.FC = () => (
  <ToastContainer
    position="bottom-left"
    transition={Slide}
    hideProgressBar={false}
    // closeButton={<CloseButton />}
    newestOnTop
    icon={false}
    theme="colored"
  />
);

export default Toast;
