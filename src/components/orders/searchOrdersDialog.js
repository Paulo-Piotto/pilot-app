import { useState, useEffect } from "react";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { TextField } from "@mui/material";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import MenuItem from "@mui/material/MenuItem";
import RegisterSnackbar from "../generics/registerSnackbar";
import dayjs from "dayjs";
import styled from "styled-components";
import {
  OrdersService,
  StoresService,
  ClientsService,
} from "../../services/api.services";
import { sumTotal } from "../../services/utils/sumTotal";
import { intToMoney } from "../../services/utils/format";
import { floorDateHour, ceilDateHour } from "../../services/utils/dateServices";

export default function SearchOrdersDialog({
  openDialog,
  handleCloseDialog,
  setOrders,
  setTotal,
  setLoading,
}) {
  const todayDate = new Date(Date.now()).getDate();
  const dayOne = Date.now() - 86400000 * (todayDate - 1);

  const [snackbar, setSnackbar] = useState(false);
  const [initialDate, setInitialDate] = useState(dayjs(dayOne));
  const [endDate, setEndDate] = useState(dayjs(Date.now()));
  const [stores, setStores] = useState([]);
  const [selectedStore, setSelectedStore] = useState(0);
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState(0);
  const [order, setOrder] = useState("");

  useEffect(() => {
    StoresService.getAllStores().then((resp) => {
      setStores(resp.data);
    });
    ClientsService.getAllClients().then((resp) => {
      setClients(resp.data);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    floorDateHour(initialDate);

    const searchSettings = {
      initialDate: floorDateHour(initialDate),
      endDate: ceilDateHour(endDate),
      store: selectedStore,
      client: selectedClient,
      order,
    };

    OrdersService.filterOrders(searchSettings)
      .then((resp) => {
        setLoading(false);
        setOrders(resp.data);
        setTotal(intToMoney(sumTotal(resp.data)));
        setOrder("");
        handleCloseDialog();
      })
      .catch(() => {
        setSnackbar(true);
        setOrders([]);
        setLoading(false);
      });
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle sx={{ mt: 2 }}>Configurações de Busca</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
          <DialogContent>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateContainer>
                <DesktopDatePicker
                  value={initialDate}
                  autoFocus
                  margin="dense"
                  label="De:"
                  id="date"
                  inputFormat="DD/MM/YYYY"
                  type="date"
                  required={true}
                  variant="standard"
                  onChange={(e) => setInitialDate(e)}
                  renderInput={(params) => (
                    <TextField {...params} margin="dense" />
                  )}
                />
                <DesktopDatePicker
                  value={endDate}
                  autoFocus
                  margin="dense"
                  label="Até:"
                  id="date"
                  inputFormat="DD/MM/YYYY"
                  type="date"
                  required={true}
                  variant="standard"
                  onChange={(e) => setEndDate(e)}
                  renderInput={(params) => (
                    <TextField {...params} sx={{ ml: 1 }} margin="dense" />
                  )}
                />
              </DateContainer>
            </LocalizationProvider>
            <TextField
              id="outlined-select-store"
              sx={{ mt: 1 }}
              select
              fullWidth
              label="Loja"
              defaultValue={0}
              value={selectedStore}
              onChange={(e) => setSelectedStore(e.target.value)}
            >
              <MenuItem key={0} value={0}>
                {"Todas"}
              </MenuItem>
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-store"
              sx={{ mt: 1 }}
              select
              fullWidth
              label="Obra"
              defaultValue={0}
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <MenuItem key={0} value={0}>
                {"Todas"}
              </MenuItem>
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.id}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={order}
              margin="dense"
              id="order"
              label="Pedido"
              type="text"
              fullWidth
              autoComplete="off"
              variant="outlined"
              onChange={(e) => setOrder(e.target.value.toUpperCase())}
              inputProps={{ style: { fontSize: 18 } }}
            />
          </DialogContent>
          <DialogActions sx={{ mb: 2, mr: 2 }}>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit">Buscar</Button>
          </DialogActions>
        </form>
      </Dialog>
      <RegisterSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        type={"error"}
      />
    </>
  );
}

const DateContainer = styled.div`
  width: 100%;
  display: flex;
`;
