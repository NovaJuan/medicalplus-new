import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid #03d403;
  border-right: 5px solid #009700;
  box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
  cursor: pointer;
  background-color: #fff;
  margin-bottom: 1rem;

  &:hover {
    background-color: #f0f0f0;
  }

  img {
    border-right: 1px solid #03d403;
    width: 4rem;
  }

  .info {
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

  .last-visit {
    color: #00a808;
    font-size: 0.7rem;
    padding-left: 0.7rem;
    padding-right: 0.7rem;
    text-align: right;
    margin-left: auto;
    span {
      display: block;
      font-size: 1rem;
      font-weight: 600;
    }
  }
`;
