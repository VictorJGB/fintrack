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

export function Capitalize(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export function formatDateToPTBR(date: Date | string) {
  const dateObj = new Date(date)
  const formattedDate = dateObj.toLocaleDateString("pt-BR", {
    month: "short",
    day: "numeric",
  })

  return formattedDate
}