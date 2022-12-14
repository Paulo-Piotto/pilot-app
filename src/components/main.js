import { Background, Header, Logo, SideMenu, IconsContainer } from "../styles/generalStyles";
import { IoHomeOutline, IoPeopleOutline, IoAddCircleOutline, IoTimeOutline, IoBriefcaseOutline, IoStorefrontOutline, IoEllipsisHorizontalCircleOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

export default function Main(){
    const navigate = useNavigate();
    return(
        <Background>
            <Header>
                <Logo src="./assets/piotto-logo.png" />
            </Header>
            <SideMenu>
                <IconsContainer>
                    <div onClick={() => navigate('/')}>
                        <IoHomeOutline />
                    </div>
                    <div>
                        <IoAddCircleOutline />
                    </div>
                    <div>
                        <IoTimeOutline />
                    </div>
                    <div onClick={() => navigate('/employees')}>
                        <IoPeopleOutline />
                    </div>
                    <div>
                        <IoBriefcaseOutline />
                    </div>
                    <div onClick={() => navigate('/stores')} >
                        <IoStorefrontOutline />
                    </div>
                    <div>
                        <IoEllipsisHorizontalCircleOutline />
                    </div>
                </IconsContainer>
            </SideMenu>
        </Background>
    );
};