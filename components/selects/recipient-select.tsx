"use client";

import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import getRecipients from "@/actions/recipients/get-recipients";
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList,
} from "@/components/ui/combobox";
import type Recipient from "@/interfaces/recipients";

type RecipientProps = {
	onChange: (value: string) => void;
	value?: string;
	className?: string;
};

export default function RecipientSelect({
	onChange,
	value,
	className,
}: RecipientProps) {
	const [search, setSearch] = useState<string>("");
	const { data, isLoading } = useQuery({
		queryKey: ["recipients"],
		queryFn: getRecipients,
	});

	useEffect(() => {
		if (value) setSearch(value);
	}, [value]);

	function handleSelect(name: string) {
		onChange(name);
		setSearch(name);
	}

	return (
		<Combobox items={data} itemToStringValue={(item: Recipient) => item.name}>
			<ComboboxInput
				className={className}
				placeholder="Selecione um destinatário"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
				onFocus={() => setSearch("")}
			/>
			<ComboboxContent className="z-100">
				<ComboboxEmpty>
					{isLoading ? "Carregando..." : "Nenhum destinatário encontrado."}
				</ComboboxEmpty>
				<ComboboxList className="z-100 pointer-events-auto">
					{(recipient) => (
						<ComboboxItem
							key={recipient._id}
							value={recipient.name}
							onClick={() => handleSelect(recipient.name)}
						>
							{recipient.name}
						</ComboboxItem>
					)}
				</ComboboxList>
			</ComboboxContent>
		</Combobox>
	);
}
