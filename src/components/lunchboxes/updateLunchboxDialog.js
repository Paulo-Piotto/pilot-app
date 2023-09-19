/* eslint-disable react-hooks/exhaustive-deps */
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
import styled from "styled-components";
import {
  FoodControlService,
  EmployeesService,
} from "../../services/api.services";
import dayjs from "dayjs";
import { MoneyInput, MoneyLabel } from "../../styles/moneyInputStyles";
import { sumTotal } from "../../services/utils/sumTotal";
import AuthContext from "../context/AuthContext";
import { updateFoodValidation } from "../../services/validationServices/foodValidation";
import {
  averageDateHour,
  ceilDateHour,
  floorDateHour,
} from "../../services/utils/dateServices";

export default function UpdateLunchboxDialog({
  rowData,
  openDialog,
  handleCloseDialog,
  setItems,
  setTotal,
  setSnackbar,
  setSnackbarMessage,
  setSnackbarType,
  setLoading,
}) {
  const [employee, setEmployee] = useState(rowData.employees.id || 0);
  const [employees, setEmployees] = useState([]);
  const [type, setType] = useState(rowData.type || "escolha");
  const [menu, setMenu] = useState([]);
  const [date, setDate] = useState(rowData.date || dayjs(Date.now()));
  const [value, setValue] = useState(rowData.value / 100 || "0,00");
  const [employeeError, setEmployeeError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const { userData } = useContext(AuthContext);
  const today = ceilDateHour(new Date(Date.now()));
  const todayMinus30 = floorDateHour(new Date(Date.now() - 86400000 * 30));
  const filterString = `from=${todayMinus30}&to=${today}`;

  async function getData() {
    try {
      const employeesResp = await EmployeesService.getEmployees();
      const menuResp = await FoodControlService.getMenu(userData.token);
      setEmployees(employeesResp.data);
      setMenu(menuResp.data);
    } catch (error) {
      setSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage("Algo deu errado...");
    }
  }

  useEffect(() => {
    getData();
  }, []);

  function updateType(typeName) {
    setType(typeName);
    for (let i = 0; i < menu.length; i++) {
      if (menu[i].name === typeName) setValue(menu[i].value / 100);
      else if (typeName === "Outro") setValue(0);
    }
    setValueError(false);
  }

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const { errorObject } = updateFoodValidation({
      employee,
      type,
      date,
      value: (value * 100).toFixed(0),
    });
    if (
      errorObject.employee ||
      errorObject.type ||
      errorObject.value ||
      errorObject.date
    ) {
      setEmployeeError(errorObject.employee);
      setTypeError(errorObject.type);
      setValueError(errorObject.value);
      setSnackbar(true);
      setSnackbarType("error");
      setSnackbarMessage(
        "Seu pedido precisa de funcionário, item, valor e data válidos"
      );
      setLoading(false);
    } else {
      FoodControlService.updateFoodOrder(
        {
          id: rowData.id,
          employee,
          type,
          value: Number((value * 100).toFixed(0)),
          date: averageDateHour(date),
          author: userData.name,
        },
        userData.token
      )
        .then(() => {
          setSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage("Pedido Registrado com sucesso");
          handleCloseDialog();
          FoodControlService.getFoodOrders(filterString, userData.token)
            .then((resp) => {
              setItems(resp.data);
              setTotal(sumTotal(resp.data));
              setLoading(false);
            })
            .catch((err) => {
              setLoading(false);
              setSnackbar(true);
              setSnackbarType("error");
              setSnackbarMessage("Algo deu errado ao recuperar os pedidos");
            });
        })
        .catch(() => {
          setLoading(false);
          setSnackbar(true);
          setSnackbarType("error");
          setSnackbarMessage("Algo deu errado ao tentar registrar a alteração");
        });
    }
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Pedido de Marmita</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-employee"
            sx={{ mt: 1, mr: 1, mb: 1 }}
            select
            error={employeeError}
            fullWidth
            required
            label="Funcionário"
            value={employee}
            onChange={(e) => setEmployee(e.target.value)}
          >
            <MenuItem key={0} value={0} sx={{ fontSize: 15 }}>
              {"Escolha um funcionário"}
            </MenuItem>
            {employees.map((employee, index) => (
              <MenuItem key={index} value={employee.id} sx={{ fontSize: 15 }}>
                {employee.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="outlined-select-type"
            sx={{ mt: 1, mr: 1, mb: 5 }}
            select
            fullWidth
            error={typeError}
            required
            label="Opção"
            value={type}
            onChange={(e) => {
              updateType(e.target.value);
            }}
          >
            {menu.map((item, index) => (
              <MenuItem key={index} value={item.name} sx={{ fontSize: 15 }}>
                {`${item.name} ${item.description}`}
              </MenuItem>
            ))}
            <MenuItem value={"Outro"} sx={{ fontSize: 15 }}>
              {"Outro"}
            </MenuItem>
          </TextField>
          <MoneyLabel>Valor*:</MoneyLabel>
          <MoneyInput
            id="input-value"
            name="input-value"
            placeholder="0,00"
            warning={valueError}
            disabled={type === "Outro" ? false : true}
            value={value}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
            onValueChange={(value, name) => {
              setValue(value);
              setValueError(false);
            }}
          />
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
                required
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
          <Button onClick={handleSubmit}>Registrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const DateWrapper = styled.div`
  margin-top: 10px;
`;
