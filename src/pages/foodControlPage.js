/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState, useContext } from "react";
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
import LunchboxItem from "../components/lunchboxes/lunchboxItem";
import GenericSnackbar from "../components/generics/genericSnackbar";
import { sumTotal } from "../services/utils/sumTotal";
import { intToMoney } from "../services/utils/format";
import { FoodControlService } from "../services/api.services";
import AuthContext from "../components/context/AuthContext";
import { floorDateHour, ceilDateHour } from "../services/utils/dateServices";
import CreateLunchboxDialog from "../components/lunchboxes/createLunchboxDialog";
import FilterLunchboxesDialog from "../components/lunchboxes/filterLunchboxesDialog";

export default function FoodControlPage() {
  const [loading, setLoading] = useState(true);
  const [lunchboxes, setLunchboxes] = useState([]);
  const [total, setTotal] = useState("0,00");
  const [openAdd, setOpenAdd] = useState(false);
  const [openSearch, setOpenSearch] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("");
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const { userData } = useContext(AuthContext);

  function clearFilters() {
    const today = ceilDateHour(new Date(Date.now()));
    const todayMinus5 = floorDateHour(new Date(Date.now() - 86400000 * 5));
    const filterString = `from=${todayMinus5}&to=${today}`;
    setLoading(true);
    FoodControlService.getFoodOrders(filterString, userData.token)
      .then((resp) => {
        setLunchboxes(resp.data);
        setTotal(sumTotal(resp.data));
        setLoading(false);
      })
      .catch((err) => {
        setSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao buscar os pedidos");
        setLoading(false);
      });
  }

  useEffect(clearFilters, []);

  function handleCloseDialog() {
    setOpenSearch(false);
    setOpenAdd(false);
  }

  return (
    <>
      <CardsContainer>
        <Card
          contrast={false}
          subtitle="Registrar"
          title="Marmita"
          iconName="fast-food-outline"
          action={() => setOpenAdd(true)}
        />
        <Card
          contrast={false}
          subtitle="Configurações de"
          title="Busca"
          iconName="search-outline"
          action={() => setOpenSearch(true)}
        />
        <Card
          contrast={true}
          subtitle="Total"
          number={intToMoney(total)}
          money={true}
        />
      </CardsContainer>
      <Clear onClick={clearFilters}>Limpar filtros</Clear>
      <GenericSnackbar
        setSnackbar={setSnackbar}
        snackbar={snackbar}
        type={snackbarType}
        message={snackbarMessage}
      />
      <CreateLunchboxDialog
        openDialog={openAdd}
        handleCloseDialog={handleCloseDialog}
        setItems={setLunchboxes}
        setTotal={setTotal}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarType={setSnackbarType}
        setLoading={setLoading}
      />
      <FilterLunchboxesDialog
        openDialog={openSearch}
        handleCloseDialog={handleCloseDialog}
        setItems={setLunchboxes}
        setTotal={setTotal}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarType={setSnackbarType}
        setLoading={setLoading}
      />
      {loading ? (
        <Loading>
          {" "}
          <CircularProgress />{" "}
        </Loading>
      ) : (
        <>
          <HeaderContainer>
            <TableHeader>
              <p>Funcionário</p>
              <p>Data</p>
              <p>Tipo</p>
              <p>Valor</p>
              <p></p>
            </TableHeader>
          </HeaderContainer>
          {lunchboxes[0] ? (
            <>
              <TableContainer>
                {lunchboxes.map((lunchbox, index) => (
                  <LunchboxItem
                    key={index}
                    rowData={lunchbox}
                    setItems={setLunchboxes}
                    setTotal={setTotal}
                    setSnackbarMessage={setSnackbarMessage}
                    setSnackbarType={setSnackbarType}
                    setSnackbar={setSnackbar}
                    setLoading={setLoading}
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
