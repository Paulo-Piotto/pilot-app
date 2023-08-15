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
import { foodValidation } from "../../services/validationServices/foodValidation";
import {
  averageDateHour,
  ceilDateHour,
  floorDateHour,
} from "../../services/utils/dateServices";

export default function CreateLunchboxDialog({
  openDialog,
  handleCloseDialog,
  setItems,
  setTotal,
  setSnackbar,
  setSnackbarMessage,
  setSnackbarType,
  setLoading,
}) {
  const [employee, setEmployee] = useState(0);
  const [employees, setEmployees] = useState([]);
  const [type, setType] = useState(0);
  const [date, setDate] = useState(dayjs(Date.now()));
  const [value, setValue] = useState("0,00");
  const [employeeError, setEmployeeError] = useState(false);
  const [typeError, setTypeError] = useState(false);
  const [valueError, setValueError] = useState(false);
  const { userData } = useContext(AuthContext);

  const values = ["0,00", "16,00", "18,00", "20,00", "0,00"];
  const types = ["none", "Marmita P", "Marmita M", "Marmita G", "Outro"];
  const today = ceilDateHour(new Date(Date.now()));
  const todayMinus30 = floorDateHour(new Date(Date.now() - 86400000 * 30));
  const filterString = `from=${todayMinus30}&to=${today}`;

  useEffect(() => {
    EmployeesService.getEmployees()
      .then((resp) => {
        setEmployees(resp.data);
      })
      .catch((err) => {
        setSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao recuperar os funcionários");
      });
  }, []);

  function handleSubmit(e) {
    setLoading(true);
    e.preventDefault();
    const { errorObject, intValue } = foodValidation({
      employee,
      type,
      date,
      value,
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
      setLoading(false);
    } else {
      FoodControlService.createFoodOrder(
        {
          employee,
          type: types[type],
          value: intValue,
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
          setEmployee(0);
          setType(0);
          setValue("0,00");
          setDate(dayjs(Date.now()));
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
          setSnackbarMessage(
            "Algo deu errado ao tentar registrar o funcionário"
          );
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
            defaultValue={0}
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
            defaultValue={0}
            value={type}
            onChange={(e) => {
              setType(e.target.value);
              setValue(values[e.target.value]);
              setValueError(false);
            }}
          >
            <MenuItem value={0} sx={{ fontSize: 15 }}>
              {"Escolha um tipo"}
            </MenuItem>
            <MenuItem value={1} sx={{ fontSize: 15 }}>
              {"Marmita P"}
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: 15 }}>
              {"Marmita M"}
            </MenuItem>
            <MenuItem value={3} sx={{ fontSize: 15 }}>
              {"Marmita G"}
            </MenuItem>
            <MenuItem value={4} sx={{ fontSize: 15 }}>
              {"Outro"}
            </MenuItem>
          </TextField>
          <MoneyLabel>Valor*:</MoneyLabel>
          <MoneyInput
            id="input-value"
            name="input-value"
            placeholder="0,00"
            warning={valueError}
            disabled={type === 4 ? false : true}
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
