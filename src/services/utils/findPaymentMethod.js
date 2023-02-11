export default function findPaymentMethod({
  value,
  financed,
  cash,
  negotiated,
}) {
  const methods = [financed, cash, negotiated];
  let result = -1;

  methods.forEach((method, index) => {
    if (value === method) result = index + 1;
  });

  return result;
}
