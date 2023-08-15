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
import { lastDayTarget, floorDateHour } from "../services/utils/dateServices";
import { deleteMany } from "../services/utils/deleteMany";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [total, setTotal] = useState("0,00");
  const [openSearch, setOpenSearch] = useState(false);
  const [openAdd, setOpenAdd] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Item deletado com sucesso"
  );
  const [loading, setLoading] = useState(true);
  const dayOne = lastDayTarget(1);

  useEffect(() => {
    const searchSettings = {
      initialDate: floorDateHour(lastDayTarget(1)),
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
  }

  function clearFilters() {
    const searchSettings = {
      initialDate: floorDateHour(dayOne),
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
    const confirm = window.confirm(
      `Você tem certeza que deseja excluir ${orders.length} itens?`
    );
    if (confirm) {
      const result = await deleteMany(orders);
      if (!result) setSnackbar(true);
      clearFilters();
    }
  }

  return (
    <>
      <Clear onClick={clearFilters}>Limpar filtros</Clear>
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
                  <TrashButton onClick={handleMassDelete}>
                    <Delete sx={{ color: "#EAEAEA" }} />
                  </TrashButton>
                  <PrintButton onClick={() => pdfGenerator(orders)}>
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
