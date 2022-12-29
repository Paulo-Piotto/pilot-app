function floorDateHour(date){
    const stringDate = date.toISOString();
    const arrayDate = stringDate.split('');
    arrayDate.splice(11, 12, '0','0',':','0','0',':','0','0','.','0','0','0')
    return arrayDate.join('')
}

function ceilDateHour(date){
    const stringDate = date.toISOString();
    const arrayDate = stringDate.split('');
    arrayDate.splice(11, 12, '2','3',':','5','9',':','5','9','.','9','9','9')
    return arrayDate.join('')
}

export{
    floorDateHour,
    ceilDateHour,
}