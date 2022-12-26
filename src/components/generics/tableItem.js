import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import { IoPencilSharp, IoTrashOutline } from "react-icons/io5";
import styled from "styled-components";
import DeleteDialog from "./deleteDialog";
import { deleteStore, getAllStores, deleteClient, getAllClients } from "../../services/api.services";
import GenericSnackbar from "./genericSnackbar";

export default function TableItem({rowData, type, setAbsolute, setItems}){
    rowData.start_day = dayjs(rowData.start_day).format('DD/MM/YYYY');

    const [openDelete, setOpenDelete] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('Item deletado com sucesso')

    function handleDeleteStore(){
        deleteStore(rowData.id)
            .then(() => {
                getAllStores()
                    .then((resp) => {
                        setItems(resp.data)
                        setAbsolute(resp.data.length);
                        setSnackbarType('success');
                        setSnackbarMessage('Item deletado com sucesso')
                        setSnackbar(true);
                        setOpenDelete(false)
                    })
                    .catch((error) => {
                        console.log(error)
                        setSnackbarType('error');
                        setSnackbarMessage('Algo deu errado ao recuperar as lojas')
                        setSnackbar(true);
                    })
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Impossível deletar loja')
                setSnackbar(true);
            })
    }

    function handleDeleteClient(){
        deleteClient(rowData.id)
            .then(() => {
                getAllClients()
                    .then((resp) => {
                        setItems(resp.data)
                        setAbsolute(resp.data.length);
                        setSnackbarType('success');
                        setSnackbarMessage('Item deletado com sucesso')
                        setSnackbar(true);
                        setOpenDelete(false)
                    })
                    .catch(() => {
                        setSnackbarType('error');
                        setSnackbarMessage('Algo deu errado ao recuperar as Obras')
                        setSnackbar(true);
                    })
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Impossível deletar Obra')
                setSnackbar(true);
            })
    }

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
            <>
            <TableRow single={true} >
                <RowCell>
                    {rowData.name}
                </RowCell>
                <RowCell icon={true} >
                    <EditIcon />
                    <DeleteIcon onClick={() => setOpenDelete(true)} />
                </RowCell>
            </TableRow>
            <DeleteDialog openDialog={openDelete} handleCloseDialog={() => setOpenDelete(false)} handleSubmit={() => {
                type === 'store' ? handleDeleteStore() : handleDeleteClient()
            }}/>
            <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
            </>
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