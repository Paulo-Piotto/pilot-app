import * as sc from "./styles";
import { useState } from "react";

export default function Login() {
    const [ newLogin, setNewLogin ] = useState({
        email: "",
        password: ""
    })

    function updateNewLoginData(newLoginData) {
        setNewLogin(prevState => ({
            ...prevState,
            newLoginData
        }))
    }

    return (
        <sc.AuthContainer>
            <h2>Login</h2>

            <form>
                <label>Email: </label>
                <input 
                    type="text"
                    name="Email"
                    value={newLogin.email}
                    onChange={ e => updateNewLoginData({ email: e.target.value }) }
                />

                <label>Senha: </label>
                <input 
                    type="text"
                    name="Password"
                    value={newLogin.password}
                    onChange={ e => updateNewLoginData({ password: e.target.value }) }
                />
            </form>
        </sc.AuthContainer>
    )
}