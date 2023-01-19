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