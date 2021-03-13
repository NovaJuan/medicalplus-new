import styled from "styled-components";

export const Container = styled.div`
  h1 {
    font-weight: 600;
    font-size: 1.8rem;
    color: #008145;
    margin-bottom: 1rem;
  }

  h2 {
    padding-top: 1rem;
    font-weight: 600;
    font-size: 1.3rem;
    color: #008145;
    margin-bottom: 0.5rem;
    border-top: 1px solid #ccc;
  }

  p {
    margin-bottom: 0.5rem;
  }
  span {
    display: block;
    font-weight: 600;
  }

  .patient {
    display: flex;
    margin-bottom: 1rem;
  }

  .image {
    img {
      width: 10rem;
      border: 1px solid #008145;
    }
  }

  .info {
    width: 100%;
    margin-top: 1rem;
  }

  .appointment-info {
    display: flex;

    p {
      margin-right: 3rem;
    }
  }

  .options {
    display: flex;
    justify-content: flex-end;
  }

  .cancel {
    padding: 0.5rem 1rem;
    background-color: #e74c3c;
    color: #fff;
    cursor: pointer;
    border: none;
    outline: none;
  }

  .cancel:hover {
    background-color: #c0392b;
  }
`;

export const Loading = styled.div`
  text-align: center;
`;
