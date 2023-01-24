import styled from "styled-components";
import { motion } from "framer-motion";

export const AccordionContainer = styled(motion.div)`
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    margin-bottom: 40px;
    border-bottom: 2px solid var(--secondary-color);
    height: 120px;

    >main {
        display: flex;
        align-items: center;
        justify-content: space-around;

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
            margin-right: 5px;
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
        width: 60px;
        display: flex;
        align-items: center;
        justify-content: space-around;
        margin: 2px;

        >svg {
            
            :hover {
                cursor: pointer;
            }
    
        }
    }

`