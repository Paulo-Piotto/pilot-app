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
    const [ userData, ] = useLocalStorage();
    const [ isControlPanelActive, setIsControlPanelActive ] = useState(false);
    const [ currentControl, setCurrentControl ] = useState(controls[0])


    return (
        <ControlPanelContext.Provider value={{
            controls,
            editorToken: userData.token,
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