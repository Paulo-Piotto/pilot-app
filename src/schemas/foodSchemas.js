import Joi from "joi";

const foodSchema = Joi.object({
  employee: Joi.number().min(1).required(),
  type: Joi.object({
    id: Joi.number().required(),
    name: Joi.string().required(),
    value: Joi.number().required(),
    description: Joi.string().min(0),
    img: Joi.string().min(0),
    sub: Joi.string().min(0),
  }),
  value: Joi.string().required(),
  date: Joi.date().required(),
});

export { foodSchema };
