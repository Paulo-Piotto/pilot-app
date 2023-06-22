import {
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import {intToMoney} from "../../services/utils/format";
import dayjs from "dayjs";

export default function EmployeeDetailsDialog({
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
        <DialogTitle>Detalhes do Funcionário</DialogTitle>
        <DialogContent>
          <TextField
            value={rowData.name}
            margin="dense"
            id="name"
            label="Nome do funcionário:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={intToMoney(rowData.wage)}
            margin="dense"
            id="salary"
            label="Salário base:"
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
            value={rowData.document || "n/a"}
            margin="dense"
            id="document"
            label="Documento:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.pix || "n/a"}
            margin="dense"
            id="document"
            label="Chave Pix:"
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
            value={rowData.obs || "n/a"}
            margin="dense"
            id="contact"
            label="Observações:"
            type="text"
            variant="filled"
            fullWidth
            minRows={4}
            multiline
            InputProps={{
              readOnly: true,
              sx: {
                fontSize: 15,
              },
            }}
          />
          <TextField
            value={dayjs(rowData.start_day).format("DD/MM/YYYY")}
            margin="dense"
            id="register"
            label="Registrado em:"
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
