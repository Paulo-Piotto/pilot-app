import styled from "styled-components";

export default function InProgress(){
    return(
        <Container>
            <p>
                Oops... Não há nada para ver aqui, volte em breve para novidades :)
            </p>
        </Container>
    );
}

const Container = styled.div`
    width: 50vw;
    height: 30vh;
    background-color: rgba(0,0,0,0.4);
    position: fixed;
    top: calc(50vh - 15vh);
    left: calc(51.75vw - 25vw);
    border: none;
    border-radius: 4px;
    font-family: 'Roboto', sans-serif;
    font-size: 1.2rem;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
`

export {
    Container,
}