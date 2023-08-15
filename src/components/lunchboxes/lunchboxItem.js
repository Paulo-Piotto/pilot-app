import { useState, useContext } from "react";
import { sumTotal } from "../../services/utils/sumTotal";
import { intToMoney } from "../../services/utils/format";
import { FoodControlService } from "../../services/api.services";
import { TableRow, RowCell } from "../../styles/tableStyles";
import DropMenu from "../generics/dropMenu";
import DeleteDialog from "../generics/deleteDialog";
import dayjs from "dayjs";
import AuthContext from "../context/AuthContext";
import UpdateLunchboxDialog from "./updateLunchboxDialog";
import { ceilDateHour, floorDateHour } from "../../services/utils/dateServices";

export default function LunchboxItem({
  rowData,
  setTotal,
  setItems,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const { deleteFoodOrder, getFoodOrders } = FoodControlService;
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const { userData } = useContext(AuthContext);

  function handleDelete() {
    const deleteSettings = `id=${rowData.id}`;
    const today = ceilDateHour(new Date(Date.now()));
    const todayMinus30 = floorDateHour(new Date(Date.now() - 86400000 * 30));
    const filterString = `from=${todayMinus30}&to=${today}`;
    setLoading(true);
    deleteFoodOrder(deleteSettings, userData.token)
      .then(() => {
        getFoodOrders(filterString, userData.token)
          .then((resp) => {
            setItems(resp.data);
            setTotal(sumTotal(resp.data));
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

  return (
    <>
      <TableRow>
        <RowCell>{rowData.employees.name}</RowCell>
        <RowCell>{dayjs(rowData.date).format("DD/MM/YYYY")}</RowCell>
        <RowCell>{rowData.type}</RowCell>
        <RowCell>R$ {intToMoney(rowData.value)}</RowCell>
        <RowCell icon={true}>
          <DropMenu
            setOpenDelete={setOpenDelete}
            setOpenUpdate={setOpenUpdate}
            details={false}
            edit={true}
            deletion={true}
            author={rowData.author}
          />
        </RowCell>
      </TableRow>
      <DeleteDialog
        openDialog={openDelete}
        handleCloseDialog={() => setOpenDelete(false)}
        handleSubmit={handleDelete}
      />

      <UpdateLunchboxDialog
        openDialog={openUpdate}
        handleCloseDialog={() => setOpenUpdate(false)}
        setItems={setItems}
        setTotal={setTotal}
        rowData={rowData}
        setLoading={setLoading}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarType={setSnackbarType}
      />
    </>
  );
}
