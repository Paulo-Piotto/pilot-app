import { useEffect, useState } from "react";
import { ClientsService } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import RegisterClientDialog from "../components/clients/registerClientDialog";
import SearchClientDialog from "../components/clients/searchClientDialog";
import { TableContainer, TableHeader, HeaderContainer } from "../styles/tableStyles";
import TableItem from "../components/generics/tableItem";
import { Container } from "../components/generics/inProgress";
import { Clear, Loading } from "../styles/generalStyles";
import GenericSnackbar from "../components/generics/genericSnackbar";
import CircularProgress from '@mui/material/CircularProgress';

export default function ClientsPage(){    
    const [clients, setClients] = useState([]);
    const [absoluteClients, setAbsoluteClients] = useState(0)
    const [openRegister, setOpenRegister] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        ClientsService.getAllClients().then((resp) =>{
            setClients(resp.data);
            setAbsoluteClients(resp.data.length);
            setLoading(false)
        })
    }, [])

    function handleCloseDialog(){
        setOpenRegister(false);
        setOpenSearch(false);
    }

    function clearFilters(){
        setLoading(true);
        ClientsService.getAllClients()
        .then((resp) => {
            setClients(resp.data)
            setLoading(false)
        })
    }

    return (
        <>
         <CardsContainer>
            <Card contrast={false} subtitle='Cadastrar' title='Obra' iconName='briefcase-outline' action={() => setOpenRegister(true)}/>
            <Card contrast={false} subtitle='Buscar' title='Obra' iconName='search-outline' action={() => setOpenSearch(true)} />
            <Card contrast={true} subtitle='Obras cadastradas' number={absoluteClients} />
        </CardsContainer>
        <RegisterClientDialog openDialog={openRegister} handleCloseDialog={handleCloseDialog} setClients={setClients} setAbsoluteClients={setAbsoluteClients} setLoading={setLoading} />
        <SearchClientDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setClients={setClients} setLoading={setLoading} />
        <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
        <Clear onClick={clearFilters}>Limpar filtros</Clear>
        {loading ? <Loading> <CircularProgress /> </Loading> : 
        (
        <>
        {clients[0] ? (
            <>
            <HeaderContainer>
                <TableHeader>
                    <p>Nome</p>
                </TableHeader>
            </HeaderContainer>
            <TableContainer>
            {clients.map((employee) => 
                <TableItem rowData={employee} type='client' setItems={setClients} setAbsolute={setAbsoluteClients} setLoading={setLoading} setSnackbar={setSnackbar} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage} />
            )}
            </TableContainer>
            </>
        ):
        <Container>
            Nenhum item encontrado...
        </Container>
        }
        </> 
        )
        }       
        </>
    );
}

