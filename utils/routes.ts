export interface URLParams {
	page: string;
	items_per_page?: string;
	period?: string;
}

export interface Route {
	label: string;
	href: string;
	icon: string;
	urlParams?: URLParams;
}

export interface Links extends Route {
	children?: Omit<Links, "children">[];
}

export const appLinks: Links[] = [
	{
		label: "Dashboard",
		href: "/",
		icon: "ChartNoAxesCombined",
	},
	{
		label: "Despesas",
		href: "/expenses/monthly",
		icon: "BankNoteArrowDown",
		children: [
			{
				label: "Despesas mensais",
				href: "/expenses/monthly",
				icon: "Calendar",
				urlParams: {
					page: "1",
					items_per_page: "10",
				},
			},
			{
				label: "Despesas fixas",
				href: "/expenses/fixed",
				icon: "Pin",
				urlParams: {
					page: "1",
					items_per_page: "10",
				},
			},
			{
				label: "Despesas planejadas",
				href: "/expenses/planned",
				icon: "NotebookPen",
				urlParams: {
					page: "1",
					items_per_page: "10",
				},
			},
		],
	},
	{
		label: "Recebimentos",
		href: "/incomes",
		icon: "BankNoteArrowUp",
		urlParams: {
			page: "1",
			items_per_page: "10",
			period: "current",
		},
	},
	{
		label: "Meus destinatários",
		href: "/recipients",
		icon: "Users",
	},
	{
		label: "Relatórios",
		href: "/reports",
		icon: "FileText",
	},
];
