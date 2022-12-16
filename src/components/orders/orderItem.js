import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";

export default function OrderItem({rowData}){
    const date = dayjs(rowData.date).format('DD/MM/YYYY');

        return(
            <TableRow>
                <RowCell>
                    {rowData.invoice}
                </RowCell>
                <RowCell>
                    {rowData.clients.name}
                </RowCell>
                <RowCell>
                {rowData.stores.name}
                </RowCell>
                <RowCell>
                    R$ {Number(rowData.value/100).toFixed(2)}
                </RowCell>
                <RowCell >
                    {date}
                </RowCell>
                    <DeleteIcon />
            </TableRow>
        );    
}

const DeleteIcon = styled(IoTrashOutline)`
    &&:hover{
        color: red;
        cursor: pointer;
    }
`