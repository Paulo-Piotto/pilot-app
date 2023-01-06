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
    background-color: #d6d6d6;
    width: 80%;
    height: 80%;
    border-radius: 5px;
    position: relative;
    display: flex;
    justify-content: space-around;
    padding: 20px;
`

export const SliderContainer = styled(motion.div)`
    height: 105%;
    width: 50%;
    background-color: #131E31;
    position: absolute;
    top: -2.5%;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 5px 15px;

    img {
        width: 65%;
    }
`

export const SliderButton = styled.button`
    background-color: white;
    width: 120px;
    height: 30px;
    outline: none;
`

export const AuthContainer = styled.section`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    h2 {
        font-size: 30px;
        margin-bottom: 30px;
    }

    >form {
        display: flex;
        flex-direction: column;

        >label {
            margin: 20px 0px 5px 0px;
        }
    }
`