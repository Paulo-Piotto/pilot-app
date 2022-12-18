import Joi from "joi";

const employeeSchema =Joi.object({
    name: Joi.string().min(3).required(),
    wageValue: Joi.string().required(),
    startDate: Joi.date().required(),
})

export{
    employeeSchema,
} 