import { Background, Header, Logo, IconButton } from "../styles/generalStyles";
import { useState } from "react";
import ControlPanel from "./controlPanel";
import { ControlPanelContextProvider } from "./context/ControlPanelContext";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Menu from "./menu/menu";

export default function Main() {
  const [openDrawer, setOpenDrawer] = useState(false);

  return (
    <Background>
      <>
        <Header>
          <IconButton onClick={() => setOpenDrawer(true)}>
            <MenuIcon sx={{ color: "#FAFAFA", fontSize: 30 }} />
          </IconButton>
          <Logo src="./assets/piotto-logo.png" />
        </Header>
        <Drawer
          anchor={"left"}
          open={openDrawer}
          onClose={() => setOpenDrawer(false)}
        >
          <Menu setOpenDrawer={setOpenDrawer} />
        </Drawer>
        <ControlPanelContextProvider>
          <ControlPanel />
        </ControlPanelContextProvider>
      </>
    </Background>
  );
}
