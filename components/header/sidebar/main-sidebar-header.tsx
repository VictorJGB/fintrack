"use client";

import { usePathname } from "next/navigation";
import PayExpensesDialog from "@/components/dialogs/expenses/pay-expense";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
// utils
import { appLinks } from "@/utils/routes";
import ActiveBreadcrumb from "./active-breadcrumb";

export default function MainSidebarHeader() {
	const path = usePathname();
	const activeRoute = appLinks.find((link) => link.href === path);

	return (
		<header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
			<SidebarTrigger className="-ml-1" />
			<Separator orientation="vertical" className="mr-2 h-4" />
			<ActiveBreadcrumb
				href={activeRoute?.href ?? ""}
				label={activeRoute?.label ?? ""}
				pathname={path}
			/>
			<PayExpensesDialog triggerClassName="ml-auto" />
		</header>
	);
}
