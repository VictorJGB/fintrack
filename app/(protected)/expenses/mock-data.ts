import type Expense from "@/interfaces/expense";

export const expenses: Expense[] = [
  {
    _id: "123e4567-e89b-12d3-a456-426655440000",
    company: "Restaurante do Centro",
    description: "Almoço de trabalho",
    recipient: "João Silva",
    installments: 1,
    installments_paid: 0,
    amount_per_installments: 25.00,
    total_amount: 25.00
  },
  {
    _id: "234e5678-f012-34d5-b678-567890120000",
    company: "Posto de Gasolina",
    description: "Abastecimento de combustível",
    recipient: "Maria Oliveira",
    installments: 1,
    installments_paid: 0,
    amount_per_installments: 50.00,
    total_amount: 50.00
  },
  {
    _id: "345e6789-g012-45d6-c789-678901230000",
    company: "Loja de Departamentos",
    description: "Compra de roupas",
    recipient: "Pedro Martins",
    installments: 3,
    installments_paid: 2,
    amount_per_installments: 100.00,
    total_amount: 300.00
  },
  {
    _id: "456e7890-h012-56d7-d890-789012340000",
    company: "Empresa de Serviços",
    description: "Pagamento de conta de água",
    recipient: "Ana Souza",
    installments: 2,
    installments_paid: 1,
    amount_per_installments: 150.00,
    total_amount: 150.00
  },
  {
    _id: "567e8901-i012-67d8-e901-890123450000",
    company: "Supermercado",
    description: "Compra de alimentos",
    recipient: "Carlos Lima",
    installments: 2,
    installments_paid: 1,
    amount_per_installments: 80.00,
    total_amount: 80.00
  }
]