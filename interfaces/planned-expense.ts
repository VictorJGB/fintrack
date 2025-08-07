export default interface PlannedExpense {
  description: string,
  observation?: string,
  installments: number,
  amount_per_installments: number,
  total_value: number,
}