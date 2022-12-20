import Joi from "joi";

const orderSchema =Joi.object({
    name: Joi.string().min(3).required(),
    store: Joi.number().min(1).required(),
    client: Joi.number().min(1).required(),
    valueFinanced: Joi.string().required(),
    valueCash: Joi.string().required(),
    valueNegotiated: Joi.any(),
    paymentMethod: Joi.number().required(),
    date: Joi.date().required()
})

export{
    orderSchema,
} 