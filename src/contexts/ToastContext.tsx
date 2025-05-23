import {
  createContext,
  type ReactNode,
  useState,
  useEffect,
  useCallback,
} from "react";
import AlertToast from "@/components/AlertToast";

type ToastType = "success" | "error" | "info";

interface ToastProps {
  open: boolean;
  message: string;
  type: ToastType;
}

interface ToastContextType {
  toastProps: ToastProps;
  showToast: (message: string, type: ToastType) => void;
  hideToast: () => void;
  handleToastOpenChange: (open: boolean) => void;
}

export const ToastContext = createContext<ToastContextType | undefined>(
  undefined,
);

export const ToastProvider = ({
  children,
  autoHideDuration = 2000,
}: {
  children: ReactNode;
  autoHideDuration?: number;
}) => {
  const [toastProps, setToastProps] = useState<ToastProps>({
    open: false,
    message: "",
    type: "success",
  });

  const showToast = useCallback((message: string, type: ToastType) => {
    setToastProps({ open: true, message, type });
  }, []);

  const hideToast = useCallback(() => {
    setToastProps((prev) => ({ ...prev, open: false }));
  }, []);

  const handleToastOpenChange = useCallback((open: boolean) => {
    setToastProps((prev) => ({ ...prev, open }));
  }, []);

  useEffect(() => {
    if (toastProps.open) {
      const timer = setTimeout(() => {
        hideToast();
      }, autoHideDuration);
      return () => clearTimeout(timer);
    }
  }, [toastProps.open, hideToast, autoHideDuration]);

  return (
    <ToastContext.Provider
      value={{ toastProps, showToast, hideToast, handleToastOpenChange }}
    >
      {children}
      <AlertToast
        open={toastProps.open}
        message={toastProps.message}
        type={toastProps.type}
        onOpenChange={handleToastOpenChange}
      />
    </ToastContext.Provider>
  );
};
