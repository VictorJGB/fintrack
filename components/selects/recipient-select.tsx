"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Loader2, PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import createRecipient from "@/actions/recipients/create-recipient";
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
import { queryClient } from "@/lib/react-query";
import { Button } from "../ui/button";

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
	const { mutate, isPending } = useMutation({
		mutationKey: ["create-reciepient"],
		mutationFn: createRecipient,
	});

	useEffect(() => {
		if (value) setSearch(value);
	}, [value]);

	function handleSelect(name: string) {
		onChange(name);
		setSearch(name);
	}

	function handleNewRecipient() {
		mutate(search, {
			onSuccess: (data) => {
				toast.success(data.message);
			},
			onError: (error) => {
				toast.error(error.message);
			},
			onSettled: () => {
				queryClient.invalidateQueries({ queryKey: ["recipients"] });
				onChange(search);
			},
		});
	}

	return (
		<Combobox items={data} itemToStringValue={(item: Recipient) => item.name}>
			<ComboboxInput
				className={className}
				placeholder="Selecione um destinatário"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
			<ComboboxContent className="z-100 pointer-events-auto">
				<ComboboxEmpty>
					{isLoading ? (
						"Carregando..."
					) : (
						<div className="grid grid-rows-auto place-items-center w-full gap-2">
							Nenhum destinatário encontrado.
							<Button
								onClick={handleNewRecipient}
								disabled={isPending}
								className="w-[90%] border-primary bg-popover border text-primary hover:bg-primary/10"
							>
								Criar destinatário
								<span className="max-w-[100px] overflow-hidden text-ellipsis">
									"{search}"
								</span>
								{isPending && <Loader2 className="size-4 mr-4 animate-spin" />}
								{!isPending && <PlusCircle className="size-4" />}
							</Button>
						</div>
					)}
				</ComboboxEmpty>
				<ComboboxList>
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
