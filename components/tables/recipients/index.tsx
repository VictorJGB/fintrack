"use client";

// libs
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { toast } from "sonner";
// actions
import getRecipients from "@/actions/recipients/get-recipients";
// components
import SearchInput from "@/components/search-input";
import { columns } from "./columns";
import TableSkeleton from "../table-skeleton";
import { DataTable } from "../data-table";
import { Button } from "@/components/ui/button";

export default function RecipientsTable() {

	const { data, isLoading, error } = useQuery({
		queryKey: ["recipients"],
		queryFn: () => getRecipients(),
	});

	const [search, setSearch] = useState("");

	useEffect(() => {
		if (error) {
			toast.error("Tabela de recebimentos", {
				description: error.message,
			});
		}
	}, [error]);

  return (
    <div className="container mx-auto py-10">
      <div className='w-full flex flex-col md:flex-row items-center justify-center mb-4'>
        <div className='w-full flex items-center justify-center md:justify-start gap-2'>
          <SearchInput search={search} onSearchChange={setSearch} />
        </div>
        <div className='w-full flex items-center justify-between md:justify-end gap-2 ms-auto'>
          <Button>Adicionar destinatário</Button>
        </div>
      </div>

      {isLoading && <TableSkeleton rowsNumber={10} />}

			{data && (
				<DataTable
					columns={columns}
					data={data} 
					pageCount={1} 
					page={1} 
					firstPage={1} 
					lastPage={1}				
				/>
			)}
		</div>
	);
}
