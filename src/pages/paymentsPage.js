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
import {intToMoney} from "../services/utils/format";
import { sumTotalPayments } from "../services/utils/sumTotal";
import { PaymentsService } from "../services/api.services";
import AuthContext from "../components/context/AuthContext";
import { lastDayTarget, penultDayTarget } from "../services/utils/dateServices";

export default function PaymentsPage() {
  const [loading, setLoading] = useState(true);
  const [employees, setEmployees] = useState([]);
  const [workingDays, setWorkingDays] = useState([]);
  const [total, setTotal] = useState("0,00");
  const [openSearch, setOpenSearch] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { userData } = useContext(AuthContext);

  function clearFilters() {
    setLoading(true);
    PaymentsService.getEmployeesWorkedDays(
      `from=${dayjs(penultDayTarget(21)).toISOString()}&to=${dayjs(
        lastDayTarget(20)
      ).toISOString()}`,
      userData.token
    )
      .then((resp) => {
        setEmployees(resp.data);
        const employeesArray = resp.data;

        PaymentsService.getPeriodWorkingDays(
          `from=${dayjs(penultDayTarget(21)).toISOString()}&to=${dayjs(
            lastDayTarget(20)
          ).toISOString()}`,
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
  // eslint-disable-next-line
  useEffect(clearFilters, []);

  function handleCloseDialog() {
    setOpenSearch(false);
  }

  return (
    <>
      <CardsContainer>
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
                  <p>Base</p>
                  <p>Marmitas</p>
                  <p>Vale</p>
                  <p>Dias</p>
                  <p>Salário Bruto</p>
                  <p>Salário Líquido</p>
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
