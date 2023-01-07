import * as sc from "./styles";
import { useState } from "react";

export default function Register() {
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
    const [ newUser, setNewUser ] = useState({
        name: "",
        roleId: 3,
        email: "",
        password: ""
    })

    function updateNewUserData(newUserData) {
        setNewUser(prevState => ({
            ...prevState,
            ...newUserData
        }))
    }

    function sendNewUserToRegistration(newUserData) {
        
    }

    return (
        <sc.AuthContainer>
            <h2>Cadastro</h2>
            <form>
                <sc.CssTextField
                    label="Nome"
                    variant="filled" 
                    type="text"
                    name="Name"
                    value={newUser.name}
                    onChange={ e => updateNewUserData({ name: e.target.value }) }
                    focusColor='#131E29'
                />

                <sc.CssTextField
                    label="Email"
                    variant="filled" 
                    type="text"
                    name="Email"
                    value={newUser.email}
                    onChange={ e => updateNewUserData({ email: e.target.value }) }
                    focusColor='#131E29'
                />

                <sc.CssTextField
                    label="Senha"
                    variant="filled" 
                    type="text"
                    name="Password"
                    value={newUser.password}
                    onChange={ e => updateNewUserData({ password: e.target.value }) }
                    focusColor='#131E29'
                />

                <sc.CssTextField
                    label="Confirme a senha"
                    variant="filled" 
                    type="text"
                    name="Password Confirmation"
                    value={passwordConfirmation}
                    onChange={ e => setPasswordConfirmation(e.target.value) }
                    focusColor='#131E29'
                />
            </form>
            
        </sc.AuthContainer>
    )
}