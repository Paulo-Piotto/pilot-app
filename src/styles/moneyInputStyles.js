import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";

const MoneyInput = styled(CurrencyInput)`
   width: 100%;
   border: none;
   color: ${(props) => !props.warning ? "black" : "#D33740"};
   border-bottom: ${(props) => !props.warning ? "1px solid rgba(0, 0, 0, 0.42)" : "2px solid #D33740"};
   height: 2.6em;
   outline: none;
   
   &&:hover{
    border-bottom: 2px solid black;
   }

   &&:focus{
    border-bottom: 2px solid #1976d2
}
`
const MoneyLabel = styled.p`
    font-family: 'Roboto', sans-serif;
    font-size: 0.7rem;
    margin-top: 8px;
    color: #6F6767;
`

export {
    MoneyInput,
    MoneyLabel,
}