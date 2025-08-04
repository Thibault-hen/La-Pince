import type { Budget } from './budget';
import type { Color } from './color';

export type Category = {
	id: string;
	colorId: string;
	title: string;
	createdAt: string;
	updatedAt: string;
	color?: Color;
	userId: string;
};

export type CategoryWithBudget = Category & {
	budgets?: Budget[];
};

export type CreateCategory = {
	title: string;
	colorId: string;
};

export type UpdateCategory = {
	title?: string;
	colorId?: string;
};
