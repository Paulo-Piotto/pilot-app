import styled from "styled-components";
import CurrencyInput from "react-currency-input-field";

const MoneyInput = styled(CurrencyInput)`
   width: 100%;
   border: none;
   border-bottom: 1px solid rgba(0, 0, 0, 0.42);
   height: 2.6em;
   outline: none;
   margin-top: 10px;
   
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