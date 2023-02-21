import styled from "styled-components";
import { CardStyle, CardsContainer } from "../../styles/cardStyles";
import Card from "../generics/card";
import { TableContainer } from "../../styles/tableStyles";
import { motion } from "framer-motion";

export const PunchCardContainer = styled.section`
    
`

export const AdaptedCardsContainer = styled(CardsContainer)`
    justify-content: space-evenly;
`

export const DatePickerCardStyle = styled(CardStyle)`
    flex-direction: column;
    justify-content: space-around;
    padding: 15px 9px 0px 9px;
    height: calc(100% + 1px);
    max-width: 270px;

    div {
        font-size: 1rem;
        display: flex;
        flex-direction: row;
        justify-content: end;
        padding-bottom: 0px;
        margin: 0px;
    }
`

export const SearchBarCardStyle = styled(Card)`
    width: 54%;
`

export const MainContentContainer = styled(TableContainer)`
    display: flex;
    background-color: #eaeaea;
    flex: 1;
    max-width: 1920px;

    #client_section {
        width: 30%;
    }

    #expander_section {
        width: 70%;
    }
`

export const ExpanderMenuContainer = styled(motion.section)`
    display: flex;
    align-items: flex-start;
    justify-content: center;
    background-color: aquamarine;
    height: 100%;
`

export const ExpanderContainer = styled(motion.div)`
    background-color: ${props => props.backgroundColor ?? "inherit"};
    height: 100%;
`

export const WorkDayContainer = styled.div`
    width: 10px;
    height: 10px;
    border-radius: 5px;
    background-color: ${props => props.color ?? "#ffffff"};
    border: 1px solid var(--primary-color);
`

export const ClientsFilterContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    background-color: #43505F;
    color: #fff;
    height: 100%;
    padding: 10px;

    h1 {
        font-size: 1.2rem;
        width: 100%;
        text-align: center;
        margin-bottom: 20px;
        padding: 10px;
    }
`

export const ClientCardContainer = styled.div`
    width: 100%;
    padding: 10px;
    margin-bottom: 10px;
    background-color: ${props => props.isClicked ? "#A2A9AD" : "inherit" };
    border: 2px solid #A2A9AD;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    cursor: pointer;

    .client_name {
        font-size: 1.1rem;
        margin-bottom: 5px;
    }

    .client_detail {
        font-size: .9rem;
    }
`