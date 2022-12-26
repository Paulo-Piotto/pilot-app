import { useEffect, useState } from "react";
import { getAllClients } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import RegisterClientDialog from "../components/clients/registerClientDialog";
import SearchClientDialog from "../components/clients/searchClientDialog";
import { TableContainer, TableHeader } from "../styles/tableStyles";
import TableItem from "../components/generics/tableItem";

export default function ClientsPage(){    
    const [clients, setClients] = useState([]);
    const [absoluteClients, setAbsoluteClients] = useState(0)
    const [openRegister, setOpenRegister] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {
        getAllClients().then((resp) =>{
            setClients(resp.data);
            setAbsoluteClients(resp.data.length);
        })
    }, [])

    function handleCloseDialog(){
        setOpenRegister(false);
        setOpenSearch(false);
    }

    return (
        <>
        <CardsContainer>
            <Card contrast={false} subtitle='Cadastrar' title='Obra' iconName='briefcase-outline' action={() => setOpenRegister(true)}/>
            <Card contrast={false} subtitle='Buscar' title='Obra' iconName='search-outline' action={() => setOpenSearch(true)} />
            <Card contrast={true} subtitle='Obras cadastradas' number={absoluteClients} />
        </CardsContainer>
        <RegisterClientDialog openDialog={openRegister} handleCloseDialog={handleCloseDialog} setClients={setClients} setAbsoluteClients={setAbsoluteClients} />
        <SearchClientDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setStores={setClients} />
        <TableHeader>
            <p>Nome</p>
        </TableHeader>
        {clients[0] ? (
            <TableContainer>
            {clients.map((employee) => 
                <TableItem rowData={employee} type='client' setItems={setClients} setAbsolute={setAbsoluteClients} />
            )}
            </TableContainer>
        ): ''}
        
        </>
    );
}

