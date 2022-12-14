import Joi from "joi";

const employeeSchema =Joi.object({
    name: Joi.string().min(3).required(),
    wageValue: Joi.number().required(),
    startDate: Joi.date().less('now').required(),
})

export{
    employeeSchema,
} 