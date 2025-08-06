'use client'
import { useEffect, useReducer } from 'react'

// components
import TableSkeleton from '@/components/tables/table-skeleton'
import { Button } from '@/components/ui/button'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { toast } from 'sonner'
// interfaces
import type Expense from '@/interfaces/expense'
// utils
import { formatDateToPTBR, formatToBRL } from '@/utils/formatters'
// icons
import { Loader2, Minus, Plus } from 'lucide-react'
// libs
import { queryClient } from '@/lib/react-query'
import { useMutation, useQuery } from '@tanstack/react-query'
// actions
import getExpenses from '@/actions/expenses/get-expenses'
import updateManyExpenses from '@/actions/expenses/update-many-expenses'

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

  const { mutate, isPending: isUpdating, error: updateError } = useMutation({
    mutationFn: updateManyExpenses,
    mutationKey: ['update-many-expenses'],
    onSuccess: () => {
      toast.success('Despesas pagas com sucesso!')
      queryClient.invalidateQueries({ queryKey: ['expenses'] })
      handleDialogClose?.()
    },
    onError: ({ message }) => {
      toast.error(message)
    }
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
    return installmentsPaid <= 0 || isUpdating
  }

  function getIsPlusDisabled(installments: number,) {
    return installments >= MAX_INSTALLMENTS || isUpdating
  }

  function onInstallmentsChange(row: Expense, installments: number,) {
    const formatedExpense = { ...row, installments_paid: installments }

    dispatch({ type: 'change_installments', payload: formatedExpense })
  }

  function handleUpdateExpenses() {
    mutate(state)
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
        {
          handleDialogClose &&
          <Button
            onClick={handleDialogClose}
            disabled={isUpdating || isLoading}
            variant={'secondary'}
          >
            Fechar
          </Button>
        }
        <Button onClick={handleUpdateExpenses} disabled={isUpdating || isLoading}>
          {isUpdating && <Loader2 className='mr-2 size-3 animate-spin' />}
          {isUpdating ? 'Pagando despesas...' : 'Pagar despesas'}
        </Button>
      </div>
    </div>
  )
}