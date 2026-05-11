import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// icons
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// actions
import createRecipient from "@/actions/recipients/create-recipient";
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
// libs
import { queryClient } from "@/lib/react-query";

// utils

const formSchema = z.object({
	name: z.string().min(2, { message: "Minimo 2 caracteres" }),
});

export default function AddRecipientDialog() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { mutate, isPending } = useMutation({
		mutationFn: createRecipient,
		mutationKey: ["recipients", "add"],
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			name: "",
		},
	});

	function toggleModalOpen() {
		setIsOpen(!isOpen);
	}

	function onSubmit({ name }: z.infer<typeof formSchema>) {
		mutate(name, {
			onSuccess: (data) => {
				toast.success(data.message);
				form.reset();
				toggleModalOpen();
				queryClient.invalidateQueries({ queryKey: ["recipients"] });
			},
			onError: (error) => {
				toast.error("Erro ao adicionar destinatário", {
					description: error.message,
				});
			},
		});
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					Adicionar
					<PlusCircle className="size-4 ml-auto" />
				</Button>
			</DialogTrigger>
			<DialogContent className="sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Adicionar destinatário</DialogTitle>
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
