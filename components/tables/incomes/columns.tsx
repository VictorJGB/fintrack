"use client"

// types
import type Income from '@/interfaces/income'

// components

// react table
import { ColumnDef } from '@tanstack/react-table'

// icons
import { ArrowUpDown } from 'lucide-react'

// components
import IncomesActionsDropdownMenu from '@/components/tables/incomes/actions-dropdown-menu'
import { Button } from '@/components/ui/button'

export const columns: ColumnDef<Income>[] = [
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Data
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const date = new Date(row.original.date)
      const formatedDate = date.toLocaleDateString('pt-BR')

      return formatedDate
    }
  },
  {
    accessorKey: "source",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Fonte
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
  },
  {
    accessorKey: "amount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Valor
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      )
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"))
      const formatted = new Intl.NumberFormat("pt-BR", {
        style: 'currency',
        currency: 'BRL',
      }).format(amount)

      return formatted
    },
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const income = row.original

      return (
        <IncomesActionsDropdownMenu data={income} />
      )
    },
  }
]