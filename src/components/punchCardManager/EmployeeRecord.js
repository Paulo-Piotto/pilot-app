import { useContext } from "react";
import PunchCardContext from "../context/PunchCardContext";
import animation from "../../assets/person_searching.json";
import { EmployeeRecordContainer } from "./styles";
import {intToMoney} from "../../services/utils/format";
import dayjs from "dayjs";
import PunchCard from "./PunchCard";
import Lottie from "lottie-react";

export default function EmployeeRecord() {
  const { punchCardData } = useContext(PunchCardContext);
  const { selectedEmployee } = punchCardData;

  if (!selectedEmployee)
    return (
      <>
        <div
          style={{
            width: "70%",
            maxWidth: 300,
            margin: "0 auto",
            height: 200,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Lottie animationData={animation} />
        </div>
        <p style={{ marginTop: 20, textAlign: "center" }}>
          Você não selecionou nenhum funcionário ainda, selecione um funcionário
          para ver sua ficha
        </p>
      </>
    );
  return (
    <EmployeeRecordContainer selectedEmployee={!!selectedEmployee}>
      <div className="employee_record_cell">
        <p>Nome: </p>
        <span>{selectedEmployee.name}</span>
      </div>

      <div className="employee_record_cell">
        <p>Salário Base: </p>
        <span>R$: {intToMoney(selectedEmployee.wage)}</span>
      </div>

      <div className="employee_record_cell">
        <p>Cadastrado em:</p>
        <span>{dayjs(selectedEmployee.start_day).format("DD/MM/YYYY")}</span>
      </div>

      <div className="employee_record_cell">
        <p>Dias Trabalhados: </p>
        <span>{selectedEmployee.employees_worked_days.length}</span>
      </div>

      <div className="punch_card">
        <PunchCard employeeData={punchCardData.selectedEmployee} />
      </div>
    </EmployeeRecordContainer>
  );
}
