import { createContext } from "react";
import { useLocalStorage } from "../../hooks/generalHooks";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [ userData, setUserData ] = useLocalStorage();

    return <AuthContext.Provider value={{
        userData,
        setUserData
    }}>
        { children }
    </AuthContext.Provider>
}

export default AuthContext;
