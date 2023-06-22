import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { employeeValidation } from "../../services/validationServices/employeesValidation";
import styled from "styled-components";
import RegisterSnackbar from "../generics/registerSnackbar";
import { EmployeesService } from "../../services/api.services";
import dayjs from "dayjs";
import { MoneyInput, MoneyLabel } from "../../styles/moneyInputStyles";
import AuthContext from "../context/AuthContext";

export default function RegisterEmployeeDialog({
  openDialog,
  handleCloseDialog,
  setEmployees,
  setAbsoluteEmployees,
}) {
  const [name, setName] = useState("");
  const [wageValue, setWageValue] = useState("");
  const [startDate, setStartDate] = useState(dayjs(Date.now()));
  const [contact, setContact] = useState("");
  const [document, setDocument] = useState("");
  const [pix, setPix] = useState("");
  const [address, setAddress] = useState("");
  const [obs, setObs] = useState("");
  const [nameHelper, setNameHelper] = useState("");
  const [dateHelper, setDateHelper] = useState("");
  const [nameError, setNameError] = useState(false);
  const [snackbar, setSnackbar] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const errorObject = employeeValidation({
      name,
      wageValue,
      startDate: startDate.toISOString(),
    });

    if (errorObject) {
      setNameError(errorObject.name.error);
      setNameHelper(errorObject.name.helper);
      setDateHelper(errorObject.startDate.helper);
    } else {
      const wage = Number(wageValue.replace(",", ".") * 100);
      EmployeesService.registerEmployee({
        name,
        wage,
        startDate,
        contact,
        document,
        pix,
        obs,
        address,
        author: userData.name,
      })
        .then(() => {
          setSnackbar(true);
          handleCloseDialog();
          setName("");
          setWageValue("");
          setStartDate(dayjs(Date.now()));
          setContact("");
          setDocument("");
          setPix("");
          setAddress("");
          setObs("");
          EmployeesService.getAllEmployees().then((resp) => {
            setEmployees(resp.data);
            setAbsoluteEmployees(resp.data.length);
          });
        })
        .catch(() => {
          alert("algo deu errado");
        });
    }
  }

  return (
    <>
      <Dialog open={openDialog} onClose={handleCloseDialog} fullWidth>
        <DialogTitle>Registrar Funcionário</DialogTitle>
        <DialogContent>
          <TextField
            error={nameError}
            value={name}
            autoFocus
            margin="dense"
            id="name"
            label="Nome do funcionário"
            type="text"
            required={true}
            fullWidth
            variant="standard"
            helperText={nameHelper}
            onChange={(e) => setName(e.target.value)}
          />
          <MoneyLabel>Salário Base*:</MoneyLabel>
          <MoneyInput
            id="input-example"
            name="input-name"
            placeholder="0,00"
            value={wageValue}
            intlConfig={{ locale: "pt-BR", currency: "BRL" }}
            decimalScale={2}
            onValueChange={(value, name) => setWageValue(value)}
          />
          <TextField
            value={contact}
            margin="dense"
            id="contact"
            label="Contato (opcional)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setContact(e.target.value)}
          />
          <TextField
            value={document}
            margin="dense"
            id="contact"
            label="Documento (opcional)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setDocument(e.target.value)}
          />
          <TextField
            value={pix}
            margin="dense"
            id="pix"
            label="Chave PIX"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setPix(e.target.value)}
          />
          <TextField
            value={address}
            margin="dense"
            id="address"
            label="Endereço (opcional)"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => setAddress(e.target.value)}
          />
          <TextField
            sx={{ mt: 3 }}
            value={obs}
            margin="dense"
            id="obs"
            label="Observações: (opcional)"
            type="text"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            onChange={(e) => setObs(e.target.value)}
            InputProps={{
              sx: {
                fontSize: 16,
              },
            }}
          />
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateWrapper>
              <DesktopDatePicker
                value={startDate}
                autoFocus
                margin="dense"
                label="Data de ínicio"
                id="date"
                inputFormat="DD/MM/YYYY"
                type="date"
                required={true}
                variant="standard"
                onChange={(e) => setStartDate(e)}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    helperText={dateHelper}
                    sx={{ mt: 2 }}
                  />
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
      <RegisterSnackbar
        snackbar={snackbar}
        setSnackbar={setSnackbar}
        type={"success"}
      />
    </>
  );
}

const DateWrapper = styled.div`
  margin-top: 10px;
`;
