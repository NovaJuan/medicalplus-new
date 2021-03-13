import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  z-index: 99999;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 4rem 1rem;
`;

export const ModalContent = styled.div`
  background-color: #fff;
  width: 100%;
  max-width: 40rem;
  margin: 0 auto;
  padding: 2rem;
  position: relative;

  .close-btn {
    top: -3rem;
    right: -3rem;
    position: absolute;
    font-size: 2rem;
    z-index: 9999999;
    color: #fff;
    font-weight: 600;
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem 1rem;
    outline: none;
  }
`;
