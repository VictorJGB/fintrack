'use client'

// components
import TableSkeleton from '@/components/tables/table-skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
// interfaces
import type Expense from '@/interfaces/expense'
// utils
import { formatDateToPTBR, formatToBRL } from '@/utils/formatters'
// icons
import { Minus, Plus } from 'lucide-react'
// libs
import { useQuery } from '@tanstack/react-query'
// actions
import getExpenses from '@/actions/expenses/get-expenses'
import { useEffect, useReducer } from 'react'

const collumns = ['Data', 'Empresa', 'Descrição', 'Valor por parcela', 'Parcelas']
const MAX_INSTALLMENTS = 12

type ReducerAction =
  | { type: 'init'; payload: Expense[] }
  | { type: 'change_installments'; payload: Expense }

function reducer(state: Expense[], action: ReducerAction) {
  switch (action.type) {
    case 'init':
      return action.payload
    case 'change_installments':
      return state.map(expense => expense._id === action.payload._id ? action.payload : expense)
    default:
      throw new Error('Unknow action')
  }
}

interface Props {
  handleDialogClose?: () => void
}

export default function PayExpensesTable({ handleDialogClose }: Props) {
  const { data, isLoading, error } = useQuery({
    queryKey: ['expenses'],
    queryFn: () => getExpenses()
  })

  const [state, dispatch] = useReducer(reducer, [])

  useEffect(() => {
    if (data?.data) {
      // Adding +1 to all installments paid
      const formatedData = data.data.map(expense => {
        return {
          ...expense,
          installments_paid: expense.installments_paid + 1
        }
      })
      dispatch({ type: 'init', payload: formatedData })
    }
  }, [data])

  function getIsMinusDisabled(installmentsPaid: number) {
    return installmentsPaid <= 0
  }

  function getIsPlusDisabled(installments: number,) {
    return installments >= MAX_INSTALLMENTS
  }

  function onInstallmentsChange(row: Expense, installments: number,) {
    const formatedExpense = { ...row, installments_paid: installments }

    dispatch({ type: 'change_installments', payload: formatedExpense })
  }

  function handleUpdateExpenses() {
    console.log(state)
  }

  if (isLoading && state.length === 0) return <TableSkeleton rowsNumber={10} />

  if (error) return <p className="text-destructive font-semibold">{error.message}</p>

  return (
    <div className='size-full flex flex-col gap-3'>
      <Table>
        <TableHeader>
          <TableRow>
            {collumns.map((row, index) => (
              <TableHead key={index}>{row}</TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody className='overflow-y-auto'>
          {state.map((row) => (
            <TableRow key={row._id}>
              <TableCell>{formatDateToPTBR(row.date)}</TableCell>
              <TableCell>{row.company}</TableCell>
              <TableCell>{row.description}</TableCell>
              <TableCell>{formatToBRL(row.amount_per_installment)}</TableCell>
              <TableCell>{row.installments}</TableCell>
              <TableCell className='flex items-center justify-center gap-2'>
                <Button
                  variant={'secondary'}
                  className='size-6 rounded-full'
                  disabled={getIsMinusDisabled(row.installments_paid)}
                  onClick={() => onInstallmentsChange(row, row.installments_paid - 1)}
                >
                  <Minus className='size-4' />
                </Button>
                {row.installments_paid}
                <Button
                  variant={'secondary'}
                  className='size-6 rounded-full'
                  disabled={getIsPlusDisabled(row.installments_paid)}
                  onClick={() => onInstallmentsChange(row, row.installments_paid + 1)}
                >
                  <Plus className='size-4' />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table >
      <div className='flex items-center justify-end gap-2 my-4'>
        {handleDialogClose && <Button onClick={handleDialogClose} variant={'secondary'}>Fechar</Button>}
        <Button onClickCapture={handleUpdateExpenses}>Salvar</Button>
      </div>
    </div>
  )
}