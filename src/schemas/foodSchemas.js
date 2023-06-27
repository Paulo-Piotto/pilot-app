import Joi from "joi";

const foodSchema =Joi.object({
  employee: Joi.number().min(1).required(),
  type: Joi.number().min(1).max(4).required(),
  value: Joi.string().required(),
  date: Joi.date().required(),
})

export{
  foodSchema,
} 