import { Container, ModalContent } from "./styles";
import { useCloseModal } from "../../../contexts/modal";

export default function ModalContainer({ children }) {
  const closeModal = useCloseModal();

  function onCloseModal(e) {
    if (
      e.target.id === "modal-container" ||
      e.target.id === "modal-close-btn"
    ) {
      closeModal();
    }
  }

  return (
    <Container onClick={onCloseModal} id="modal-container">
      <ModalContent>
        <button className="close-btn" id="modal-close-btn">
          &times;
        </button>
        {children}
      </ModalContent>
    </Container>
  );
}
