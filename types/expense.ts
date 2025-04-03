type Expense = {
  _id: string
  company: string //empres
  description: string //descriçao
  recipient: string //destinatario
  installments: number //prestacoes
  installments_paid: number //prestacoes pagas
  amount_per_installments: number //valor por prestacao
  total_amount: number //valor total
}

export default Expense