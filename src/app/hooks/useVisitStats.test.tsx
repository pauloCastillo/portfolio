// @vitest-environment jsdom
import { describe, it, expect, vi, afterEach } from "vitest";
import { renderHook, waitFor, cleanup } from "@testing-library/react";
import { useVisitStats } from "./useVisitStats";
import type { VisitStats } from "~/services/visit";

afterEach(() => cleanup());

const mockGetVisitStats = vi.fn();

vi.mock("~/services/visit", () => ({
  default: () => ({ getVisitStats: mockGetVisitStats }),
  emptyVisitStats: { today: 0, last_7d: 0, last_30d: 0, series: [] },
}));

const fakeStats: VisitStats = {
  today: 3,
  last_7d: 10,
  last_30d: 25,
  series: [{ date: "2026-09-30", uniques: 3 }],
};

describe("useVisitStats", () => {
  it("empieza cargando con ceros", () => {
    mockGetVisitStats.mockImplementation(() => new Promise(() => {}));
    const { result } = renderHook(() => useVisitStats());

    expect(result.current.isLoading).toBe(true);
    expect(result.current.stats.today).toBe(0);
    expect(result.current.error).toBeNull();
  });

  it("devuelve las estadísticas parseadas", async () => {
    mockGetVisitStats.mockResolvedValue(fakeStats);
    const { result } = renderHook(() => useVisitStats());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.stats).toEqual(fakeStats);
    expect(result.current.error).toBeNull();
  });

  it("expone el error sin romper", async () => {
    mockGetVisitStats.mockRejectedValue(new Error("offline"));
    const { result } = renderHook(() => useVisitStats());

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.error?.message).toBe("offline");
    expect(result.current.stats.today).toBe(0);
  });
});
