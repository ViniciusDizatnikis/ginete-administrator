import { api } from "@/lib/api";

/** Formato do DashboardStatsResponse do ginete-api-spring. */
export interface DashboardStats {
  songs: number;
  artists: number;
}

export const dashboardService = {
  async getStats(signal?: AbortSignal) {
    const { data } = await api.get<DashboardStats>("/v1/admin/stats", {
      signal,
    });
    return data;
  },
};
