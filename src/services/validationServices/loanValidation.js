function loanValidation(loanData) {
  const success = { error: false, msg: "Ok" };
  const date = new Date(loanData.date);
  if (!loanData.employee) {
    return { error: true, msg: "Escolha um funcionário válido!" };
  }
  if (loanData.value < 1) {
    return {
      error: true,
      msg: "O valor mínimo para um empréstimo é de R$ 0,01!",
    };
  }
  if (!date.getDate() || date.getFullYear() < 2010) {
    return { error: true, msg: "Insira uma data válida!" };
  }
  return success;
}

export { loanValidation };
