import { useContext } from "react"
import PunchCardContext from "../context/PunchCardContext"
import animation from "../../assets/person_searching.json"
import { EmployeeRecordContainer } from "./styles";
import parseIntToMoney from "../../services/utils/intToMoney";
import dayjs from "dayjs";
import PunchCard from "./PunchCard";
import Lottie from "lottie-react";

export default function EmployeeRecord() {
    const { punchCardData } = useContext(PunchCardContext)
    const { selectedEmployee } = punchCardData

    if(!selectedEmployee) return (
        <>
            <div style={{width: "100%",maxWidth: 600, margin: "0 auto",height: 300, display: "flex", alignItems: "center", justifyContent: "center"}}><Lottie animationData={animation} /></div>
            <p style={{marginTop: 20, textAlign: "center"}}>Você não selecionou nenhum funcionário ainda, selecione um funcionário para ver sua ficha</p>
        </>
    )
    return (
        <EmployeeRecordContainer>
            <div className="employee_record_cell">
                <p>{selectedEmployee.name}</p>
            </div>

            <div className="employee_record_cell">
                <p>{`Salário Base: R$: ${parseIntToMoney(selectedEmployee.wage)}`}</p>
            </div>

            <div className="employee_record_cell">
                <p>{`Cadastrado em: ${dayjs(selectedEmployee.start_day).format("DD/MM/YYYY")}`}</p>
            </div>

            <div className="employee_record_cell">
                <p>{`Dias Trabalhados: ${selectedEmployee.employees_worked_days.length}`}</p>
            </div>

            <div className="punch_card">
                <PunchCard employeeData={punchCardData.selectedEmployee}/>
            </div>
        </EmployeeRecordContainer>
    )
}