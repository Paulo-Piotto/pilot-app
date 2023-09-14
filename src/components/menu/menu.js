import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import {
  IoHomeOutline,
  IoPeopleOutline,
  IoTimeOutline,
  IoBriefcaseOutline,
  IoStorefrontOutline,
  IoCashOutline,
  IoReceiptOutline,
  IoFastFoodOutline,
  IoFileTrayFullOutline,
} from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import LogoutDialog from "../generics/logoutDialog";
import AuthContext from "../context/AuthContext";
import { MenuContainer, MenuItem, IconBox } from "./menuStyles";

export default function Menu({ setOpenDrawer }) {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);
  const [openLogout, setOpenLogout] = useState(false);

  function selectPage(page) {
    navigate(page);
    setOpenDrawer(false);
  }

  return (
    <>
      <MenuContainer>
        <MenuItem
          onClick={() => {
            selectPage("/");
          }}
        >
          <IconBox>
            <IoHomeOutline />
          </IconBox>
          <p>Pedidos</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/frequency");
          }}
        >
          <IconBox>
            <IoTimeOutline />
          </IconBox>
          <p>Presenças</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/employees");
          }}
        >
          <IconBox>
            <IoPeopleOutline />
          </IconBox>
          <p>Funcionários</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/clients");
          }}
        >
          <IconBox>
            <IoBriefcaseOutline />
          </IconBox>
          <p>Obras</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/stores");
          }}
        >
          <IconBox>
            <IoStorefrontOutline />
          </IconBox>
          <p>Lojas</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/payments");
          }}
        >
          <IconBox>
            <IoReceiptOutline />
          </IconBox>
          <p>Pagamentos</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/foodControl");
          }}
        >
          <IconBox>
            <IoFastFoodOutline />
          </IconBox>
          <p>Marmitas</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/incomes");
          }}
        >
          <IconBox>
            <IoCashOutline />
          </IconBox>
          <p>Entradas</p>
        </MenuItem>
        <MenuItem
          onClick={() => {
            selectPage("/loans");
          }}
        >
          <IconBox>
            <IoFileTrayFullOutline />
          </IconBox>
          <p>Empréstimos</p>
        </MenuItem>
        <MenuItem onClick={() => setOpenLogout(true)}>
          <IconBox>
            <RiLogoutBoxLine />
          </IconBox>
          <p>Sair</p>
        </MenuItem>
      </MenuContainer>
      <LogoutDialog
        openDialog={openLogout}
        handleCloseDialog={() => setOpenLogout(false)}
        handleSubmit={logout}
      />
    </>
  );
}
