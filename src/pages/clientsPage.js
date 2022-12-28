import { useEffect, useState } from "react";
import { getAllClients } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import RegisterClientDialog from "../components/clients/registerClientDialog";
import SearchClientDialog from "../components/clients/searchClientDialog";
import { TableContainer, TableHeader } from "../styles/tableStyles";
import TableItem from "../components/generics/tableItem";
import { Container } from "../components/generics/inProgress";
import { Clear } from "../styles/generalStyles";

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

    function clearFilters(){
        getAllClients()
        .then((resp) => {
            setClients(resp.data)
        })
    }

    return (
        <>
        <Clear onClick={clearFilters}>Limpar filtros</Clear>
        <CardsContainer>
            <Card contrast={false} subtitle='Cadastrar' title='Obra' iconName='briefcase-outline' action={() => setOpenRegister(true)}/>
            <Card contrast={false} subtitle='Buscar' title='Obra' iconName='search-outline' action={() => setOpenSearch(true)} />
            <Card contrast={true} subtitle='Obras cadastradas' number={absoluteClients} />
        </CardsContainer>
        <RegisterClientDialog openDialog={openRegister} handleCloseDialog={handleCloseDialog} setClients={setClients} setAbsoluteClients={setAbsoluteClients} />
        <SearchClientDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setClients={setClients} />
       
        
        {clients[0] ? (
            <>
            <TableHeader>
                <p>Nome</p>
            </TableHeader>
            <TableContainer>
            {clients.map((employee) => 
                <TableItem rowData={employee} type='client' setItems={setClients} setAbsolute={setAbsoluteClients} />
            )}
            </TableContainer>
            </>
        ):
        <Container>
            Nenhum item encontrado...
        </Container>
        }
        
        </>
    );
}

