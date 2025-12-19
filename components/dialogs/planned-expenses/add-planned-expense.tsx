import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
// icons
import { Loader2, PlusCircle } from "lucide-react";
import { useState } from "react";
import { CurrencyInput } from "react-currency-mask";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
// actions
import createPlannedExpense from "@/actions/planneed-expenses/create-planned-expense";
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

const formSchema = z.object({
	description: z.string().min(2, { message: "Minimo 2 caracteres" }),
	observation: z.string().optional(),
	installments: z.number().min(1, { message: "No minimo 1 parcela" }),
	amount_per_installments: z.number().min(1, { message: "No minimo 1 real" }),
	total_value: z.number().min(1, { message: "No minimo 1 real" }),
});

export default function AddPlannedExpenseDialog() {
	const [isOpen, setIsOpen] = useState<boolean>(false);

	const { mutate, isPending } = useMutation({
		mutationFn: createPlannedExpense,
		mutationKey: ["create-planned-expense"],
		onSuccess: ({ message }) => {
			toast.success(message);
			toggleModalOpen();
			queryClient.invalidateQueries({ queryKey: ["planned"] });
			resetForm();
		},
		onError: (err) => {
			console.error(err);
			toast.error(err.message);
		},
	});

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			description: "",
			observation: "",
			installments: 1,
			amount_per_installments: 0,
			total_value: 0,
		},
	});

	// observers for input change
	const $installments = form.watch("installments");
	const $amount_per_installment = form.watch("amount_per_installments");

	function toggleModalOpen() {
		setIsOpen(!isOpen);
	}

	const resetForm = () => {
		form.reset();
		setIsOpen(false);
	};

	function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values);
	}

	return (
		<Dialog open={isOpen} onOpenChange={setIsOpen}>
			<DialogTrigger asChild>
				<Button>
					Adicionar
					<PlusCircle className="size-4 ml-auto" />
				</Button>
			</DialogTrigger>
			<DialogContent
				className="sm:max-w-[425px]"
				onInteractOutside={() => resetForm()}
			>
				<DialogHeader>
					<DialogTitle>Adicionar despesa planejada</DialogTitle>
					<Separator />
				</DialogHeader>
				<Form {...form}>
					<form onSubmit={form.handleSubmit(onSubmit)}>
						<div className="flex flex-col gap-4">
							{/* description */}
							<FormField
								control={form.control}
								name="description"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Descrição</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Digita sua descrição aqui..."
												required
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* observation */}
							<FormField
								control={form.control}
								name="observation"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Observações</FormLabel>
										<FormControl>
											<Input
												type="text"
												placeholder="Digita sua observação aqui..."
												{...field}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* installments */}
							<FormField
								control={form.control}
								name="installments"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Parcelas</FormLabel>
										<FormControl>
											<Input
												type="number"
												min={1}
												max={12}
												required
												{...field}
												onChange={(event) => {
													const value = event.target.value;
													field.onChange(Number(value));
													form.setValue(
														"total_value",
														Number(value) * $amount_per_installment,
													);
												}}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* amount_per_installments */}
							<FormField
								control={form.control}
								name="amount_per_installments"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Valor por parcelas</FormLabel>
										<FormControl>
											<CurrencyInput
												{...field}
												value={field.value}
												onChangeValue={(_, value) => {
													field.onChange(value);
													form.setValue(
														"total_value",
														Number(value) * $installments,
													);
												}}
												InputElement={<Input type="text" min={1} required />}
											/>
										</FormControl>
										<FormMessage />
									</FormItem>
								)}
							/>
							{/* total_amount */}
							<FormField
								control={form.control}
								name="total_value"
								render={({ field }) => (
									<FormItem className="grid gap-2">
										<FormLabel>Valor total</FormLabel>
										<FormControl>
											<CurrencyInput
												{...field}
												onChangeValue={(_, value) => {
													field.onChange(value);
												}}
												InputElement={
													<Input type="text" min={1} required disabled />
												}
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
