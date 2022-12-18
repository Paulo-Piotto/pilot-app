import { employeeSchema } from "../../schemas/employeesSchemas";

function employeeValidation(employeeData){
    const { error } = employeeSchema.validate(employeeData)
    const errorObject = {
        name: {
            helper: '',
            error: false,
        },
        wage: {
            helper: '',
            error: false,
        },
        startDate: {
            helper: '',
            error: false,
        },
    }
    if(error){
        
        console.log(error)
        const errorType = error.details[0].path[0];

        if(errorType === 'name'){
            errorObject.name.error = true;
            errorObject.name.helper = 'insira um nome válido';
            errorObject.wage.error = false;
            errorObject.wage.helper = '';
            errorObject.startDate.error = false;
            errorObject.startDate.helper = '';
        }else if(errorType === 'wage'){
            errorObject.wage.error = true;
            errorObject.wage.helper = 'insira um salário válido';
            errorObject.name.error = false;
            errorObject.name.helper = '';
            errorObject.startDate.error = false;
            errorObject.startDate.helper = '';
        }else if(errorType === 'startDate'){
            errorObject.startDate.error = true;
            errorObject.startDate.helper = 'insira uma data válida';
            errorObject.name.error = false;
            errorObject.name.helper = '';
            errorObject.wage.error = false;
            errorObject.wage.helper = '';
        }
    }else{
        return undefined;
    }

    return errorObject;
    
}

export {
    employeeValidation,
}