import { AppointmentsContextProvider } from "./appointments";
import { PatientsContextProvider } from "./patients";
import { ModalContextProvider } from "./modal";

export default function ContextProvider({ children }) {
  return (
    <PatientsContextProvider>
      <AppointmentsContextProvider>
        <ModalContextProvider>{children}</ModalContextProvider>
      </AppointmentsContextProvider>
    </PatientsContextProvider>
  );
}
