"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

// components
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
// libs
import { cn } from "@/lib/utils";
import { Form, FormControl, FormField, FormItem, FormLabel } from "../ui/form";

// actions

import { useMutation } from "@tanstack/react-query";
import { Eye, EyeOff, Loader2 } from "lucide-react";
// icons
import Login from "@/actions/user/login";

const formSchema = z.object({
	email: z.string().email({
		message: "O texto precisa estar no formato de email",
	}),
	password: z.string().min(2, {
		message: "Senha precisa ser de no minimo 2 caracteres",
	}),
});
export default function LoginForm({
	className,
	...props
}: React.ComponentPropsWithoutRef<"div">) {
	const [isPasswordVisible, setIsPasswordVisible] = useState(false);
	const { mutate, isPending } = useMutation({
		mutationKey: ["login"],
		mutationFn: Login,
	});
	const { replace } = useRouter();

	const form = useForm<z.infer<typeof formSchema>>({
		resolver: zodResolver(formSchema),
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const toggleVisibility = () => setIsPasswordVisible(!isPasswordVisible);

	async function onSubmit(values: z.infer<typeof formSchema>) {
		mutate(values, {
			onSuccess: () => {
				toast.success("Usuario autenticado com sucesso!");
				replace("/");
			},
			onError: (err) => {
				toast.error("Erro de Login", {
					description: err.message,
				});
			},
		});
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<Card>
				<CardHeader>
					<CardTitle className="text-2xl">Login</CardTitle>
					<CardDescription>
						Digite as informações abaixo para realizar o seu login
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Form {...form}>
						<form onSubmit={form.handleSubmit(onSubmit)}>
							<div className="flex flex-col gap-6">
								{/* Email */}
								<FormField
									control={form.control}
									name="email"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel>Email</FormLabel>
											<FormControl>
												<Input type="email" required {...field} />
											</FormControl>
										</FormItem>
									)}
								/>

								{/* password */}
								<FormField
									control={form.control}
									name="password"
									render={({ field }) => (
										<FormItem className="grid gap-2">
											<FormLabel>Senha</FormLabel>
											<FormControl>
												<div className="w-full flex items-center justify-between relative">
													<Input
														type={isPasswordVisible ? "text" : "password"}
														required
														{...field}
													/>
													{isPasswordVisible && (
														<Eye
															className="size-4 absolute right-3 text-primary cursor-pointer"
															onClick={toggleVisibility}
														/>
													)}
													{!isPasswordVisible && (
														<EyeOff
															className="size-4 absolute right-3 text-primary cursor-pointer"
															onClick={toggleVisibility}
														/>
													)}
												</div>
											</FormControl>
										</FormItem>
									)}
								/>
								<Button type="submit" className="w-full" disabled={isPending}>
									{isPending && (
										<Loader2 className="size-4 mr-3 animate-spin" />
									)}
									Login
								</Button>
							</div>
						</form>
					</Form>
				</CardContent>
			</Card>
		</div>
	);
}
