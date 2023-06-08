function floorDateHour(date) {
  const stringDate = date.toISOString();
  const arrayDate = stringDate.split("");
  arrayDate.splice(
    11,
    12,
    "0",
    "0",
    ":",
    "0",
    "0",
    ":",
    "0",
    "0",
    ".",
    "0",
    "0",
    "0"
  );
  return arrayDate.join("");
}

function ceilDateHour(date) {
  const stringDate = date.toISOString();
  const arrayDate = stringDate.split("");
  arrayDate.splice(
    11,
    12,
    "2",
    "3",
    ":",
    "5",
    "9",
    ":",
    "5",
    "9",
    ".",
    "9",
    "9",
    "9"
  );
  return arrayDate.join("");
}

function averageDateHour(date) {
  let stringDate;
  typeof date !== "string"
    ? (stringDate = date.toISOString())
    : (stringDate = date);
  const arrayDate = stringDate.split("");
  arrayDate.splice(
    11,
    12,
    "1",
    "2",
    ":",
    "0",
    "0",
    ":",
    "0",
    "0",
    ".",
    "0",
    "0",
    "0"
  );
  return arrayDate.join("");
}

function lastDay20() {
  const today = new Date(Date.now());
  const day = today.getDate();
  const month = today.getMonth();
  const year = today.getFullYear();
  let newYear;
  let newMonth;
  let result;

  if (day < 20 && month !== 0) {
    newMonth = month - 1;
    newYear = year;
  } else if (day < 20 && month === 0) {
    newMonth = 11;
    newYear = year - 1;
  } else {
    newMonth = month;
    newYear = year;
  }
  result = new Date(newYear, newMonth, 20, 20, 59, 59, 999);
  return result.toISOString();
}

export { floorDateHour, ceilDateHour, averageDateHour, lastDay20 };
