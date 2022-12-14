import { storeSchema } from "../../schemas/storesSchema";

function storeNClientValidation(storeData){
    const { error } = storeSchema.validate(storeData)

    const errorObject = {
        name: {
            helper: '',
            error: false,
        },
    }

    if(error){
        errorObject.name.error = true;
        errorObject.name.helper = 'insira um nome válido';

       return errorObject;
    }

    return undefined;
    
}

export {
    storeNClientValidation,
}