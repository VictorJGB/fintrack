"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "../ui/button";

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
  const { push } = useRouter();
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
      <Button
        variant="outline"
        size="sm"
        disabled={!canGoPrevPage}
        onClick={() => push(getPrevPageLink())}
      >
        Anterior
      </Button>
      <span>
        página {page} de {pageCount}
      </span>
      <Button
        variant="outline"
        size="sm"
        disabled={!canGoNextPage}
        onClick={() => push(getNextPageLink())}
      >
        Próximo
      </Button>
    </div>
  );
}
