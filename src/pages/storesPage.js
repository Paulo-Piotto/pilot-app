import { useEffect, useState } from "react";
import { getAllStores } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import RegisterStoreDialog from "../components/stores/registerStoreDialog";
import SearchStoreDialog from "../components/stores/searchStoreDialog";
import { TableContainer, TableHeader } from "../styles/tableStyles";
import TableItem from "../components/generics/tableItem";
import { Container } from "../components/generics/inProgress";
import { Clear } from "../styles/generalStyles";
import { Loading } from "../styles/generalStyles";
import GenericSnackbar from "../components/generics/genericSnackbar";
import CircularProgress from '@mui/material/CircularProgress';

export default function StoresPage(){    
    const [stores, setStores] = useState([]);
    const [absoluteStores, setAbsoluteStores] = useState(0)
    const [openRegister, setOpenRegister] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);
    const [loading, setLoading] = useState(true)
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('')

    useEffect(() => {
        getAllStores().then((resp) =>{
            setStores(resp.data);
            setAbsoluteStores(resp.data.length);
            setLoading(false);
        })
    }, [])

    function handleCloseDialog(){
        setOpenRegister(false);
        setOpenSearch(false);
    }

    function clearFilters(){
        setLoading(true)
        getAllStores()
        .then((resp) => {
            setStores(resp.data)
            setLoading(false);
        })
    }

    return (
        <>
        <Clear onClick={clearFilters}>Limpar filtros</Clear>
        <CardsContainer>
            <Card contrast={false} subtitle='Cadastrar' title='Loja' iconName='briefcase-outline' action={() => setOpenRegister(true)}/>
            <Card contrast={false} subtitle='Buscar' title='Loja' iconName='search-outline' action={() => setOpenSearch(true)} />
            <Card contrast={true} subtitle='Lojas cadastradas' number={absoluteStores} />
        </CardsContainer>
        <RegisterStoreDialog openDialog={openRegister} handleCloseDialog={handleCloseDialog} setStores={setStores} setAbsoluteStores={setAbsoluteStores} setLoading={setLoading} />
        <SearchStoreDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setStores={setStores} setLoading={setLoading} />
        <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
        {loading ? <Loading> <CircularProgress /> </Loading> :
        (
            <>
            {stores[0] ? (
                <>
                <TableHeader>
                    <p>Nome</p>
                </TableHeader>
                <TableContainer>
                {stores.map((employee) => 
                    <TableItem rowData={employee} type='store' setItems={setStores} setAbsolute={setAbsoluteStores} setLoading={setLoading} setSnackbar={setSnackbar} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage} />
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

