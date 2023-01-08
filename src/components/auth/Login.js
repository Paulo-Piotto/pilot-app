import * as sc from "./styles";
import { useState } from "react";
import { AuthService } from "../../services/api.services";
import { Login as LoginValidate } from "../../services/validationServices/authValidation";
import LoginIcon from '@mui/icons-material/Login';
import IconButton from '@mui/material/IconButton';

export default function Login() {
    const [ newLogin, setNewLogin ] = useState({ email: "", password: "" })
    const [ errors, setErrors ] = useState({
        email: { isValid: true, errorMessage: "" },
        password: { isValid: true, errorMessage: "" }
    });

    function updateNewLoginData(newLoginData) {
        setNewLogin(prevState => ({
            ...prevState,
            newLoginData
        }))
    }

    async function handleLogin() {
        const validation = {
            email: LoginValidate.email(newLogin.email),
            password: LoginValidate.password(newLogin.password)
        }
        if(!validation.email.isValid) return setErrors({
            email: validation.email,
            password: validation.password
        })

        try { 
            const loginRequestResult = await AuthService.login(newLogin);
            console.log("SUCESS")
            console.log(loginRequestResult.data)
        }
        catch(error) { 
            console.log("FAILURE")
            console.error(error)
        }
    }

    return (
        <sc.AuthContainer>
            <h2>Login</h2>

            <form onSubmit={handleLogin}>
                <sc.CssTextField 
                    label="Email:"
                    error={!errors.email.isValid}
                    helperText=""
                    variant="filled"
                    type="text"
                    name="Email"
                    value={newLogin.email}
                    onChange={ e => updateNewLoginData({ email: e.target.value }) }
                    focuscolor='#131E29'
                />

                <sc.CssTextField
                    label="Senha"
                    error={!errors.password.isValid}
                    helperText=""
                    variant="filled"
                    type="password"
                    name="Password"
                    value={newLogin.password}
                    onChange={ e => updateNewLoginData({ password: e.target.value }) }
                    focuscolor='#131E29'
                />

            </form>
        </sc.AuthContainer>
    )
}