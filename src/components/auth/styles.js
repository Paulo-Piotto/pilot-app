import styled from "styled-components";
import * as gs from "../../styles/generalStyles";
import { motion } from "framer-motion";
import TextField from '@mui/material/TextField';

export const SendButton = styled(motion.button)`
    align-self: center;
    margin-top: 30px;
    align-items: center;
    background: none;
    outline: none;
    border: none;
    border-radius: 20%;
    cursor: pointer;
`

export const Background = styled(gs.Background)`
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: center;
`

export const TrackContainer = styled(motion.div)`
    background-color: #D6D1C4;
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
    background-color: #131E29;
    position: absolute;
    top: -2.5%;
    left: 0px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    flex-direction: column;
    border-radius: 5px;
    box-shadow: rgba(0, 0, 0, 0.55) 0px 5px 15px;
    z-index: 10;

    >img {
        width: 65%;
    }

    p {
        color: #fff;
        font-family: 'Arya', sans-serif;
        border-bottom: 1px solid #FFF;
        padding: 1px;
        cursor: pointer;

        :hover {
            text-shadow: 1px 1px 2px #43505F;
            transition: ease 0.5s;
        }
    }
`

export const AuthContainer = styled(motion.section)`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    #alert   {
        position: absolute;
        top: 20px
    }

    h2 {
        font-size: 30px;
        margin-bottom: 30px;
        font-family: 'Arya', sans-serif;
        color: #131E29;
        font-weight: bold;
    }

    >form {
        display: flex;
        flex-direction: column;

        >div {
            margin-top: 20px;
            outline-color: red;
            border-color: red;
        }

        #submit-button {
            width: 40px !important;
            border-radius: none;
            
            svg {
                font-size: 20px;
            }
        }
    }
`

// https://stackoverflow.com/questions/67139471/how-can-i-change-the-focused-color-of-a-textfield
export const CssTextField = styled(TextField, { shouldForwardProp: (props) => props !== "focuscolor" })
    ((p) => ({
        // input label when focused
        "& label.Mui-focused": {
            color: p.focuscolor
        },
        // focused color for input with variant='standard'
        "& .MuiInput-underline:after": {
            borderBottomColor: p.focuscolor
        },
        // focused color for input with variant='filled'
        "& .MuiFilledInput-underline:after": {
            borderBottomColor: p.focuscolor
        },
        // focused color for input with variant='outlined'
        "& .MuiOutlinedInput-root": {
            "&.Mui-focused fieldset": {
                borderColor: p.focuscolor
            }
        }
}));