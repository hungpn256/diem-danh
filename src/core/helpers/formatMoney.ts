const formatMoney = (amount?: number, toFixed = 0): string => {
  if (amount === undefined || amount === null) return '';
  let [integerPart, decimalPart] = String(amount).split('.');

  integerPart = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

  if (decimalPart && decimalPart.length > 2) {
    decimalPart = decimalPart.slice(0, toFixed);
  }

  const formattedAmount = decimalPart
    ? `${integerPart}.${decimalPart}`
    : integerPart;

  return formattedAmount;
};

export { formatMoney };
