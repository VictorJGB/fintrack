import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// icons
import { Loader2, Pencil } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// actions
import updateRecipient from "@/actions/recipients/update-recipient";
// components
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
// types
import type Recipient from "@/interfaces/recipients";
// libs
import { queryClient } from "@/lib/react-query";

const formSchema = z.object({
	name: z.string().min(2, { message: "Minimo 2 caracteres" }),
});

interface Props {
	data: Recipient;
}

export default function EditRecipientDialog({ data }: Props) {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { mutate, isPending } = useMutation({
		mutationFn: updateRecipient,
		mutationKey: ["incomes", "update"],
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: data.name,
		},
	});

	function toggleModalOpen() {
		setIsOpen(!isOpen);
	}

	function onSubmit({ name }: z.infer<typeof formSchema>) {
		mutate(
			{ _id: data._id, name },
			{
				onSuccess: ({ message }) => {
					toast.success(message);
					toggleModalOpen();
					queryClient.invalidateQueries({ queryKey: ["recipients"] });
				},
				onError: (err) => {
					console.error(err);
					toast.error(err.message);
				},
			},
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button variant="ghost" className="w-full">
					Editar destinatário
					<Pencil className="size-4 ml-auto" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Editar destinatário</DialogTitle>
					<Separator />
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-4">
							{/* source */}
							<FormField
								control={form.control}
								name="name"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Nome</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Ex: Victor"
												required
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
						</div>

						{/* footer */}
						<div className="w-full flex items-center justify-end gap-4 mt-5">
							<DialogClose asChild>
								<Button variant="ghost">Cancelar</Button>
							</DialogClose>
							<Button type="submit" disabled={isPending}>
								{isPending && <Loader2 className="size-4 mr-4 animate-spin" />}
								Salvar
							</Button>
						</div>
					</form>
				</Form>
			</DialogContent>
		</Dialog>
	);
}
