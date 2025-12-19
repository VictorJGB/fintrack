export default interface Expense {
	_id: string;
	date: Date;
	company: string;
	description: string;
	recipient?: string;
	installments: number;
	installments_paid: number;
	amount_per_installment: number;
	total_amount: number;
}

export interface APIResponse {
	page: number;
	pageCount: number;
	firstPage: number;
	lastPage: number;
	itemsPerPage: number;
	data: Expense[];
}

export type MonthFilter = "current" | "quarter" | "last-year";
