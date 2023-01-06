import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import DeleteDialog from "../generics/deleteDialog";
import { deleteOrder, getAllOrders } from "../../services/api.services";
import { sumTotal } from "../../services/utils/sumTotal";
import intToMoney from "../../services/utils/intToMoney";
import { DeleteIcon } from "../../styles/generalStyles";

export default function OrderItem({rowData, setTotal, setOrders, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}){
    const date = dayjs(rowData.date).format('DD/MM/YYYY');

    const [openDelete, setOpenDelete] = useState(false);

    function handleSubmitDelete(){
        setLoading(true)
        deleteOrder(rowData.id)
            .then(() => {
                getAllOrders()
                    .then((resp) => {
                        setOrders(resp.data)
                        setTotal(intToMoney(sumTotal(resp.data)));
                        setSnackbarType('success');
                        setSnackbarMessage('Item deletado com sucesso')
                        setSnackbar(true);
                        setOpenDelete(false)
                        setLoading(false)
                    })
                    .catch(() => {
                        setSnackbarType('error');
                        setSnackbarMessage('Algo deu errado ao recuperar os pedidos')
                        setSnackbar(true);
                        setOpenDelete(false);
                        setLoading(false)
                    })
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Algo deu errado ao recuperar os pedidos')
                setSnackbar(true);
                setOpenDelete(false);
                setLoading(false)
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
                    R$ {intToMoney(rowData.value)}
                </RowCell>
                <RowCell >
                    {date}
                </RowCell>
                <RowCell icon={true}>
                    <DeleteIcon onClick={() => setOpenDelete(true)}/>
                </RowCell>
            </TableRow>
            <DeleteDialog openDialog={openDelete} handleCloseDialog={() => setOpenDelete(false)} handleSubmit={handleSubmitDelete}/>
            </>
        );    
}