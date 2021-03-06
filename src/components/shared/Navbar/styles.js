import styled from "styled-components";

export const Container = styled.nav`
  background-color: #00b460;
  width: 100%;
  box-shadow: 0px 3px 6px rgba(0, 0, 0, 0.3);

  .nav-container {
    display: flex;
    width: 100%;
    padding: 1rem 3rem;
    justify-content: space-between;
    align-items: center;
  }

  .nav-logo {
    display: block;
    img {
      width: 7rem;
    }
  }

  .nav-links {
    margin-left: auto;
    flex: 0;
    display: flex;
    align-items: center;

    .link {
      position: relative;
      margin: 0 0.2rem;
    }

    .label {
      padding: 0.5rem 1rem;
      color: #fff;
      text-decoration: none;
      font-weight: 600;
      display: flex;
      cursor: pointer;
    }

    img {
      width: 13px;
      margin-left: 0.3rem;
    }

    .dropdown {
      position: absolute;
      top: 100%;
      right: 0;
      list-style: none;
      padding: 0.2rem 0.7rem;
      background-color: #fff;
      border-radius: 2px;
      box-shadow: 0px 0px 5px rgba(0, 0, 0, 0.3);
      z-index: 9999;

      span {
        display: block;
        a {
          white-space: nowrap;
          display: block;
          text-align: right;
          color: #1e1e1e;
          cursor: pointer;
          text-decoration: none;
          padding: 0.5rem 0.7rem;
          font-size: 0.9rem;
        }

        a:hover {
          color: #00b460;
        }
      }
      span:not(:last-child) a {
        border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      }

      display: none;
    }

    .link:hover .dropdown {
      display: block;
    }
  }
`;
