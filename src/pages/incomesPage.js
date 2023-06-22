import { useEffect, useState } from "react";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import CircularProgress from '@mui/material/CircularProgress';
import { TableContainer, TableHeader, HeaderContainer} from "../styles/tableStyles";
import IncomeItem from "../components/incomes/incomeItem";
import { IncomesService } from "../services/api.services";
import { sumTotal } from "../services/utils/sumTotal";
import AddIncomeDialog from "../components/incomes/addIncomeDialog"
import SearchIncomesDialog from "../components/incomes/searchIncomesDialog";
import GenericSnackbar from "../components/generics/genericSnackbar";
import {intToMoney} from "../services/utils/format";
import { Container } from "../components/generics/inProgress";
import { Clear, Loading } from "../styles/generalStyles";

export default function IncomesPage(){    
    const [incomes, setIncomes] = useState([]);
    const [total, setTotal] = useState('0,00')
    const [openSearch, setOpenSearch] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('Item deletado com sucesso')
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true)
        IncomesService.getAllIncomes()
            .then((resp) => {
                setIncomes(resp.data)
                setTotal(intToMoney(sumTotal(resp.data)));
                setLoading(false)
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Algo deu errado ao recuperar os itens')
                setSnackbar(true);
                setLoading(false);
            })
    }, [])

    function handleCloseDialog(){
        setOpenSearch(false);
        setOpenAdd(false);
    }

    function clearFilters(){
        setLoading(true);
        IncomesService.getAllIncomes()
        .then((resp) => {
            setIncomes(resp.data)
            setTotal(intToMoney(sumTotal(resp.data)));
            setLoading(false)
        })
        .catch(() => {
            setSnackbarType('error');
            setSnackbarMessage('Algo deu errado ao recuperar os itens')
            setSnackbar(true);
            setLoading(false);
        })
    }


    return (
        <>
        <Clear onClick={clearFilters} >Limpar filtros</Clear>
        <CardsContainer>
            <Card contrast={false} subtitle='Nova' title='Entrada' iconName='add-circle-outline' action={() => setOpenAdd(true)} />
            <Card contrast={false} subtitle='Configurações de' title='Busca' iconName='search-outline' action={() => setOpenSearch(true)} />
            <Card contrast={true} subtitle='Total' number={total} money={true}/>
        </CardsContainer>
        <AddIncomeDialog openDialog={openAdd} handleCloseDialog={handleCloseDialog} setIncomes={setIncomes} setTotal={setTotal} setLoading={setLoading} setSnackbar={setSnackbar} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage} />
        <SearchIncomesDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setIncomes={setIncomes} setTotal={setTotal} setLoading={setLoading} setSnackbar={setSnackbar} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage} />
        <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
        {loading ? <Loading> <CircularProgress /> </Loading> :
        (
            <>
            {incomes[0] ? (
            <>
            <HeaderContainer>
                <TableHeader>
                    <p>Nome</p>
                    <p>Obra</p>
                    <p>Valor</p>
                    <p>Data</p>
                    <p></p>
                </TableHeader>
            </HeaderContainer>
                <TableContainer>
                {incomes.map((order, index) => 
                    <IncomeItem key={index} rowData={order} setTotal={setTotal} setIncomes={setIncomes} setLoading={setLoading} setSnackbar={setSnackbar} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage} />
                )}
            </TableContainer>
            </>
            ) : 
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