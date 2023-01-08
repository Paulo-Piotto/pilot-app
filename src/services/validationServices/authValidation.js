import Joi from "joi";
import * as Auth from "../../schemas/authSchemas";

function verifyConditions(conditions) {
    for(const condition of conditions) if(!condition.isValid) return condition;
    return {
        isValid: true,
    }
}

function validateLoginPassword(password) {
    const conditions = [
        { isValid: password.length, errorMessage: "Insira uma senha" },
        { isValid: password.length >= 4, errorMessage: "Insida ao menos 4 dígitos" }
    ]
    return verifyConditions(conditions);
}

function validateLoginEmail(email) {
    const conditions = [
        { isValid: email.length, errorMessage: "Insira um email" },
        { isValid: email.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/)
            , errorMessage: "Insira um email válido" }
    ]
    return verifyConditions(conditions);
}

export const Login = {
    password: validateLoginPassword,
    email: validateLoginEmail
}