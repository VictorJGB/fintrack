"use client"

import { useState, type ElementType } from "react"

// react table
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// components
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Input } from "../ui/input"
import TablePagination from "./table-pagination"

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
  AddDialogComponent?: ElementType,
  ImportDialogComponent?: ElementType,
  pageCount: number
  page: number
  firstPage: number
  lastPage: number
}

export function DataTable<TData, TValue>({
  columns,
  data,
  AddDialogComponent,
  ImportDialogComponent,
  pageCount,
  page,
  firstPage,
  lastPage,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState<string>("");

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
      globalFilter
    }
  })

  return (
    <div>
      {/* filter */}
      <div className="flex items-center py-4">
        <Input
          placeholder="Digite o seu filtro..."
          value={globalFilter ?? ""}
          onChange={(e) => {
            setGlobalFilter(e.target.value)
            table.setGlobalFilter(String(e.target.value))
          }
          }
          className="max-w-sm"
        />
        <div className="ml-auto flex items-center space-x-2">
          {ImportDialogComponent && <ImportDialogComponent />}
          {AddDialogComponent && <AddDialogComponent />}
        </div>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  Sem resultados
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* pagination */}
      <TablePagination
        firstPage={firstPage}
        lastPage={lastPage}
        page={page}
        pageCount={pageCount}
      />
    </div>
  )
}
