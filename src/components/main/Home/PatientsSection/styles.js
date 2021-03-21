import styled from "styled-components";

export const Container = styled.div`
  padding-right: 2rem;
  border-right: 1px solid #ccc;

  .header {
    width: 100%;
    align-items: center;
    margin-bottom: 0.8rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    h1 {
      color: #008145;
      font-size: 1.5rem;
      font-weight: 700;
    }

    .links {
      padding: 0.4rem;
    }

    a {
      text-decoration: none;
      color: #7f8c8d;
      font-weight: 500;
      padding: 0.4rem 1rem;
      display: inline-block;
      font-size: 0.9rem;
    }

    a:hover {
      color: #008145;
    }

    a:not(:last-child) {
      border-right: 1px solid #008145;
    }
  }

  .search {
    margin-bottom: 1.5rem;
    .search-bar {
      display: flex;
      align-items: center;
      border-bottom: 1px solid #949494;

      img {
        width: 1.2rem;
      }

      input {
        width: 100%;
        background: none;
        color: #008145;
        border: none;
        height: 2rem;
        outline: none;
        &::placeholder {
          color: rgba(0, 129, 69, 0.6);
        }
      }

      button {
        cursor: pointer;
        outline: none;
        height: 2rem;
        background: none;
        border: none;
      }
    }
  }

  section {
    h2 {
      font-size: 1rem;
      font-weight: 600;
      color: #008145;
      text-transform: uppercase;
      margin-bottom: 1rem;
    }
  }

  & section {
    .patients-wrapper {
      display: grid;
      grid-template-columns: 1fr;
      column-gap: 1rem;
      flex-wrap: wrap;
      overflow-y: overlay;
      max-height: calc(100vh - 20rem);
      padding-right: 1rem;

      @media (min-width: 1130px) {
        grid-template-columns: 1fr 1fr;
      }
    }
  }
`;
