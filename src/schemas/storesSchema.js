import Joi from "joi";

const storeSchema =Joi.object({
    name: Joi.string().min(3).required(),
})

export{
    storeSchema,
} 