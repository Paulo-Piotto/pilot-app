import { useState, useContext, useEffect } from "react";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import {
  TableContainer,
  TableHeader,
  HeaderContainer,
} from "../styles/tableStyles";
import { Container } from "../components/generics/inProgress";
import { Clear, Loading } from "../styles/generalStyles";
import CircularProgress from "@mui/material/CircularProgress";
import PaymentItem from "../components/payments/paymentItem";
import FilterPaymentsDialog from "../components/payments/filterPaymentsDialog";
import GenericSnackbar from "../components/generics/genericSnackbar";
import dayjs from "dayjs";
import intToMoney from "../services/utils/intToMoney";
import { sumTotalPayments } from "../services/utils/sumTotal";
import { PaymentsService } from "../services/api.services";
import AuthContext from "../components/context/AuthContext";

export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [total, setTotal] = useState("0,00");
  const [openSearch, setOpenSearch] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const todayMinus30 = Date.now() - 86400000 * 30;
  const { userData } = useContext(AuthContext);

  function clearFilters() {
    setLoading(true);
    PaymentsService.getEmployeesWorkedDays(
      `from=${dayjs(todayMinus30).toISOString()}`,
      userData.token
    )
      .then((resp) => {
        setEmployees(resp.data);
        const employeesArray = resp.data;

        PaymentsService.getPeriodWorkingDays(
          `from=${dayjs(todayMinus30).toISOString()}`,
          userData.token
        )
          .then((resp) => {
            setWorkingDays(resp.data);
            setTotal(
              intToMoney(
                sumTotalPayments(employeesArray, resp.data.length).toFixed(0)
              )
            );
            setLoading(false);
          })
          .catch(() => {
            setSnackbarMessage("Algo deu errado ao recuperar os dados");
            setSnackbarType("error");
            setSnackbar(true);
            setLoading(false);
          });
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
    setOpenSearch(false);
  }

  return (
    <>
      <CardsContainer>
        <Card
          contrast={false}
          subtitle="Buscar"
          title="Funcionário"
          iconName="briefcase-outline"
        />
        <Card
          contrast={false}
          subtitle="Configurações de"
          title="Busca"
          iconName="search-outline"
          action={() => setOpenSearch(true)}
        />
        <Card contrast={true} subtitle="Total" number={total} money={true} />
      </CardsContainer>
      <FilterPaymentsDialog
        openDialog={openSearch}
        handleCloseDialog={handleCloseDialog}
        setEmployees={setEmployees}
        setWorkingDays={setWorkingDays}
        setTotal={setTotal}
        setLoading={setLoading}
        setSnackbar={setSnackbar}
        setSnackbarType={setSnackbarType}
        setSnackbarMessage={setSnackbarMessage}
      />
      <Clear onClick={clearFilters}>Limpar filtros</Clear>
      <GenericSnackbar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
        type={snackbarType}
        message={snackbarMessage}
      />
      {loading ? (
        <Loading>
          {" "}
          <CircularProgress />{" "}
        </Loading>
      ) : (
        <>
          {employees[0] ? (
            <>
              <HeaderContainer>
                <TableHeader>
                  <p>Nome</p>
                  <p>Salário Base</p>
                  <p>Dias Trabalhados</p>
                  <p>A Receber</p>
                  <p></p>
                </TableHeader>
              </HeaderContainer>
              <TableContainer>
                {employees.map((employee, index) => (
                  <PaymentItem
                    key={index}
                    rowData={employee}
                    workingDays={workingDays.length}
                  />
                ))}
              </TableContainer>
            </>
          ) : (
            <Container>Nenhum item encontrado...</Container>
          )}
        </>
      )}
    </>
  );
}
