function sumTotal(ordersArray){
    let total = 0;

    ordersArray.forEach(order => {
        total += order.value;
    });

    return total;
}

function sumTotalBalance(clientsArray){
    let balance = 0;
    let ordersTotal = 0;
    let incomesTotal = 0;

    clientsArray.forEach(client => {
        ordersTotal += sumTotal(client.orders);
        incomesTotal += sumTotal(client.incomes);
    });

    balance = incomesTotal - ordersTotal;
    return balance;
}

export {
    sumTotal,
    sumTotalBalance
}