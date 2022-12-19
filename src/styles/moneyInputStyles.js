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

export {
    MoneyInput,
}