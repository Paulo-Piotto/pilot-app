import { TableRow, RowCell } from "../../styles/tableStyles";
import intToMoney from "../../services/utils/intToMoney";
import { sumTotal } from "../../services/utils/sumTotal";

export default function BalanceItem({rowData}){
    const ordersValue = intToMoney(sumTotal(rowData.orders));
    const incomesValue = intToMoney(sumTotal(rowData.incomes))
    const balance = intToMoney(sumTotal(rowData.incomes) - sumTotal(rowData.orders))
    const balanceColor = balance[0] === '-'? '#db0000' : '#047a0a'

    return(
        <TableRow>
            <RowCell>
                {rowData.name}
            </RowCell>
            <RowCell>
                {incomesValue}
            </RowCell>
            <RowCell>
                {ordersValue}
            </RowCell>
            <RowCell color={balanceColor} bold={true} >
                {balance}
            </RowCell>
        </TableRow>
    );
}

//color={'#047a0a'} color={'#db0000'}