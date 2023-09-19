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
import {
  averageDateHour,
  ceilDateHour,
  floorDateHour,
} from "../../services/utils/dateServices";
import { intToMoney } from "../../services/utils/format";

export default function FilterLoanDialog({
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
  const todayMinus5 = floorDateHour(new Date(Date.now() - 86400000 * 5));
  const [employee, setEmployee] = useState(0);
  const [employees, setEmployees] = useState(employeesMock);
  const [type, setType] = useState(0);
  const [from, setFrom] = useState(dayjs(todayMinus5));
  const [to, setTo] = useState(dayjs(Date.now()));

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
    setLoading(true);
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Configurações de Busca</DialogTitle>
        <DialogContent>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateContainer>
              <DesktopDatePicker
                value={from}
                autoFocus
                margin="dense"
                label="De:"
                id="date"
                inputFormat="DD/MM/YYYY"
                type="date"
                required={true}
                variant="standard"
                onChange={(e) => setFrom(e)}
                renderInput={(params) => (
                  <TextField {...params} margin="dense" />
                )}
              />
              <DesktopDatePicker
                value={to}
                autoFocus
                margin="dense"
                label="Até:"
                id="date"
                inputFormat="DD/MM/YYYY"
                type="date"
                required={true}
                variant="standard"
                onChange={(e) => setTo(e)}
                renderInput={(params) => (
                  <TextField {...params} sx={{ ml: 1 }} margin="dense" />
                )}
              />
            </DateContainer>
          </LocalizationProvider>
          <TextField
            id="outlined-select-type"
            sx={{ mt: 1, mr: 1, mb: 1, width: 150 }}
            select
            required
            label="Tipo"
            value={type}
            onChange={(e) => setType(e.target.value)}
          >
            <MenuItem value={0} sx={{ fontSize: 15 }}>
              {"Todos"}
            </MenuItem>
            <MenuItem value={1} sx={{ fontSize: 15 }}>
              {"Pedido"}
            </MenuItem>
            <MenuItem value={2} sx={{ fontSize: 15 }}>
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
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button onClick={handleCloseDialog}>Registrar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}

const DateContainer = styled.div`
  width: 100%;
  display: flex;
`;
