import { useState } from "react";

// actions

import { useMutation } from "@tanstack/react-query";
import { Loader2, Trash } from "lucide-react";
import { toast } from "sonner";
// icons
import deleteRecipient from "@/actions/recipients/delete-recipient";
// components
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
// libs
import { queryClient } from "@/lib/react-query";

interface Props {
	recipientID: string;
}

export default function DeleteRecipientDialog({ recipientID }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { mutate, isPending } = useMutation({
		mutationFn: deleteRecipient,
		mutationKey: ["recipients", "delete"],
	});

	function handleDelete() {
		mutate(recipientID, {
			onSuccess: ({ message }) => {
				toast.success(message);
				queryClient.invalidateQueries({ queryKey: ["recipients"] });
				setIsOpen(false);
			},
			onError: ({ message }) => {
				toast.error(message);
			},
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant={"destructive"} className="w-full">
					Deletar destinatário
					<Trash className="size-4 ml-auto" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[500px]">
				<DialogHeader>
					<DialogTitle>Deletar destinatário</DialogTitle>
					<Separator />
				</DialogHeader>

				<p>
					Esta ação é <strong className="text-destructive">IRREVERSÍVEL</strong>
					, uma vez deletados, os dados não poderão mais ser recuperados. Deseja
					realmente deletar esse destinatário?
				</p>

				<DialogFooter className="flex w-full mt-4 justify-end gap-2">
					<DialogClose asChild>
						<Button variant={"ghost"}>Fechar</Button>
					</DialogClose>

					<Button
						variant={"destructive"}
						onClick={handleDelete}
						disabled={isPending}
					>
						{isPending && <Loader2 className="size-4 ml-auto animate-spin" />}
						Deletar
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	);
}
