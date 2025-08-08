export default interface PlannedExpense {
  _id: string
  description: string,
  observation?: string,
  installments: number,
  amount_per_installments: number,
  total_value: number,
}

export interface APIResponse {
  page: number
  pageCount: number
  firstPage: number
  lastPage: number
  itemsPerPage: number
  data: PlannedExpense[]
}