import styled from "styled-components";

const MenuContainer = styled.div`
  width: 230px;
  height: 95vh;
  display: flex;
  flex-direction: column;
  padding: 35px 0 20px 0;
  font-family: "Roboto", sans-serif;
`;

const MenuItem = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  align-items: center;
  padding-left: 20px;

  &:hover {
    color: white;
    cursor: pointer;
    background-color: #131e31;
  }

  &:active {
    color: #e89d17;
  }
`;

const IconBox = styled.div`
  margin-right: 15px;
  font-size: 20px;
`;

export { MenuContainer, MenuItem, IconBox };
