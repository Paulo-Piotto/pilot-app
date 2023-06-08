import { useState } from "react";
import {
  Button,
  TextField,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  DialogContentText,
} from "@mui/material/";
import { ClientsService } from "../../services/api.services";
import intToMoney from "../../services/utils/intToMoney";
import { sumTotalBalance } from "../../services/utils/sumTotal";
import dayjs from "dayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ptBR } from "@mui/x-date-pickers/locales";
import styled from "styled-components";
import { ceilDateHour, floorDateHour } from "../../services/utils/dateServices";

export default function SearchClientDialog({
  openDialog,
  handleCloseDialog,
  setClients,
  setTotal,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const todayMinus30 = Date.now() - 86400000 * 30;
  const [initialDate, setInitialDate] = useState(dayjs(todayMinus30));
  const [endDate, setEndDate] = useState(dayjs(Date.now()));
  const [name, setName] = useState("");
  const [includeArchived, setIncludeArchived] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    handleCloseDialog();

    const searchSettings = {
      initialDate: floorDateHour(initialDate),
      endDate: ceilDateHour(endDate),
      name,
      includeArchived,
    };
    ClientsService.searchClient(searchSettings)
      .then((resp) => {
        setClients(resp.data);
        setTotal(intToMoney(sumTotalBalance(resp.data)));
        setName("");
        setLoading(false);
        setIncludeArchived(false);
      })
      .catch((err) => {
        setSnackbar(true);
        setSnackbarMessage("Nenhum resultado para essa busca");
        setSnackbarType("error");
        setClients([]);
        setTotal("0,00");
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
        <DialogTitle>Buscar Obra</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
          <DialogContent>
            <LocalizationProvider
              dateAdapter={AdapterDayjs}
              localeText={
                ptBR.components.MuiLocalizationProvider.defaultProps.localeText
              }
            >
              <DateContainer>
                <DesktopDatePicker
                  value={initialDate}
                  autoFocus
                  margin="dense"
                  label="De:"
                  id="date"
                  inputFormat="MM/YYYY"
                  views={["month", "year"]}
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
                  inputFormat="MM/YYYY"
                  views={["month", "year"]}
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
              value={name}
              autoFocus
              margin="dense"
              id="name"
              autoComplete="off"
              label="Nome da obra"
              type="text"
              required={true}
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <DialogContentText sx={{ fontSize: 18, mt: 3 }}>
              <ArchiveContainer>
                <Checkbox
                  checked={includeArchived}
                  onChange={(e) => setIncludeArchived(e.target.checked)}
                  inputProps={{ "aria-label": "controlled" }}
                />
                <p>Incluir Arquivados </p>
              </ArchiveContainer>
            </DialogContentText>
          </DialogContent>
          <DialogActions>
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

const ArchiveContainer = styled.div`
  display: flex;
  align-items: center;
`;
