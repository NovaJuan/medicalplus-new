import styled from "styled-components";

export const Container = styled.div`
  text-align: center;

  .react-calendar {
    margin: 0 auto;
    width: 100%;
    max-width: 30rem;
    margin-bottom: 1rem;
  }

  h1 {
    font-size: 2rem;
    font-weight: 600;
    color: #008145;
    margin-bottom: 0.5rem;
  }

  .options {
    display: flex;
    justify-content: center;

    button {
      padding: 0.5rem 1rem;
      border: none;
      color: #fff;
      font-weight: 600;
      cursor: pointer;
    }

    .search {
      background-color: #008145;
    }

    .cancel {
      background-color: #e74c3c;
      margin-left: 2rem;
    }
  }
`;
