import { useState, useContext } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import { intToMoney } from "../../services/utils/format";
import { sumTotal, sumTotalBalance } from "../../services/utils/sumTotal";
import DeleteDialog from "../generics/deleteDialog";
import UpdateClientDialog from "./updateClientDialog";
import ClientDetailsDialog from "./ClientDetailsDialog";
import { ClientsService } from "../../services/api.services";
import { storeNClientValidation } from "../../services/validationServices/storesNClientsValidation";
import DropMenu from "../generics/dropMenu";
import AuthContext from "../context/AuthContext";

export default function BalanceItem({
  rowData,
  setTotal,
  setClients,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const [openDelete, setOpenDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const ordersValue = sumTotal(rowData.orders);
  const laborValue = rowData.totalExpense;
  const incomesValue = intToMoney(sumTotal(rowData.incomes));
  const fullExpense = intToMoney(ordersValue + laborValue);
  const balance = intToMoney(
    sumTotal(rowData.incomes) - (ordersValue + laborValue)
  );
  const balanceColor = balance[0] === "-" ? "#db0000" : "#047a0a";
  const { userData } = useContext(AuthContext);

  function handleDelete() {
    setLoading(true);
    const deletePromise = ClientsService.deleteClient(rowData.id);
    deletePromise
      .then(() => {
        const getPromise = ClientsService.getClientsBalance({
          initialDate: false,
          endDate: false,
        });
        getPromise
          .then((resp) => {
            setClients(resp.data);
            setTotal(intToMoney(sumTotalBalance(resp.data)));
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

  function handleUpdate({
    e,
    name,
    accountable,
    setAccountable,
    contact,
    setContact,
    address,
    setAddress,
    projectNumber,
    setProjectNumber,
    document,
    setDocument,
    setName,
    setNameHelper,
    setNameError,
  }) {
    e.preventDefault();
    setLoading(true);
    const errorObject = storeNClientValidation({ name });

    if (errorObject) {
      setNameError(errorObject.name.error);
      setNameHelper(errorObject.name.helper);
    } else {
      const updatePromise = ClientsService.updateClient({
        name,
        accountable,
        contact,
        address,
        projectNumber,
        document,
        id: rowData.id,
        author: userData.name,
      });
      updatePromise
        .then(() => {
          setOpenUpdate(false);
          setName("");
          const getPromise = ClientsService.getClientsBalance({
            initialDate: false,
            endDate: false,
          });
          getPromise
            .then((resp) => {
              setClients(resp.data);
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
        .catch((err) => {
          setSnackbarType("error");
          setSnackbarMessage("Algo deu errado ao atualizar o item");
          setSnackbar(true);
          setLoading(false);
        });
    }
  }

  return (
    <>
      <TableRow>
        <RowCell>{rowData.name}</RowCell>
        {userData.role === "root" ? (
          <>
            <RowCell>{incomesValue}</RowCell>
            <RowCell>{fullExpense}</RowCell>
            <RowCell color={balanceColor} bold={true}>
              {balance}
            </RowCell>
          </>
        ) : null}
        <RowCell icon={true}>
          <DropMenu
            setOpenUpdate={setOpenUpdate}
            setOpenDelete={setOpenDelete}
            setOpenDetails={setOpenDetails}
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
      <UpdateClientDialog
        openDialog={openUpdate}
        handleCloseDialog={() => setOpenUpdate(false)}
        handleSubmit={handleUpdate}
        rowData={rowData}
      />
      <ClientDetailsDialog
        openDialog={openDetails}
        handleCloseDialog={() => setOpenDetails(false)}
        rowData={rowData}
        setClients={setClients}
        setTotal={setTotal}
        setLoading={setLoading}
        setSnackbar={setSnackbar}
        setSnackbarType={setSnackbarType}
        setSnackbarMessage={setSnackbarMessage}
      />
    </>
  );
}
