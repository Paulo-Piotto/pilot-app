import styled from "styled-components";

const TableHeader = styled.div`
    width: 70.5vw;
    position: fixed;
    left: calc(51.75vw - 35vw);
    top: 25vh;
    font-family: 'Roboto', sans-serif;
    display: flex;
    font-size: 0.9rem;
    padding: 0 20px;

    p{
        width: 20%;
        font-weight: bold;
    }
`

const TableContainer = styled.div`
    width: 75vw;
    height: 69vh;
    position: fixed;
    left: calc(51.75vw - 37.5vw);
    top: 30vh;
    overflow-y: auto;
    font-family: 'Roboto', sans-serif;

    ::-webkit-scrollbar {
        width: 10px;
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 15px;
    }
        

    ::-webkit-scrollbar-thumb {
        background: #888; 
        border-radius: 15px;
    }


    ::-webkit-scrollbar-thumb:hover {
        background: #555; 
    }
`

const TableRow = styled.div`
    width: 70.5vw;
    height: 12%;
    background-color: #eaeaea;
    border-radius: 8px;
    margin-bottom: 10px;
    margin-left: calc(50% - 35vw);
    padding: 0 20px;
    display: flex;
    justify-content: ${(props) => !props.single ? "flex-start" : "space-between"};
    align-items: center;
    
`

const RowCell = styled.p`
    width: 20%;
    margin-right: ${(props) => !props.icon ? "20px" : "0"};
    display: flex;
    justify-content: ${(props) => !props.icon ? "flex-start" : "center"};
    align-items: center;
    font-size: ${(props) => !props.icon ? "0.8rem" : "1.2rem"};
`

export {
    TableContainer,
    TableRow,
    RowCell,
    TableHeader,
}