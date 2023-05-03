import { useContext, useEffect } from "react"
import PunchCardContext from "../context/PunchCardContext"
import EmployeeCard from "./EmployeeCard"
import { MassEditorContainer } from "./styles"
import MassActions from "./MassActions"
import MassActionContext, { MassActionContextProvider } from "../context/MassEditorContext"

export default function MassEditor({ toggleExpander }) {
    const { punchCardData } = useContext(PunchCardContext)
    const { allSelected, setMassActionConfig} = useContext(MassActionContext)

    useEffect(() => {
        if(allSelected) setMassActionConfig(prev => ({...prev, selectedEmployeesIds: punchCardData.byEmployees.map(employee => employee.id)}))
    }, [allSelected, punchCardData.byEmployees, setMassActionConfig])

    return (
        <MassActionContextProvider>
            <MassEditorContainer>
                <MassActions />
                {
                    punchCardData.byEmployees.map(byEmployee => (
                        <EmployeeCard 
                            key={byEmployee.id} 
                            employeeData={byEmployee}
                            toggleExpander={toggleExpander}
                        />
                    ))
                }
            </MassEditorContainer>
        </MassActionContextProvider>

    )
}