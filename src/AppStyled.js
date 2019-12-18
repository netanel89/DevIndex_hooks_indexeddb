import styled from "styled-components";

export const AppWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: auto;
  margin-right: auto;
  align-items: center;
  padding: 30px;
`;

export const TopBodyWrapper = styled.div`
  max-width: 600px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

export const SiteItemsWrapper = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  width: 100%;
  /* > div {
    flex: ${({ category }) => (category === 1 ? 1 / 3 : 1 / 6)};
  } */
`;

export const Input = styled.input`
  flex: 1;
  align-self: stretch;
  padding: 5px;
  background-color: #ffeeee;
  border: 1px solid #999;
  font-size: 20px;
  margin: 15px 5px 30px;
  border-radius: 5px;
`;

export const Note = styled.div`
  color: #333;
  display: ${({ hide }) => (hide ? "none" : "flex")};
  /* text-decoration: ${({ isLink }) => (isLink ? "underline" : "none")}; */
  cursor: ${({ isLink }) => (isLink ? "pointer" : "none")};
`;

export const SiteItemContainer = styled.a`
  position: relative;
  display: flex;
  flex-direction: column;
  cursor: pointer;
  align-self: flex-end;
  transition: all 0.2s ease-in;
  border: 1px solid #999;
  border-radius: 5px;
  margin: 5px;
  text-decoration: none;
  color: inherit;
  ${({ group }) => {
    let result = "";
    switch (group) {
      case 1:
        result = "padding: 20px;font-size: 2.5em;";
        break;
      case 2:
        result = "padding: 16px;font-size: 2.1em;";
        break;
      case 3:
        result = "padding: 12px;font-size: 1.8em;";
        break;
      default:
        result = "padding: 8px;font-size: 1.5em;";
    }
    return result;
  }};

  span {
    transition: all 0.2s ease-in;
  }
  &:hover {
    background-color: ${({ group }) => {
      let result = "#fbf5b5";
      switch (group) {
        case 1:
          result = "#71a6f2";
          break;
        case 2:
          result = "#76ddc1";
          break;
        case 3:
          result = "#f07777";
          break;
        case 4:
          result = "#f2e45e";
          break;
        default:
      }
      return result;
    }};
    span {
      color: #f22;
    }
  }

  background-color: ${({ group }) => {
    let result = "initial";
    switch (group) {
      case 1:
        result = "#90d8fa";
        break;
      case 2:
        result = "#9dd8c8";
        break;
      case 3:
        result = "#f09595";
        break;
      case 4:
        result = "#fff590";
        break;
      default:
    }
    return result;
  }};
`;

export const SiteItemHeader = styled.div`
  display: flex;
  flex: 1;
  justify-content: center;
`;

export const SiteItemLogo = styled.img`
  width: 200px;
  height: 90px;
`;

export const SmallPlusStyled = styled.span`
  padding-right: 5px;
`;

export const Logo = styled.div`
  padding: 0 0 30px 0;
  display: flex;
  justify-content: center;
  font-size: 40px;
  font-weight: bold;
  font-family: sans-serif;
  color: #23b9ff;
  text-shadow: 1px 1px 1px #9a9a9a;
`;

const SiteItmeFooterContainer = styled.div`
  display: flex;
`;
