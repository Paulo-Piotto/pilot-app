import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";

export default function TableItem({rowData, type}){
    rowData.start_day = dayjs(rowData.start_day).format('DD/MM/YYYY');

    if(type === 'employee'){
        return(
            <TableRow>
                <RowCell>
                    {rowData.name}
                </RowCell>
                <RowCell>
                    R$ {rowData.wage/100},00
                </RowCell>
                <RowCell>
                    --
                </RowCell>
                <RowCell>
                    {rowData.start_day}
                </RowCell>
                <RowCell icon={true} >
                    <EditIcon />
                    <DeleteIcon />
                </RowCell>
            </TableRow>
        );
    }else if(type === 'store' || type === 'client'){
        return(
            <TableRow single={true} >
                <RowCell>
                    {rowData.name}
                </RowCell>
                <RowCell icon={true} >
                    <EditIcon />
                    <DeleteIcon />
                </RowCell>
            </TableRow>
        );
    }

    
}

const EditIcon = styled(IoPencilSharp)`
    margin-right: 30px;
    transition: all ease-in-out 0.7s;
    &&:hover{
        color: blue;
        cursor: pointer;
    }
`
const DeleteIcon = styled(IoTrashOutline)`
    transition: all ease-in-out 0.7s;
    &&:hover{
        color: red;
        cursor: pointer;
    }
`