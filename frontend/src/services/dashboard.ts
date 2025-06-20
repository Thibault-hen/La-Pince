import type { Dashboard } from "@/types/dashboard";
import { api } from "@/utils/api"

export const dashboardService = {
  async getAll(): Promise<Dashboard> {
    const response = await api.get<Dashboard>("/dashboard");
    return response.data;
  },
}