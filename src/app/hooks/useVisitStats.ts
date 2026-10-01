"use client";

import { useState, useEffect, useMemo } from "react";
import visitService, { emptyVisitStats, type VisitStats } from "~/services/visit";

export function useVisitStats() {
  const [stats, setStats] = useState<VisitStats>(emptyVisitStats);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  const service = useMemo(() => visitService(), []);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        setIsLoading(true);
        const data = await service.getVisitStats();
        setStats(data);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Unknown error'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchStats();
  }, [service]);

  return { stats, isLoading, error };
}
