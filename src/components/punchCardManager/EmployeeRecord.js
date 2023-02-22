import { useContext } from "react"
import PunchCardContext from "../context/PunchCardContext"
import LogoLoadingSpinner from "../generics/logoLoadingSpinner"
import pilotLoaderLogo from "../../assets/pilot-spinner-logo-black.png";
import { EmployeeRecordContainer } from "./styles";
import parseIntToMoney from "../../services/utils/intToMoney";
import dayjs from "dayjs";
import PunchCard from "./PunchCard";

export default function EmployeeRecord() {
    const { punchCardData } = useContext(PunchCardContext)
    const { selectedEmployee } = punchCardData

    if(!selectedEmployee) return (
        <>
            <LogoLoadingSpinner image={pilotLoaderLogo} width="50px" height="50px"/>
            <p>Você não selecionou nenhum funcionário ainda</p>
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