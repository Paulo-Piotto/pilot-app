import { useContext } from "react"
import PunchCardContext from "../context/PunchCardContext"
import LogoLoadingSpinner from "../generics/logoLoadingSpinner"
import pilotLoaderLogo from "../../assets/pilot-spinner-logo-black.png";

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
        <div>
            <p>{`Nome: ${selectedEmployee.name}`}</p>
            <p>{`Salário Base: ${selectedEmployee.wage}`}</p>
            <p>{`Cadastrado em: ${selectedEmployee.start_day}`}</p>
            <p>{`Dias Trabalhados: ${selectedEmployee.employees_worked_days.length}`}</p>
        </div>
    )
}