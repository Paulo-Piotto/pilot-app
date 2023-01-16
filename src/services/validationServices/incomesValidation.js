import { incomesSchema } from "../../schemas/incomeSchema";

function incomesValidation(incomeData){
    if(incomeData.date !== null){
        incomeData.date = incomeData.date.toISOString();
    }
    const { error } = incomesSchema.validate(incomeData)
    const errorObject = {
        name: false,
        client: false,
        value: false,
        date: false,
    }

    if(error){
        const errorType = error.details[0].path[0];
        errorObject[errorType] = true
    }

    return errorObject
}

export {
    incomesValidation,
}