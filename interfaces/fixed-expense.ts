export default interface FixedExpense {
	_id: string;
	description: string;
	amount: number;
}

export interface APIResponse {
	page: number;
	pageCount: number;
	firstPage: number;
	lastPage: number;
	itemsPerPage: number;
	data: FixedExpense[];
}
