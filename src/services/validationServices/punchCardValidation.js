export function validateMassActionConfig(config) {
    if(!config.date) return { isValid: false, message: "Insira uma data válida" }
    if(!Number(config.clientId)) return { isValid: false, message: "Escolha uma obra" }
    if(!config.selectedEmployeesIds.length) return { isValid: false, message: "Selecione ao menos um funcionário" }
    return { isValid: true }
}
