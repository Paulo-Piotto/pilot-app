import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { ClientsService } from "../../services/api.services";
import { storeNClientValidation } from "../../services/validationServices/storesNClientsValidation";
import {intToMoney} from "../../services/utils/format";
import { sumTotalBalance } from "../../services/utils/sumTotal";
import AuthContext from "../context/AuthContext";

export default function RegisterClientDialog({
  openDialog,
  handleCloseDialog,
  setClients,
  setTotal,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const [name, setName] = useState("");
  const [accountable, setAccountable] = useState("");
  const [contact, setContact] = useState("");
  const [projectNumber, setProjectNumber] = useState("");
  const [document, setDocument] = useState("");
  const [address, setAddress] = useState("");
  const [nameHelper, setNameHelper] = useState("");
  const [nameError, setNameError] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    setLoading(true);
    const errorObject = storeNClientValidation({ name });

    if (errorObject) {
      setNameError(errorObject.name.error);
      setNameHelper(errorObject.name.helper);
    } else {
      ClientsService.registerClient({
        name,
        accountable,
        contact,
        address,
        projectNumber,
        document,
        author: userData.name,
      })
        .then(() => {
          setSnackbar(true);
          setSnackbarType("success");
          setSnackbarMessage("Obra Cadastrada com sucesso!");
          handleCloseDialog();
          setName("");
          setAccountable("");
          setContact("");
          setProjectNumber("");
          setDocument("");
          setAddress("");
          ClientsService.getClientsBalance({
            initialDate: false,
            endDate: false,
          }).then((resp) => {
            setClients(resp.data);
            setTotal(intToMoney(sumTotalBalance(resp.data)));
            setLoading(false);
          });
        })
        .catch(() => {
          setSnackbar(true);
          setSnackbarType("error");
          setSnackbarMessage("Algo deu errado ao cadastrar a obra");
          setLoading(false);
        });
    }
  }

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>Cadastrar Obra</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
          <DialogContent>
            <TextField
              error={nameError}
              value={name}
              autoFocus
              margin="dense"
              id="name"
              autoComplete="off"
              label="Nome da Obra"
              type="text"
              required={true}
              helperText={nameHelper}
              fullWidth
              variant="standard"
              onChange={(e) => setName(e.target.value)}
            />
            <TextField
              value={accountable}
              margin="dense"
              id="accontable"
              label="Responsavel (opcional)"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setAccountable(e.target.value)}
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
              value={projectNumber}
              margin="dense"
              id="contact"
              label="Nº da matrícula (opcional)"
              type="text"
              fullWidth
              variant="standard"
              onChange={(e) => setProjectNumber(e.target.value)}
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
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancelar</Button>
            <Button type="submit">Cadastrar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
