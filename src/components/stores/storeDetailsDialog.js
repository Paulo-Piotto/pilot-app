import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";

export default function StoreDetailsDialog({
  rowData,
  openDialog,
  handleCloseDialog,
}) {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>Detalhes da Loja</DialogTitle>
        <DialogContent>
          <TextField
            value={rowData.name}
            margin="dense"
            id="name"
            label="Nome da Loja:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.accountable || "n/a"}
            margin="dense"
            id="accountable"
            label="Responsável:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.contact || "n/a"}
            margin="dense"
            id="contact"
            label="Contato:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.address || "n/a"}
            margin="dense"
            id="address"
            label="Endereço:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.author || "Desconhecido"}
            margin="dense"
            id="lastEditedBy"
            label="Última edição por:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: 16,
              },
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
