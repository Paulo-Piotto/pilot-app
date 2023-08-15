import { OrdersService } from "../api.services";

async function deleteMany(orders) {
  const deleteSettings = [];
  orders.forEach((order) => {
    deleteSettings.push(order.id);
  });
  try {
    await OrdersService.deleteMany(deleteSettings);
  } catch (error) {
    console.log(error);
  }
}

export { deleteMany };
