import styled from "styled-components";
import { CardStyle, CardsContainer } from "../../styles/cardStyles";
import Card from "../generics/card";
import { TableContainer } from "../../styles/tableStyles";
import { motion } from "framer-motion";

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
    border-radius: 5px;

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
    justify-content: flex-start;
    height: 100%;
`

export const ExpanderContainer = styled(motion.div)`
    background-color: ${props => props.backgroundColor ?? "inherit"};
    height: 100%;
    padding: 10px;
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    color: ${ props => props.textColor ?? "#fff" };

    h1 {
        font-size: 1.2rem;
        text-align: center;
        margin-bottom: 60px;
        padding: 10px;
        width: 100%;
    }

    .children_container {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: column;;
    }
`

export const WorkDayContainer = styled.rect`
    width: 20px;
    height: 20px;
    rx: 5px;
    ry: 5px;
    border-radius: 3px;
    stroke: #43505f;
    fill: ${props => props.colorize ? "#131e31" : "#fff"};
    shape-rendering: geometricPrecision;
`

export const ClientsFilterContainer = styled.section`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: flex-start;
    width: 100%;
    background-color: #131e31;
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
    background-color: inherit;
    border: 2px solid ${props => props.isClicked ? "#d79318" : "#A2A9AD" };
    border-radius: 5px;
    color: ${props => props.isClicked ? "#d79318" : "inherit" };
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

export const EmployeeCardContainer = styled.div`
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-wrap: nowrap;
    padding: 10px;
    border: 2px solid #fff;
    border-radius: 5px;
    color: #fff;
    font-weight: bold;
    margin-bottom: 10px;
    width: 100%;
    max-width: 500px;
    background-color: ${props => props.isSelected ? "green" : "unset"};

    .employee_name {
        font-size: 1rem;
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100%;
    }

    .employee_detail {
        font-size: 1rem;
    }

    #punch_card_preview {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 200px;
        height: 100%;
    }

    #icons_container {
        cursor: pointer;
    }

    @media screen and (max-width: 900px) {
        flex-direction: column;

        .employee_name {
            margin-bottom: 5px;
        }
    }

`

export const EmployeeRecordContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;

    .employee_record_cell {
        margin-bottom: 10px;
        display: flex;
        align-items: center;
        justify-content: space-between;
        width: 100%;
        max-width: 500px;
        border-bottom: 2px solid #131E29;

        span {
            background-color: #131E29;
            color: #fff;
            width: 150px;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 5px 3px;
            border-radius: 5px 5px 0px 0px;
            font-weight: bold;
        }
    }

    .punch_card {
        width: 100%;
        margin-top: 40px;
    }
`

export const PunchCardContainer = styled.svg`
    width: 100%;
    height: 100%;

    text {
        font-size: 13px;
    }


`

export const WorkDayDialogLoadingContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`

export const UnactiveMotionTitle = styled(motion.h2)`
    writing-mode: vertical-rl;
    text-orientation: upright;
    position: absolute;
    top: 8%;
    left: 10px;
    font-weight: bold;

    &:hover {
        cursor: pointer
    }
`

export const MassEditorContainer = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
`

export const ActionsContainer = styled.div`
    margin-bottom: 20px;
    border-top: 1px solid #fff;
    border-bottom: 1px solid #fff;
    padding: 5px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.9rem;
    overflow: auto;

    select {
        
    }

    .action {
        margin: 0px 10px 0px 5px;
        display: flex;
        flex-direction: row;

            label {
                
            }

    }

    .save_mass_action {
        position: sticky;
        right: 5px;
    }

    &::-webkit-scrollbar {
        display: none;
    }
`