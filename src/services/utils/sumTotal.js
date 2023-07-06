function sumTotal(ordersArray) {
  let total = 0;

  ordersArray.forEach((order) => {
    total += order.value;
  });

  return total;
}

function sumTotalBalance(clientsArray) {
  let balance = 0;
  let ordersTotal = 0;
  let laborTotal = 0;
  let incomesTotal = 0;

  clientsArray.forEach((client) => {
    ordersTotal += sumTotal(client.orders);
    incomesTotal += sumTotal(client.incomes);
    laborTotal += client.totalExpense;
  });

  balance = incomesTotal - (ordersTotal + laborTotal);
  return balance;
}

function sumTotalPayments(employeesArray, workingDays) {
  let total = 0;

  employeesArray.forEach((employee) => {
    const employeeWorkedDays = employee.employees_worked_days.length;

    total += ((employee.wage * employeeWorkedDays) / workingDays);
  });

  return total;
}

function sumTotalPreWage(employeesArray) {
  let total = 0;

  employeesArray.forEach((employee) => {
      total += (employee.wage * 0.3);
  });

  return total;
}

function sumTotalRealPayment(employeesArray, workingDays){
  let total = 0;

  employeesArray.forEach((employee) => {
    const preWage = (employee.wage * 0.3).toFixed(0);
    const workedDays = employee.employees_worked_days.length;
    const fullPayment = ((employee.wage * workedDays) /workingDays).toFixed(0);
    const foodTotal = sumTotal(employee.employees_food);
    const realPayment = (fullPayment - preWage - foodTotal);

    total += realPayment;
  });

  return total;
}

export { sumTotal, sumTotalBalance, sumTotalPayments, sumTotalPreWage, sumTotalRealPayment };
