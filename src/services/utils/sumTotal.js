export default function sumTotal(ordersArray){
    let total = 0;

    ordersArray.forEach(order => {
        total += order.value;
    });

    return total;
}