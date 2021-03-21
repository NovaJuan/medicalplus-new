import styled from "styled-components";

export const Container = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Spinner = styled.div`
  width: 5rem;
  height: 5rem;
  border: 4px solid #fff;
  border-top: 4px solid green;
  border-radius: 50%;
  animation: spin 0.7s ease infinite;

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
