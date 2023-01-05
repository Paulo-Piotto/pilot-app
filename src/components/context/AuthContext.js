import { createContext, useState } from "react";

const AuthContext = createContext({});

export function AuthContextProvider({ children }) {
    const [ userData, setUserData ] = useState(localStorage.getItem("userData"));

    return <AuthContext.Provider value={{
        userData
    }}>
        { children }
    </AuthContext.Provider>
}

export default AuthContext;
