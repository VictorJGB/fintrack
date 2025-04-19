export function formatToBRL(value: number) {
  const formatter = Intl.NumberFormat("pt-BR", {
    currency: "BRL",
    currencyDisplay: "symbol",
    currencySign: "standard",
    style: "currency",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return formatter.format(value);
}