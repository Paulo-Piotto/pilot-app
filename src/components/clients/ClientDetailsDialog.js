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
import Inventory2OutlinedIcon from "@mui/icons-material/Inventory2Outlined";
import styled from "styled-components";
import ArchiveDialog from "../generics/archiveDialog";
import { ClientsService } from "../../services/api.services";
import intToMoney from "../../services/utils/intToMoney";
import { sumTotalBalance, sumTotal } from "../../services/utils/sumTotal";
import AuthContext from "../context/AuthContext";

export default function ClientDetailsDialog({
  rowData,
  openDialog,
  handleCloseDialog,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
  setClients,
  setTotal,
}) {
  const [checked, setChecked] = useState(rowData.isArchived);
  const [openArchive, setOpenArchive] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleArchive() {
    setLoading(true);
    ClientsService.updateClient({
      id: rowData.id,
      name: rowData.name,
      author: userData.name,
      isArchived: checked,
    })
      .then(() => {
        ClientsService.getClientsBalance({
          initialDate: false,
          endDate: false,
          isArchived: false,
        })
          .then((resp) => {
            setClients(resp.data);
            setTotal(intToMoney(sumTotalBalance(resp.data)));
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
        <DialogTitle>Detalhes da Obra</DialogTitle>
        <DialogContent>
          <TextField
            value={rowData.name}
            margin="dense"
            id="name"
            label="Nome da Obra:"
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
            value={rowData.projectNumber || "n/a"}
            margin="dense"
            id="projectNumber"
            label="Nº da matrícula:"
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
          {userData.role === "root" ? (
            <>
              <TextField
                value={intToMoney(sumTotal(rowData.orders))}
                margin="dense"
                id="orders"
                label="Total de Pedidos:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={intToMoney(rowData.totalExpense)}
                margin="dense"
                id="labor"
                label="Total de Mão de Obra:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={intToMoney(
                  sumTotal(rowData.orders) + rowData.totalExpense
                )}
                margin="dense"
                id="expenses"
                label="Total de despesas:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={intToMoney(sumTotal(rowData.incomes))}
                margin="dense"
                id="incomes"
                label="Total de Receitas:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
              <TextField
                value={intToMoney(
                  sumTotal(rowData.incomes) -
                    (sumTotal(rowData.orders) + rowData.totalExpense)
                )}
                margin="dense"
                id="balance"
                label="Saldo da Obra:"
                type="text"
                variant="standard"
                fullWidth
                InputProps={{
                  readOnly: true,
                }}
              />
            </>
          ) : (
            ""
          )}
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
                checked={checked}
                onChange={(e) => {
                  setChecked(e.target.checked);
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
          setChecked(!checked);
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
