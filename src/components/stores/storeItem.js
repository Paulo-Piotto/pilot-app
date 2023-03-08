import { useState, useContext } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import DeleteDialog from "../generics/deleteDialog";
import { StoresService } from "../../services/api.services";
import DropMenu from "../generics/dropMenu";
import { storeNClientValidation } from "../../services/validationServices/storesNClientsValidation";
import UpdateDialog from "../generics/updateDialog";
import AuthContext from "../context/AuthContext";
import StoreDetailsDialog from "./storeDetailsDialog";

export default function StoreItem({
  rowData,
  setAbsolute,
  setItems,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const { deleteStore, getAllStores, updateStore } = StoresService;
  rowData.start_day = dayjs(rowData.start_day).format("DD/MM/YYYY");
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleDelete() {
    setLoading(true);
    const deletePromise = deleteStore(rowData.id);
    deletePromise
      .then(() => {
        const getPromise = getAllStores();
        getPromise
          .then((resp) => {
            setItems(resp.data);
            setAbsolute(resp.data.length);
            setSnackbarType("success");
            setSnackbarMessage("Item deletado com sucesso");
            setSnackbar(true);
            setOpenDelete(false);
            setLoading(false);
          })
          .catch(() => {
            setSnackbarType("error");
            setSnackbarMessage("Algo deu errado ao recuperar os itens");
            setSnackbar(true);
            setOpenDelete(false);
            setLoading(false);
          });
      })
      .catch(() => {
        setSnackbar(true);
        setSnackbarType("error");
        setSnackbarMessage("Impossível deletar item");
        setOpenDelete(false);
        setLoading(false);
        setSnackbar(true);
      });
  }

  function handleUpdate({ e, name, setName, setNameError, setNameHelper }) {
    e.preventDefault();
    setLoading(true);
    const errorObject = storeNClientValidation({ name });

    if (errorObject) {
      setNameError(errorObject.name.error);
      setNameHelper(errorObject.name.helper);
    } else {
      const updatePromise = updateStore({
        name,
        id: rowData.id,
        author: userData.name,
      });
      updatePromise
        .then(() => {
          setOpenUpdate(false);
          setName("");
          const getPromise = getAllStores();
          getPromise
            .then((resp) => {
              setItems(resp.data);
              setSnackbarType("success");
              setSnackbarMessage("Item atualizado com sucesso");
              setSnackbar(true);
              setOpenUpdate(false);
              setLoading(false);
            })
            .catch(() => {
              setSnackbarType("error");
              setSnackbarMessage("Algo deu errado ao recuperar os itens");
              setSnackbar(true);
              setLoading(false);
            });
        })
        .catch(() => {
          setSnackbarType("error");
          setSnackbarMessage("Algo deu errado ao atualizar o item");
          setSnackbar(true);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <TableRow single={true}>
        <RowCell>{rowData.name}</RowCell>
        <RowCell icon={true}>
          <DropMenu
            setOpenDetails={setOpenDetails}
            setOpenUpdate={setOpenUpdate}
            setOpenDelete={setOpenDelete}
            details={true}
            edit={true}
            deletion={true}
          />
        </RowCell>
      </TableRow>
      <DeleteDialog
        openDialog={openDelete}
        handleCloseDialog={() => setOpenDelete(false)}
        handleSubmit={handleDelete}
      />
      <UpdateDialog
        openDialog={openUpdate}
        handleCloseDialog={() => setOpenUpdate(false)}
        handleSubmit={handleUpdate}
      />
      <StoreDetailsDialog
        openDialog={openDetails}
        handleCloseDialog={() => setOpenDetails(false)}
        rowData={rowData}
      />
    </>
  );
}
