import styled from "styled-components";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background: rgb(207, 206, 203);
  background-image: linear-gradient(
      180deg,
      rgba(207, 206, 203, 0.95) 0%,
      rgba(207, 206, 203, 0.9) 50%,
      rgba(207, 206, 203, 0.8) 100%
    ),
    url("./assets/padrao-pontes.jpg");
`;

const Header = styled.header`
  width: 100%;
  height: 15%;
  background-color: #131e31;
  position: fixed;
`;

const Logo = styled.img`
  width: 18%;
`;

const SideMenu = styled.div`
  min-width: 50px;
  width: 3.5vw;
  height: 100%;
  background-color: #3f4a5c;
`;

const IconsContainer = styled.div`
  height: 95%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  color: #bababa;
  padding-top: 24vh;
  font-size: 1.8rem;
  transition: all ease-in-out 0.7s;

  div:hover {
    color: #e89d17;
    cursor: pointer;
  }
`;
const IconBox = styled.div`
  background-color: ${(props) =>
    props.isSelected ? "#131E31" : "transparent"};
  width: 100%;
  padding: 10px;
  box-shadow: ${(props) =>
    props.isSelected ? "inset 2px 2px 8px rgba(0, 0, 0, 0.7)" : "none"};
  color: ${(props) => (props.isSelected ? "#E89D17" : "#BABABA")};

  display: flex;
  justify-content: center;

  transition: ease-in-out 0.2s;
`;

const EditIcon = styled(IoPencilSharp)`
  margin-right: 30px;
  transition: all ease-in-out 0.2s;
  &&:hover {
    color: blue;
    cursor: pointer;
  }
`;
const DeleteIcon = styled(IoTrashOutline)`
  transition: all ease-in-out 0.2s;
  &&:hover {
    color: red;
    cursor: pointer;
  }
`;

const Clear = styled.p`
  position: fixed;
  left: 7vw;
  top: 18vh;
  font-family: "Roboto", sans-serif;
  font-size: 0.75rem;
  transition: all ease-in-out 0.1s;
  &&:hover {
    color: #605c57;
    cursor: pointer;
  }
`;

const Loading = styled.div`
  position: fixed;
  width: 10vw;
  font-family: "Roboto", sans-serif;
  top: calc(50vh - 1.5vh);
  left: calc(50vw - 5vh);
  text-align: center;
  height: 3vh;
`;

const PrintButton = styled.div`
  position: absolute;
  top: calc(50% - 3.25vh);
  right: 2.25%;
  height: 6.5vh;
  width: 6.5vh;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 100%;
  transition: all ease-in-out 0.2s;

  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
    cursor: pointer;
  }

  &:active {
    background-color: rgba(0, 0, 0, 0.6);
  }
`;

const TrashButton = styled(PrintButton)`
  right: 7%;
`;

export {
  Background,
  Header,
  Logo,
  SideMenu,
  IconsContainer,
  IconBox,
  EditIcon,
  DeleteIcon,
  Clear,
  Loading,
  PrintButton,
  TrashButton,
};
