import { useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

export default function UpdateStoreDialog({
  openDialog,
  handleCloseDialog,
  handleSubmit,
  rowData,
}) {
  const [name, setName] = useState(rowData.name || "");
  const [accountable, setAccountable] = useState(rowData.accountable || "");
  const [contact, setContact] = useState(rowData.contact || "");
  const [address, setAddress] = useState(rowData.address || "");
  const [nameHelper, setNameHelper] = useState("");
  const [nameError, setNameError] = useState(false);

  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>Atualizar Cadastro</DialogTitle>
        <form
          onSubmit={(e) =>
            handleSubmit({
              e,
              name,
              accountable,
              setAccountable,
              contact,
              setContact,
              address,
              setAddress,
              setName,
              setNameHelper,
              setNameError,
            })
          }
          noValidate
        >
          <DialogContent>
            <TextField
              error={nameError}
              value={name}
              autoFocus
              margin="dense"
              id="name"
              label="Nome"
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
            <Button type="submit">Atualizar</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
