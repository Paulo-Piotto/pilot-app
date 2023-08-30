/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { CardsContainer } from "../styles/cardStyles";
import Card from "../components/generics/card";
import { CircularProgress } from "@material-ui/core";
import PrintIcon from "@mui/icons-material/Print";
import { Delete } from "@mui/icons-material";
import {
  TableContainer,
  TableHeader,
  HeaderContainer,
} from "../styles/tableStyles";
import OrderItem from "../components/orders/orderItem";
import { OrdersService } from "../services/api.services";
import { sumTotal } from "../services/utils/sumTotal";
import SearchOrdersDialog from "../components/orders/searchOrdersDialog";
import AddOrderDialog from "../components/orders/addOrderDialog";
import GenericSnackbar from "../components/generics/genericSnackbar";
import { intToMoney } from "../services/utils/format";
import { Container } from "../components/generics/inProgress";
import {
  Clear,
  Loading,
  PrintButton,
  TrashButton,
} from "../styles/generalStyles";
import pdfGenerator from "../components/pdf/pdfGenerator";
import dayjs from "dayjs";
import { floorDateHour } from "../services/utils/dateServices";
import { deleteMany } from "../services/utils/deleteMany";
import DeleteDialog from "../components/generics/deleteDialog";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState("0,00");
  const [openSearch, setOpenSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [openDelete, setOpenDelete] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Item deletado com sucesso"
  );
  const [loading, setLoading] = useState(true);
  const todayMinus5 = floorDateHour(new Date(Date.now() - 86400000 * 5));

  useEffect(() => {
    const searchSettings = {
      initialDate: todayMinus5,
      endDate: dayjs(Date.now()).toISOString(),
      store: 0,
      client: 0,
    };
    OrdersService.filterOrders(searchSettings)
      .then((resp) => {
        setOrders(resp.data);
        setTotal(intToMoney(sumTotal(resp.data)));
        setLoading(false);
      })
      .catch(() => {
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao recuperar os itens");
        setSnackbar(true);
        setLoading(false);
      });
  }, []);

  function handleCloseDialog() {
    setOpenSearch(false);
    setOpenAdd(false);
    setOpenDelete(false);
  }

  function clearFilters() {
    const searchSettings = {
      initialDate: todayMinus5,
      endDate: dayjs(Date.now()).toISOString(),
      store: 0,
      client: 0,
    };
    setLoading(true);
    OrdersService.filterOrders(searchSettings)
      .then((resp) => {
        setOrders(resp.data);
        setTotal(intToMoney(sumTotal(resp.data)));
        setLoading(false);
      })
      .catch(() => {
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao recuperar os itens");
        setSnackbar(true);
        setLoading(false);
      });
  }

  async function handleMassDelete() {
    const result = await deleteMany(orders);
    if (!result) setSnackbar(true);
    clearFilters();
    handleCloseDialog();
  }

  return (
    <>
      <Clear onClick={clearFilters}>Limpar filtros ({orders.length})</Clear>
      <CardsContainer>
        <Card
          contrast={false}
          subtitle="Novo"
          title="Pedido"
          iconName="add-circle-outline"
          action={() => setOpenAdd(true)}
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
      <AddOrderDialog
        openDialog={openAdd}
        handleCloseDialog={handleCloseDialog}
        setOrders={setOrders}
        setTotal={setTotal}
        setLoading={setLoading}
      />
      <SearchOrdersDialog
        openDialog={openSearch}
        handleCloseDialog={handleCloseDialog}
        setOrders={setOrders}
        setTotal={setTotal}
        setLoading={setLoading}
      />
      <GenericSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        type={snackbarType}
        message={snackbarMessage}
      />
      <DeleteDialog
        openDialog={openDelete}
        handleCloseDialog={handleCloseDialog}
        handleSubmit={handleMassDelete}
        amount={orders.length}
      />
      {loading ? (
        <Loading>
          {" "}
          <CircularProgress />{" "}
        </Loading>
      ) : (
        <>
          {orders[0] ? (
            <>
              <HeaderContainer>
                <TableHeader>
                  <p>Pedido</p>
                  <p>Obra</p>
                  <p>Loja</p>
                  <p>Valor</p>
                  <p>Data</p>
                  <p></p>
                  <TrashButton onClick={() => setOpenDelete(true)}>
                    <Delete sx={{ color: "#EAEAEA" }} />
                  </TrashButton>
                  <PrintButton onClick={() => pdfGenerator(orders, total)}>
                    <PrintIcon sx={{ color: "#EAEAEA" }} />
                  </PrintButton>
                </TableHeader>
              </HeaderContainer>
              <TableContainer>
                {orders.map((order, index) => (
                  <OrderItem
                    key={index}
                    rowData={order}
                    setTotal={setTotal}
                    setOrders={setOrders}
                    setLoading={setLoading}
                    setSnackbar={setSnackbar}
                    setSnackbarType={setSnackbarType}
                    setSnackbarMessage={setSnackbarMessage}
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
