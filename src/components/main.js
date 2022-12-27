import { Background, Header, Logo, SideMenu, IconsContainer, IconBox } from "../styles/generalStyles";
import { IoHomeOutline, IoPeopleOutline, IoTimeOutline, IoBriefcaseOutline, IoStorefrontOutline, IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export default function Main(){
    const navigate = useNavigate();
    const [selectedIcon, setSelectedIcon] = useState('home');

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
                </IconsContainer>
            </SideMenu>
        </Background>
    );
};

