function verifyConditions(conditions) {
    for(const condition of conditions) if(!condition.isValid) return condition;
    return {
        isValid: true,
    }
}

function validatePassword(password) {
    const conditions = [
        { isValid: password.length, errorMessage: "Insira uma senha" },
        { isValid: password.length >= 4, errorMessage: "Insira ao menos 4 dígitos" }
    ]
    return verifyConditions(conditions);
}

function validateEmail(email) {
    const conditions = [
        { isValid: email.length, errorMessage: "Insira um email" },
        { isValid: email.includes("@"), errorMessage: "Insira um email válido" }
    ]
    return verifyConditions(conditions);
}

function validateRegisterName(registerName) {
    const conditions = [
        { isValid: registerName.length, errorMessage: "Insira um nome" },
    ]

    return verifyConditions(conditions);
}

export const Login = {
    password: validatePassword,
    email: validateEmail
}

export const Register = {
    ...Login,
    name: validateRegisterName,
    roleId: (roleId) => ({ isValid: !!roleId, errorMessage: "Falha de user role_id" })
}