import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContentText from "@mui/material/DialogContentText";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";

export default function DeleteDialog({
  openDialog,
  handleCloseDialog,
  handleSubmit,
  amount,
}) {
  return (
    <>
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth={true}
      >
        <DialogTitle>
          Tem certeza que deseja deletar
          {amount ? ` ${amount} itens` : " esse item"}?
        </DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ fontSize: 15 }}>
            <p>
              {"Essa ação não poderá ser desfeita   "}
              <PriorityHighIcon sx={{ color: "red" }} />
              <PriorityHighIcon sx={{ color: "red" }} />
              <PriorityHighIcon sx={{ color: "red" }} />
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancelar</Button>
          <Button variant="contained" color="error" onClick={handleSubmit}>
            Deletar
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
