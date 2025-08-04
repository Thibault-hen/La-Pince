import type { Category } from './category';

export type Budget = {
	id: string;
	amount: number;
	categoryId: string;
	category: Category;
	createdAt: string;
	updatedAt: string;
	limitAlert: number;
	month: number;
	year: number;
	userId: string;
	totalExpense: number;
};

export type CreateBudget = {
	amount: number;
	categoryId: string;
	limitAlert: number;
};

export type UpdateBudget = {
	amount?: number;
	categoryId?: string;
	limitAlert?: number;
};

export type BudgetResponse = {
	budgetCount: number;
	budgetRemaining: number;
	budgetTotal: number;
	budgets: Budget[];
};
