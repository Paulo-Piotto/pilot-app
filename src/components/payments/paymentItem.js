import { useState } from "react";
import { TableRow, RowCell } from "../../styles/tableStyles";
import {intToMoney} from "../../services/utils/format";
import { sumTotal } from "../../services/utils/sumTotal";
import DropMenu from "../generics/dropMenu";
import EmployeeDetailsDialog from "../employees/employeeDetailsDialog";

export default function PaymentItem({ rowData, workingDays }) {
  const [openDetails, setOpenDetails] = useState(false);
  const baseWage = rowData.wage;
  const foodTotal = sumTotal(rowData.employees_food);
  const preWage = (rowData.wage * 0.3).toFixed(0) - foodTotal;
  const employeeWorkedDays = rowData.employees_worked_days.length;
  const fullPayment = (
    (rowData.wage * employeeWorkedDays) /
    workingDays
  ).toFixed(0);
  const realPayment = (fullPayment - (preWage + foodTotal)).toFixed(0);

  return (
    <>
      <TableRow>
        <RowCell>{rowData.name}</RowCell>
        <RowCell>R${intToMoney(baseWage)}</RowCell>
        <RowCell>- R${intToMoney(foodTotal)}</RowCell>
        <RowCell>R${intToMoney(preWage)}</RowCell>
        <RowCell>{`${employeeWorkedDays}/${workingDays}`}</RowCell>
        <RowCell>R${intToMoney(fullPayment)}</RowCell>
        <RowCell bold={true}>R${intToMoney(realPayment)}</RowCell>
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
