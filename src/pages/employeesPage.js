import { useEffect, useState } from "react";
import { EmployeesService } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import RegisterEmployeeDialog from "../components/employees/registerEmployeeDialog";
import SearchEmployeeDialog from "../components/employees/searchEmployeeDialog";
import { TableContainer, TableHeader } from "../styles/tableStyles";
import TableItem from "../components/generics/tableItem";
import { Container } from "../components/generics/inProgress";

export default function EmployeesPage(){    
    const [employees, setEmployees] = useState([]);
    const [absoluteEmployees, setAbsoluteEmployees] = useState(0)
    const [openRegister, setOpenRegister] = useState(false);
    const [openSearch, setOpenSearch] = useState(false);

    useEffect(() => {
        EmployeesService.getAllEmployees().then((resp) =>{
            setEmployees(resp.data);
            setAbsoluteEmployees(resp.data.length);
        })
    }, [])

    function handleCloseDialog(){
        setOpenRegister(false);
        setOpenSearch(false);
    }

    return (
        <>
        <CardsContainer>
            <Card contrast={false} subtitle='Registrar' title='Funcionário' iconName='person-add-outline' action={() => setOpenRegister(true)}/>
            <Card contrast={false} subtitle='Buscar' title='Funcionário' iconName='search-outline' action={() => setOpenSearch(true)} />
            <Card contrast={true} subtitle='Funcionários registrados' number={absoluteEmployees} />
        </CardsContainer>
        <RegisterEmployeeDialog openDialog={openRegister} handleCloseDialog={handleCloseDialog} setEmployees={setEmployees} setAbsoluteEmployees={setAbsoluteEmployees} />
        <SearchEmployeeDialog openDialog={openSearch} handleCloseDialog={handleCloseDialog} setEmployees={setEmployees} />
        <TableHeader>
            <p>Nome</p>
            <p>Salário Base</p>
            <p>Tel.</p>
            <p>Data de início</p>
        </TableHeader>
        {employees[0] ? (
            <TableContainer>
            {employees.map((employee, index) => 
                <TableItem key={index} rowData={employee} type='employee' />
            )}
        </TableContainer>
        ):
        <Container>
            Nenhum item encontrado...
        </Container>
        }
        </>
    );
}

