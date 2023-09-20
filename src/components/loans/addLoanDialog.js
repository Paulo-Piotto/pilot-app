import { useState } from "react";
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
import dayjs from "dayjs";
import { MoneyInput, MoneyLabel } from "../../styles/moneyInputStyles";
import { sumTotal } from "../../services/utils/sumTotal";
import {
  averageDateHour,
  ceilDateHour,
  floorDateHour,
} from "../../services/utils/dateServices";
import { intToMoney } from "../../services/utils/format";
import { loanValidation } from "../../services/validationServices/loanValidation";

export default function AddLoanDialog({
  openDialog,
  handleCloseDialog,
  setItems,
  setTotal,
  setSnackbar,
  setSnackbarMessage,
  setSnackbarType,
  setLoading,
}) {
  const employeesMock = [
    {
      id: 1,
      name: "Carlinhos",
    },
    {
      id: 2,
      name: "Marcelo",
    },
    {
      id: 3,
      name: "João",
    },
  ];
  const [employee, setEmployee] = useState(0);
  const [employees, setEmployees] = useState(employeesMock);
  const [type, setType] = useState("Pedido");
  const [date, setDate] = useState(dayjs(Date.now()));
  const [value, setValue] = useState("0,00");

  //   const today = ceilDateHour(new Date(Date.now()));
  //   const todayMinus5 = floorDateHour(new Date(Date.now() - 86400000 * 5));
  //   const filterString = `from=${todayMinus5}&to=${today}`;

  //   async function getData() {
  //     try {
  //       const employeesResp = await EmployeesService.getEmployees();
  //       const menuResp = await FoodControlService.getMenu(userData.token);
  //       setEmployees(employeesResp.data);
  //       setMenu(menuResp.data);
  //     } catch (error) {
  //       setSnackbar(true);
  //       setSnackbarType("error");
  //       setSnackbarMessage("Algo deu errado...");
  //     }
  //   }

  //   useEffect(() => {
  //     getData();
  //   }, []);

  function handleSubmit(e) {
    e.preventDefault();
    const intValue = Number(value.replace(",", ".") * 100).toFixed(0);
    const result = loanValidation({
      employee,
      type,
      value: intValue,
      date,
    });
    if (result.error) {
      setSnackbarMessage(result.msg);
      setSnackbarType("error");
      setSnackbar(true);
    } else {
      console.log({
        employee,
        type,
        value: Number(intValue),
        date: averageDateHour(date),
      });
    }
    setLoading(true);
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Novo Registro de empréstimo</DialogTitle>
        <DialogContent>
          <TextField
            id="outlined-select-type"
            sx={{ mt: 1, mr: 1, mb: 1, width: 150 }}
            select
            required
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={"Pedido"} sx={{ fontSize: 15 }}>
              {"Pedido"}
            </MenuItem>
            <MenuItem value={"Pagamento"} sx={{ fontSize: 15 }}>
              {"Pagamento"}
            </MenuItem>
          </TextField>
          <TextField
            id="outlined-select-employee"
            sx={{ mt: 1, mr: 1, mb: 5 }}
            select
            fullWidth
            required
            label="Funcionário"
            value={employee}
            onChange={(e) => {
              setEmployee(e.target.value);
            }}
          >
            <MenuItem value={0} sx={{ fontSize: 15 }}>
              {"Escolha um funcionário"}
            </MenuItem>
            {employees.map((item, index) => (
              <MenuItem key={index} value={item.id} sx={{ fontSize: 15 }}>
                {`${item.name}`}
              </MenuItem>
            ))}
          </TextField>
          <MoneyLabel>Valor*:</MoneyLabel>
          <MoneyInput
            id="input-value"
            name="input-value"
            placeholder="0,00"
            value={value}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
            onValueChange={(value, name) => {
              setValue(value);
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
