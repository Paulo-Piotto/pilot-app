import { createContext, useState } from "react";
import { useLocalStorage } from "../../hooks/generalHooks";

const ControlPanelContext = createContext({});

export function ControlPanelContextProvider({ children }) {
    const [ userData, setUserData ] = useLocalStorage();
    const [ alerterObserver, setAlerterObserver ] = useState(0)

    function fireAlerter(alerterProps) {
        setAlerterObserver(alerterProps)
    }

    return (
        <ControlPanelContext.Provider value={{
            editorToken: userData.token,
            fireAlerter
        }}>
            { children }
        </ControlPanelContext.Provider>
    )
}

export default ControlPanelContext;