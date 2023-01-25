import styled from "styled-components";
import { motion } from "framer-motion";

export const AccordionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 2px solid var(--secondary-color);
    gap: 0px 20px;
    flex-wrap: wrap-reverse;

    >main {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 0 5px;
        flex-wrap: wrap;

        select {
            background: none;
            border: none;
            color: #fff;
            outline: none;

            option {
                background-color: var(--primary-color);
                color: var(--secondary-color); 
                border: none !important;
                outline: none !important;
                
                :hover {
                    cursor: pointer;
                }
            }
        }

        >label {
            color: var(--tertiary-grey);
            border-left: 2px solid var(--tertiary-grey);
            padding-left: 3px;
            border-radius: 2px;
        }

        >input {
            background: none;
            color: #fff;
            outline: none;
            border: none;
            padding: 2px;
            font-size: 1.1rem;
        }
    }

    >div {
        display: flex;
        align-items: center;
        justify-content: space-around;
        gap: 10px;

        >svg {
            
            :hover {
                cursor: pointer;
            }
    
        }
    }

`