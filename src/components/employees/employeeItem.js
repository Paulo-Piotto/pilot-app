import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import DeleteDialog from "../generics/deleteDialog";
import { EmployeesService } from "../../services/api.services";
import DropMenu from "../generics/dropMenu";
import EmployeeDetailsDialog from "./employeeDetailsDialog";
import UpdateEmployeeDialog from "./updateEmployeeDialog";
import { stringToCpf } from "../../services/utils/format";

export default function EmployeeItem({
  rowData,
  setAbsolute,
  setItems,
  setLoading,
  setSnackbar,
  setSnackbarType,
  setSnackbarMessage,
}) {
  const { deleteEmployee, getAllEmployees } = EmployeesService;
  const [openDelete, setOpenDelete] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);

  function handleDelete() {
    setLoading(true);
    deleteEmployee(rowData.id)
      .then(() => {
        getAllEmployees()
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

  return (
    <>
      <TableRow>
        <RowCell>{rowData.name}</RowCell>
        <RowCell>{stringToCpf(rowData.document) || "--"}</RowCell>
        <RowCell>{rowData.contact || "--"}</RowCell>
        <RowCell icon={true}>
          <DropMenu
            setOpenDetails={setOpenDetails}
            setOpenDelete={setOpenDelete}
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
        handleSubmit={handleDelete}
      />
      <EmployeeDetailsDialog
        openDialog={openDetails}
        handleCloseDialog={() => setOpenDetails(false)}
        rowData={rowData}
      />
      <UpdateEmployeeDialog
        openDialog={openUpdate}
        handleCloseDialog={() => setOpenUpdate(false)}
        setEmployees={setItems}
        rowData={rowData}
        setSnackbar={setSnackbar}
        setSnackbarMessage={setSnackbarMessage}
        setSnackbarType={setSnackbarType}
      />
    </>
  );
}
