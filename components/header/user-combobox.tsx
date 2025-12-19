"use client";
// libs
import { useMutation, useQuery } from "@tanstack/react-query";
// icons
import { Loader2, LogOut, MoreVerticalIcon } from "lucide-react";
// navigation
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
// actions
import Logout from "@/actions/user/logout";
// context
import verifyUser from "@/actions/user/verify-user";
// components
import { Button } from "@/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import UserInfoDialog from "./user-info-dialog";

export default function UserCombobox() {
	const [open, setOpen] = useState(false);
	const { push } = useRouter();

	const { data: user, isLoading } = useQuery({
		queryKey: ["verify-user"],
		queryFn: verifyUser,
	});

	// Logout
	const { mutate, isPending } = useMutation({
		mutationKey: ["logout"],
		mutationFn: Logout,
		onSuccess: () => {
			setOpen(false);
			push("/login");
		},
		onError: (error) => {
			toast.error(
				error instanceof Error ? error.message : "Erro ao fazer logout",
			);
			console.error(error);
		},
	});

	async function logout() {
		mutate();
	}

	if (isLoading)
		return (
			<Button
				variant="outline"
				disabled={true}
				className="py-5 bg-muted/50 rounded hover:bg-muted cursor-pointer"
			>
				<Loader2 className="size-4 animate-spin" />
			</Button>
		);

	if (user)
		return (
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button
						variant="outline"
						role="combobox"
						aria-expanded={open}
						className="py-5 bg-muted/50 rounded hover:bg-muted cursor-pointer"
					>
						<div className="grid flex-1 text-left text-sm leading-tight">
							<span className="truncate font-medium">{user.name}</span>
							<span className="truncate text-xs text-muted-foreground">
								{user.email}
							</span>
						</div>
						<MoreVerticalIcon className="ml-auto size-4" />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent className="w-[230px] p-2" side="bottom">
					<DropdownMenuGroup>
						<DropdownMenuItem asChild>
							<UserInfoDialog
								user={user}
								triggerClassname="w-full"
								setIsParentOpen={setOpen}
							/>
						</DropdownMenuItem>
						<DropdownMenuSeparator />
						<DropdownMenuItem
							className="cursor-pointer"
							variant="destructive"
							onClick={logout}
							disabled={isPending}
						>
							Logout
							{!isPending && (
								<LogOut className="h-4 w-4 text-inherit ml-auto" />
							)}
							{isPending && <Loader2 className="size-4 text-inherit ml-auto" />}
						</DropdownMenuItem>
					</DropdownMenuGroup>
				</DropdownMenuContent>
			</DropdownMenu>
		);
}
