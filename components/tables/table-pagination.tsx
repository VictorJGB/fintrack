'use client'

import { useSearchParams } from "next/navigation"

import { Button } from "../ui/button"

interface Props {
  firstPage: number
  lastPage: number
  nextPage: number
  prevPage: number
  pageCount: number
  page: number
}

export default function TablePagination({ firstPage, lastPage, nextPage, page, pageCount, prevPage }: Props) {
  const searchParams = useSearchParams()


  function goToFirstPage() {
    const params = new URLSearchParams(searchParams.toString())
    params.set('page', firstPage.toString())

    return params.toString()
  }

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <Button
        variant="outline"
        size="sm"
        onClick={() => { }}
      >
        Anterior
      </Button>
      <span>página {page} de {pageCount}</span>
      <Button
        variant="outline"
        size="sm"
        onClick={() => { }}
      >
        Proximo
      </Button>
    </div>
  )
}