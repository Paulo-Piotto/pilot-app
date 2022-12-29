export default function intToMoney(intNumber){
    const stringNumber =  intNumber.toString();
    const arrayNumber = stringNumber.split('')
    if(arrayNumber.length < 3){
        arrayNumber.unshift(0);
    }
    for(let i=arrayNumber.length-5; i>0; i-=3){
        arrayNumber.splice(i, 0, '.')
    }
    arrayNumber.splice(arrayNumber.length-2, 0, ',');
    const result = arrayNumber.join('');
    return result;
}