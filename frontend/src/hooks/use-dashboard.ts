import { dashboardService } from "@/services/dashboard";
import { useQuery } from "@tanstack/react-query";
import type { DashboardData } from "@/types/dashboard";

export function useDashboard() {
  const { data , isLoading} = useQuery<DashboardData>({
    queryKey: ['dashboard'],
    queryFn: async () => {
      return dashboardService.getAll()
    }});
    
  return {data, isLoading};
}