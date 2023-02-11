import { orderSchema } from "../../schemas/orderSchema";

function ordersValidation(orderData) {
  if (orderData.date !== null && typeof orderData.date === "object") {
    orderData.date = orderData.date.toISOString();
  }
  const { error } = orderSchema.validate(orderData);
  const errorObject = {
    name: false,
    store: false,
    client: false,
    valueFinanced: false,
    valueNegotiated: false,
    date: false,
  };

  if (error) {
    const errorType = error.details[0].path[0];
    errorObject[errorType] = true;
  } else {
    const value = Number(orderData.valueFinanced.replace(",", "."));

    if (value <= 0) {
      errorObject.valueFinanced = true;
    }
  }

  let value = undefined;

  if (orderData.paymentMethod === 1) {
    value = orderData.valueFinanced;
  } else if (orderData.paymentMethod === 2) {
    value = orderData.valueCash;
  } else {
    if (
      !orderData.valueNegotiated ||
      Number(orderData.valueNegotiated.replace(",", ".")) <= 0
    ) {
      errorObject.valueNegotiated = true;
    } else {
      value = orderData.valueNegotiated;
    }
  }

  return { errorObject, value };
}

export { ordersValidation };
