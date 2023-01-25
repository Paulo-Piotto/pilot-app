import { Background, Header, Logo, SideMenu, IconsContainer, IconBox } from "../styles/generalStyles";
import { IoHomeOutline, IoPeopleOutline, IoTimeOutline, IoBriefcaseOutline, IoStorefrontOutline, IoCashOutline } from "react-icons/io5";
import { RiLogoutBoxLine } from "react-icons/ri";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import ControlPanel from "./controlPanel";
import AuthContext from "./context/AuthContext";
import LogoutDialog from "./generics/logoutDialog";
import { ControlPanelContextProvider } from "./context/ControlPanelContext";

export default function Main(){
    const { logout } = useContext(AuthContext);
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState('home');
    const [openLogout, setOpenLogout] = useState(false);

    function selectPage(icon, page){
        setSelectedIcon(icon)
        navigate(page);
    }

    return(
        <Background>
            <Header>
                <Logo src="./assets/piotto-logo.png" />
            </Header>
            <SideMenu>
                <IconsContainer>
                    <IconBox isSelected={selectedIcon==="home" ? true : false} onClick={() => {selectPage('home', '/')}}>
                        <IoHomeOutline />
                    </IconBox>
                    <IconBox isSelected={selectedIcon==="time" ? true : false} onClick={() => {selectPage('time', '/development')}}>
                        <IoTimeOutline />
                    </IconBox>
                    <IconBox isSelected={selectedIcon==="employees" ? true : false} onClick={() => {selectPage('employees', '/development')}}>
                        <IoPeopleOutline />
                    </IconBox>
                    <IconBox isSelected={selectedIcon==="clients" ? true : false} onClick={() => {selectPage('clients', '/clients')}}>
                        <IoBriefcaseOutline />
                    </IconBox>
                    <IconBox isSelected={selectedIcon==="stores" ? true : false} onClick={() => {selectPage('stores', '/stores')}}>
                        <IoStorefrontOutline />
                    </IconBox>
                    <IconBox isSelected={selectedIcon==="incomes" ? true : false} onClick={() => {selectPage('incomes', '/incomes')}}>
                        <IoCashOutline />
                    </IconBox>
                    <IconBox onClick={() => setOpenLogout(true)}>
                        <RiLogoutBoxLine />
                    </IconBox>
                </IconsContainer>
            </SideMenu>
            <LogoutDialog openDialog={openLogout} handleCloseDialog={() => setOpenLogout(false)} handleSubmit={logout} />
            <ControlPanelContextProvider><ControlPanel /></ControlPanelContextProvider>
        </Background>
    );
};

