import { Container, ModalContent } from "./styles";
import { useCloseModal } from "../../../contexts/modal";

export default function ModalContainer({ children }) {
  const closeModal = useCloseModal();

  return (
    <Container onClick={closeModal}>
      <ModalContent>{children}</ModalContent>
    </Container>
  );
}
