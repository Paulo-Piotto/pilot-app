import * as sc from "./styles";
import { useState } from "react";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { Register as RegisterValidate } from "../../services/validationServices/authValidation";
import Alerter from "./Alerter";
import * as Utils from "./utils";
import { AuthService } from "../../services/api.services";

export default function Register({ side: animationSide }) {
    const [ passwordConfirmation, setPasswordConfirmation ] = useState("");
    const [ errors, setErrors ] = useState({
        name: { isValid: true, errorMessage: "" },
        email: { isValid: true, errorMessage: "" },
        password: { isValid: true, errorMessage: "" },
        api: { isValid: true, errorMessage: ""}
    })
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

    const handleRegistration = () => {
        console.log("Entering registration flow")
        Utils.handleSubmission({
            submissionData: newUser,
            validator: RegisterValidate,
            errorSetter: setErrors,
            service: AuthService.register
        })
    }

    const animationVariants = {
        right: { x: 0, opacity: 1 },
        left: { x: -60, opacity: 0 }
    }
    return (
        <sc.AuthContainer
            variants={animationVariants}
            initial={animationSide}
            animate={animationSide === "left" ? "left" : "right"}
            transition={Utils.animationTransitionConfiguration}
        >
            <Alerter 
                severity="error"
                isOpen={!errors.api.isValid }
                errorMessage={errors.api.errorMessage} 
                alertTitle="Erro" 
                getOffScreen={() => setErrors(prev => ({ ...prev, api: { isValid: true, errorMessage: "" } }))}
            /> 
            <h2>˹Cadastro</h2>
            <form autoComplete="off" onSubmit={ e => e.preventDefault() }>
                <sc.CssTextField
                    label="Nome"
                    error={!errors.name.isValid}
                    helperText={errors.name.errorMessage}
                    variant="filled" 
                    type="text"
                    name="Name"
                    value={newUser.name}
                    onChange={ e => updateNewUserData({ name: e.target.value }) }
                    focuscolor='#131E29'
                />

                <sc.CssTextField
                    label="Email"
                    error={!errors.email.isValid}
                    helperText={errors.email.errorMessage}
                    variant="filled" 
                    type="text"
                    name="Email"
                    value={newUser.email}
                    onChange={ e => updateNewUserData({ email: e.target.value }) }
                    focuscolor='#131E29'
                />

                <sc.CssTextField
                    label="Senha"
                    error={!errors.password.isValid}
                    helperText={errors.password.errorMessage}
                    variant="filled" 
                    type="password"
                    name="Password"
                    value={newUser.password}
                    onChange={ e => updateNewUserData({ password: e.target.value }) }
                    focuscolor='#131E29'
                />

                <sc.CssTextField
                    label="Confirme a senha"
                    error={newUser.password !== passwordConfirmation}
                    helperText={newUser.password !== passwordConfirmation ? "A senha não corresponde" : ""}
                    variant="filled" 
                    type="password"
                    name="Password Confirmation"
                    value={passwordConfirmation}
                    onChange={ e => setPasswordConfirmation(e.target.value) }
                    focuscolor='#131E29'
                />

                <sc.SendButton 
                    onClick={handleRegistration}
                    whileHover={{
                        scale: 1.1,
                        boxShadow: 'rgba(0, 0, 0, 0.15) 0px 5px 5px',
                        borderRadius: '20%'
                    }}
                    whileTap={{
                        scale: 1.05,
                        boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 2px',
                    }}
                >
                    <FileUploadIcon sx={{
                        fontSize: 50,
                        color: "#131E29"
                    }}/>
                </sc.SendButton>
            </form>
            
        </sc.AuthContainer>
    )
}
    // ×