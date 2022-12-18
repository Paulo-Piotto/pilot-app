import styled from "styled-components";

const Background = styled.div`
    width: 100vw;
    height: 100vh;
    background: rgb(207,206,203);
    background-image: linear-gradient(180deg, rgba(207,206,203,0.95) 0%, rgba(207,206,203,0.9) 50%, rgba(207,206,203,0.8) 100%), url('./assets/padrao-pontes.jpg');
`

const Header = styled.header`
    width: 100%;
    height: 20%;
    background-color: #131E31;
    position: fixed;
`

const Logo = styled.img`
    width: 18%;
`

const SideMenu = styled.div`
    min-width: 50px;
    width: 3.5vw;
    height: 100%;
    background-color: #3F4A5C;
`

const IconsContainer = styled.div`
    height: 75%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    color: #bababa;
    padding-top: 24vh;
    font-size: 1.8rem;

    div:hover{
        color: white;
        cursor: pointer;
    }
`

export {
    Background,
    Header,
    Logo,
    SideMenu,
    IconsContainer,
}