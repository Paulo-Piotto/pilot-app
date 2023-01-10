import Joi from "joi";

const incomesSchema =Joi.object({
    name: Joi.string().min(3).required(),
    client: Joi.number().min(1).required(),
    value: Joi.string().required(),
    date: Joi.date().required()
})

export{
    incomesSchema,
} 