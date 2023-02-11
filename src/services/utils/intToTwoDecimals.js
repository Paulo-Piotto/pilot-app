export default function intToTwoDecimals(intNumber) {
  const stringNumber = intNumber.toString();
  const arrayNumber = stringNumber.split("");
  if (arrayNumber.length < 3) {
    arrayNumber.unshift(0, 0);
  }
  arrayNumber.splice(arrayNumber.length - 2, 0, ",");
  const result = arrayNumber.join("");
  return result;
}
