"use client";

import {
	ChevronLeft,
	ChevronRight,
	ChevronsLeft,
	ChevronsRight,
} from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Button } from "../ui/button";
import { useEffect } from "react";

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
		console.log(href)
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
		<div className="flex items-center justify-center gap-4 py-4">
			<div className="flex items-center justify-center gap-2">
				<Button
					variant="outline"
					size="icon"
					disabled={!canGoPrevPage}
					onClick={() => push(getFirstPageLink())}
				>
					<ChevronsLeft className="size-3" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					disabled={!canGoPrevPage}
					onClick={() => push(getPrevPageLink())}
				>
					<ChevronLeft className="size-3" />
				</Button>
			</div>
			<span>
				página {page} de {pageCount}
			</span>
			{/* next page buttons */}
			<div className="flex items-center justify-center gap-2">
				<Button
					variant="outline"
					size="icon"
					disabled={!canGoNextPage}
					onClick={() => push(getNextPageLink())}
				>
					<ChevronRight className="size-3" />
				</Button>
				<Button
					variant="outline"
					size="icon"
					disabled={!canGoNextPage}
					onClick={() => push(getLastPageLink())}
				>
					<ChevronsRight className="size-3" />
				</Button>
			</div>
		</div>
	);
}
