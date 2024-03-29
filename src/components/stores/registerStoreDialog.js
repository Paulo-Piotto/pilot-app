import { useState, useContext } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { StoresService } from "../../services/api.services";
import { storeNClientValidation } from "../../services/validationServices/storesNClientsValidation";
import AuthContext from "../context/AuthContext";

export default function RegisterStoreDialog({
  openDialog,
  handleCloseDialog,
  setStores,
  setAbsoluteStores,
  setLoading,
  setSnackbar,
  setSnackbarMessage,
  setSnackbarType,
}) {
  const [name, setName] = useState("");
  const [accountable, setAccountable] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [nameHelper, setNameHelper] = useState("");
  const [nameError, setNameError] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleSubmit(e) {
    e.preventDefault();
    const errorObject = storeNClientValidation({ name });

    if (errorObject) {
      setNameError(errorObject.name.error);
      setNameHelper(errorObject.name.helper);
    } else {
      setLoading(true);
      handleCloseDialog();
      StoresService.registerStore({
        name,
        accountable,
        contact,
        address,
        author: userData.name,
      })
        .then(() => {
          setSnackbar(true);
          setSnackbarType('success');
          setSnackbarMessage('Fornecedor registrado com sucesso');
          setName("");
          setAccountable("");
          setContact("");
          setAddress("");
          StoresService.getAllStores()
            .then((resp) => {
              setStores(resp.data);
              setAbsoluteStores(resp.data.length);
              setLoading(false);
            })
            .catch(() => {
              setLoading(false);
              setSnackbar(true);
              setSnackbarType('error');
              setSnackbarMessage('Algo deu errado ao buscar os fornecedores');
            });
        })
        .catch(() => {
          setSnackbar(true);
          setSnackbarType('error');
          setSnackbarMessage('Algo deu errado ao cadastrar o fornecedor');
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
        <DialogTitle>Cadastrar Loja</DialogTitle>
        <form onSubmit={handleSubmit} noValidate>
          <DialogContent>
            <TextField
              error={nameError}
              value={name}
              autoFocus
              margin="dense"
              id="name"
              label="Nome da loja"
              autoComplete="off"
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
