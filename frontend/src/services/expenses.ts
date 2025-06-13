import type { GetExpensesResponse } from "@/hooks/use-expenses";
import { api } from "@/utils/api";

export const expenseService = {
	async getAll(): Promise<GetExpensesResponse> {
		const { data } = await api.get<GetExpensesResponse>("/expense");
		return data;
	},
};
