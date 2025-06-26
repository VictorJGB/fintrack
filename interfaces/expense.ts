export default interface Expense {
  _id: string;
  date: Date;
  company: string; //empresa
  description: string; //descriçao
  recipient?: string; //destinatario
  installments: number; //prestacoes
  installments_paid: number; //prestacoes pagas
  amount_per_installment: number; //valor por prestacao
  total_amount: number; //valor total
}

export interface APIResponse {
    page: number
    pageCount: number
    firstPage: number
    lastPage: number
    itemsPerPage: number
    data: Expense[] 
}