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

export default function StoresPage(){    
    const [stores, setStores] = useState([]);
    const [absoluteStores, setAbsoluteStores] = useState(0)
    const [openRegister, setOpenRegister] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {
        getAllStores().then((resp) =>{
            setStores(resp.data);
            setAbsoluteStores(resp.data.length);
        })
    }, [])

    function handleCloseDialog(){
        setOpenRegister(false);
        setOpenSearch(false);
    }

    function clearFilters(){
        getAllStores()
        .then((resp) => {
            setStores(resp.data)
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
        <RegisterStoreDialog openDialog={openRegister} handleCloseDialog={handleCloseDialog} setStores={setStores} setAbsoluteStores={setAbsoluteStores} />
        <SearchStoreDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setStores={setStores} />
        {stores[0] ? (
            <>
            <TableHeader>
                <p>Nome</p>
            </TableHeader>
            <TableContainer>
            {stores.map((employee) => 
                <TableItem rowData={employee} type='store' setItems={setStores} setAbsolute={setAbsoluteStores}/>
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

