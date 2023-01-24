import styled from "styled-components";
import { motion } from "framer-motion";

export const ControlPanelSliderContainer = styled(motion.section)`
    position: fixed;
    bottom: 0px;
    left: 0px;
    width: 100%;
    background-color: var(--primary-color);
    color: #FFF;
    z-index: 10;
    box-shadow: rgba(0, 0, 0, 0.35) 0px -50px 36px -28px inset;
    padding: 0px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-family: var(--base-font);
    font-weight: 500;
`

export const FloaterMenuContainer = styled.div`
    background-color: #3f4a5c;
    width: 56px;
    height: 56px;
    border-radius: 28px;
    position: fixed;
    bottom: 25px;
    right: 25px;
    display: grid;
    align-items: center;
    justify-items: center;
    cursor: pointer;
    z-index: 15;
`

export const NavigatorContainer = styled.aside`
    background-color: #D6D1C4;
    color: var(--primary-color);
    height: inherit;
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    flex-direction: column;
    border-radius: 0px 10px 0px 0px;
    
    >header {
        margin: 20px;
        font-family: 'Roboto', sans-serif;

        >h1 {
            font-size: 1.3rem;
            margin-bottom: 5px;
        }

        >p {
            font-size: 1.1rem;
        }
    }

    >nav {
        width: 100%;
        text-align: center;
    }
`

const liSelectedOrHoveredCssString = "background-size: 100% 3px; cursor: pointer;"
export const ControlOption = styled.li`
    background-image: linear-gradient(0deg, #43505F, #43505F);
    background-size: 0% 3px;
    background-repeat: no-repeat;
    background-position: left bottom;
    transition: background-size 300ms ease;
    margin-bottom: 10px;
    padding-bottom: 5px;
    font-weight: ${props => props.isSelected ? "700" : "500"};

    ${props => props.isSelected ? liSelectedOrHoveredCssString : `:hover{${liSelectedOrHoveredCssString}}`}
`