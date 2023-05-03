import { createContext, useState } from "react";
import dayjs from "dayjs";
import { PunchCardService } from "../../services/api.services";
import { useContext } from "react";
import AuthContext from "./AuthContext";

const MassActionContext = createContext({});

export function MassActionContextProvider({ children }) {
    const { userData } = useContext(AuthContext);

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

    function selectAllEmployees(availableEmployees) {
        setMassActionConfig(prev => ({...prev, selectedEmployeesIds: availableEmployees.map(byEmployee => byEmployee.id)}))
    }

    function unselectAllEmployees() {
        setMassActionConfig(prev => ({...prev, selectedEmployeesIds: []}))
    }

    async function dispatchMassAction() {
        await PunchCardService.massAction(massActionConfig, userData.token);
    }

    return (
        <MassActionContext.Provider value={{
            allSelected, setAllSelected,
            massActionConfig, setMassActionConfig,
            handleEmployeeUniqueSelection,
            selectAllEmployees,
            unselectAllEmployees,
            dispatchMassAction
        }}>
            {children}
        </MassActionContext.Provider>
    )
}

export default MassActionContext;