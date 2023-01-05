import styled from "styled-components";
import * as gs from "../../styles/generalStyles";
import { motion } from "framer-motion";

export const Background = styled(gs.Background)`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const TrackContainer = styled.div`
    background-color: blue;
    width: 80%;
    height: 80%;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 20px;
`

export const SliderContainer = styled(motion.div)`
    height: 100%;
    width: 50%;
    background-color: yellow;
    position: absolute;
    top: 0px;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: center;
`

export const SliderButton = styled.button`
    background-color: white;
    width: 120px;
    height: 30px;
    outline: none;
`