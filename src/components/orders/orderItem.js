import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import { IoTrashOutline } from "react-icons/io5";
import DeleteDialog from "../generics/deleteDialog";
import styled from "styled-components";
import { deleteOrder, getAllOrders } from "../../services/api.services";
import sumTotal from "../../services/utils/sumTotal";
import GenericSnackbar from "../generics/genericSnackbar";

export default function OrderItem({rowData, setTotal, setOrders}){
    const date = dayjs(rowData.date).format('DD/MM/YYYY');

    const [openDelete, setOpenDelete] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('Item deletado com sucesso')

    function handleSubmitDelete(){
        deleteOrder(rowData.id)
            .then(() => {
                getAllOrders()
                    .then((resp) => {
                        setOrders(resp.data)
                        setTotal(Number(sumTotal(resp.data)/100).toFixed(2));
                        setSnackbarType('success');
                        setSnackbarMessage('Item deletado com sucesso')
                        setSnackbar(true);
                        setOpenDelete(false)
                    })
                    .catch(() => {
                        setSnackbarType('error');
                        setSnackbarMessage('Algo deu errado ao recuperar os pedidos')
                        setSnackbar(true);
                    })
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Algo deu errado ao recuperar os pedidos')
                setSnackbar(true);
            })
    }

        return(
            <>
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
                <DeleteIcon onClick={() => setOpenDelete(true)}/>
            </TableRow>
            <DeleteDialog openDialog={openDelete} handleCloseDialog={() => setOpenDelete(false)} handleSubmit={handleSubmitDelete}/>
            <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
            </>
        );    
}

const DeleteIcon = styled(IoTrashOutline)`
    transition: all ease-in-out 0.7s;
    &&:hover{
        color: red;
        cursor: pointer;
    }
`