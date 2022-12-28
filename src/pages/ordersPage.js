import { useEffect, useState } from "react";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import { TableContainer, TableHeader } from "../styles/tableStyles";
import OrderItem from "../components/orders/orderItem";
import { getAllOrders } from "../services/api.services";
import sumTotal from "../services/utils/sumTotal";
import SearchOrdersDialog from "../components/orders/searchOrdersDialog";
import AddOrderDialog from "../components/orders/addOrderDialog";
import GenericSnackbar from "../components/generics/genericSnackbar";
import intToMoney from "../services/utils/intToMoney";
import { Container } from "../components/generics/inProgress";
import { Clear } from "../styles/generalStyles";

export default function OrdersPage(){    
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(Number(0).toFixed(2))
    const [openSearch, setOpenSearch] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);
    const [snackbar, setSnackbar] = useState(false);
    const [snackbarType, setSnackbarType] = useState('success');
    const [snackbarMessage, setSnackbarMessage] = useState('Item deletado com sucesso')

    useEffect(() => {
        getAllOrders()
            .then((resp) => {
                setOrders(resp.data)
                setTotal(intToMoney(sumTotal(resp.data)));
            })
            .catch(() => {
                setSnackbarType('error');
                setSnackbarMessage('Algo deu errado ao recuperar os itens')
                setSnackbar(true);
            })
    }, [])

    function handleCloseDialog(){
        setOpenSearch(false);
        setOpenAdd(false);
    }

    function clearFilters(){
        getAllOrders()
        .then((resp) => {
            setOrders(resp.data)
            setTotal(intToMoney(sumTotal(resp.data)));
        })
        .catch(() => {
            setSnackbarType('error');
            setSnackbarMessage('Algo deu errado ao recuperar os itens')
            setSnackbar(true);
        })
    }


    return (
        <>
        <Clear onClick={clearFilters} >Limpar filtros</Clear>
        <CardsContainer>
            <Card contrast={false} subtitle='Novo' title='Pedido' iconName='add-circle-outline' action={() => setOpenAdd(true)} />
            <Card contrast={false} subtitle='Configurações de' title='Busca' iconName='search-outline' action={() => setOpenSearch(true)}/>
            <Card contrast={true} subtitle='Total' number={total} money={true}/>
        </CardsContainer>
        <AddOrderDialog openDialog={openAdd} handleCloseDialog={handleCloseDialog} setOrders={setOrders} setTotal={setTotal} />
        <SearchOrdersDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setOrders={setOrders} setTotal={setTotal} />
        {orders[0] ? (
        <>
        <TableHeader>
            <p>Pedido</p>
            <p>Obra</p>
            <p>Loja</p>
            <p>Valor</p>
            <p>Data</p>
        </TableHeader>
            <TableContainer>
            {orders.map((order) => 
                <OrderItem rowData={order} setTotal={setTotal} setOrders={setOrders} />
            )}
        </TableContainer>
        </>
        ) : 
        <Container>
            Nenhum item encontrado...
        </Container>
        }
        <GenericSnackbar snackbar={snackbar} setSnackbar={setSnackbar} type={snackbarType} message={snackbarMessage} />
        </>
    );
}

