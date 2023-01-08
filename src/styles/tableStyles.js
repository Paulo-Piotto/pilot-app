import styled from "styled-components";

const HeaderContainer = styled.div`
    width: 72vw;
    position: fixed;
    left: calc(51.75vw - 35.25vw);
    top: 25vh;
    font-family: 'Roboto', sans-serif;
`

const TableHeader = styled.div`
    width: 70.5vw;
    height: 7.8vh;
    top: 25vh;
    padding: 0 20px;
    display: flex;
    //margin-left: calc(50% - 35vw);
    justify-content: space-between;
    align-items: center;
    background-color: #4D5666;
    border-radius: 4px 4px 0 0;
    color: white;

    p{
        width: 12%;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 0.8rem;
    }
`

const TableContainer = styled.div`
    width: 72vw;
    height: 62.4vh;
    position: fixed;
    left: calc(51.75vw - 35.25vw);
    top: 32.8vh;
    overflow-y: auto;
    font-family: 'Roboto', sans-serif;

    ::-webkit-scrollbar {
        width: 7.5px;
    }

    ::-webkit-scrollbar-track {
        background: none;
        border-radius: 15px;
    }
        

    ::-webkit-scrollbar-thumb {
        background: #888; 
        border-radius: 15px;
    }


    ::-webkit-scrollbar-thumb:hover {
        transition: all ease-in-out 0.7s;
        background: #555; 
    }
`

const TableRow = styled.div`
    width: 70.5vw;
    height: 7.8vh;
    background-color: #eaeaea;
    border-bottom: 1px solid lightgray;
    /* border-radius: 8px; */
    /* margin-bottom: 10px; */
    //margin-left: calc(50% - 35vw);
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    
    &:last-child{
        border-radius: 0 0 4px 4px;
    }
`

const RowCell = styled.p`
    width: 12%;
    display: flex;
    justify-content: ${(props) => !props.icon ? "flex-start" : "flex-end"};
    align-items: center;
    font-size: ${(props) => !props.icon ? "0.8rem" : "1.2rem"};
    color: ${(props) => !props.color ? "black" : props.color};
    font-weight: ${(props) => !props.bold ? "400" : 'bold'};
`

export {
    TableContainer,
    TableRow,
    RowCell,
    TableHeader,
    HeaderContainer,
}