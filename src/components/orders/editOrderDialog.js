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
import { MoneyInput, MoneyLabel } from "../../styles/moneyInputStyles";
import applyDiscount from "../../services/utils/applyDiscount";
import { sumTotal } from "../../services/utils/sumTotal";
import {intToTwoDecimals, intToMoney} from "../../services/utils/format";
import GenericSnackbar from "../generics/genericSnackbar";
import AuthContext from "../context/AuthContext";
import findPaymentMethod from "../../services/utils/findPaymentMethod";
import dayjs from "dayjs";

export default function EditOrderDialog({
  openDialog,
  handleCloseDialog,
  setOrders,
  setTotal,
  setLoading,
  rowData,
}) {
  const name = rowData.invoice;
  const [client, setClient] = useState(rowData.clients.id);
  const [store, setStore] = useState(rowData.stores.id);
  const [date, setDate] = useState(rowData.date);
  const [valueFinanced, setValueFinanced] = useState(
    intToTwoDecimals(rowData.value_financed)
  );
  const [valueCash, setValueCash] = useState(
    intToTwoDecimals(rowData.value_cash)
  );
  const [valueNegotiated, setValueNegotiated] = useState(
    rowData.value_negotiated ? intToTwoDecimals(rowData.value_negotiated) : ""
  );
  const [paymentMethod, setPaymentMethod] = useState(
    findPaymentMethod({
      value: rowData.value,
      financed: rowData.value_financed,
      cash: rowData.value_cash,
      negotiated: rowData.value_negotiated,
    })
  );
  const [clients, setClients] = useState([]);
  const [stores, setStores] = useState([]);
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

    setClientError(validationData.errorObject.client);
    setStoreError(validationData.errorObject.store);
    setFinancedError(validationData.errorObject.valueFinanced);
    setNegotiatedError(validationData.errorObject.valueNegotiated);

    if (!error) {
      let negotiatedValue = null;

      if (valueNegotiated && Number(valueNegotiated.replace(",", ".")) > 0) {
        negotiatedValue = Number(valueNegotiated.replace(",", ".")) * 100;
      }

      OrdersService.updateOrder({
        id: rowData.id,
        invoice: name,
        store,
        client,
        value: parseInt(Number(validationData.value.replace(",", ".")) * 100),
        financed: parseInt(Number(valueFinanced.replace(",", ".")) * 100),
        cash: parseInt(Number(valueCash.replace(",", ".")) * 100),
        negotiated: negotiatedValue,
        date,
        author: userData.name,
      })
        .then(() => {
          const todayMinus30 = Date.now() - 86400000 * 30;
          const searchSettings = {initialDate: dayjs(todayMinus30).toISOString(), endDate: dayjs(Date.now()).toISOString(), store: 0, client: 0};
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
    } else setLoading(false);
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Editar pedido</DialogTitle>
        <DialogContent>
          <TextField
            value={name}
            margin="dense"
            id="name"
            label="Pedido"
            type="text"
            variant="standard"
            inputProps={{ style: { fontSize: 18 } }}
            disabled
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleSubmit}>Atualizar</Button>
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
