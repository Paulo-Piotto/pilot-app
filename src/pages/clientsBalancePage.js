import { useEffect, useState } from "react";
import { ClientsService } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import { TableContainer, TableHeader, HeaderContainer } from "../styles/tableStyles";
import BalanceItem from "../components/balance/balanceItem";
import { Container } from "../components/generics/inProgress";
import { Clear, Loading } from "../styles/generalStyles";
import CircularProgress from '@mui/material/CircularProgress';
import GenericSnackbar from "../components/generics/genericSnackbar";
import { sumTotalBalance } from "../services/utils/sumTotal";
import intToMoney from "../services/utils/intToMoney";

export default function ClientsBalancePage(){
    const [loading, setLoading] = useState(true);
    const [clients, setClients] = useState([]);
    const [total, setTotal] = useState('0,00')
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('');
    const [snackbarMessage, setSnackbarMessage] = useState('')

    function clearFilters(){
        setLoading(true)
        ClientsService.getClientsBalance({initialDate: undefined, endDate: undefined})
        .then((resp) => {
            setClients(resp.data)
            setTotal(intToMoney(sumTotalBalance(resp.data)))
            setLoading(false)
        })
        .catch(() => {
            setSnackbarMessage('Algo deu errado ao recuperar os dados');
            setSnackbarType('error');
            setSnackbar(true);
            setLoading(false);
        })
    }

    useEffect(clearFilters, [])
    

    return(
        <>
        <CardsContainer>
            <Card contrast={false} subtitle='Nova' title='Entrada' iconName='add-circle-outline' />
            <Card contrast={false} subtitle='Configurações de' title='Busca' iconName='search-outline'/>
            <Card contrast={true} subtitle='Total' number={total} money={true}/>
        </CardsContainer>
        <Clear onClick={clearFilters}>Limpar filtros</Clear>
        <GenericSnackbar setSnackbar={setSnackbar} snackbar={snackbar} type={snackbarType} message={snackbarMessage} />
        {loading ? <Loading> <CircularProgress /> </Loading> : 
        (
        <>
        {clients[0] ? (
            <>
            <HeaderContainer>
                <TableHeader>
                    <p>Obra</p>
                    <p>Receitas</p>
                    <p>Despesas</p>
                    <p>Saldo</p>
                </TableHeader>
            </HeaderContainer>
            <TableContainer>
            {clients.map((client) => 
                <BalanceItem rowData={client} setClients={setClients} setTotal={setTotal} setLoading={setLoading} setSnackbar={setSnackbar} setSnackbarType={setSnackbarType} setSnackbarMessage={setSnackbarMessage} />
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