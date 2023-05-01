import dayjs from "dayjs"
import { useContext, useEffect, useState, createContext } from "react"
import PunchCardContext from "../context/PunchCardContext"
import EmployeeCard from "./EmployeeCard"
import { MassEditorContainer } from "./styles"
import MassActions from "./MassActions"
import { PunchCardService } from "../../services/api.services"
import AuthContext from "../context/AuthContext"

const MassEditorContext = createContext({});

export default function MassEditor({ toggleExpander }) {
    const { userData } = useContext(AuthContext)
    const { punchCardData } = useContext(PunchCardContext)
    const [ allSelected, setAllSelected ] = useState(false);
    const [ massActionConfig, setMassActionConfig ] = useState({
        isPresence: true,
        date: dayjs(),
        clientId: 0,
        selectedEmployeesIds: []
    })

    function handleEmployeeUniqueSelection(selected, employeeId) {
        if(selected) setMassActionConfig(prev => ({ ...prev, selectedEmployeesIds: [...prev.selectedEmployeesIds, employeeId] }))
        else setMassActionConfig(prev => ({...prev, selectedEmployeesIds: prev.selectedEmployeesIds.filter(id => id !== employeeId)}))
    }

    function selectAllEmployees() {
        setMassActionConfig(prev => ({...prev, selectedEmployeesIds: punchCardData.byEmployees.map(byEmployee => byEmployee.id)}))
    }

    function unselectAllEmployees() {
        setMassActionConfig(prev => ({...prev, selectedEmployeesIds: []}))
    }

    async function dispatchMassAction() {
        console.log("sending date: ", massActionConfig.date)
        const result = await PunchCardService.massAction(massActionConfig, userData.token);
        console.log(result.data)
    }

    useEffect(() => {
        if(allSelected) setMassActionConfig(prev => ({...prev, selectedEmployeesIds: punchCardData.byEmployees.map(employee => employee.id)}))
    }, [allSelected, punchCardData.byEmployees])

    return (
        <MassEditorContext.Provider
            value={{
                allSelected,
                setAllSelected,
                massActionConfig,
                setMassActionConfig,
                handleEmployeeUniqueSelection,
            }}
        >
            <MassEditorContainer>
                <MassActions
                    setAllSelected={setAllSelected}
                    isAllSelected={allSelected}
                    selectAllEmployees={selectAllEmployees}
                    unselectAllEmployees={unselectAllEmployees}
                    massActionConfig={massActionConfig}
                    setMassActionConfig={setMassActionConfig}
                    dispatchMassAction={dispatchMassAction}
                />

                {
                    punchCardData.byEmployees.map(byEmployee => (
                        <EmployeeCard 
                            key={byEmployee.id} 
                            employeeData={byEmployee}
                            toggleExpander={toggleExpander}
                            notifySelection={handleEmployeeUniqueSelection}
                            allSelected={allSelected}
                        />
                    ))
                }
            </MassEditorContainer>
        </MassEditorContext.Provider>

    )
}