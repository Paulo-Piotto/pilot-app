import { createContext, useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { parseObjectIntoQueryString } from "../../services/utils";
import { PunchCardService } from "../../services/api.services";
import AuthContext from "./AuthContext";

const PunchCardContext = createContext({});

export function PunchCardContextProvider({ children }) {
    const todayMinus30 = Date.now() - 86400000*30
    const { userData } = useContext(AuthContext)
    const [ punchCardData, setPunchCardData ] = useState({ byClients: [], byEmployees: [], selectedEmployee: null })
    const [ searchFilters, setSearchFilters ] = useState({
        client: null,
        date: {
            from: dayjs(todayMinus30).toString(),
            to: dayjs(Date.now()).toString()
        }
    })

    useEffect(() => {
        async function updatePunchCardDataOnFilterChange() {
            const [ byClients, byEmployees ] = await Promise.all([
                PunchCardService.getPunchCardsByClients(parseObjectIntoQueryString(searchFilters), userData.token),
                PunchCardService.getPunchCardsByEmployees(parseObjectIntoQueryString(searchFilters), userData.token)
            ])
            setPunchCardData(prev => ({ ...prev, byClients: byClients.data, byEmployees: byEmployees.data }))
        }
        updatePunchCardDataOnFilterChange()
    }, [searchFilters, userData.token])

    async function updateSearchFilters(key, value) {
        if(key === "date") {
            setSearchFilters(prev => ({
                ...prev,
                date: {
                    ...prev.date,
                    ...value
                }
            }))
        }
        else setSearchFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }
    
    return (
        <PunchCardContext.Provider value={{
            searchFilters,
            updateSearchFilters,
            punchCardData,
            setPunchCardData,
        }}>
            {children}
        </PunchCardContext.Provider>
    )
}

export default PunchCardContext;