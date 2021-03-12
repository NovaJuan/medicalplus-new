import { useContext, createContext, useState } from "react";
import ModalContainer from "../components/layouts/ModalContainer";

export const ModalContext = createContext();

export function useModal(component, onClose) {
  const { createModal } = useContext(ModalContext);
  createModal(component, onClose);
}

export function useCloseModal() {
  const { closeModal } = useContext(ModalContext);
  return closeModal();
}

export function ModalContextProvider({ children }) {
  const [Component, setComponent] = useState(null);
  const [onClose, setOnClose] = useState(() => {});
  const [isOpen, setIsOpen] = useState(true);

  function createModal(component, onCloseCb) {
    setComponent(component);
    setOnClose(onCloseCb);
    setIsOpen(true);
  }

  function closeModal() {
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
