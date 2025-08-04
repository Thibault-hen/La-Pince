export type Expense = {
	id: string;
	title: string;
	budgetId?: string;
	category: {
		id: string;
		title: string;
		color: string;
	};
	amount: number;
	date: string;
};
