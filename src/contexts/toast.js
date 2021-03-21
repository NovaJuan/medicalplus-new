import { createContext, useContext } from "react";
import { toast, ToastContainer } from "react-toastify";

export const ToastContext = createContext();

export function useToast() {
  const { createToast } = useContext(ToastContext);
  return createToast;
}

export function ToastContextProvider({ children }) {
  function createToast(content, type) {
    toast(content, { type, position: "bottom-right" });
  }

  return (
    <ToastContext.Provider value={{ createToast }}>
      {children}
      <ToastContainer />
    </ToastContext.Provider>
  );
}
