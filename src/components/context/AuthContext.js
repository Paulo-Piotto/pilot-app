import { createContext } from "react";
import { useLocalStorage } from "../../hooks/generalHooks";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [ userData, setUserData ] = useLocalStorage();

    function logout() {
        setUserData()
        window.location.href = "/"
    }

    return <AuthContext.Provider value={{
        userData,
        setUserData,
        logout
    }}>
        { children }
    </AuthContext.Provider>
}

export default AuthContext;
