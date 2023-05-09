import { createContext, useState } from "react";
import { PunchCardService } from "../../services/api.services";
import { useContext } from "react";
import AuthContext from "./AuthContext";
import PunchCardContext from "./PunchCardContext";
import { validateMassActionConfig } from "../../services/validationServices/punchCardValidation";

const MassActionContext = createContext({});
const baseMassActionConfig = {
    isPresence: true,
    clientId: 0,
    selectedEmployeesIds: []
}

export function MassActionContextProvider({ children }) {
    const { userData } = useContext(AuthContext);
    const { callSnackBar, refreshPunchCardData } = useContext(PunchCardContext)

    const [ allSelected, setAllSelected ] = useState(false);
    const [ massActionConfig, setMassActionConfig ] = useState({...baseMassActionConfig, date: null})

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
        const validationResult = validateMassActionConfig(massActionConfig);
        if(!validationResult.isValid) return callSnackBar({ message: validationResult.message, type: "warning" })

        try {
            await PunchCardService.massAction(massActionConfig, userData.token);
            callSnackBar({ message: "Presenças Registradas", type: "success" })
            setMassActionConfig(prev => ({...prev, ...baseMassActionConfig, isPresence: prev.isPresence}))
            setAllSelected(false)
            refreshPunchCardData()
        }
        catch (error) {
            console.error(error)
            callSnackBar({ message: error.response?.data ?? "Falha ao salvar registros", type: "error"})
        }
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