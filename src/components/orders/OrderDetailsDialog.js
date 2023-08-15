import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import { intToMoney } from "../../services/utils/format";
import dayjs from "dayjs";

export default function OrderDetailsDialog({
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
        <DialogTitle>Detalhes do Pedido</DialogTitle>
        <DialogContent>
          <TextField
            value={rowData.invoice}
            margin="dense"
            id="name"
            label="Pedido:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.clients.name}
            margin="dense"
            id="Client"
            label="Obra:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.stores.name}
            margin="dense"
            id="store"
            label="Loja:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={`R$ ${intToMoney(rowData.value)}`}
            margin="dense"
            id="value"
            label="Valor Pago:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={`R$ ${intToMoney(rowData.value_financed)}`}
            margin="dense"
            id="value"
            label="Valor à Prazo:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: 15,
              },
            }}
          />
          <TextField
            value={`R$ ${intToMoney(rowData.value_cash)}`}
            margin="dense"
            id="value"
            label="Valor à Vista:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: 15,
              },
            }}
          />
          <TextField
            value={
              rowData.value_negotiated
                ? `R$ ${intToMoney(rowData.value_negotiated)}`
                : "n/a"
            }
            margin="dense"
            id="value"
            label="Valor Negociado:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: 15,
              },
            }}
          />
          <TextField
            value={dayjs(rowData.date).format("DD/MM/YYYY")}
            margin="dense"
            id="contact"
            label="Data do Pedido:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.obs || "n/a"}
            margin="dense"
            id="contact"
            label="Observações:"
            type="text"
            variant="filled"
            fullWidth
            minRows={3}
            multiline
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: 15,
              },
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
