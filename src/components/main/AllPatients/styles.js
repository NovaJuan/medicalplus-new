import styled from "styled-components";

export const Container = styled.div`
  .header {
    display: flex;
    width: 100%;
    align-items: center;
    margin-bottom: 0.8rem;

    h1 {
      color: #008145;
      font-size: 1.5rem;
      font-weight: 700;
      margin-right: 2rem;
    }

    a {
      text-decoration: none;
      color: #fff;
      background-color: #008145;
      font-weight: 500;
      padding: 0.6rem 1rem;
    }
  }

  .search {
    margin-bottom: 1.5rem;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: 100%;

    .get-finished {
      width: 100%;
      display: flex;
      align-items: center;
      margin-top: 0.5rem;
      input {
        margin-right: 0.5rem;
      }
    }

    .use-calendar {
      background-color: #fff;
      border: 1px solid #ccc;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      color: #009b29;
      font-weight: 600;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
    }

    .clean-search {
      background-color: #fff;
      border: 1px solid red;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      color: red;
      font-weight: 600;
      padding: 0.5rem 1rem;
      font-size: 1rem;
      cursor: pointer;
      margin-left: 1rem;
    }

    .search-bar {
      width: 30rem;
      margin-right: 2rem;
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
        margin-left: 0.5rem;
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

    .patients-wrapper {
      width: 100%;
      border: 1px solid #ccc;
      min-height: 22rem;
      padding: 0.5rem;
    }

    .patients-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      column-gap: 1rem;
      overflow-y: overlay;
      padding-right: 1rem;
      @media (min-width: 1130px) {
        grid-template-columns: 1fr 1fr 1fr;
      }
    }
  }

  .pagination {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 1rem;
    .change-page-btn {
      background: none;
      border: none;
      cursor: pointer;
      color: #008145;
      padding: 0.5rem;
    }

    .page {
      color: #8f8f8f;
      display: flex;
      flex-direction: column;
      align-items: center;
      margin: 0 1rem;
      span {
        margin-top: 0.1rem;
        color: #000;
        font-weight: 600;
      }
    }
  }
`;
