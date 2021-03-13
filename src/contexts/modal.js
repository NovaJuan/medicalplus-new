import { useContext, createContext, useState } from "react";
import ModalContainer from "../components/layouts/ModalContainer";

export const ModalContext = createContext();

export function useModal() {
  const { createModal } = useContext(ModalContext);
  return createModal;
}

export function useCloseModal() {
  const { closeModal } = useContext(ModalContext);
  return closeModal;
}

export function ModalContextProvider({ children }) {
  const [Component, setComponent] = useState(null);
  const [onClose, setOnClose] = useState(null);
  const [isOpen, setIsOpen] = useState(false);

  function createModal(component, onCloseCb) {
    setComponent(() => component);
    setOnClose(() => onCloseCb);
    setIsOpen(true);
  }

  function closeModal() {
    console.log("closing...");
    setIsOpen(false);
    setComponent(null);
    onClose();
    setOnClose(null);
  }

  return (
    <ModalContext.Provider
      value={{ createModal, closeModal, Component, isOpen }}
    >
      {children}
      {isOpen && <ModalContainer>{Component && <Component />}</ModalContainer>}
    </ModalContext.Provider>
  );
}
