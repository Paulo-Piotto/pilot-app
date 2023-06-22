function intToMoney(intNumber) {
    const stringNumber = intNumber.toString();
    const arrayNumber = stringNumber.split("");
    if (arrayNumber.length < 3) {
      arrayNumber.unshift(0, 0);
    }
    for (let i = arrayNumber.length - 5; i > 0; i -= 3) {
      if (arrayNumber[i - 1] !== "-") arrayNumber.splice(i, 0, ".");
    }
    arrayNumber.splice(arrayNumber.length - 2, 0, ",");
    const result = arrayNumber.join("");
    return result;
  }

  function intToTwoDecimals(intNumber) {
    const stringNumber = intNumber.toString();
    const arrayNumber = stringNumber.split("");
    if (arrayNumber.length < 3) {
      arrayNumber.unshift(0, 0);
    }
    arrayNumber.splice(arrayNumber.length - 2, 0, ",");
    const result = arrayNumber.join("");
    return result;
  }

  function stringToCpf(string){
    if(!string) return null;
    const arrayString = string.split("");
    if(arrayString.length < 11 || arrayString.length > 11){
        return string;
    }else { 
        arrayString.splice(3, 0, ".");
        arrayString.splice(7, 0, ".");
        arrayString.splice(11, 0, "-");
    }
    const result = arrayString.join("");
    return result;
  }

  function stringToPhone(string){
    if(!string) return null;
    const arrayString = string.split(""); //14996047024 996047024 1496047024 96047024
    if(arrayString.length < 8 || arrayString.length > 11 || arrayString.includes('(') || arrayString.includes('-') || arrayString.includes(' ')){
      return string;
    }else if(arrayString.length === 11) {
      arrayString.splice(0, 0, "(");
      arrayString.splice(3, 0, ")");
      arrayString.splice(4, 0, " ");
      arrayString.splice(10, 0, "-");
    }else if(arrayString.length === 10) { 
      arrayString.splice(0, 0, "(");
      arrayString.splice(3, 0, ")");
      arrayString.splice(4, 0, " ");
      arrayString.splice(9, 0, "-");
    }else if(arrayString.length === 9) { 
      arrayString.splice(5, 0, "-");
    }else if(arrayString.length === 8) { 
      arrayString.splice(4, 0, "-");
    }
    const result = arrayString.join("");
    return result;
  }

  export {
    intToMoney, intToTwoDecimals, stringToCpf, stringToPhone
  }