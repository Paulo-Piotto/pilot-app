import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import DeleteDialog from "./deleteDialog";
import { deleteStore, getAllStores, deleteClient, getAllClients, updateClient, updateStore } from "../../services/api.services";
import { DeleteIcon, EditIcon } from "../../styles/generalStyles";
import GenericSnackbar from "./genericSnackbar";
import { storeNClientValidation } from "../../services/validationServices/storesNClientsValidation";
import UpdateDialog from "./updateDialog";

export default function TableItem({rowData, type, setAbsolute, setItems}){
    rowData.start_day = dayjs(rowData.start_day).format('DD/MM/YYYY');

    const [openDelete, setOpenDelete] = useState(false);
    const [openUpdate, setOpenUpdate] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('Item deletado com sucesso')

    function handleDelete(){
        const deletePromise = type === 'store' ? deleteStore(rowData.id) : deleteClient(rowData.id);
        deletePromise.then(() => {
            const getPromise = type === 'store' ? getAllStores() : getAllClients();
            getPromise.then((resp) => {
                        setItems(resp.data)
                        setAbsolute(resp.data.length);
                        setSnackbarType('success');
                        setSnackbarMessage('Item deletado com sucesso')
                        setSnackbar(true);
                        setOpenDelete(false)
            }).catch(() => {
                        setSnackbarType('error');
                        setSnackbarMessage('Algo deu errado ao recuperar os itens')
                        setSnackbar(true);
                        setOpenDelete(false);
            })
        }).catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Impossível deletar item')
                setSnackbar(true);
                setOpenDelete(false);
        })
    }

    function handleUpdate({e, name, setName, setNameError, setNameHelper}){
        e.preventDefault();
        const errorObject = storeNClientValidation({ name });
    
        if(errorObject){
            setNameError(errorObject.name.error);
            setNameHelper(errorObject.name.helper);
        }else{
            const updatePromise = type === 'store' ? updateStore({name, id: rowData.id}) : updateClient({name, id: rowData.id});
            updatePromise.then(() => {
                setOpenUpdate(false);
                setName('');
                const getPromise = type === 'store' ? getAllStores() : getAllClients();
                getPromise.then((resp) => {
                    setItems(resp.data)
                    setSnackbarType('success');
                    setSnackbarMessage('Item atualizado com sucesso')
                    setSnackbar(true);
                    setOpenUpdate(false)
                }).catch(() => {
                    setSnackbarType('error');
                    setSnackbarMessage('Algo deu errado ao recuperar os itens')
                    setSnackbar(true);
                })
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Algo deu errado ao atualizar o item')
                setSnackbar(true);
            })
        }       
       }

        return(
            <>
            <TableRow single={true} >
                <RowCell>
                    {rowData.name}
                </RowCell>
                <RowCell icon={true} >
                    <EditIcon onClick={() => setOpenUpdate(true)} />
                    <DeleteIcon onClick={() => setOpenDelete(true)} />
                </RowCell>
            </TableRow>
            <DeleteDialog openDialog={openDelete} handleCloseDialog={() => setOpenDelete(false)} handleSubmit={handleDelete}/>
            <UpdateDialog openDialog={openUpdate} handleCloseDialog={() => setOpenUpdate(false)} handleSubmit={handleUpdate}/>
            <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
            </>
        );    
}