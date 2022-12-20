import { useEffect, useState } from "react";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import { TableContainer, TableHeader } from "../styles/tableStyles";
import OrderItem from "../components/orders/orderItem";
import { getAllOrders } from "../services/api.services";
import sumTotal from "../services/utils/sumTotal";
import SearchOrdersDialog from "../components/orders/searchOrdersDialog";
import AddOrderDialog from "../components/orders/addOrderDialog";

export default function OrdersPage(){    
    const [orders, setOrders] = useState([]);
    const [total, setTotal] = useState(Number(0).toFixed(2))
    const [openSearch, setOpenSearch] = useState(false);
    const [openAdd, setOpenAdd] = useState(false);

    useEffect(() => {
        getAllOrders()
            .then((resp) => {
                setOrders(resp.data)
                setTotal(Number(sumTotal(resp.data)/100).toFixed(2));
            })
            .catch(() => {
                alert('algo deu errado')
            })
    }, [])

    function handleCloseDialog(){
        setOpenSearch(false);
        setOpenAdd(false);
    }


    return (
        <>
        <CardsContainer>
            <Card contrast={false} subtitle='Novo' title='Pedido' iconName='add-circle-outline' action={() => setOpenAdd(true)} />
            <Card contrast={false} subtitle='Configurações de' title='Busca' iconName='search-outline' action={() => setOpenSearch(true)}/>
            <Card contrast={true} subtitle='Total' number={total.replace('.',',')} money={true}/>
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
                <OrderItem rowData={order} />
            )}
        </TableContainer>
        </>
        ): ''}        
        </>
    );
}

