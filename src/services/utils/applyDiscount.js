export default function applyDiscount(value, discountFactors){
    if(Number(value) !== 0 && value !== undefined){
        value = value.replace(',', '.');

        let result = Number(value);

    
        for(let i=0; i < discountFactors.length; i++){
            result -= result*discountFactors[i]
        }
        
        result = Number(result).toFixed(2);
        result = result.toString();
        return result.replace('.',',');
    }

    return '0,00'

}