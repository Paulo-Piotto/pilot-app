import { useEffect, useState } from "react";
import { EmployeesService } from "../services/api.services";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import RegisterEmployeeDialog from "../components/employees/registerEmployeeDialog";
import SearchEmployeeDialog from "../components/employees/searchEmployeeDialog";
import {
  HeaderContainer,
  TableContainer,
  TableHeader,
} from "../styles/tableStyles";
import EmployeeItem from "../components/employees/employeeItem";
import { Container } from "../components/generics/inProgress";
import { Clear, Loading } from "../styles/generalStyles";
import GenericSnackbar from "../components/generics/genericSnackbar";
import { CircularProgress } from "@material-ui/core";

export default function EmployeesPage() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [absoluteEmployees, setAbsoluteEmployees] = useState(0);
  const [openRegister, setOpenRegister] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  function clearFilters() {
    setLoading(true);
    EmployeesService.getAllEmployees()
      .then((resp) => {
        setEmployees(resp.data);
        setAbsoluteEmployees(resp.data.length);
        setLoading(false);
      })
      .catch(() => {
        setSnackbarMessage("Algo deu errado ao recuperar os dados");
        setSnackbarType("error");
        setSnackbar(true);
        setLoading(false);
      });
  }

  useEffect(clearFilters, []);

  function handleCloseDialog() {
    setOpenRegister(false);
    setOpenSearch(false);
  }

  return (
    <>
      <CardsContainer>
        <Card
          contrast={false}
          subtitle="Registrar"
          title="Funcionário"
          iconName="person-add-outline"
          action={() => setOpenRegister(true)}
        />
        <Card
          contrast={false}
          subtitle="Buscar"
          title="Funcionário"
          iconName="search-outline"
          action={() => setOpenSearch(true)}
        />
        <Card
          contrast={true}
          subtitle="Funcionários registrados"
          number={absoluteEmployees}
        />
      </CardsContainer>
      <RegisterEmployeeDialog
        openDialog={openRegister}
        handleCloseDialog={handleCloseDialog}
        setEmployees={setEmployees}
        setAbsoluteEmployees={setAbsoluteEmployees}
      />
      <SearchEmployeeDialog
        openDialog={openSearch}
        handleCloseDialog={handleCloseDialog}
        setEmployees={setEmployees}
      />
      <Clear onClick={clearFilters}>Limpar filtros</Clear>
      <GenericSnackbar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
        type={snackbarType}
        message={snackbarMessage}
      />
      <HeaderContainer>
        <TableHeader>
          <p>Nome</p>
        </TableHeader>
      </HeaderContainer>
      {loading ? (
        <Loading>
          {" "}
          <CircularProgress />{" "}
        </Loading>
      ) : (
        <>
          {employees[0] ? (
            <TableContainer>
              {employees.map((employee, index) => (
                <EmployeeItem
                  key={index}
                  rowData={employee}
                  setItems={setEmployees}
                  setAbsolute={setAbsoluteEmployees}
                  setLoading={setLoading}
                  setSnackbar={setSnackbar}
                  setSnackbarType={setSnackbarType}
                  setSnackbarMessage={setSnackbarMessage}
                />
              ))}
            </TableContainer>
          ) : (
            <Container>Nenhum item encontrado...</Container>
          )}
        </>
      )}
    </>
  );
}
