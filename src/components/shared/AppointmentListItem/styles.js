import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #03d403;
  border-right: 5px solid #009700;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  margin-bottom: 1rem;
  cursor: pointer;

  &.finished {
    border-right: 5px solid #f39c12;
    border: 1px solid #f39c12;
  }

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    border-right: 1px solid #03d403;
    width: 4rem;
  }

  .patient {
    margin-left: 0.5rem;
    margin-right: 1rem;
    .name {
      font-size: 1rem;
      font-weight: 600;
      margin-bottom: 0.1rem;
      color: #000;
    }

    .docid {
      font-size: 0.8rem;
      color: #848484;
    }
  }

  .time {
    color: #fff;
    padding: 0rem 1rem;
    margin-left: auto;
    align-self: stretch;
    background-color: #009700;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.2rem;
    }

    small {
      font-size: 1rem;
      font-weight: 800;
      margin-left: 0.2rem;
    }

    .date {
      font-weight: 500;
      font-size: 0.8rem;
    }
  }

  .finished {
    color: #fff;
    padding: 0rem 1rem;
    margin-left: auto;
    align-self: stretch;
    background-color: #f39c12;
    display: flex;
    flex-direction: column;
    justify-content: center;

    p {
      font-size: 1.5rem;
      font-weight: 800;
      line-height: 1.2rem;
    }

    small {
      font-size: 1rem;
      font-weight: 800;
      margin-left: 0.2rem;
    }

    .date {
      font-weight: 500;
      font-size: 0.8rem;
    }
  }
`;
