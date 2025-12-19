"use client";

// context
// react-query
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
// types
import { type ReactNode, useEffect } from "react";
import { toast } from "sonner";
import Logout from "@/actions/user/logout";
// actions
import verifyUser from "@/actions/user/verify-user";

interface Props {
	children: ReactNode;
}

export default function AuthLayout({ children }: Props) {
	const { push } = useRouter();

	// user verification
	const { error } = useQuery({
		queryKey: ["verify-user"],
		queryFn: verifyUser,
	});

	const { mutate } = useMutation({
		mutationFn: Logout,
		onSettled: () => push("/login"),
	});

	useEffect(() => {
		if (error) {
			toast.error(error?.message || "Usuário não identificado!");
			mutate();
		}
	}, [error, mutate]);

	return <div className="size-full">{children}</div>;
}
