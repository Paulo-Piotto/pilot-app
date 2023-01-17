import * as sc from "./styles";
import { useState } from "react";
import { AuthService } from "../../services/api.services";
import { Login as LoginValidate } from "../../services/validationServices/authValidation";
import Alerter from "./Alerter";
import LoginIcon from '@mui/icons-material/Login';
import * as Utils from "./utils";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import Loader  from "../generics/Loader";
import pilotLoaderLogo from "../../assets/pilot-spinner-logo-black.png";
import { TokenAdapter } from "../../services/utils/adapters";

export default function Login({side: animationSide}) {
    const [ isLoading, setIsLoading ] = useState(false);
    const { setUserData } = useContext(AuthContext);
    const [ newLogin, setNewLogin ] = useState(Utils.loginDataFormat);
    const [ errors, setErrors ] = useState(Utils.loginErrorFormat);

    function updateNewLoginData(newLoginData) {
        setNewLogin(prevState => ({
            ...prevState,
            ...newLoginData
        }))
    }

    const handleLogin = () => {
        setIsLoading(true)
        Utils.handleSubmission({
            submissionData: newLogin,
            validator: LoginValidate,
            errorSetter: setErrors,
            service: AuthService.login,
            callbackFunction: async (userData) => {
                const decodedData = await TokenAdapter().decode(userData.data.token)
                setUserData(decodedData);
                setIsLoading(false);
            }
        }).then(() => setIsLoading(false))
    }

    const animationVariants = {
        left: { x: 0, opacity: 1 },
        right: { x: 60, opacity: 0 }
    }

    return (
        <sc.AuthContainer
            variants={animationVariants}
            initial={animationSide}
            animate={animationSide === "left" ? "left" : "right"}
            transition={Utils.animationTransitionConfiguration}
        >
            <Alerter severity="error"
                isOpen={!errors.api.isValid }
                errorMessage={errors.api.errorMessage} 
                alertTitle="Erro" 
                getOffScreen={() => setErrors(prev => ({ ...prev, api: { isValid: true, errorMessage: "" } }))}
            /> 
            <h2>Login˼</h2>

            <form autoComplete="off" onSubmit={ e => e.preventDefault() }>
                <sc.CssTextField 
                    label="Email"
                    error={!errors.email.isValid}
                    helperText={errors.email.errorMessage}
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
                    helperText={errors.password.errorMessage}
                    variant="filled"
                    type="password"
                    name="Password"
                    value={newLogin.password}
                    onChange={ e => updateNewLoginData({ password: e.target.value }) }
                    focuscolor='#131E29'
                />
                <sc.SendButton 
                    onClick={handleLogin}
                    disabled={isLoading}
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
                    {
                        isLoading
                            ? <Loader image={pilotLoaderLogo} width="50px" height="50px" />
                            : <LoginIcon sx={{ fontSize: 50, color: "#131E29" }}/>
                    }
                </sc.SendButton>
            </form>
        </sc.AuthContainer>
    )
}