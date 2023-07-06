import { useState, useContext } from "react";
import {
  DialogContentText,
  Switch,
  TextField,
  DialogTitle,
  DialogContent,
  DialogActions,
  Dialog,
  Button,
} from "@mui/material";
import {intToMoney, stringToCpf, stringToPhone} from "../../services/utils/format";
import dayjs from "dayjs";
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import styled from "styled-components";
import ArchiveDialog from "../generics/archiveDialog";
import AuthContext from "../context/AuthContext";
import { EmployeesService } from "../../services/api.services";

export default function EmployeeDetailsDialog({
  rowData,
  openDialog,
  handleCloseDialog,
  setSnackbar,
  setSnackbarMessage,
  setSnackbarType,
  setEmployees,
  setAbsolute,
  setLoading,
}) {
  const [openArchive, setOpenArchive] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleArchive() {
    setLoading(true);
    EmployeesService.updateEmployee({
      id: rowData.id,
      name: rowData.name,
      author: userData.name,
      wage: rowData.wage,
      startDate: rowData.start_day,
      isArchived: !rowData.isArchived,
    })
      .then(() => {
        EmployeesService.getEmployees()
          .then((resp) => {
            setEmployees(resp.data);
            setAbsolute(resp.data.length);
            setSnackbarType("success");
            setSnackbarMessage("Status alterado com sucesso");
            setSnackbar(true);
            setOpenArchive(false);
            handleCloseDialog();
            setLoading(false);
          })
          .catch(() => {
            setSnackbarType("error");
            setSnackbarMessage("Algo deu errado ao recuperar os itens");
            setSnackbar(true);
            setOpenArchive(false);
            handleCloseDialog();
            setLoading(false);
          });
      })
      .catch(() => {
        setSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao tentar arquivar o item");
        setOpenArchive(false);
        setLoading(false);
        handleCloseDialog();
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
        <DialogTitle>Detalhes do Funcionário</DialogTitle>
        <DialogContent>
          <TextField
            value={rowData.name}
            margin="dense"
            id="name"
            label="Apelido do funcionário:"
            type="text"
            variant="standard"
            fullWidth
            InputProps={{
              readOnly: true,
            }}
          />
          <TextField
            value={rowData.fullname || "n/a"}
            margin="dense"
            id="fullname"
            label="Nome Completo:"
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
            value={stringToPhone(rowData.contact) || "n/a"}
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
            value={stringToCpf(rowData.document) || "n/a"}
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
            value={intToMoney(rowData.loan)}
            margin="dense"
            id="loan"
            label="Valor Emprestado:"
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
          <DialogContentText sx={{ fontSize: 18, mt: 3 }}>
            <ArchiveContainer>
              <Inventory2OutlinedIcon fontSize="small" sx={{ mr: 1 }} />
              <p>Arquivar: </p>
              <Switch
                checked={rowData.isArchived}
                onChange={(e) => {
                  setOpenArchive(true);
                }}
                inputProps={{ "aria-label": "controlled" }}
              />
            </ArchiveContainer>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Fechar</Button>
        </DialogActions>
      </Dialog>
      <ArchiveDialog
        openDialog={openArchive}
        handleCloseDialog={() => {
          setOpenArchive(false);
        }}
        handleSubmit={handleArchive}
      />
    </>
  );
}

const ArchiveContainer = styled.div`
  display: flex;
  align-items: center;
`;
