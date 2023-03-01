import styled from "styled-components";

const CardsContainer = styled.div`
    width: 70vw;
    height: 12vh;
    position: fixed;
    top: 8vh;
    left: calc(51.75vw - 35vw);
    display: flex;
    justify-content: space-between;
`

const CardStyle = styled.div`
    width: ${props => props.width ?? "27%"};
    height: 100%;
    background-color: ${(props) => props.contrast ? "#E89D17" : "#EAEAEA"};
    color: ${(props) => props.contrast ? "white" : "black"};
    border-radius: 4px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 18px 27px;
    font-family: 'Roboto', sans-serif;
    transition: all ease-in-out 0.7s;

    &&:hover{
        cursor: ${(props) => props.contrast ? "" : "pointer"};
        filter: ${(props) => props.contrast ? "brightness(1)" : "brightness(1.2)"};
    }

    div {
        height: 70%;
        font-size: 2.5rem;
        display: flex;
        flex-direction: column;
        justify-content: end;
        padding-bottom: 2px;
    }

    section{
        height: 70%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
    }

    p{
        font-size: 0.85rem;
    }

    h2{
        font-size: 1.5rem;
    }

    h3{
        font-size: 1.6rem;
        font-weight: bold;
    }

    h4{
        font-size: 0.9rem;
    }
`

export {
    CardsContainer,
    CardStyle,
}