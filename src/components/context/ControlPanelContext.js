import { createContext, useState } from "react";
import { useLocalStorage } from "../../hooks/generalHooks";
import UsersManager from "../controlPanel/tools/usersManager"

const ControlPanelContext = createContext({});

const controls = [
    {
        displayName: "Gerenciar usuários",
        component: <UsersManager></UsersManager>, 
    },
]

export function ControlPanelContextProvider({ children }) {
    const [ userData, setUserData ] = useLocalStorage();
    const [ alerterObserver, setAlerterObserver ] = useState(0);
    const [ isControlPanelActive, setIsControlPanelActive ] = useState(false);
    const [ currentControl, setCurrentControl ] = useState(controls[0])

    function fireAlerter(alerterProps) {
        setAlerterObserver(alerterProps)
    }

    return (
        <ControlPanelContext.Provider value={{
            controls,
            editorToken: userData.token,
            fireAlerter,
            isControlPanelActive,
            setIsControlPanelActive,
            currentControl,
            setCurrentControl
        }}>
            { children }
        </ControlPanelContext.Provider>
    )
}

export default ControlPanelContext;