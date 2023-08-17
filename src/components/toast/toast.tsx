"use client";

import { ToastContainer, cssTransition } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-toastify/dist/ReactToastify.minimal.css";

import "./style.css";

type ToastProviderProps = {
  children: React.ReactNode;
};

const TOAST_CLASSES = {
  success: "toast-success",
  error: "toast-error",
  info: "toast-info",
  warning: "toast-warning",
  default: "toast",
} as const;

const ToastProvider = ({ children }: ToastProviderProps) => (
  <>
    {children}
    <ToastContainer
      className="toast-container"
      toastClassName={(context) =>
        `toast ${TOAST_CLASSES[context?.type || "default"]}`
      }
      bodyClassName="toast-body"
      icon={false}
      position="bottom-right"
      transition={cssTransition({
        enter: "toast-enter",
        exit: "toast-exit",
      })}
      hideProgressBar
    />
  </>
);

export { ToastProvider };
