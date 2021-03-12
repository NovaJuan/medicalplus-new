import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 3rem;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 1rem;
`;
