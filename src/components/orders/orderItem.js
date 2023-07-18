import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import dayjs from "dayjs";
import DeleteDialog from "../generics/deleteDialog";
import { OrdersService } from "../../services/api.services";
import { sumTotal } from "../../services/utils/sumTotal";
import { intToMoney } from "../../services/utils/format";
import DropMenu from "../generics/dropMenu";
import OrderDetailsDialog from "./OrderDetailsDialog";
import EditOrderDialog from "./editOrderDialog";
import {
  lastDayTarget,
  floorDateHour,
} from "../../services/utils/dateServices";
export default function OrderItem({
  rowData,
  setTotal,
  setOrders,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const date = dayjs(rowData.date).format("DD/MM/YYYY");

  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  function handleSubmitDelete() {
    setLoading(true);
    OrdersService.deleteOrder(rowData.id)
      .then(() => {
        const dayOne = floorDateHour(lastDayTarget(1));
        const searchSettings = {
          initialDate: dayOne,
          endDate: dayjs(Date.now()).toISOString(),
          store: 0,
          client: 0,
        };
        OrdersService.filterOrders(searchSettings)
          .then((resp) => {
            setOrders(resp.data);
            setTotal(intToMoney(sumTotal(resp.data)));
            setSnackbarType("success");
            setSnackbarMessage("Item deletado com sucesso");
            setSnackbar(true);
            setOpenDelete(false);
            setLoading(false);
          })
          .catch(() => {
            setSnackbarType("error");
            setSnackbarMessage("Algo deu errado ao recuperar os pedidos");
            setSnackbar(true);
            setOpenDelete(false);
            setLoading(false);
          });
      })
      .catch(() => {
        setSnackbarType("error");
        setSnackbarMessage("Algo deu errado ao recuperar os pedidos");
        setSnackbar(true);
        setOpenDelete(false);
        setLoading(false);
      });
  }

  return (
    <>
      <TableRow>
        <RowCell>{rowData.invoice}</RowCell>
        <RowCell>{rowData.clients.name}</RowCell>
        <RowCell>{rowData.stores.name}</RowCell>
        <RowCell>R$ {intToMoney(rowData.value)}</RowCell>
        <RowCell>{date}</RowCell>
        <RowCell icon={true}>
          <DropMenu
            setOpenDelete={setOpenDelete}
            setOpenDetails={setOpenDetails}
            setOpenUpdate={setOpenUpdate}
            details={true}
            edit={true}
            deletion={true}
          />
        </RowCell>
      </TableRow>
      <DeleteDialog
        openDialog={openDelete}
        handleCloseDialog={() => setOpenDelete(false)}
        handleSubmit={handleSubmitDelete}
      />
      <OrderDetailsDialog
        openDialog={openDetails}
        handleCloseDialog={() => setOpenDetails(false)}
        rowData={rowData}
      />
      <EditOrderDialog
        openDialog={openUpdate}
        handleCloseDialog={() => setOpenUpdate(false)}
        rowData={rowData}
        setTotal={setTotal}
        setOrders={setOrders}
        setLoading={setLoading}
      />
    </>
  );
}
