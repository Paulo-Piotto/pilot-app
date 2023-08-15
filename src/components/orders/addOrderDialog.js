import { useState, useEffect, useContext } from "react";
import {
  Button,
  TextField,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ordersValidation } from "../../services/validationServices/ordersValidation";
import styled from "styled-components";
import {
  ClientsService,
  StoresService,
  OrdersService,
} from "../../services/api.services";
import dayjs from "dayjs";
import { MoneyInput, MoneyLabel } from "../../styles/moneyInputStyles";
import applyDiscount from "../../services/utils/applyDiscount";
import { sumTotal } from "../../services/utils/sumTotal";
import { intToMoney } from "../../services/utils/format";
import GenericSnackbar from "../generics/genericSnackbar";
import AuthContext from "../context/AuthContext";
import {
  lastDayTarget,
  floorDateHour,
} from "../../services/utils/dateServices";

export default function AddOrderDialog({
  openDialog,
  handleCloseDialog,
  setOrders,
  setTotal,
  setLoading,
}) {
  const [name, setName] = useState("");
  const [client, setClient] = useState(0);
  const [store, setStore] = useState(0);
  const [date, setDate] = useState(dayjs(Date.now()));
  const [valueFinanced, setValueFinanced] = useState("");
  const [valueCash, setValueCash] = useState("0,00");
  const [valueNegotiated, setValueNegotiated] = useState("");
  const [paymentMethod, setPaymentMethod] = useState(1);
  const [obs, setObs] = useState("");
  const [clients, setClients] = useState([]);
  const [stores, setStores] = useState([]);
  const [nameError, setNameError] = useState(false);
  const [clientError, setClientError] = useState(false);
  const [storeError, setStoreError] = useState(false);
  const [financedError, setFinancedError] = useState(false);
  const [negotiatedError, setNegotiatedError] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const [snackbarType, setSnackbarType] = useState("success");
  const [snackbarMessage, setSnackbarMessage] = useState(
    "Item deletado com sucesso"
  );
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    ClientsService.getAllClients()
      .then((resp) => {
        setClients(resp.data);
      })
      .catch(() => {
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao recuperar os itens");
        setSnackbar(true);
      });
    StoresService.getAllStores()
      .then((resp) => {
        setStores(resp.data);
      })
      .catch(() => {
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao recuperar os itens");
        setSnackbar(true);
      });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const validationData = ordersValidation({
      name,
      client,
      store,
      date,
      valueFinanced,
      valueNegotiated,
      paymentMethod,
      valueCash,
    });

    let keys = Object.keys(validationData.errorObject);
    let error = undefined;

    for (let i = 0; i < keys.length; i++) {
      if (validationData.errorObject[keys[i]]) {
        error = true;
      }
    }

    setNameError(validationData.errorObject.name);
    setClientError(validationData.errorObject.client);
    setStoreError(validationData.errorObject.store);
    setFinancedError(validationData.errorObject.valueFinanced);
    setNegotiatedError(validationData.errorObject.valueNegotiated);

    if (!error) {
      let negotiatedValue = null;

      if (valueNegotiated && Number(valueNegotiated.replace(",", ".")) > 0) {
        negotiatedValue = Number(valueNegotiated.replace(",", ".")) * 100;
      }

      OrdersService.addOrder({
        invoice: name,
        store,
        client,
        value: parseInt(Number(validationData.value.replace(",", ".")) * 100),
        financed: parseInt(Number(valueFinanced.replace(",", ".")) * 100),
        cash: parseInt(Number(valueCash.replace(",", ".")) * 100),
        negotiated: negotiatedValue,
        date,
        obs,
        author: userData.name,
      })
        .then(() => {
          const dayOne = floorDateHour(lastDayTarget(1));
          const searchSettings = {
            initialDate: dayOne,
            endDate: dayjs(Date.now()).toISOString(),
            store: 0,
            client: 0,
          };
          OrdersService.filterOrders(searchSettings)
            .then((resp) => {
              setLoading(false);
              setOrders(resp.data);
              setTotal(intToMoney(sumTotal(resp.data)));
            })
            .catch(() => {
              setLoading(false);
              setSnackbarType("error");
              setSnackbarMessage("Algo deu errado ao recuperar os itens");
              setSnackbar(true);
            });
        })
        .catch(() => {
          setLoading(false);
          setSnackbarType("error");
          setSnackbarMessage("Algo deu errado ao recuperar os itens");
          setSnackbar(true);
        });

      handleCloseDialog(true);

      setName("");
      setClient(0);
      setStore(0);
      setDate(dayjs(Date.now()));
      setValueFinanced("");
      setValueCash("0,00");
      setValueNegotiated("");
      setPaymentMethod(1);
      setObs("");
    } else setLoading(false);
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Criar novo pedido</DialogTitle>
        <DialogContent>
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Pedido"
            type="text"
            required={true}
            fullWidth
            autoComplete="off"
            variant="standard"
            onChange={(e) => setName(e.target.value.toUpperCase())}
            inputProps={{ style: { fontSize: 18 } }}
          />
          <SelectWrapper>
            <TextField
              id="outlined-select-store"
              sx={{ mt: 1, mr: 1 }}
              select
              fullWidth
              error={storeError}
              label="Loja"
              defaultValue={0}
              value={store}
              onChange={(e) => setStore(e.target.value)}
            >
              <MenuItem key={0} value={0} sx={{ fontSize: 15 }}>
                {"Escolha uma loja"}
              </MenuItem>
              {stores.map((store) => (
                <MenuItem key={store.id} value={store.id} sx={{ fontSize: 15 }}>
                  {store.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              id="outlined-select-client"
              sx={{ mt: 1 }}
              select
              fullWidth
              error={clientError}
              label="Obra"
              defaultValue={0}
              value={client}
              onChange={(e) => setClient(e.target.value)}
            >
              <MenuItem key={0} value={0} sx={{ fontSize: 15 }}>
                {"Escolha uma Obra"}
              </MenuItem>
              {clients.map((client) => (
                <MenuItem
                  key={client.id}
                  value={client.id}
                  sx={{ fontSize: 15 }}
                >
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
          </SelectWrapper>
          <MoneyLabel>Valor à prazo:</MoneyLabel>
          <MoneyInput
            id="input-financed"
            name="input-financed"
            warning={financedError}
            autoComplete="off"
            placeholder="R$ 0,00"
            value={valueFinanced}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
            onValueChange={(value, name) => {
              setValueFinanced(value);
              setValueCash(applyDiscount(value, [0.15, 0.025]));
            }}
          />
          <MoneyLabel>Valor à vista:</MoneyLabel>
          <MoneyInput
            id="input-cash"
            disabled
            name="input-cash"
            placeholder="Valor à prazo"
            value={valueCash}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
          />
          <MoneyLabel>Valor negociado(opcional):</MoneyLabel>
          <MoneyInput
            id="input-negotiated"
            name="input-negotiated"
            placeholder="R$ 0,00"
            autoComplete="off"
            warning={negotiatedError}
            value={valueNegotiated}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
            onValueChange={(value, name) => setValueNegotiated(value)}
          />
          <TextField
            id="outlined-select-payment"
            sx={{ mt: 1 }}
            select
            fullWidth
            label="Método de pagamento"
            value={paymentMethod}
            defaultValue={1}
            onChange={(e) => setPaymentMethod(e.target.value)}
          >
            <MenuItem value={1} sx={{ fontSize: 15 }}>
              {"À prazo"}
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: 15 }}>
              {"À vista"}
            </MenuItem>
            <MenuItem value={3} sx={{ fontSize: 15 }}>
              {"Negociado"}
            </MenuItem>
          </TextField>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateWrapper>
              <DesktopDatePicker
                value={date}
                autoFocus
                margin="dense"
                label="Data"
                id="date"
                inputFormat="DD/MM/YYYY"
                type="date"
                required={true}
                variant="standard"
                onChange={(e) => setDate(e)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ mt: 2 }} />
                )}
              />
            </DateWrapper>
          </LocalizationProvider>
          <TextField
            sx={{ mt: 3 }}
            value={obs}
            margin="dense"
            id="obs"
            label="Observações: (opcional)"
            type="text"
            multiline
            rows={3}
            fullWidth
            variant="outlined"
            onChange={(e) => setObs(e.target.value)}
            InputProps={{
              sx: {
                fontSize: 16,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogActions>
      </Dialog>
      <GenericSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        type={snackbarType}
        message={snackbarMessage}
      />
    </>
  );
}

const DateWrapper = styled.div`
  margin-top: 10px;
`;

const SelectWrapper = styled.div`
  display: flex;
`;
