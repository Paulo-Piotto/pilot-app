import { createContext, useEffect, useState } from "react";
import dayjs from "dayjs";
import { parseObjectIntoQueryString } from "../../services/utils";

const PunchCardContext = createContext({});

export function PunchCardContextProvider({ children }) {
    const todayMinus30 = Date.now() - 86400000*30
    const [ punchCardData, setPunchCardData ] = useState({ byClients: [], byEmployees: [], selectedEmployee: null })
    const [ searchFilters, setSearchFilters ] = useState({
        client: null,
        date: {
            from: dayjs(todayMinus30).toString(),
            to: dayjs(Date.now()).toString()
        }
    })

    function updateSearchFilters(key, value) {
        if(key === "date") setSearchFilters(prev => ({
            ...prev,
            date: {
                ...prev.date,
                ...value
            }
        }))
        else setSearchFilters(prev => ({
            ...prev,
            [key]: value
        }))
    }

    function getQueryStringFilter() {
        return parseObjectIntoQueryString(searchFilters)
    }
    
    return (
        <PunchCardContext.Provider value={{
            searchFilters,
            updateSearchFilters,
            punchCardData,
            setPunchCardData,
            getQueryStringFilter
        }}>
            {children}
        </PunchCardContext.Provider>
    )
}

export default PunchCardContext;