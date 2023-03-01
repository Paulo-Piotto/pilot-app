import { createContext, useEffect, useState, useContext } from "react";
import dayjs from "dayjs";
import { parseObjectIntoQueryString } from "../../services/utils";
import { PunchCardService } from "../../services/api.services";
import AuthContext from "./AuthContext";
import { useCallback } from "react";

const PunchCardContext = createContext({});

export function PunchCardContextProvider({ children }) {
    const todayMinus30 = Date.now() - 86400000*30
    const { userData } = useContext(AuthContext)
    const [ loadingInitialData, setLoadingInitialData ] = useState(true);
    const [ refreshToggler, setRefreshToggler ] = useState(false);
    const [ punchCardData, setPunchCardData ] = useState({ byClients: [], byEmployees: [], selectedEmployee: null })
    const [ searchFilters, setSearchFilters ] = useState({
        client: null,
        date: {
            from: dayjs(todayMinus30).toString(),
            to: dayjs(Date.now()).toString()
        }
    })
    const [ snackBar, setSnackBar ] = useState({
        isOpen: false,
        message: "",
        type: "error", //error, warning, info, success
        setter: () => {}
    })

    useEffect(() => {
        async function updatePunchCardDataOnFilterChange() {
            const [ byClients, byEmployees ] = await Promise.all([
                PunchCardService.getPunchCardsByClients(parseObjectIntoQueryString(searchFilters), userData.token),
                PunchCardService.getPunchCardsByEmployees(parseObjectIntoQueryString(searchFilters), userData.token)
            ])
            setPunchCardData(prev => ({
                ...prev,
                byClients: byClients.data,
                byEmployees: byEmployees.data,
                selectedEmployee: byEmployees.data.find(employee => employee.name === prev.selectedEmployee?.name)
            }))
        }
        updatePunchCardDataOnFilterChange()
        setLoadingInitialData(false)
    }, [searchFilters, userData.token, refreshToggler, setLoadingInitialData])

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

    const callSnackBar = useCallback((data) => {
        setSnackBar({ 
            ...data,
            isOpen: true,
            setter: (value) => setSnackBar(prev => ({...prev, isOpen: value}))
        })
    }, [setSnackBar]) 

    function refreshPunchCardData() {
        setRefreshToggler(prev => !prev)
    }
    
    return (
        <PunchCardContext.Provider value={{
            searchFilters,
            updateSearchFilters,
            punchCardData,
            setPunchCardData,
            callSnackBar,
            snackBar,
            refreshPunchCardData,
            loadingInitialData
        }}>
            {children}
        </PunchCardContext.Provider>
    )
}

export default PunchCardContext;