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
        border-right: 2px solid red;
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