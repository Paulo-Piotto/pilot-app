import { useState, useEffect, useContext } from "react";
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
import dayjs from "dayjs";
import styled from "styled-components";
import { ClientsService, PaymentsService } from "../../services/api.services";
import { sumTotalPayments } from "../../services/utils/sumTotal";
import {intToMoney} from "../../services/utils/format";
import {
  floorDateHour,
  ceilDateHour,
  lastDayTarget,
  penultDayTarget,
} from "../../services/utils/dateServices";
import AuthContext from "../context/AuthContext";

export default function FilterPaymentsDialog({
  openDialog,
  handleCloseDialog,
  setEmployees,
  setWorkingDays,
  setTotal,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const [from, setFrom] = useState(dayjs(penultDayTarget(21)));
  const [to, setTo] = useState(dayjs(lastDayTarget(20)));
  const [clients, setClients] = useState([]);
  const [selectedClient, setSelectedClient] = useState("Todas");
  const [employeeName, setEmployeeName] = useState("");
  const { userData } = useContext(AuthContext);

  useEffect(() => {
    ClientsService.getAllClients().then((resp) => {
      setClients(resp.data);
    });
  }, []);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);

    floorDateHour(from);

    const searchSettings = `from=${floorDateHour(from)}&to=${ceilDateHour(to)}${
      selectedClient !== "Todas" ? `&client=${selectedClient}` : ""
    }${employeeName ? `&employee=${employeeName}` : ""}`;

    PaymentsService.getEmployeesWorkedDays(searchSettings, userData.token)
      .then((resp) => {
        setLoading(false);
        setEmployees(resp.data);
        const employeesArray = resp.data;
        PaymentsService.getPeriodWorkingDays(searchSettings, userData.token)
          .then((resp) => {
            setWorkingDays(resp.data);
            setTotal(
              intToMoney(
                sumTotalPayments(employeesArray, resp.data.length).toFixed(0)
              )
            );
            handleCloseDialog();
          })
          .catch(() => {
            setLoading(false);
            setSnackbar(true);
            setSnackbarType("error");
            setSnackbarMessage("Algo deu errado na busca por dias úteis");
          });
      })
      .catch(() => {
        setEmployees([]);
        setLoading(false);
        setSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado na busca por funcionários");
      });
    setEmployeeName("");
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
              id="outlined-select-client"
              sx={{ mt: 1 }}
              select
              fullWidth
              label="Obra"
              defaultValue={"Todas"}
              value={selectedClient}
              onChange={(e) => setSelectedClient(e.target.value)}
            >
              <MenuItem key={0} value={"Todas"}>
                {"Todas"}
              </MenuItem>
              {clients.map((client) => (
                <MenuItem key={client.id} value={client.name}>
                  {client.name}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              value={employeeName}
              margin="dense"
              id="name"
              label="Nome do funcionário"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setEmployeeName(e.target.value)}
            />
          </DialogContent>
          <DialogActions sx={{ mb: 2, mr: 2 }}>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit">Buscar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}

const DateContainer = styled.div`
  width: 100%;
  display: flex;
`;
