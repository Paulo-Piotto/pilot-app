import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import intToMoney from "../../services/utils/intToMoney";
import DropMenu from "../generics/dropMenu";
import EmployeeDetailsDialog from "../employees/employeeDetailsDialog";

export default function PaymentItem({ rowData, workingDays }) {
  const [openDetails, setOpenDetails] = useState(false);
  const baseWage = intToMoney(rowData.wage);
  const employeeWorkedDays = rowData.employees_worked_days.length;
  const fullPayment = (rowData.wage * employeeWorkedDays) / workingDays;

  return (
    <>
      <TableRow>
        <RowCell>{rowData.name}</RowCell>
        <RowCell>{baseWage}</RowCell>
        <RowCell>{`${employeeWorkedDays}/${workingDays}`}</RowCell>
        <RowCell bold={true}>R${intToMoney(fullPayment.toFixed(0))}</RowCell>
        <RowCell icon={true}>
          <DropMenu
            setOpenDetails={setOpenDetails}
            details={true}
            edit={false}
            deletion={false}
          />
        </RowCell>
      </TableRow>
      <EmployeeDetailsDialog
        openDialog={openDetails}
        handleCloseDialog={() => setOpenDetails(false)}
        rowData={rowData}
      />
    </>
  );
}
