import { ModalContextProvider } from "./modal";
import { LoadingContextProvider } from "./loading";
import { ToastContextProvider } from "./toast";

export default function ContextProvider({ children }) {
  return (
    <ToastContextProvider>
      <LoadingContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </LoadingContextProvider>
    </ToastContextProvider>
  );
}
