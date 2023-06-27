import { foodSchema } from "../../schemas/foodSchemas";

function foodValidation(foodData) {
  if (foodData.date !== null && typeof foodData.date === "object") {
    foodData.date = foodData.date.toISOString();
  }
  const { error } = foodSchema.validate(foodData);
  const errorObject = {
    employee: false,
    type: false,
    value: false,
    date: false,
  };
  const intValue = Number(foodData.value.replace(",", "."))*100;

  if (error) {
    const errorType = error.details[0].path[0];
    errorObject[errorType] = true;
  } else if (intValue <= 0) {
      errorObject.value = true;
  }
  
  return { errorObject, intValue };
}

export { foodValidation };