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
import { useEffect, useState } from 'react'

const collumns = ['Data', 'Empresa', 'Descrição', 'Valor por parcela', 'Parcelas']
const MAX_INSTALLMENTS = 12

export default function PayExpensesTable() {
  const [updatedData, setUpdatedData] = useState<Expense[]>([])
  const { data, isLoading, error } = useQuery({
    queryKey: ['get-expenses'],
    queryFn: () => getExpenses()
  })

  useEffect(() => {
    if (data) {
      setUpdatedData(data.data)
    }
  }, [data, updatedData])

  function getIsMinusDisabled(installmentsPaid: number, installments: number,) {
    return installmentsPaid <= 0
  }

  function getIsPlusDisabled(installments: number,) {
    return installments >= MAX_INSTALLMENTS
  }

  function onInstallmentsChange(row: Expense, installments: number,) {
    const formatedData = updatedData.map((expense) => {
      if (expense._id === row._id) return { ...expense, installments_paid: installments }

      return expense
    })
    setUpdatedData(formatedData)
  }

  if (isLoading) <TableSkeleton rowsNumber={10} />

  if (error) <p className="text-destructive font-semibold">{error.message}</p>

  if (updatedData) return (
    <Table>
      <TableHeader>
        <TableRow>
          {collumns.map((row, index) => (
            <TableHead key={index}>{row}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody className='overflow-y-auto'>
        {updatedData.map((row, index) => (
          <TableRow key={index}>
            <TableCell>{formatDateToPTBR(row.date)}</TableCell>
            <TableCell>{row.company}</TableCell>
            <TableCell>{row.description}</TableCell>
            <TableCell>{formatToBRL(row.amount_per_installment)}</TableCell>
            <TableCell>{row.installments}</TableCell>
            <TableCell className='flex items-center justify-center gap-2'>
              <Button
                variant={'secondary'}
                className='size-6 rounded-full'
                disabled={getIsMinusDisabled(row.installments_paid, row.installments_paid--)}
                onClick={() => onInstallmentsChange(row, row.installments_paid--)}
              >
                <Minus className='size-4' />
              </Button>
              {row.installments_paid}
              <Button
                variant={'secondary'}
                className='size-6 rounded-full'
                disabled={getIsPlusDisabled(row.installments_paid++)}
                onClick={() => onInstallmentsChange(row, row.installments_paid++)}
              >
                <Plus className='size-4' />
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}