import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import DeleteDialog from "../generics/deleteDialog";
import IncomeDetailsDialog from "./incomeDetailsDialog";
import { IncomesService } from "../../services/api.services";
import { sumTotal } from "../../services/utils/sumTotal";
import intToMoney from "../../services/utils/intToMoney";
import DropMenu from "../generics/dropMenu";

export default function IncomeItem({rowData, setTotal, setIncomes, setLoading, setSnackbar, setSnackbarType, setSnackbarMessage}){
    const date = dayjs(rowData.date).format('DD/MM/YYYY');

    const [openDelete, setOpenDelete] = useState(false);
    const [openDetails, setOpenDetails] = useState(false);

    function handleSubmitDelete(){
        setLoading(true)
        IncomesService.deleteIncome(rowData.id)
            .then(() => {
                IncomesService.getAllIncomes()
                    .then((resp) => {
                        setIncomes(resp.data)
                        setTotal(intToMoney(sumTotal(resp.data)));
                        setSnackbarType('success');
                        setSnackbarMessage('Item deletado com sucesso')
                        setSnackbar(true);
                        setOpenDelete(false)
                        setLoading(false)
                    })
                    .catch(() => {
                        setSnackbarType('error');
                        setSnackbarMessage('Algo deu errado ao recuperar os itens')
                        setSnackbar(true);
                        setOpenDelete(false);
                        setLoading(false)
                    })
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Algo deu errado ao deletar o item')
                setSnackbar(true);
                setOpenDelete(false);
                setLoading(false)
            })
    }

        return(
            <>
            <TableRow>
                <RowCell>
                    {rowData.name}
                </RowCell>
                <RowCell>
                    {rowData.clients.name}
                </RowCell>
                <RowCell>
                    R$ {intToMoney(rowData.value)}
                </RowCell>
                <RowCell >
                    {date}
                </RowCell>
                <RowCell icon={true}>
                    <DropMenu setOpenDelete={setOpenDelete} setOpenDetails={setOpenDetails} details={true} edit={false} deletion={true} />
                </RowCell>
            </TableRow>
            <DeleteDialog openDialog={openDelete} handleCloseDialog={() => setOpenDelete(false)} handleSubmit={handleSubmitDelete}/>
            <IncomeDetailsDialog openDialog={openDetails} handleCloseDialog={() => setOpenDetails(false)} rowData={rowData} />
            </>
        );    
}