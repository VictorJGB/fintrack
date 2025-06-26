"use client";

import { usePathname, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";
import Link from "next/link";

interface Props {
  firstPage: number;
  lastPage: number;
  pageCount: number;
  page: number;
}

export default function TablePagination({
  firstPage,
  lastPage,
  page,
  pageCount,
}: Props) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const canGoNextPage = page + 1 <= pageCount;
  const canGoPrevPage = page - 1 >= firstPage;

  function getFirstPageLink() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", firstPage.toString());

    const href = `${pathname}?${params.toString()}`;

    return href;
  }

  function getLastPageLink() {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", lastPage.toString());

    const href = `${pathname}?${params.toString()}`;

    return href;
  }

  function getNextPageLink() {
    const nextPage = page + 1;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", nextPage.toString());

    const href = `${pathname}?${params.toString()}`;

    return href;
  }

  function getPrevPageLink() {
    const prevPage = page - 1;

    const params = new URLSearchParams(searchParams.toString());
    params.set("page", prevPage.toString());
    const href = `${pathname}?${params.toString()}`;

    return href;
  }

  return (
    <div className="flex items-center justify-between space-x-2 py-4">
      <Button variant="outline" size="sm" disabled={!canGoPrevPage} asChild>
        <Link href={getPrevPageLink()}>Anterior</Link>
      </Button>
      <span>
        página {page} de {pageCount}
      </span>
      <Button variant="outline" size="sm" disabled={!canGoNextPage} asChild>
        <Link href={getNextPageLink()}>Proximo</Link>
      </Button>
    </div>
  );
}
